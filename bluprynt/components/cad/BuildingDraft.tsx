"use client";

import { useEffect, useRef } from "react";
import { useScrollProgress } from "@/lib/cad/useScrollProgress";
import styles from "./BuildingDraft.module.css";

/**
 * Drawing-assembly building. Sits fixed on the right side of the viewport.
 * Six layers reveal as scroll progresses 0..1:
 *
 *   0.00 → 0.15   L1  outline + property line
 *   0.15 → 0.30   L2  foundation + datum
 *   0.30 → 0.50   L3  structural grid + columns
 *   0.50 → 0.70   L4  envelope (walls, glazing)
 *   0.70 → 0.85   L5  annotations (dimensions, leaders)
 *   0.85 → 1.00   L6  title block fill-in
 */
export function BuildingDraft() {
  const progress = useScrollProgress();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Drive the reveal via a single CSS custom property
  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.setProperty("--p", String(progress));
    }
  }, [progress]);

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      {/* Top-left sheet stamp */}
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

      {/* Drawing area */}
      <svg
        className={styles.svg}
        viewBox="0 0 600 900"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dotGrid"
            x="0"
            y="0"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.6" fill="#C4A564" fillOpacity="0.18" />
          </pattern>

          <pattern
            id="hatch"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke="#C4A564"
              strokeOpacity="0.5"
              strokeWidth="0.4"
            />
          </pattern>

          <marker
            id="dimTick"
            viewBox="0 0 4 8"
            refX="2"
            refY="4"
            markerWidth="4"
            markerHeight="8"
            orient="auto"
          >
            <line x1="2" y1="0" x2="2" y2="8" stroke="#C4A564" strokeWidth="0.6" />
          </marker>

          <marker
            id="leader"
            viewBox="0 0 8 8"
            refX="6"
            refY="4"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <circle cx="4" cy="4" r="1.4" fill="#C4A564" />
          </marker>
        </defs>

        {/* Background dot grid — always present */}
        <rect width="600" height="900" fill="url(#dotGrid)" />

        {/* North arrow + corner ticks (always visible, faint) */}
        <g className={styles.always}>
          <g transform="translate(540, 60)">
            <circle r="14" fill="none" stroke="#C4A564" strokeWidth="0.5" />
            <path d="M0 -10 L4 4 L0 0 L-4 4 Z" fill="#C4A564" />
            <text
              y="22"
              textAnchor="middle"
              fontSize="8"
              fill="#C4A564"
              fontFamily="ui-monospace, monospace"
              letterSpacing="2"
            >
              N
            </text>
          </g>
        </g>

        {/* ── L1 · OUTLINE — site footprint, datum line, property edge ── */}
        <g className={styles.l1}>
          {/* Property line (dashed) */}
          <rect
            x="80"
            y="100"
            width="440"
            height="700"
            fill="none"
            stroke="#C4A564"
            strokeWidth="0.5"
            strokeDasharray="6 4"
            opacity="0.5"
          />
          {/* Building outline */}
          <rect
            x="140"
            y="220"
            width="320"
            height="500"
            fill="none"
            stroke="#FFEEC6"
            strokeWidth="1"
            className={styles.draw1}
          />
          {/* Datum / ground line */}
          <line
            x1="80"
            y1="720"
            x2="520"
            y2="720"
            stroke="#FFEEC6"
            strokeWidth="0.8"
            className={styles.draw1}
          />
          <text
            x="80"
            y="715"
            fontSize="9"
            fill="#C4A564"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1"
          >
            ±0.00 DATUM
          </text>
        </g>

        {/* ── L2 · FOUNDATION — footings, basement, sub-grade ── */}
        <g className={styles.l2}>
          {/* Footing pads */}
          <rect
            x="130"
            y="720"
            width="60"
            height="36"
            fill="none"
            stroke="#FFEEC6"
            strokeWidth="0.7"
          />
          <rect
            x="270"
            y="720"
            width="60"
            height="36"
            fill="none"
            stroke="#FFEEC6"
            strokeWidth="0.7"
          />
          <rect
            x="410"
            y="720"
            width="60"
            height="36"
            fill="none"
            stroke="#FFEEC6"
            strokeWidth="0.7"
          />
          {/* Sub-grade hatching */}
          <rect x="80" y="756" width="440" height="44" fill="url(#hatch)" />
          <line
            x1="80"
            y1="756"
            x2="520"
            y2="756"
            stroke="#C4A564"
            strokeWidth="0.4"
            strokeDasharray="2 2"
          />
          {/* Foundation walls */}
          <line x1="140" y1="720" x2="140" y2="756" stroke="#FFEEC6" strokeWidth="0.6" />
          <line x1="460" y1="720" x2="460" y2="756" stroke="#FFEEC6" strokeWidth="0.6" />
        </g>

        {/* ── L3 · STRUCTURE — columns + floor plates ── */}
        <g className={styles.l3}>
          {/* Floor plates */}
          {[320, 420, 520, 620].map((y) => (
            <line
              key={y}
              x1="140"
              y1={y}
              x2="460"
              y2={y}
              stroke="#FFEEC6"
              strokeWidth="0.5"
              strokeDasharray="3 2"
            />
          ))}
          {/* Columns */}
          {[180, 250, 320, 390, 440].map((x) => (
            <line
              key={x}
              x1={x}
              y1="220"
              x2={x}
              y2="720"
              stroke="#FFEEC6"
              strokeWidth="0.4"
              strokeDasharray="1 2"
            />
          ))}
          {/* Roof line */}
          <line
            x1="120"
            y1="220"
            x2="480"
            y2="220"
            stroke="#FFEEC6"
            strokeWidth="0.8"
          />
          <line
            x1="140"
            y1="220"
            x2="120"
            y2="200"
            stroke="#FFEEC6"
            strokeWidth="0.6"
          />
          <line
            x1="460"
            y1="220"
            x2="480"
            y2="200"
            stroke="#FFEEC6"
            strokeWidth="0.6"
          />
          <line
            x1="120"
            y1="200"
            x2="480"
            y2="200"
            stroke="#FFEEC6"
            strokeWidth="0.6"
          />
        </g>

        {/* ── L4 · ENVELOPE — walls, openings, glazing ── */}
        <g className={styles.l4}>
          {/* Window grid - top floor */}
          {[160, 200, 240, 280, 320, 360, 400, 440].map((x) => (
            <rect
              key={`r1-${x}`}
              x={x}
              y="240"
              width="20"
              height="60"
              fill="none"
              stroke="#C4A564"
              strokeWidth="0.4"
              strokeOpacity="0.7"
            />
          ))}
          {/* Window grid - middle floors */}
          {[2, 3].map((floor) =>
            [160, 200, 240, 280, 320, 360, 400, 440].map((x) => (
              <rect
                key={`r${floor}-${x}`}
                x={x}
                y={240 + floor * 100}
                width="20"
                height="60"
                fill="none"
                stroke="#C4A564"
                strokeWidth="0.4"
                strokeOpacity="0.55"
              />
            )),
          )}
          {/* Ground floor: entrance */}
          <line
            x1="280"
            y1="640"
            x2="280"
            y2="720"
            stroke="#FFEEC6"
            strokeWidth="0.6"
          />
          <line
            x1="320"
            y1="640"
            x2="320"
            y2="720"
            stroke="#FFEEC6"
            strokeWidth="0.6"
          />
          <line
            x1="280"
            y1="640"
            x2="320"
            y2="640"
            stroke="#FFEEC6"
            strokeWidth="0.6"
          />
          {/* Cladding hatch on sides */}
          <rect
            x="140"
            y="640"
            width="120"
            height="80"
            fill="url(#hatch)"
            opacity="0.5"
          />
          <rect
            x="340"
            y="640"
            width="120"
            height="80"
            fill="url(#hatch)"
            opacity="0.5"
          />
        </g>

        {/* ── L5 · ANNOTATIONS — dimensions, leaders, room labels ── */}
        <g className={styles.l5}>
          {/* Overall width dim */}
          <line
            x1="140"
            y1="180"
            x2="460"
            y2="180"
            stroke="#C4A564"
            strokeWidth="0.5"
            markerStart="url(#dimTick)"
            markerEnd="url(#dimTick)"
          />
          <text
            x="300"
            y="175"
            textAnchor="middle"
            fontSize="9"
            fill="#C4A564"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1"
          >
            32'-0"
          </text>
          {/* Overall height dim (right side) */}
          <line
            x1="490"
            y1="220"
            x2="490"
            y2="720"
            stroke="#C4A564"
            strokeWidth="0.5"
            markerStart="url(#dimTick)"
            markerEnd="url(#dimTick)"
          />
          <text
            x="500"
            y="475"
            fontSize="9"
            fill="#C4A564"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1"
            transform="rotate(90, 500, 475)"
          >
            50'-0"
          </text>
          {/* Leader callouts */}
          <line
            x1="350"
            y1="270"
            x2="430"
            y2="270"
            stroke="#C4A564"
            strokeWidth="0.4"
          />
          <circle cx="350" cy="270" r="1.5" fill="#C4A564" />
          <text
            x="435"
            y="273"
            fontSize="8"
            fill="#C4A564"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.5"
          >
            CURTAIN WALL
          </text>
          <line
            x1="200"
            y1="700"
            x2="100"
            y2="700"
            stroke="#C4A564"
            strokeWidth="0.4"
          />
          <circle cx="200" cy="700" r="1.5" fill="#C4A564" />
          <text
            x="60"
            y="694"
            fontSize="8"
            fill="#C4A564"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.5"
          >
            SLAB-ON-GRADE
          </text>
          <text
            x="60"
            y="704"
            fontSize="8"
            fill="#C4A564"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.5"
            opacity="0.7"
          >
            6" REINFORCED
          </text>
          {/* Floor labels */}
          {[
            { y: 260, label: "L5" },
            { y: 360, label: "L4" },
            { y: 460, label: "L3" },
            { y: 560, label: "L2" },
            { y: 660, label: "L1" },
          ].map(({ y, label }) => (
            <text
              key={label}
              x="125"
              y={y + 5}
              textAnchor="end"
              fontSize="7"
              fill="#C4A564"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.5"
              opacity="0.85"
            >
              {label}
            </text>
          ))}
        </g>

        {/* ── L6 · TITLE BLOCK fill-in ── */}
        <g className={styles.l6}>
          <rect
            x="80"
            y="820"
            width="440"
            height="60"
            fill="none"
            stroke="#C4A564"
            strokeWidth="0.6"
          />
          <line x1="80" y1="840" x2="520" y2="840" stroke="#C4A564" strokeWidth="0.4" />
          <line x1="240" y1="820" x2="240" y2="880" stroke="#C4A564" strokeWidth="0.4" />
          <line x1="380" y1="820" x2="380" y2="880" stroke="#C4A564" strokeWidth="0.4" />

          <text
            x="88"
            y="833"
            fontSize="7"
            fill="#C4A564"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1"
          >
            PROJECT
          </text>
          <text
            x="88"
            y="858"
            fontSize="9"
            fill="#FFEEC6"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1"
          >
            BLUPRYNT.COM
          </text>
          <text
            x="88"
            y="872"
            fontSize="7"
            fill="#FFEEC6"
            fontFamily="ui-monospace, monospace"
            opacity="0.7"
          >
            HOME · MARKETING SITE
          </text>

          <text
            x="248"
            y="833"
            fontSize="7"
            fill="#C4A564"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1"
          >
            DISCIPLINE
          </text>
          <text
            x="248"
            y="858"
            fontSize="9"
            fill="#FFEEC6"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1"
          >
            PRE-CONSTRUCTION
          </text>
          <text
            x="248"
            y="872"
            fontSize="7"
            fill="#FFEEC6"
            fontFamily="ui-monospace, monospace"
            opacity="0.7"
          >
            CIVIL · INFRASTRUCTURE
          </text>

          <text
            x="388"
            y="833"
            fontSize="7"
            fill="#C4A564"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1"
          >
            REV
          </text>
          <text
            x="388"
            y="858"
            fontSize="9"
            fill="#FFEEC6"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1"
          >
            01
          </text>
          <text
            x="388"
            y="872"
            fontSize="7"
            fill="#FFEEC6"
            fontFamily="ui-monospace, monospace"
            opacity="0.7"
          >
            ISSUED FOR REVIEW
          </text>
        </g>
      </svg>

      <ProgressReadout />
    </div>
  );
}

