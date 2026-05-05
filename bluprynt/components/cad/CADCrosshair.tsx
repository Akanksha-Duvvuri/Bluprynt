"use client";

import { useEffect, useRef, useState } from "react";
import { useSheet } from "@/lib/cad/SheetProvider";
import { useReducedMotion } from "@/lib/cad/useReducedMotion";
import styles from "./CADCrosshair.module.css";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="expand"]';

export function CADCrosshair() {
  const { sheet } = useSheet();
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const initialized = useRef(false);
  const sheetRef = useRef(sheet);

  // keep latest sheet inside RAF without re-binding
  useEffect(() => { sheetRef.current = sheet; }, [sheet]);

  // Only enable on fine-pointer devices
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.dataset.crosshair = "active";
    return () => {
      document.body.removeAttribute("data-crosshair");
    };
  }, []);

  // Track mouse + interactive hover detection
  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!initialized.current) {
        current.current.x = e.clientX;
        current.current.y = e.clientY;
        initialized.current = true;
      }
      const el = e.target as HTMLElement | null;
      const isInteractive = !!(el && el.closest(INTERACTIVE_SELECTOR));
      setHovering((prev) => (prev === isInteractive ? prev : isInteractive));
    };

    const onLeave = () => {
      target.current.x = -100;
      target.current.y = -100;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  // Lerp loop — RAF, not transition, so the cursor stays perfectly responsive
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;

    const tick = () => {
      const lerp = reduced ? 1 : 0.18;
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;

      if (wrapRef.current) {
        wrapRef.current.style.transform =
          `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      if (labelRef.current) {
        const x = Math.max(0, current.current.x).toFixed(2).padStart(7, "0");
        const y = Math.max(0, current.current.y).toFixed(2).padStart(7, "0");
        labelRef.current.textContent = `X: ${x}   Y: ${y}   ${sheetRef.current}`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, reduced]);

  if (!enabled) return null;

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      <span className={`${styles.crosshair} ${hovering ? styles.expand : ""}`}>
        <span className={styles.armV} />
        <span className={styles.armH} />
        <span className={styles.pickbox} />
      </span>
      <span ref={labelRef} className={styles.label} />
    </div>
  );
}
