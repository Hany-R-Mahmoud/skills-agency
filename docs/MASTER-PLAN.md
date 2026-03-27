# The Agency — Master Build Plan
**Design:** Kinetic Terminal (Neon Game Studio)  
**Stack:** Next.js 16, TypeScript, Ant Design v6, SCSS Modules  
**Workflow:** Spec-Driven Development via spec-kit  
**Deploy:** Vercel  
**Version:** 2.0

---

## Tool Routing Strategy

The goal is to use expensive model tokens (Codex/GPT-4.1) only where reasoning and architecture matter,
and push repetitive/heavy-duty work to OpenCode free models.

| Task Type | Tool | Why |
|-----------|------|-----|
| Architecture decisions, schema design | Claude (here) | Best reasoning, use sparingly |
| spec-kit constitution + specify + plan | Codex | High model needed — sets the entire project direction |
| Complex component logic (isometric map, audio engine) | Codex | Needs strong spatial/JS reasoning |
| Repetitive components (AgentCard x31, StatusPip, etc.) | OpenCode | Template work, low reasoning needed |
| SCSS module files | OpenCode | Pure mechanical translation of tokens |
| skills.json sync script | OpenCode | Straightforward file parsing |
| Audio file generation | ElevenLabs MCP | One-time, external |
| spec-kit tasks + implement | OpenCode | Execution of already-designed tasks |
| Debugging / review | Codex | Needs context + reasoning |

---

## Phase 0 — Spec-Kit Setup (do this BEFORE scaffolding)

spec-kit is the workflow backbone. It runs FIRST, before any code is written.
It produces the constitution, spec, plan, and tasks that all subsequent coding follows.

### 0.1 Install specify CLI

```bash
# Install uv first if not present
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install specify CLI (check https://github.com/github/spec-kit/releases for latest tag)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.4.0
```

### 0.2 Initialize spec-kit in the project (run AFTER Next.js scaffold)

```bash
cd the-agency

# For Codex (installs as skills)
specify init . --here --ai codex --ai-skills --force

# OR for OpenCode
specify init . --here --ai opencode --force

# Run both if you'll use both tools
```

This creates:
```
the-agency/
├── .specify/
│   ├── memory/
│   │   └── constitution.md      ← project principles (generated in step 0.3)
│   ├── specs/
│   │   └── 001-the-agency/
│   │       ├── spec.md
│   │       ├── plan.md
│   │       ├── tasks.md
│   │       └── data-model.md
│   └── templates/
└── .agents/skills/              ← spec-kit skills for Codex
    └── speckit-*/
```

### 0.3 Run constitution (use Codex — high model for project principles)

```
$speckit-constitution
Create governing principles for a Next.js 16 + TypeScript + Ant Design v6 + SCSS Modules project.
Principles must cover:
- All styling via CSS custom properties from theme-global.css + SCSS modules (no inline styles, no Tailwind)
- All data from skills.json — no hardcoded content in components
- Ant Design v6 tokens via antd.config.ts only — no component-level overrides
- CSS keyframes for idle/continuous animations, Framer Motion for triggered/interactive
- Web Audio API for UI sounds (no library), pre-generated .mp3 for agent voices
- Accessibility: prefers-reduced-motion respected, mute toggle for all audio
- SCSS module file sits next to every index.tsx that needs it
- TypeScript strict mode — no `any`
```

### 0.4 Run specify (use Codex)

```
$speckit-specify
Build "The Agency" — a showcase website for an AI skills company.
The company has 31 AI agents organized into 6 departments (Command, Engineering, Design, AI Labs, Ops, Security & Research).
The site uses an isometric 3D office floor map as the main navigation. Each department is a room.
Agents appear as animated characters inside their department rooms.
Clicking an agent opens a slide-in panel with their name, role, description, skills, and invocation syntax.
The design is "Neon Game Studio" — pure black background, per-department neon accent colors,
monospace terminal aesthetic, Space Grotesk headings.
The site also has a cinematic homepage hero with the isometric HQ building,
a stats bar (agents online counter), and ambient audio with a mute toggle.
Agent characters have two styles: pixel art and geometric SVG avatars.
Each agent has a pre-generated voice clip that plays on card activation.
All content is driven by a single skills.json data file.
Adding a new agent = add one entry to skills.json + push to deploy.
```

