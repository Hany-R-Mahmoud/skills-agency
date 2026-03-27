# Research: The Agency Showcase Website

## Decision: Use hand-crafted SVG polygons for the isometric floor map

**Rationale**: The requested experience centers on a deterministic isometric HQ
map with six rooms, per-room accent glows, embedded mini sprites, and
route-driven interaction. Hand-crafted SVG polygons provide exact control over
room geometry, hit targets, labels, and glow behavior without fighting CSS 3D
perspective quirks or browser inconsistencies.

**Alternatives considered**:

- CSS 3D transforms on HTML tiles: rejected because perspective stacking,
  overlay placement, and mobile scaling would be harder to keep visually exact.
- Canvas/WebGL rendering: rejected because the interaction model is simple and
  the constitution prefers fewer moving parts.

## Decision: Keep routes static-first and use client islands only for triggered interaction

**Rationale**: Homepage and department pages can be generated from the agency
dataset, which aligns with the constitution’s preference for server components
and `generateStaticParams`. Client-only logic is still required for drawer
opening, route transition choreography, mute persistence, and audio playback,
so those concerns will live in focused client components rather than whole-page
client rendering.

**Alternatives considered**:

- Fully client-rendered pages: rejected because it weakens static predictability
  and unnecessarily expands runtime complexity.
- Fully route-driven agent detail pages only: rejected because the spec calls
  for a slide-in panel interaction.

## Decision: Use the current `skills.json` as the authoritative schema and derive media paths

**Rationale**: The existing dataset already contains department accents, room
positions, agent statuses, sprite styles, and invocation metadata. Agent voice
clip paths can be derived from the agent `id`, and room-level counts can be
derived from the department agent arrays. This avoids adding schema fields
before the MVP proves they are necessary.

**Alternatives considered**:

- Adding explicit voice and ambient-audio fields now: rejected because path
  derivation is sufficient for the current scope and the constitution discourages
  unnecessary schema expansion.
- Hardcoding media lookup tables in components: rejected because it violates the
  single-source content rule.

## Decision: Verification stack will use lint, production builds, and browser validation

**Rationale**: The approved dependency set already supports ESLint, strict
TypeScript compilation, and runtime route validation in a real browser. The
feature work can proceed without adding new testing packages during planning.
Formal unit or component test tooling can be proposed later if implementation
work reveals repeated regressions that justify the added dependencies.

**Alternatives considered**:

- Adding Vitest/RTL immediately: rejected for now because it requires new npm
  packages and the constitution requires justification before expanding the stack.
- Relying on visual inspection alone: rejected because build and runtime checks
  are necessary quality gates.

## Decision: Mobile navigation will become a bottom tab bar with department-first browsing

**Rationale**: The desktop sidebar model does not fit narrow screens. On mobile,
the same department navigation can be represented as a bottom bar while the HQ
map gracefully degrades into a scrollable department list. This preserves the
core information architecture without forcing unusable miniature map hit areas.

**Alternatives considered**:

- Shrinking the full isometric map for mobile: rejected because touch targets
  become too small and the layout loses clarity.
- Replacing navigation with a modal menu: rejected because it adds interaction
  overhead to the core browsing flow.
