import styles from "./SectionDivider.module.css";

/**
 * Minimal section break — a thin centered dashed line, no labels.
 * Drop between sections in page.tsx.
 */
export function Divider() {
  return <div className={styles.divider} aria-hidden="true" />;
}