import Link from "next/link";
import AgentSprite from "@/components/shared/AgentSprite";
import StatusPip from "@/components/shared/StatusPip";
import type { AgentListItem } from "@/lib/types";
import styles from "./AgentCard.module.scss";

interface AgentCardProps {
  agent: AgentListItem;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link
      className={styles.card}
      href={`/agents/${agent.id}`}
      data-accent={agent.accentColor}
    >
      <div className={styles.header}>
        <AgentSprite
          name={agent.name}
          sprite={agent.sprite}
          status={agent.status}
          accentColor={agent.accentColor}
          size="sm"
        />
        <div className={styles.identity}>
          <div className={styles.statusRow}>
            <StatusPip status={agent.status} />
            <span className="label-sm">{agent.status}</span>
          </div>
          <h3>{agent.name}</h3>
          <p className={styles.codename}>{agent.codename}</p>
        </div>
      </div>
      <p className={styles.role}>{agent.role}</p>
      <dl className={styles.meta}>
        <div>
          <dt className="label-sm">Department</dt>
          <dd>{agent.departmentName}</dd>
        </div>
        <div>
          <dt className="label-sm">Skills</dt>
          <dd>{agent.skillsCount}</dd>
        </div>
      </dl>
    </Link>
  );
}
