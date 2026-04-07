# Replit Master Prompt: Turn The Agency Website Into a Native Mobile App

Use this document as the primary build prompt inside Replit. It is intentionally detailed so the resulting mobile app can be produced with minimal human intervention while staying faithful to the existing website.

## How To Use This Prompt

1. Import or upload the current website codebase into Replit if possible.
2. Give Replit this entire markdown file as the implementation brief.
3. Tell Replit to treat the live code and data as the source of truth over any older planning notes.
4. Ask Replit to build in phases and keep the app runnable at the end of each phase.

---

# BEGIN READY-TO-PASTE PROMPT

## Mission

Build a **native mobile app** version of my existing website, **The Agency**, using a stack that works well in Replit and produces a high-quality iOS and Android experience.

This is **not** a webview wrapper task.
This is **not** a “mobile website inside an app shell” task.
This is a **real mobile product adaptation** of the existing website.

The app must preserve:

- The current brand identity
- The current design system
- The current department and agent structure
- The current copy and content model
- The current portraits, assets, audio files, downloads, and data relationships
- The current “cinematic editorial command floor” feel
- The current dark/light theming behavior

The app must feel like the same product evolved into mobile, not like a generic template rebuild.

## Non-Negotiable Product Direction

- Build the app with **Expo + React Native + Expo Router + TypeScript strict mode**
- Prefer a **native-first architecture** because the source site is already React/TypeScript and this gives the cleanest path to parity
- Do **not** use a WebView except for unavoidable external links
- Do **not** redesign the brand into generic mobile SaaS UI
- Do **not** invent a new visual language
- Do **not** hardcode content that already exists in structured data
- Do **not** trust old planning docs if they conflict with the live app code and data

## Source Of Truth Priority Order

When information conflicts, use this order:

1. **Live implementation files**
2. **`src/data/skills.json`**
3. **Theme tokens from `src/styles/theme-global.css`**
4. **Supporting UI logic from `src/lib/utils.ts`, `src/lib/types.ts`, and current route components**
5. Older docs and specs only when they do not conflict with the current shipped implementation

Very important:

- Some older documents still mention **31 agents**
- The current live implementation actually exposes **19 public agents**
- The app must follow the **current live implementation: 19 agents, 6 departments**

## Existing Project Snapshot

Current web app stack:

- Next.js 16
- React 19
- TypeScript
- Ant Design 6
- SCSS modules
- Structured JSON content model

Current product shape:

- Homepage / command floor
- Department detail pages
- Agent profile pages
- Shared sidebar and mobile department navigation
- Downloadable agent and department packs
- Portrait-first roster
- Cinematic editorial UI
- Optional audio architecture already present in the repo

Current live data snapshot:

- Product name: **The Agency**
- Version: **3.0.0**
- Last updated in data: **2026-04-06**
- Total public agents: **19**
- Total departments: **6**
- Mode: **agent-first**

## Existing Data Model You Must Preserve

The data is currently driven from:

- `src/data/skills.json`

This single file is the main content source.
The mobile app must preserve the same pattern:

- One authoritative structured data source
- Derived view models for UI
- No duplicated handwritten content across screens

Preserve these entity concepts:

- `Department`
- `Agent`
- `AgentInvocation`
- `AgentPlaybook`
- `AgentAchievement`
- `SidebarDepartmentSummary`
- `SiteStats`
- `AgentDetailView`
- `RoomTile`

If helpful on mobile, you may normalize the JSON into typed client-side selectors, but do not break the source-of-truth model.

## Existing Departments

The app must preserve these six departments and their roles:

1. **Command Center**
   Slug: `command`
   Purpose: task framing, coordination, sequencing, and lead-agent routing

2. **Engineering & Systems**
   Slug: `engineering`
   Purpose: implementation, architecture, AI systems, and performance engineering

3. **Product & Design**
   Slug: `design`
   Purpose: frontend feel, Stitch workflows, diagrams, and agent composition design

4. **Ops & Quality**
   Slug: `quality`
   Purpose: review, verification, debugging, and evidence-driven release confidence

5. **Security & Platform**
   Slug: `security`
   Purpose: trust boundaries, infrastructure operations, and production risk control

6. **Research & Continuity**
   Slug: `knowledge`
   Purpose: documentation, research, and structured continuity across tools and sessions

## Existing Public Agent Roster

Preserve this exact live roster from the current data unless the imported repo shows something newer:

### Command Center

