"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./TopBar.module.css";

interface NavItem {
  href: string;
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/#hero", label: "Home", id: "hero" },
  { href: "/#work", label: "Work", id: "work" },
  { href: "/#services", label: "Services", id: "services" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export default function TopBar() {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    // IntersectionObserver — track which section is dominant in viewport
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.topbar}>
      <Link href="/" className={styles.brand}>
        <div className={styles.mark} aria-hidden="true">
          B
        </div>
        <div className={styles.name}>
          Bluprynt <span>Consulting Group</span>
        </div>
      </Link>

      <nav className={styles.tabs} aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`${styles.tab} ${activeId === item.id ? styles.active : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.right}>
        <div className={styles.pill}>Rev. 04</div>
        <div className={`${styles.pill} ${styles.live}`}>Live</div>
      </div>
    </header>
  );
}