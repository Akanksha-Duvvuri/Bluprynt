import Link from "next/link";
import Sheet from "../Sheet";
import { TitleBlock, SheetMeta } from "../TitleBlock";
import styles from "./AboutPreview.module.css";

interface Founder {
  initials: string;
  name: string;
  role: string;
  bio: string;
  credentials: { k: string; v: string }[];
}

const FOUNDERS: Founder[] = [
  {
    initials: "F1",
    name: "Founder One",
    role: "Principal · Structural",
    bio: "Twelve years across high-rise residential, civic infrastructure, and post-tensioning. Worked on three IFC-funded transit programs before founding the firm.",
    credentials: [
      { k: "Degree", v: "M.Eng · IIT" },
      { k: "Licence", v: "P.Eng / Chartered" },
      { k: "Software", v: "ETABS · SAFE · SAP2000" },
    ],
  },
  {
    initials: "F2",
    name: "Founder Two",
    role: "Principal · Civil",
    bio: "A decade in coastal and water infrastructure across two continents. Specialises in feasibility, scope-to-cost translation, and owner-side technical strategy.",
    credentials: [
      { k: "Degree", v: "M.Sc · TU Delft" },
      { k: "Licence", v: "PMP · CEng" },
      { k: "Software", v: "Civil 3D · Revit · MIKE" },
    ],
  },
];

export default function AboutPreview() {
  return (
    <Sheet id="about" variant="cream">
      <SheetMeta
        sheetCode="A-004"
        lines={["Layer · ABOUT / Founders", "Drawn by · BCG"]}
      />
      <TitleBlock
        title="Bluprynt / About"
        rows={[
          { k: "Drwg No.", v: "BCG-004" },
          { k: "Sheet", v: "04 / 05" },
          { k: "Founders", v: "02" },
        ]}
      />

      <div className="sheet-body">
        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ A-004 · About the firm</div>
            <h2 className="title">
              Two engineers,
              <br />
              one <span className="em">premise.</span>
            </h2>
          </div>
          <div className="section-head-right">
            That the most expensive engineering decision is the one you
            didn&apos;t think hard enough about. We help you think about it —
            early, honestly, and on the record.
          </div>
        </div>

        <div className={styles.grid}>
          {FOUNDERS.map((f) => (
            <article key={f.name} className={styles.card}>
              <div className={styles.photo} aria-hidden="true">
                {f.initials}
              </div>
              <div className={styles.name}>{f.name}</div>
              <div className={styles.role}>{f.role}</div>
              <p className={styles.bio}>{f.bio}</p>
              <div className={styles.credentials}>
                {f.credentials.map((c) => (
                  <div key={c.k} className={styles.credRow}>
                    <span className={styles.credK}>{c.k}</span>
                    <span className={styles.credV}>{c.v}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="section-foot">
          <Link href="/about" className="text-link">
            Read the firm story →
          </Link>
        </div>
      </div>
    </Sheet>
  );
}