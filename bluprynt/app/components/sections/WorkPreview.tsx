import Link from "next/link";
import { SectionShell } from "../SectionShell";
import { getFeaturedProjects } from "@/lib/projects";
import styles from "./WorkPreview.module.css";

const STATUS_TONE: Record<string, string> = {
  live: "mint",
  ongoing: "mint",
  review: "gold",
  complete: "cream",
};

export default async function WorkPreview() {
  const featured = await getFeaturedProjects();
  const top3 = featured.slice(0, 3);

  return (
    <SectionShell
      code="A-002"
      label="Foundation"
      eyebrow="Selected work"
    >
      <header className={styles.head}>
        <h2 className={styles.heading}>
          Where we've been the{" "}
          <span className={styles.gold}>second pair of eyes</span>.
        </h2>
        <p className={styles.lede}>
          A handful of recent engagements. The thread between them: cost
          certainty before drawings are fixed, and a real handoff into
          construction.
        </p>
      </header>

      <ul className={styles.grid}>
        {top3.map((p, i) => {
          const tone =
            STATUS_TONE[String(p.status ?? "").toLowerCase()] ?? "cream";
          return (
            <li
              key={p.slug}
              className={styles.card}
              style={{ ['--i' as string]: i }}
            >
              <Link href={`/work/${p.slug}`} className={styles.cardLink}>
                <div className={styles.cardCorners} aria-hidden="true">
                  <span /><span /><span /><span />
                </div>

                <div className={styles.cardHead}>
                  <span className={styles.cardN}>PRJ · {p.num}</span>
                  {p.status && (
                    <span className={styles.cardStatus} data-tone={tone}>
                      <span className={styles.statusDot} />
                      {p.status.toUpperCase()}
                    </span>
                  )}
                </div>

                <h3 className={styles.cardTitle}>{p.name}</h3>

                {(p.client || p.location) && (
                  <p className={styles.cardMeta}>
                    {p.client}
                    {p.client && p.location ? " · " : ""}
                    {p.location}
                  </p>
                )}

                <p className={styles.cardScope}>{p.scope}</p>

                <div className={styles.cardFoot}>
                  {p.sector && (
                    <span className={styles.cardCategory}>{p.sector}</span>
                  )}
                  <span className={styles.cardArrow}>→</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {top3.length === 0 && (
        <div className={styles.empty}>
          <p>Project list coming soon.</p>
        </div>
      )}

      <div className={styles.foot}>
        <Link href="/work" className={styles.viewAll}>
          <span>View all work</span>
          <span className={styles.viewArrow}>→</span>
        </Link>
      </div>
    </SectionShell>
  );
}