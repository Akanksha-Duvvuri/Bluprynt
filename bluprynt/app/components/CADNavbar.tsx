"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSheet } from "@/lib/cad/SheetProvider";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import styles from "./CADNavbar.module.css";



const NAV = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "testimonials" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function CADNavbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const moveTo = useCallback(
    (href: string | null) => {
      if (!navRef.current) return;
      const target = href ? itemRefs.current.get(href) : null;
      if (!target) {
        setUnderline((u) => ({ ...u, opacity: 0 }));
        return;
      }
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = target.getBoundingClientRect();
      setUnderline({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    },
    [],
  );

  // Move underline to active route on mount + route change
  useLayoutEffect(() => {
    moveTo(pathname);
  }, [pathname, moveTo]);

  // Reposition on resize (font-load, breakpoint changes)
  useEffect(() => {
    const onResize = () => moveTo(pathname);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, moveTo]);

  // Scrolled state — passive listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [drawerOpen]);

  return (
    <>
      <header className={`${styles.bar} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/" className={styles.logo} aria-label="Bluprynt — Home">
          <span className={styles.logo}>
            <img src="Logo.png"></img>
          </span>
        </Link>

        <nav
          ref={navRef}
          className={styles.nav}
          aria-label="Primary"
          onMouseLeave={() => moveTo(pathname)}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                if (el) itemRefs.current.set(item.href, el);
                else itemRefs.current.delete(item.href);
              }}
              className={`${styles.navItem} ${
                pathname === item.href ? styles.navItemActive : ""
              }`}
              onMouseEnter={() => moveTo(item.href)}
              onFocus={() => moveTo(item.href)}
            >
              {item.label}
            </Link>
          ))}
          <span
            className={styles.underline}
            aria-hidden="true"
            style={{
              transform: `translateX(${underline.left}px)`,
              width: `${underline.width}px`,
              opacity: underline.opacity,
            }}
          />
        </nav>

        <Link href="/contact" className={styles.cta}>
          Start a project →
        </Link>

        <button
          type="button"
          className={styles.hamburger}
          aria-expanded={drawerOpen}
          aria-controls="cad-drawer"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          onClick={() => setDrawerOpen((v) => !v)}
        >
          <span className={drawerOpen ? styles.hamX1 : ""} />
          <span className={drawerOpen ? styles.hamX2 : ""} />
          <span className={drawerOpen ? styles.hamX3 : ""} />
        </button>
      </header>

      <aside
        id="cad-drawer"
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!drawerOpen}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerHeaderCode}>LAYER PANEL</span>
          <span className={styles.drawerHeaderRev}>REV 01</span>
        </div>

        {NAV.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.drawerItem} ${
              pathname === item.href ? styles.drawerItemActive : ""
            }`}
            onClick={() => setDrawerOpen(false)}
          >
            <span className={styles.drawerItemIndex}>
              {String(i).padStart(2, "0")}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}

        <Link
          href="/contact"
          className={styles.drawerCta}
          onClick={() => setDrawerOpen(false)}
        >
          Start a project →
        </Link>
      </aside>

      {drawerOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className={styles.drawerScrim}
          onClick={() => setDrawerOpen(false)}
        />
      ) : null}
    </>
  );
}
