import clsx, { type ClassValue } from "clsx";
import rawSkills from "@/data/skills.json";
import type {
  AccentToken,
  Agent,
  AgentDetailView,
  AgentListItem,
  AgentStatus,
  Department,
  DepartmentId,
  RoomTile,
  SidebarDepartmentSummary,
  SiteStats,
  SkillsData,
} from "@/lib/types";

const agencyData = rawSkills as SkillsData;

const departmentImageMap = {
  command: "https://ik.imagekit.io/hrim/images/office/command-department.png?updatedAt=1774688158259",
  engineering:
    "https://ik.imagekit.io/hrim/images/office/engineering-department.png?updatedAt=1774688056724",
  design: "https://ik.imagekit.io/hrim/images/office/design-department.png?updatedAt=1774688086942",
  quality:
    "https://ik.imagekit.io/hrim/images/office/ops-quality-department.png?updatedAt=1774688094632",
  security:
    "https://ik.imagekit.io/hrim/images/office/security-department.png?updatedAt=1774688080266",
  knowledge: "https://ik.imagekit.io/hrim/images/office/knowledge-department.png",
} as const;

const departments = agencyData.departments;
const departmentsBySlug = new Map(departments.map((department) => [department.slug, department]));
const departmentsById = new Map(departments.map((department) => [department.id, department]));
const agents = departments.flatMap((department) => department.agents);
const agentsById = new Map(agents.map((agent) => [agent.id, agent]));

const departmentSummaries = departments.map<SidebarDepartmentSummary>((department) => {
  const statuses = summarizeStatuses(department.agents);

  return {
    id: department.id,
    name: department.name,
    slug: department.slug,
    tagline: department.tagline,
    accentColor: department.accentColor,
    accentCss: department.accentCss,
    accentHex: department.accentHex,
    agentCount: department.agents.length,
    onlineCount: statuses.online,
    busyCount: statuses.busy,
    idleCount: statuses.idle,
  };
});

const departmentSummariesBySlug = new Map(
  departmentSummaries.map((department) => [department.slug, department]),
);

const siteStats: SiteStats = (() => {
  const statuses = summarizeStatuses(agents);

  return {
    totalAgents: agencyData.meta.totalAgents,
    totalDepartments: agencyData.meta.totalDepartments,
    totalPlaybooks: agents.reduce(
      (total, agent) => total + (Array.isArray(agent.playbooks) ? agent.playbooks.length : 0),
      0,
    ),
    onlineAgents: statuses.online,
    busyAgents: statuses.busy,
    idleAgents: statuses.idle,
  };
})();

const agentDetailViews = agents.map<AgentDetailView>((agent) => {
  const department = departmentsById.get(agent.department);

  if (!department) {
    throw new Error(`Missing department for agent ${agent.id}`);
  }

  return {
    id: agent.id,
    name: agent.name,
    codename: agent.codename,
    role: agent.role,
    description: agent.description,
    skills: Array.isArray(agent.skills) ? agent.skills : [],
    whenToUse: Array.isArray(agent.whenToUse) ? agent.whenToUse : [],
    invocation: agent.invocation,
    status: agent.status,
    departmentId: department.id,
    departmentName: department.name,
    departmentSlug: department.slug,
    accentColor: department.accentColor,
    accentCss: department.accentCss,
    accentHex: department.accentHex,
    sprite: agent.sprite,
    portrait: agent.portrait,
    portraitFit: agent.portraitFit ?? "cover",
    portraitLabel: agent.portraitLabel,
    voiceLine: agent.voiceLine,
    playbooks: Array.isArray(agent.playbooks) ? agent.playbooks : [],
    achievements: agent.achievements,
    downloadUrl: agent.downloadUrl ?? getAgentDownloadPath(agent.id),
    voiceClipPath: getAgentVoiceClipPath(agent.id),
    path: agent.path,
    replaces: agent.replaces ?? [],
  };
});

const agentDetailViewsById = new Map(agentDetailViews.map((agent) => [agent.id, agent]));
const agentDetailViewsByDepartmentSlug = new Map(
  departments.map((department) => [
    department.slug,
    department.agents
      .map((agent) => agentDetailViewsById.get(agent.id))
      .filter((agent): agent is AgentDetailView => Boolean(agent)),
  ]),
);

const agentListItems = agents.map<AgentListItem>((agent) => {
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
    accentCss: department.accentCss,
    accentHex: department.accentHex,
    skillsCount: Array.isArray(agent.skills) ? agent.skills.length : 0,
    sprite: agent.sprite,
    portrait: agent.portrait,
    portraitLabel: agent.portraitLabel,
  };
});

const agentListItemsByDepartmentSlug = new Map(
  departments.map((department) => [
    department.slug,
    agentListItems.filter((agent) => agent.departmentSlug === department.slug),
  ]),
);

