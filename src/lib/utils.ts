import clsx, { type ClassValue } from "clsx";
import rawSkills from "@/data/skills.json";
import type {
  Agent,
  AgentDetailView,
  AgentListItem,
  AgentStatus,
  Department,
  RoomPosition,
  RoomTile,
  SidebarDepartmentSummary,
  SiteStats,
  SkillsData,
} from "@/lib/types";

const agencyData = rawSkills as SkillsData;
const ROOM_TILE_WIDTH = 136;
const ROOM_TILE_HEIGHT = 72;
const ROOM_DEPTH = 34;
const MAP_OFFSET_X = 180;
const MAP_OFFSET_Y = 72;

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function getAgencyData(): SkillsData {
  return agencyData;
}

export function getDepartments(): Department[] {
  return agencyData.departments;
}

export function getDepartmentBySlug(slug: string): Department | undefined {
  return getDepartments().find((department) => department.slug === slug);
}

export function getAgents(): Agent[] {
  return getDepartments().flatMap((department) => department.agents);
}

export function getAgentById(id: string): Agent | undefined {
  return getAgents().find((agent) => agent.id === id);
}

export function getDepartmentAgents(slug: string): Agent[] {
  return getDepartmentBySlug(slug)?.agents ?? [];
}

export function getDepartmentSummaries(): SidebarDepartmentSummary[] {
  return getDepartments().map((department) => {
    const statuses = summarizeStatuses(department.agents);

    return {
      id: department.id,
      name: department.name,
      slug: department.slug,
      tagline: department.tagline,
      accentColor: department.accentColor,
      accentHex: department.accentHex,
      agentCount: department.agents.length,
      onlineCount: statuses.online,
      busyCount: statuses.busy,
      idleCount: statuses.idle,
    };
  });
}

export function getDepartmentSummaryBySlug(
  slug: string,
): SidebarDepartmentSummary | undefined {
  return getDepartmentSummaries().find((department) => department.slug === slug);
}

export function getSiteStats(): SiteStats {
  const allAgents = getAgents();
  const statuses = summarizeStatuses(allAgents);

  return {
    totalAgents: agencyData.meta.totalAgents,
    totalDepartments: agencyData.meta.totalDepartments,
    onlineAgents: statuses.online,
    busyAgents: statuses.busy,
    idleAgents: statuses.idle,
  };
}

export function getAgentListItems(slug?: string): AgentListItem[] {
  const departmentsById = new Map(getDepartments().map((department) => [department.id, department]));
  const source = slug ? getDepartmentAgents(slug) : getAgents();

  return source.map((agent) => {
    const department = departmentsById.get(agent.department);

    if (!department) {
      throw new Error(`Missing department for agent ${agent.id}`);
    }

    return {
      id: agent.id,
      name: agent.name,
      codename: agent.codename,
      role: agent.role,
      status: agent.status,
      departmentId: department.id,
      departmentName: department.name,
      departmentSlug: department.slug,
      accentColor: department.accentColor,
      accentHex: department.accentHex,
      skillsCount: agent.skills.length,
      sprite: agent.sprite,
    };
  });
}

export function getAgentDetailView(id: string): AgentDetailView | undefined {
  const agent = getAgentById(id);

  if (!agent) {
    return undefined;
  }

  const department = getDepartments().find(
    (entry) => entry.id === agent.department,
  );

  if (!department) {
    return undefined;
  }

  return {
    id: agent.id,
    name: agent.name,
    codename: agent.codename,
    role: agent.role,
    description: agent.description,
    skills: agent.skills,
    invocation: agent.invocation,
    status: agent.status,
    departmentId: department.id,
    departmentName: department.name,
    departmentSlug: department.slug,
    accentColor: department.accentColor,
    accentHex: department.accentHex,
    sprite: agent.sprite,
    voiceClipPath: getAgentVoiceClipPath(agent.id),
    path: agent.path,
    replaces: agent.replaces ?? [],
  };
}

