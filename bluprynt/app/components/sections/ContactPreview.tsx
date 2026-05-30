"use client";

import { useState } from "react";
import { SectionShell } from "@/app/components/SectionShell";
import styles from "./ContactPreview.module.css";

/* List of services — checkbox values are the labels themselves so they
   submit cleanly as readable strings. */
const SERVICES = [
  "Concrete Takeoff & Estimation",
  "Rebar Shop Drawings",
  "Slab Edge & Dimensional Drawings",
  "Support of Excavation Takeoffs",
  "Submittal Coordination",
  "CMU Estimation",
  "Safety Drawings",
  "Window & Façade Detailing",
  "Other / Not sure yet",
];

/* ── Direct-contact directory ──────────────────────────────────────────
   REPLACE the placeholder numbers + emails with real values. */
const DIRECT = [
  {
    label: "US direct line",
    phone: { display: "+1 (646) 586 1213 ", tel: "+16465861213" },
  },
  {
    label: "Vivek (CEO)",
    whatsapp: { display: "+91 91000 07774 ", wa: "919100007774" },
    email: "vivek@blupryntconsulting.com",
  },
  {
    label: "Bharghav (CFO)",
    whatsapp: { display: "+91 91331 36353", wa: "+919133136353" },
    email: " bharghav@blupryntconsulting.com",
  },
  {
    label: "General inquiries",
    whatsapp: { display: "+91 9988 294296", wa: "+919988294296 " },
  },
];

export default function ContactPreview() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  function toggleService(s: string) {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // TODO: wire to your form submission endpoint
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="contact">
      <SectionShell code="A-007" label="LETS TALK" tone="deep" eyebrow="">
        <div className={styles.split}>
          {/* ── Left: pitch + direct contact ─────────────────────────────── */}
          <div className={styles.col}>
            <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} /> TELL US ABOUT YOUR PROJECT
               </p>
            <h2 className={styles.heading}>
              Ready to cut preconstruction costs without giving up control?
            </h2>
            <p className={styles.lede}>
              We&apos;d rather earn your trust with one deliverable than a
              pitch deck. Start with the sample. Decide from there.
            </p>

            <ul className={styles.bullets}>
              <li>
                <span className={styles.bMark}>▸</span>
                <span>
                  Send us your next bid package or shop drawing scope.
                </span>
              </li>
              <li>
                <span className={styles.bMark}>▸</span>
                <span>
                  We&apos;ll send back a sample in 48 hours. Samples on us.
                </span>
              </li>
            </ul>

            {/* ── Direct contact directory ── */}
            <div className={styles.direct}>
              <h3 className={styles.directHead}>
                Prefer to call or email directly?
              </h3>
              <ul className={styles.directList}>
                {DIRECT.map((d) => (
                  <li key={d.label} className={styles.directItem}>
                    <span className={styles.directMark}>▸</span>
                    <div className={styles.directBody}>
                      <span className={styles.directLabel}>{d.label}</span>
                      <div className={styles.directLinks}>
                        {d.phone && (
                          <a
                            href={`tel:${d.phone.tel}`}
                            className={styles.directLink}
                          >
                            <PhoneIcon />
                            <span>{d.phone.display}</span>
                          </a>
                        )}
                        {d.whatsapp && (
                          <a
                            href={`https://wa.me/${d.whatsapp.wa}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.directLink} ${styles.directLinkWa}`}
                          >
                            <WhatsAppIcon />
                            <span>{d.whatsapp.display}</span>
                          </a>
                        )}
                        {d.email && (
                          <a
                            href={`mailto:${d.email}`}
                            className={styles.directLink}
                          >
                            <EmailIcon />
                            <span>{d.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: form ────────────────────────────────────────────── */}
          <div className={styles.col}>
            {submitted ? (
              <div className={styles.success}>
                <span className={styles.successCode}>RECEIVED · A-007</span>
                <h3 className={styles.successHead}>Brief received.</h3>
                <p className={styles.successBody}>
                  We&apos;ll review and route to the right team within two
                  business days. You will receive an automated confirmation
                  email in the meantime.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formHead}>
                  <span className={styles.formTag}>PROJECT BRIEF</span>
                </div>

                <Field id="name" label="Name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={styles.input}
                  />
                </Field>

                <Field id="email" label="Email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={styles.input}
                  />
                </Field>

                <Field id="company" label="Company / org.">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={styles.input}
                  />
                </Field>

                <Field id="services" label="Services Required (select one or more)">
                  <div className={styles.checkboxes}>
                    {SERVICES.map((s) => {
                      const isSelected = selectedServices.includes(s);
                      return (
                        <label
                          key={s}
                          className={`${styles.checkbox} ${
                            isSelected ? styles.checkboxOn : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleService(s)}
                            className={styles.checkboxInput}
                          />
                          <span
                            className={styles.checkboxMark}
                            aria-hidden="true"
                          >
                            {isSelected && (
                              <svg viewBox="0 0 14 14" width="10" height="10">
                                <path
                                  d="M2 7l3.5 3.5L12 3.5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          <span className={styles.checkboxText}>{s}</span>
                        </label>
                      );
                    })}
                  </div>
                  {/* Hidden input that submits the joined services list */}
                  <input
                    type="hidden"
                    name="services"
                    value={selectedServices.join(", ")}
                  />
                </Field>

                <Field id="location" label="Location">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, country"
                    className={styles.input}
                  />
                </Field>

                <Field id="message" label="Brief">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Project stage, scope, what you need from us or any questions"
                    className={`${styles.input} ${styles.textarea}`}
                  />
                </Field>

                <div className={styles.formFoot}>
                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={submitting}
                  >
                    {submitting ? "Sending…" : "Send brief"}
                    <span className={styles.submitArrow}>→</span>
                  </button><br></br>
                </div>
                <p className={styles.reassure}>
                      We respond within one business day.
                      <span className={styles.reassureSep}> · </span>
                      Your scope stays confidential.
                    </p>
              </form>
            )}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}

/* ---------- Field wrapper ---------- */

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        <span className={styles.labelDot} aria-hidden="true" />
        {label}
      </label>
      {children}
    </div>
  );
}

/* ---------- Inline icons ---------- */

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}