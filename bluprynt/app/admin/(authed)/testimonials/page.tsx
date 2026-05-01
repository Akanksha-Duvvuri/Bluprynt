import type { Metadata } from "next";
import Link from "next/link";
import { db, testimonials } from "@/db";
import { asc } from "drizzle-orm";
import DeleteButton from "./DeleteButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Testimonials · Admin",
};

export default async function AdminTestimonialsList() {
  const all = await db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.sortOrder), asc(testimonials.id));

  return (
    <div>
      <header className={styles.header}>
        <div>
          <div className={styles.label}>▸ Content · Testimonials</div>
          <h1 className={styles.title}>
            All <span className={styles.em}>testimonials.</span>
          </h1>
          <p className={styles.subtitle}>
            {all.length} testimonial{all.length === 1 ? "" : "s"} ·{" "}
            {all.filter((t) => t.featured).length} featured ·{" "}
            {all.filter((t) => !t.published).length} unpublished
          </p>
        </div>
        <Link href="/admin/testimonials/new" className={styles.newBtn}>
          + New testimonial
        </Link>
      </header>

      {all.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyLabel}>▸ Empty</div>
          <p className={styles.emptyBody}>
            No testimonials yet. Add your first quote to start building social
            proof on the homepage.
          </p>
          <Link href="/admin/testimonials/new" className={styles.newBtn}>
            + Add a testimonial
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {all.map((t) => (
            <article key={t.id} className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardId}>#{String(t.id).padStart(3, "0")}</span>
                  <span className={styles.cardSort}>· sort {t.sortOrder}</span>
                </div>
                <div className={styles.cardBadges}>
                  {t.featured && (
                    <span className={`${styles.badge} ${styles.badgeFeatured}`}>
                      Featured
                    </span>
                  )}
                  {!t.published && (
                    <span className={`${styles.badge} ${styles.badgeUnpublished}`}>
                      Unpublished
                    </span>
                  )}
                </div>
              </div>

              <blockquote className={styles.quote}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className={styles.attribution}>
                <div className={styles.author}>{t.authorName}</div>
                <div className={styles.affiliation}>
                  {t.authorTitle && <span>{t.authorTitle}</span>}
                  {t.authorTitle && t.authorCompany && <span> · </span>}
                  {t.authorCompany && <span>{t.authorCompany}</span>}
                </div>
                {t.relatedProjectSlug && (
                  <div className={styles.related}>
                    Linked: <Link
                      href={`/projects/${t.relatedProjectSlug}`}
                      target="_blank"
                      rel="noopener"
                      className={styles.relatedLink}
                    >
                      /projects/{t.relatedProjectSlug} ↗
                    </Link>
                  </div>
                )}
              </div>

              <div className={styles.actions}>
                <Link
                  href={`/admin/testimonials/${t.id}/edit`}
                  className={styles.editBtn}
                >
                  Edit
                </Link>
                <DeleteButton
                  id={t.id}
                  preview={`${t.authorName}: "${t.quote.slice(0, 40)}…"`}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}