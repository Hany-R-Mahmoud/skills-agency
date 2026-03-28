import styles from "./PlaybookWall.module.scss";

interface PlaybookWallProps {
  playbooks: string[];
  departmentId: string;
}

export default function PlaybookWall({
  playbooks,
  departmentId,
}: PlaybookWallProps) {
  return (
    <section className={styles.wall} data-department={departmentId}>
      <div className={styles.header}>
        <div>
          <p className="label-sm">Playbooks loaded</p>
          <h3>Internal skill lanes this agent brings online.</h3>
        </div>
        <span className={styles.count}>{playbooks.length} loaded</span>
      </div>
      <div className={styles.grid}>
        {playbooks.map((playbook, index) => (
          <article key={playbook} className={styles.card}>
            <span className={styles.icon} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className={styles.label}>PLAYBOOK</p>
              <h4>{playbook}</h4>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
