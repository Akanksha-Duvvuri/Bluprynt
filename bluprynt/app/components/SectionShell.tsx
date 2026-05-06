"use client";

import { type ReactNode, type CSSProperties, useCallback } from "react";
import { useSheetObserver } from "@/lib/cad/useSheetObserver";
import { useSpotlight } from "@/lib/cad/useSpotlight";
import styles from "./SectionShell.module.css";

type Props = {
  /** Sheet code, e.g. "A-002" */
  code: string;
  /** Label shown next to the code, e.g. "Foundation" */
  label: string;
  /** Background variant. Defaults to "deep" — darkest charcoal. */
  tone?: "deep" | "base" | "soft";
  /** When true, content spans full viewport width (under the BuildingDraft on desktop). */
  full?: boolean;
  /** Top eyebrow line shown in mono above the heading area. */
  eyebrow?: string;
  /** Optional id, used for in-page anchors. */
  id?: string;
  children: ReactNode;
};

export function SectionShell({
  code,
  label,
  tone = "deep",
  full = false,
  eyebrow,
  id,
  children,
}: Props) {
  const sheetRef = useSheetObserver<HTMLElement>(code);
  const spotlightRef = useSpotlight<HTMLElement>();

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      sheetRef.current = node;
      spotlightRef.current = node;
    },
    [sheetRef, spotlightRef],
  );

  const styleVar: CSSProperties = {
    background:
      tone === "soft"
        ? "var(--bg-soft, #1C1A14)"
        : tone === "base"
          ? "var(--bg-base, #15130D)"
          : "var(--bg-deep, #0D0C08)",
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