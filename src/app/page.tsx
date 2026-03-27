import DeptCard from "@/components/departments/DeptCard";
import DeptRoom from "@/components/departments/DeptRoom";
import MainArea from "@/components/layout/MainArea";
import Sidebar from "@/components/layout/Sidebar";
import {
  getDepartmentSummaries,
  getRoomTiles,
  getSiteStats,
} from "@/lib/utils";
import styles from "./page.module.scss";

export default function HomePage() {
  const departments = getDepartmentSummaries();
  const stats = getSiteStats();
  const roomTiles = getRoomTiles();

  return (
    <div className={styles.shell}>
      <Sidebar departments={departments} stats={stats} />
      <MainArea
        eyebrow="MVP / Phase 3"
        title="The Agency HQ"
        description="An isometric control floor for browsing departments, checking live staffing, and dropping directly into any room."
        summary={
          <div className={styles.summaryPanel}>
            <p className="label-sm">Live signal</p>
            <div className={styles.summaryValue}>{stats.onlineAgents}</div>
            <p className={styles.summaryCopy}>
              Specialists online across {stats.totalDepartments} departments.
            </p>
          </div>
        }
      >
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className="label-sm">Main navigation</p>
            <h2>Walk the floor, then enter the room that matches the mission.</h2>
            <p>
              Each department tile exposes its active roster, visual accent, and
              live staffing state directly from the shared skills dataset.
            </p>
          </div>
          <dl className={styles.statsBar}>
            <div>
              <dt className="label-sm">Total agents</dt>
              <dd>{stats.totalAgents}</dd>
            </div>
            <div>
              <dt className="label-sm">Busy now</dt>
              <dd>{stats.busyAgents}</dd>
            </div>
            <div>
              <dt className="label-sm">Idle reserve</dt>
              <dd>{stats.idleAgents}</dd>
            </div>
          </dl>
        </section>

        <DeptRoom mode="map" tiles={roomTiles} />

        <section className={styles.directory}>
          <div className={styles.directoryHeader}>
            <div>
              <p className="label-sm">Department directory</p>
              <h2>Alternate route: browse by mandate.</h2>
            </div>
            <p>
              The card grid mirrors the same live counts as the floor map, which
              keeps desktop and mobile navigation in sync with the dataset.
            </p>
          </div>
          <div className={styles.departmentGrid}>
            {departments.map((department) => (
              <DeptCard key={department.slug} department={department} />
            ))}
          </div>
        </section>
      </MainArea>
    </div>
  );
}
