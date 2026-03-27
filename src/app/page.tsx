"use client";

import Link from "next/link";
import DeptRoom from "@/components/departments/DeptRoom";
import DeptCard from "@/components/departments/DeptCard";
import MainArea from "@/components/layout/MainArea";
import Sidebar from "@/components/layout/Sidebar";
import { initAudio, playUI, startAmbient } from "@/lib/audio";
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

  function handleEnterHQ(): void {
    void initAudio();
    void playUI("click");
    void startAmbient();
  }

  return (
    <div className={styles.shell}>
      <Sidebar departments={departments} stats={stats} />
      <MainArea
        eyebrow="Command Floor"
        title="The Agency"
        description="A neon operations floor for routing missions, reading live rosters, and stepping directly into any specialist department."
        hideHeader
      >
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Command Floor</p>
            <h1 className={styles.title}>THE AGENCY</h1>
            <p className={styles.subtitle}>
              31 specialists. 6 departments. One command floor.
            </p>
            <p>
              Route into Command, Engineering, Design, AI Labs, Ops, and Security
              &amp; Research through a live isometric HQ map driven entirely from
              the shared skills dataset.
            </p>
            <div className={styles.heroActions}>
              <Link href="#hq-map" className={styles.primaryAction} onClick={handleEnterHQ}>
                Enter HQ
              </Link>
            </div>
          </div>
          <dl className={styles.statsBar}>
            <div>
              <dt className="label-sm">Total agents</dt>
              <dd>{stats.totalAgents}</dd>
            </div>
            <div>
              <dt className="label-sm">Departments</dt>
              <dd>{stats.totalDepartments}</dd>
            </div>
            <div>
              <dt className="label-sm">Online now</dt>
              <dd>{stats.onlineAgents}</dd>
            </div>
          </dl>
        </section>

        <section id="hq-map" className={styles.mapSection}>
          <div className={styles.summaryPanel}>
            <p className="label-sm">Live signal</p>
            <div className={styles.summaryValue}>{stats.onlineAgents}</div>
            <p className={styles.summaryCopy}>
              Specialists online across {stats.totalDepartments} departments.
            </p>
          </div>
          <DeptRoom mode="map" tiles={roomTiles} />
        </section>

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
