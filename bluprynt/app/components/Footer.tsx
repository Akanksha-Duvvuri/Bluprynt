import Link from "next/link";
import styles from "./Footer.module.css";

interface FooterLink {
  href: string;
  label: string;
}

const SITE_LINKS: FooterLink[] = [
  { href: "/#hero", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS: FooterLink[] = [
  { href: "/services#structural", label: "Structural Assessment" },
  { href: "/services#feasibility", label: "Feasibility Studies" },
  { href: "/services#advisory", label: "Project Advisory" },
  { href: "/services#diligence", label: "Due Diligence" },
];

const CONTACT_LINKS: FooterLink[] = [
  { href: "mailto:hello@bluprynt.com", label: "hello@bluprynt.com" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brand}>
            Bluprynt<span className={styles.em}>.</span>
          </div>
          <div className={styles.tagline}>
            Engineering accuracy. Consulting excellence. From blueprint to
            brilliance.
          </div>
          <Link href="/contact" className={styles.cta}>
            Get in touch →
          </Link>
        </div>

        <div>
          <div className={styles.colTitle}>Site</div>
          <ul className={styles.linkList}>
            {SITE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Services</div>
          <ul className={styles.linkList}>
            {SERVICE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Contact</div>
          <ul className={styles.linkList}>
            {CONTACT_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div>
          © <span className={styles.gold}>{year}</span> · Bluprynt Consulting
          Group · All drawings and content property of BCG
        </div>
        <div>
          Drwg <span className={styles.gold}>BCG-001 · Rev. 04</span>
        </div>
      </div>
    </footer>
  );
}