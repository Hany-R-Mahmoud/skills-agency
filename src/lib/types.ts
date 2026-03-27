/**
 * All TypeScript interfaces for The Agency.
 * Source entities mirror src/data/skills.json exactly.
 */

export type DepartmentId =
  | "command"
  | "engineering"
  | "design"
  | "ai-labs"
  | "ops"
  | "security-research";

export type AgentStatus = "online" | "busy" | "idle";

export type CharacterStyle = "pixel" | "geometric";

export interface AgentInvocation {
  codex: string;
  opencode: string;
}

export interface AgentSprite {
  style: CharacterStyle;
  color: string;
  variant: number;
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
  invocation: AgentInvocation;
  status: AgentStatus;
  sprite: AgentSprite;
  replaces?: string[];
  path: string;
}

export interface Department {
  id: DepartmentId;
  name: string;
  slug: string;
  tagline: string;
  accentColor: string;
  accentHex: string;
  roomPosition: RoomPosition;
  agents: Agent[];
}

export interface SkillsMeta {
  version: string;
  lastUpdated: string;
  totalAgents: number;
  totalDepartments: number;
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
  accentColor: string;
  accentHex: string;
  agentCount: number;
  onlineCount: number;
  busyCount: number;
  idleCount: number;
}

export interface SiteStats {
  totalAgents: number;
  totalDepartments: number;
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
  accentColor: string;
  accentHex: string;
  skillsCount: number;
  sprite: AgentSprite;
}

export interface RoomTilePreview {
  id: string;
  name: string;
  status: AgentStatus;
  style: CharacterStyle;
  variant: number;
}

export interface RoomTile {
  slug: string;
  label: string;
  tagline: string;
  accentColor: string;
  accentHex: string;
  polygonPoints: string;
  frontFacePoints: string;
  edgePoints: string;
  labelX: number;
  labelY: number;
  spriteAnchorX: number;
  spriteAnchorY: number;
  previewAgents: RoomTilePreview[];
  href: string;
  agentCount: number;
  onlineCount: number;
}

export interface AgentDetailView {
  id: string;
  name: string;
  codename: string;
  role: string;
  description: string;
  skills: string[];
  invocation: AgentInvocation;
  status: AgentStatus;
  departmentId: DepartmentId;
  departmentName: string;
  departmentSlug: string;
  accentColor: string;
  accentHex: string;
  sprite: AgentSprite;
  voiceClipPath: string;
  path: string;
  replaces: string[];
}
