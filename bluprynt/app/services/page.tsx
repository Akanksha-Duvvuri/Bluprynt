import Link from "next/link";
import { PageShell } from "../components/Pageshell";
import {
  SERVICES,
  getServicesGroupedByCategory,
} from "@/lib/services";
import styles from "./page.module.css";

export const metadata = {
  title: "Services · Bluprynt",
  description:
    "End-to-end pre-construction consulting: feasibility, cost, constructability, project controls, and owner's representation.",
};

export default function ServicesPage() {
  const groups = getServicesGroupedByCategory();
  const categoryOrder = ["Strategy", "Cost", "Design", "Execution"];
  const orderedCategories = categoryOrder.filter((c) => groups[c]);

  return (
    <PageShell
      code="A-200"
      label="SERVICES INDEX"
      eyebrow="What we do, end to end"
      title={
        <>
          Engineering judgment, on your <em>side of the table</em>.
        </>
      }
      lede="Five practice areas, one team. Each engagement is sized to the question — a one-week feasibility check or a multi-year owner's-rep retainer."
    >
      {orderedCategories.map((category, ci) => (
        <section
          key={category}
          className={styles.group}
          style={{ ['--i' as string]: ci }}
        >
          <header className={styles.groupHead}>
            <span className={styles.groupNum}>
              {String(ci + 1).padStart(2, "0")}
            </span>
            <h2 className={styles.groupTitle}>{category}</h2>
            <span className={styles.groupCount}>
              {groups[category].length} service
              {groups[category].length === 1 ? "" : "s"}
            </span>
          </header>

          <ul className={styles.tiles}>
            {groups[category].map((s, i) => (
              <li
                key={s.slug}
                className={styles.tile}
                style={{ ['--i' as string]: i }}
              >
                <Link href={`/services/${s.slug}`} className={styles.tileLink}>
                  <div className={styles.tileLeader} aria-hidden="true">
                    <span className={styles.leaderDot} />
                    <span className={styles.leaderLine} />
                  </div>
                  <div className={styles.tileHead}>
                    <span className={styles.tileN}>{s.num}</span>
                    <span className={styles.tileRegion}>{s.region}</span>
                  </div>
                  <h3 className={styles.tileTitle}>{s.title}</h3>
                  <p className={styles.tileLine}>{s.line}</p>
                  <div className={styles.tileFoot}>
                    <span className={styles.tileTag}>{s.tag}</span>
                    <span className={styles.tileArrow}>→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* CTA strip at bottom */}
      <section className={styles.cta}>
        <div className={styles.ctaCorners} aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <div className={styles.ctaBody}>
          <span className={styles.ctaEyebrow}>NOT SURE WHERE TO START?</span>
          <h3 className={styles.ctaHead}>
            Tell us about the project — we'll point you to the right service.
          </h3>
          <Link href="/#contact" className={styles.ctaBtn}>
            <span>Start a conversation</span>
            <span className={styles.ctaArrow}>→</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}