interface TitleBlockRow {  //key and value pair 0 describes one row of the title block
  k: string;
  v: string;
}

interface TitleBlockProps {
  title: string;  //bluprynt / home
  rows: TitleBlockRow[]; //array of titleblockrow objects. so rows must be a list and every list should match the k and v shape
}

/**
 * TitleBlock — the drafting-style title block that sits in the
 * top-right corner of every sheet. Title + 2-column key/value rows.
 */
export function TitleBlock({ title, rows }: TitleBlockProps) {
  return (
    <div className="titleblock">
      <div className="tb-title">{title}</div>
      {rows.map((row) => (
        <div key={row.k} className="tb-row">
          <div className="tb-k">{row.k}</div>
          <div className="tb-v">{row.v}</div>
        </div>
      ))}
    </div>
  );
}

interface SheetMetaProps {
  sheetCode: string;
  lines: string[];
}

/**
 * SheetMeta — the small metadata block in the top-left of every sheet.
 * First line shows the sheet code (e.g. "Sheet A-001"), rest are free text.
 */
export function SheetMeta({ sheetCode, lines }: SheetMetaProps) {
  return (
    <div className="sheet-meta">
      <div>
        <span className="arrow">▸</span>Sheet{" "} {/*forces a whitespace - JSX collapses whitespaces bw tags but this forces a literal space to render*/}
        <span className="num">{sheetCode}</span>
      </div>
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
}


//theres no default infront of these functions - both are equally important side by side