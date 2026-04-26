interface TitleBlockRow {
  k: string;
  v: string;
}

interface TitleBlockProps {
  title: string;
  rows: TitleBlockRow[];
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
        <span className="arrow">▸</span>Sheet{" "}
        <span className="num">{sheetCode}</span>
      </div>
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
}