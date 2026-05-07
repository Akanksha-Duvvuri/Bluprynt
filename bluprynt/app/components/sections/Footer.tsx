"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

// /founders removed (no per-founder pages, no founders index — they live on /about)
// /contact → /#contact (no separate contact page)
const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <footer
      className={`${styles.footer} ${isHomepage ? styles.onHome : ""}`}
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.brandName}>BLUPRYNT</span>
            <span className={styles.brandSub}>· CONSULTING GROUP</span>
          </div>

          <nav aria-label="Footer">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {new Date().getFullYear()} Bluprynt Consulting Group.
            All rights reserved.
          </span>
          <span className={styles.stamp}>
            <span className={styles.stampK}>SHEET</span>
            <span className={styles.stampV}>A-099 / FOOTER</span>
            <span className={styles.stampSep}>·</span>
            <span className={styles.stampK}>REV</span>
            <span className={styles.stampV}>01</span>
          </span>
        </div>
      </div>
    </footer>
  );
}