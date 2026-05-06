import Link from "next/link";
import { SectionShell } from "@/app/components/SectionShell";
import styles from "./AboutPreview.module.css";

export default function AboutPreview() {
  return (
    <SectionShell
      code="A-005"
      label="Annotation"
      eyebrow="The case for early"
    >
      <div className={styles.split}>
        {/* ── Left: argument ─────────────────────────────────────────── */}
        <div className={styles.col}>
          <h2 className={styles.heading}>
            Most cost overruns are{" "}
            <span className={styles.gold}>decided</span> before construction
            begins.
          </h2>

          <p className={styles.body}>
            A decision made on paper costs almost nothing to change. The same
            decision made on site — after permits, mobilization, sub-contracts,
            and embedded steel — costs orders of magnitude more.
          </p>

          <p className={styles.body}>
            We work in the small, valuable window where decisions are still
            cheap. Feasibility, cost certainty, constructability, coordination
            — settled before earth moves.
          </p>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt className={styles.statK}>Avg. cost-of-change</dt>
              <dd className={styles.statV}>
                ×<span className={styles.statBig}>10,000</span>
                <span className={styles.statSm}> on site vs. design</span>
              </dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statK}>Engagement window</dt>
              <dd className={styles.statV}>
                <span className={styles.statBig}>Pre-tender</span>
                <span className={styles.statSm}> typically</span>
              </dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statK}>Markets</dt>
              <dd className={styles.statV}>
                <span className={styles.statBig}>US · IN</span>
                <span className={styles.statSm}> two offices</span>
              </dd>
            </div>
          </dl>

          <Link href="/about" className={styles.more}>
            Read about the firm
            <span className={styles.moreArrow}>→</span>
          </Link>
        </div>

        {/* ── Right: cost-of-change chart, drawn as a CAD diagram ────── */}
        <div className={styles.col}>
          <figure className={styles.chart}>
            <figcaption className={styles.chartCap}>
              <span className={styles.chartCode}>FIG · 005.1</span>
              <span className={styles.chartTitle}>
                Cost of change vs. project phase
              </span>
            </figcaption>

            <svg
              viewBox="0 0 480 360"
              className={styles.chartSvg}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Cost-of-change curve rising sharply through project phases"
            >
              <defs>
                <pattern
                  id="aboutDot"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="0.6" fill="#C4A564" fillOpacity="0.18" />
                </pattern>
              </defs>
              <rect width="480" height="360" fill="url(#aboutDot)" />

              {/* Axes */}
              <line x1="60" y1="40" x2="60" y2="300" stroke="#C4A564" strokeWidth="0.7" />
              <line x1="60" y1="300" x2="440" y2="300" stroke="#C4A564" strokeWidth="0.7" />

              {/* Y axis label */}
              <text
                x="20"
                y="40"
                fontSize="9"
                fill="#C4A564"
                fontFamily="ui-monospace, monospace"
                letterSpacing="1"
              >
                ₹/$  COST
              </text>

              {/* X axis ticks (phases) */}
              {[
                { x: 100, label: "FEAS" },
                { x: 180, label: "DESIGN" },
                { x: 260, label: "TENDER" },
                { x: 340, label: "BUILD" },
                { x: 420, label: "OPS" },
              ].map(({ x, label }) => (
                <g key={label}>
                  <line x1={x} y1="298" x2={x} y2="306" stroke="#C4A564" strokeWidth="0.5" />
                  <text
                    x={x}
                    y="320"
                    fontSize="8"
                    fill="#C4A564"
                    fontFamily="ui-monospace, monospace"
                    letterSpacing="1"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                </g>
              ))}

              {/* Y axis ticks (log-ish levels) */}
              {[
                { y: 280, label: "1" },
                { y: 220, label: "10" },
                { y: 160, label: "100" },
                { y: 100, label: "1k" },
                { y: 60, label: "10k" },
              ].map(({ y, label }) => (
                <g key={label}>
                  <line x1="56" y1={y} x2="64" y2={y} stroke="#C4A564" strokeWidth="0.5" opacity="0.6" />
                  <text
                    x="50"
                    y={y + 3}
                    fontSize="8"
                    fill="#C4A564"
                    opacity="0.7"
                    fontFamily="ui-monospace, monospace"
                    textAnchor="end"
                  >
                    {label}
                  </text>
                </g>
              ))}

              {/* Curve */}
              <path
                d="M100 285 Q160 270 180 250 Q220 220 260 170 Q300 120 340 75 Q380 60 420 55"
                fill="none"
                stroke="#FFEEC6"
                strokeWidth="1.4"
                className={styles.chartPath}
              />
              {/* Curve points */}
              {[
                [100, 285],
                [180, 250],
                [260, 170],
                [340, 75],
                [420, 55],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="#FFEEC6" stroke="#0D0C08" strokeWidth="0.6" />
              ))}

              {/* "You are here" callout pointing to feasibility/design */}
              <g>
                <rect
                  x="100"
                  y="40"
                  width="120"
                  height="36"
                  fill="#0D0C08"
                  stroke="#C4A564"
                  strokeWidth="0.6"
                />
                <text
                  x="160"
                  y="56"
                  fontSize="8"
                  fill="#C4A564"
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="1.5"
                  textAnchor="middle"
                >
                  WHERE WE WORK
                </text>
                <text
                  x="160"
                  y="70"
                  fontSize="8"
                  fill="#FFEEC6"
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.5"
                  textAnchor="middle"
                >
                  ↓ decisions still cheap
                </text>
                {/* Leader to the curve */}
                <line x1="160" y1="76" x2="140" y2="262" stroke="#C4A564" strokeWidth="0.5" strokeDasharray="3 2" />
                <circle cx="140" cy="262" r="2" fill="#C4A564" />
              </g>

              {/* "Too late" callout */}
              <g opacity="0.85">
                <text
                  x="380"
                  y="45"
                  fontSize="8"
                  fill="#C16565"
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.5"
                  textAnchor="middle"
                >
                  CHANGE ORDERS
                </text>
                <text
                  x="380"
                  y="35"
                  fontSize="8"
                  fill="#C16565"
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.5"
                  textAnchor="middle"
                >
                  ↑
                </text>
              </g>
            </svg>

            <div className={styles.chartFoot}>
              <span className={styles.chartFootK}>FIG.</span>
              <span className={styles.chartFootV}>illustrative · industry consensus</span>
            </div>
          </figure>
        </div>
      </div>
    </SectionShell>
  );
}