### 0.5 Run plan (use Codex — most important step)

```
$speckit-plan
Tech stack:
- Next.js 16, TypeScript strict, App Router
- Ant Design v6 with CSS variables mode (cssVar: { key: 'agency' })
- SCSS Modules (no Tailwind, no styled-components)
- Framer Motion for page transitions and triggered animations
- CSS @keyframes for idle animations (agent sprites, status pips, scanlines, glows)
- Web Audio API (no library) for UI sound effects
- Pre-generated .mp3 files in /public/audio/agents/ for agent voice clips
- Framer Motion for page transitions
- skills.json as the single data source, loaded via Next.js generateStaticParams
- Vercel deployment with ISR
- SCSS variables import theme-global.css tokens via var(--token) references
- antd.config.ts for all Ant Design theme overrides
- spec-kit for all feature development workflow

Architecture constraints:
- Left sidebar (200px) = department navigator
- Main area = isometric floor map OR department room view
- Agent panel = Ant Design Drawer (420px, right side)
- Mobile: sidebar collapses to bottom tab bar, floor map becomes scrollable dept list
```

### 0.6 Run tasks (use OpenCode — mechanical breakdown)

```
$speckit-tasks
```

### 0.7 Review tasks.md before implementing

Stop here and review the generated tasks.md. Send it to Claude for a quick sanity check
before burning tokens on implementation.

---

## Phase 1 — Project Scaffold (Codex)

One prompt. Run after spec-kit init.

```
Initialize the project structure from the scaffold plan.
Create all directories, install all dependencies, set up next.config.ts,
place theme-global.css in src/styles/, antd.config.ts in src/styles/,
types.ts in src/lib/, skills.json in src/data/.
Do NOT write any component logic yet — only structure and config files.
Reference: codex-scaffold-prompt.md
```

Verify Vercel is connected before moving on:
```bash
npx vercel link
git push origin main  # confirms auto-deploy works
```

---

## Phase 2 — Layout Shell (Codex)

Codex for this phase — layout requires understanding the full navigation model.

### Components to build:
- `src/app/layout.tsx` — root layout with AntD ConfigProvider + theme
- `components/layout/Sidebar/` — dept nav, online counter, mute toggle
- `components/layout/MainArea/` — content host with Framer Motion page transitions
- `src/app/globals.css` — minimal reset only (full tokens in theme-global.css)

### Codex prompt:
```
Build the root layout shell based on the constitution and plan.
Sidebar: 200px, lists 6 departments from skills.json with accent color indicators,
shows "AGENTS ONLINE: N" counter at top (count agents with status=online from skills.json),
mute toggle button at bottom (stores state in localStorage).
MainArea: hosts page content, wraps with Framer Motion AnimatePresence for route transitions.
Use ONLY CSS custom properties from theme-global.css and SCSS modules.
No inline styles. No Tailwind.
```

---

## Phase 3 — Homepage Hero (OpenCode)

OpenCode handles this — mostly CSS animation and static markup.

### Components:
- `src/app/page.tsx` — homepage
- Hero: isometric HQ building (SVG, CSS animated)
- Stats bar: total agents, departments, integrations (count from skills.json)
- "Enter HQ" CTA → navigates to /hq

### OpenCode prompt:
```
Build the homepage hero section.
Isometric building: pure SVG, 5 department floors visible, each floor labeled with dept name
in its accent color. CSS keyframes for subtle idle glow pulse on each floor.
Stats bar below hero: reads from skills.json, shows agent count, dept count.
"ENTER HQ" button uses --accent-cyan, sharp 2px corners, no border-radius.
All styling in page.module.scss using var(--token) references.
```

