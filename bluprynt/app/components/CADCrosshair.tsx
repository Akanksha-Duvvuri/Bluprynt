"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CADCrosshair.module.css";

/* ──────────────────────────────────────────────────────────────
   Maps section IDs to drawing sheet codes shown in the readout
   and status bar. Add new sections here as the site grows.
   ────────────────────────────────────────────────────────────── */
const SHEET_MAP: Record<string, string> = {
  hero: "A-001",
  work: "A-002",
  services: "A-003",
  about: "A-004",
  contact: "A-005",
};

function pad(n: number): string {
  const s = Math.abs(n).toFixed(2);
  return (n < 0 ? "-" : " ") + s.padStart(7, "0");
}

export default function Crosshair() {
  const [isTouch, setIsTouch] = useState(false);
  const [hidden, setHidden] = useState(false);
  const readXRef = useRef<HTMLSpanElement>(null);
  const readYRef = useRef<HTMLSpanElement>(null);
  const readZRef = useRef<HTMLSpanElement>(null);

useEffect(() => {
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (touch) {
    setIsTouch(true);
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let pendingFrame = false;
  let lastSheet = "A-001";

  // Read DOM refs once
  const crosshairEl = document.querySelector<HTMLElement>(`.${styles.crosshair}`);
  const readoutEl = document.querySelector<HTMLElement>(`.${styles.readout}`);

  const update = () => {
    pendingFrame = false;

    // Direct transform write — bypass CSS variable + recompute cycle.
    // This is the single biggest factor in cursor smoothness.
    if (crosshairEl) {
      crosshairEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
    if (readoutEl) {
      readoutEl.style.transform = `translate3d(${mouseX + 14}px, ${mouseY + 14}px, 0)`;
    }

    if (readXRef.current) {
      readXRef.current.textContent = pad(mouseX - window.innerWidth / 2);
    }
    if (readYRef.current) {
      readYRef.current.textContent = pad(window.innerHeight / 2 - mouseY);
    }

    // Sheet detection — runs on each frame but cheap
    const el = document.elementFromPoint(mouseX, mouseY);
    if (el) {
      const sheetEl = el.closest<HTMLElement>("[data-sheet]");
      if (sheetEl) {
        const code = sheetEl.dataset.sheet;
        if (code && code !== lastSheet) {
          lastSheet = code;
          if (readZRef.current) readZRef.current.textContent = `SHEET ${code}`;
          const indicator = document.getElementById("sheetIndicator");
          if (indicator) indicator.textContent = `SHEET ${code}`;
        }
      }
    }
  };

  const requestUpdate = () => {
    if (!pendingFrame) {
      pendingFrame = true;
      requestAnimationFrame(update);
    }
  };

  const onMove = (e: PointerEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    requestUpdate();
  };

  const onLeave = () => setHidden(true);
  const onEnter = () => setHidden(false);

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("scroll", requestUpdate, { passive: true });
  document.addEventListener("mouseleave", onLeave);
  document.addEventListener("mouseenter", onEnter);

  update();

  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("scroll", requestUpdate);
    document.removeEventListener("mouseleave", onLeave);
    document.removeEventListener("mouseenter", onEnter);
  };
}, []);

  if (isTouch) return null;

  return (
    <>
      <div
        className={`${styles.crosshair} ${hidden ? styles.hidden : ""}`}
        aria-hidden="true"
      >
        <div className={styles.h} />
        <div className={styles.v} />
        <div className={styles.pickbox} />
      </div>

      <div
        className={`${styles.readout} ${hidden ? styles.hidden : ""}`}
        aria-hidden="true"
      >
        <div>
          <span className={styles.k}>X</span>
          <span className={styles.v_text} ref={readXRef}>
            0000.00
          </span>
        </div>
        <div>
          <span className={styles.k}>Y</span>
          <span className={styles.v_text} ref={readYRef}>
            0000.00
          </span>
        </div>
        <div>
          <span className={styles.k}>Z</span>
          <span className={styles.v_text} ref={readZRef}>
            SHEET A-001
          </span>
        </div>
      </div>
    </>
  );
}