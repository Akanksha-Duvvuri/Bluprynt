"use client";

import { useEffect, useState } from "react";
import { useSheet } from "@/lib/cad/SheetProvider";
import styles from "./CADStatusBar.module.css";

export function CADStatusBar() {
  const { sheet } = useSheet();
  const [snap, setSnap] = useState(0);

  // Decorative snap counter — ticks as the cursor moves through grid points
  useEffect(() => {
    let raf = 0;
    let queued = false;
    let lastE = { x: 0, y: 0 };

    const flush = () => {
      raf = 0;
      queued = false;
      const next = Math.abs(Math.floor((lastE.x + lastE.y) / 64)) % 100;
      setSnap((prev) => (prev === next ? prev : next));
    };

    const onMove = (e: MouseEvent) => {
      lastE = { x: e.clientX, y: e.clientY };
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(flush);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <footer className={styles.bar} role="status" aria-live="off">
      <span className={styles.field}>
        <span className={styles.k}>Layer:</span> 0-Base
      </span>
      <span className={styles.field}>
        <span className={styles.k}>Snap:</span> {String(snap).padStart(2, "0")}
      </span>
      <span className={styles.field}>
        <span className={styles.k}>Grid:</span> ON
      </span>
      <span className={styles.field}>
        <span className={styles.k}>Sheet:</span> {sheet}
      </span>
      <span className={styles.field}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.k}>Status:</span> Live
      </span>
      <span className={`${styles.field} ${styles.fieldEnd}`}>
        <span className={styles.k}>Rev:</span> 01
      </span>
    </footer>
  );
}
