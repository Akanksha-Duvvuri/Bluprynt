import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { db, projects, testimonials } from "@/db";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Dashboard",
};

/**
 * Admin dashboard — placeholder for Phase 2.
 * Phase 3 will replace this with project/testimonial counts plus
 * recent-activity feed. For now: a welcome card and quick stats.
 */
export default async function AdminDashboard() {
  const session = await auth();
  // Layout already guards against missing session; safe to assume here.
  const user = session!.user!;

  // Quick counts for the dashboard cards
  const allProjects = await db.select().from(projects);
  const allTestimonials = await db.select().from(testimonials);

  const featuredProjects = allProjects.filter((p) => p.featured).length;
  const featuredTestimonials = allTestimonials.filter((t) => t.featured).length;

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.label}>▸ A-006 · Admin Dashboard</div>
        <h1 className={styles.title}>
          Welcome back,
          <br />
          <span className={styles.em}>{user.name?.split(" ")[0] ?? "Admin"}</span>.
        </h1>
        <p className={styles.subtitle}>
          The admin panel is live. CRUD interfaces for projects and testimonials
          land in Phase 3 — for now, this page just confirms auth is working.
        </p>
      </header>

      <div className={styles.statGrid}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Projects</div>
          <div className={styles.statNum}>{allProjects.length}</div>
          <div className={styles.statSub}>
            {featuredProjects} featured on homepage
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statLabel}>Testimonials</div>
          <div className={styles.statNum}>{allTestimonials.length}</div>
          <div className={styles.statSub}>
            {featuredTestimonials} featured on homepage
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statLabel}>Auth status</div>
          <div className={styles.statNum} style={{ color: "var(--mint)" }}>
            ✓
          </div>
          <div className={styles.statSub}>Session active</div>
        </div>
      </div>

      <section className={styles.next}>
        <div className={styles.nextLabel}>▸ Next up — Phase 3</div>
        <div className={styles.nextList}>
          <div className={styles.nextItem}>
            <span className={styles.nextItemNum}>01</span>
            <div className={styles.nextItemBody}>
              <div className={styles.nextItemTitle}>Projects CRUD</div>
              <div className={styles.nextItemDesc}>
                Create, edit, delete projects from the admin panel.
              </div>
            </div>
          </div>
          <div className={styles.nextItem}>
            <span className={styles.nextItemNum}>02</span>
            <div className={styles.nextItemBody}>
              <div className={styles.nextItemTitle}>Testimonials CRUD</div>
              <div className={styles.nextItemDesc}>
                Add and manage client testimonials.
              </div>
            </div>
          </div>
          <div className={styles.nextItem}>
            <span className={styles.nextItemNum}>03</span>
            <div className={styles.nextItemBody}>
              <div className={styles.nextItemTitle}>Homepage testimonials section</div>
              <div className={styles.nextItemDesc}>
                Featured testimonials surface automatically.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tempLink}>
        <span className={styles.tempLinkLabel}>
          Temporary: until Phase 3 ships, edit content via Drizzle Studio →
        </span>
        <code className={styles.tempLinkCode}>npm run db:studio</code>
      </div>
    </div>
  );
}