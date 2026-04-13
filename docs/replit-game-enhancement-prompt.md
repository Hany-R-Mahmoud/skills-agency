# Replit Enhancement Prompt: Harden, Deepen, Expand, And Polish The Agency Command Ops

Use this prompt after the current game prototype is already running.

This is not a "start over" prompt.
This is a full **enhancement, hardening, content expansion, and polish pass** for the current build.

---

# BEGIN READY-TO-PASTE PROMPT

The current prototype of **The Agency: Command Ops** is in a good place.
Do **not** rebuild it from scratch.
Do **not** redesign the whole game.
Do **not** replace working systems with generic alternatives.

Your task is to **upgrade the current vertical slice into a much stronger, deeper, more playable, more polished, more content-rich version** while preserving the existing architecture, game identity, and core systems.

## Current State Summary

The game already has:

- onboarding
- HQ command floor
- operations board
- mission prep
- mission resolution
- agent roster
- agent detail
- department view
- HQ upgrades
- profile
- story events
- 19 agents
- 6 departments
- progression
- trust / relationship logic
- upgrades
- local save system

This is a strong foundation.

Now improve it significantly in one pass.

## Main Goal

Take the current prototype from "good first playable build" to "serious, polished vertical slice with stronger retention, clarity, consequence, content density, and emotional weight."

Focus on:

1. fixing correctness issues
2. deepening the game loop
3. improving feedback and clarity
4. making progression feel more alive
5. increasing replayability
6. expanding chapter and operations content
7. strengthening long-term retention systems
8. preserving the premium visual identity

## Priority Order

Work in this order unless the codebase makes a small reordering clearly better.

## Priority 1: Correctness and UX Bugs

Fix any obvious broken or incomplete flows first.

This includes:

- wire the `StoryEvent` dismiss handler correctly
- ensure story events can be dismissed intentionally and safely
- ensure they do not get stuck or replay incorrectly
- ensure mission completion and event triggering logic remain consistent after dismissal
- ensure event state, story flags, and save/load behavior stay coherent

If there are other obvious broken flows discovered during implementation, fix them too.

## Priority 2: Mission Depth Upgrade

The current missions are too short.

Upgrade operations so that a meaningful subset have **multi-phase branching**.

Requirements:

- keep existing operations if possible
- expand them rather than replacing them all
- add multiple decision phases to at least several operations
- make decisions reflect:
  - squad composition
  - department condition
  - trust relationships
  - rivalry penalties
  - current upgrades
  - prior outcomes when possible

Mission flow should feel more like:

1. pre-brief
2. decision point
3. complication
4. escalation or adaptation
5. resolution

Do not make every mission identical.
Create variation in structure and pressure.

## Priority 3: Chapter And Operations Content Expansion

The game now needs more content density so it feels like a living world instead of a thin prototype.

Expand the current content layer significantly without breaking existing systems.

### Add Chapter Structure

Introduce a lightweight chapter or arc structure for the current vertical slice.

Recommended framing:

- Chapter 1: Orientation and First Pressure
- Chapter 2: Operational Complexity
- Chapter 3: Trust, Rivalry, and Consequence
- Chapter 4: Agency Reputation Under Stress
- Chapter 5: Hidden Structural Weakness

These chapters do not need to lock the game into a rigid linear structure.
They should act as progression frames for unlocking more serious operations, narrative stakes, and system interactions.

### Expand Operations

Increase the quantity and quality of operations.

Add more operations with stronger variation across:

- stakes
- departments involved
- structure
- difficulty
- branching outcomes
- relationship consequences
- long-tail consequences

All new operations must stay grounded in The Agency's actual world:

- product failures
- launch emergencies
- security incidents
- design system breakdown
- performance collapse
- architecture fragility
- documentation blackouts
- market pressure
- cross-team misalignment
- platform migration risk
- research races
- reputation crises
- enterprise client escalations

Do not add fantasy or unrelated genres.

### Operation Categories To Add

Expand the content set so the game includes a more compelling spread such as:

- emergency rescue operations
- stealth diagnosis operations
- long-burn stabilization operations
- trust-sensitive internal conflict operations
- high-visibility reputation operations
- multi-department crisis operations
- high-risk optional operations
- branching mystery operations tied to hidden agency tensions

