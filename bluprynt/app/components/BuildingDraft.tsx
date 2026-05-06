"use client";

import { useEffect, useRef } from "react";
import { useScrollProgress } from "@/lib/cad/useScrollProgress";
import { useCursorX } from "@/lib/cad/Usecursorx";
import styles from "./BuildingDraft.module.css";

/**
 * 3D scroll-driven building.
 *
 * Two inputs drive the visual:
 *   - `--p`  scroll progress (0..1) → reveals foundation, floors, roof, antenna
 *   - `--cx` cursor X position (0..1) → rotates the scene 360° around Y axis
 *
 * Both are written as CSS custom properties on the wrap element. CSS
 * inherits these into the whole 3D scene; calc() expressions downstream
 * pick them up automatically — no animation library, no rAF loop beyond
 * the listeners.
 */

const FLOOR_COUNT = 7;
const FOUNDATION_REVEAL = 0;
const FLOOR_REVEAL_BASE = 0.10;
const FLOOR_REVEAL_GAP = 0.10;
const ROOF_REVEAL = 0.82;
const ANTENNA_REVEAL = 0.92;

// When scroll progress crosses this threshold, the APPROVED stamp slams down.
const APPROVED_THRESHOLD = 0.92;

export function BuildingDraft() {
  const progress = useScrollProgress();
  const cursorX = useCursorX();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Two custom properties, two effects — keeps each update minimal.
  useEffect(() => {
    wrapRef.current?.style.setProperty("--p", String(progress));
  }, [progress]);

  useEffect(() => {
    wrapRef.current?.style.setProperty("--cx", String(cursorX));
  }, [cursorX]);

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
          <Antenna reveal={ANTENNA_REVEAL} />
        </div>
      </div>

      {/* APPROVED stamp — 2D overlay, doesn't rotate with the building */}
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

/* ---------- APPROVED stamp ----------
   2D overlay. Visibility flips via the [data-approved] attribute on the
   wrap, which the CSS reads to swap between hidden/scaled-up and
   visible/scaled-down states. */

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