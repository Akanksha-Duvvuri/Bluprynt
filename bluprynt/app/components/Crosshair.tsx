"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Crosshair.module.css";

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
    // Detect touch — bail entirely if not a hover device
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (touch) {
      setIsTouch(true);
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let pendingFrame = false;
    let lastSheet = "A-001";

    const root = document.documentElement;

    const update = () => {
      pendingFrame = false;

      // crosshair + readout follow pointer
      root.style.setProperty("--mx", `${mouseX}px`);
      root.style.setProperty("--my", `${mouseY}px`);

      // CAD-style coordinate readout — origin is screen center
      if (readXRef.current) {
        readXRef.current.textContent = pad(mouseX - window.innerWidth / 2);
      }
      if (readYRef.current) {
        readYRef.current.textContent = pad(window.innerHeight / 2 - mouseY);
      }

      // detect which sheet the cursor is over → update Z readout + status bar
      const el = document.elementFromPoint(mouseX, mouseY);
      if (el) {
        const sheetEl = el.closest<HTMLElement>(".sheet");
        if (sheetEl?.id && SHEET_MAP[sheetEl.id]) {
          const code = SHEET_MAP[sheetEl.id];
          if (code !== lastSheet) {
            lastSheet = code;
            if (readZRef.current) readZRef.current.textContent = `SHEET ${code}`;
            const indicator = document.getElementById("sheetIndicator");
            if (indicator) indicator.textContent = `SHEET ${code}`;
          }
        }
      }

      // update each sheet's local spotlight position (relative to the sheet)
      document.querySelectorAll<HTMLElement>(".sheet").forEach((sec) => {
        const r = sec.getBoundingClientRect();
        const lx = mouseX - r.left;
        const ly = mouseY - r.top;
        // skip sheets nowhere near the cursor — saves work on tall pages
        if (ly > -400 && ly < r.height + 400) {
          sec.style.setProperty("--mx-local", `${lx}px`);
          sec.style.setProperty("--my-local", `${ly}px`);
        }
      });
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