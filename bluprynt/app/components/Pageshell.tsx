import { ReactNode } from "react";
import styles from "./PageShell.module.css";

type PageShellProps = {
  /** Sheet code stamp, e.g. "A-100" */
  code: string;
  /** Sheet label, e.g. "SERVICES INDEX" */
  label: string;
  /** Revision tag, defaults to "01" */
  rev?: string;
  /** Optional small line above the title */
  eyebrow?: ReactNode;
  /** Main page title — accepts JSX so you can highlight portions */
  title: ReactNode;
  /** Lede paragraph below the title */
  lede?: ReactNode;
  /** Page body */
  children: ReactNode;
  /** Max content width; defaults to 1280px */
  maxWidth?: number | string;
};

export function PageShell({
  code,
  label,
  rev = "01",
  eyebrow,
  title,
  lede,
  children,
  maxWidth = 1280,
}: PageShellProps) {
  return (
    <main className={styles.page}>
      {/* Background grid — subtle, identical on all pages */}
      <div className={styles.grid} aria-hidden="true" />

      <div
        className={styles.inner}
        style={{
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        }}
      >
        {/* ===== Page header ============================================== */}
        <header className={styles.head}>
          <div className={styles.stamp}>
            <span className={styles.stampK}>SHEET</span>
            <span className={styles.stampV}>{code}</span>
            <span className={styles.stampSep}>·</span>
            <span className={styles.stampL}>{label}</span>
            <span className={styles.stampSep}>·</span>
            <span className={styles.stampK}>REV</span>
            <span className={styles.stampV}>{rev}</span>
          </div>

          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

          <h1 className={styles.title}>{title}</h1>

          {lede && <p className={styles.lede}>{lede}</p>}
        </header>

        <div className={styles.divider} aria-hidden="true" />

        {/* ===== Page body ================================================= */}
        <div className={styles.body}>{children}</div>
      </div>
    </main>
  );
}

/* ---------- Optional: a Block helper for grouping content ---------- */

type BlockProps = {
  num?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Block({ num, title, children, className }: BlockProps) {
  return (
    <section className={`${styles.block} ${className ?? ""}`}>
      <header className={styles.blockHead}>
        {num && <span className={styles.blockNum}>{num}</span>}
        <h2 className={styles.blockTitle}>{title}</h2>
      </header>
      <div className={styles.blockBody}>{children}</div>
    </section>
  );
}