- `agent-co-pilot` — Co-Pilot
- `agent-pilot` — Pilot
- `agent-orchestrator` — Orchestrator

### Engineering & Systems

- `agent-implementer` — Implementer
- `agent-architect` — Architect
- `agent-data-ai` — Data AI
- `agent-performance` — Performance

### Product & Design

- `agent-impeccable` — Impeccable
- `agent-stitch` — Stitch
- `agent-diagrams` — Diagrams
- `agent-composer` — Composer

### Ops & Quality

- `agent-reviewer` — Reviewer
- `agent-tester` — Tester
- `agent-debugging` — Debugger

### Security & Platform

- `agent-security` — Security
- `agent-ops` — Ops

### Research & Continuity

- `agent-docs` — Docs
- `agent-history` — Historian
- `agent-researcher` — Researcher

## Existing Assets You Must Account For

### Downloads

The current website exposes downloadable packs from:

- `public/downloads/agents/*.zip`
- `public/downloads/departments/*.zip`
- `public/downloads/the-agency-public-agents.zip`

The mobile app must surface this capability in a mobile-appropriate way:

- Open external download link
- Or download/share locally
- Or present “Open Pack” / “Share Pack” actions

Do not silently drop this feature.

### Portraits

There are portrait assets in:

- `public/portraits/normalized/`

There are also remote images served from:

- `ik.imagekit.io`

The app must support both local bundled assets and remote image URLs.

### Office / Department Imagery

The web app uses remote office visuals and floor-map imagery from ImageKit.
The mobile app should preserve these visuals where appropriate:

- Homepage / floor-map style imagery
- Department hero images
- Portrait-first cards

### Audio

There are UI and agent audio assets in:

- `public/audio/ui/`
- `public/audio/agents/`

Important implementation note:

- The current website has the audio architecture in place
- The current `src/lib/audio.ts` keeps `AUDIO_ENABLED = false`

That means the mobile app should be architected to support audio cleanly, but the first shipping state can either:

- keep audio disabled by default to match current live behavior, or
- implement it behind a clear feature flag

Do not break the architecture for it. Preserve the path for ambient audio, UI sounds, and agent voice cues.

## Existing Design System You Must Preserve

The design language is defined primarily in:

- `src/styles/theme-global.css`
- `src/styles/antd.config.ts`
- the current SCSS modules

This is a **cinematic editorial command floor** aesthetic.
It is not generic startup UI.
It is not playful consumer UI.
It is premium, dark, atmospheric, technical, and intentional.

### Typography

Use the same font families if licensing and platform support allow:

- Display: **Syne**
- Body: **Manrope**
- Mono: **JetBrains Mono**

If exact usage needs Expo font loading:

- Use `expo-font`
- Bundle or fetch fonts correctly
- Make typography loading feel polished

### Shape Language

Preserve:

- Sharp or nearly sharp corners
- Terminal-like cards
- Thin borders
- Glassy overlays
- Structured editorial spacing
- Monospace labels for system/status metadata

Do not round everything.
Do not turn the product into a soft-pill design system.

### Dark Theme Tokens

Preserve the token-driven approach, especially:

- `--surface-void`
- `--surface-inset`
- `--surface-lift`
- `--surface-high`
- `--surface-mid`
- `--text-primary`
- `--text-secondary`
- `--text-tertiary`
- `--border-default`
- `--border-ghost`
- `--font-display`
- `--font-body`
- `--font-mono`

Department identity is token-based:

- Command: cyan
- Engineering: amber
- Design: coral
- Quality: green
- Security: purple/red department identity as expressed by current live UI and data
- Knowledge: gold/lilac knowledge identity as expressed by current live UI and data

If there are token-vs-data inconsistencies, match the **rendered live design intent**, not old comments.

### Light Theme

The site supports dark/light theming.
The mobile app must also support both.

Requirements:

- Theme setting persists locally
- System theme can be respected
- Manual override available
- Token mapping centralized
- No ad-hoc inline color decisions scattered throughout the app

## Existing Interaction Model To Adapt For Mobile

The web app currently behaves like this:

### Homepage

- Strong hero with “THE AGENCY”
- Stats blocks
- Call to action into the floor
- Command-floor identity
- Floor map section
- Department index section

### Department Pages

- Department tab strip
- Download department action
- Return to floor action
- Hero section with system badge and department image
- Metrics cards
- Pulse chart / operation telemetry feeling
- Feed panel
- Agent roster section
- Systems/infrastructure section

### Agent Pages

