import type { Metadata } from "next";
import Link from "next/link";
import Sheet from "@/app/components/Sheet";
import { TitleBlock, SheetMeta } from "@/app/components/TitleBlock";
import { SERVICES } from "@/lib/services";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four services: structural assessment, feasibility studies, project advisory, and due diligence. Deliverables, engagement type, and timeline for each.",
};

export default function ServicesPage() {
  return (
    <Sheet id="services" variant="dark">
      <SheetMeta
        sheetCode="A-003"
        lines={[
          "Layer · SERVICES",
          "Engagement matrix",
          `Items · ${SERVICES.length}`,
        ]}
      />
      <TitleBlock
        title="Bluprynt / Services"
        rows={[
          { k: "Drwg No.", v: "BCG-003" },
          { k: "Sheet", v: "01 / 01" },
          { k: "Items", v: String(SERVICES.length).padStart(2, "0") },
        ]}
      />

      <div className="sheet-body">
        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ A-003 · Services</div>
            <h1 className="title">
              Four ways
              <br />
              we <span className="em">work.</span>
            </h1>
          </div>
          <div className="section-head-right">
            <p>
              Each service has a defined deliverable, a typical timeline, and
              a clear answer to the question of who it&apos;s for. Click any
              service for the full spec sheet.
            </p>
          </div>
        </div>

        <div className={styles.list}>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              id={s.slug}
              className={styles.service}
            >
              <div className={styles.serviceHead}>
                <div className={styles.serviceNum}>{s.num}</div>
                <h2 className={styles.serviceTitle}>
                  {s.name}
                  <span className={styles.em}>{s.nameEm}</span>
                </h2>
              </div>

              <div className={styles.serviceBody}>
                <p className={styles.serviceLong}>{s.longDesc}</p>

                <div className={styles.specSheet}>
                  <div className={styles.specRow}>
                    <span className={styles.specK}>Deliverables</span>
                    <span className={styles.specV}>
                      {s.deliverables.map((d) => (
                        <span key={d} className={styles.deliv}>
                          {d}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specK}>Engagement</span>
                    <span className={styles.specV}>{s.engagement}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specK}>Timeline</span>
                    <span className={styles.specV}>{s.timeline}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specK}>Who it&apos;s for</span>
                    <span className={styles.specVProse}>{s.whoItsFor}</span>
                  </div>
                </div>

                <div className={styles.serviceFoot}>
                  <span className={styles.viewLink}>View full spec sheet →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaLeft}>
            <div className={styles.ctaLabel}>▸ Start</div>
            <h2 className={styles.ctaTitle}>
              Not sure which one
              <br />
              you need?
            </h2>
            <p className={styles.ctaCopy}>
              Tell us about the project and we&apos;ll tell you honestly
              whether we&apos;re the right fit, and which engagement type
              makes sense.
            </p>
          </div>
          <div className={styles.ctaRight}>
            <Link href="/contact" className="btn-primary">
              Start a project →
            </Link>
          </div>
        </div>
      </div>
    </Sheet>
  );
}