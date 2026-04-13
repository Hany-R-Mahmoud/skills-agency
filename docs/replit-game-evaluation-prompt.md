# Replit Evaluation Prompt: Audit The Agency Command Ops Before Handover

Use this prompt only after Replit has finished implementing the current enhancement pass.

This is a **self-audit, QA, and quality-evaluation prompt**.
It is not a feature-creation prompt.
It is not a redesign prompt.

Its purpose is to make Replit inspect the current game critically before handing it back.

---

# BEGIN READY-TO-PASTE PROMPT

The current implementation of **The Agency: Command Ops** should now be treated as a serious vertical slice candidate.

Your task is to **audit the project critically before handover**.

Do not assume the implementation is complete just because features exist.
Do not give me a marketing summary.
Do not just restate what was built.

Instead:

- inspect the code
- run the app
- test the key flows
- find gaps
- fix what is clearly fixable
- report honestly what still remains

## Mission

Perform a deep evaluation of the current game build across:

- functionality
- stability
- UX clarity
- progression quality
- content depth
- replayability
- responsiveness
- visual polish
- systemic coherence

If you find issues that are reasonably fixable in the same pass, fix them before reporting back.

## Audit Rules

- do not rebuild the game
- do not introduce large speculative new systems during the audit
- fix bugs, regressions, broken flows, and polish gaps where practical
- if something is too large to fix in the same pass, report it clearly
- be critical and specific

## What To Evaluate

### 1. Core Game Flow

Test the full player journey:

- onboarding
- HQ
- operations board
- mission prep
- mission resolution
- story events
- agent roster
- agent detail
- department view
- HQ upgrades
- profile/history

Check:

- navigation flow
- state consistency
- whether decisions feel meaningful
- whether progression feels visible
- whether any flow feels incomplete or confusing

### 2. Story Event Correctness

Verify:

- events trigger correctly
- events dismiss correctly
- events do not repeat incorrectly
- events do not soft-lock progression
- event consequences apply correctly
- event state persists correctly in save/load flows

### 3. Mission System Quality

Audit:

- whether multi-phase missions actually work
- whether branches are meaningfully different
- whether squad composition matters
- whether mission outcomes feel fair
- whether post-mission feedback is understandable
- whether missions are still too repetitive

If several missions still feel thin or samey, improve the worst offenders.

### 4. Strategy Readability

Check whether the player can understand:

- why a mission succeeded or failed
- what trust means
- what synergy means
- what rivalry penalties do
- what department load means
- what upgrades actually change

If the systems exist but are not legible, improve explanation, labels, tooltips, summaries, or UI cues.

### 5. Progression Quality

Evaluate:

- rank progression
- agent leveling
- trust changes
- department change over time
- HQ upgrades
- story progression
- chapter or arc progression if present

Ask:

- does the player feel growth?
- does the game feel increasingly interesting?
- are unlocks satisfying?

### 6. Relationship System Depth

Audit whether agent relationships feel:

- visible
- meaningful
- strategically relevant
- narratively relevant

If the system is technically present but emotionally flat, improve presentation where practical.

### 7. World-State Presence

Check whether the game world feels reactive.

Audit whether the player can feel:

- pressure
- reputation
- department tension
- systemic change
- historical consequence

If world-state systems exist but are not strongly surfaced, improve the UI presentation of them.

### 8. Replayability And Retention

Evaluate whether the build gives good reasons to keep playing.

Check for:

- operation variation
- changing pressures
- content variety
- hidden or optional paths
- different squad strategies
- evolving consequences

If replayability still feels weak, improve what can be improved without destabilizing the project.

### 9. Visual And Motion Polish

Audit the look and feel:

- premium presentation
- clarity of hierarchy
- consistency of panels
- transitions
- feedback
- command-center identity
- connection to The Agency universe

Check for:

- abrupt transitions
- flat dead screens
- weak result states
- unpolished spacing
- visual inconsistency

Fix clear polish gaps if practical.

### 10. Mobile And Small-Screen Usability

Critically test:

- very small screens
- cramped overlays
- portrait lightbox
- long text panels
- dense roster/filter areas
- mission result views

Fix:

- clipping
- overflow
- unreadable density
- weak hit targets
- modal sizing issues

### 11. Save System Reliability

Verify:

- save writes correctly
- reload restores correctly
- progress does not disappear
- new fields do not break old state
- broken state is handled safely if possible

If save migration or defaults are fragile, improve them.

### 12. Content Architecture

Audit whether story, missions, events, and progression data are structured sensibly.

Check:

- whether content is too hardcoded
- whether mission logic is spread across UI unnecessarily
- whether new operations can be added later without pain

If small content-architecture cleanups are clearly worth doing, do them.

## Severity Framework

Use this framing internally while auditing:

- Critical: breaks playability, progression, save integrity, or core flow
- Major: meaningfully harms clarity, depth, or stability
- Moderate: hurts polish, comprehension, or retention
- Minor: quality nits, copy issues, or small presentation gaps

Fix critical and major issues where practical during this pass.

## Fix-As-You-Go Rule

Do not just list easy problems.
If something is clearly fixable in the same session, fix it.

Examples:

- broken dismiss handler
- missing tooltip labels
- weak mission result summaries
- clipping on small screens
- unclear stat labels
- empty panels with no fallback
- inconsistent transitions

## Output Requirements

At the end, report in this structure:

### 1. Audit Summary

- overall quality assessment
- what feels strong
- what was weak

### 2. Issues Found

Group by severity:

- Critical
- Major
- Moderate
- Minor

For each issue:

- where it was
- why it mattered
- whether it was fixed

### 3. Fixes Applied During Audit

List what you fixed in this evaluation pass.

### 4. Remaining Risks

List what still needs future work.

### 5. Product Readiness Verdict

State whether the current build is:

- rough prototype
- good vertical slice
- strong vertical slice
- almost ready for wider playtesting

### 6. Recommended Next Step

Choose one best next step only, such as:

- content expansion
- social systems
- deeper mission engine
- stronger onboarding
- visual polish pass
- playtest instrumentation

## Important Tone Rule

Be honest and demanding.
Do not flatter the build.
Do not hide weaknesses.
But also recognize what is genuinely working.

The purpose of this audit is to make the handover sharper, cleaner, and more trustworthy.

# END READY-TO-PASTE PROMPT
