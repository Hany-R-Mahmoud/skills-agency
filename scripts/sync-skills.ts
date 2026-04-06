#!/usr/bin/env tsx
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

interface SkillsRoster {
  meta?: {
    totalAgents?: number;
    totalDepartments?: number;
    version?: string;
    lastUpdated?: string;
  };
  departments?: Array<{
    id?: string;
    agents?: Array<{ id?: string; status?: string }>;
  }>;
}

async function getPublicSkillIds(skillsRoot: string): Promise<string[]> {
  const entries = await readdir(skillsRoot, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("agent-"))
    .map((entry) => entry.name)
    .sort();
}

async function main(): Promise<void> {
  const dataPath = path.resolve(process.cwd(), "src/data/skills.json");
  const raw = await readFile(dataPath, "utf8");
  const data = JSON.parse(raw) as SkillsRoster;

  const departments = Array.isArray(data.departments) ? data.departments : [];
  const rosterAgents = departments.flatMap((department) =>
    Array.isArray(department.agents) ? department.agents : [],
  );
  const rosterIds = rosterAgents
    .map((agent) => agent.id)
    .filter((id): id is string => Boolean(id))
    .sort();

  const online = rosterAgents.filter((agent) => agent.status === "online").length;
  const busy = rosterAgents.filter((agent) => agent.status === "busy").length;
  const idle = rosterAgents.filter((agent) => agent.status === "idle").length;

  const skillsRoot = path.resolve(process.env.HOME ?? "", ".codex/skills");
  const publicSkillIds = await getPublicSkillIds(skillsRoot);

  const missingFromRoster = publicSkillIds.filter((id) => !rosterIds.includes(id));
  const extraInRoster = rosterIds.filter((id) => !publicSkillIds.includes(id));

  process.stdout.write(
    JSON.stringify(
      {
        source: "src/data/skills.json",
        version: data.meta?.version ?? null,
        lastUpdated: data.meta?.lastUpdated ?? null,
        departments: departments.length,
        agents: rosterIds.length,
        declaredAgents: data.meta?.totalAgents ?? null,
        online,
        busy,
        idle,
        publicSkillDirs: publicSkillIds.length,
        missingFromRoster,
        extraInRoster,
      },
      null,
      2,
    ) + "\n",
  );
}

main().catch((error: unknown) => {
  process.stderr.write(`sync-skills failed: ${String(error)}\n`);
  process.exitCode = 1;
});
