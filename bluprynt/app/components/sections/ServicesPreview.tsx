import Link from "next/link";
import Sheet from "../Sheet";
import { TitleBlock, SheetMeta } from "../TitleBlock";
import styles from "./ServicesPreview.module.css";

interface Service {
  num: string;
  title: string;
  titleEm: string;
  desc: string;
  deliverables: string[];
  engagement: string;
}

const SERVICES: Service[] = [
  {
    num: "S-01",
    title: "Concrete Takeoff & ",
    titleEm: "Estimation",
    desc: "Independent review of structural calculations, drawings, and design intent — before sign-off, before site, before cost is locked.",
    deliverables: ["Review Report", "Risk Register", "Sign-Off Memo"],
    engagement: "▸ Project-Based · 2–6 weeks",
  },
  {
    num: "S-02",
    title: "Rebar Shop ",
    titleEm: "Drawings",
    desc: "Site, scope, cost and constructability — answered honestly, with the trade-offs laid out, before the first design fee is spent.",
    deliverables: ["Site Brief", "Cost Range", "Go / No-Go"],
    engagement: "▸ Project-Based · 2–6 weeks",
  },
  {
    num: "S-03",
    title: "Slab Edge &  ",
    titleEm: "Dimensional Drawings",
    desc: "Owner-side counsel through design and procurement — the engineer in your corner when the room is full of consultants.",
    deliverables: ["Monthly Reviews", "Risk Watch", "Stage Sign-Offs"],
    engagement: "▸ Project-Based · 2–6 weeks",
  },
  {
    num: "S-04",
    title: "Support of Excavation ",
    titleEm: "Takeoffs",
    desc: "Acquisition, lender, or owner-side technical diligence — the report you can put in front of a board with confidence.",
    deliverables: ["Tech DD Report", "Findings Pack", "Q&A Session"],
    engagement: "▸ Project-Based · 2–6 weeks",
  },

  {
    num: "S-05",
    title: "Submittal ",
    titleEm: "Coordination",
    desc: "Acquisition, lender, or owner-side technical diligence — the report you can put in front of a board with confidence.",
    deliverables: ["Tech DD Report", "Findings Pack", "Q&A Session"],
    engagement: "▸ Project-Based · 2–6 weeks",
  },
];

export default function ServicesPreview() {
  return (
    <Sheet id="services" variant="dark">
      <SheetMeta
        sheetCode="A-003"
        lines={["Layer · SERVICES", "Engagement matrix"]}
      />
      <TitleBlock
        title="Bluprynt / Services"
        rows={[
          { k: "Drwg No.", v: "BCG-003" },
          { k: "Sheet", v: "03 / 05" },
          { k: "Items", v: "04" },
        ]}
      />

      <div className="sheet-body">
        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ A-003 · Services</div>
            <h2 className="title">
              Ways in which
              <br />
              we <span className="em">work.</span>
            </h2>
          </div>
          <div className="section-head-right">
            <p>
              Tap any line for the full spec sheet — deliverables, timelines, and
              what we need from you to start.
            </p>
            <p className="muted">
              There is no minimum project pricing — we take on all scales of work.
              Rates are transparent, with no hidden fees.
            </p>
          </div>
          
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <div key={s.num} className={styles.row}>
              <div className={styles.num}>{s.num}</div>
              <h3 className={styles.title}>
                {s.title}
                <span className={styles.em}>{s.titleEm}</span>
              </h3>
              <p className={styles.desc}>{s.desc}</p>
              <div className={styles.deliverables}>
                {s.deliverables.map((d) => (
                  <span key={d} className={styles.deliv}>
                    {d}
                  </span>
                ))}
              </div>
              <div className={styles.engage}>{s.engagement}</div>
            </div>
          ))}
        </div>

        <div className="section-foot">
          <Link href="/services" className="text-link">
            Open the full services sheet →
          </Link>
        </div>
      </div>
    </Sheet>
  );
}