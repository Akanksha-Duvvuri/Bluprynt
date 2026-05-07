import { PageShell } from "@/components/cad/PageShell";
import styles from "./contact.module.css";

export const metadata = {
  title: "Start a project · Bluprynt",
  description:
    "Tell us about your project. We respond within two business days, US or India.",
};

export default function ContactPage() {
  return (
    <PageShell
      code="A-500"
      label="START A PROJECT"
      eyebrow="Two business days, either side of the Pacific"
      title={
        <>
          Tell us about the <em>project</em>.
        </>
      }
      lede="Below: a form, an email address, and our offices. The form goes to both partners. Whichever's awake first will reply."
      maxWidth={1200}
    >
      <div className={styles.layout}>
        {/* ===== Form column ============================================== */}
        <section className={styles.formCol} style={{ ['--i' as string]: 0 }}>
          <div className={styles.formCorners} aria-hidden="true">
            <span /><span /><span /><span />
          </div>

          <header className={styles.formHead}>
            <span className={styles.formTag}>FORM · 005.A</span>
            <span className={styles.formRev}>REV 01 · NEW INQUIRY</span>
          </header>

          <form className={styles.form} method="post" action="#">
            <Field
              num="01"
              label="Your name"
              hint="First and last is fine"
              required
            >
              <input type="text" name="name" required className={styles.input} />
            </Field>

            <Field num="02" label="Email" hint="We'll reply here" required>
              <input type="email" name="email" required className={styles.input} />
            </Field>

            <Field num="03" label="Organization" hint="Company, agency, or independent">
              <input type="text" name="organization" className={styles.input} />
            </Field>

            <Field num="04" label="Project type" hint="Pick the closest match">
              <div className={styles.radios}>
                {[
                  "Pre-construction feasibility",
                  "Cost estimation / tendering",
                  "Constructability review",
                  "Project controls",
                  "Owner's representative",
                  "Not sure yet",
                ].map((v) => (
                  <label key={v} className={styles.radio}>
                    <input type="radio" name="projectType" value={v} />
                    <span className={styles.radioMark} />
                    <span>{v}</span>
                  </label>
                ))}
              </div>
            </Field>

            <Field
              num="05"
              label="Tell us about it"
              hint="A paragraph is plenty. We'll ask follow-ups."
              required
            >
              <textarea
                name="message"
                rows={6}
                required
                className={styles.textarea}
              />
            </Field>

            <div className={styles.submitRow}>
              <span className={styles.submitNote}>
                You'll get an automatic confirmation. A real response within
                two business days.
              </span>
              <button type="submit" className={styles.submitBtn}>
                <span>Send inquiry</span>
                <span className={styles.submitArrow}>→</span>
              </button>
            </div>
          </form>
        </section>

        {/* ===== Sidebar column =========================================== */}
        <aside className={styles.sidebar}>
          {/* Direct email */}
          <div className={styles.aBlock} style={{ ['--i' as string]: 1 }}>
            <span className={styles.aK}>OR EMAIL DIRECTLY</span>
            <a
              href="mailto:hello@bluprynt.com"
              className={styles.email}
            >
              hello@bluprynt.com
            </a>
            <span className={styles.aSub}>
              Goes to both partners.
            </span>
          </div>

          {/* Response time */}
          <div className={styles.aBlock} style={{ ['--i' as string]: 2 }}>
            <span className={styles.aK}>RESPONSE TIME</span>
            <div className={styles.respGrid}>
              <div className={styles.respCell}>
                <span className={styles.respN}>2</span>
                <span className={styles.respL}>business days<br />typical reply</span>
              </div>
              <div className={styles.respCell}>
                <span className={styles.respN}>24h</span>
                <span className={styles.respL}>urgent inquiries<br />flag in subject</span>
              </div>
            </div>
          </div>

          {/* Offices */}
          <div className={styles.aBlock} style={{ ['--i' as string]: 3 }}>
            <span className={styles.aK}>OFFICES</span>
            <div className={styles.offices}>
              <Office
                n="01"
                city="Hyderabad"
                country="India"
                hours="MON–FRI · 09:00 – 19:00 IST"
              />
              <Office
                n="02"
                city="United States"
                country="—"
                hours="MON–FRI · 09:00 – 18:00 ET"
              />
            </div>
          </div>

          {/* Decorative status block */}
          <div className={styles.statusCard} style={{ ['--i' as string]: 4 }}>
            <div className={styles.statusRow}>
              <span className={styles.statusDot} />
              <span className={styles.statusLabel}>ACCEPTING NEW WORK</span>
            </div>
            <p className={styles.statusBody}>
              Currently booking pre-construction engagements for next quarter.
              Owner's-rep retainers on a rolling basis.
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

/* ---------- Field component ---------- */

function Field({
  num,
  label,
  hint,
  required,
  children,
}: {
  num: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldLabel}>
        <span className={styles.fieldN}>{num}</span>
        <span className={styles.fieldText}>
          {label}
          {required && <span className={styles.fieldReq}>*</span>}
        </span>
        {hint && <span className={styles.fieldHint}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Office({
  n,
  city,
  country,
  hours,
}: {
  n: string;
  city: string;
  country: string;
  hours: string;
}) {
  return (
    <div className={styles.office}>
      <span className={styles.officeN}>OFFICE {n}</span>
      <span className={styles.officeCity}>
        {city} <span className={styles.officeCountry}>· {country}</span>
      </span>
      <span className={styles.officeHours}>{hours}</span>
    </div>
  );
}