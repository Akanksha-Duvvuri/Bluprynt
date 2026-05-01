import Sheet from "../Sheet";
import { TitleBlock, SheetMeta } from "../TitleBlock";
import { db, testimonials } from "@/db";
import { and, eq, asc } from "drizzle-orm";
import styles from "./Testimonials.module.css";

/**
 * Testimonials — homepage section showing featured testimonials.
 * Database-driven: pulls only featured + published rows, sorted.
 *
 * If there are no featured testimonials, the section renders nothing
 * — the homepage just skips it. This is what lets the firm launch
 * without testimonials and add them later without a code change.
 */
export default async function Testimonials() {
  const items = await db
    .select()
    .from(testimonials)
    .where(
      and(eq(testimonials.featured, true), eq(testimonials.published, true))
    )
    .orderBy(asc(testimonials.sortOrder), asc(testimonials.id));

  // Don't render the section at all if there are no featured testimonials
  if (items.length === 0) return null;

  return (
    <Sheet id="testimonials" variant="cream">
      <SheetMeta
        sheetCode="A-006"
        lines={[
          "Layer · TESTIMONIALS",
          `Items · ${items.length}`,
          "Status · Live",
        ]}
      />
      <TitleBlock
        title="Bluprynt / Testimonials"
        rows={[
          { k: "Drwg No.", v: "BCG-006" },
          { k: "Sheet", v: "06 / 06" },
          { k: "Items", v: String(items.length).padStart(2, "0") },
        ]}
      />

      <div className="sheet-body">
        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ A-006 · What clients say</div>
            <h2 className="title">
              Verbatim, on
              <br />
              the <span className="em">record.</span>
            </h2>
          </div>
          <div className="section-head-right">
            Anonymised where requested. Each quote has been client-approved
            for publication.
          </div>
        </div>

        <div className={styles.grid}>
          {items.map((t) => (
            <article key={t.id} className={styles.card}>
              <div className={styles.markBlock}>
                <div className={styles.markCode}>
                  T-{String(t.id).padStart(3, "0")}
                </div>
                <div className={styles.openQuote}>“</div>
              </div>

              <blockquote className={styles.quote}>{t.quote}</blockquote>

              <div className={styles.attribution}>
                <div className={styles.author}>{t.authorName}</div>
                {(t.authorTitle || t.authorCompany) && (
                  <div className={styles.affiliation}>
                    {t.authorTitle}
                    {t.authorTitle && t.authorCompany && " · "}
                    {t.authorCompany}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
