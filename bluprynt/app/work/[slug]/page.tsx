import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "../../components/Pageshell";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAllProjects,
} from "@/lib/projects";
import styles from "./page.module.css";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  // BG's helper returns string[], not {slug}[]. Map into the shape Next wants.
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found · Bluprynt" };
  return {
    title: `${project.name} · Bluprynt`,
    description: project.scope,
  };
}

const STATUS_TONE: Record<string, string> = {
  live: "mint",
  ongoing: "mint",
  review: "gold",
  complete: "cream",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const all = await getAllProjects();
  const others = all.filter((p) => p.slug !== project.slug).slice(0, 3);

  const tone =
    STATUS_TONE[String(project.status ?? "").toLowerCase()] ?? "cream";

  return (
    <PageShell
      code={`A-1${project.num.padStart(2, "0")}`}
      label={`PROJECT · ${project.sector}`}
      eyebrow={
        <>
          {project.client && <span>{project.client}</span>}
          {project.client && project.location && <span> · </span>}
          {project.location && <span>{project.location}</span>}
        </>
      }
      title={project.name}
      lede={project.scope}
      maxWidth={1100}
    >
      {/* ===== Meta strip ================================================== */}
      <section className={styles.meta} style={{ ['--i' as string]: 0 }}>
        {project.status && (
          <div className={styles.metaCell}>
            <span className={styles.metaK}>STATUS</span>
            <span className={styles.metaV} data-tone={tone}>
              <span className={styles.statusDot} />
              {project.status.toUpperCase()}
            </span>
          </div>
        )}

        <div className={styles.metaCell}>
          <span className={styles.metaK}>YEAR</span>
          <span className={styles.metaVPlain}>{project.year}</span>
        </div>

        <div className={styles.metaCell}>
          <span className={styles.metaK}>SECTOR</span>
          <span className={styles.metaVPlain}>{project.sector}</span>
        </div>

        {project.client && (
          <div className={styles.metaCell}>
            <span className={styles.metaK}>CLIENT</span>
            <span className={styles.metaVPlain}>{project.client}</span>
          </div>
        )}
      </section>

      {/* ===== Tools (if present) ========================================= */}
      {project.tools && project.tools.length > 0 && (
        <section className={styles.scopeBlock} style={{ ['--i' as string]: 1 }}>
          <header className={styles.blockHead}>
            <span className={styles.blockNum}>01</span>
            <h2 className={styles.blockTitle}>Tools & methods</h2>
          </header>
          <ul className={styles.tools}>
            {project.tools.map((t) => (
              <li key={t} className={styles.tool}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== Challenge ================================================== */}
      <section className={styles.scopeBlock} style={{ ['--i' as string]: 2 }}>
        <header className={styles.blockHead}>
          <span className={styles.blockNum}>
            {project.tools && project.tools.length > 0 ? "02" : "01"}
          </span>
          <h2 className={styles.blockTitle}>The challenge</h2>
        </header>
        <div className={styles.blockBody}>
          <p>{project.challenge}</p>
        </div>
      </section>

      {/* ===== Approach =================================================== */}
      <section className={styles.scopeBlock} style={{ ['--i' as string]: 3 }}>
        <header className={styles.blockHead}>
          <span className={styles.blockNum}>
            {project.tools && project.tools.length > 0 ? "03" : "02"}
          </span>
          <h2 className={styles.blockTitle}>Our approach</h2>
        </header>
        <div className={styles.blockBody}>
          <p>{project.approach}</p>
        </div>
      </section>

      {/* ===== Outcome ==================================================== */}
      <section className={styles.scopeBlock} style={{ ['--i' as string]: 4 }}>
        <header className={styles.blockHead}>
          <span className={styles.blockNum}>
            {project.tools && project.tools.length > 0 ? "04" : "03"}
          </span>
          <h2 className={styles.blockTitle}>Outcome</h2>
        </header>
        <div className={styles.blockBody}>
          <p>{project.outcome}</p>
        </div>
      </section>

      {/* ===== Other projects ============================================ */}
      {others.length > 0 && (
        <section className={styles.others} style={{ ['--i' as string]: 5 }}>
          <header className={styles.blockHead}>
            <span className={styles.blockNum}>—</span>
            <h2 className={styles.blockTitle}>Other projects</h2>
          </header>
          <ul className={styles.othersList}>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/work/${o.slug}`} className={styles.otherLink}>
                  <span className={styles.otherTitle}>{o.name}</span>
                  {(o.client || o.location) && (
                    <span className={styles.otherMeta}>
                      {o.client}
                      {o.client && o.location ? " · " : ""}
                      {o.location}
                    </span>
                  )}
                  <span className={styles.otherArrow}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.back} style={{ ['--i' as string]: 6 }}>
        <Link href="/work" className={styles.backLink}>← Back to all work</Link>
      </div>
    </PageShell>
  );
}