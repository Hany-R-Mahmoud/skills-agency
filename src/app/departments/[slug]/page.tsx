import { notFound } from "next/navigation";
import DeptRoom from "@/components/departments/DeptRoom";
import MainArea from "@/components/layout/MainArea";
import Sidebar from "@/components/layout/Sidebar";
import {
  getAgentListItems,
  getDepartmentBySlug,
  getDepartmentRouteParams,
  getDepartmentSummaryBySlug,
  getDepartmentSummaries,
  getSiteStats,
} from "@/lib/utils";
import styles from "./page.module.scss";

export function generateStaticParams() {
  return getDepartmentRouteParams();
}

interface DepartmentPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);
  const departmentSummary = getDepartmentSummaryBySlug(slug);

  if (!department || !departmentSummary) {
    notFound();
  }

  return (
    <div className={styles.shell}>
      <Sidebar
        departments={getDepartmentSummaries()}
        stats={getSiteStats()}
        activeDepartmentSlug={slug}
      />
      <MainArea
        eyebrow={department.name}
        title={department.tagline}
        description="Live roster, route-safe department metadata, and direct links to every specialist currently assigned to this room."
        summary={
          <div className={styles.summaryPanel} data-accent={department.accentColor}>
            <p className="label-sm">Room status</p>
            <div className={styles.summaryValue}>{departmentSummary.onlineCount}</div>
            <p className={styles.summaryCopy}>Specialists online in this room.</p>
          </div>
        }
      >
        <section className={styles.overview}>
          <p className="label-sm">Room overview</p>
          <h2>{department.name}</h2>
          <p>
            This department inherits its route, count, and accent metadata from
            the shared dataset. The roster below is generated statically and
            updates when the source file changes.
          </p>
        </section>

        <DeptRoom
          mode="department"
          department={departmentSummary}
          agents={getAgentListItems(slug)}
        />
      </MainArea>
    </div>
  );
}
