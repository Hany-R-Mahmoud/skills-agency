import { notFound } from "next/navigation";
import AgentPanel from "@/components/agents/AgentPanel";
import MainArea from "@/components/layout/MainArea";
import Sidebar from "@/components/layout/Sidebar";
import {
  getAgentDetailView,
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

export default async function AgentPage({ params }: AgentPageProps) {
  const { id } = await params;
  const agent = getAgentDetailView(id);

  if (!agent) {
    notFound();
  }

  return (
    <div className={styles.shell}>
      <Sidebar
        departments={getDepartmentSummaries()}
        stats={getSiteStats()}
        activeDepartmentSlug={agent.departmentSlug}
      />
      <MainArea
        eyebrow={agent.departmentName}
        title={agent.name}
        description="Direct-link fallback for agent profiles while the in-room drawer experience is still pending in later phases."
      >
        <AgentPanel agent={agent} />
      </MainArea>
    </div>
  );
}
