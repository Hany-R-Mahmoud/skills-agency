# Codex Import For Claude

This folder mirrors the portable parts of your local Codex setup into
`~/.claude/codex-import/` so they are visible inside your Claude environment.

## Imported
- `AGENTS.md` copied from `~/.codex/AGENTS.md`
- `skills/` copied from `~/.codex/skills/`
- Custom agent skills:
  - `team-lead`
  - `team-lead-lite`
  - `team-lead-full`
  - `agent-orchestrator`
  - `agent-implementer`
  - `agent-reviewer`
  - `agent-tester`
  - `agent-debugging`
  - `agent-security`
  - `agent-docs`
  - `agent-impeccable`
  - `agent-history`

## Important Notes
- This is a file mirror, not a full runtime integration.
- Claude can read these prompts and markdown files, but Codex-only tool calls,
  MCP references, and local absolute paths may still need manual adaptation.
- The copied `skills/` tree includes supporting playbooks and references so the
  custom team-lead workflow remains navigable.

## Suggested Usage In Claude
1. Open `AGENTS.md` for your base behavior rules.
2. Open any `skills/*/SKILL.md` file you want to emulate.
3. Paste the relevant instructions into a Claude project or custom prompt.
4. If Claude should follow one of the roles, mention it explicitly in the
   prompt, for example: `Use the team-lead workflow from ~/.claude/codex-import`.
