# Data Model: The Agency Showcase Website

## Source of Truth

All content originates from `src/data/skills.json`. The implementation may
derive view-specific structures from this dataset, but those derived structures
must not become independent content sources.

## Entities

### SkillsData

- **Purpose**: Root document for the published agency experience.
- **Fields**:
  - `meta.version`
  - `meta.lastUpdated`
  - `meta.totalAgents`
  - `meta.totalDepartments`
  - `departments[]`
- **Validation rules**:
  - `meta.totalDepartments` must match the number of department entries.
  - `meta.totalAgents` must match the total number of nested agent entries.

### Department

- **Purpose**: Represents one navigable room in the agency HQ.
- **Fields**:
  - `id`
  - `name`
  - `slug`
  - `tagline`
  - `accentColor`
  - `accentHex`
  - `roomPosition.x`
  - `roomPosition.y`
  - `roomPosition.width`
  - `roomPosition.height`
  - `agents[]`
- **Validation rules**:
  - `slug` must be unique and route-safe.
  - `accentColor` must reference an existing CSS custom property token.
  - `accentHex` must stay aligned with the visual token represented by
    `accentColor`.
  - `roomPosition` values must place the department on the shared isometric map
    without overlap.

### Agent

- **Purpose**: Represents an individual specialist shown in room views and
  detail panels.
- **Fields**:
  - `id`
  - `name`
  - `codename`
  - `department`
  - `role`
  - `description`
  - `skills[]`
  - `invocation.codex`
  - `invocation.opencode`
  - `status`
  - `sprite.style`
  - `sprite.color`
  - `sprite.variant`
  - `replaces[]` (optional)
  - `path`
- **Validation rules**:
  - `id` must be unique and stable enough to derive media paths.
  - `department` must match the containing department.
  - `status` must map to a known status pip treatment.
  - `sprite.style` must be either `pixel` or `geometric`.
  - `sprite.variant` must map to a supported sprite variant.

## Derived View Models

### SidebarDepartmentSummary

- **Purpose**: Concise department record used by the sidebar and mobile tab bar.
- **Derived from**: Department entity plus derived online counts.
- **Fields**:
  - `id`
  - `name`
  - `slug`
  - `accentColor`
  - `agentCount`
  - `onlineCount`

### RoomTile

- **Purpose**: Visual map representation for a department room.
- **Derived from**: Department `roomPosition`, `accentHex`, and a sample of
  nested agents.
- **Fields**:
  - `slug`
  - `label`
  - `accentHex`
  - `polygonPoints`
  - `spritePreview[]`

### AgentDetailView

- **Purpose**: Normalized agent payload for the drawer and route fallback view.
- **Derived from**: Agent entity and containing department metadata.
- **Fields**:
  - `id`
  - `name`
  - `role`
  - `description`
  - `skills`
  - `invocation`
  - `status`
  - `departmentName`
  - `accentHex`
  - `sprite`
  - `voiceClipPath`

### SiteStats

- **Purpose**: Homepage and sidebar counters.
- **Derived from**: `meta` plus live status counts from agent records.
- **Fields**:
  - `totalAgents`
  - `totalDepartments`
  - `onlineAgents`
  - `busyAgents`

## State Transitions

### Agent Detail Panel

- **Closed**: No agent selected.
- **Opening**: User activates an agent from a room or listing.
- **Open**: Drawer shows the normalized `AgentDetailView`.
- **Switching**: Active agent changes while the panel remains visible.
- **Closing**: User dismisses drawer or navigates away from the active context.

### Audio Preference

- **Unknown**: No persisted preference has been read yet.
- **Muted**: All ambient and activation audio suppressed.
- **Unmuted**: Ambient and activation audio permitted after user gesture.

### Audio Context Lifecycle

- **Dormant**: No `AudioContext` created yet.
- **Ready**: Context created after first user gesture.
- **Playing**: Ambient or voice audio actively playing.
- **Suspended**: Context available but paused or muted.
