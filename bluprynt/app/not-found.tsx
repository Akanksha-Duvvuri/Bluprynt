import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      {/* Four corner ticks — make the whole page feel like a drafted sheet */}
      <div className={styles.corners} aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className={styles.inner}>
        {/* Sheet stamp at top */}
        <div className={styles.stamp}>
          <span className={styles.stampK}>SHEET</span>
          <span className={styles.stampVRed}>A-404</span>
          <span className={styles.stampSep}>·</span>
          <span className={styles.stampK}>REV</span>
          <span className={styles.stampV}>01</span>
        </div>

        {/* The Bluprynt mark, centered */}
        <img
          src="/Logo.png"
          alt="Bluprynt"
          className={styles.mark}
        />

        {/* Title block */}
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>NOT FOUND</h1>
          <p className={styles.subtitle}>
            This drawing doesn&apos;t exist in the project index.
          </p>
        </div>

        {/* Single return action */}
        <Link href="/" className={styles.action}>
          <span className={styles.actionArrow}>←</span>
          <span>Return to project root</span>
        </Link>

        {/* Bottom meta */}
        <div className={styles.bottom}>
          <span className={styles.bottomK}>A-404</span>
          <span className={styles.bottomSep}>·</span>
          <span className={styles.bottomK}>BLUPRYNT CONSULTING</span>
          <span className={styles.bottomSep}>·</span>
          <span className={styles.bottomK}>REV 01</span>
        </div>
      </div>
    </main>
  );
}