---

## Phase 4 — Isometric Floor Map (Codex)

This is the most complex component. Use Codex.

### Component: `components/departments/DeptRoom/`

The isometric HQ floor map — SVG-based isometric grid with 6 department rooms.
Each room is a clickable isometric tile. Hover = accent glow. Click = route to /departments/[slug].

### Codex prompt:
```
Build the isometric floor map component.
6 rooms in isometric projection (CSS transform: rotateX(60deg) rotateZ(-45deg) approach
OR hand-crafted SVG isometric polygons — choose whichever is more maintainable).
Each room uses its department accentHex from skills.json for border glow.
Room labels use --font-mono, --text-xs, uppercase.
Hover: box-shadow glow using dept accent color, cursor pointer.
Click: Framer Motion exit animation then Next.js router.push to /departments/[slug].
Rooms should have tiny animated agent sprites (CSS keyframe bobbing, 2-3 per room).
Apply scanline overlay via ::after pseudo-element using --scanline-gradient token.
All dimensions and colors from theme-global.css tokens.
```

---

## Phase 5 — Agent Characters (OpenCode)

31 agents × 2 styles. Mechanical, repetitive — OpenCode territory.

### Component: `components/shared/AgentSprite/`

Two sprite styles as React components that take `{ color, variant, style, status }` props:
- `PixelSprite` — 32×32 SVG pixel art character (geometric pixel blocks)
- `GeometricSprite` — abstract SVG avatar (hexagon/diamond shapes)

Both have a CSS keyframe idle animation (subtle bounce or pulse).
Status pip (online/busy/idle) in corner, using `.pip--{status}` classes from theme-global.css.

### OpenCode prompt:
```
Build AgentSprite component with two sub-variants: PixelSprite and GeometricSprite.
Props: color (hex), variant (1-4), style ('pixel'|'geometric'), status (AgentStatus).
PixelSprite: 32x32 SVG, blocky pixel art humanoid, color fills the body using the color prop.
4 variants = slightly different head/body shapes.
GeometricSprite: 32x32 SVG, abstract diamond/hexagon avatar, color used for accent elements.
Both: CSS keyframe idle animation — subtle 2px vertical bounce, 2s loop.
Status pip: 6x6 circle in corner, uses .pip--{status} class from theme-global.css.
Wrap animation in @media (prefers-reduced-motion: no-preference).
```

---

## Phase 6 — Agent Cards + Department Pages (OpenCode)

### Components:
- `components/agents/AgentCard/` — the terminal-style card shown in dept rooms
- `src/app/departments/[slug]/page.tsx` — department page

### OpenCode prompt:
```
Build AgentCard component from skills.json agent data.
Terminal aesthetic: --surface-inset background, dept accent color as 2px left border,
codename in --font-mono with blinking cursor ::after animation,
role in --text-secondary --text-sm,
status row: StatusPip + label-sm text,
skills as Tag components (Ant Design, overridden via antd.config.ts).
Hover: accent color glow using var(--glow-{color}) token, slight translateY(-2px).
Click: triggers audio playback (see Phase 8) + opens AgentPanel drawer.
All in AgentCard.module.scss.

Department page: grid of AgentCards for that dept's agents.
Dept header: large codename in --font-display, accent color, scanline ::after overlay.
Entry animation: Framer Motion staggerChildren, each card animates in with 50ms delay.
```

---

## Phase 7 — Agent Detail Panel (Codex)

Codex for this — the panel has complex state and needs clean Ant Design Drawer integration.

### Component: `components/agents/AgentPanel/`

Ant Design Drawer, right side, 420px.
Shows: agent name, codename, dept badge, description, skills tags,
invocation block (monospace code box showing both @codex and $opencode syntax),
"replaces" list (collapsed by default).

