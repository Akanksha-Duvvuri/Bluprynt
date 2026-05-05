"use client";

import {
  type ReactNode,
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useSheetObserver } from "@/lib/cad/useSheetObserver";
import styles from "./SectionShell.module.css";

type Props = {
  /** Sheet code, e.g. "A-002" */
  code: string;
  /** Label that appears next to the code, e.g. "Foundation" */
  label: string;
  /** Background variant. Defaults to "base". */
  tone?: "deep" | "base" | "soft";
  /** When true, content spans the full viewport width (under the BuildingDraft on desktop). */
  full?: boolean;
  /** Top eyebrow line shown in mono above the heading area. */
  eyebrow?: string;
  /** Optional id, used for in-page anchors. */
  id?: string;
  children: ReactNode;
};

/**
 * Standard section frame. Provides:
 *   – sheet code + label in the top-left, mono
 *   – four corner registration ticks
 *   – cursor-tracking spotlight via CSS custom props on the section
 *   – consistent padding and max-content width
 *   – sheet observer wired to the sheet code (drives status bar / crosshair)
 */
export function SectionShell({
  code,
  label,
  tone = "base",
  full = false,
  eyebrow,
  id,
  children,
}: Props) {
  const sheetRef = useSheetObserver<HTMLElement>(code);
  const innerRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef(0);
  const queuedRef = useRef(false);
  const lastEvent = useRef<{ x: number; y: number } | null>(null);

  // Combine refs (sheet observer + spotlight target)
  const setRef = useCallback(
    (node: HTMLElement | null) => {
      innerRef.current = node;
      sheetRef.current = node;
    },
    [sheetRef],
  );

  // Spotlight: update CSS custom props on the section based on cursor position.
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const flush = () => {
      rafRef.current = 0;
      queuedRef.current = false;
      const evt = lastEvent.current;
      if (!evt) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${evt.x - rect.left}px`);
      el.style.setProperty("--my", `${evt.y - rect.top}px`);
    };

    const onMove = (e: MouseEvent) => {
      lastEvent.current = { x: e.clientX, y: e.clientY };
      if (queuedRef.current) return;
      queuedRef.current = true;
      rafRef.current = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      el.style.setProperty("--mx", `-9999px`);
      el.style.setProperty("--my", `-9999px`);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const styleVar: CSSProperties = {
    background:
      tone === "deep"
        ? "var(--bg-deep)"
        : tone === "soft"
          ? "var(--bg-soft)"
          : "var(--bg-base)",
  };

  return (
    <section
      ref={setRef}
      id={id}
      className={`${styles.section} ${full ? styles.full : ""}`}
      style={styleVar}
      data-sheet={code}
    >
      <span className={`${styles.tick} ${styles.tickTL}`} aria-hidden="true" />
      <span className={`${styles.tick} ${styles.tickTR}`} aria-hidden="true" />
      <span className={`${styles.tick} ${styles.tickBL}`} aria-hidden="true" />
      <span className={`${styles.tick} ${styles.tickBR}`} aria-hidden="true" />

      <div className={styles.spotlight} aria-hidden="true" />

      <div className={styles.head}>
        <div className={styles.codeBlock}>
          <span className={styles.code}>{code}</span>
          <span className={styles.codeSep}>·</span>
          <span className={styles.codeLabel}>{label}</span>
        </div>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      </div>

      <div className={styles.content}>{children}</div>
    </section>
  );
}
