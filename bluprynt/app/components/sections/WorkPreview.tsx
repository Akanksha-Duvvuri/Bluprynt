import Link from "next/link";
import { SectionShell } from "@/components/cad/SectionShell";
import styles from "./WorkPreview.module.css";

export type Project = {
  id: string | number;
  slug: string;
  title: string;
  client?: string | null;
  location?: string | null;
  scope?: string | null;
  status: "active" | "review" | "pending" | string;
  category?: string | null;
};

type Props = {
  /**
   * Pass projects from your existing DB query, e.g.:
   *   const projects = await getFeaturedProjects(3);
   *   return <WorkPreview projects={projects} />;
   *
   * Falls back to a placeholder set if omitted, so you can preview the
   * section before the data is wired.
   */
  projects?: Project[];
};

const PLACEHOLDER: Project[] = [
  {
    id: "p1",
    slug: "western-coastal-bypass",
    title: "Western Coastal Bypass",
    client: "State Highways Authority",
    location: "Mangaluru, IN",
    scope: "Cost estimation · Constructability",
    status: "active",
    category: "Infrastructure",
  },
  {
    id: "p2",
    slug: "harbor-utilities-corridor",
    title: "Harbor Utilities Corridor",
    client: "Port Operating Co.",
    location: "Houston, US",
    scope: "MEP coordination · Bid support",
    status: "review",
    category: "Civil",
  },
  {
    id: "p3",
    slug: "metro-station-bk04",
    title: "Metro Station BK-04",
    client: "Metropolitan Transit",
    location: "Hyderabad, IN",
    scope: "Feasibility · Risk register",
    status: "pending",
    category: "Transit",
  },
];

export default function WorkPreview({ projects }: Props) {
  const items = projects && projects.length > 0 ? projects.slice(0, 3) : PLACEHOLDER;

  return (
    <SectionShell code="A-002" label="Foundation" eyebrow="Featured engagements">
      <header className={styles.head}>
        <h2 className={styles.heading}>
          Selected work, <span className={styles.gold}>currently on</span> the
          board.
        </h2>
        <p className={styles.lede}>
          A small slice of active engagements. Each one was scoped, costed, and
          de-risked here — before site mobilization began.
        </p>
      </header>

      <ul className={styles.grid}>
        {items.map((p, i) => (
          <li key={p.id} className={styles.card} style={{ ['--i' as string]: i }}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>

      <blockquote className={styles.pull}>
        <span className={styles.pullMark}>“</span>
        <p>
          They caught a foundation conflict during constructability review that
          would have cost us six weeks on site. The fee paid for itself before
          we mobilized.
        </p>
        <footer className={styles.pullCite}>
          <span className={styles.pullDash}>—</span> Owner's representative,
          transit project, 2024
        </footer>
      </blockquote>

      <div className={styles.foot}>
        <Link href="/work" className={styles.foreLink}>
          See the full index
          <span className={styles.foreArrow}>→</span>
        </Link>
        <span className={styles.dimSm}>06 OF 12 ACTIVE</span>
      </div>
    </SectionShell>
  );
}

/* ---------- Card ---------- */

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className={styles.cardLink}>
      <div className={styles.cardCorners} aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className={styles.thumb}>
        <ProjectGlyph status={project.status} />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.cardCat}>{project.category ?? "Project"}</span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className={styles.cardTitle}>{project.title}</h3>

        {(project.client || project.location) && (
          <p className={styles.cardClient}>
            {project.client}
            {project.client && project.location ? " · " : ""}
            {project.location}
          </p>
        )}

        {project.scope && <p className={styles.cardScope}>{project.scope}</p>}

        <div className={styles.cardFoot}>
          <span className={styles.cardOpen}>Open drawing</span>
          <span className={styles.cardArrow}>→</span>
        </div>
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = String(status).toLowerCase();
  const cls =
    s === "active"
      ? styles.badgeActive
      : s === "review"
        ? styles.badgeReview
        : styles.badgePending;
  return (
    <span className={`${styles.badge} ${cls}`}>
      <span className={styles.badgeDot} />
      {s.toUpperCase()}
    </span>
  );
}

/**
 * A small architectural glyph for each card thumbnail. The strokes draw in
 * on card hover via stroke-dashoffset transition.
 */
function ProjectGlyph({ status }: { status: string }) {
  return (
    <svg className={styles.glyph} viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id={`g-dot-${status}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="#C4A564" fillOpacity="0.18" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill={`url(#g-dot-${status})`} />

      {/* Dim line top */}
      <line x1="40" y1="30" x2="280" y2="30" stroke="#C4A564" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="3 2" className={styles.glyphLine} />
      <line x1="40" y1="26" x2="40" y2="34" stroke="#C4A564" strokeOpacity="0.5" strokeWidth="0.5" />
      <line x1="280" y1="26" x2="280" y2="34" stroke="#C4A564" strokeOpacity="0.5" strokeWidth="0.5" />

      {/* Bridge / structure silhouette */}
      <path
        d="M40 130 L80 90 L120 90 L160 70 L200 90 L240 90 L280 130"
        fill="none"
        stroke="#FFEEC6"
        strokeWidth="1.2"
        className={styles.glyphPath}
      />
      <line x1="40" y1="140" x2="280" y2="140" stroke="#FFEEC6" strokeWidth="1" className={styles.glyphPath} />
      {/* Piers */}
      <line x1="80" y1="140" x2="80" y2="160" stroke="#FFEEC6" strokeWidth="1" className={styles.glyphPath} />
      <line x1="160" y1="140" x2="160" y2="160" stroke="#FFEEC6" strokeWidth="1" className={styles.glyphPath} />
      <line x1="240" y1="140" x2="240" y2="160" stroke="#FFEEC6" strokeWidth="1" className={styles.glyphPath} />
      {/* Datum */}
      <line x1="20" y1="160" x2="300" y2="160" stroke="#C4A564" strokeOpacity="0.45" strokeWidth="0.5" />
      {/* Ground hatch */}
      <rect x="20" y="160" width="280" height="14" fill="#C4A564" fillOpacity="0.05" />
    </svg>
  );
}
