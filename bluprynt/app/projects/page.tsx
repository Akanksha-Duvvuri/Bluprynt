import type { Metadata } from "next";
import Link from "next/link";
import Sheet from "@/app/components/Sheet";
import { TitleBlock, SheetMeta } from "@/app/components/TitleBlock";
import { PROJECTS } from "@/lib/projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work from Bluprynt Consulting Group. Civil and infrastructure pre-consulting projects across feasibility, structural review, and owner-side advisory.",
};

export default function ProjectsPage() {
  return (
    <Sheet id="work" variant="cream">
      <SheetMeta
        sheetCode="A-002"
        lines={["Layer · WORK / Archive", "Filter · All sectors", `Count · ${PROJECTS.length} projects`]}
      />
      <TitleBlock
        title="Bluprynt / Work"
        rows={[
          { k: "Drwg No.", v: "BCG-002" },
          { k: "Sheet", v: "01 / 01" },
          { k: "Count", v: `${PROJECTS.length} PROJ.` },
        ]}
      />

      <div className="sheet-body">
        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ A-002 · Selected Work</div>
            <h1 className="title">
              A record of <span className="em">considered</span><br />
              decisions.
            </h1>
          </div>
          <div className="section-head-right">
            Engagements across feasibility, structural review, and owner-side
            advisory. Some clients named, some anonymised by request.
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

              <div className={styles.thumb}>
                {/* Generic technical illustration — replace with project images later */}
                <svg viewBox="0 0 280 200" preserveAspectRatio="none">
                  <rect
                    x="40" y="40" width="200" height="120"
                    fill="none" stroke="#15130D" strokeWidth="1.2"
                  />
                  <line x1="40" y1="100" x2="240" y2="100" stroke="rgba(21,19,13,0.45)" strokeWidth="0.8" />
                  <line x1="140" y1="40" x2="140" y2="160" stroke="rgba(21,19,13,0.45)" strokeWidth="0.8" />
                  <text x="50" y="56" fontFamily="Space Mono" fontSize="7" fill="rgba(143,118,64,0.7)" letterSpacing="1">
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
          <Link href="/contact" className="text-link">
            Start a project →
          </Link>
        </div>
      </div>
    </Sheet>
  );
}