import type { Metadata } from "next";
import Link from "next/link";
import { db, projects } from "@/db";
import { desc } from "drizzle-orm";
import DeleteButton from "./DeleteButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects · Admin",
};

/**
 * /admin/projects — list view.
 *
 * Server component: fetches all projects from the database and renders
 * a table-like list. Each row has Edit and Delete buttons.
 *
 * Auth is already enforced by middleware + the (authed) layout —
 * if you're seeing this page, you're signed in.
 */
export default async function AdminProjectsList() {
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(desc(projects.year), desc(projects.id));

  return (
    <div>
      <header className={styles.header}>
        <div>
          <div className={styles.label}>▸ Content · Projects</div>
          <h1 className={styles.title}>
            All <span className={styles.em}>projects.</span>
          </h1>
          <p className={styles.subtitle}>
            {allProjects.length} project{allProjects.length === 1 ? "" : "s"} in
            the database.{" "}
            {allProjects.filter((p) => p.featured).length} featured on the
            homepage.
          </p>
        </div>
        <Link href="/admin/projects/new" className={styles.newBtn}>
          + New project
        </Link>
      </header>

      {allProjects.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyLabel}>▸ Empty</div>
          <p className={styles.emptyBody}>
            No projects yet. Add your first one to populate the homepage and
            archive.
          </p>
          <Link href="/admin/projects/new" className={styles.newBtn}>
            + Add a project
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          <div className={styles.listHead}>
            <span className={styles.headCell}>#</span>
            <span className={styles.headCell}>Project</span>
            <span className={styles.headCell}>Sector</span>
            <span className={styles.headCell}>Year</span>
            <span className={styles.headCell}>Status</span>
            <span className={styles.headCell}>Featured</span>
            <span className={styles.headCellEnd}>Actions</span>
          </div>

          {allProjects.map((p) => (
            <div key={p.id} className={styles.row}>
              <span className={styles.cellNum}>{p.num}</span>

              <span className={styles.cellName}>
                <Link
                  href={`/projects/${p.slug}`}
                  className={styles.nameLink}
                  target="_blank"
                  rel="noopener"
                  title="Open public page in a new tab"
                >
                  {p.name}
                  <span className={styles.em}>{p.nameEm}</span>
                  <span className={styles.extLink}> ↗</span>
                </Link>
                <span className={styles.slug}>/projects/{p.slug}</span>
              </span>

              <span className={styles.cellMeta}>{p.sector}</span>
              <span className={styles.cellMeta}>{p.year}</span>

              <span className={styles.cellStatus}>
                {p.status === "live" && (
                  <span className={`${styles.statusBadge} ${styles.statusLive}`}>
                    Live
                  </span>
                )}
                {p.status === "review" && (
                  <span
                    className={`${styles.statusBadge} ${styles.statusReview}`}
                  >
                    Review
                  </span>
                )}
                {p.status === "complete" && (
                  <span
                    className={`${styles.statusBadge} ${styles.statusComplete}`}
                  >
                    Complete
                  </span>
                )}
                {p.status === "ongoing" && (
                  <span
                    className={`${styles.statusBadge} ${styles.statusOngoing}`}
                  >
                    Ongoing
                  </span>
                )}
              </span>

              <span className={styles.cellFeatured}>
                {p.featured ? (
                  <span className={styles.dot} aria-label="Featured" />
                ) : (
                  <span className={styles.dotOff} aria-label="Not featured" />
                )}
              </span>

              <span className={styles.cellActions}>
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className={styles.editBtn}
                >
                  Edit
                </Link>
                <DeleteButton id={p.id} name={`${p.name}${p.nameEm}`} />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}