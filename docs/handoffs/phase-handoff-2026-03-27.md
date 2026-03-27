# The Agency — Current Phase Handoff

## Status

The current implementation phase is functionally complete and deployed.

Core site behavior is working:

- homepage
- isometric HQ map
- department navigation
- agent cards
- agent drawer
- standalone agent pages
- live data from `skills.json`
- mute toggle
- mobile layout
- build/deploy pipeline

Audio is also implemented and working in production, but with two explicit
deferrals:

1. HQ ambient audio is currently disabled
2. Agent voice persona polish is deferred to a later refinement phase

So this phase is considered complete for progression, but not the final word on
audio polish.

## Live State

- Production URL: https://skills-agency.vercel.app
- Latest pushed commit for the functional audio fix before this handoff: `4ddd149`
- Branch: `main`

## What Codex Completed

### Product / UI

- Built the homepage hero and command-floor shell
- Implemented the isometric SVG HQ map
- Implemented department room pages
- Implemented agent cards and slide-in drawer
- Implemented standalone agent profile routes
- Implemented sidebar navigation and mobile quick-nav

### Data / Architecture

- All content is still driven from `src/data/skills.json`
- Static route generation works for departments and agents
- TypeScript strict build passes
- Styling remains SCSS modules + shared theme tokens

### Audio

- Added runtime audio system in `src/lib/audio.ts`
- Added mute persistence
- Added UI sound playback
- Added agent voice playback
- Added browser audio fallback using `HTMLAudioElement` when needed

### Generated Audio Assets

- Agent voices exist in `public/audio/agents/`
- UI sounds exist in `public/audio/ui/`

## Important Audio Decision

ElevenLabs integration was researched and configured through Composio/Rube MCP.
However, ElevenLabs free-tier synthesis was blocked by service-side abuse
detection.

Because of that, Codex used local macOS speech generation as the zero-cost
fallback:

- generated local agent voice files
- generated local UI audio files
- updated runtime to prefer real local assets

This means:

- audio is working
- no paid dependency was required
- voice quality is acceptable for this phase, but not final-polish quality

## Explicitly Deferred To Next Phase

These are intentional carryovers, not hidden bugs:

1. HQ ambient audio polish

- Ambient loop was generated and tested
- It felt distracting / unpleasant
- Ambient is now disabled for the current release
- Future phase can reintroduce a better ambient bed or remove it permanently

2. Agent voice persona refinement

- Voices now play reliably
- But they are not yet the final desired character-grade performance
- Future phase can tune:
  - per-agent voice selection
  - pacing
  - emotional tone
  - pauses
  - more human phrasing
  - eventual higher-quality TTS / recorded replacements

## Verification Completed

Codex verified repeatedly with:

- `npx tsc --noEmit`
- `npm run build` / `npx next build --webpack`

Production asset checks also confirmed:

- audio files are being served by Vercel
- runtime fallback paths exist
- rebuilt agent pack is deployed

## Key Files Changed During This Phase

### Runtime

- `src/lib/audio.ts`

### Audio planning / generation docs

- `docs/audio/elevenlabs-lines.txt`
- `docs/audio/elevenlabs-voice-manifest.csv`
- `docs/audio/elevenlabs-casting-sheet.md`
- `docs/audio/elevenlabs-production-guide.md`

### Audio assets

- `public/audio/agents/*`
- `public/audio/ui/*`

### Supporting script

- `scripts/render-agent-audio.swift`

## Recommendation For Next Phase

Treat the next phase as refinement/polish rather than unfinished
implementation.

Good next-phase topics:

- restore or redesign HQ ambient audio
- replace local generated voices with better persona-driven voices
- deepen emotional differentiation between agents
- final sound design polish
- final production QA across desktop/mobile/audio UX

## Bottom Line

The current phase is complete enough to proceed.

The only non-final parts are audio polish choices that were intentionally
deferred:

- ambient mood design
- higher-quality humanized voice persona work
