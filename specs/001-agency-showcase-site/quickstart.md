# Quickstart: The Agency Showcase Website

## Goal

Validate that the planned experience delivers the homepage, department
navigation, agent detail, and audio control flows described in the feature
specification.

## Setup

1. Install dependencies with `npm install`.
2. Start the app with `npm run dev`.
3. Use a modern desktop browser for primary validation and a mobile-width
   responsive viewport for compact-layout checks.

## Primary Validation Flow

1. Open the homepage.
2. Confirm the site identity, cinematic HQ hero, and visible navigation path
   into department exploration.
3. Confirm the stats bar displays department and agent totals sourced from the
   current agency dataset.
4. Navigate from the homepage into the HQ map or a department room.
5. Select each department and confirm the destination view shows agents assigned
   to that department.
6. Activate at least one agent in each department and confirm the detail panel
   shows:
   - name
   - role
   - description
   - skills
   - invocation syntax
7. Toggle mute off and on, then activate an agent:
   - when unmuted, confirm voice/audio playback occurs
   - when muted, confirm no site audio plays
8. Reduce viewport width below 768px and confirm:
   - navigation becomes a bottom-oriented department control
   - map content degrades into a touch-friendly department browsing experience
   - the agent detail panel uses a full-width bottom sheet presentation

## Regression Checks

1. Change an agent’s name or status in `src/data/skills.json`.
2. Restart or refresh the app.
3. Confirm the updated agent name/status appears consistently in navigation,
   room presentation, counts, and the detail panel.
4. Temporarily remove or rename one agent voice clip asset.
5. Confirm the corresponding agent still opens correctly with textual content
   intact.

## Build Verification

1. Run `npm run lint`.
2. Run `npx next build --webpack`.
3. Confirm no TypeScript or build errors occur.

## Deployment Verification

1. Push the approved implementation branch to the repository.
2. Confirm Vercel produces a successful deployment.
3. Verify homepage, department navigation, and agent panel behavior on the
   production URL.