- Large portrait
- Status pip
- Department context
- Codename
- Role
- Voice line
- About section
- Invocation commands
- Download pack action
- Skills chips
- “Best used when” guidance cards
- Playbook wall
- Achievement wall if present
- Related agents

### Shared Navigation

- Sidebar on desktop
- Mobile bottom navigation on web
- Theme toggle
- Department quick access

## How To Translate This Into Mobile UX

Do not copy the desktop layout literally.
Adapt it intelligently for mobile while preserving the same mood and hierarchy.

### Recommended App Information Architecture

Use Expo Router with this overall structure:

- `(tabs)/index` or equivalent for Home / HQ
- `(tabs)/departments` or department discovery
- `departments/[slug]`
- `agents/[id]`
- `settings` or theme/media preferences

### Recommended Native Navigation Pattern

Use a hybrid approach:

- Bottom tabs for top-level navigation
- Stack navigation for department and agent detail
- Keep the command-floor concept visible in the IA

Recommended tabs:

1. Home / HQ
2. Departments
3. Agents
4. Downloads
5. Settings

Alternative acceptable approach:

- Home
- Departments
- Search
- Downloads
- Settings

If you choose a different tab structure, explain why and keep parity with the current product.

### Screen List To Build

Build at minimum these screens:

1. **Home / HQ Screen**
2. **Departments Index Screen**
3. **Department Detail Screen**
4. **Agents Index or Search Screen**
5. **Agent Detail Screen**
6. **Downloads / Packs Screen**
7. **Settings Screen**

Optional but encouraged:

- Splash / launch experience
- About The Agency screen
- Search results screen
- Favorites or recently viewed agents

## Mobile Screen Requirements

### 1. Home / HQ Screen

This should be the mobile translation of the website homepage.

Must include:

- Strong cinematic hero
- “The Agency” branding
- Version / live roster metadata
- Total agents
- Total departments
- Playbook count or similar stats derived from data
- Entry points to explore departments
- A visual “floor map” section or mobile-appropriate reinterpretation
- A department index preview

Recommended mobile adaptation:

- Hero at top with layered gradients and editorial type
- Horizontal stat cards
- “Explore the floor” CTA
- Department carousel or stacked feature cards
- A stylized HQ map illustration or abstract command-floor visual panel

### 2. Departments Index Screen

This is the clearest mobile browsing surface for departments.

Must include:

- All six departments
- Department accent identity
- Tagline
- Agent count
- Live/online count
- Visual consistency with the website’s department cards

Recommended UI:

- Large vertical cards
- Optional segmented filters
- Search by department name or function

### 3. Department Detail Screen

This screen must preserve the web department page structure while adapting it natively.

Must include:

- Department name
- Tagline
- Department hero visual
- Metrics cards
- Operations / telemetry section
- Feed / updates section
- Agent roster grid or list
- Systems / infrastructure section
- Download department pack action

Recommended mobile structure:

- Scroll view
- Sticky top action bar or header
- Hero image with overlay badge
- Metric cards in horizontal or 2-column wrap
- Pulse chart simplified into native bars
- Feed cards
- Agent cards
- System cards

### 4. Agents Index / Search Screen

The web app is route-first, but mobile benefits from a dedicated discovery surface.

Build:

- Search input
- Filter by department
- Filter by status
- Sort by name or department
- Agent cards with portrait, status, role, department

This screen should feel like a fast native directory layered on top of the same data model.

### 5. Agent Detail Screen

This is one of the most important screens in the app.

Must include:

- Portrait-first layout
- Department context
- Status pip and status label
- Name
- Codename
- Role
- Voice line
- About section
- Invocation commands
- Download pack action
- Skills chips
- Best-used-when guidance
- Playbooks section
- Achievements section when data exists
- Related agents section

The screen should feel premium, immersive, and highly legible.

Recommended interactions:

- Share profile
- Copy invocation command
- Open/download pack
- Play voice cue if enabled

### 6. Downloads / Packs Screen

This screen should centralize access to:

- Full agency pack
- Department packs
- Individual agent packs

Recommended actions:

- Download
- Share
- Open external link
- Save for later

If native file handling is used:

- keep it robust
- use safe file APIs
- handle permissions gracefully

### 7. Settings Screen

Must include:

- Theme mode: system / dark / light
- Audio enabled toggle
- UI sound toggle if audio is supported
- Motion reduction toggle or honor system accessibility
- About/version info
- Optional credits/assets info

## Recommended Technical Stack

Use:

