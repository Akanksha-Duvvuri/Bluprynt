import { SectionShell } from "@/app/components/SectionShell";
import styles from "./ServicesPreview.module.css";
import { SERVICES } from "@/lib/services";

export default function ServicesPreview() {
  return (
    <SectionShell
      code="A-003"
      label="Services"
      tone="base"
      eyebrow=""
    >
      <header className={styles.head}>
        <h2 className={styles.heading}>
          What we do_
        </h2>
        <p className={styles.lede}>
          Scale Smart. Pay only for the 
          preconstruction work you 
          need, when you need it.
        </p>
      </header>

      <ul className={styles.grid}>
        {SERVICES.map((s, i) => (
          <li
            key={s.slug}
            className={styles.tile}
            style={{ ['--i' as string]: i }}
          >
            <div className={styles.leader} aria-hidden="true">
              <span className={styles.leaderDot} />
              <span className={styles.leaderLine} />
            </div>
            <div className={styles.tileHead}>
              <span className={styles.tileN}>{s.slug}</span>
              <span className={styles.tileRegion}>{s.region}</span>
            </div>
            <h3 className={styles.tileTitle}>{s.title}</h3>
            <p className={styles.tileLine}>{s.line}</p>
            <div className={styles.tileFoot}>
              <span className={styles.tileTag}>SHEET A-003.{s.slug}</span>
            </div>
          </li>
        ))}
      </ul>

      <p className={styles.note}>
        ▸ Note: There is no minimum project pricing, we take on all scales of work. 
Rates are transparent with no hidden fees
      </p>
    </SectionShell>
  );
}
