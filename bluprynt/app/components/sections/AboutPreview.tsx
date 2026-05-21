import Link from "next/link";
import { SectionShell } from "@/app/components/SectionShell";
import styles from "./AboutPreview.module.css";

/* Differentiator content — same words as the about page but rendered
   in a completely different style (vertical list, not 2x2 cards). */
const EDGES = [
  {
    title: "US-Trained Leadership",
    body:
      "Our CEO holds an MEng in Construction Management from NYU. Every deliverable is reviewed against US standards before it ships.",
  },
  {
    title: "Your Business Hours",
    body:
      "We work your time zone, not ours. Real-time on WhatsApp, email, and calls — no 12-hour email lag.",
  },
  {
    title: "40–60% Cost Advantage",
    body:
      "Offshore delivery economics, US-grade quality. No hidden fees. No fixed headcount.",
  },
  {
    title: "One Partner, Many Services",
    body:
      "Estimating, rebar shop drawings, slab edge, SOE takeoffs, and submittal coordination — one partner, one point of contact, one invoice.",
  },
];

export default function AboutPreview() {
  return (
    <SectionShell
      code="A-005"
      label="COMPETITVE EDGE"
      eyebrow=""
    >
      <div className={styles.split}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} /> COST SAVINGS · US STANDARDS · FULL-SERVICE BREADTH
      </p>
        <div className={styles.col}>
          <h2 className={styles.heading}>
            Why US Construction Companies Choose Bluprynt
          </h2>

          {/* ===== 4 Edges (vertical numbered list — different from about page) ===== */}
          <div className={styles.edges}>
            {EDGES.map((e, i) => (
              <div key={i} className={styles.edge}>
                <span className={styles.edgeNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.edgeBodyWrap}>
                  <h3 className={styles.edgeTitle}>{e.title}</h3>
                  <p className={styles.edgeBody}>{e.body}</p>
                </div>
              </div>
            ))}
          </div>

            {/* ===== Proven Value panel ===== */}
              <div className={styles.value}>
                <div className={styles.valueHead}>
                  <span className={styles.valueLabel}>▸ COST ADVANTAGE</span>
                  <div className={styles.valueFigure}>
                    <span className={styles.valueBig}>$80,000</span>
                    <span className={styles.valueSub}>
                      Typical annual savings vs. one US in-house estimator (loaded cost)
                    </span>
                  </div>
                </div>

                <ul className={styles.valueList}>
                  <li className={styles.valueItem}>
                    <span className={styles.valueMark}>▸</span>
                    Pay only for active scope — zero when quiet
                  </li>
                  <li className={styles.valueItem}>
                    <span className={styles.valueMark}>▸</span>
                    No employee benefits, no seat cost, no software licenses, no PTO
                  </li>
                  <li className={styles.valueItem}>
                    <span className={styles.valueMark}>▸</span>
                    Scale up for bid season, scale down between
                  </li>
                </ul>
</div>
          <Link href="/about" className={styles.more}>
            GET A FREE SAMPLE IN 48 HOURS
            <span className={styles.moreArrow}>→</span>
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}