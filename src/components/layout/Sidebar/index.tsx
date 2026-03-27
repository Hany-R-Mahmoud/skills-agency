"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { SidebarDepartmentSummary, SiteStats } from "@/lib/types";
import styles from "./Sidebar.module.scss";

const MUTE_STORAGE_KEY = "agency:muted";

interface SidebarProps {
  departments: SidebarDepartmentSummary[];
  stats: SiteStats;
  activeDepartmentSlug?: string;
}

export default function Sidebar({
  departments,
  stats,
  activeDepartmentSlug,
}: SidebarProps) {
  const pathname = usePathname();
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const storedPreference = window.localStorage.getItem(MUTE_STORAGE_KEY);
    return storedPreference === null ? true : storedPreference === "true";
  });

  function toggleMuted() {
    const nextMuted = !muted;
    setMuted(nextMuted);
    window.localStorage.setItem(MUTE_STORAGE_KEY, String(nextMuted));
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandBlock}>
        <p className="label-sm">Agency HQ</p>
        <Link href="/" className={styles.brandLink}>
          <span className={styles.brand}>The Agency</span>
        </Link>
        <p className={styles.copy}>
          Command map for AI specialists, live rosters, and department routes.
        </p>
      </div>

      <section className={styles.statusCard}>
        <div>
          <p className="label-sm">Agents online</p>
          <strong>{stats.onlineAgents}</strong>
        </div>
        <dl className={styles.statusGrid}>
          <div>
            <dt className="label-sm">Busy</dt>
            <dd>{stats.busyAgents}</dd>
          </div>
          <div>
            <dt className="label-sm">Idle</dt>
            <dd>{stats.idleAgents}</dd>
          </div>
        </dl>
      </section>

      <nav className={styles.nav} aria-label="Departments">
        {departments.map((department) => {
          const isActive =
            activeDepartmentSlug === department.slug ||
            pathname === `/departments/${department.slug}`;

          return (
            <Link
              key={department.slug}
              className={styles.link}
              href={`/departments/${department.slug}`}
              data-active={isActive}
              data-accent={department.accentColor}
            >
              <span>
                <span className={styles.linkTitle}>{department.name}</span>
                <span className={styles.linkMeta}>{department.tagline}</span>
              </span>
              <span className={styles.linkCount}>{department.agentCount}</span>
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className={styles.muteToggle}
        onClick={toggleMuted}
        aria-pressed={muted}
      >
        <span className="label-sm">Audio</span>
        <span>{muted ? "Muted" : "Live"}</span>
      </button>
    </aside>
  );
}
