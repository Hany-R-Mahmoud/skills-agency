# UI Navigation Contract: The Agency Showcase Website

## Purpose

Define the public-facing navigation and interaction contract for the HQ map,
department rooms, and agent detail experience.

## Route Contract

### `/`

- **Purpose**: Homepage with cinematic HQ introduction and entry path into the
  agency navigation experience.
- **Must provide**:
  - agency identity
  - HQ hero presentation
  - stats summary
  - clear route into department exploration

### `/departments/[slug]`

- **Purpose**: Department room view for the selected department.
- **Must provide**:
  - department identity
  - room-specific agent roster
  - ability to activate an agent detail panel
- **Invalid state behavior**:
  - unknown `slug` resolves to not found behavior

### `/agents/[id]`

- **Purpose**: Direct-link fallback for a specific agent profile when a shared
  or standalone agent URL is used.
- **Must provide**:
  - same core content as the in-context agent panel
  - enough context to identify the parent department
- **Invalid state behavior**:
  - unknown `id` resolves to not found behavior

## Interaction Contract

### Department Activation

- **Trigger**: Click or tap on a department entry from the sidebar, map, or
  mobile department navigation.
- **Result**:
  - active department changes
  - destination view renders the corresponding room content
  - visual selection reflects the department accent identity

### Agent Activation

- **Trigger**: Click or tap on an agent sprite, card, or list entry.
- **Result**:
  - the agent detail drawer opens or updates in place
  - agent voice playback may occur if audio is unmuted
  - active agent content matches the selected agent exactly

### Mute Toggle

- **Trigger**: Click or tap mute control in persistent navigation chrome.
- **Result**:
  - all ambient and agent activation audio obeys the current mute state
  - preference persists while the visitor continues navigating the site

## Mobile Adaptation Contract

- Below the mobile breakpoint, department navigation becomes a bottom-oriented
  browsing control.
- The HQ overview must remain explorable without requiring precision desktop
  pointer interaction.
- The agent detail panel becomes a full-width bottom sheet while preserving the
  same content contract as desktop.
