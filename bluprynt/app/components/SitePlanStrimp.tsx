"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SitePlanStrip.module.css";

/**
 * SitePlanStrip
 *
 * Tall vertical site plan anchored to the right edge of the page.
 * Each zone is tied to a SECTION on the homepage — when that section
 * scrolls into view, the corresponding zone draws on. Scrolling out
 * of view undraws it.
 *
 * Why section-based instead of total-page-progress: the user expects
 * elements to "pop in" as they reach them on screen, not based on how
 * far through the document they are.
 */

interface ZoneAnchor {
  /** id of a `.sheet` section already on the page */
  sectionId: string;
  /** which CSS class on the wrapper to set: --pN to a 0-1 value */
  cssVar: string;
}

const ZONES: ZoneAnchor[] = [
  { sectionId: "hero",     cssVar: "--p1" },
  { sectionId: "work",     cssVar: "--p2" },
  { sectionId: "services", cssVar: "--p3" },
  { sectionId: "about",    cssVar: "--p4" },
  { sectionId: "contact",  cssVar: "--p5" },
];

export default function SitePlanStrip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (touch) {
      setIsTouch(true);
      return;
    }

    let pendingFrame = false;

    const update = () => {
      pendingFrame = false;
      if (!wrapRef.current) return;

      const vh = window.innerHeight;

      // For each section, compute a 0..1 "how visible is this section"
      // value based on where its midpoint sits in the viewport.
      ZONES.forEach((zone) => {
        const el = document.getElementById(zone.sectionId);
        if (!el) return;

        const r = el.getBoundingClientRect();
        // Midpoint of section in viewport coords
        const midpoint = r.top + r.height / 2;

        // Map midpoint position to 0..1:
        //   midpoint at vh + vh*0.5 (well below)  → 0   (not yet drawn)
        //   midpoint at vh*0.5      (centered)    → 1   (fully drawn)
        //   midpoint at -vh*0.5     (above)       → 0   (undrawn again)
        //
        // We use a triangular curve that peaks when section is centered.
        // Distance from "centered" position, normalized by viewport height.
        const distFromCenter = Math.abs(midpoint - vh / 2) / vh;
        // Within 0.6 vh of center → drawing ramps up
        const p = Math.max(0, Math.min(1, 1 - distFromCenter / 0.7));

        wrapRef.current!.style.setProperty(zone.cssVar, p.toString());
      });
    };

    const requestUpdate = () => {
      if (!pendingFrame) {
        pendingFrame = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    update();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div className={styles.wrap} ref={wrapRef} aria-hidden="true">
      <svg
        viewBox="0 0 200 1100"
        preserveAspectRatio="xMidYMid meet"
        className={styles.svg}
      >
        {/* ── Z1 (Hero) — Title block ── */}
        <g className={styles.z1}>
          <rect
            x="20" y="40" width="160" height="80"
            fill="none" stroke="currentColor" strokeWidth="1.4"
            className={styles.path} pathLength={1}
          />
          <line x1="20" y1="68" x2="180" y2="68"
            stroke="currentColor" strokeWidth="0.8"
            className={styles.path} pathLength={1}
          />
          <line x1="20" y1="94" x2="180" y2="94"
            stroke="currentColor" strokeWidth="0.8"
            className={styles.path} pathLength={1}
          />
          <line x1="100" y1="68" x2="100" y2="120"
            stroke="currentColor" strokeWidth="0.8"
            className={styles.path} pathLength={1}
          />
          <text x="100" y="60" fontSize="11" textAnchor="middle"
            fill="currentColor" fontWeight="700" letterSpacing="2"
            className={styles.text}>
            BCG · SITE
          </text>
          <text x="60" y="84" fontSize="7" textAnchor="middle"
            fill="currentColor" opacity="0.6" letterSpacing="1.5"
            className={styles.text}>DRWG</text>
          <text x="140" y="84" fontSize="8" textAnchor="middle"
            fill="currentColor" fontWeight="700" letterSpacing="1"
            className={styles.text}>BCG-001</text>
          <text x="60" y="110" fontSize="7" textAnchor="middle"
            fill="currentColor" opacity="0.6" letterSpacing="1.5"
            className={styles.text}>REV</text>
          <text x="140" y="110" fontSize="8" textAnchor="middle"
            fill="currentColor" fontWeight="700" letterSpacing="1"
            className={styles.text}>04</text>
        </g>

        {/* ── Z2 (Work) — Plot boundary + corner ticks ── */}
        <g className={styles.z2}>
          <rect
            x="30" y="200" width="140" height="200"
            fill="none" stroke="currentColor" strokeWidth="1.6"
            className={styles.path} pathLength={1}
          />
          {/* corner ticks */}
          {[
            "M 20 200 L 40 200 M 30 190 L 30 210",
            "M 160 200 L 180 200 M 170 190 L 170 210",
            "M 20 400 L 40 400 M 30 390 L 30 410",
            "M 160 400 L 180 400 M 170 390 L 170 410",
          ].map((d, i) => (
            <path key={i} d={d}
              stroke="currentColor" strokeWidth="1" fill="none"
              className={styles.path} pathLength={1}
            />
          ))}
          <text x="100" y="194" fontSize="9" textAnchor="middle"
            fill="currentColor" fontWeight="700" letterSpacing="2"
            className={styles.text}>
            PLOT
          </text>

          {/* dimension callouts */}
          <line x1="30" y1="180" x2="170" y2="180"
            stroke="currentColor" strokeWidth="0.8"
            className={styles.path} pathLength={1}
          />
          <line x1="30" y1="174" x2="30" y2="186"
            stroke="currentColor" strokeWidth="0.8"
            className={styles.path} pathLength={1}
          />
          <line x1="170" y1="174" x2="170" y2="186"
            stroke="currentColor" strokeWidth="0.8"
            className={styles.path} pathLength={1}
          />
        </g>

        {/* ── Z3 (Services) — Building footprint + hatching ── */}
        <g className={styles.z3}>
          <rect
            x="58" y="240" width="84" height="120"
            fill="none" stroke="currentColor" strokeWidth="2"
            className={styles.path} pathLength={1}
          />
          {/* small inset wing */}
          <rect
            x="100" y="360" width="42" height="24"
            fill="none" stroke="currentColor" strokeWidth="1.4"
            className={styles.path} pathLength={1}
          />
          <text x="100" y="306" fontSize="11" textAnchor="middle"
            fill="currentColor" fontWeight="700" letterSpacing="2"
            className={styles.text}>
            BLDG
          </text>

          {/* hatching */}
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 58 + i * 14;
            return (
              <line
                key={i}
                x1={x - 60} y1={240 + 60}
                x2={x + 60} y2={240 - 60}
                stroke="currentColor" strokeWidth="0.5" opacity="0.45"
                className={styles.path} pathLength={1}
              />
            );
          })}
        </g>

        {/* ── Z4 (About) — North arrow + scale bar ── */}
        <g className={styles.z4}>
          <circle cx="100" cy="500" r="26"
            fill="none" stroke="currentColor" strokeWidth="1.4"
            className={styles.path} pathLength={1}
          />
          <path d="M 100 480 L 92 518 L 100 510 L 108 518 Z"
            fill="currentColor" stroke="currentColor" strokeWidth="0.8"
            className={styles.path} pathLength={1}
          />
          <text x="100" y="478" fontSize="11" textAnchor="middle"
            fill="currentColor" fontWeight="700"
            className={styles.text}>
            N
          </text>

          {/* scale bar */}
          <rect x="20" y="560" width="40" height="6"
            fill="currentColor" stroke="currentColor" strokeWidth="0.6"
            className={styles.path} pathLength={1}
          />
          <rect x="60" y="560" width="40" height="6"
            fill="none" stroke="currentColor" strokeWidth="0.6"
            className={styles.path} pathLength={1}
          />
          <rect x="100" y="560" width="40" height="6"
            fill="currentColor" stroke="currentColor" strokeWidth="0.6"
            className={styles.path} pathLength={1}
          />
          <rect x="140" y="560" width="40" height="6"
            fill="none" stroke="currentColor" strokeWidth="0.6"
            className={styles.path} pathLength={1}
          />
          <text x="20" y="582" fontSize="8"
            fill="currentColor" letterSpacing="1"
            className={styles.text}>0</text>
          <text x="180" y="582" fontSize="8" textAnchor="end"
            fill="currentColor" letterSpacing="1"
            className={styles.text}>40m</text>
          <text x="100" y="552" fontSize="8" textAnchor="middle"
            fill="currentColor" opacity="0.6" letterSpacing="1.5"
            className={styles.text}>
            SCALE 1 : 200
          </text>
        </g>

        {/* ── Z5 (Contact) — Approved stamp ── */}
        <g className={styles.z5}>
          <g transform="rotate(-6 100 660)">
            <rect
              x="20" y="635" width="160" height="56"
              fill="none" stroke="currentColor" strokeWidth="1.6"
              className={styles.path} pathLength={1}
            />
            <text x="100" y="660" fontSize="11" textAnchor="middle"
              fill="currentColor" fontWeight="700" letterSpacing="3"
              className={styles.text}>
              APPROVED
            </text>
            <text x="100" y="680" fontSize="8" textAnchor="middle"
              fill="currentColor" opacity="0.7" letterSpacing="2"
              className={styles.text}>
              FOR ISSUE
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}