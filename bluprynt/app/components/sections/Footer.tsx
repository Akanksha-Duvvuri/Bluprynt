"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

/* Internal navigation links */
const QUICK_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/* External / contact links — REPLACE the values with your actual ones */
const CONTACT_LINKS = [
  {
    href: "tel:+16465861213",
    label: "+1 (646) 586 1213 (US line)",
    external: false,
    icon: "·",
  },
  {
    href: "mailto:vivek@blupryntconsulting.com",
    label: "vivek@blupryntconsulting.com",
    external: false,
    icon: "·",
  },
  {
    href: "https://www.linkedin.com/company/bluprynt-consulting-group/posts/?feedView=all",
    label: "LinkedIn",
    external: true,
    icon: "·",
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className={`${styles.footer} ${isHome ? styles.footerHome : ""}`}>
      <div className={styles.inner}>
        {/* ── Brand column ── */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brandLink}>
            <img
              src="/Logo.png"
              alt="Bluprynt"
              className={styles.brandLogo}
            />
          </Link>
          <p className={styles.tagline}>
            Engineering accuracy.
            <br />
            Consulting excellence.
          </p>
          <p className={styles.subTagline}>
            Pre-construction consulting from blueprint to brilliance.
          </p>
        </div>

        {/* ── Quick Links column ── */}
        <div className={styles.col}>
          <span className={styles.colLabel}>▸ Quick Links</span>
          <ul className={styles.list}>
            {QUICK_LINKS.map((link) => (
              <li key={link.href} className={styles.listItem}>
                <Link href={link.href} className={styles.link}>
                  <span className={styles.linkDot} aria-hidden>
                    ·
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Reach Out column ── */}
        <div className={styles.col}>
          <span className={styles.colLabel}>▸ Reach Out</span>
          <ul className={styles.list}>
            {CONTACT_LINKS.map((link) => (
              <li key={link.href} className={styles.listItem}>
                <a
                  href={link.href}
                  className={styles.link}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  <span className={styles.linkDot} aria-hidden>
                    {link.icon}
                  </span>
                  {link.label}
                  {link.external && (
                    <span className={styles.linkArrow} aria-hidden>
                      ↗
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className={styles.bottom}>
        <span className={styles.bottomItem}>
          © {new Date().getFullYear()} Bluprynt Consulting Group
        </span>
      </div>
    </footer>
  );
}