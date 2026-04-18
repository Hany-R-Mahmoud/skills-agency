"use client";

import Link from "next/link";
import DeptCard from "@/components/departments/DeptCard";
import OfficeFloor from "@/components/departments/OfficeFloor";
import MainArea from "@/components/layout/MainArea";
import Sidebar from "@/components/layout/Sidebar";
import { initAudio, playUI } from "@/lib/audio";
import {
  getAgencyDownloadPath,
  getDepartmentSummaries,
  getRoomTiles,
  getSiteStats,
} from "@/lib/utils";
import styles from "@/app/page.module.scss";

export default function HomePageContent() {
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
        description={`Version 3 command floor with a portrait-first roster, glass-wall office navigation, and direct access to the ${stats.totalAgents} public agents.`}
        hideHeader
      >
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Command Floor</p>
            <h1 className={styles.title}>THE AGENCY</h1>
            <p className={styles.subtitle}>
              {stats.totalAgents} public agents. {stats.totalDepartments} departments. One command floor.
            </p>
            <p>
              Review the agency&apos;s leadership, delivery, design, quality,
              security, and knowledge capabilities through one consolidated
              operating view, then open each specialist profile for scope,
              expertise, and engagement fit.
            </p>
            <div className={styles.heroActions}>
              <Link href="#hq-map" className={styles.primaryAction} onClick={handleEnterHQ}>
                Enter floor
              </Link>
              <a href={getAgencyDownloadPath()} className={styles.secondaryAction} download>
                Download all agents
              </a>
            </div>
          </div>
          <aside className={styles.heroRail}>
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

            <div className={styles.dutyPanel}>
              <div className={styles.dutyHeader}>
                <p className="label-sm">Agents on duty</p>
                <span className={styles.dutySignal}>Live roster</span>
              </div>
              <div className={styles.dutyCount}>{stats.onlineAgents}</div>
              <p className={styles.dutyCopy}>
                Public specialists currently online across {stats.totalDepartments} departments.
              </p>
              <p className={styles.dutyMeta}>
                {stats.totalPlaybooks} structured capability frameworks support
                this public roster, giving you a clearer view of the depth,
                range, and operating maturity behind each team.
              </p>
            </div>
          </aside>
        </section>

        <section id="hq-map" className={styles.mapSection}>
          <div className={styles.sectionIntro}>
            <div>
              <p className="label-sm">Floor map</p>
              <h2>See the agency&apos;s operating structure in one business view.</h2>
            </div>
            <p>
              Each team view, headcount, and route is tied to the same shared
              roster, giving you a consistent picture of functional coverage,
              team composition, and specialist access across desktop and mobile.
            </p>
          </div>
          <div className={styles.mapPanel}>
            <OfficeFloor tiles={roomTiles} />
          </div>
        </section>

        <section className={styles.directory}>
          <div className={styles.sectionIntro}>
            <div>
              <p className="label-sm">Department index</p>
              <h2>Review the agency by function, remit, and team coverage.</h2>
            </div>
            <p>
              The department index presents the same structure in a faster
              business-facing format for comparing mandates, capability depth,
              and specialist coverage.
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
