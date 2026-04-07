# Replit Follow-Up Prompt: Restore All Existing Images In The Mobile App

Use this prompt after the main mobile-app build prompt. Its only job is to fix asset migration and make the mobile prototype use the real visuals from the website instead of placeholders or empty states.

---

# BEGIN READY-TO-PASTE PROMPT

The current mobile app prototype is structurally good, but it is missing the actual images from the source website.

Your task now is to **fix asset migration and image rendering**, not redesign the app.

## Goal

Make the mobile app use the real visual assets from the website, including:

- agent portraits
- department/office visuals
- floor-map or HQ imagery where applicable
- any image-backed cards or hero sections already represented in the website

The result should feel like the real product with its original media, not a wireframe or placeholder build.

## Critical Rule

Do **not** replace missing images with generic placeholders if the original assets exist in the source project.

Instead:

1. locate the original asset source
2. create a robust mobile asset resolution strategy
3. wire every screen to the correct image source
4. only use a fallback placeholder if the original file truly does not exist

## Source Of Truth

Use the current website repo as the source of truth.

Inspect these locations first:

- `src/data/skills.json`
- `src/lib/utils.ts`
- `src/lib/types.ts`
- `src/components/agents/AgentPortrait/index.tsx`
- `src/components/departments/OfficeFloor/index.tsx`
- `src/app/departments/[slug]/page.tsx`
- `public/portraits/normalized/`
- `public/downloads/`

Also inspect remote image usage already present in the website.

The website currently uses:

- local portrait files in `public/portraits/normalized/`
- remote imagery from `ik.imagekit.io`

The mobile app must support both.

## Important Existing Reality

Some images are local project assets.
Some images are remote CDN assets.
Some portraits are referenced directly in the JSON data.
Some department visuals are resolved through helper functions.

You must preserve that structure.

## What To Fix

### 1. Agent Portraits

Every agent card and agent detail screen should render the correct portrait if one exists.

Use these rules:

- If the agent data already contains a valid remote portrait URL, use it
- If the agent has a local portrait asset, bundle and use it
- If some agents currently have portraits and others do not, support mixed mode cleanly
- Do not break layout for missing portraits

The portrait treatment should remain portrait-first and premium.

### 2. Department Visuals

Department detail screens should render the same room/office imagery used on the website.

These are currently resolved in the web app through helper logic and/or known remote URLs.

Bring those visuals into mobile and map each department correctly:

- command
- engineering
- design
- quality
- security
- knowledge

### 3. Home / HQ Visuals

If the mobile app currently has a generic hero or blank image zones, replace them with actual website-derived visuals where appropriate.

That may include:

- HQ / command-floor hero imagery
- office floor map reinterpretation
- department preview visuals

Do not force a literal desktop copy, but do use the real visual source material.

### 4. Fallback Strategy

If an image is truly unavailable:

- use a branded fallback state
- preserve the same frame, spacing, and visual hierarchy
- avoid broken-image UI
- show meaningful fallback styling tied to the relevant department accent

Fallbacks must feel intentional, not accidental.

## Technical Requirements

Implement a proper asset-resolution layer instead of ad hoc image usage.

Create something like:

- `src/lib/assets.ts`
- or `src/lib/media.ts`

This module should:

- resolve local portrait assets
- resolve remote portrait URLs
- resolve department images
- resolve floor/HQ visuals
- expose safe fallbacks

Do not hardcode image logic inside many components.

## Recommended Implementation Pattern

Build a single image-resolution utility that can:

- detect whether a path is remote
- detect whether a local bundled asset exists
- return the right source object for Expo Image / React Native Image
- return fallback metadata when the main asset is absent

Then update all relevant components to consume that utility.

## Expo / React Native Expectations

Use the most suitable image primitive for mixed local + remote assets:

- `expo-image` is preferred if already used or easy to introduce cleanly
- native `Image` is acceptable if handled well

Requirements:

- support remote CDN images
- support bundled local assets
- support content-fit / cover / contain behavior matching the website
- avoid layout shift
- use caching where appropriate

## Maintain Design Fidelity

While fixing images, preserve:

- current spacing
- portrait framing
- department accent treatments
- premium editorial feel
- dark/light theme compatibility

Do not use this task as an excuse to redesign cards or screen structure.

## Existing Visual Context To Preserve

From the source site:

- portraits are often displayed in a framed, status-aware presentation
- departments have distinct visual identities
- office/floor imagery reinforces the command-floor concept
- the entire product relies on atmosphere, not just text

That atmosphere is currently missing in the mobile prototype because the images are missing.
Restore it.

## Validation Checklist

Before finishing, verify:

- all agents with valid portraits display correctly
- all department screens show the right visual
- no broken image containers remain
- remote images load correctly
- local images bundle correctly
- fallback visuals look intentional
- both dark and light theme still work
- image rendering works across list cards and detail screens

## Final Output

After implementing, report:

1. what image sources were wired up
2. which images came from local assets vs remote CDN
3. whether any agents or departments still lack source images
4. what fallback strategy was used for any truly missing assets

Do not stop at partial fixes.
Complete the image migration properly.

# END READY-TO-PASTE PROMPT
