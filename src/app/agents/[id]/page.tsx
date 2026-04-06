import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AgentProfilePage from "@/components/agents/AgentPage";
import MainArea from "@/components/layout/MainArea";
import Sidebar from "@/components/layout/Sidebar";
import {
  getAgentDetailView,
  getRelatedAgentDetailViews,
  getAgentRouteParams,
  getDepartmentSummaries,
  getSiteStats,
} from "@/lib/utils";
import styles from "./page.module.scss";

export function generateStaticParams() {
  return getAgentRouteParams();
}

interface AgentPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: AgentPageProps): Promise<Metadata> {
  const { id } = await params;
  const agent = getAgentDetailView(id);

  if (!agent) {
    return {
      title: "Agent not found",
    };
  }

  return {
    title: agent.name,
    description: `${agent.role}. ${agent.description}`,
  };
}

export default async function AgentRoutePage({ params }: AgentPageProps) {
  const { id } = await params;
  const agent = getAgentDetailView(id);

  if (!agent) {
    notFound();
  }

  const departments = getDepartmentSummaries();
  const stats = getSiteStats();
  const relatedAgents = getRelatedAgentDetailViews(id);

  return (
    <div className={styles.shell}>
      <Sidebar
        departments={departments}
        stats={stats}
        activeDepartmentSlug={agent?.departmentSlug}
      />
      <MainArea
        eyebrow={agent.departmentName}
        title={agent.name}
        description="Portrait-first field file with cross-platform invocation guidance, best-fit usage notes, and the internal playbooks behind each public agent."
        hideHeader
      >
        <AgentProfilePage agent={agent} relatedAgents={relatedAgents} />
      </MainArea>
    </div>
  );
}
