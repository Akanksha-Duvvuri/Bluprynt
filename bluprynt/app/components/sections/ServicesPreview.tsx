import { SectionShell } from "@/components/cad/SectionShell";
import styles from "./ServicesPreview.module.css";

const SERVICES = [
  {
    n: "01",
    title: "Feasibility & site analysis",
    line: "Confirm the project before you commit.",
    region: "US · IN",
  },
  {
    n: "02",
    title: "Cost estimation & BOQ",
    line: "Numbers that survive contact with the contractor.",
    region: "US · IN",
  },
  {
    n: "03",
    title: "Constructability review",
    line: "Catch it now, not at handover.",
    region: "US · IN",
  },
  {
    n: "04",
    title: "Design coordination",
    line: "MEP, structural, architectural — clashed and cleared.",
    region: "US",
  },
  {
    n: "05",
    title: "Tender & bid support",
    line: "Documents that procure the right contractor.",
    region: "IN",
  },
  {
    n: "06",
    title: "Risk & value engineering",
    line: "Where the dollars actually hide.",
    region: "US · IN",
  },
] as const;

export default function ServicesPreview() {
  return (
    <SectionShell
      code="A-003"
      label="Frame"
      tone="base"
      eyebrow="Six disciplines · one practice"
    >
      <header className={styles.head}>
        <h2 className={styles.heading}>
          What we do, <span className={styles.gold}>plainly</span>.
        </h2>
        <p className={styles.lede}>
          We work in the window where decisions are still cheap. Six
          disciplines, scoped to your project, sequenced to keep work moving
          downstream.
        </p>
      </header>

      <ul className={styles.grid}>
        {SERVICES.map((s, i) => (
          <li
            key={s.n}
            className={styles.tile}
            style={{ ['--i' as string]: i }}
          >
            <div className={styles.leader} aria-hidden="true">
              <span className={styles.leaderDot} />
              <span className={styles.leaderLine} />
            </div>
            <div className={styles.tileHead}>
              <span className={styles.tileN}>{s.n}</span>
              <span className={styles.tileRegion}>{s.region}</span>
            </div>
            <h3 className={styles.tileTitle}>{s.title}</h3>
            <p className={styles.tileLine}>{s.line}</p>
            <div className={styles.tileFoot}>
              <span className={styles.tileTag}>SHEET A-003.{s.n}</span>
            </div>
          </li>
        ))}
      </ul>

      <p className={styles.note}>
        ▸ Engagements scoped per project. Most clients start with feasibility or
        a constructability review.
      </p>
    </SectionShell>
  );
}
