import AgentSprite from "@/components/shared/AgentSprite";
import StatusPip from "@/components/shared/StatusPip";
import type { AgentDetailView } from "@/lib/types";
import styles from "./AgentPanel.module.scss";

interface AgentPanelProps {
  agent: AgentDetailView;
}

export default function AgentPanel({ agent }: AgentPanelProps) {
  return (
    <section className={styles.panel} data-accent={agent.accentColor}>
      <header className={styles.header}>
        <AgentSprite
          name={agent.name}
          sprite={agent.sprite}
          status={agent.status}
          accentColor={agent.accentColor}
        />
        <div className={styles.identity}>
          <p className="label-sm">Agent profile</p>
          <h2>{agent.name}</h2>
          <p className={styles.role}>{agent.role}</p>
          <div className={styles.status}>
            <StatusPip status={agent.status} />
            <span className="label-sm">{agent.status}</span>
          </div>
        </div>
      </header>

      <p className={styles.description}>{agent.description}</p>

      <section className={styles.block}>
        <p className="label-sm">Invocation</p>
        <div className={styles.codeGrid}>
          <code>{agent.invocation.codex}</code>
          <code>{agent.invocation.opencode}</code>
        </div>
      </section>

      <section className={styles.block}>
        <p className="label-sm">Skills</p>
        <ul className={styles.skillList}>
          {agent.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}
