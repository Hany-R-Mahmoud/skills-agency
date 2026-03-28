"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { BulbOutlined, MoonOutlined, MutedOutlined, SoundOutlined } from "@ant-design/icons";
import type { SidebarDepartmentSummary, SiteStats } from "@/lib/types";
import { getAgencyData } from "@/lib/utils";
import { initAudio, isMuted, setMuted, subscribeToMute } from "@/lib/audio";
import {
  getDocumentTheme,
  resolveTheme,
  setTheme,
  subscribeToTheme,
  type ThemeMode,
} from "@/lib/theme";
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
  const muted = useSyncExternalStore(
    subscribeToMute,
    () => isMuted(),
    () => false,
  );
  const theme = useSyncExternalStore(
    subscribeToTheme,
    () => getDocumentTheme() ?? resolveTheme(),
    () => "dark",
  );

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

  function toggleMuted(): void {
    void initAudio();
    setMuted(!muted);
  }

  function toggleTheme(): void {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }

  function getMobileLabel(name: string): string {
    const words = name
      .replaceAll("&", "")
      .split(" ")
      .filter(Boolean);

    if (words.length === 1) {
      return words[0].slice(0, 4);
    }

    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .slice(0, 3);
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
            aria-label={muted ? "Unmute audio system" : "Mute audio system"}
            title={muted ? "Audio muted" : "Audio live"}
          >
            <span className={styles.controlIcon}>
              {muted ? <MutedOutlined aria-hidden /> : <SoundOutlined aria-hidden />}
            </span>
            <span className={styles.controlMeta}>
              <span className={styles.controlLabel}>Audio</span>
              <span className={styles.controlValue}>{muted ? "Muted" : "Live"}</span>
            </span>
            <span className={styles.controlIndicator} data-state={muted ? "muted" : "live"} aria-hidden />
          </button>

          <button
            type="button"
            className={styles.controlToggle}
            onClick={toggleTheme}
            aria-pressed={theme === "light"}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Light mode active" : "Dark mode active"}
          >
            <span className={styles.controlIcon} suppressHydrationWarning>
              {theme === "light" ? <MoonOutlined aria-hidden /> : <BulbOutlined aria-hidden />}
            </span>
            <span className={styles.controlMeta} suppressHydrationWarning>
              <span className={styles.controlLabel}>Display</span>
              <span className={styles.controlValue}>{theme === "light" ? "Light" : "Dark"}</span>
            </span>
            <span
              className={styles.controlIndicator}
              data-state={theme === "light" ? "light" : "dark"}
              aria-hidden
            />
          </button>
        </div>

        <div className={styles.brandBlock}>
          <p className="label-sm">Agency HQ</p>
          <Link href="/" className={styles.brandLink}>
            <span className={styles.brand}>
              <span className={styles.brandLead}>The</span>
              <span className={styles.brandWord}>Agency</span>
            </span>
          </Link>
          <p className={styles.copy}>
            One live roster for every public operator.
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
                  <span className={styles.linkMeta}>
                    {department.onlineCount} live
                  </span>
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
              data-department={department.id}
              aria-label={`Open ${department.name}`}
              title={department.name}
            >
              {getMobileLabel(department.name)}
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
