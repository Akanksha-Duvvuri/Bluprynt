"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import styles from "./layout.module.css";

interface AdminLayoutClientProps {
  userName: string | null;
  userEmail: string | null;
  children: React.ReactNode;
}

export default function AdminLayoutClient({
  userName,
  userEmail,
  children,
}: AdminLayoutClientProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <header className={styles.mobileBar}>
        <Link href="/admin" className={styles.mobileBrand}>
          <img src="/Logo.png" alt="Bluprynt" />
        </Link>
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
        >
          {drawerOpen ? "✕" : "☰"}
        </button>
      </header>

      <button
        type="button"
        className={`${styles.backdrop} ${drawerOpen ? styles.open : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
        tabIndex={-1}
      />

      <aside className={`${styles.sidebar} ${drawerOpen ? styles.open : ""}`}>
        <Link
          href="/admin"
          className={styles.brand}
          onClick={() => setDrawerOpen(false)}
        >
          <img src="/Logo.png" alt="Bluprynt" />
          <span className={styles.brandName}>
            <span>Admin</span>
          </span>
        </Link>

        <nav className={styles.nav}>
          <div className={styles.navLabel}>▸ Content</div>
          <Link
            href="/admin"
            className={styles.navLink}
            onClick={() => setDrawerOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className={styles.navLink}
            onClick={() => setDrawerOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/admin/testimonials"
            className={styles.navLink}
            onClick={() => setDrawerOpen(false)}
          >
            Testimonials
          </Link>

          <div className={styles.navLabel} style={{ marginTop: 24 }}>
            ▸ Account
          </div>

          <div className={styles.signedAs}>
            <div className={styles.signedAsLabel}>Signed in as</div>
            <div className={styles.signedAsName}>{userName ?? "Admin"}</div>
            <div className={styles.signedAsEmail}>{userEmail ?? ""}</div>
          </div>

          <button
            type="button"
            className={styles.signoutBtn}
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            Sign out →
          </button>
        </nav>

        <div className={styles.footerNote}>
          <Link
            href="/"
            className={styles.publicLink}
            onClick={() => setDrawerOpen(false)}
          >
            ← Back to public site
          </Link>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}