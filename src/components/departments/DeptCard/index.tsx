import Link from "next/link";
import type { SidebarDepartmentSummary } from "@/lib/types";
import styles from "./DeptCard.module.scss";

interface DeptCardProps {
  department: SidebarDepartmentSummary;
}

export default function DeptCard({ department }: DeptCardProps) {
  return (
    <Link
      className={styles.card}
      href={`/departments/${department.slug}`}
      data-department={department.id}
    >
      <div className={styles.header}>
        <p className="label-sm">Department</p>
        <span className={styles.count}>{department.agentCount} agents</span>
      </div>
      <h3>{department.name}</h3>
      <p className={styles.tagline}>{department.tagline}</p>
      <dl className={styles.metrics}>
        <div>
          <dt className="label-sm">Online</dt>
          <dd>{department.onlineCount}</dd>
        </div>
        <div>
          <dt className="label-sm">Busy</dt>
          <dd>{department.busyCount}</dd>
        </div>
      </dl>
    </Link>
  );
}
