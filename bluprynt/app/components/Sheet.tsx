import { ReactNode } from "react";

interface SheetProps {
  /** Section ID — must match an entry in Crosshair's SHEET_MAP */
  id: string;
  /** Visual variant — alternates down the homepage */
  variant: "dark" | "cream";
  /** Optional extra class on the section element */
  className?: string;
  /** Section content */
  children: ReactNode;
}

/**
 * Sheet — base wrapper for every section on the site.
 * Renders the faint default grid, the bright spotlight grid, the wash,
 * and corner ticks. Children render on top via z-index in their own styles.
 */
export default function Sheet({
  id,
  variant,
  className = "",
  children,
}: SheetProps) {
  return (
    <section
      id={id}
      className={`sheet sheet-${variant} ${className}`.trim()}
    >
      <div className="drawing-base" />
      <div className="drawing-bright">
        <div className="grid-fine" />
        <div className="grid-coarse" />
      </div>
      <div className="spot-wash" />

      <div className="corner-tick tl" />
      <div className="corner-tick tr" />
      <div className="corner-tick bl" />
      <div className="corner-tick br" />

      {children}
    </section>
  );
}