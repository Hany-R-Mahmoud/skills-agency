# Feature Specification: The Agency Showcase Website

**Feature Branch**: `001-agency-showcase-site`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "Build \"The Agency\" — a showcase website for an AI
skills company. The company has 31 AI agents organized into 6 departments
(Command, Engineering, Design, AI Labs, Ops, Security & Research). The site
uses an isometric 3D office floor map as the main navigation. Each department
is a room. Agents appear as animated characters inside their department rooms.
Clicking an agent opens a slide-in panel with their name, role, description,
skills, and invocation syntax. The design is \"Neon Game Studio\" — pure black
background, per-department neon accent colors, monospace terminal aesthetic,
Space Grotesk headings. The site also has a cinematic homepage hero with the
isometric HQ building, a stats bar (agents online counter), and ambient audio
with a mute toggle. Agent characters have two styles: pixel art and geometric
SVG avatars. Each agent has a pre-generated voice clip that plays on card
activation. All content is driven by a single skills.json data file. Adding a
new agent = add one entry to skills.json + push to deploy."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explore the agency map (Priority: P1)

A prospective client visits the site and uses the homepage and office map to
understand the company structure, navigate between departments, and see which
specialists are available.

**Why this priority**: The site fails its primary purpose if visitors cannot
quickly understand the company, its departments, and the available specialists.

**Independent Test**: Can be fully tested by visiting the homepage, viewing the
HQ hero, using the department navigation, and opening at least one department
room without relying on agent detail interactions.

**Acceptance Scenarios**:

1. **Given** a first-time visitor lands on the homepage, **When** the page
   loads, **Then** the visitor sees a clear agency identity, a cinematic HQ
   presentation, and a visible path into department exploration.
2. **Given** a visitor is viewing the office map, **When** they select a
   department, **Then** the site takes them to a distinct room view for that
   department and shows the agents assigned to it.
3. **Given** the company data changes, **When** the site is updated from the
   source dataset, **Then** the department navigation and displayed counts stay
   consistent with the updated agency roster.

---

### User Story 2 - Inspect an individual agent (Priority: P2)

A visitor browsing a department wants to inspect a specific agent and quickly
see who they are, what they do, what skills they cover, and how to invoke them.

**Why this priority**: Visitors need agent-level detail to evaluate the team’s
capabilities and understand how each specialist contributes to the agency.

**Independent Test**: Can be fully tested by opening a department room,
selecting an agent, reviewing the slide-in details panel, and closing or
switching to another agent.

**Acceptance Scenarios**:

1. **Given** a visitor is inside a department room, **When** they activate an
   agent character, **Then** a slide-in panel opens and shows the agent’s name,
   role, description, skills, and invocation syntax.
2. **Given** an agent has an associated character style, **When** the visitor
   views that agent, **Then** the presentation uses the appropriate visual style
   without obscuring the agent’s details.
3. **Given** a visitor switches between agents, **When** each new agent is
   activated, **Then** the panel updates to the newly selected agent’s content
   without requiring a full page refresh.

---

### User Story 3 - Experience the site’s audiovisual identity (Priority: P3)

A visitor wants the site to feel immersive and memorable through motion, neon
visuals, and audio, while still retaining control over accessibility and sound.

**Why this priority**: The project is a showcase website, so presentation
quality meaningfully affects perceived polish and brand differentiation, but it
is secondary to discoverability and agent information.

**Independent Test**: Can be fully tested by enabling site interaction on the
homepage or in a department room, observing ambient motion, hearing audio on
agent activation, and muting the experience with a single control.

**Acceptance Scenarios**:

1. **Given** a visitor is exploring the site, **When** ambient effects are
   available, **Then** the site presents a cohesive neon studio atmosphere with
   motion that supports the experience rather than blocking navigation.
2. **Given** a visitor activates an agent with a voice clip, **When** the
   interaction completes, **Then** the corresponding voice clip plays as part of
   the agent reveal.
3. **Given** a visitor does not want audio, **When** they use the mute toggle,
   **Then** all site audio is silenced and remains muted during subsequent
   navigation until changed again.

