import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Sheet from "@/app/components/Sheet";
import { TitleBlock, SheetMeta } from "@/app/components/TitleBlock";
import {
  getProjectBySlug,
  getAllProjectSlugs,
} from "@/lib/projects";
import styles from "./page.module.css";

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

/** Pre-generate a static page at build time for every project. */
export function generateStaticParams(): PageParams[] {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

/** Per-project metadata — unique <title> and description per case study. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name.trim()} ${project.nameEm}`,
    description: project.challenge.slice(0, 160),
  };
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <Sheet id="work" variant="cream">
      <SheetMeta
        sheetCode={`A-002 / ${project.num.split(" ")[0]}`}
        lines={[
          `Layer · WORK / Case Study`,
          `Year · ${project.year}`,
          `Sector · ${project.sector}`,
        ]}
      />
      <TitleBlock
        title={`Bluprynt / ${project.name.trim()} ${project.nameEm}`}
        rows={[
          { k: "Drwg No.", v: project.num.split(" ")[0] },
          { k: "Year", v: String(project.year) },
          { k: "Status", v: (project.status ?? "complete").toUpperCase() },
        ]}
      />

      <div className="sheet-body">
        {/* Breadcrumb back to gallery */}
        <div className={styles.breadcrumb}>
          <Link href="/projects" className={styles.crumb}>
            ← All projects
          </Link>
        </div>

        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ {project.num}</div>
            <h1 className="title">
              {project.name}
              <span className="em">{project.nameEm}</span>
            </h1>
          </div>
          <div className="section-head-right">
            <p>
              <strong>{project.sector}</strong>
              {project.location && <> · {project.location}</>}
              {project.client && <> · {project.client}</>}
            </p>
          </div>
        </div>

        {/* ── Hero illustration — placeholder until real images ── */}
        <div className={styles.hero}>
          <svg viewBox="0 0 800 360" preserveAspectRatio="xMidYMid meet">
            <rect x="40" y="40" width="720" height="280" fill="none" stroke="#15130D" strokeWidth="1.5"/>
            <line x1="40" y1="180" x2="760" y2="180" stroke="rgba(21,19,13,0.4)" strokeWidth="1"/>
            <line x1="400" y1="40" x2="400" y2="320" stroke="rgba(21,19,13,0.4)" strokeWidth="1"/>
            <text x="60" y="60" fontFamily="Space Mono" fontSize="11" fill="rgba(143,118,64,0.7)" letterSpacing="2">
              {project.num.toUpperCase()} · {project.scope.toUpperCase()}
            </text>
            <text x="60" y="312" fontFamily="Space Mono" fontSize="9" fill="rgba(21,19,13,0.4)" letterSpacing="1.5">
              SCALE — INDICATIVE
            </text>
          </svg>
        </div>

        {/* ── Spec sheet ── */}
        <div className={styles.specSheet}>
          <div className={styles.specRow}>
            <span className={styles.specK}>Scope</span>
            <span className={styles.specV}>{project.scope}</span>
          </div>
          {project.client && (
            <div className={styles.specRow}>
              <span className={styles.specK}>Client</span>
              <span className={styles.specV}>{project.client}</span>
            </div>
          )}
          {project.location && (
            <div className={styles.specRow}>
              <span className={styles.specK}>Location</span>
              <span className={styles.specV}>{project.location}</span>
            </div>
          )}
          <div className={styles.specRow}>
            <span className={styles.specK}>Year</span>
            <span className={styles.specV}>{project.year}</span>
          </div>
          {project.tools && project.tools.length > 0 && (
            <div className={styles.specRow}>
              <span className={styles.specK}>Tools</span>
              <span className={styles.specV}>{project.tools.join(" · ")}</span>
            </div>
          )}
        </div>

        {/* ── Challenge / Approach / Outcome ── */}
        <div className={styles.story}>
          <section className={styles.storySection}>
            <div className={styles.storyLabel}>▸ Challenge</div>
            <p className={styles.storyBody}>{project.challenge}</p>
          </section>

          <section className={styles.storySection}>
            <div className={styles.storyLabel}>▸ Approach</div>
            <p className={styles.storyBody}>{project.approach}</p>
          </section>

          <section className={styles.storySection}>
            <div className={styles.storyLabel}>▸ Outcome</div>
            <p className={styles.storyBody}>{project.outcome}</p>
          </section>
        </div>

        <div className="section-foot">
          <Link href="/projects" className="text-link">
            ← All projects
          </Link>
        </div>
      </div>
    </Sheet>
  );
}