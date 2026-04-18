import Link from "next/link";
import StatusPip from "@/components/shared/StatusPip";
import AgentPortrait from "@/components/agents/AgentPortrait";
import AchievementWall from "@/components/agents/AchievementWall";
import AgentVoiceCue from "@/components/agents/AgentVoiceCue";
import PlaybookWall from "@/components/agents/PlaybookWall";
import type { AgentDetailView } from "@/lib/types";
import styles from "./AgentPage.module.scss";

interface AgentPageProps {
  agent: AgentDetailView;
  relatedAgents: AgentDetailView[];
}

export default function AgentPage({ agent, relatedAgents }: AgentPageProps) {
  const invocationOptions = [
    agent.invocation.legacy ?? `$${agent.id}`,
    agent.invocation.slash,
  ];

  return (
    <article className={styles.page} data-department={agent.departmentId}>
      <AgentVoiceCue agentId={agent.id} />

      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <AgentPortrait
            src={agent.portrait}
            alt={`${agent.name} portrait`}
            status={agent.status}
            departmentId={agent.departmentId}
            fit={agent.portraitFit}
            priority
          />
        </div>
        <div className={styles.heroCopy}>
          <div className={styles.heroMeta}>
            <span className="label-sm">{agent.departmentName}</span>
            <div className={styles.heroNav}>
              <Link href={`/departments/${agent.departmentSlug}`} className={styles.backLink}>
                Back to {agent.departmentName}
              </Link>
              <Link href="/" className={styles.backLink}>
                Back to floor
              </Link>
            </div>
          </div>
          <h1>{agent.name}</h1>
          <p className={styles.codename}>codename::{agent.codename}</p>
          <p className={styles.role}>{agent.role}</p>
          <div className={styles.statusRow}>
            <StatusPip status={agent.status} />
            <span>{agent.status}</span>
            <span className={styles.departmentBadge}>{agent.departmentName}</span>
          </div>
          <p className={styles.voiceLine}>“{agent.voiceLine}”</p>

          <section className={styles.aboutSection}>
            <div className={styles.sectionHeader}>
              <p className="label-sm">About</p>
              <h2>Operational brief.</h2>
            </div>
            <p className={styles.description}>{agent.description}</p>
          </section>

          <section className={styles.commandPanel}>
            <div className={styles.sectionHeader}>
              <p className="label-sm">How to call this agent</p>
            </div>
            <div className={styles.commandGrid}>
              {invocationOptions.map((command) => (
                <article key={command} className={styles.commandCard}>
                  <code>{command}</code>
                </article>
              ))}
            </div>
          </section>

          {agent.downloadUrl ? (
            <div className={styles.actions}>
              <a
                href={agent.downloadUrl}
                className={styles.primaryAction}
                download
              >
                Download full pack
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <section className={styles.skillsSection}>
        <div className={styles.sectionHeader}>
          <p className="label-sm">Areas of expertise</p>
          <h2>Core strengths this specialist brings onto the floor.</h2>
        </div>
        <div className={styles.skillList}>
          {agent.skills.map((skill) => (
            <span key={skill} className={styles.skillChip}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.guidanceSection}>
        <div className={styles.sectionHeader}>
          <p className="label-sm">Best used when</p>
          <h2>Fast guidance for choosing the right agent.</h2>
        </div>
        <div className={styles.guidanceList}>
          {agent.whenToUse.map((entry) => (
            <article key={entry} className={styles.guidanceCard}>
              <span className={styles.guidanceIndex} aria-hidden="true">
                +
              </span>
              <p>{entry}</p>
            </article>
          ))}
        </div>
      </section>

      <PlaybookWall playbooks={agent.playbooks} departmentId={agent.departmentId} />
      <AchievementWall achievements={agent.achievements} departmentId={agent.departmentId} />

      <section className={styles.teamSection}>
        <div className={styles.sectionHeader}>
          <p className="label-sm">Team</p>
          <h2>Adjacent operators you can bring in next.</h2>
        </div>
        <div className={styles.teamGrid}>
          {relatedAgents.map((relatedAgent) => (
            <Link
              key={relatedAgent.id}
              href={`/agents/${relatedAgent.id}`}
              className={styles.teamCard}
            >
              <AgentPortrait
                src={relatedAgent.portrait}
                alt={`${relatedAgent.name} portrait`}
                status={relatedAgent.status}
                departmentId={relatedAgent.departmentId}
                fit={relatedAgent.portraitFit}
                className={styles.teamPortrait}
              />
              <div className={styles.teamCopy}>
                <span className="label-sm">{relatedAgent.departmentName}</span>
                <strong>{relatedAgent.name}</strong>
                <span>{relatedAgent.role}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
