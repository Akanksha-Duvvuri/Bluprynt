import Link from "next/link";
import Sheet from "../Sheet";
import { TitleBlock, SheetMeta } from "../TitleBlock";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <Sheet id="hero" variant="dark" className={styles.hero}>
      <SheetMeta
        sheetCode="A-001"
        lines={["Project · BCG Homepage", "Layer · 0-Base"]}
      />
      <TitleBlock
        title="Bluprynt / Home"
        rows={[
          { k: "Drwg No.", v: "BCG-001" },
          { k: "Scale", v: "1 : 1" },
          { k: "Sheet", v: "01 / 05" },
          { k: "Rev.", v: "04" },
        ]}
      />

      {/* selected entity floating in upper right */}
      <div className={styles.selected} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          Bluprynt Consulting Group <span className={styles.dot} /> Civil &amp;
          Infrastructure
        </div>
        <h1 className={styles.title}>
          The firm you
          <br />
          call <span className={styles.ital}>before</span>
          <br />
          you <span className={styles.gold}>build.</span>
        </h1>
        <p className={styles.deck}>
          Civil and infrastructure consulting for the decisions that matter
          most. Feasibility, structural review, and owner-side advisory — before
          the first drawing goes to site.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/#work" className="btn-primary">
            View our work →
          </Link>
          <Link href="/contact" className="btn-secondary">
            Start a project
          </Link>
        </div>
      </div>

      <div className={styles.cmd}>
        <span className={styles.prompt}>Command:</span> _SELECT — move cursor to
        inspect
        <span className={styles.cursor} />
      </div>
    </Sheet>
  );
}