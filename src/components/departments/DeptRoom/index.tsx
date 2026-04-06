"use client";

import Link from "next/link";
import AgentPortrait from "@/components/agents/AgentPortrait";
import StatusPip from "@/components/shared/StatusPip";
import OfficeFloor from "@/components/departments/OfficeFloor";
import type { AgentDetailView, RoomTile, SidebarDepartmentSummary } from "@/lib/types";
import styles from "./DeptRoom.module.scss";

interface DeptRoomMapProps {
  mode: "map";
  tiles: RoomTile[];
  activeSlug?: string;
}

interface DeptRoomDepartmentProps {
  mode: "department";
  department: SidebarDepartmentSummary;
  agents: AgentDetailView[];
}

type DeptRoomProps = DeptRoomMapProps | DeptRoomDepartmentProps;

export default function DeptRoom(props: DeptRoomProps) {
  if (props.mode === "map") {
    return <OfficeFloor tiles={props.tiles} activeSlug={props.activeSlug} />;
  }

  return (
    <section className={styles.departmentView} data-department={props.department.id}>
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
            <Link key={agent.id} href={`/agents/${agent.id}`} className={styles.agentCard}>
              <AgentPortrait
                src={agent.portrait}
                alt={`${agent.name} portrait`}
                status={agent.status}
                departmentId={agent.departmentId}
                fit={agent.portraitFit}
                className={styles.agentPortrait}
              />
              <div className={styles.agentBody}>
                <div className={styles.agentTopRow}>
                  <strong>{agent.name}</strong>
                  <span className={styles.statusMeta}>
                    <StatusPip status={agent.status} />
                    {agent.status}
                  </span>
                </div>
                <span className={styles.agentRole}>{agent.role}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className="label-sm">No specialists assigned</p>
          <p>This room is quiet right now, but the route remains ready for future agents.</p>
        </div>
      )}
    </section>
  );
}
