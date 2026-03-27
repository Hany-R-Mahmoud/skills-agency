# Skills Agency

Next.js 16 + App Router scaffold for The Agency v2, built with TypeScript, Ant Design, SCSS modules, and spec-kit initialization for both Codex and OpenCode workflows.

## Stack

- Next.js 16
- React 19
- Ant Design 6
- SCSS modules
- TypeScript
- spec-kit (`.specify`, `.agents`, `.opencode`)

## Commands

```bash
npm run dev
npm run lint
npx next build --webpack
```

## Structure

- `src/app`: app routes and root layout
- `src/components`: layout, department, agent, and shared UI components
- `src/data/skills.json`: starter agency data
- `src/lib`: types, utilities, and future audio placeholder
- `src/styles`: global theme tokens and Ant Design config
- `scripts/sync-skills.ts`: placeholder for future data sync work

## Notes

- The app now lives at the repository root, not in a nested `the-agency/` folder.
- `npx next build --webpack` currently completes successfully in this environment.
- Turbopack production build may hang locally even though runtime and webpack build verification pass.