- Expo
- Expo Router
- React Native
- TypeScript strict
- `expo-font`
- `expo-linear-gradient`
- `react-native-reanimated`
- `react-native-safe-area-context`
- `react-native-svg`
- `expo-image` if helpful for remote/local images
- `expo-file-system` and/or `expo-sharing` for packs
- `expo-av` or current Expo-supported audio package only if you implement audio

You may also use:

- Zustand for tiny client state if helpful
- FlashList if lists become large

Do not introduce heavy or messy state management unless clearly needed.

## Architecture Requirements

### Data Layer

Create a mobile-friendly typed data layer that mirrors the current website:

- `data/skills.json`
- `lib/types.ts`
- `lib/selectors.ts` or `lib/utils.ts`
- derived stats helpers
- search/filter helpers

Preserve:

- route-safe slugs and IDs
- derived site stats
- related agents
- department summaries
- download URL resolution
- image resolution
- voice clip resolution

### Design Tokens

Create a centralized token module for React Native, for example:

- `src/theme/tokens.ts`
- `src/theme/colors.ts`
- `src/theme/typography.ts`
- `src/theme/spacing.ts`
- `src/theme/theme-provider.tsx`

Do not scatter literal hex codes everywhere.
Mirror the web token system structurally even though React Native does not use CSS variables.

### Components

Build reusable components for:

- Screen shell
- Section header
- Department card
- Agent card
- Agent portrait frame
- Status pip
- Stat card
- Feed item
- Systems card
- Skill chip
- Invocation card
- Download action row
- Theme toggle row

Keep components composable and typed.

## Visual Direction Requirements

### Overall Mood

The app should feel:

- cinematic
- premium
- editorial
- technical
- immersive
- slightly futuristic
- structured, not noisy

### What To Avoid

Avoid:

- generic mobile SaaS UI
- bright white default screens
- random gradients with no system
- oversized rounded corners everywhere
- pastel toy-like color treatment
- card soup
- default React Native typography
- generic tab icons with no integration into the visual language

### Motion

Use motion with restraint:

- subtle entry reveals
- gentle parallax or depth
- status pulse
- hover equivalents translated into press feedback
- section stagger where useful

Respect reduced-motion preferences.

### Mobile-Native Interpretation

You should **translate** desktop ideas into mobile, not shrink them mechanically.

Examples:

- Sidebar becomes bottom navigation + top actions
- Large web hero becomes stacked editorial hero
- Office floor map becomes either an interactive hero panel or a mobile card deck
- Department tabs become horizontal chips or pills only if they still feel on-brand
- Dense command panels become collapsible native sections if needed

## Content Fidelity Requirements

Preserve current copy and content meaning from the live site.

That includes:

- titles
- taglines
- descriptions
- voice lines
- invocation commands
- playbook titles and descriptions
- achievements
- status labels

Do not rewrite content unless clearly needed for mobile truncation.
When truncation is needed, preserve tone.

## Accessibility Requirements

The mobile app must be accessible.

Include:

- proper contrast
- scalable text behavior where reasonable
- screen-reader labels
- semantic accessibility props
- reduced-motion handling
- meaningful hit targets
- safe-area correctness
- loading and empty states

## Performance Requirements

The app should feel smooth on normal phones.

Requirements:

- no unnecessary re-renders
- images sized appropriately
- avoid giant blocking bundles
- virtualize long lists if needed
- preload fonts and essential assets cleanly
- keep startup polished

## Audio Requirements

If you implement audio in the first pass:

- ambient audio must be optional
- UI sounds must be optional
- agent voice cues must be optional
- audio must respect mute state
- audio preferences must persist

If you do not implement audio in the first pass:

- keep the architecture ready
- keep settings UI honest
- label the feature clearly as disabled or coming soon
- do not ship broken placeholder buttons

## Download / Pack Requirements

The website currently exposes these pack types:

- full agency pack
- department packs
- individual agent packs

The mobile app must preserve this feature with a reasonable native adaptation.

Possible implementations:

- open public URL in browser
- download to app cache then share
- share directly via native share sheet

Recommended behavior:

- tap pack button
- show action sheet
- “Open”
- “Share”
- “Download”

Handle failures gracefully.

## Search Requirements

The mobile app should improve discoverability beyond the website if practical.

Build search across:

- agent name
- codename
- role
- department
- skills
- playbook names

Provide:

- instant filtering
- empty state
- clear button
- compact native result cards

## Theme Requirements

Implement:

