"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { projectFormSchema, type ProjectFormInput } from "@/lib/validation";
import styles from "./form.module.css";

interface ProjectFormProps {
  /** Mode — controls submit endpoint + button label */
  mode: "create" | "edit";
  /** ID of the project being edited (only in edit mode) */
  projectId?: number;
  /** Initial form values — empty for create, prefilled for edit */
  initialValues?: Partial<ProjectFormInput>;
}

/**
 * ProjectForm — reusable form for create and edit.
 *
 * Local state holds the form values; on submit, we run client-side
 * Zod validation, then POST/PATCH to the API. On success, redirect
 * back to the list.
 *
 * The same component drives /admin/projects/new and /admin/projects/[id]/edit
 * — only the mode and initialValues differ.
 */
export default function ProjectForm({
  mode,
  projectId,
  initialValues = {},
}: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form state
  const [values, setValues] = useState<Partial<ProjectFormInput>>({
    slug: "",
    num: "",
    name: "",
    nameEm: "",
    sector: "",
    year: new Date().getFullYear(),
    scope: "",
    status: "complete",
    client: "",
    location: "",
    tools: "",
    challenge: "",
    approach: "",
    outcome: "",
    featured: false,
    ...initialValues,
  });

  function update<K extends keyof ProjectFormInput>(
    key: K,
    value: ProjectFormInput[K]
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

  // Robust year handler — never lets NaN into state.
  function updateYear(raw: string) {
    if (raw === "") {
      update("year", undefined as unknown as ProjectFormInput["year"]);
      return;
    }
    const n = Number(raw);
    if (Number.isFinite(n)) {
      update("year", n as ProjectFormInput["year"]);
    }
  }

  // Auto-generate slug from name when creating
  function onNameBlur() {
    if (mode === "create" && !values.slug && values.name) {
      const auto = `${values.name} ${values.nameEm ?? ""}`
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      if (auto) update("slug", auto);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setErrors({});

    console.log("VALUES BEFORE VALIDATION:", values);

    const parsed = projectFormSchema.safeParse(values);

    console.log("VALIDATION RESULT:", parsed);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((iss) => {
        const path = iss.path.join(".");
        if (path && !fieldErrors[path]) fieldErrors[path] = iss.message;
      });
      setErrors(fieldErrors);

      // Surface a banner so the user can never silently fail save.
      // Also lists exactly which fields are blocking.
      const failedFields = Object.keys(fieldErrors).join(", ");
      setSubmitError(
        failedFields
          ? `Save blocked by validation. Check these fields: ${failedFields}`
          : "Validation failed."
      );
      return;
    }

    setSubmitting(true);
    try {
      const url =
        mode === "create"
          ? "/api/admin/projects"
          : `/api/admin/projects/${projectId}`;

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

      // Success — go back to the list and refresh
      startTransition(() => {
        router.push("/admin/projects");
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
        <div className={styles.sectionLabel}>▸ Identification</div>

        <div className={styles.grid2}>
          <Field
            label="Project number"
            hint='e.g. "P-024 / 2025"'
            error={errors.num}
            id="num"
          >
            <input
              id="num"
              type="text"
              value={values.num ?? ""}
              onChange={(e) => update("num", e.target.value)}
              className={styles.input}
            />
          </Field>

          <Field label="Year" error={errors.year} id="year">
            <input
              id="year"
              type="number"
              value={values.year ?? ""}
              onChange={(e) => updateYear(e.target.value)}
              className={styles.input}
            />
          </Field>
        </div>

        <div className={styles.grid2}>
          <Field
            label="Name (plain part)"
            hint="The portion BEFORE the gold-highlighted word"
            error={errors.name}
            id="name"
          >
            <input
              id="name"
              type="text"
              value={values.name ?? ""}
              onChange={(e) => update("name", e.target.value)}
              onBlur={onNameBlur}
              className={styles.input}
              placeholder="e.g. &quot;Eastwood &quot; (with trailing space)"
            />
          </Field>

          <Field
            label="Name (highlighted)"
            hint="The gold-coloured ending — leave blank if none"
            error={errors.nameEm}
            id="nameEm"
          >
            <input
              id="nameEm"
              type="text"
              value={values.nameEm ?? ""}
              onChange={(e) => update("nameEm", e.target.value)}
              className={styles.input}
              placeholder='e.g. "Viaduct"'
            />
          </Field>
        </div>

        <Field
          label="URL slug"
          hint="Lowercase, hyphenated. Becomes /work/[slug]. Auto-generated from name on create."
          error={errors.slug}
          id="slug"
        >
          <input
            id="slug"
            type="text"
            value={values.slug ?? ""}
            onChange={(e) => update("slug", e.target.value.toLowerCase())}
            className={styles.input}
            disabled={mode === "edit"}
            placeholder="eastwood-viaduct"
          />
          {mode === "edit" && (
            <span className={styles.lockedNote}>
              Slug is locked after creation — changing it would break links.
            </span>
          )}
        </Field>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>▸ Classification</div>

        <div className={styles.grid2}>
          <Field
            label="Sector"
            hint='e.g. "Structural · Feasibility"'
            error={errors.sector}
            id="sector"
          >
            <input
              id="sector"
              type="text"
              value={values.sector ?? ""}
              onChange={(e) => update("sector", e.target.value)}
              className={styles.input}
            />
          </Field>

          <Field
            label="Scope"
            hint='Short summary, e.g. "3-span · 240m"'
            error={errors.scope}
            id="scope"
          >
            <input
              id="scope"
              type="text"
              value={values.scope ?? ""}
              onChange={(e) => update("scope", e.target.value)}
              className={styles.input}
            />
          </Field>
        </div>

        <Field label="Status" error={errors.status} id="status">
          <select
            id="status"
            value={values.status ?? "complete"}
            onChange={(e) =>
              update("status", e.target.value as ProjectFormInput["status"])
            }
            className={styles.input}
          >
            <option value="live">Live</option>
            <option value="review">Review</option>
            <option value="complete">Complete</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </Field>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>▸ Optional metadata</div>

        <div className={styles.grid2}>
          <Field label="Client" hint="Or 'Anonymised'" id="client">
            <input
              id="client"
              type="text"
              value={values.client ?? ""}
              onChange={(e) => update("client", e.target.value)}
              className={styles.input}
            />
          </Field>

          <Field label="Location" id="location">
            <input
              id="location"
              type="text"
              value={values.location ?? ""}
              onChange={(e) => update("location", e.target.value)}
              className={styles.input}
              placeholder="e.g. Hyderabad, IN"
            />
          </Field>
        </div>

        <Field
          label="Tools"
          hint="Comma-separated, e.g. ETABS, Revit, Civil 3D"
          id="tools"
        >
          <input
            id="tools"
            type="text"
            value={values.tools ?? ""}
            onChange={(e) => update("tools", e.target.value)}
            className={styles.input}
          />
        </Field>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>▸ Case study</div>

        <Field
          label="Challenge"
          hint="Long-form. What was the problem the client brought to you?"
          error={errors.challenge}
          id="challenge"
        >
          <textarea
            id="challenge"
            value={values.challenge ?? ""}
            onChange={(e) => update("challenge", e.target.value)}
            className={styles.textarea}
            rows={5}
          />
        </Field>

        <Field
          label="Approach"
          hint="Long-form. What did you do?"
          error={errors.approach}
          id="approach"
        >
          <textarea
            id="approach"
            value={values.approach ?? ""}
            onChange={(e) => update("approach", e.target.value)}
            className={styles.textarea}
            rows={5}
          />
        </Field>

        <Field
          label="Outcome"
          hint="Long-form. What was the result?"
          error={errors.outcome}
          id="outcome"
        >
          <textarea
            id="outcome"
            value={values.outcome ?? ""}
            onChange={(e) => update("outcome", e.target.value)}
            className={styles.textarea}
            rows={5}
          />
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
      </div>

      {submitError && (
        <div className={styles.error}>
          <span className={styles.errorTag}>FLAGGED</span>
          {submitError}
        </div>
      )}

      <div className={styles.actions}>
        <Link href="/admin/projects" className={styles.cancelBtn}>
          Cancel
        </Link>
        <button type="submit" disabled={busy} className={styles.submitBtn}>
          {busy
            ? "Saving…"
            : mode === "create"
              ? "Create project →"
              : "Save changes →"}
        </button>
      </div>
    </form>
  );
}

/* Small Field wrapper */
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