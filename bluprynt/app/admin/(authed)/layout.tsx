import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },     // never let admin pages be indexed
};

/**
 * ──────────────────────────────────────────────────────────────
 * AdminLayout — wraps every page under /admin.
 *
 * The middleware already protects these routes, but we ALSO
 * call auth() here as a defense-in-depth check — server-side,
 * unbypassable. If somehow an unauthenticated user got here,
 * this would still hide the content.
 *
 * The login page (/admin/login) is intentionally NOT inside this
 * layout — it has its own simpler page structure with no chrome.
 * ──────────────────────────────────────────────────────────────
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Defense in depth — middleware should already have redirected.
  // But if not, render nothing rather than leak admin chrome.
  if (!session?.user) return null;

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.brand}>
          <span className={styles.brandMark}></span>
          <span className={styles.brandName}>
             <span>Admin</span>
          </span>
        </Link>

        <nav className={styles.nav}>
          <div className={styles.navLabel}>▸ Content</div>
          <Link href="/admin" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/admin/projects" className={styles.navLink}>
            Projects
          </Link>
          <Link href="/admin/testimonials" className={styles.navLink}>
            Testimonials
          </Link>

          <div className={styles.navLabel} style={{ marginTop: 24 }}>
            ▸ Account
          </div>
          <div className={styles.signedAs}>
            <div className={styles.signedAsLabel}>Signed in as</div>
            <div className={styles.signedAsName}>{session.user.name}</div>
            <div className={styles.signedAsEmail}>{session.user.email}</div>
          </div>

          {/* Server action — calls signOut() and redirects to login */}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button type="submit" className={styles.signoutBtn}>
              Sign out →
            </button>
          </form>
        </nav>

        <div className={styles.footerNote}>
          <Link href="/" className={styles.publicLink}>
            ← Back to public site
          </Link>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}