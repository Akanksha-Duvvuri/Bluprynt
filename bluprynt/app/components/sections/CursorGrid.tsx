"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorGrid.module.css";

/**
 * Cursor-illuminated grid background.
 *
 * Renders as a fixed, viewport-wide layer behind page content. Tracks the
 * pointer and writes its position to two CSS custom properties (`--mx` /
 * `--my`) on the element itself. The CSS uses those vars in a radial mask
 * so the grid only shows where the cursor is hovering.
 *
 * Self-contained: no hook dependency. RAF-throttled so it stays smooth.
 *
 * Mounted by PageShell so every sub-page (work, services, founders, about,
 * contact, and the [slug] detail pages) gets it automatically.
 */
export function CursorGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Element is position:fixed inset:0, so clientX/Y maps directly.
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className={styles.grid} aria-hidden="true" />;
}