"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AgentCard from "@/components/agents/AgentCard";
import type { AgentListItem, RoomTile, SidebarDepartmentSummary } from "@/lib/types";
import styles from "./DeptRoom.module.scss";

interface DeptRoomMapProps {
  mode: "map";
  tiles: RoomTile[];
  activeSlug?: string;
}

interface DeptRoomDepartmentProps {
  mode: "department";
  department: SidebarDepartmentSummary;
  agents: AgentListItem[];
}

type DeptRoomProps = DeptRoomMapProps | DeptRoomDepartmentProps;

export default function DeptRoom(props: DeptRoomProps) {
  const router = useRouter();
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  function handleRoomNavigation(href: string, slug: string) {
    setPendingSlug(slug);
    window.setTimeout(() => {
      router.push(href);
    }, 180);
  }

  if (props.mode === "department") {
    return (
      <section className={styles.departmentView} data-accent={props.department.accentColor}>
        <header className={styles.departmentHeader}>
          <div>
            <p className="label-sm">Department room</p>
            <h2>{props.department.name}</h2>
            <p className={styles.departmentCopy}>{props.department.tagline}</p>
          </div>
          <dl className={styles.departmentStats}>
            <div>
              <dt className="label-sm">Agents</dt>
              <dd>{props.department.agentCount}</dd>
            </div>
            <div>
              <dt className="label-sm">Online</dt>
              <dd>{props.department.onlineCount}</dd>
            </div>
          </dl>
        </header>

        {props.agents.length > 0 ? (
          <div className={styles.agentGrid}>
            {props.agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className="label-sm">No active specialists</p>
            <p>This room is quiet right now, but the route remains ready for future agents.</p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className={styles.mapWrap}>
      <div className={styles.mapHeader}>
        <div>
          <p className="label-sm">Isometric HQ</p>
          <h2>Six live rooms. One floor map.</h2>
        </div>
        <p className={styles.mapCopy}>
          Hover any room for its accent signal, then dive into that department’s
          roster and mandate.
        </p>
      </div>

      <motion.div
        className={styles.mapFrame}
        animate={pendingSlug ? { scale: 0.985, opacity: 0.96 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <svg
          className={styles.map}
          viewBox="0 0 900 560"
          role="img"
          aria-label="Agency headquarters isometric floor map"
        >
          <defs>
            <filter id="agency-room-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {props.tiles.map((tile) => (
            <motion.g
              key={tile.slug}
              className={styles.tile}
              data-accent={tile.accentColor}
              data-active={props.activeSlug === tile.slug}
              data-pending={pendingSlug === tile.slug}
              tabIndex={0}
              role="link"
              aria-label={`${tile.label}, ${tile.agentCount} agents, ${tile.onlineCount} online`}
              onClick={() => handleRoomNavigation(tile.href, tile.slug)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleRoomNavigation(tile.href, tile.slug);
                }
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <polygon className={styles.tileTop} points={tile.polygonPoints} filter="url(#agency-room-glow)" />
              <polygon className={styles.tileFront} points={tile.frontFacePoints} />
              <polygon className={styles.tileEdge} points={tile.edgePoints} />
              <text className={styles.tileLabel} x={tile.labelX} y={tile.labelY}>
                {tile.label}
              </text>
              <text className={styles.tileMeta} x={tile.labelX} y={tile.labelY + 18}>
                {tile.onlineCount}/{tile.agentCount} live
              </text>

              {tile.previewAgents.map((agent, index) => {
                const previewX = tile.spriteAnchorX + index * 28;
                const previewY = tile.spriteAnchorY + ((index + 1) % 2) * 12;

                return (
                  <g
                    key={agent.id}
                    className={styles.preview}
                    data-style={agent.style}
                    data-status={agent.status}
                    transform={`translate(${previewX} ${previewY})`}
                  >
                    <circle className={styles.previewAura} cx="8" cy="8" r="8" />
                    {agent.style === "pixel" ? (
                      <rect className={styles.previewBody} x="2" y="2" width="12" height="12" rx="1" ry="1" />
                    ) : (
                      <polygon className={styles.previewBody} points="8,0 16,8 8,16 0,8" />
                    )}
                  </g>
                );
              })}
            </motion.g>
          ))}
        </svg>
      </motion.div>

      <div className={styles.mapLinks}>
        {props.tiles.map((tile) => (
          <Link
            key={tile.slug}
            href={tile.href}
            className={styles.mapLink}
            data-accent={tile.accentColor}
          >
            <span>{tile.label}</span>
            <span>{tile.agentCount}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