### Mission Variety Requirements

Do not just create more text variants of the same mission.
Increase actual gameplay variety through:

- different squad-size needs
- different phase counts
- different choice types
- different forms of escalation
- different reward structures
- different consequences

### Consequence Expansion

Operation outcomes should more visibly affect:

- trust
- rivalry
- department morale
- department load
- credits
- unlocks
- story flags
- future mission availability
- HQ pressure
- reputation

## Priority 4: Tutorial, Tooltips, And System Clarity

The current prototype likely asks too much of the player too early.

Add a lightweight onboarding/help layer that explains:

- trust
- morale
- synergy
- rivalry penalties
- rank
- department load
- credits
- upgrades
- why missions succeed or fail

Preferred implementation:

- concise tooltips
- info icons
- short first-time hints
- optional contextual help rather than long forced tutorials

Do not make the game feel over-explained.
Make it feel clear.

## Priority 5: Feedback, Motion, And Juice

The prototype needs more feedback on action.

Add tasteful feedback, not noisy feedback.

Add:

- transitions between core screens
- mission launch feedback
- mission success/failure result emphasis
- upgrade purchase feedback
- trust increase/decrease feedback
- level-up feedback
- alert and event reveal feedback
- subtle hover/press feedback

If possible, add restrained animation for:

- dashboard panels
- active alerts
- operation cards
- relationship/trust changes
- department status shifts
- chapter transitions

If sound is easy to add cleanly, add minimal UI/audio feedback architecture.
If not, structure for it and focus on visuals first.

Do not turn the interface into a noisy arcade UI.
Keep the premium command-center tone.

## Priority 6: Operations History And State Visibility

The game already tracks history, but it is not surfaced strongly enough.

Add a more visible operations history layer.

This can be:

- a recent operations panel on the HQ screen
- a timeline in profile
- a mission archive/log
- a history modal or route

The player should be able to feel that their choices are creating a real record.

Show things like:

- mission name
- squad used
- outcome
- key consequence
- trust changes
- resource impact
- timestamp or sequence order

## Priority 7: Better Department And Upgrade Feedback

Department View and HQ Upgrades should feel more alive.

Improve them with:

- clearer before/after values
- visual stat deltas
- stronger identity per department
- more visible effects from upgrades
- better signaling when a department is overloaded or thriving

The player should immediately feel:

- what improved
- what is in danger
- what needs attention

## Priority 8: Better Strategic Readability

The player should more clearly understand why outcomes happened.

Add readable explanation layers for mission outcomes and planning strength:

- squad fit indicators
- synergy hints
- risk indicators
- expected strengths/weaknesses
- post-mission breakdown

Do not reveal every internal number if that harms mystery, but the game should feel fair and legible.

## Priority 9: Relationship And Character Depth Upgrade

The relationship system exists and should be pushed further.

Add more visible and meaningful relationship consequences.

Examples:

- trust thresholds unlock special scenes
- rivalry thresholds create complications or optional side events
- mentor dynamics accelerate growth
- unstable pairings produce high-risk/high-reward outcomes
- agent-specific reactions to mission categories

The player should begin to feel that agents are people with operational chemistry, not just stats.

## Priority 10: Better World-State Presence

Make the world feel more persistent and reactive.

Add stronger global-state or HQ-state signals such as:

- current agency pressure level
- market heat or reputation tension
- incident trends
- department strain summaries
- active narrative flags surfacing in subtle ways

This can be displayed through:

- alert rails
- world-state widgets
- command brief overlays
- status banners

## Priority 11: Retention And Replayability Enhancements

Without adding monetization, strengthen the reasons to keep playing.

Add systems that make the game feel more alive over repeated sessions.

Good candidates:

- daily or rotating operations board
- optional high-risk contracts
- department-specific rotating pressures
- rotating agency-wide modifiers
- weekly-style challenge scaffolding, even if only local for now
- streak or momentum systems that reward steady play without punishing absence harshly
- unlockable codex/archive entries
- hidden operation chains

Keep these systems tasteful.
Do not make them feel manipulative or casino-like.

## Priority 12: Portrait Lightbox Upgrade

The portrait lightbox is a good feature.
Expand it slightly so it becomes more game-useful.

Add, if the data is available:

