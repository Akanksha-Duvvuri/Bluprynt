import Link from "next/link";
import { PageShell } from "../components/Pageshell";
import { getAllServices } from "@/lib/services";
import styles from "./page.module.css";

export const metadata = {
  title: "Services · Bluprynt",
  description:
    "End-to-end pre-construction consulting: feasibility, cost, constructability, project controls, and owner's representation.",
};

export default async function ServicesPage() {
  const services = await getAllServices();

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
      lede="Each engagement is sized to the question — a one-week feasibility check or a multi-year owner's-rep retainer."
    >
      <ul className={styles.tiles}>
        {services.map((s, i) => (
          <li
            key={s.slug}
            className={styles.tile}
            style={{ ["--i" as string]: i }}
          >
            <Link href={`/services/${s.slug}`} className={styles.tileLink}>
              <div className={styles.tileLeader} aria-hidden="true">
                <span className={styles.leaderDot} />
                <span className={styles.leaderLine} />
              </div>
              <div className={styles.tileHead}>
                <span className={styles.tileN}>{s.num}</span>
                {s.region && (
                  <span className={styles.tileRegion}>{s.region}</span>
                )}
              </div>
              <h3 className={styles.tileTitle}>{s.title}</h3>
              <p className={styles.tileLine}>{s.line}</p>
              <div className={styles.tileFoot}>
                {s.tag && <span className={styles.tileTag}>{s.tag}</span>}
                <span className={styles.tileArrow}>→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA strip at bottom */}
      <section className={styles.cta}>
        <div className={styles.ctaCorners} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.ctaBody}>
          <span className={styles.ctaEyebrow}>NOT SURE WHERE TO START?</span>
          <h3 className={styles.ctaHead}>
            Tell us about the project — we&apos;ll point you to the right
            service.
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