/**
 * Tiny live readout that subscribes to the same scroll progress and
 * writes directly to the DOM. Avoids re-renders for a smooth update.
 */
function ProgressReadout() {
  const progress = useScrollProgress();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const pct = Math.round(progress * 100);
    const stage = stageFor(progress);
    ref.current.querySelector("[data-pct]")!.textContent =
      `${String(pct).padStart(3, "0")}%`;
    ref.current.querySelector("[data-stage]")!.textContent = stage;

    // Mirror to the title-block stamp
    const stamp = document.querySelector("[data-prog]");
    if (stamp) stamp.textContent = `${String(pct).padStart(2, "0")}%`;
  }, [progress]);

  return (
    <div ref={ref} className={styles.readout}>
      <span className={styles.readoutK}>STAGE</span>
      <span className={styles.readoutV} data-stage>
        L1 · OUTLINE
      </span>
      <span className={styles.readoutSep}>·</span>
      <span className={styles.readoutK}>PROG</span>
      <span className={styles.readoutV} data-pct>
        000%
      </span>
    </div>
  );
}

function stageFor(p: number): string {
  if (p < 0.15) return "L1 · OUTLINE";
  if (p < 0.3) return "L2 · FOUNDATION";
  if (p < 0.5) return "L3 · STRUCTURE";
  if (p < 0.7) return "L4 · ENVELOPE";
  if (p < 0.85) return "L5 · ANNOTATION";
  return "L6 · TITLE BLOCK";
}
