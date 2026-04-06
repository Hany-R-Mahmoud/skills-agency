import type { AgentAchievement } from "@/lib/types";
import styles from "./AchievementWall.module.scss";

interface AchievementWallProps {
  achievements: AgentAchievement[];
  departmentId: string;
}

export default function AchievementWall({
  achievements,
  departmentId,
}: AchievementWallProps) {
  if (achievements.length === 0) {
    return null;
  }

  return (
    <section className={styles.wall} data-department={departmentId}>
      <div className={styles.header}>
        <p className="label-sm">Achievements wall</p>
        <h3>Static proof points for the public profile.</h3>
      </div>
      <div className={styles.grid}>
        {achievements.map((achievement) => (
          <article key={achievement.label} className={styles.card}>
            <p className={styles.value}>{achievement.value}</p>
            <p className={styles.label}>{achievement.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
