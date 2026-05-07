import Link from "next/link";
import { PageShell } from "../components/Pageshell";
import { getAllProjects } from "@/lib/projects";
import styles from "./work.module.css";

export const metadata = {
  title: "Work · Bluprynt",
  description:
    "Selected projects across infrastructure, civil, and built-environment consulting.",
};

const STATUS_TONE: Record<string, string> = {
  live: "mint",
  ongoing: "mint",
  review: "gold",
  complete: "cream",
};

export default async function WorkIndexPage() {
  const projects = await getAllProjects();

  return (
    <PageShell
      code="A-100"
      label="WORK INDEX"
      eyebrow="Selected projects"
      title={
        <>
          The drawings tell <em>one story</em>.
          <br />
          The site tells another.
        </>
      }
      lede="Where we've sat at the seam between design intent and construction reality. Each project's the same engagement structure, scoped to what it needed."
    >
      <ul className={styles.list}>
        {projects.map((p, i) => {
          const tone =
            STATUS_TONE[String(p.status ?? "").toLowerCase()] ?? "cream";
          return (
            <li
              key={p.slug}
              className={styles.row}
              style={{ ['--i' as string]: i }}
            >
              <Link href={`/work/${p.slug}`} className={styles.rowLink}>
                <span className={styles.rowN}>{p.num}</span>

                <div className={styles.rowMain}>
                  <h3 className={styles.rowTitle}>{p.name}</h3>
                  {(p.client || p.location) && (
                    <p className={styles.rowMeta}>
                      {p.client}
                      {p.client && p.location ? " · " : ""}
                      {p.location}
                      {p.year ? ` · ${p.year}` : ""}
                    </p>
                  )}
                </div>

                {p.sector && (
                  <span className={styles.rowCategory}>{p.sector}</span>
                )}

                {p.status && (
                  <span className={styles.rowStatus} data-tone={tone}>
                    <span className={styles.statusDot} />
                    {p.status.toUpperCase()}
                  </span>
                )}

                <span className={styles.rowArrow}>→</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {projects.length === 0 && (
        <div className={styles.empty}>
          <p>No projects published yet.</p>
        </div>
      )}

      <section className={styles.cta}>
        <span className={styles.ctaEyebrow}>HAVE A PROJECT?</span>
        <h3 className={styles.ctaHead}>
          We pick engagements where the work matters and the team listens.
        </h3>
        <Link href="/contact" className={styles.ctaBtn}>
          <span>Tell us about it</span>
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </section>
    </PageShell>
  );
}