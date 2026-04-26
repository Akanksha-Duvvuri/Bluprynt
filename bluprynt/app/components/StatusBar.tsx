import { Fragment } from "react";
import styles from "./StatusBar.module.css";

interface StatusItem {
  label: string;
  on?: boolean;
}

const LEFT_ITEMS: StatusItem[] = [
  { label: "SNAP", on: true },
  { label: "GRID", on: true },
  { label: "ORTHO" },
  { label: "POLAR", on: true },
  { label: "OSNAP" },
];

export default function StatusBar() {
  return (
    <div className={styles.statusbar} aria-hidden="true">
      {LEFT_ITEMS.map((item, i) => (
        <Fragment key={item.label}>
          <span className={`${styles.item} ${item.on ? styles.on : ""}`}>
            {item.label}
          </span>
          {i < LEFT_ITEMS.length - 1 && <span className={styles.sep}>·</span>}
        </Fragment>
      ))}
      <div className={styles.right}>
        <span className={styles.item}>UCS · WORLD</span>
        <span className={`${styles.item} ${styles.scale}`}>MODEL · 1:1</span>
        <span className={styles.item} id="sheetIndicator">
          SHEET A-001
        </span>
      </div>
    </div>
  );
}