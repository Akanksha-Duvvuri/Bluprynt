"use client";

import { useEffect, useRef, useState } from "react";

interface SectionDividerProps {
  /** From-section sheet code, e.g. "A-001" */
  from: string;
  /** To-section sheet code, e.g. "A-002" */
  to: string;
  /** Optional dimension callout on the right (purely visual) */
  dim?: string;
}

/**
 * SectionDivider
 *
 * Renders a thin horizontal "drafting line" between two sections. Uses
 * IntersectionObserver to add an `.in-view` class once the divider crosses
 * into the viewport — that triggers a CSS stroke-dashoffset transition,
 * making the line "draw" from left to right.
 *
 * Purely decorative; no scroll-driven scrubbing. The line draws once when
 * you first see it, stays drawn afterwards. Lighter on perf than the
 * scroll-tied building animation that's coming next.
 *
 * Hidden on mobile — see globals.css media query.
 */
export default function SectionDivider({ from, to, dim }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect(); // one-shot — draw once, stay drawn
            return;
          }
        }
      },
      { rootMargin: "-30px 0px -30px 0px" }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Default dim callout — random-ish but stable per render
  const dimText = dim ?? `+${Math.floor(Math.random() * 900) + 100}`;

  return (
    <div
      ref={ref}
      className={`section-divider ${inView ? "in-view" : ""}`}
      aria-hidden="true"
    >
      <span className="label">▸ Transition · {from} → {to}</span>
      <svg
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          className="draw-line"
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          strokeDasharray="4 3"
          pathLength={1}
        />
      </svg>
      <span className="dim">{dimText}</span>
    </div>
  );
}
