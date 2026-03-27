"use client";

import Link from "next/link";
import { Tag } from "antd";
import AgentSprite from "@/components/shared/AgentSprite";
import StatusPip from "@/components/shared/StatusPip";
import { initAudio, playUI } from "@/lib/audio";
import type { AgentDetailView } from "@/lib/types";
import styles from "./AgentCard.module.scss";

interface AgentCardProps {
  agent: AgentDetailView;
  onActivate: (agent: AgentDetailView) => void;
}

export default function AgentCard({ agent, onActivate }: AgentCardProps) {
  async function handleActivate(): Promise<void> {
    initAudio();
    await playUI("activate");
    onActivate(agent);
  }

  return (
    <article className={styles.card} data-accent={agent.accentColor}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => void handleActivate()}
      >
        <div className={styles.header}>
          <AgentSprite
            color={agent.sprite.color}
            variant={agent.sprite.variant as 1 | 2 | 3 | 4}
            style={agent.sprite.style}
            status={agent.status}
            size={32}
            label={`${agent.name} sprite`}
          />
          <div className={styles.identity}>
            <div className={styles.codenameRow}>
              <span className={styles.codename}>{agent.codename}</span>
              <StatusPip status={agent.status} />
            </div>
            <h3>{agent.name}</h3>
            <p className={styles.role}>{agent.role}</p>
          </div>
        </div>

        <p className={styles.description}>{agent.description}</p>

        <div className={styles.tags}>
          {(agent.skills ?? []).slice(0, 3).map((skill) => (
            <Tag key={skill} variant="filled" className={styles.tag}>
              {skill}
            </Tag>
          ))}
        </div>
      </button>

      <div className={styles.footer}>
        <span className="label-sm">{agent.departmentName}</span>
        <Link href={`/agents/${agent.id}`} className={styles.profileLink}>
          Open profile
        </Link>
      </div>
    </article>
  );
}
