<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template Principle 1 -> I. Styling Architecture & Token Governance (NON-NEGOTIABLE)
- Template Principle 2 -> II. Data Layer Exclusivity (NON-NEGOTIABLE)
- Template Principle 3 -> III. Motion & Audio Boundaries (NON-NEGOTIABLE)
- Template Principle 4 -> IV. TypeScript, Components & Data Loading
- Template Principle 5 -> V. Simplicity & Dependency Discipline
Added sections:
- Technical Baseline & Delivery Constraints
- Workflow & Review Gates
Removed sections:
- None
Templates requiring updates:
- ✅ updated .specify/templates/plan-template.md
- ✅ updated .specify/templates/tasks-template.md
- ✅ reviewed .specify/templates/spec-template.md
- ✅ reviewed .specify/templates/constitution-template.md
- ⚠ not present .specify/templates/commands/*.md
Follow-up TODOs:
- None
-->
# The Agency Constitution

## Core Principles

### I. Styling Architecture & Token Governance (NON-NEGOTIABLE)
All styling MUST be expressed through CSS custom properties defined in
`src/styles/theme-global.css` and SCSS modules colocated with components.
Inline styles, Tailwind, styled-components, and parallel styling systems are
forbidden. Every styled component directory MUST contain `index.tsx` and a
`ComponentName.module.scss` sibling file. Ant Design visual overrides MUST flow
through `src/styles/antd.config.ts` only; component-level token mutations or
inline theme patches are not allowed. This keeps the showcase visually coherent,
auditable, and easy to retheme without touching component logic.

### II. Data Layer Exclusivity (NON-NEGOTIABLE)
All agent, department, and derived showcase content MUST originate from
`src/data/skills.json`. Components, routes, and utilities MUST derive labels,
counts, relationships, and presentation content from that source rather than
hardcoding display strings, totals, or decorative status metadata. Adding,
removing, or changing an agent is defined as a data edit in `skills.json`
followed by deploy. If a view cannot be powered from the shared dataset, the
schema MUST be extended in `src/lib/types.ts` and `skills.json` before UI work
continues.

### III. Motion & Audio Boundaries (NON-NEGOTIABLE)
Animation responsibilities MUST be split deliberately. CSS `@keyframes` handle
ambient and repeating effects such as idle loops, status pip blink, cursor
blink, scanline scroll, and glow pulse. Framer Motion is reserved for
stateful, route-aware transitions such as page changes, drawer slide-ins, card
entrance staggering, and route transition choreography. All motion MUST be
guarded by `@media (prefers-reduced-motion: no-preference)`. Audio MUST use the
Web Audio API only. UI sounds live under `/public/audio/ui/`, agent voice
assets live under `/public/audio/agents/{agent-id}.mp3`, mute state MUST be
controlled by a single toggle stored in `localStorage`, and `AudioContext` MUST
be created lazily after the first user gesture. This principle protects
accessibility, performance, and interaction clarity.

### IV. TypeScript, Components & Data Loading
TypeScript strict mode MUST remain enabled, `any` is forbidden, and all public
data structures MUST be declared in `src/lib/types.ts` to mirror the
`skills.json` schema exactly. Components are server components by default; a
client component is justified only when local state, event timing, Framer
Motion runtime behavior, `localStorage`, Web Audio APIs, or another browser API
is genuinely required. Component organization MUST stay directory-based with one
component per folder. Route data loading MUST prefer server components and
`generateStaticParams` so the showcase remains statically predictable and Vercel
friendly.

### V. Simplicity & Dependency Discipline
The project MUST prefer the simplest solution that satisfies the current phase
of the plan. YAGNI applies by default. New npm packages are disallowed unless
the existing stack cannot reasonably solve the problem and the justification is
captured in the plan or review notes. Token reuse beats ad hoc values,
derivation beats duplication, and incremental extension beats speculative
abstraction. When two valid approaches exist, the implementation with fewer
dependencies, fewer moving parts, and clearer ownership wins.

## Technical Baseline & Delivery Constraints

The authoritative stack for this project is Next.js 16 App Router, React 19,
TypeScript strict mode, Ant Design v6 in cssVar mode, SCSS Modules, Framer
Motion, Web Audio API, and deployment on Vercel with ISR/SSG-friendly route
generation. The repository root is the application root. `src/styles`,
`src/data`, and `src/lib` are foundational directories and MUST not be bypassed
by shadow configuration elsewhere. Visual tokens belong in global theme files,
typed data contracts belong in `src/lib/types.ts`, and runtime derivation logic
belongs in utilities or server components instead of duplicated page-level
constants.

## Workflow & Review Gates

Every plan, task list, and implementation review MUST verify:

- Styling changes use SCSS modules plus shared CSS variables only.
- Ant Design theme changes are centralized in `src/styles/antd.config.ts`.
- New UI copy, counts, or relationships are sourced from `src/data/skills.json`.
- Motion changes respect the CSS/Framer Motion split and reduced-motion guard.
- Audio work remains Web Audio API based and initializes only after user
  interaction.
- Type definitions stay strict and schema-aligned with `skills.json`.
- Client components are introduced only with explicit browser/runtime need.
- New dependencies include written justification.

Any change that breaks one of these gates is non-compliant until the code,
schema, or plan is corrected.

## Governance

This constitution supersedes conflicting local habits, generated defaults, and
ad hoc implementation choices for The Agency. Amendments require an explicit
update to `.specify/memory/constitution.md`, a recorded rationale, and
consistency checks against dependent templates. Versioning follows semantic
versioning for governance itself: MAJOR for incompatible principle changes or
removals, MINOR for new principles or materially expanded rules, PATCH for
clarifications that do not change expected behavior. Compliance review is
mandatory during planning, implementation, and review. Any exception MUST be
documented with why the rule cannot be followed, what simpler option was
rejected, and what follow-up will remove the exception.

**Version**: 1.0.0 | **Ratified**: 2026-03-27 | **Last Amended**: 2026-03-27
