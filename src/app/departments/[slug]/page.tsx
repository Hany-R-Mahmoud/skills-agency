import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AgentPortrait from "@/components/agents/AgentPortrait";
import StatusPip from "@/components/shared/StatusPip";
import MainArea from "@/components/layout/MainArea";
import Sidebar from "@/components/layout/Sidebar";
import {
  getAgentDetailViewsByDepartment,
  getDepartmentBySlug,
  getDepartmentDownloadPath,
  getDepartmentImagePath,
  getDepartmentRouteParams,
  getDepartmentSummaryBySlug,
  getDepartmentSummaries,
  getPlaybookLoadCount,
  getSiteStats,
} from "@/lib/utils";
import styles from "./page.module.scss";

interface DepartmentSceneContent {
  systemCode: string;
  heroLead: string;
  heroAccent: string;
  description: string;
  pulseLabel: string;
  pulseBars: number[];
  feedTitle: string;
  feedItems: Array<{ title: string; body: string; age: string }>;
  systems: Array<{ title: string; description: string }>;
}

const departmentScene: Record<string, DepartmentSceneContent> = {
  command: {
    systemCode: "SYSTEM LIVE // HUB-01",
    heroLead: "COMMAND",
    heroAccent: "CENTER",
    description:
      "Orchestrating the global intelligence network through high-density data synthesis and real-time operational oversight.",
    pulseLabel: "Global routing pressure",
    pulseBars: [54, 38, 62, 27, 68, 42, 73, 49, 88, 57, 64, 46],
    feedTitle: "Agent status feed",
    feedItems: [
      {
        title: "Priority routing stabilized",
        body: "Mission queue redistributed across command leads and orchestration lanes.",
        age: "2m ago",
      },
      {
        title: "Escalation protocol online",
        body: "High-risk intake paths now require full gate sequencing before dispatch.",
        age: "12m ago",
      },
      {
        title: "Decision bandwidth elevated",
        body: "Cross-team coordination throughput increased for multi-agent execution.",
        age: "31m ago",
      },
    ],
    systems: [
      {
        title: "Knowledge core",
        description: "Encrypted repository of strategy prompts, context packs, and dispatch heuristics.",
      },
      {
        title: "Sync protocol",
        description: "Multi-department operational alignment for branching missions and live reprioritization.",
      },
      {
        title: "Terminal access",
        description: "Low-level command routing for floor-wide coordination, escalation, and override paths.",
      },
    ],
  },
  engineering: {
    systemCode: "BUILD READY // ENG-02",
    heroLead: "ENGINEERING",
    heroAccent: "BAY",
    description:
      "Translating approved plans into shipped product through implementation rigor, code ownership, and delivery momentum.",
    pulseLabel: "Build output rhythm",
    pulseBars: [40, 55, 48, 70, 62, 78, 51, 67, 74, 60, 79, 58],
    feedTitle: "Delivery telemetry",
    feedItems: [
      {
        title: "Feature execution active",
        body: "Approved workstreams now flowing through implementation and refactor channels.",
        age: "4m ago",
      },
      {
        title: "Patch lane warmed",
        body: "Low-friction fixes are ready to ship through the frontend-first delivery surface.",
        age: "19m ago",
      },
      {
        title: "Integration stability nominal",
        body: "Production-readiness checks holding steady across core implementation zones.",
        age: "43m ago",
      },
    ],
    systems: [
      {
        title: "Build mesh",
        description: "A distributed implementation pipeline for turning approved specs into working interfaces.",
      },
      {
        title: "Refactor lane",
        description: "Protected upgrade corridor for structural code changes that cannot risk drift.",
      },
      {
        title: "Ship protocol",
        description: "Release-focused delivery surface tuned for confidence, speed, and clean handoff.",
      },
    ],
  },
  design: {
    systemCode: "AESTHETIC LIVE // D-03",
    heroLead: "PRODUCT",
    heroAccent: "DESIGN",
    description:
      "Shaping product feel, interface clarity, and frontend atmosphere into a coherent premium experience users remember.",
    pulseLabel: "Interface quality signal",
    pulseBars: [35, 44, 58, 50, 66, 71, 60, 75, 69, 78, 72, 80],
    feedTitle: "Design signal feed",
    feedItems: [
      {
        title: "Visual hierarchy sharpened",
        body: "Primary surfaces now tuned for stronger focus and calmer cognitive load.",
        age: "3m ago",
      },
      {
        title: "Interaction polish elevated",
        body: "Motion and typography calibration aligned to premium editorial targets.",
        age: "17m ago",
      },
      {
        title: "Responsive review locked",
        body: "Desktop and mobile variants staying within the same system feel.",
        age: "36m ago",
      },
    ],
    systems: [
      {
        title: "Visual language",
        description: "A curated tone system balancing cinematic energy with enterprise-grade restraint.",
      },
      {
        title: "Experience polish",
        description: "Structured pass for interaction quality, onboarding feel, and production-level refinement.",
      },
      {
        title: "Design system fit",
        description: "Alignment channel for preserving consistency while still making the product memorable.",
      },
    ],
  },
  quality: {
    systemCode: "QUALITY LIVE // OPS-04",
    heroLead: "OPS",
    heroAccent: "QUALITY",
    description:
      "Monitoring correctness, verification depth, and failure analysis to ensure every shipped path can stand up to pressure.",
    pulseLabel: "Verification intensity",
    pulseBars: [58, 46, 63, 51, 77, 69, 56, 82, 61, 74, 66, 71],
    feedTitle: "Integrity feed",
    feedItems: [
      {
        title: "Regression sweep active",
        body: "Review, testing, and debugging surfaces are currently synchronized on critical flows.",
        age: "6m ago",
      },
      {
        title: "Evidence capture online",
        body: "Verification outputs now include browser, runtime, and route-level confirmation.",
        age: "21m ago",
      },
      {
        title: "Failure triage standing by",
        body: "Root-cause lanes prepared for regressions, flakiness, and unclear runtime behavior.",
        age: "39m ago",
      },
    ],
    systems: [
      {
        title: "Review matrix",
        description: "Correctness and maintainability evaluation across changed surfaces and adjacent risk zones.",
      },
      {
        title: "Verification rig",
        description: "A multi-layer test and browser validation setup tuned for evidence over assumptions.",
      },
      {
        title: "Debug lane",
        description: "Reproduce-first diagnostic loop for isolating root causes without guesswork.",
      },
    ],
  },
  security: {
    systemCode: "TRUST LIVE // SEC-05",
    heroLead: "SECURITY",
    heroAccent: "CELL",
    description:
      "Reducing risk through trust-boundary review, security judgement, and remediation guidance across sensitive product paths.",
    pulseLabel: "Threat posture",
    pulseBars: [43, 38, 51, 47, 59, 54, 63, 58, 71, 65, 60, 73],
    feedTitle: "Security watch",
    feedItems: [
      {
        title: "Boundary review engaged",
        body: "Sensitive flows under active inspection for auth, validation, and leakage risk.",
        age: "5m ago",
      },
      {
        title: "Remediation guidance primed",
        body: "Hardening recommendations are ready for implementation and retest.",
        age: "24m ago",
      },
      {
        title: "Surface area narrowed",
        body: "Risky pathways isolated for focused review before release progression.",
        age: "52m ago",
      },
    ],
    systems: [
      {
        title: "Trust model",
        description: "A review surface for permissions, validation paths, and cross-boundary data handling.",
      },
      {
        title: "Hardening channel",
        description: "Focused remediation guidance for reducing exposure without slowing delivery unnecessarily.",
      },
      {
        title: "Incident posture",
        description: "A quick-response path for triaging, explaining, and containing sensitive issues.",
      },
    ],
  },
  knowledge: {
    systemCode: "ARCHIVE LIVE // K-06",
    heroLead: "KNOWLEDGE",
    heroAccent: "CONTINUITY",
    description:
      "Preserving context, documentation, and structured handoff memory so work remains legible long after the session ends.",
    pulseLabel: "Context retention",
    pulseBars: [46, 59, 52, 64, 58, 70, 61, 75, 68, 79, 72, 83],
    feedTitle: "Continuity feed",
    feedItems: [
      {
        title: "Documentation channel active",
        body: "Implementation learnings are being translated into durable reference material.",
        age: "7m ago",
      },
      {
        title: "Handoff archive synchronized",
        body: "Session context and continuity packs are ready for transfer across tools and timelines.",
        age: "18m ago",
      },
      {
        title: "Memory quality elevated",
        body: "Summaries now favor long-lived utility over disposable logs and noise.",
        age: "47m ago",
      },
    ],
    systems: [
      {
        title: "Docs fabric",
        description: "A durable writing layer for explanations, READMEs, notes, and product-facing references.",
      },
      {
        title: "Continuity archive",
        description: "Structured export system for preserving project state across sessions, tools, and collaborators.",
      },
      {
        title: "Reference memory",
        description: "High-signal retention path for facts, decisions, and evolving project context.",
      },
    ],
  },
};