### Edge Cases

- What happens when the source dataset contains fewer or more than 31 agents
  after a content update?
- How does the system handle agents whose visual asset or voice clip is missing
  while still preserving access to their textual profile?
- What happens when a department has no active agents assigned in the dataset?
- How does the site behave for visitors who prefer reduced motion or who mute
  audio before interacting with any agent?
- What happens when a visitor rapidly opens several agents in succession?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST present a homepage that introduces The Agency as
  an AI skills company and provides a clear entry point into the main office-map
  navigation experience.
- **FR-002**: The system MUST represent the agency as 6 department rooms that
  visitors can identify and navigate between.
- **FR-003**: The system MUST display agents within their assigned department
  rooms and allow visitors to discover which agents belong to each department.
- **FR-004**: The system MUST allow visitors to activate an agent and open a
  slide-in detail panel for that agent.
- **FR-005**: The system MUST show each selected agent’s name, role,
  description, skills, and invocation syntax in the detail panel.
- **FR-006**: The system MUST support two visual agent presentation styles:
  pixel art and geometric SVG avatars.
- **FR-007**: The system MUST include a visible agency stats bar that reports at
  least the current agents-online count derived from the source dataset.
- **FR-008**: The system MUST provide a cohesive neon studio visual identity
  across the homepage, department views, and agent interactions.
- **FR-009**: The system MUST provide ambient audio and play the selected
  agent’s pre-generated voice clip when that agent is activated, unless audio is
  muted.
- **FR-010**: The system MUST provide a single mute control that affects all
  site audio and persists the visitor’s preference across navigation.
- **FR-011**: The system MUST derive all agent and department content from one
  authoritative agency dataset so content changes can be made by updating that
  single source.
- **FR-012**: The system MUST keep department counts, agent listings, and agent
  detail content synchronized with the current state of the source dataset.
- **FR-013**: The system MUST remain usable when decorative media is unavailable
  by preserving core navigation and textual agent information.
- **FR-014**: The system MUST respect visitor accessibility preferences for
  reduced motion and support exploration without requiring audio.

### Key Entities *(include if feature involves data)*

- **Department**: A navigable room in the agency experience with a name, visual
  identity, and a collection of assigned agents.
- **Agent**: An individual AI specialist with a name, role, description, skills,
  invocation syntax, department membership, online/offline state, avatar style,
  and optional media assets.
- **Agency Dataset Entry**: A single source record that defines the content
  needed to render an agent and derive department-level presentation and counts.
- **Agent Detail Panel**: A contextual overlay that reveals the selected agent’s
  profile and invocation information.
- **Audio Preference**: A visitor-controlled setting that determines whether site
  audio should play during ambient and agent activation events.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% of first-time test users can identify all 6 departments and
  open at least one department room within 60 seconds of landing on the site.
- **SC-002**: 90% of test users can open an agent panel and locate that
  agent’s role, skills, and invocation syntax within 30 seconds.
- **SC-003**: Updating the source dataset with a new or removed agent is
  reflected throughout the published site without requiring manual edits in
  multiple content locations.
- **SC-004**: 95% of agent activations present the requested agent details
  without navigation errors or mismatched panel content.
- **SC-005**: 100% of audio playback events are suppressible via the mute
  control, and the mute preference remains consistent throughout a browsing
  session.
- **SC-006**: 90% of stakeholder review participants describe the site as
  visually distinctive and consistent with the intended “Neon Game Studio”
  identity.

## Assumptions

- The initial public release includes exactly 31 agents and 6 departments, but
  the experience must remain valid if those totals change later.
- Each agent has enough structured content in the source dataset to describe
  their role, skills, and invocation syntax without relying on manual page copy.
- The cinematic homepage, office map, department rooms, and agent panel are all
  part of the same public-facing website rather than separate products.
- Visitors access the experience from modern browsers that support immersive
  visuals, motion, and browser-based audio controls.
- Voice clips and avatar assets are prepared ahead of time and are available to
  the site as publishable media.
