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

const STATUS_LABEL: Record<string, string> = {
  live: "Live",
  review: "In review",
  complete: "Complete",
  ongoing: "Ongoing",
};

// Maps to a CSS class so the status dot picks up the right colour
const STATUS_TONE: Record<string, "live" | "review" | "complete" | "ongoing"> = {
  live: "live",
  review: "review",
  complete: "complete",
  ongoing: "ongoing",
};

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return { title: "Project not found · Bluprynt" };
  return {
    title: `${p.name} · Bluprynt`,
    description: p.scope ?? undefined,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

    const all = await getAllProjects();
  const others = all.filter((p) => p.slug !== project.slug).slice(0, 2);

  const status = project.status ?? "ongoing";        // ← new
  const tone = STATUS_TONE[status] ?? "ongoing";     // ← updated to use `status`
  const eyebrow = [project.client, project.location]
    .filter(Boolean)
    .join(" · ");

  return (
    <PageShell
      code={project.num}
      label={`PROJECT · ${(project.sector ?? "").toUpperCase()}`}
      eyebrow={eyebrow || undefined}
      title={project.name}
      lede={project.scope}
      maxWidth={1100}
    >
      {/* ===== Meta strip — inline, no boxes =========================== */}
      <div className={styles.meta} style={{ ["--i" as string]: 0 }}>
        <div className={styles.metaItem}>
          <span className={styles.metaK}>Status</span>
          <span className={`${styles.metaV} ${styles[`status_${tone}`]}`}>
            <span className={styles.statusDot} aria-hidden="true" />
            {STATUS_LABEL[status] ?? status}
          </span>
        </div>
        <span className={styles.metaSep} aria-hidden="true" />
        <div className={styles.metaItem}>
          <span className={styles.metaK}>Year</span>
          <span className={styles.metaV}>{project.year}</span>
        </div>
        {project.sector && (
          <>
            <span className={styles.metaSep} aria-hidden="true" />
            <div className={styles.metaItem}>
              <span className={styles.metaK}>Sector</span>
              <span className={styles.metaV}>{project.sector}</span>
            </div>
          </>
        )}
        {project.client && (
          <>
            <span className={styles.metaSep} aria-hidden="true" />
            <div className={styles.metaItem}>
              <span className={styles.metaK}>Client</span>
              <span className={styles.metaV}>{project.client}</span>
            </div>
          </>
        )}
      </div>

      {/* ===== Narrative — large editorial prose ======================= */}
      {project.challenge && (
        <section className={styles.story} style={{ ["--i" as string]: 1 }}>
          <header className={styles.storyHead}>
            <span className={styles.storyN}>01</span>
            <h2 className={styles.storyTitle}>The challenge</h2>
          </header>
          <p className={styles.storyBody}>{project.challenge}</p>
        </section>
      )}

      {project.approach && (
        <section className={styles.story} style={{ ["--i" as string]: 2 }}>
          <header className={styles.storyHead}>
            <span className={styles.storyN}>02</span>
            <h2 className={styles.storyTitle}>Our approach</h2>
          </header>
          <p className={styles.storyBody}>{project.approach}</p>
        </section>
      )}

      {project.outcome && (
        <section className={styles.story} style={{ ["--i" as string]: 3 }}>
          <header className={styles.storyHead}>
            <span className={styles.storyN}>03</span>
            <h2 className={styles.storyTitle}>Outcome</h2>
          </header>
          <p className={styles.storyBody}>{project.outcome}</p>
        </section>
      )}

      {/* ===== Tools — small chip row ================================== */}
      {project.tools && project.tools.length > 0 && (
        <section className={styles.tools} style={{ ["--i" as string]: 4 }}>
          <h3 className={styles.toolsHead}>Tools &amp; methods</h3>
          <ul className={styles.toolsList}>
            {project.tools.map((t) => (
              <li key={t} className={styles.tool}>
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== Other projects ========================================== */}
      {others.length > 0 && (
        <section className={styles.others} style={{ ["--i" as string]: 5 }}>
          <h3 className={styles.othersHead}>— Other projects</h3>
          <ul className={styles.othersList}>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/work/${o.slug}`} className={styles.otherLink}>
                  <div className={styles.otherInner}>
                    <span className={styles.otherN}>{o.num}</span>
                    <h4 className={styles.otherTitle}>{o.name}</h4>
                    <p className={styles.otherMeta}>
                      {[o.client, o.location].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <span className={styles.otherArrow}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== Back link =============================================== */}
      <div className={styles.backRow} style={{ ["--i" as string]: 6 }}>
        <Link href="/work" className={styles.back}>
          ← Back to all work
        </Link>
      </div>
    </PageShell>
  );
}