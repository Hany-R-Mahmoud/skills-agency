# Tasks: The Agency Showcase Website

**Input**: Design documents from `/specs/001-agency-showcase-site/`
**Prerequisites**: plan.md (required), spec.md (required), research.md,
data-model.md, contracts/ui-navigation.md, quickstart.md

**Tests**: Automated test tasks are not included because the feature
specification did not explicitly require a TDD or test-harness expansion. Build,
lint, and browser validation remain mandatory completion gates.

**Organization**: Tasks are grouped by user story so each story can be
implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Every task includes exact file paths

## Path Conventions

- App routes: `src/app/`
- UI components: `src/components/<domain>/<Component>/index.tsx`
- Component styles: `src/components/<domain>/<Component>/<Component>.module.scss`
- Shared types/utilities: `src/lib/`
- Source data: `src/data/skills.json`
- Global theme and Ant Design tokens: `src/styles/`
- Audio assets: `public/audio/ui/` and `public/audio/agents/`
- Scripts: `scripts/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align the current scaffold with the approved feature architecture
before UI implementation begins.

- [ ] T001 Audit and align `src/lib/types.ts` with the live `src/data/skills.json` schema, removing stale shape mismatches and documenting derived view-model needs.
- [ ] T002 [P] Expand `src/lib/utils.ts` to provide department, agent, stats, room-tile, and asset-path derivation helpers sourced exclusively from `src/data/skills.json`.
- [ ] T003 [P] Prepare route-local style module entry points for `src/app/page.tsx`, `src/app/departments/[slug]/page.tsx`, and `src/app/agents/[id]/page.tsx` so page styling can move fully out of inline logic.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared shell, navigation primitives, and route wiring
that every user story depends on.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T004 Implement the root app shell in `src/app/layout.tsx` and `src/app/globals.css` so Ant Design, global tokens, and the application chrome are wired without inline styles.
- [ ] T005 [P] Build the persistent navigation shell in `src/components/layout/Sidebar/index.tsx` and `src/components/layout/Sidebar/Sidebar.module.scss` with department navigation, live online count, and mute-control placement.
- [ ] T006 [P] Build the animated content host in `src/components/layout/MainArea/index.tsx` and `src/components/layout/MainArea/MainArea.module.scss` with route-transition support and zero hardcoded presentation values.
- [ ] T007 [P] Rebuild `src/components/shared/StatusPip/index.tsx` and `src/components/shared/StatusPip/StatusPip.module.scss` to consume global pip classes and typed agent statuses from the shared data model.
- [ ] T008 Wire static route generation and not-found-safe data loading in `src/app/page.tsx`, `src/app/departments/[slug]/page.tsx`, and `src/app/agents/[id]/page.tsx` using server components and `generateStaticParams`.

**Checkpoint**: The application shell, route scaffolding, and shared data
helpers are ready. User stories can now be implemented independently.

---

## Phase 3: User Story 1 - Explore the agency map (Priority: P1) 🎯 MVP

**Goal**: Let visitors understand the agency, see the HQ presentation, and
navigate between all department rooms.

**Independent Test**: From the homepage, a visitor can identify the agency,
enter the HQ experience, and reach each department room with accurate counts and
department labeling.

- [ ] T009 [US1] Build the homepage hero and stats experience in `src/app/page.tsx` and `src/app/page.module.scss`, deriving headline metrics and CTA state from `src/data/skills.json`.
- [ ] T010 [P] [US1] Implement the isometric HQ map in `src/components/departments/DeptRoom/index.tsx` and `src/components/departments/DeptRoom/DeptRoom.module.scss` using hand-crafted SVG room tiles, tokenized scanlines, and department accent glows.
- [ ] T011 [P] [US1] Implement department summary cards in `src/components/departments/DeptCard/index.tsx` and `src/components/departments/DeptCard/DeptCard.module.scss` for alternate navigation and mobile-friendly department browsing.
- [ ] T012 [US1] Build the department route presentation in `src/app/departments/[slug]/page.tsx` and `src/app/departments/[slug]/page.module.scss`, integrating the shared shell, room metadata, and department-specific agent roster.
- [ ] T013 [US1] Connect sidebar navigation, homepage entry, HQ map room clicks, and department-route transitions across `src/components/layout/Sidebar/index.tsx`, `src/components/layout/MainArea/index.tsx`, and `src/components/departments/DeptRoom/index.tsx`.

**Checkpoint**: The homepage and all 6 department rooms are navigable from the
shared shell and isometric HQ map.

---

## Phase 4: User Story 2 - Inspect an individual agent (Priority: P2)

**Goal**: Let visitors inspect any agent and understand their role, skills, and
invocation syntax from within department exploration.

**Independent Test**: From any department room, a visitor can activate an agent
and review a matching panel with name, role, description, skills, invocation
syntax, and style-specific avatar treatment.

- [ ] T014 [P] [US2] Implement the dual-style sprite system in `src/components/shared/AgentSprite/index.tsx` and `src/components/shared/AgentSprite/AgentSprite.module.scss` for pixel and geometric agent variants.
- [ ] T015 [P] [US2] Implement reusable agent summaries in `src/components/agents/AgentCard/index.tsx` and `src/components/agents/AgentCard/AgentCard.module.scss` for room, roster, and fallback list contexts.
- [ ] T016 [US2] Build the agent detail drawer experience in `src/components/agents/AgentPanel/index.tsx` and `src/components/agents/AgentPanel/AgentPanel.module.scss` using Ant Design Drawer and typed derived agent detail data.
- [ ] T017 [US2] Integrate sprite rendering, agent activation, and drawer orchestration in `src/components/departments/DeptRoom/index.tsx` and `src/app/departments/[slug]/page.tsx`.
- [ ] T018 [US2] Convert `src/app/agents/[id]/page.tsx` and `src/app/agents/[id]/page.module.scss` into a direct-link fallback that mirrors the drawer content contract for standalone agent URLs.
- [ ] T019 [US2] Add graceful fallback behavior for missing sprites, absent voice clips, invalid agent IDs, and empty department rosters across `src/components/shared/AgentSprite/index.tsx`, `src/components/agents/AgentPanel/index.tsx`, and the dynamic route pages.

**Checkpoint**: Every agent is clickable from its department context and exposes
consistent profile details in both drawer and direct-link flows.

---

## Phase 5: User Story 3 - Experience the site’s audiovisual identity (Priority: P3)

**Goal**: Deliver the neon studio atmosphere with controllable motion and audio
that enhances, rather than blocks, exploration.

**Independent Test**: A visitor can experience ambient motion/audio, trigger an
agent voice clip, mute all sound, and browse comfortably with reduced-motion or
mobile constraints.

- [ ] T020 [P] [US3] Implement the Web Audio engine in `src/lib/audio.ts` with lazy `AudioContext` setup, ambient-loop handling, voice-clip playback, and persistent mute preference.
- [ ] T021 [P] [US3] Add triggered mute and audio lifecycle controls to `src/components/layout/Sidebar/index.tsx` and `src/components/layout/Sidebar/Sidebar.module.scss`, keeping all browser-only behavior inside justified client logic.
- [ ] T022 [P] [US3] Add CSS keyframe-based ambient effects, scanlines, glows, cursor treatments, and reduced-motion guards across `src/app/page.module.scss`, `src/components/departments/DeptRoom/DeptRoom.module.scss`, `src/components/shared/AgentSprite/AgentSprite.module.scss`, and `src/components/agents/AgentPanel/AgentPanel.module.scss`.
- [ ] T023 [US3] Wire ambient audio and agent voice playback to homepage, HQ map, and drawer interactions across `src/app/page.tsx`, `src/components/departments/DeptRoom/index.tsx`, `src/components/agents/AgentPanel/index.tsx`, and `src/lib/audio.ts`.
- [ ] T024 [US3] Implement responsive behavior for mobile navigation and bottom-sheet agent detail presentation across `src/components/layout/Sidebar/Sidebar.module.scss`, `src/components/layout/MainArea/MainArea.module.scss`, `src/components/agents/AgentPanel/AgentPanel.module.scss`, and department route styles.

**Checkpoint**: The site presents a controllable audiovisual identity with
responsive navigation and reduced-motion-safe ambient behavior.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize maintenance hooks, documentation, and release verification.

- [ ] T025 [P] Implement the dataset maintenance script in `scripts/sync-skills.ts` so future content synchronization keeps `skills.json`-driven views coherent.
- [ ] T026 [P] Update project documentation in `README.md` and any affected spec artifacts to reflect the HQ map, agent drawer, audio controls, and root-level app structure.
- [ ] T027 Run end-to-end verification via `npm run lint`, `npm run build`, browser validation from `specs/001-agency-showcase-site/quickstart.md`, and a Vercel production deployment check.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **User Story 1 (Phase 3)**: Starts after Foundational completion and defines the MVP navigation flow.
- **User Story 2 (Phase 4)**: Starts after Foundational completion and integrates with the department room flow from User Story 1.
- **User Story 3 (Phase 5)**: Starts after Foundational completion and layers controlled motion/audio on top of the first two stories.
- **Polish (Phase 6)**: Depends on completion of all desired user stories.

### User Story Dependencies

- **User Story 1 (P1)**: Independent once the shell, routes, and data helpers exist.
- **User Story 2 (P2)**: Depends on department room navigation from User Story 1 for the primary drawer trigger path.
- **User Story 3 (P3)**: Depends on the homepage, map, and agent activation surfaces from User Stories 1 and 2.

### Within Each User Story

- Shared typed data and helper derivations must exist before visual integration.
- Route-level presentation follows shared shell completion.
- Interactive behavior follows static rendering and style work.
- Accessibility and fallback handling finish each story before it is considered complete.

### Parallel Opportunities

- T002 and T003 can run in parallel after schema alignment starts.
- T005, T006, and T007 can run in parallel within the foundational phase.
- T010 and T011 can run in parallel within User Story 1.
- T014 and T015 can run in parallel within User Story 2.
- T020, T021, and T022 can run in parallel within User Story 3.
- T025 and T026 can run in parallel during the polish phase.

---

## Parallel Example: User Story 1

```bash
# Parallel visual/navigation work after foundational completion:
Task: "T010 [US1] Implement the isometric HQ map in src/components/departments/DeptRoom/index.tsx and src/components/departments/DeptRoom/DeptRoom.module.scss"
Task: "T011 [US1] Implement department summary cards in src/components/departments/DeptCard/index.tsx and src/components/departments/DeptCard/DeptCard.module.scss"
```

## Parallel Example: User Story 2

```bash
# Parallel agent presentation work after room navigation exists:
Task: "T014 [US2] Implement the dual-style sprite system in src/components/shared/AgentSprite/index.tsx and src/components/shared/AgentSprite/AgentSprite.module.scss"
Task: "T015 [US2] Implement reusable agent summaries in src/components/agents/AgentCard/index.tsx and src/components/agents/AgentCard/AgentCard.module.scss"
```

## Parallel Example: User Story 3

```bash
# Parallel audiovisual foundations once interaction surfaces exist:
Task: "T020 [US3] Implement the Web Audio engine in src/lib/audio.ts with lazy AudioContext setup, ambient-loop handling, voice-clip playback, and persistent mute preference"
Task: "T022 [US3] Add CSS keyframe-based ambient effects, scanlines, glows, cursor treatments, and reduced-motion guards across the approved SCSS modules"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Review homepage and all department room navigation
5. Present for approval before layering agent detail and audiovisual work

### Incremental Delivery

1. Finish Setup + Foundational to stabilize data, shell, and routes
2. Deliver User Story 1 as the first public navigation slice
3. Add User Story 2 to make every agent inspectable
4. Add User Story 3 for the full neon studio audiovisual identity
5. Finish with polish, deployment verification, and content sync tooling

### Suggested MVP Scope

User Story 1 only. It delivers the core business value of showing the agency,
its departments, and the main navigation model before higher-complexity drawer
and audio work begins.

---

## Notes

- All tasks preserve the constitution’s styling, data, motion, and audio rules.
- No new npm packages are planned in this task set.
- Build and deployment verification are explicit gating tasks rather than implied cleanup.
