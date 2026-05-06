"use client";

import { useEffect, useRef } from "react";
import { useScrollProgress } from "@/lib/cad/useScrollProgress";
import styles from "./BuildingDraft.module.css";

/**
 * 3D scroll-driven building.
 *
 * How it works:
 * 1. `useScrollProgress` returns a number 0..1 representing how far down the
 *    page the user has scrolled. We write that number into `--p` on the wrap
 *    element on every animation frame.
 * 2. The CSS reads `--p` from anywhere in this subtree (custom properties
 *    inherit) and uses it for two things:
 *      a) rotating the scene: `rotateY(calc(var(--p) * 360deg))` — one full
 *         revolution as you scroll the page.
 *      b) revealing each floor: each box has a `--reveal` threshold; when
 *         `--p` crosses it, the box's `opacity` goes 0→1 and its
 *         `transform: translateY(...)` settles down from above.
 * 3. Each box is composed of 5 absolutely-positioned `.face` divs (4 walls
 *    plus a top). The faces are transformed out from the box's center via
 *    `translateZ` so they form a cuboid in 3D space. The parent (scene) has
 *    `transform-style: preserve-3d` so the rotation applies cohesively.
 *
 * No animation library, no requestAnimationFrame loop beyond the scroll
 * listener — the GPU handles all the transitions.
 */

const FLOOR_COUNT = 7;
const FOUNDATION_REVEAL = 0; // always visible
const FLOOR_REVEAL_BASE = 0.10; // first floor appears at 10% scroll
const FLOOR_REVEAL_GAP = 0.10; // each floor 10% later
const ROOF_REVEAL = 0.82;
const ANTENNA_REVEAL = 0.92;

export function BuildingDraft() {
  const progress = useScrollProgress();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Write scroll progress into --p on the wrap element every frame.
  // Custom property inherits through the whole 3D scene, so all the calc()s
  // downstream pick it up automatically.
  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.setProperty("--p", String(progress));
    }
  }, [progress]);

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      <Stamp />

      <div className={styles.stage}>
        <div className={styles.scene}>
          {/* Ground plane sitting flat under the building */}
          <div className={styles.ground} />

          {/* Foundation: always visible from p=0 */}
          <Box variant="foundation" reveal={FOUNDATION_REVEAL} index={-1} />

          {/* Stack of floors */}
          {Array.from({ length: FLOOR_COUNT }, (_, i) => (
            <Box
              key={i}
              variant="floor"
              index={i}
              reveal={FLOOR_REVEAL_BASE + i * FLOOR_REVEAL_GAP}
            />
          ))}

          {/* Roof box */}
          <Box variant="roof" reveal={ROOF_REVEAL} index={FLOOR_COUNT} />

          {/* Antenna spire (4 faces, no top — it's tiny enough not to matter) */}
          <Antenna reveal={ANTENNA_REVEAL} />
        </div>
      </div>

      <ProgressReadout floorCount={FLOOR_COUNT} />
    </div>
  );
}

/* ---------- Box: 5-faced cuboid (4 walls + top) ---------- */

type BoxVariant = "foundation" | "floor" | "roof";

function Box({
  variant,
  index,
  reveal,
}: {
  variant: BoxVariant;
  index: number;
  reveal: number;
}) {
  const cls = `${styles.box} ${styles[variant]}`;
  // CSS custom properties as inline style — React supports this if cast.
  const cssVars = {
    "--reveal": reveal,
    "--i": index,
  } as React.CSSProperties;

  return (
    <div className={cls} style={cssVars}>
      <div className={`${styles.face} ${styles.faceFront}`} />
      <div className={`${styles.face} ${styles.faceBack}`} />
      <div className={`${styles.face} ${styles.faceRight}`} />
      <div className={`${styles.face} ${styles.faceLeft}`} />
      <div className={`${styles.face} ${styles.faceTop}`} />
    </div>
  );
}

function Antenna({ reveal }: { reveal: number }) {
  const cssVars = { "--reveal": reveal } as React.CSSProperties;
  return (
    <div className={`${styles.box} ${styles.antenna}`} style={cssVars}>
      <div className={`${styles.face} ${styles.faceFront}`} />
      <div className={`${styles.face} ${styles.faceBack}`} />
      <div className={`${styles.face} ${styles.faceRight}`} />
      <div className={`${styles.face} ${styles.faceLeft}`} />
    </div>
  );
}

/* ---------- Stamp + progress readout ---------- */

function Stamp() {
  return (
    <div className={styles.stamp}>
      <div className={styles.stampRow}>
        <span className={styles.stampK}>SHEET</span>
        <span className={styles.stampV}>A-001 → A-006</span>
      </div>
      <div className={styles.stampRow}>
        <span className={styles.stampK}>SCALE</span>
        <span className={styles.stampV}>1 : 100</span>
      </div>
      <div className={styles.stampRow}>
        <span className={styles.stampK}>PROG.</span>
        <span className={styles.stampV} data-prog>
          00%
        </span>
      </div>
    </div>
  );
}

function ProgressReadout({ floorCount }: { floorCount: number }) {
  const progress = useScrollProgress();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const pct = Math.round(progress * 100);

    // Compute the floor count: foundation (1) + floors crossed.
    const floorsRevealed = Math.min(
      floorCount,
      Math.max(
        0,
        Math.floor((progress - FLOOR_REVEAL_BASE) / FLOOR_REVEAL_GAP) + 1,
      ),
    );

    const stage =
      progress < FLOOR_REVEAL_BASE
        ? "FOUNDATION"
        : progress >= ROOF_REVEAL
          ? "ROOF · COMPLETE"
          : `FL ${String(floorsRevealed).padStart(2, "0")} / ${String(floorCount).padStart(2, "0")}`;

    ref.current.querySelector("[data-pct]")!.textContent =
      `${String(pct).padStart(3, "0")}%`;
    ref.current.querySelector("[data-stage]")!.textContent = stage;

    // Also mirror percentage to the top-left stamp
    const stampProg = document.querySelector("[data-prog]");
    if (stampProg) stampProg.textContent = `${String(pct).padStart(2, "0")}%`;
  }, [progress, floorCount]);

  return (
    <div ref={ref} className={styles.readout}>
      <span className={styles.readoutK}>STAGE</span>
      <span className={styles.readoutV} data-stage>
        FOUNDATION
      </span>
      <span className={styles.readoutSep}>·</span>
      <span className={styles.readoutK}>PROG</span>
      <span className={styles.readoutV} data-pct>
        000%
      </span>
    </div>
  );
}