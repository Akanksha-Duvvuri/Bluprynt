import Link from "next/link";
import Sheet from "../Sheet";
import { TitleBlock, SheetMeta } from "../TitleBlock";
import { SERVICES } from "@/lib/services";
import styles from "./ServicesPreview.module.css";

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
              Four ways
              <br />
              we <span className="em">work.</span>
            </h2>
          </div>
          <div className="section-head-right">
            Tap any line for the full spec sheet — deliverables, timelines, and
            what we need from you to start.
          </div>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className={styles.row}
            >
              <div className={styles.num}>{s.num}</div>
              <h3 className={styles.title}>
                {s.name}
                <span className={styles.em}>{s.nameEm}</span>
              </h3>
              <p className={styles.desc}>{s.shortDesc}</p>
              <div className={styles.deliverables}>
                {s.deliverables.map((d) => (
                  <span key={d} className={styles.deliv}>
                    {d}
                  </span>
                ))}
              </div>
              <div className={styles.engage}>
                ▸ {s.engagement} · {s.timeline}
              </div>
            </Link>
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