- level
- trust
- operations completed
- department
- key traits or specialties

Do not clutter it.
Keep it elegant.

## Priority 13: Small-Screen Mobile Hardening

The game is mobile-style and needs confidence on smaller screens.

Test and improve layouts for very small mobile screens.

Requirements:

- no broken clipping
- no unusable controls
- no text collisions
- no inaccessible modal layouts
- no unreadable dense panels

Preserve the premium style while improving compact usability.

## Priority 14: Better First 30 Minutes

The first 30 minutes should become significantly better.

Polish:

- onboarding pacing
- first mission
- first upgrade
- first trust shift
- first story event
- first department consequence

The opening should clearly communicate:

- this is strategic
- this is story-rich
- failure is interesting
- these agents matter
- the agency is alive

## Design And Tone Rules

Preserve the current identity:

- premium
- strategic
- elite agency
- cinematic command center
- connected to the existing Agency website/mobile app universe

Do not drift into:

- generic dashboard SaaS
- generic game HUD
- cartoony mobile game styling
- cluttered sci-fi noise

Animation and polish should make it feel more alive, not more childish.

## System Design Rules

Do not add random complexity.
Every enhancement should strengthen one of these:

- clarity
- consequence
- progression
- replayability
- player attachment
- strategic decision-making

If a new idea is cool but does not improve one of those, skip it.

## Content Expansion Rules

When adding more chapter and operations content:

- keep it data-driven where possible
- avoid burying story logic in UI-only code
- preserve compatibility with save state
- make it easy to add more operations later
- prefer reusable mission schemas over one-off hardcoded special cases

If content architecture is currently weak, improve it carefully while preserving what already works.

## Technical Expectations

- preserve existing architecture where sensible
- refactor only when it materially improves maintainability or clarity
- keep the game state reliable
- avoid introducing regressions in save/load logic
- keep TypeScript clean
- keep components readable

If the current code needs light restructuring to support these changes, do it carefully.

## Optional But Advisable Enhancements

If these fit cleanly within the current architecture, include them now instead of leaving them for another handoff:

- a simple codex/archive/logbook screen or panel
- stronger mission result summaries
- clearer progression summary after each operation
- lightweight difficulty escalation over time
- first-pass accessibility improvements for contrast, focus states, and motion reduction
- better empty states for filters/history/events
- stronger loading and transition states if any views currently pop abruptly
- a cleaner profile summary showing rank progression and major milestones

Do not force these if they require destabilizing the project, but include them if they can be added cleanly.

## Suggested Concrete Deliverables

Implement the following in this pass:

1. Fix story event dismissal and event-state correctness
2. Expand several operations into multi-phase branching operations
3. Add chapter structure and significantly expand operation content
4. Add contextual help and tooltip systems for core stats and mechanics
5. Add polished motion and feedback for key actions and state changes
6. Surface operations history clearly in the UI
7. Improve department and HQ upgrade feedback
8. Improve strategy readability and mission breakdowns
9. Deepen relationship consequences
10. Enrich portrait lightbox with lightweight game stats
11. Harden very-small-screen responsiveness
12. Improve replayability and world-state visibility
13. Add any clean optional enhancements that strengthen the vertical slice without destabilizing it

## Validation Checklist

Before finishing, verify:

- story events dismiss correctly
- story events do not soft-lock the player
- mission flow still works after events
- multi-phase missions work correctly
- expanded operations unlock and resolve correctly
- chapter or arc progression behaves coherently
- trust, synergy, and rivalry effects still function
- save data remains stable
- no obvious regressions in onboarding or navigation
- operations history is visible and useful
- upgrades feel more understandable
- world-state and progression feel more alive
- the first 30 minutes are clearer and stronger
- small-screen layouts remain usable
- the game still feels premium and coherent

## Final Output

When done, report back with:

1. what bugs were fixed
2. what systems were expanded
3. what operations, story, or chapter content was added
4. what new UX guidance was added
5. what visual and feedback improvements were added
6. what responsiveness issues were fixed
7. what optional enhancements were included
8. any known limitations still remaining

Do not stop after fixing only the dismiss handler.
Treat this as a full enhancement, expansion, improvement, and polish pass on the existing vertical slice.

# END READY-TO-PASTE PROMPT
