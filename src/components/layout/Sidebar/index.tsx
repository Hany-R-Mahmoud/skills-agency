"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MutedOutlined, SoundOutlined } from "@ant-design/icons";
import type { SidebarDepartmentSummary, SiteStats } from "@/lib/types";
import { initAudio, isMuted, setMuted, startAmbient } from "@/lib/audio";
import styles from "./Sidebar.module.scss";

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
  const [muted, setMutedState] = useState<boolean>(() => isMuted());

  useEffect(() => {
    function unlockAudio(): void {
      void initAudio();
      void startAmbient();
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    }

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  function toggleMuted() {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setMutedState(nextMuted);
  }

  return (
    <>
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
        <span className={styles.muteState}>
          {muted ? <MutedOutlined aria-hidden /> : <SoundOutlined aria-hidden />}
          {muted ? "Muted" : "Live"}
        </span>
      </button>
      </aside>

      <nav className={styles.mobileNav} aria-label="Quick department navigation">
        <Link href="/" className={styles.mobileHome} data-active={pathname === "/"}>
          HQ
        </Link>
        {departments.map((department) => {
          const isActive =
            activeDepartmentSlug === department.slug ||
            pathname === `/departments/${department.slug}`;

          return (
            <Link
              key={department.slug}
              href={`/departments/${department.slug}`}
              className={styles.mobileLink}
              data-active={isActive}
            >
              {department.name.slice(0, 1)}
            </Link>
          );
        })}
        <button
          type="button"
          className={styles.mobileMute}
          onClick={toggleMuted}
          aria-label={muted ? "Unmute site audio" : "Mute site audio"}
        >
          {muted ? <MutedOutlined aria-hidden /> : <SoundOutlined aria-hidden />}
        </button>
      </nav>
    </>
  );
}