const roomTiles = departmentSummaries.map<RoomTile>((departmentSummary) => {
  const department = departmentsBySlug.get(departmentSummary.slug);

  if (!department) {
    throw new Error(`Missing department for slug ${departmentSummary.slug}`);
  }

  return {
    id: department.id,
    slug: department.slug,
    label: department.name,
    tagline: department.tagline,
    accentColor: department.accentColor,
    accentCss: department.accentCss,
    accentHex: department.accentHex,
    imagePath: departmentImageMap[department.id],
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
    busyCount: departmentSummary.busyCount,
  };
});

const departmentRouteParams = departments.map((department) => ({ slug: department.slug }));
const agentRouteParams = agents.map((agent) => ({ id: agent.id }));

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function getAgencyData(): SkillsData {
  return agencyData;
}

export function getDepartments(): Department[] {
  return departments;
}

export function getDepartmentBySlug(slug: string): Department | undefined {
  return departmentsBySlug.get(slug);
}

export function getDepartmentById(id: DepartmentId): Department | undefined {
  return departmentsById.get(id);
}

export function getAgents(): Agent[] {
  return agents;
}

export function getAgentById(id: string): Agent | undefined {
  return agentsById.get(id);
}

export function getDepartmentByAgentId(agentId: string): Department | undefined {
  const agent = getAgentById(agentId);

  if (!agent) {
    return undefined;
  }

  return departmentsById.get(agent.department);
}

export function getDepartmentAgents(slug: string): Agent[] {
  return departmentsBySlug.get(slug)?.agents ?? [];
}

export function getDepartmentSummaries(): SidebarDepartmentSummary[] {
  return departmentSummaries;
}

export function getDepartmentSummaryBySlug(
  slug: string,
): SidebarDepartmentSummary | undefined {
  return departmentSummariesBySlug.get(slug);
}

export function getSiteStats(): SiteStats {
  return siteStats;
}

export function getPlaybookLoadCount(slug?: string): number {
  const source = slug ? getDepartmentAgents(slug) : agents;

  return source.reduce<number>(
    (total, agent) => total + (Array.isArray(agent.playbooks) ? agent.playbooks.length : 0),
    0,
  );
}

export function getUniquePlaybookCount(slug?: string): number {
  const source = slug ? getDepartmentAgents(slug) : agents;

  return new Set(
    source.flatMap((agent) => (Array.isArray(agent.playbooks) ? agent.playbooks : [])),
  ).size;
}

export function getDepartmentImagePath(departmentId: DepartmentId): string {
  return departmentImageMap[departmentId] ?? departmentImageMap.command;
}

export function getAgentListItems(slug?: string): AgentListItem[] {
  return slug ? (agentListItemsByDepartmentSlug.get(slug) ?? []) : agentListItems;
}

export function getAgentDetailViewsByDepartment(slug: string): AgentDetailView[] {
  return agentDetailViewsByDepartmentSlug.get(slug) ?? [];
}

export function getAgentDetailView(id: string): AgentDetailView | undefined {
  return agentDetailViewsById.get(id);
}

export function getRelatedAgentDetailViews(
  agentId: string,
  limit = 3,
): AgentDetailView[] {
  const agent = agentDetailViewsById.get(agentId);

  if (!agent) {
    return [];
  }

  const sameDepartment = (agentDetailViewsByDepartmentSlug.get(agent.departmentSlug) ?? []).filter(
    (candidate) => candidate.id !== agentId,
  );

  if (sameDepartment.length >= limit) {
    return sameDepartment.slice(0, limit);
  }

  const filler = agentDetailViews.filter(
    (candidate) =>
      candidate.id !== agentId &&
      candidate.departmentSlug !== agent.departmentSlug &&
      !sameDepartment.some((entry) => entry.id === candidate.id),
  );

  return [...sameDepartment, ...filler].slice(0, limit);
}

export function getRoomTiles(): RoomTile[] {
  return roomTiles;
}

export function getDepartmentRouteParams(): Array<{ slug: string }> {
  return departmentRouteParams;
}

export function getAgentRouteParams(): Array<{ id: string }> {
  return agentRouteParams;
}

export function getAgentVoiceClipPath(id: string): string {
  return `/audio/agents/${id}.mp3`;
}

export function getAgentDownloadPath(id: string): string {
  return `/downloads/agents/${id}.zip`;
}

export function getDepartmentDownloadPath(slug: string): string {
  return `/downloads/departments/${slug}.zip`;
}

export function getAgencyDownloadPath(): string {
  return "/downloads/the-agency-public-agents.zip";
}

export function getAccentTokenByDepartmentId(
  departmentId: DepartmentId,
): AccentToken {
  return departmentsById.get(departmentId)?.accentCss ?? "--dept-command";
}

export function summarizeStatuses(
  agentsToSummarize: Array<Pick<Agent, "status">>,
): Record<AgentStatus, number> {
  return agentsToSummarize.reduce<Record<AgentStatus, number>>(
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
