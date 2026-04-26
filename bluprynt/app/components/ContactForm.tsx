"use client";

import { FormEvent, useState } from "react";
import styles from "./ContactForm.module.css";

type FormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

interface FormFields {
  name: string;
  email: string;
  company: string;
  message: string;
}

const INITIAL_FIELDS: FormFields = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });

  const handleChange =
    (key: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation (US-15 acceptance criteria)
    if (!fields.name.trim() || !fields.email.trim() || !fields.message.trim()) {
      setStatus({ kind: "error", message: "Please complete required fields" });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
      setStatus({ kind: "error", message: "Please enter a valid email" });
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus({ kind: "success" });
      setFields(INITIAL_FIELDS);
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  };

  // Status text shown in the bottom-left of the form
  const statusText = (() => {
    switch (status.kind) {
      case "idle":
        return "Ready to transmit";
      case "submitting":
        return "Transmitting…";
      case "success":
        return "Message received · we'll be in touch";
      case "error":
        return status.message;
    }
  })();

  const statusModifier =
    status.kind === "error"
      ? styles.statusError
      : status.kind === "success"
      ? styles.statusSuccess
      : "";

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="cf-name">
          Full name
        </label>
        <input
          className={styles.input}
          id="cf-name"
          name="name"
          type="text"
          placeholder="e.g. Jane Doe"
          value={fields.name}
          onChange={handleChange("name")}
          required
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor="cf-email">
          Email
        </label>
        <input
          className={styles.input}
          id="cf-email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          value={fields.email}
          onChange={handleChange("email")}
          required
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor="cf-company">
          Company <span className={styles.optional}>(optional)</span>
        </label>
        <input
          className={styles.input}
          id="cf-company"
          name="company"
          type="text"
          placeholder="Acme Engineering"
          value={fields.company}
          onChange={handleChange("company")}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor="cf-message">
          Message
        </label>
        <textarea
          className={styles.textarea}
          id="cf-message"
          name="message"
          placeholder="Tell us about the project — site, scope, timing, the decisions you're trying to get right."
          value={fields.message}
          onChange={handleChange("message")}
          required
        />
      </div>

      <div className={styles.submitRow}>
        <span className={`${styles.status} ${statusModifier}`} aria-live="polite">
          {statusText}
        </span>
        <button
          type="submit"
          className="btn-primary"
          style={{ border: "none", cursor: "pointer" }}
          disabled={status.kind === "submitting"}
        >
          {status.kind === "submitting" ? "Sending…" : "Submit enquiry →"}
        </button>
      </div>
    </form>
  );
}