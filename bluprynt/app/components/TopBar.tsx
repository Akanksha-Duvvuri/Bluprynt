"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./TopBar.module.css";

interface NavItem {
  href: string;
  label: string;
  /** Match heuristic — used to determine the active state */
  match: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Home",
    match: (p) => p === "/",
  },
  {
    href: "/projects",
    label: "Work",
    match: (p) => p.startsWith("/projects"),
  },
  {
    href: "/services",
    label: "Services",
    match: (p) => p.startsWith("/services"),
  },
  {
    href: "/about",
    label: "About",
    match: (p) => p.startsWith("/about"),
  },
  {
    href: "/contact",
    label: "Contact",
    match: (p) => p.startsWith("/contact"),
  },
];

export default function TopBar() {
  const pathname = usePathname();
  const [scrolledHomeSection, setScrolledHomeSection] = useState<string>("hero");

  // On the homepage, use IntersectionObserver to track which section is in view
  // and override the active tab accordingly.
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionMap: Record<string, string> = {
      hero: "/",
      work: "/projects",
      services: "/services",
      about: "/about",
      contact: "/contact",
    };

    const sections = Object.keys(sectionMap)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScrolledHomeSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Compute which nav item is active.
  // On homepage, use the in-view section. Elsewhere, use pathname matching.
  const isActive = (item: NavItem): boolean => {
    if (pathname === "/") {
      const homeMap: Record<string, string> = {
        hero: "/",
        work: "/projects",
        services: "/services",
        about: "/about",
        contact: "/contact",
      };
      return item.href === homeMap[scrolledHomeSection];
    }
    return item.match(pathname);
  };

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
            key={item.href}
            href={item.href}
            className={`${styles.tab} ${isActive(item) ? styles.active : ""}`}
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