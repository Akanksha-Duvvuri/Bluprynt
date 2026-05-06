"use client";

import { useEffect, useRef } from "react";
import { useScrollProgress } from "@/lib/cad/useScrollProgress";
import styles from "./BuildingDraft.module.css";

/**
 * 3D scroll-driven building.
 *
 * Single input drives everything: `--p` = scroll progress (0..1).
 *   - rotates the scene 360° (rotateY(--p * 360deg))
 *   - reveals foundation, floors, roof, logo at thresholds
 *   - flips the APPROVED stamp on once it crosses the threshold
 *
 * Brand integration: the logo glyph (the Bluprynt roof+chimney mark from
 * the favicon) is the topmost element. As the building "completes," the
 * logo settles onto its peak — building literally crowned by the brand.
 */

const FLOOR_COUNT = 7;
const FOUNDATION_REVEAL = 0;
const FLOOR_REVEAL_BASE = 0.10;
const FLOOR_REVEAL_GAP = 0.10;
const ROOF_REVEAL = 0.82;
const LOGO_REVEAL = 0.92;

// When scroll progress crosses this threshold, the APPROVED stamp slams down.
const APPROVED_THRESHOLD = 0.92;

export function BuildingDraft() {
  const progress = useScrollProgress();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    wrapRef.current?.style.setProperty("--p", String(progress));
  }, [progress]);

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      aria-hidden="true"
      data-approved={progress >= APPROVED_THRESHOLD}
    >
      <div className={styles.stage}>
        <div className={styles.scene}>
          <div className={styles.ground} />

          <Box variant="foundation" reveal={FOUNDATION_REVEAL} index={-1} />

          {Array.from({ length: FLOOR_COUNT }, (_, i) => (
            <Box
              key={i}
              variant="floor"
              index={i}
              reveal={FLOOR_REVEAL_BASE + i * FLOOR_REVEAL_GAP}
            />
          ))}

          <Box variant="roof" reveal={ROOF_REVEAL} index={FLOOR_COUNT} />

          {/* Bluprynt logo glyph — sits where the antenna used to be */}
          <LogoMark reveal={LOGO_REVEAL} />
        </div>
      </div>

      <ApprovedStamp />
      <ProgressReadout floorCount={FLOOR_COUNT} />
    </div>
  );
}

/* ---------- Box: 5-faced cuboid ---------- */

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

/* ---------- LogoMark: Bluprynt roof+chimney glyph as SVG ----------
   The path traces the favicon shape:
     - Bottom-left start
     - Up to peak (left of center)
     - Down right roof slope
     - Up the chimney's left side
     - Across the chimney top
     - Down the chimney's right side to baseline

   Drawn with stroke (no fill) at width 14, miter joins — matches the
   thick-line look of the actual logo. */

function LogoMark({ reveal }: { reveal: number }) {
  const cssVars = { "--reveal": reveal } as React.CSSProperties;
  return (
    <div className={`${styles.box} ${styles.logoMark}`} style={cssVars}>
      <img
        className={styles.logoImg}
        src="/Favicon-04.png"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}

/* ---------- APPROVED stamp ---------- */

function ApprovedStamp() {
  return (
    <div className={styles.approved}>
      <div className={styles.approvedInner}>
        <span className={styles.approvedTop}>APPROVED</span>
        <span className={styles.approvedDivider} />
        <span className={styles.approvedSub}>FOR CONSTRUCTION</span>
        <span className={styles.approvedMeta}>REV 01 · 2026</span>
      </div>
    </div>
  );
}

/* ---------- Bottom-right progress readout ---------- */

function ProgressReadout({ floorCount }: { floorCount: number }) {
  const progress = useScrollProgress();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const pct = Math.round(progress * 100);

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
        : progress >= APPROVED_THRESHOLD
          ? "APPROVED"
          : progress >= ROOF_REVEAL
            ? "ROOF · COMPLETE"
            : `FL ${String(floorsRevealed).padStart(2, "0")} / ${String(floorCount).padStart(2, "0")}`;

    ref.current.querySelector("[data-pct]")!.textContent =
      `${String(pct).padStart(3, "0")}%`;
    ref.current.querySelector("[data-stage]")!.textContent = stage;
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