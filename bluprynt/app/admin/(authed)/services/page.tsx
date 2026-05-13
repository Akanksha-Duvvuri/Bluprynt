import Link from "next/link";
import { db, services } from "@/db";
import { asc } from "drizzle-orm";
import DeleteButton from "./DeleteButton";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const all = await db
    .select()
    .from(services)
    .orderBy(asc(services.sortOrder));

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.label}>▸ A-003 · Services Management</div>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            Services <span className={styles.em}>({all.length})</span>
          </h1>
          <Link href="/admin/services/new" className={styles.newBtn}>
            + New service
          </Link>
        </div>
        <p className={styles.subtitle}>
          What the firm offers. Listed in display order; toggle Featured to
          control which services appear on the homepage preview.
        </p>
      </header>

      {all.length === 0 ? (
        <div className={styles.empty}>
          <p>No services yet.</p>
          <Link href="/admin/services/new" className={styles.emptyCta}>
            Create the first one →
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {all.map((svc) => (
            <article key={svc.id} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.cardNum}>{svc.num}</span>
                {svc.featured && (
                  <span className={styles.featuredBadge}>FEATURED</span>
                )}
              </div>

              <h2 className={styles.cardTitle}>{svc.title}</h2>
              <p className={styles.cardLine}>{svc.line}</p>

              <div className={styles.cardMeta}>
                {svc.category && (
                  <span className={styles.metaItem}>
                    <span className={styles.metaK}>Category</span>
                    <span className={styles.metaV}>{svc.category}</span>
                  </span>
                )}
                {svc.region && (
                  <span className={styles.metaItem}>
                    <span className={styles.metaK}>Region</span>
                    <span className={styles.metaV}>{svc.region}</span>
                  </span>
                )}
                <span className={styles.metaItem}>
                  <span className={styles.metaK}>Sort</span>
                  <span className={styles.metaV}>{svc.sortOrder}</span>
                </span>
              </div>

              <div className={styles.cardActions}>
                <Link
                  href={`/admin/services/${svc.id}/edit`}
                  className={styles.editLink}
                >
                  Edit →
                </Link>
                <DeleteButton id={svc.id} title={svc.title} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
