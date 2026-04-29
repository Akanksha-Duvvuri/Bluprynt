import Link from "next/link";
import Sheet from "@/app/components/Sheet";
import { TitleBlock, SheetMeta } from "@/app/components/TitleBlock";

export default function ProjectNotFound() {
  return (
    <Sheet id="work" variant="cream">
      <SheetMeta
        sheetCode="A-002 / 404"
        lines={["Layer · WORK", "Status · NOT FOUND"]}
      />
      <TitleBlock
        title="Bluprynt / 404"
        rows={[
          { k: "Drwg No.", v: "404" },
          { k: "Status", v: "NOT FOUND" },
        ]}
      />

      <div className="sheet-body">
        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ Sheet not found</div>
            <h1 className="title">
              That drawing<br />
              isn&apos;t in <span className="em">the set.</span>
            </h1>
          </div>
          <div className="section-head-right">
            The project you&apos;re looking for either doesn&apos;t exist
            or has been moved. Browse the full archive to find what you need.
          </div>
        </div>

        <div className="section-foot">
          <Link href="/projects" className="text-link">
            ← All projects
          </Link>
        </div>
      </div>
    </Sheet>
  );
}