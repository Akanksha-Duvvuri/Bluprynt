"use client";

import { useState } from "react";
import { SectionShell } from "@/app/components/SectionShell";
import styles from "./ContactPreview.module.css";

const PROJECT_TYPES = [
  { value: "", label: "Select a project type…" },
  { value: "bridge", label: "Bridge / structure" },
  { value: "transit", label: "Transit / rail" },
  { value: "water", label: "Water / utilities" },
  { value: "building", label: "Building / mixed-use" },
  { value: "other", label: "Other" },
] as const;

export default function ContactPreview() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Visual handler only — wire this to your form_submissions schema later.
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // TODO: replace with your existing submit action.
      // const fd = new FormData(e.currentTarget);
      // await submitContact(fd);
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="contact">
      <SectionShell
      code="A-006"
      label="--LETS TALK"
      tone="deep"
      eyebrow="Tell us about your project"
    >
      <div className={styles.split}>
        {/* ── Left: pitch ────────────────────────────────────────────── */}
        <div className={styles.col}>
          <h2 className={styles.heading}>
            Ready to cut preconstruction costs 
            without giving up control?{" "}
          </h2>
          <p className={styles.lede}>
            We'd rather earn your trust with one 
            deliverable than a pitch deck. 
            Start with the sample. Decide from there.
          </p>

          <ul className={styles.bullets}>
            <li>
              <span className={styles.bMark}>▸</span>
              <span>Send us your next bid package 
                or shop drawing scope. 
                  </span>
            </li>
            <li>
              <span className={styles.bMark}>▸</span>
              <span>We'll send back a sample 
                  in 48 hours. Samples on us.
                  </span>
            </li>
            <li>
              <span className={styles.bMark}>▸</span>
              <span>
                  We'll reply within two business days. You'll recieve an automated email soon. 
                </span>
            </li>
          </ul>
        </div>

        {/* ── Right: form ────────────────────────────────────────────── */}
        <div className={styles.col}>
          {submitted ? (
            <div className={styles.success}>
              <span className={styles.successCode}>RECEIVED · A-006</span>
              <h3 className={styles.successHead}>Brief received.</h3>
              <p className={styles.successBody}>
                We'll review and route to the right team within two business
                days. If your project is time-sensitive, mark{" "}
                <em>Urgent</em> in the subject of any follow-up email.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formHead}>
                <span className={styles.formTag}>BRIEF · INPUT FORM</span>
                <span className={styles.formRev}>REV 01</span>
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

              <div className={styles.row2}>
                <Field id="type" label="Project type">
                  <select
                    id="type"
                    name="type"
                    required
                    defaultValue=""
                    className={styles.input}
                  >
                    {PROJECT_TYPES.map((p) => (
                      <option key={p.value} value={p.value} disabled={p.value === ""}>
                        {p.label}
                      </option>
                    ))}
                  </select>
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
              </div>

              <Field id="message" label="Brief">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Project stage, scope, what you need from us… or any questions"
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
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ── Title block at the bottom ──────────────────────────────────
      <div className={styles.titleBlock}>
        <div className={styles.tbMain}>
          <span className={styles.tbBrand}>BLUPRYNT</span>
          <span className={styles.tbDot}>·</span>
          <span className={styles.tbTagline}>
            Engineering accuracy. Consulting excellence.
          </span>
        </div>

        <div className={styles.tbGrid}>
          <div className={styles.tbCell}>
            <span className={styles.tbK}>OFFICE 01</span>
            <span className={styles.tbV}>Hyderabad, IN</span>
            <span className={styles.tbSm}>hello@bluprynt.example</span>
          </div>
          <div className={styles.tbCell}>
            <span className={styles.tbK}>OFFICE 02</span>
            <span className={styles.tbV}>United States</span>
            <span className={styles.tbSm}>us@bluprynt.example</span>
          </div>
          <div className={styles.tbCell}>
            <span className={styles.tbK}>DISCIPLINE</span>
            <span className={styles.tbV}>Pre-construction</span>
            <span className={styles.tbSm}>Civil · Infrastructure</span>
          </div>
          <div className={styles.tbCell}>
            <span className={styles.tbK}>SHEET</span>
            <span className={styles.tbV}>A-006 / 06</span>
            <span className={styles.tbSm}>REV 01 · ISSUED FOR REVIEW</span>
          </div>
        </div>
      </div> */}
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
