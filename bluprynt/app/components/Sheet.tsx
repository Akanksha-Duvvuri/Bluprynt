import { ReactNode } from "react"; 

//this is the bg that every section of the homepage uses. 

interface SheetProps {   //anyone calling sheet must pass in these values with these types
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
export default function Sheet({ //destructuring directly instead of writing function Sheet(props) {props.id, etc etc }
  id,
  variant,
  className = "",
  children,
}: SheetProps) {  //annotation on the destructured argument
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