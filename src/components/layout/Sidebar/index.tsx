"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BulbOutlined, MoonOutlined, MutedOutlined, SoundOutlined } from "@ant-design/icons";
import type { SidebarDepartmentSummary, SiteStats } from "@/lib/types";
import { getAgencyData } from "@/lib/utils";
import { initAudio, isMuted, setMuted } from "@/lib/audio";
import { getDocumentTheme, resolveTheme, setTheme, type ThemeMode } from "@/lib/theme";
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
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return getDocumentTheme() ?? resolveTheme();
  });

  useEffect(() => {
    function unlockAudio(): void {
      void initAudio();
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
    initAudio();
    const nextMuted = !muted;
    setMuted(nextMuted);
    setMutedState(nextMuted);
  }

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setThemeState(nextTheme);
  }

  const version = getAgencyData().meta.version;

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.controlStack}>
          <button
            type="button"
            className={styles.controlToggle}
            onClick={toggleMuted}
            aria-pressed={muted}
          >
            <span className="label-sm">Audio system</span>
            <span className={styles.controlState}>
              {muted ? <MutedOutlined aria-hidden /> : <SoundOutlined aria-hidden />}
              {muted ? "Muted" : "Live"}
            </span>
          </button>

          <button
            type="button"
            className={styles.controlToggle}
            onClick={toggleTheme}
            aria-pressed={theme === "light"}
          >
            <span className="label-sm">Display mode</span>
            <span className={styles.controlState} suppressHydrationWarning>
              {theme === "light" ? <MoonOutlined aria-hidden /> : <BulbOutlined aria-hidden />}
              {theme === "light" ? "Light" : "Dark"}
            </span>
          </button>
        </div>

        <div className={styles.brandBlock}>
          <p className="label-sm">Agency HQ</p>
          <Link href="/" className={styles.brandLink}>
            <span className={styles.brand}>The Agency</span>
          </Link>
          <p className={styles.copy}>
            Single-floor command map for routing missions, reviewing rosters,
            and opening any public agent profile.
          </p>
        </div>

        <section className={styles.statusCard}>
          <div>
            <p className="label-sm">Agents on duty</p>
            <strong>{stats.onlineAgents}</strong>
          </div>
          <dl className={styles.statusGrid}>
            <div>
              <dt className="label-sm">Public</dt>
              <dd>{stats.totalAgents}</dd>
            </div>
            <div>
              <dt className="label-sm">Busy</dt>
              <dd>{stats.busyAgents}</dd>
            </div>
            <div>
              <dt className="label-sm">Idle</dt>
              <dd>{stats.idleAgents}</dd>
            </div>
            <div>
              <dt className="label-sm">Rooms</dt>
              <dd>{stats.totalDepartments}</dd>
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
                data-department={department.id}
              >
                <span className={styles.linkAccent} aria-hidden />
                <span className={styles.linkBody}>
                  <span className={styles.linkTitle}>{department.name}</span>
                  <span className={styles.linkMeta}>{department.tagline}</span>
                </span>
                <span className={styles.linkCount}>{department.agentCount}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.versionBlock}>
          <span className="label-sm">Version</span>
          <span>v{version}</span>
        </div>
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
          className={styles.mobileTheme}
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          aria-pressed={theme === "light"}
        >
          {theme === "light" ? <MoonOutlined aria-hidden /> : <BulbOutlined aria-hidden />}
        </button>
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
