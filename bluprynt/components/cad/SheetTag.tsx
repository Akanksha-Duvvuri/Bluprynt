import styles from "./SheetTag.module.css";

type Props = {
  code: string;
  label?: string;
  className?: string;
};

/**
 * Compact CAD-style sheet code label.
 *   <SheetTag code="A-002" label="Foundation" />
 *   → A-002 · Foundation   (mono, gold)
 */
export function SheetTag({ code, label, className }: Props) {
  return (
    <span className={`${styles.tag} ${className ?? ""}`}>
      <span className={styles.code}>{code}</span>
      {label ? (
        <>
          <span className={styles.sep}>·</span>
          <span className={styles.label}>{label}</span>
        </>
      ) : null}
    </span>
  );
}
