/**
 * All TypeScript interfaces for The Agency.
 * Source entities mirror src/data/skills.json exactly.
 */

export type DepartmentId =
  | "command"
  | "engineering"
  | "design"
  | "quality"
  | "security"
  | "knowledge";

export type AgentStatus = "online" | "busy" | "idle";

export type CharacterStyle = "pixel" | "geometric";
export type PortraitFit = "cover" | "contain";
export type AccentToken =
  | "--dept-command"
  | "--dept-engineering"
  | "--dept-design"
  | "--dept-quality"
  | "--dept-security"
  | "--dept-knowledge";

export interface AgentInvocation {
  codex: string;
  slash: string;
  legacy?: string;
}

export interface AgentPlaybook {
  id: string;
  name: string;
  description: string;
}

export interface AgentSprite {
  style: CharacterStyle;
  color: string;
  variant: number;
}

export interface AgentAchievement {
  label: string;
  value: string;
}

export interface RoomPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Agent {
  id: string;
  name: string;
  codename: string;
  department: DepartmentId;
  role: string;
  description: string;
  skills: string[];
  whenToUse: string[];
  invocation: AgentInvocation;
  status: AgentStatus;
  sprite: AgentSprite;
  portrait: string;
  portraitFit?: PortraitFit;
  portraitLabel?: string;
  voiceLine: string;
  playbooks: AgentPlaybook[];
  achievements: AgentAchievement[];
  downloadUrl?: string;
  replaces?: string[];
  path: string;
}

export interface Department {
  id: DepartmentId;
  name: string;
  slug: string;
  tagline: string;
  accentColor: AccentToken;
  accentCss: AccentToken;
  accentHex: string;
  roomPosition: RoomPosition;
  agents: Agent[];
}

export interface SkillsMeta {
  version: string;
  lastUpdated: string;
  totalAgents: number;
  totalDepartments: number;
  mode?: string;
  notes?: string;
}

export interface SkillsData {
  meta: SkillsMeta;
  departments: Department[];
}

export interface SidebarDepartmentSummary {
  id: DepartmentId;
  name: string;
  slug: string;
  tagline: string;
  accentColor: AccentToken;
  accentCss: AccentToken;
  accentHex: string;
  agentCount: number;
  onlineCount: number;
  busyCount: number;
  idleCount: number;
}

export interface SiteStats {
  totalAgents: number;
  totalDepartments: number;
  totalPlaybooks: number;
  onlineAgents: number;
  busyAgents: number;
  idleAgents: number;
}

export interface AgentListItem {
  id: string;
  name: string;
  codename: string;
  role: string;
  status: AgentStatus;
  departmentId: DepartmentId;
  departmentName: string;
  departmentSlug: string;
  accentColor: AccentToken;
  accentCss: AccentToken;
  accentHex: string;
  skillsCount: number;
  sprite: AgentSprite;
  portrait: string;
  portraitLabel?: string;
}

export interface RoomTilePreview {
  id: string;
  name: string;
  status: AgentStatus;
  style: CharacterStyle;
  variant: number;
}

export interface RoomTile {
  id: DepartmentId;
  slug: string;
  label: string;
  tagline: string;
  accentColor: AccentToken;
  accentCss: AccentToken;
  accentHex: string;
  imagePath: string;
  previewAgents: RoomTilePreview[];
  href: string;
  agentCount: number;
  onlineCount: number;
  busyCount: number;
}

export interface AgentDetailView {
  id: string;
  name: string;
  codename: string;
  role: string;
  description: string;
  skills: string[];
  whenToUse: string[];
  invocation: AgentInvocation;
  status: AgentStatus;
  departmentId: DepartmentId;
  departmentName: string;
  departmentSlug: string;
  accentColor: AccentToken;
  accentCss: AccentToken;
  accentHex: string;
  sprite: AgentSprite;
  portrait: string;
  portraitFit: PortraitFit;
  portraitLabel?: string;
  voiceLine: string;
  playbooks: AgentPlaybook[];
  achievements: AgentAchievement[];
  downloadUrl?: string;
  voiceClipPath: string;
  path: string;
  replaces: string[];
}
