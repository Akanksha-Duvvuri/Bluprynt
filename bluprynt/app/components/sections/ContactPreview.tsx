import Sheet from "../Sheet";
import { TitleBlock, SheetMeta } from "../TitleBlock";
import ContactForm from "../ContactForm";
import styles from "./ContactPreview.module.css";

interface ContactInfoBlock {
  label: string;
  value: React.ReactNode;
}

const CONTACT_INFO: ContactInfoBlock[] = [
  {
    label: "▸ Email",
    value: <a href="mailto:hello@bluprynt.com">hello@bluprynt.com</a>,
  },
  {
    label: "▸ Office",
    value: "Hyderabad · Remote-first · Worldwide engagements",
  },
  {
    label: "▸ Response time",
    value: "< 1 business day",
  },
  {
    label: "▸ Connect",
    value: (
      <>
        <a href="https://linkedin.com">LinkedIn</a> ·{" "}
        <a href="/reports">Reports</a>
      </>
    ),
  },
];

export default function ContactPreview() {
  return (
    <Sheet id="contact" variant="cream">
      <SheetMeta
        sheetCode="A-005"
        lines={["Layer · CONTACT", "Reply · < 1 business day"]}
      />
      <TitleBlock
        title="Bluprynt / Contact"
        rows={[
          { k: "Drwg No.", v: "BCG-005" },
          { k: "Sheet", v: "05 / 05" },
          { k: "Status", v: "OPEN" },
        ]}
      />

      <div className="sheet-body">
        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ A-005 · Start a project</div>
            <h2 className="title">
              Tell us
              <br />
              what you&apos;re <span className="em">building.</span>
            </h2>
          </div>
          <div className="section-head-right">
            One reply within a business day. If your message mentions a service
            area, you&apos;ll get a tailored FAQ alongside our reply.
          </div>
        </div>

        <div className={styles.wrap}>
          <ContactForm />

          <aside>
            {CONTACT_INFO.map((block) => (
              <div key={block.label} className={styles.infoBlock}>
                <div className={styles.infoLabel}>{block.label}</div>
                <div className={styles.infoValue}>{block.value}</div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </Sheet>
  );
}