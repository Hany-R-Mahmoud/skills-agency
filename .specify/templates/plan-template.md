# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (strict), React 19, Next.js 16 App Router  
**Primary Dependencies**: Next.js, Ant Design v6, `@ant-design/cssinjs`, Framer Motion, SCSS Modules  
**Storage**: Source-controlled JSON in `src/data/skills.json`, browser `localStorage` only when constitutionally allowed  
**Testing**: [NEEDS CLARIFICATION: choose project test stack when feature planning begins]  
**Target Platform**: Vercel-hosted web application
**Project Type**: Next.js showcase website  
**Performance Goals**: Static-first route generation, smooth route transitions, accessible reduced-motion behavior  
**Constraints**: Styling via `theme-global.css` + SCSS modules only; no `any`; no unsupported data sources or audio libraries  
**Scale/Scope**: Marketing/showcase site for an AI skills company with department and agent detail routes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Data source plan uses `src/data/skills.json` as the single content authority.
- Styling plan uses SCSS modules plus tokens from `src/styles/theme-global.css`.
- Ant Design overrides, if any, are centralized in `src/styles/antd.config.ts`.
- Motion plan preserves the CSS keyframes / Framer Motion split and reduced-motion safeguards.
- Audio plan, if in scope, uses Web Audio API with lazy `AudioContext` initialization.
- Type modeling updates are reflected in `src/lib/types.ts` and avoid `any`.
- Client component usage is explicitly justified by browser/runtime requirements.
- Any new dependency includes written justification and a rejected simpler alternative.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── agents/
│   ├── departments/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── agents/
│   ├── departments/
│   ├── layout/
│   └── shared/
├── data/
│   └── skills.json
├── lib/
│   ├── audio.ts
│   ├── types.ts
│   └── utils.ts
└── styles/
    ├── antd.config.ts
    └── theme-global.css

public/
├── audio/
│   ├── agents/
│   └── ui/
└── fonts/

scripts/
└── sync-skills.ts
```

**Structure Decision**: Plans MUST map feature work onto the existing Next.js
app structure above and avoid introducing parallel app roots or alternate
styling/data systems without explicit constitutional justification.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
