"use client";

import Link from "next/link";
import DeptCard from "@/components/departments/DeptCard";
import OfficeFloor from "@/components/departments/OfficeFloor";
import MainArea from "@/components/layout/MainArea";
import Sidebar from "@/components/layout/Sidebar";
import { initAudio, playUI } from "@/lib/audio";
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
  }

  return (
    <div className={styles.shell}>
      <Sidebar departments={departments} stats={stats} />
      <MainArea
        eyebrow="Command Floor"
        title="The Agency"
        description="Version 2 command floor with a portrait-first roster, glass-wall office navigation, and direct access to the 12 public agents."
        hideHeader
      >
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Command Floor</p>
            <h1 className={styles.title}>THE AGENCY</h1>
            <p className={styles.subtitle}>
              12 public agents. 6 departments. One command floor.
            </p>
            <p>
              Navigate Command, Engineering, Design, Quality, Security, and
              Knowledge through a single-floor office map, then drop into any
              specialist&apos;s full field page.
            </p>
            <div className={styles.heroActions}>
              <Link href="#hq-map" className={styles.primaryAction} onClick={handleEnterHQ}>
                Enter floor
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
              <dt className="label-sm">Playbooks</dt>
              <dd>{stats.totalPlaybooks}</dd>
            </div>
            <div>
              <dt className="label-sm">Online now</dt>
              <dd>{stats.onlineAgents}</dd>
            </div>
          </dl>
        </section>

        <section id="hq-map" className={styles.mapSection}>
          <div className={styles.summaryPanel}>
            <p className="label-sm">Agents on duty</p>
            <div className={styles.summaryValue}>{stats.onlineAgents}</div>
            <p className={styles.summaryCopy}>
              Public specialists currently online across {stats.totalDepartments} departments.
            </p>
            <p className={styles.summaryMeta}>
              {stats.totalPlaybooks} internal playbooks currently loaded across the public roster.
            </p>
          </div>
          <OfficeFloor tiles={roomTiles} />
        </section>

        <section className={styles.directory}>
          <div className={styles.directoryHeader}>
            <div>
              <p className="label-sm">Department directory</p>
              <h2>Alternate route: browse by mandate.</h2>
            </div>
            <p>
              The mobile-friendly directory mirrors the same floor data, keeping
              room counts, accent signals, and routing aligned across the app.
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