### Codex prompt:
```
Build AgentPanel as an Ant Design Drawer.
Width: 420px (--agent-panel-width token). Placement: right.
Header: AgentSprite (large, 48px) + agent name + dept badge in accent color.
Body sections:
1. Description paragraph
2. Skills — Ant Design Tag components, using dept accent color tint
3. Invocation block — monospace pre block with copy button, shows codex + opencode syntax
4. Status row — StatusPip + status text + last-active placeholder
5. Replaces — Ant Design Collapse, closed by default, lists original skill names
Close: Framer Motion slide-out.
All colors from theme-global.css. No inline styles.
```

---

## Phase 8 — Audio System (OpenCode)

### Files:
- `src/lib/audio.ts` — Web Audio API engine
- `public/audio/ui/` — click.mp3, transition.mp3, activate.mp3, ambient-hq.mp3
- `public/audio/agents/` — {agent-id}.mp3 × 31 (generated via ElevenLabs — see below)

### OpenCode prompt:
```
Build audio.ts — a Web Audio API engine (no libraries).
Functions:
- initAudio(): creates AudioContext on first user gesture
- playUI(sound: 'click'|'transition'|'activate'|'keystroke'): plays from /public/audio/ui/
- playAgentVoice(agentId: string): plays /public/audio/agents/{agentId}.mp3
- startAmbient(): plays ambient-hq.mp3 on loop, volume 0.15
- stopAmbient(): fade out ambient over 1s
- setMuted(muted: boolean): global mute, persisted to localStorage
- isMuted(): returns current mute state
All playback respects isMuted(). AudioContext created lazily on first interaction.
Ambient fades out when entering a department room, fades back in on return to HQ.
```

### ElevenLabs voice generation (do this separately, one time):
For each of the 31 agents, generate a 2-3 second clip:
`"{name}. {role tagline}."`
Example: "Implementer. Builds approved changes with frontend-first precision."
Use a consistent voice per department (5 voices × 6 depts = 30 voice configs).
Save as `{agent-id}.mp3` in `/public/audio/agents/`.

---

## Phase 9 — Visual Effects (OpenCode)

All CSS — no JS needed here. OpenCode handles it well.

### Effects to add:
1. Scanline overlay — already in theme-global.css as `--scanline-gradient`
   Apply via `::after` on `.dept-room`, `.hero-section`, `.agent-panel`

2. Status pip blink — CSS keyframe, already in theme-global.css as `.pip--online`

3. Terminal cursor blink — `::after { content: '_'; animation: blink 1s step-end infinite; }`

4. Dept accent glow bleed — on active sidebar item and active room
   `box-shadow: var(--glow-cyan)` (or relevant dept color)

5. Agent card hover — translateY(-2px) + glow, 150ms ease

6. Room transition flash — Framer Motion: brief white flash overlay (opacity 0→0.1→0) on route change

### OpenCode prompt:
```
Add visual effects across all components.
1. Add scanline ::after to: .hero, .dept-room-container, .agent-panel header
2. Cursor blink on all .codename elements (::after content:'_')  
3. Verify all .pip--online elements have their blink animation from theme-global.css
4. Add page transition flash overlay in MainArea component:
   Framer Motion div, position absolute, full coverage,
   animate: opacity [0, 0.08, 0] over 200ms on route change
5. Verify prefers-reduced-motion disables all keyframe animations
```

---

## Phase 10 — Skills Sync Script (OpenCode)

Automates updating skills.json from your actual SKILL.md files.

### File: `scripts/sync-skills.ts`

```
Build scripts/sync-skills.ts using Node.js + fs/path only (no extra deps).
Reads all SKILL.md files from a skills directory path (passed as CLI arg).
Extracts YAML frontmatter: name, description, triggers.
Matches each skill to the existing agent entry in skills.json by id.
Updates: description field from frontmatter description.
Outputs updated skills.json with a new lastUpdated timestamp.
Usage: npx tsx scripts/sync-skills.ts ../skills/
Prints a summary: N agents updated, N not matched.
```

