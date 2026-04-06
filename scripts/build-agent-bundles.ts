#!/usr/bin/env tsx
import { execFile } from "node:child_process";
import { cp, mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

interface SkillsData {
  departments: Array<{
    slug: string;
    agents: Array<{
      id: string;
    }>;
  }>;
}

interface BundleSpec {
  name: string;
  outputPath: string;
  packLabel: string;
  primaryAgentIds: string[];
  includedAgentIds: string[];
}

const TEXT_FILE_EXTENSIONS = new Set([".md", ".yaml", ".yml", ".txt"]);
const ROOT_DOCS = ["README.md", "INDEX.md", "AGENT_FIRST_REFACTOR.md"] as const;

const projectRoot = process.cwd();
const skillsRoot = path.resolve(process.env.HOME ?? "", ".codex/skills");
const outputRoot = path.resolve(projectRoot, "public/downloads");
const escapedSkillsRoot = escapeRegExp(skillsRoot);
const absoluteSkillPathPattern = new RegExp(`${escapedSkillsRoot}\\/[^\\s)\\]]+`, "g");
const publicAgentMentionPattern = /`(agent-[a-z0-9-]+)`/g;

async function main(): Promise<void> {
  const data = await readSkillsData();
  const allAgentIds = data.departments.flatMap((department) =>
    department.agents.map((agent) => agent.id),
  );

  const specs: BundleSpec[] = [
    ...allAgentIds.map((id) => ({
      name: `${id}-pack`,
      outputPath: path.join(outputRoot, "agents", `${id}.zip`),
      packLabel: `Agent pack for ${id}`,
      primaryAgentIds: [id],
      includedAgentIds: [id],
    })),
    ...data.departments.map((department) => {
      const agentIds = department.agents.map((agent) => agent.id);

      return {
        name: `${department.slug}-department-pack`,
        outputPath: path.join(outputRoot, "departments", `${department.slug}.zip`),
        packLabel: `Department pack for ${department.slug}`,
        primaryAgentIds: agentIds,
        includedAgentIds: agentIds,
      };
    }),
    {
      name: "the-agency-public-agents",
      outputPath: path.join(outputRoot, "the-agency-public-agents.zip"),
      packLabel: "Full public agent pack",
      primaryAgentIds: allAgentIds,
      includedAgentIds: allAgentIds,
    },
  ];

  await rm(path.join(outputRoot, "agents"), { recursive: true, force: true });
  await rm(path.join(outputRoot, "departments"), { recursive: true, force: true });
  await rm(path.join(outputRoot, "the-agency-public-agents.zip"), { force: true });
  await mkdir(path.join(outputRoot, "agents"), { recursive: true });
  await mkdir(path.join(outputRoot, "departments"), { recursive: true });

  for (const spec of specs) {
    await buildBundle(spec);
  }

  process.stdout.write(
    JSON.stringify(
      {
        agents: allAgentIds.length,
        departments: data.departments.length,
        outputRoot,
      },
      null,
      2,
    ) + "\n",
  );
}

async function buildBundle(spec: BundleSpec): Promise<void> {
  const includedEntries = await collectBundleEntries(spec.primaryAgentIds, spec.includedAgentIds);
  const stagingRoot = await mkdtemp(path.join(tmpdir(), "skills-agency-bundle-"));
  const packRoot = path.join(stagingRoot, spec.name);

  await mkdir(packRoot, { recursive: true });
  await writePackReadme(packRoot, spec, includedEntries);

  for (const entry of [...includedEntries].sort()) {
    const sourcePath = path.join(skillsRoot, entry);
    const destinationPath = path.join(packRoot, entry);
    const sourceStats = await stat(sourcePath);

    if (sourceStats.isDirectory()) {
      await cp(sourcePath, destinationPath, {
        recursive: true,
        filter: (currentSource) => shouldIncludePath(currentSource),
      });
      continue;
    }

    await mkdir(path.dirname(destinationPath), { recursive: true });
    await cp(sourcePath, destinationPath);
  }

  await mkdir(path.dirname(spec.outputPath), { recursive: true });
  await execFileAsync("zip", ["-qry", spec.outputPath, "."], {
    cwd: packRoot,
  });
  await rm(stagingRoot, { recursive: true, force: true });
}

async function collectBundleEntries(
  primaryAgentIds: string[],
  includedAgentIds: string[],
): Promise<Set<string>> {
  const entries = new Set<string>(ROOT_DOCS);
  const directoriesToScan = new Set<string>();
  const scannedDirectories = new Set<string>();

  for (const agentId of includedAgentIds) {
    const agentDir = agentId;
    entries.add(agentDir);
    directoriesToScan.add(agentDir);
  }

  for (const agentId of primaryAgentIds) {
    const skillPath = path.join(skillsRoot, agentId, "SKILL.md");
    const skillContent = await readFile(skillPath, "utf8");

    for (const relatedAgentId of extractRelatedAgentIds(skillContent)) {
      entries.add(relatedAgentId);
      directoriesToScan.add(relatedAgentId);
    }
  }

  while (directoriesToScan.size > 0) {
    const [directory] = directoriesToScan;

    directoriesToScan.delete(directory);

    if (scannedDirectories.has(directory)) {
      continue;
    }

    scannedDirectories.add(directory);

    const absoluteDirectory = path.join(skillsRoot, directory);
    const textFiles = await collectTextFiles(absoluteDirectory);

    for (const textFile of textFiles) {
      const content = await readFile(textFile, "utf8");

      for (const referencedEntry of extractReferencedEntries(content)) {
        if (entries.has(referencedEntry)) {
          continue;
        }

        entries.add(referencedEntry);

        const absoluteEntry = path.join(skillsRoot, referencedEntry);
        const entryStats = await stat(absoluteEntry);

        if (entryStats.isDirectory()) {
          directoriesToScan.add(referencedEntry);
        }
      }
    }
  }

  return entries;
}

async function collectTextFiles(directory: string): Promise<string[]> {
  const children = await readdir(directory, { withFileTypes: true });
  const textFiles: string[] = [];

  for (const child of children) {
    const childPath = path.join(directory, child.name);

    if (child.isDirectory()) {
      textFiles.push(...(await collectTextFiles(childPath)));
      continue;
    }

    if (TEXT_FILE_EXTENSIONS.has(path.extname(child.name))) {
      textFiles.push(childPath);
    }
  }

  return textFiles;
}

function extractRelatedAgentIds(content: string): string[] {
  const relatedAgentIds = new Set<string>();

  for (const match of content.matchAll(publicAgentMentionPattern)) {
    relatedAgentIds.add(match[1]);
  }

  return [...relatedAgentIds];
}

function extractReferencedEntries(content: string): string[] {
  const referencedEntries = new Set<string>();

  for (const match of content.matchAll(absoluteSkillPathPattern)) {
    const absolutePath = match[0];
    const relativePath = path.relative(skillsRoot, absolutePath);

    if (relativePath.startsWith("..")) {
      continue;
    }

    const [topLevelEntry] = relativePath.split(path.sep);

    if (!topLevelEntry) {
      continue;
    }

    referencedEntries.add(topLevelEntry);
  }

  return [...referencedEntries];
}

async function writePackReadme(
  packRoot: string,
  spec: BundleSpec,
  includedEntries: Set<string>,
): Promise<void> {
  const lines = [
    `# ${spec.packLabel}`,
    "",
    "This archive is generated from the local skills repository.",
    "",
    "## Included",
    "",
    ...[...includedEntries].sort().map((entry) => `- \`${entry}\``),
    "",
    "Extract these files into your skills workspace root to preserve the relative links between agents, playbooks, references, and supporting docs.",
    "",
  ];

  await writeFile(path.join(packRoot, "PACK_README.md"), lines.join("\n"), "utf8");
}

async function readSkillsData(): Promise<SkillsData> {
  const raw = await readFile(path.join(projectRoot, "src/data/skills.json"), "utf8");

  return JSON.parse(raw) as SkillsData;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function shouldIncludePath(sourcePath: string): boolean {
  const basename = path.basename(sourcePath);

  return basename !== ".DS_Store" && basename !== ".git";
}

main().catch((error: unknown) => {
  process.stderr.write(`build-agent-bundles failed: ${String(error)}\n`);
  process.exitCode = 1;
});
