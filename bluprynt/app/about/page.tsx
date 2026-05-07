import type { Metadata } from "next";
import Link from "next/link";
import Sheet from "@/app/components/Sheet";
import { TitleBlock, SheetMeta } from "@/app/components/TitleBlock";
import { FOUNDERS } from "@/lib/Founders";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Two engineers, one premise. The firm Bluprynt Consulting Group, the founders behind it, and the philosophy that drives our work.",
};

export default function AboutPage() {
  return (
    <Sheet id="about" variant="dark">
      <SheetMeta
        sheetCode="A-005"
        lines={["Layer · ABOUT / Founders", "Drawn by · BCG"]}
      />
      <TitleBlock
        title="Bluprynt / About"
        rows={[
          { k: "Drwg No.", v: "BCG-004" },
          { k: "Sheet", v: "01 / 01" },
          { k: "Founders", v: "02" },
        ]}
      />

      <div className="sheet-body">
        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ A-004 · About the firm</div>
            <h1 className="title">
              Two engineers,
              <br />
              one <span className="em">premise.</span>
            </h1>
          </div>
          <div className="section-head-right">
            That the most expensive engineering decision is the one you
            didn&apos;t think hard enough about. We help you think about it —
            early, honestly, and on the record.
          </div>
        </div>

        {/* ── Origin story ── */}
        <section className={styles.origin}>
          <div className={styles.originLabel}>▸ Origin</div>
          <div className={styles.originBody}>
            <p>
              Bluprynt Consulting Group was founded on a simple observation:
              the most expensive moments on most engineering projects happen
              before construction starts. The wrong site is chosen, the wrong
              scope is scoped, the wrong contractor is selected, and by the
              time the cost shows up on a Gantt chart it&apos;s too late to
              do much about it.
            </p>
            <p>
              We are a pre-consulting firm — meaning we are typically the
              first technical voice in the room. Owners, lenders, and
              acquirers bring us in to answer the questions their design
              teams won&apos;t ask, to interrogate the assumptions everyone
              else has accepted, and to put a written, defensible position
              on the record before commitments harden.
            </p>
            <p>
              The work is unglamorous. It&apos;s reading drawings carefully.
              It&apos;s calculating things twice. It&apos;s writing the memo
              that says <em>this might not work for these reasons</em> when
              the room would prefer to hear that everything is fine.
              We&apos;re comfortable being the engineers who say it.
            </p>
          </div>
        </section>

        {/* ── Founders ── */}
        <section className={styles.foundersSection}>
          <div className={styles.foundersLabel}>▸ Founders</div>
          <div className={styles.foundersGrid}>
            {FOUNDERS.map((f) => (
              <article key={f.name} className={styles.founderCard}>
                <div className={styles.photo} aria-hidden="true">
                  {f.initials}
                </div>
                <div className={styles.founderHead}>
                  <div className={styles.founderName}>{f.name}</div>
                  <div className={styles.founderRole}>{f.role}</div>
                </div>
                <p className={styles.founderBio}>{f.longBio}</p>

                <div className={styles.credentials}>
                  {f.credentials.map((c) => (
                    <div key={c.k} className={styles.credRow}>
                      <span className={styles.credK}>{c.k}</span>
                      <span className={styles.credV}>{c.v}</span>
                    </div>
                  ))}
                </div>

                {f.linkedin && (
                  <div className={styles.founderFoot}>
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkedin}
                    >
                      LinkedIn ↗
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <div className="section-foot">
          <Link href="/contact" className="text-link">
            Start a project →
          </Link>
        </div>
      </div>
    </Sheet>
  );
}