import clsx, { type ClassValue } from "clsx";
import rawSkills from "@/data/skills.json";
import type {
  AccentToken,
  Agent,
  AgentDetailView,
  AgentListItem,
  AgentStatus,
  Department,
  RoomTile,
  SidebarDepartmentSummary,
  SiteStats,
  SkillsData,
} from "@/lib/types";

const agencyData = rawSkills as SkillsData;

const departmentImageMap = {
  command: "/images/office/command-department.png",
  engineering: "/images/office/engineering-department.png",
  design: "/images/office/design-department.png",
  quality: "/images/office/ops-quality-department.png",
  security: "/images/office/security-department.png",
  knowledge: "/images/office/knowledge-department.png",
} as const;

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

export function getDepartmentById(id: string): Department | undefined {
  return getDepartments().find((department) => department.id === id);
}

export function getAgents(): Agent[] {
  return getDepartments().flatMap((department) => department.agents);
}

export function getAgentById(id: string): Agent | undefined {
  return getAgents().find((agent) => agent.id === id);
}

export function getDepartmentByAgentId(agentId: string): Department | undefined {
  const agent = getAgentById(agentId);

  if (!agent) {
    return undefined;
  }

  return getDepartmentById(agent.department);
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
      accentCss: department.accentCss,
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
    totalPlaybooks: getPlaybookLoadCount(),
    onlineAgents: statuses.online,
    busyAgents: statuses.busy,
    idleAgents: statuses.idle,
  };
}

export function getPlaybookLoadCount(slug?: string): number {
  const source = slug ? getDepartmentAgents(slug) : getAgents();

  return source.reduce<number>(
    (total, agent) => total + (Array.isArray(agent.playbooks) ? agent.playbooks.length : 0),
    0,
  );
}

export function getUniquePlaybookCount(slug?: string): number {
  const source = slug ? getDepartmentAgents(slug) : getAgents();

  return new Set(
    source.flatMap((agent) => (Array.isArray(agent.playbooks) ? agent.playbooks : [])),
  ).size;
}

export function getDepartmentImagePath(departmentId: string): string {
  const key = departmentId as keyof typeof departmentImageMap;

  return departmentImageMap[key] ?? departmentImageMap.command;
}

export function getAgentListItems(slug?: string): AgentListItem[] {
  const departmentsById = new Map(
    getDepartments().map((department) => [department.id, department]),
  );
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
      accentCss: department.accentCss,
      accentHex: department.accentHex,
      skillsCount: Array.isArray(agent.skills) ? agent.skills.length : 0,
      sprite: agent.sprite,
      portrait: agent.portrait,
    };
  });
}

export function getAgentDetailViewsByDepartment(slug: string): AgentDetailView[] {
  return getDepartmentAgents(slug)
    .map((agent) => getAgentDetailView(agent.id))
    .filter((agent): agent is AgentDetailView => Boolean(agent));
}

export function getAgentDetailView(id: string): AgentDetailView | undefined {
  const agent = getAgentById(id);

  if (!agent) {
    return undefined;
  }

  const department = getDepartmentById(agent.department);

  if (!department) {
    return undefined;
  }

  return {
    id: agent.id,
    name: agent.name,
    codename: agent.codename,
    role: agent.role,
    description: agent.description,
    skills: Array.isArray(agent.skills) ? agent.skills : [],
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
    voiceLine: agent.voiceLine,
    playbooks: agent.playbooks,
    achievements: agent.achievements,
    downloadUrl: agent.downloadUrl,
    voiceClipPath: getAgentVoiceClipPath(agent.id),
    path: agent.path,
    replaces: agent.replaces ?? [],
  };
}

export function getRelatedAgentDetailViews(
  agentId: string,
  limit = 3,
): AgentDetailView[] {
  const agent = getAgentById(agentId);

  if (!agent) {
    return [];
  }

  const sameDepartment = getAgents()
    .filter(
      (candidate) =>
        candidate.id !== agentId && candidate.department === agent.department,
    )
    .map((candidate) => getAgentDetailView(candidate.id))
    .filter((candidate): candidate is AgentDetailView => Boolean(candidate));

  if (sameDepartment.length >= limit) {
    return sameDepartment.slice(0, limit);
  }

  const filler = getAgents()
    .filter(
      (candidate) =>
        candidate.id !== agentId &&
        candidate.department !== agent.department &&
        !sameDepartment.some((entry) => entry.id === candidate.id),
    )
    .map((candidate) => getAgentDetailView(candidate.id))
    .filter((candidate): candidate is AgentDetailView => Boolean(candidate));

  return [...sameDepartment, ...filler].slice(0, limit);
}

export function getRoomTiles(): RoomTile[] {
  return getDepartmentSummaries().map((departmentSummary) => {
    const department = getDepartmentBySlug(departmentSummary.slug);

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

export function getAccentTokenByDepartmentId(
  departmentId: string,
): AccentToken {
  return getDepartmentById(departmentId)?.accentCss ?? "--dept-command";
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