export function getRoomTiles(): RoomTile[] {
  return getDepartmentSummaries().map((departmentSummary) => {
    const department = getDepartmentBySlug(departmentSummary.slug);

    if (!department) {
      throw new Error(`Missing department for slug ${departmentSummary.slug}`);
    }

    const baseGeometry = getRoomGeometry(department.roomPosition);

    return {
      slug: department.slug,
      label: department.name,
      tagline: department.tagline,
      accentColor: department.accentColor,
      accentHex: department.accentHex,
      polygonPoints: pointsToString(baseGeometry.top),
      frontFacePoints: pointsToString(baseGeometry.front),
      edgePoints: pointsToString(baseGeometry.edge),
      labelX: baseGeometry.labelX,
      labelY: baseGeometry.labelY,
      spriteAnchorX: baseGeometry.spriteAnchorX,
      spriteAnchorY: baseGeometry.spriteAnchorY,
      previewAgents: department.agents.slice(0, 3).map((agent) => ({
        id: agent.id,
        name: agent.name,
        status: agent.status,
        style: agent.sprite.style,
        variant: agent.sprite.variant,
      })),
      href: `/departments/${department.slug}`,
      agentCount: department.agents.length,
      onlineCount: departmentSummary.onlineCount,
    };
  });
}

export function getDepartmentRouteParams(): Array<{ slug: string }> {
  return getDepartments().map((department) => ({ slug: department.slug }));
}

export function getAgentRouteParams(): Array<{ id: string }> {
  return getAgents().map((agent) => ({ id: agent.id }));
}

export function getAgentVoiceClipPath(id: string): string {
  return `/audio/agents/${id}.mp3`;
}

export function summarizeStatuses(
  agents: Array<Pick<Agent, "status">>,
): Record<AgentStatus, number> {
  return agents.reduce<Record<AgentStatus, number>>(
    (summary, agent) => {
      summary[agent.status] += 1;
      return summary;
    },
    {
      online: 0,
      busy: 0,
      idle: 0,
    },
  );
}

interface Point {
  x: number;
  y: number;
}

interface RoomGeometry {
  top: Point[];
  front: Point[];
  edge: Point[];
  labelX: number;
  labelY: number;
  spriteAnchorX: number;
  spriteAnchorY: number;
}

function getRoomGeometry(position: RoomPosition): RoomGeometry {
  const tileWidth = ROOM_TILE_WIDTH * position.width;
  const tileHeight = ROOM_TILE_HEIGHT * position.height;
  const isoX = MAP_OFFSET_X + (position.x - position.y) * (ROOM_TILE_WIDTH / 2);
  const isoY = MAP_OFFSET_Y + (position.x + position.y) * (ROOM_TILE_HEIGHT / 2);

  const top = [
    { x: isoX, y: isoY },
    { x: isoX + tileWidth, y: isoY },
    { x: isoX + tileWidth - ROOM_TILE_HEIGHT / 2, y: isoY + tileHeight / 2 },
    { x: isoX - ROOM_TILE_HEIGHT / 2, y: isoY + tileHeight / 2 },
  ];

  const front = [
    top[3],
    top[2],
    { x: top[2].x, y: top[2].y + ROOM_DEPTH },
    { x: top[3].x, y: top[3].y + ROOM_DEPTH },
  ];

  const edge = [
    top[1],
    top[2],
    { x: top[2].x, y: top[2].y + ROOM_DEPTH },
    { x: top[1].x, y: top[1].y + ROOM_DEPTH },
  ];

  return {
    top,
    front,
    edge,
    labelX: isoX + tileWidth / 2 - ROOM_TILE_HEIGHT / 4,
    labelY: isoY + tileHeight / 4 + 8,
    spriteAnchorX: isoX + ROOM_TILE_WIDTH / 3,
    spriteAnchorY: isoY + tileHeight / 4 + 18,
  };
}

function pointsToString(points: Point[]): string {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}
