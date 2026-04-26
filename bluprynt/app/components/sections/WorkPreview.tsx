import Link from "next/link";
import Sheet from "../Sheet";
import { TitleBlock, SheetMeta } from "../TitleBlock";
import styles from "./WorkPreview.module.css";

interface FeaturedProject {
  slug: string;
  num: string;
  tag: string;
  title: string;
  titleEm: string;
  flag?: { kind: "live" | "review"; label: string };
  metaLeft: string;
  metaRight: string;
  thumb: React.ReactNode;
}

const PROJECTS: FeaturedProject[] = [
  {
    slug: "eastwood-viaduct",
    num: "P-024 / 2025",
    tag: "Structural · Feasibility",
    title: "Eastwood ",
    titleEm: "Viaduct",
    flag: { kind: "live", label: "Live" },
    metaLeft: "3-span · 240m",
    metaRight: "2025",
    thumb: (
      <svg viewBox="0 0 280 180" preserveAspectRatio="none">
        <line x1="20" y1="120" x2="260" y2="120" stroke="#15130D" strokeWidth="1.5" />
        <line x1="20" y1="125" x2="260" y2="125" stroke="rgba(21,19,13,0.4)" strokeWidth="1" />
        <path
          d="M 50 120 Q 90 80 130 120 Q 170 80 210 120 Q 240 95 260 120"
          fill="none"
          stroke="#15130D"
          strokeWidth="1.5"
        />
        <line x1="50" y1="120" x2="50" y2="155" stroke="#15130D" strokeWidth="1" />
        <line x1="130" y1="120" x2="130" y2="155" stroke="#15130D" strokeWidth="1" />
        <line x1="210" y1="120" x2="210" y2="155" stroke="#15130D" strokeWidth="1" />
        <line x1="20" y1="155" x2="260" y2="155" stroke="rgba(21,19,13,0.55)" strokeWidth="1" />
        <text x="14" y="20" fontFamily="Space Mono" fontSize="7" fill="rgba(143,118,64,0.7)" letterSpacing="1">
          ELEVATION · 1:200
        </text>
      </svg>
    ),
  },
  {
    slug: "harbor-reclamation",
    num: "P-021 / 2024",
    tag: "Advisory · Coastal",
    title: "Harbor ",
    titleEm: "Reclamation",
    metaLeft: "14 ha",
    metaRight: "2024",
    thumb: (
      <svg viewBox="0 0 280 180" preserveAspectRatio="none">
        <path
          d="M 20 60 Q 90 40 140 70 Q 200 100 260 70 L 260 180 L 20 180 Z"
          fill="rgba(196,165,100,0.1)"
          stroke="#15130D"
          strokeWidth="1"
        />
        <path
          d="M 20 60 Q 90 40 140 70 Q 200 100 260 70"
          fill="none"
          stroke="#15130D"
          strokeWidth="1.5"
        />
        <rect x="60" y="100" width="60" height="30" fill="none" stroke="#15130D" strokeWidth="1" />
        <rect x="180" y="110" width="40" height="30" fill="none" stroke="rgba(21,19,13,0.7)" strokeWidth="1" />
        <text x="14" y="20" fontFamily="Space Mono" fontSize="7" fill="rgba(143,118,64,0.7)" letterSpacing="1">
          SITE PLAN · 1:5000
        </text>
      </svg>
    ),
  },
  {
    slug: "cardinal-tower",
    num: "P-019 / 2024",
    tag: "Structural · Review",
    title: "Cardinal ",
    titleEm: "Tower",
    flag: { kind: "review", label: "Review" },
    metaLeft: "22 floors",
    metaRight: "2024",
    thumb: (
      <svg viewBox="0 0 280 180" preserveAspectRatio="none">
        <rect x="105" y="40" width="70" height="120" fill="none" stroke="#15130D" strokeWidth="1.5" />
        {[60, 80, 100, 120, 140].map((y) => (
          <line key={y} x1="105" y1={y} x2="175" y2={y} stroke="rgba(21,19,13,0.55)" strokeWidth="1" />
        ))}
        <line x1="125" y1="40" x2="125" y2="160" stroke="rgba(21,19,13,0.4)" strokeWidth="1" />
        <line x1="155" y1="40" x2="155" y2="160" stroke="rgba(21,19,13,0.4)" strokeWidth="1" />
        <line x1="80" y1="160" x2="200" y2="160" stroke="#15130D" strokeWidth="1.5" />
        <text x="14" y="20" fontFamily="Space Mono" fontSize="7" fill="rgba(143,118,64,0.7)" letterSpacing="1">
          N-ELEVATION · 1:500
        </text>
        <text x="14" y="172" fontFamily="Space Mono" fontSize="6.5" fill="rgba(193,101,101,0.85)" letterSpacing="1">
          REVIEW PENDING
        </text>
      </svg>
    ),
  },
];

export default function WorkPreview() {
  return (
    <Sheet id="work" variant="cream">
      <SheetMeta
        sheetCode="A-002"
        lines={["Layer · WORK / Portfolio", "Filter · All sectors"]}
      />
      <TitleBlock
        title="Bluprynt / Work"
        rows={[
          { k: "Drwg No.", v: "BCG-002" },
          { k: "Sheet", v: "02 / 05" },
          { k: "Count", v: "24 PROJ." },
        ]}
      />

      <div className="sheet-body">
        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ A-002 · Selected Work</div>
            <h2 className="title">
              A record of <span className="em">considered</span> decisions.
            </h2>
          </div>
          <div className="section-head-right">
            Twenty-four engagements across feasibility, structural review, and
            owner-side advisory. A short selection below — full archive on the
            work page.
          </div>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={styles.card}
            >
              <div className={styles.num}>{p.num}</div>
              <div className={styles.thumb}>{p.thumb}</div>
              <div className={styles.meta}>
                <div className={styles.tag}>{p.tag}</div>
                <div className={styles.title}>
                  {p.title}
                  <span className={styles.em}>{p.titleEm}</span>
                  {p.flag && (
                    <span className={`flag ${p.flag.kind}`}>{p.flag.label}</span>
                  )}
                </div>
                <div className={styles.metaRow}>
                  <span>{p.metaLeft}</span>
                  <span>{p.metaRight}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="section-foot">
          <Link href="/projects" className="text-link">
            Open the full archive →
          </Link>
        </div>
      </div>
    </Sheet>
  );
}