"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSheet } from "@/lib/cad/SheetProvider";
import styles from "./CADNavbar.module.css";

/**
 * Top navbar with section-aware highlighting.
 *
 * The "Contact" link now points to the homepage anchor /#contact instead
 * of a separate /contact page. Clicking it from any sub-page navigates
 * back to the homepage and scrolls to the contact section.
 */

const NAV_ITEMS: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const SHEET_FOR_HREF: Record<string, string> = {
  "/": "A-001",
  "/work": "A-002",
  "/services": "A-003",
  "/Testimonials": "A-004",
  "/about": "A-005",
  "/#contact": "A-006",
};

export function CADNavbar() {
  const pathname = usePathname();
  const sheet = useSheet() as unknown as string | { code?: string } | null;
const currentSheet =
  (typeof sheet === "string" ? sheet : sheet?.code) ?? "A-001";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const isHomepage = pathname === "/";

  // On homepage: match by current sheet (scroll-driven).
  // On sub-page: match by pathname.
  // Note: /#contact only highlights when on homepage scrolled to A-006.
  const isActive = (href: string) => {
    if (isHomepage) return SHEET_FOR_HREF[href] === currentSheet;
    return pathname === href;
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          BLUPRYNT
          <span className={styles.brandSub}>· CONSULTING</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${
                    isActive(item.href) ? styles.active : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={styles.hamburger}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.drawer}>
          <div className={styles.drawerHead}>
            <span className={styles.drawerTag}>LAYERS · NAV</span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
            >
              ×
            </button>
          </div>
          <ul className={styles.drawerList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.drawerLink} ${
                    isActive(item.href) ? styles.drawerActive : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.drawerDot} />
                  <span>{item.label}</span>
                  <span className={styles.drawerCode}>
                    {SHEET_FOR_HREF[item.href]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}