- system theme detection
- manual dark mode
- manual light mode
- persistent preference

Mirror the current web theme intent:

- dark by default feel
- light mode is real and well-designed, not an afterthought

## Data Sync Expectations

If the repo is available in Replit:

- import `skills.json`
- import or mirror the relevant assets
- preserve IDs and slugs

If the repo is not available:

- recreate the data model from this prompt
- structure it so future sync from the website repo is easy

Design the code so updating the mobile app later is straightforward:

- one content source
- one token source
- one asset-resolution layer

## Recommended Build Plan

Implement in this order:

### Phase 1

- Initialize Expo + TypeScript + Expo Router
- Set up theme system
- Set up fonts
- Set up data layer
- Set up root navigation
- Create reusable shell and base components

### Phase 2

- Build Home / HQ screen
- Build Departments index
- Build Department detail screen

### Phase 3

- Build Agents discovery screen
- Build Agent detail screen
- Build related agent navigation

### Phase 4

- Build Downloads screen
- Build Settings screen
- Add theme persistence
- Add search/filtering

### Phase 5

- Add audio architecture or feature flag
- Add motion polish
- Add loading states
- Add error handling
- Add final QA passes

## Output Expectations

At the end, provide:

1. A working Expo mobile app
2. Clean typed architecture
3. Instructions to run locally
4. A short summary of what was built
5. A list of known gaps, if any

## Quality Bar

The final result should feel like:

- a proper premium companion product
- a faithful mobile evolution of the existing website
- something I could continue improving later

It should **not** feel like:

- a quick prototype
- a generated mock
- a generic mobile starter
- a web page awkwardly ported into a phone frame

## Concrete File Guidance From The Existing Website

You should inspect and map the following files if they exist in the imported repo:

- `src/data/skills.json`
- `src/lib/types.ts`
- `src/lib/utils.ts`
- `src/lib/theme.ts`
- `src/lib/audio.ts`
- `src/styles/theme-global.css`
- `src/styles/antd.config.ts`
- `src/app/page.tsx`
- `src/app/page.module.scss`
- `src/app/departments/[slug]/page.tsx`
- `src/app/departments/[slug]/page.module.scss`
- `src/app/agents/[id]/page.tsx`
- `src/components/layout/Sidebar/index.tsx`
- `src/components/layout/MainArea/index.tsx`
- `src/components/departments/OfficeFloor/index.tsx`
- `src/components/departments/DeptRoom/index.tsx`
- `src/components/agents/AgentPage/index.tsx`
- `src/components/agents/AgentPortrait/index.tsx`
- `src/components/agents/PlaybookWall/index.tsx`
- `src/components/agents/AchievementWall/index.tsx`
- `public/downloads/`
- `public/audio/`
- `public/portraits/`

## Behavior Translation Notes

Preserve these website behaviors in mobile form:

- stats derived from structured data
- department quick access
- theme persistence
- portrait-first agent identity
- status indicators
- downloadable packs
- department context everywhere
- strong command-floor branding

For web-only behaviors, translate them sensibly:

- sidebar becomes bottom tabs + header actions
- large floor map becomes a mobile-first discovery component
- desktop dense panels become vertically stacked native sections

## Guardrails Against Wrong Decisions

If you are uncertain between two options, prefer the option that:

- keeps the content model closer to the website
- keeps the visual identity closer to the website
- keeps the codebase simpler and more maintainable
- feels more native on mobile without losing brand parity

Reject these failure modes:

- rebuilding content manually in JSX
- changing department names
- flattening all screens into one generic list
- replacing editorial typography with defaults
- ignoring downloads
- ignoring theme support
- ignoring asset handling
- trusting outdated “31 agents” docs over current data

## Final Build Validation Checklist

Before calling the work complete, verify:

- The app runs in Expo
- TypeScript is clean
- Theme switching works
- All 6 departments render
- All 19 agents render
- Department detail pages work
- Agent detail pages work
- Search/filtering works if implemented
- Download actions are wired
- Remote and local images are handled safely
- Fonts load correctly
- No obvious brand drift from the website
- The app feels premium on mobile

## Important Implementation Philosophy

I care more about:

- fidelity to the existing product
- clean architecture
- future maintainability
- minimal need for manual cleanup later

than I care about:

- quickly hacking together a rough demo
- cutting corners on design system structure
- rewriting the brand into something generic

Please build this like a serious production-quality mobile adaptation of the current website.

# END READY-TO-PASTE PROMPT
