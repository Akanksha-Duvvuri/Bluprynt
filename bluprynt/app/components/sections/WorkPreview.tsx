import Link from "next/link";
import Sheet from "../Sheet";
import { TitleBlock, SheetMeta } from "../TitleBlock";
import { getFeaturedProjects, PROJECTS } from "@/lib/projects";
import styles from "./WorkPreview.module.css";

/**
 * WorkPreview — homepage section showing featured projects.
 * Pulls from the central project list; the three featured ones render here.
 */
export default function WorkPreview() {
  const featured = getFeaturedProjects();

  return (
    <Sheet id="work" variant="cream">
      <SheetMeta
        sheetCode="A-002"
        lines={["Layer · WORK / Portfolio", "Filter · Featured"]}
      />
      <TitleBlock
        title="Bluprynt / Work"
        rows={[
          { k: "Drwg No.", v: "BCG-002" },
          { k: "Sheet", v: "02 / 05" },
          { k: "Count", v: `${PROJECTS.length} PROJ.` },
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
            {PROJECTS.length} engagements across feasibility, structural review, and
            owner-side advisory. A short selection below — full archive on the
            work page.
          </div>
        </div>

        <div className={styles.grid}>
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={styles.card}
            >
              <div className={styles.num}>{p.num}</div>
              <div className={styles.thumb}>
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
                    {p.scope.toUpperCase()}
                  </text>
                </svg>
              </div>
              <div className={styles.meta}>
                <div className={styles.tag}>{p.sector}</div>
                <div className={styles.title}>
                  {p.name}
                  <span className={styles.em}>{p.nameEm}</span>
                  {p.status === "live" && <span className="flag live">Live</span>}
                  {p.status === "review" && <span className="flag review">Review</span>}
                </div>
                <div className={styles.metaRow}>
                  <span>{p.scope}</span>
                  <span>{p.year}</span>
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