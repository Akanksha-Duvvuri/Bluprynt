"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SectionDivider.module.css";

type Props = {
  fromCode?: string;
  toCode?: string;
  dimension?: string;
};

/**
 * Horizontal dashed line between two sections. Animates in once when the
 * divider hits 50% in viewport. Idempotent — never re-animates.
 *
 *   <SectionDivider fromCode="A-001" toCode="A-002" dimension="+1280" />
 */
export function SectionDivider({
  fromCode = "A-001",
  toCode = "A-002",
  dimension = "+1280",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.wrap} ${drawn ? styles.drawn : ""}`}
      aria-hidden="true"
    >
      <span className={styles.left}>
        ▸ Transition · {fromCode} → {toCode}
      </span>
      <span className={styles.line} />
      <span className={styles.right}>{dimension}</span>
    </div>
  );
}
