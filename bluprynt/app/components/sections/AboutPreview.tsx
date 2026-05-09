import Link from "next/link";
import { SectionShell } from "@/app/components/SectionShell";
import styles from "./AboutPreview.module.css";

export default function AboutPreview() {
  return (
    <SectionShell
      code="A-005"
      label="About Us"
      eyebrow="Our Competitve edge"
    >
      <div className={styles.split}>
        {/* ── Left: argument ─────────────────────────────────────────── */}
        <div className={styles.col}>
          <h2 className={styles.heading}>
            Why US Construction Companies Choose Bluprynt
          </h2>

          <p className={styles.body}>
            Most  offshore vendors give you cost savings. We give you cost savings, US standards, and full-service breadth.
          </p>

          <p className={styles.body}>
           We'd rather earn your trust with one 
            deliverable than a pitch deck. 
            Start with the sample. Decide from there.
          </p>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt className={styles.statK}>Cost Advantage</dt>
              <dd className={styles.statV}>
                ×<span className={styles.statBig}>$80,000</span>
                <span className={styles.statSm}> Typical annual savings vs. one US in-house 
    estimator (loaded cost)</span>
              </dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statK}>Engagement window</dt>
              <dd className={styles.statV}>
                <span className={styles.statBig}>Pre-Construction</span>
                <span className={styles.statSm}> </span>
              </dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statK}>Markets</dt>
              <dd className={styles.statV}>
                <span className={styles.statBig}>US · IN</span>
                <span className={styles.statSm}> </span>
              </dd>
            </div>
          </dl>

          <Link href="/about" className={styles.more}>
            Read about the firm
            <span className={styles.moreArrow}>→</span>
          </Link>
        </div>

      </div>
    </SectionShell>
  );
}
