import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/cad/PageShell";
import {
  getProjectBySlug,
  allProjectSlugs,
  PROJECTS,
} from "@/lib/projects";
import styles from "./project-detail.module.css";

type Params = { slug: string };

export async function generateStaticParams() {
  return allProjectSlugs();
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return { title: "Project not found · Bluprynt" };
  return {
    title: `${p.title} · Bluprynt`,
    description: p.scope ?? undefined,
  };
}

const STATUS_TONE: Record<string, string> = {
  active: "mint",
  review: "gold",
  pending: "red",
  completed: "cream",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const tone = STATUS_TONE[String(project.status ?? "").toLowerCase()] ?? "cream";
  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <PageShell
      code="A-101"
      label={`PROJECT · ${project.category ?? "RECORD"}`}
      eyebrow={
        <>
          {project.client && <span>{project.client}</span>}
          {project.client && project.location && <span> · </span>}
          {project.location && <span>{project.location}</span>}
        </>
      }
      title={project.title}
      lede={project.scope}
      maxWidth={1100}
    >
      {/* ===== Meta strip ================================================== */}
      <section className={styles.meta} style={{ ['--i' as string]: 0 }}>
        <div className={styles.metaCell}>
          <span className={styles.metaK}>STATUS</span>
          <span className={styles.metaV} data-tone={tone}>
            <span className={styles.statusDot} />
            {String(project.status ?? "—").toUpperCase()}
          </span>
        </div>

        {project.category && (
          <div className={styles.metaCell}>
            <span className={styles.metaK}>CATEGORY</span>
            <span className={styles.metaVPlain}>{project.category}</span>
          </div>
        )}

        {project.client && (
          <div className={styles.metaCell}>
            <span className={styles.metaK}>CLIENT</span>
            <span className={styles.metaVPlain}>{project.client}</span>
          </div>
        )}

        {project.location && (
          <div className={styles.metaCell}>
            <span className={styles.metaK}>LOCATION</span>
            <span className={styles.metaVPlain}>{project.location}</span>
          </div>
        )}
      </section>

      {/* ===== Scope ====================================================== */}
      {project.scope && (
        <section className={styles.scopeBlock} style={{ ['--i' as string]: 1 }}>
          <header className={styles.blockHead}>
            <span className={styles.blockNum}>01</span>
            <h2 className={styles.blockTitle}>Scope of engagement</h2>
          </header>
          <div className={styles.blockBody}>
            <p>{project.scope}</p>
          </div>
        </section>
      )}

      {/* ===== Other projects ============================================ */}
      {others.length > 0 && (
        <section className={styles.others} style={{ ['--i' as string]: 2 }}>
          <header className={styles.blockHead}>
            <span className={styles.blockNum}>02</span>
            <h2 className={styles.blockTitle}>Other projects</h2>
          </header>
          <ul className={styles.othersList}>
            {others.map((o) => (
              <li key={o.id}>
                <Link href={`/work/${o.slug}`} className={styles.otherLink}>
                  <span className={styles.otherTitle}>{o.title}</span>
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

      {/* ===== Back to work index ======================================== */}
      <div className={styles.back} style={{ ['--i' as string]: 3 }}>
        <Link href="/work" className={styles.backLink}>
          ← Back to all work
        </Link>
      </div>
    </PageShell>
  );
}