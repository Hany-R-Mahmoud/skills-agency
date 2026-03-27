# Implementation Plan: The Agency Showcase Website

**Branch**: `001-agency-showcase-site` | **Date**: 2026-03-27 | **Spec**: [/Users/hanyramadan/skills agency/specs/001-agency-showcase-site/spec.md](/Users/hanyramadan/skills%20agency/specs/001-agency-showcase-site/spec.md)
**Input**: Feature specification from `/specs/001-agency-showcase-site/spec.md`

**Note**: This plan resolves the current MVP architecture for the immersive
showcase experience and assumes no new npm packages beyond the approved stack.

## Summary

Build The Agency as a static-first Next.js showcase site that turns the
`skills.json` roster into a navigable neon HQ. The experience centers on a
cinematic homepage, a reusable isometric SVG office map, department room views,
and an agent detail drawer backed by typed derived data. The implementation will
use server-rendered route shells for homepage and department pages, with client
islands only where browser APIs are required for route transitions, drawer
state, mute persistence, and Web Audio playback. The core technical strategy is
to keep all content derivation in `src/lib/`, all visual tokens in
`src/styles/`, and all decorative motion/audio behavior behind constitutional
boundaries so the project remains maintainable as the 31-agent roster evolves.

## Technical Context

**Language/Version**: TypeScript (strict), React 19, Next.js 16 App Router  
**Primary Dependencies**: Next.js, Ant Design v6, `@ant-design/cssinjs`,
`@ant-design/icons`, Framer Motion, SCSS Modules, `clsx`  
**Storage**: Source-controlled JSON in `src/data/skills.json`; browser
`localStorage` for mute preference only  
**Testing**: ESLint, production build verification, and browser-based runtime
validation of core flows; no additional test packages in scope for the current
planning phase  
**Target Platform**: Public Vercel-hosted web application with responsive
desktop and mobile layouts  
**Project Type**: Next.js showcase website  
**Performance Goals**: Static-first route generation for homepage and
department pages, smooth triggered transitions, no blocked interaction from
ambient effects, and accessible reduced-motion/audio controls  
**Constraints**: Styling via `theme-global.css` + colocated SCSS modules only;
no inline styles, no `any`, no Tailwind, no styled-components, no extra npm
packages, no alternate data source outside `skills.json`, and Web Audio API
only for sound  
**Scale/Scope**: One public-facing HQ experience, 6 departments, 31 agents,
homepage hero, map navigation, department rooms, agent drawer, ambient audio,
agent voice activation, live online count, and mobile adaptation below 768px

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- PASS: Content architecture derives all agency copy, counts, relationships, and
  per-agent presentation data from `src/data/skills.json`.
- PASS: Styling remains confined to `src/styles/theme-global.css`,
  `src/styles/antd.config.ts`, and colocated SCSS module files.
- PASS: Motion design keeps ambient loops in CSS keyframes and reserves Framer
  Motion for triggered transitions, drawer movement, and route changes.
- PASS: Audio design uses Web Audio API, lazy `AudioContext` init, and a single
  mute preference persisted in `localStorage`.
- PASS: Type modeling stays in `src/lib/types.ts` and will be updated to mirror
  the current `skills.json` schema exactly.
- PASS: Client components are limited to sidebar controls, map interactions,
  drawer orchestration, and audio/motion runtime behavior.
- PASS: No additional dependencies are required for the MVP defined in the
  feature specification.

## Project Structure

### Documentation (this feature)

```text
specs/001-agency-showcase-site/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-navigation.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── agents/
│   │   └── [id]/
│   ├── departments/
│   │   └── [slug]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── agents/
│   │   ├── AgentCard/
│   │   └── AgentPanel/
│   ├── departments/
│   │   ├── DeptCard/
│   │   └── DeptRoom/
│   ├── layout/
│   │   ├── MainArea/
│   │   └── Sidebar/
│   └── shared/
│       ├── AgentSprite/
│       └── StatusPip/
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

**Structure Decision**: Build on the current single-app Next.js structure and
reuse the existing route/component directories. The homepage and department
routes stay server-first, while interaction-heavy components become focused
client islands rather than introducing a parallel frontend architecture.

## Complexity Tracking

No constitutional violations or complexity exceptions are currently required.
The plan intentionally avoids introducing extra dependencies, alternate data
stores, or a separate state management layer.