---

## Phase 11 — Mobile + Polish (OpenCode)

```
Add mobile responsiveness:
- Sidebar: below 768px, hide sidebar, show bottom tab bar with 6 dept icons
- Floor map: below 768px, replace isometric map with vertical scrollable dept card list
- Agent panel: below 768px, Drawer becomes full-width bottom sheet
- Agent grid: 1 column on mobile, 2 on tablet, 3+ on desktop

Final polish:
- SEO: add metadata in layout.tsx (title, description, og:image)
- Add favicon using dept command accent color
- Verify all Ant Design components use theme tokens (no defaults leaking through)
- Lighthouse audit — target 90+ performance
```

---

## Phase 12 — Deploy

```bash
# Verify build
npm run build

# Deploy to Vercel production
npx vercel --prod

# Set env vars in Vercel dashboard if needed (none required for static site)
```

---

## Audio File Checklist

UI sounds (generate or find free CC0):
- [ ] `public/audio/ui/click.mp3` — short 50ms beep
- [ ] `public/audio/ui/keystroke.mp3` — mechanical key click
- [ ] `public/audio/ui/transition.mp3` — whoosh/sweep
- [ ] `public/audio/ui/activate.mp3` — power-on blip
- [ ] `public/audio/ui/ambient-hq.mp3` — low hum loop, 30s

Agent voices (ElevenLabs, one per agent):
- [ ] `public/audio/agents/team-lead.mp3`
- [ ] `public/audio/agents/team-lead-lite.mp3`
- [ ] `public/audio/agents/team-lead-full.mp3`
- [ ] `public/audio/agents/agent-orchestrator.mp3`
- [ ] `public/audio/agents/agent-history.mp3`
- [ ] `public/audio/agents/agent-implementer.mp3`
- [ ] `public/audio/agents/frontend-react-and-next.mp3`
- [ ] `public/audio/agents/backend-and-language-engineering.mp3`
- [ ] `public/audio/agents/fullstack-engineering.mp3`
- [ ] `public/audio/agents/mobile-engineering.mp3`
- [ ] `public/audio/agents/systems-architecture.mp3`
- [ ] `public/audio/agents/interface-and-design.mp3`
- [ ] `public/audio/agents/design-to-code.mp3`
- [ ] `public/audio/agents/visual-artifacts.mp3`
- [ ] `public/audio/agents/agent-impeccable.mp3`
- [ ] `public/audio/agents/ai-systems-engineering.mp3`
- [ ] `public/audio/agents/mcp-development.mp3`
- [ ] `public/audio/agents/agent-orchestration.mp3`
- [ ] `public/audio/agents/prompt-optimizer.mp3`
- [ ] `public/audio/agents/agent-reviewer.mp3`
- [ ] `public/audio/agents/agent-tester.mp3`
- [ ] `public/audio/agents/testing-and-verification.mp3`
- [ ] `public/audio/agents/agent-debugging.mp3`
- [ ] `public/audio/agents/debugging-and-diagnostics.mp3`
- [ ] `public/audio/agents/review-and-pr-operations.mp3`
- [ ] `public/audio/agents/platform-engineering.mp3`
- [ ] `public/audio/agents/agent-security.mp3`
- [ ] `public/audio/agents/security-engineering.mp3`
- [ ] `public/audio/agents/research-and-reasoning.mp3`
- [ ] `public/audio/agents/agent-docs.mp3`
- [ ] `public/audio/agents/documentation-and-doc-ops.mp3`

---

## Updating Skills Later

1. Edit `skills.json` directly — OR —
2. Run `npx tsx scripts/sync-skills.ts ../path/to/skills/`
3. `git add src/data/skills.json && git commit -m "chore: sync skills"`
4. `git push` → Vercel deploys automatically in ~30s

New agent appears on the website with zero code changes.
