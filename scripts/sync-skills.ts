#!/usr/bin/env tsx
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

async function main(): Promise<void> {
  const filePath = path.resolve(process.cwd(), "src/data/skills.json");
  const raw = await readFile(filePath, "utf8");
  const data = JSON.parse(raw) as {
    departments?: Array<{
      id?: string;
      agents?: Array<{ id?: string; status?: string }>;
    }>;
  };

  const departments = Array.isArray(data.departments) ? data.departments : [];
  const agents = departments.flatMap((department) =>
    Array.isArray(department.agents) ? department.agents : [],
  );
  const online = agents.filter((agent) => agent.status === "online").length;

  process.stdout.write(
    JSON.stringify(
      {
        source: "src/data/skills.json",
        departments: departments.length,
        agents: agents.length,
        online,
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