export function generateStaticParams() {
  return getDepartmentRouteParams();
}

interface DepartmentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DepartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);

  if (!department) {
    return {
      title: "Department not found",
    };
  }

  return {
    title: department.name,
    description: `${department.tagline}. Explore the ${department.name} roster, systems context, and active specialist pages.`,
  };
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);
  const departmentSummary = getDepartmentSummaryBySlug(slug);
  const agents = getAgentDetailViewsByDepartment(slug);
  const allDepartments = getDepartmentSummaries();
  const stats = getSiteStats();
  const playbookCount = getPlaybookLoadCount(slug);
  const scene = departmentScene[department?.id ?? "command"];

  if (!department || !departmentSummary) {
    notFound();
  }

  return (
    <div className={styles.shell}>
      <Sidebar
        departments={allDepartments}
        stats={stats}
        activeDepartmentSlug={slug}
      />
      <MainArea
        eyebrow={department.name}
        title={department.tagline}
        description="Department landing experience with live status, systems context, and direct entry into each assigned specialist."
        hideHeader
      >
        <section className={styles.deckNav}>
          <div className={styles.departmentTabs}>
            {allDepartments.map((item) => (
              <Link
                key={item.slug}
                href={`/departments/${item.slug}`}
                className={styles.departmentTab}
                data-department={item.id}
                data-active={item.slug === slug}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className={styles.deckActions}>
            <a href={getDepartmentDownloadPath(slug)} className={styles.downloadAction} download>
              Download department
            </a>
            <Link href="/" className={styles.initAction}>
              Return to floor
            </Link>
          </div>
        </section>

        <section className={styles.hero} data-department={department.id}>
          <div className={styles.heroTop}>
            <div className={styles.heroHeading}>
              <div className={styles.heroBadge}>
                <span className={styles.heroDot} aria-hidden />
                {scene.systemCode}
              </div>

              <div className={styles.heroCopy}>
                <p className="label-sm">{department.tagline}</p>
                <h1>
                  <span>{scene.heroLead}</span>
                  <span className={styles.heroAccent}>{scene.heroAccent}</span>
                </h1>
                <p className={styles.heroDescription}>{scene.description}</p>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <Image
                src={getDepartmentImagePath(department.id)}
                alt={`${department.name} room visual`}
                fill
                priority
                sizes="100vw"
                className={styles.heroImage}
              />
            </div>
          </div>

          <div className={styles.heroMetrics}>
            <div className={styles.metricCard}>
              <span className="label-sm">Active specialists</span>
              <strong>{departmentSummary.onlineCount}</strong>
              <span>{department.agents.length} assigned to this room</span>
            </div>
            <div className={styles.metricCard}>
              <span className="label-sm">Playbooks loaded</span>
              <strong>{playbookCount}</strong>
              <span>Total internal skill loads active across this room</span>
            </div>
            <div className={styles.metricCard}>
              <span className="label-sm">Command status</span>
              <strong>{scene.systemCode.split(" // ")[1]}</strong>
              <span>Operational and synchronized</span>
            </div>
          </div>
        </section>

        <section className={styles.intelGrid} data-department={department.id}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className="label-sm">Operation pulse</p>
                <h2>{scene.pulseLabel}</h2>
              </div>
              <div className={styles.panelBadges}>
                <span>Real-time feed</span>
                <span>Encrypted</span>
              </div>
            </div>
            <div className={styles.chart}>
              {scene.pulseBars.map((value, index) => (
                <div key={`${department.id}-${index}`} className={styles.chartColumn}>
                  <span className={styles.chartBar} style={{ height: `${value}%` }} />
                </div>
              ))}
            </div>
            <div className={styles.chartLabels}>
              <span>00:00 UTC</span>
              <span>06:00 UTC</span>
              <span>12:00 UTC</span>
              <span>18:00 UTC</span>
              <span>23:59 UTC</span>
            </div>
          </article>

          <aside className={styles.feedPanel}>
            <div className={styles.panelHeader}>
              <div>
                <p className="label-sm">Signal feed</p>
                <h2>{scene.feedTitle}</h2>
              </div>
            </div>
            <div className={styles.feedList}>
              {scene.feedItems.map((item) => (
                <article key={item.title} className={styles.feedItem}>
                  <div className={styles.feedTitleRow}>
                    <span className={styles.feedPip} />
                    <strong>{item.title}</strong>
                    <span>{item.age}</span>
                  </div>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className={styles.agentSection} data-department={department.id}>
          <div className={styles.sectionHeader}>
            <div>
              <p className="label-sm">Personnel</p>
              <h2>{department.name} operators on active rotation.</h2>
            </div>
            <a href={getDepartmentDownloadPath(slug)} className={styles.sectionDownload} download>
              Download department pack
            </a>
          </div>

          <div className={styles.agentGrid}>
            {agents.map((agent, index) => (
              <Link key={agent.id} href={`/agents/${agent.id}`} className={styles.agentCard}>
                <AgentPortrait
                  src={agent.portrait}
                  alt={`${agent.name} portrait`}
                  status={agent.status}
                  departmentId={agent.departmentId}
                  fit={agent.portraitFit}
                  priority={index < 2}
                  className={styles.portrait}
                />
                <div className={styles.agentCopy}>
                  <div className={styles.agentTopRow}>
                    <span className="label-sm">{agent.codename}</span>
                    <span className={styles.statusMeta}>
                      <StatusPip status={agent.status} />
                      {agent.status}
                    </span>
                  </div>
                  <h3>{agent.name}</h3>
                  <p className={styles.agentRole}>{agent.role}</p>
                  <p className={styles.agentDescription}>{agent.description}</p>
                  <div className={styles.agentSkills}>
                    {agent.skills.slice(0, 4).map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.systemsSection} data-department={department.id}>
          <div className={styles.sectionHeader}>
            <div>
              <p className="label-sm">Systems</p>
              <h2>Infrastructure supporting this department.</h2>
            </div>
          </div>

          <div className={styles.systemGrid}>
            {scene.systems.map((system) => (
              <article key={system.title} className={styles.systemCard}>
                <span className={styles.systemIcon} aria-hidden />
                <h3>{system.title}</h3>
                <p>{system.description}</p>
              </article>
            ))}
          </div>
        </section>

      </MainArea>
    </div>
  );
}
