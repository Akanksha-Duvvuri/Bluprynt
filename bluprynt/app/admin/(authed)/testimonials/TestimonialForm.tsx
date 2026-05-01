"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  testimonialFormSchema,
  type TestimonialFormInput,
} from "@/lib/validation";
import styles from "../projects/form.module.css";

interface TestimonialFormProps {
  mode: "create" | "edit";
  testimonialId?: number;
  initialValues?: Partial<TestimonialFormInput>;
  /** Project slugs available for linking */
  projectSlugs?: string[];
}

export default function TestimonialForm({
  mode,
  testimonialId,
  initialValues = {},
  projectSlugs = [],
}: TestimonialFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [values, setValues] = useState<Partial<TestimonialFormInput>>({
    quote: "",
    authorName: "",
    authorTitle: "",
    authorCompany: "",
    relatedProjectSlug: "",
    featured: false,
    published: true,
    sortOrder: 0,
    ...initialValues,
  });

  function update<K extends keyof TestimonialFormInput>(
    key: K,
    value: TestimonialFormInput[K]
  ) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) {
      setErrors((e) => {
        const copy = { ...e };
        delete copy[key];
        return copy;
      });
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setErrors({});

    const parsed = testimonialFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((iss) => {
        const path = iss.path.join(".");
        if (path && !fieldErrors[path]) fieldErrors[path] = iss.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const url =
        mode === "create"
          ? "/api/admin/testimonials"
          : `/api/admin/testimonials/${testimonialId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed: ${res.status}`);
      }

      startTransition(() => {
        router.push("/admin/testimonials");
        router.refresh();
      });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Save failed");
      setSubmitting(false);
    }
  }

  const busy = submitting || isPending;

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      <div className={styles.section}>
        <div className={styles.sectionLabel}>▸ The quote</div>

        <Field
          label="Quote"
          hint="The actual testimonial. Keep punctuation natural — we'll add the quote marks in display."
          error={errors.quote}
          id="quote"
        >
          <textarea
            id="quote"
            value={values.quote ?? ""}
            onChange={(e) => update("quote", e.target.value)}
            className={styles.textarea}
            rows={6}
          />
        </Field>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>▸ Attribution</div>

        <Field
          label="Author name"
          error={errors.authorName}
          id="authorName"
        >
          <input
            id="authorName"
            type="text"
            value={values.authorName ?? ""}
            onChange={(e) => update("authorName", e.target.value)}
            className={styles.input}
          />
        </Field>

        <div className={styles.grid2}>
          <Field
            label="Author title"
            hint='e.g. "Director of Infrastructure"'
            id="authorTitle"
          >
            <input
              id="authorTitle"
              type="text"
              value={values.authorTitle ?? ""}
              onChange={(e) => update("authorTitle", e.target.value)}
              className={styles.input}
            />
          </Field>

          <Field
            label="Author company"
            hint="Or anonymised label"
            id="authorCompany"
          >
            <input
              id="authorCompany"
              type="text"
              value={values.authorCompany ?? ""}
              onChange={(e) => update("authorCompany", e.target.value)}
              className={styles.input}
            />
          </Field>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>▸ Linking</div>

        <Field
          label="Related project"
          hint="Optional. Link this testimonial to one of your case studies."
          id="relatedProjectSlug"
        >
          <select
            id="relatedProjectSlug"
            value={values.relatedProjectSlug ?? ""}
            onChange={(e) => update("relatedProjectSlug", e.target.value)}
            className={styles.input}
          >
            <option value="">— None —</option>
            {projectSlugs.map((slug) => (
              <option key={slug} value={slug}>
                /projects/{slug}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>▸ Display</div>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={values.featured ?? false}
            onChange={(e) => update("featured", e.target.checked)}
          />
          <span>Featured on the homepage</span>
        </label>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={values.published ?? true}
            onChange={(e) => update("published", e.target.checked)}
          />
          <span>Published (uncheck to hide without deleting)</span>
        </label>

        <Field
          label="Sort order"
          hint="Lower numbers show first. Use round numbers (10, 20, 30…) so it's easy to insert in between later."
          error={errors.sortOrder}
          id="sortOrder"
        >
          <input
            id="sortOrder"
            type="number"
            value={values.sortOrder ?? 0}
            onChange={(e) =>
              update("sortOrder", parseInt(e.target.value, 10) || 0)
            }
            className={styles.input}
          />
        </Field>
      </div>

      {submitError && (
        <div className={styles.error}>
          <span className={styles.errorTag}>FLAGGED</span>
          {submitError}
        </div>
      )}

      <div className={styles.actions}>
        <Link href="/admin/testimonials" className={styles.cancelBtn}>
          Cancel
        </Link>
        <button type="submit" disabled={busy} className={styles.submitBtn}>
          {busy
            ? "Saving…"
            : mode === "create"
              ? "Create testimonial →"
              : "Save changes →"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  id,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        ▸ {label}
      </label>
      <div className={styles.fieldBody}>{children}</div>
      {hint && !error && <div className={styles.hint}>{hint}</div>}
      {error && <div className={styles.fieldError}>{error}</div>}
    </div>
  );
}