import type { Metadata } from "next";
import Sheet from "@/app/components/Sheet";
import { TitleBlock, SheetMeta } from "@/app/components/TitleBlock";
import ContactForm from "@/app/components/ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're building. One reply within a business day. If your message mentions a service area, you'll get a tailored FAQ alongside our reply.",
};

export default function ContactPage() {
  return (
    <Sheet id="contact" variant="dark">
      <SheetMeta
        sheetCode="A-005"
        lines={["Layer · CONTACT", "Reply · < 1 business day", "Status · OPEN"]}
      />
      <TitleBlock
        title="Bluprynt / Contact"
        rows={[
          { k: "Drwg No.", v: "BCG-005" },
          { k: "Sheet", v: "01 / 01" },
          { k: "Status", v: "OPEN" },
        ]}
      />

      <div className="sheet-body">
        <div className="section-head">
          <div className="section-head-left">
            <div className="label">▸ A-005 · Start a project</div>
            <h1 className="title">
              Tell us<br />
              what you&apos;re <span className="em">building.</span>
            </h1>
          </div>
          <div className="section-head-right">
            One reply within a business day. If your message mentions a
            service area, you&apos;ll get a tailored FAQ alongside our
            personal reply.
          </div>
        </div>

        <div className={styles.wrap}>
          <ContactForm />

          <aside className={styles.info}>
            <div className={styles.block}>
              <div className={styles.label}>▸ Email</div>
              <div className={styles.value}>
                <a href="mailto:hello@bluprynt.com">hello@bluprynt.com</a>
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.label}>▸ Office</div>
              <div className={styles.value}>
                Hyderabad, India<br />
                Remote-first
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.label}>▸ Engagement region</div>
              <div className={styles.value}>Worldwide</div>
            </div>

            <div className={styles.block}>
              <div className={styles.label}>▸ Response time</div>
              <div className={styles.value}>&lt; 1 business day</div>
            </div>

            <div className={styles.block}>
              <div className={styles.label}>▸ What happens next</div>
              <ol className={styles.steps}>
                <li>You submit the form.</li>
                <li>You receive an automated confirmation with a tailored FAQ for your service area.</li>
                <li>One of the founders replies personally within a business day.</li>
              </ol>
            </div>

            <div className={styles.block}>
              <div className={styles.label}>▸ Connect</div>
              <div className={styles.value}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Sheet>
  );
}