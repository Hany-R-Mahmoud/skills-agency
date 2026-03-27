import Link from "next/link";
import { Tag } from "antd";
import AgentSprite from "@/components/shared/AgentSprite";
import StatusPip from "@/components/shared/StatusPip";
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
  const departments = getDepartmentSummaries();
  const stats = getSiteStats();

  return (
    <div className={styles.shell}>
      <Sidebar
        departments={departments}
        stats={stats}
        activeDepartmentSlug={agent?.departmentSlug}
      />
      <MainArea
        eyebrow={agent ? agent.departmentName : "Agent link"}
        title={agent ? agent.name : "Agent unavailable"}
        description={
          agent
            ? "Standalone profile route mirroring the in-room drawer contract."
            : "This direct-link profile could not be resolved from the live skills dataset."
        }
      >
        {agent ? (
          <section className={styles.profile} data-accent={agent.accentColor}>
            <div className={styles.hero}>
              <AgentSprite
                color={`var(${agent.accentColor})`}
                style={agent.sprite.style}
                variant={agent.sprite.variant as 1 | 2 | 3 | 4}
                status={agent.status}
                size={88}
                label={agent.name}
              />
              <div className={styles.heroCopy}>
                <p className="label-sm">{agent.departmentName}</p>
                <h2>{agent.name}</h2>
                <p className={styles.codename}>codename::{agent.codename}</p>
                <div className={styles.statusRow}>
                  <StatusPip status={agent.status} />
                  <span>{agent.status}</span>
                  <Tag className={styles.deptTag}>{agent.role}</Tag>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>Brief</h3>
              <p>{agent.description}</p>
            </div>

            <div className={styles.section}>
              <h3>Skills</h3>
              <div className={styles.skillGrid}>
                {agent.skills.map((skill) => (
                  <Tag key={skill} className={styles.skillTag}>
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.invokeHeader}>
                <h3>Invocation</h3>
                <Link href={`/departments/${agent.departmentSlug}`} className={styles.backLink}>
                  Return to {agent.departmentName}
                </Link>
              </div>
              <pre className={styles.invokeBlock}>
                {`codex: ${agent.invocation.codex}\nopencode: ${agent.invocation.opencode}`}
              </pre>
              {agent.replaces ? (
                <p className={styles.replaces}>Replaces: {agent.replaces}</p>
              ) : null}
            </div>
          </section>
        ) : (
          <section className={styles.emptyState}>
            <h2>Agent not found</h2>
            <p>
              The requested profile is not present in the current `skills.json`
              roster. Use the department navigator to jump back into the live map.
            </p>
            <Link href="/" className={styles.backLink}>
              Return to HQ
            </Link>
          </section>
        )}
      </MainArea>
    </div>
  );
}
