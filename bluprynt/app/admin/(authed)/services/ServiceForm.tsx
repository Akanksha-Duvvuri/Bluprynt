"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  serviceFormSchema,
  type ServiceFormInput,
} from "@/lib/validation";

interface ServiceFormProps {
  /** When provided, the form is in edit mode (PATCH endpoint, slug locked) */
  service?: {
    id: number;
    slug: string;
    num: string;
    title: string;
    line: string;
    description: string;
    region: string | null;
    tag: string | null;
    category: string | null;
    deliverables: string;     // already-joined string from helper
    whenToEngage: string;     // already-joined string from helper
    featured: boolean;
    sortOrder: number;
  };
}

const EMPTY: ServiceFormInput = {
  slug: "",
  num: "",
  title: "",
  line: "",
  description: "",
  region: "",
  tag: "",
  category: "",
  deliverables: "",
  whenToEngage: "",
  featured: false,
  sortOrder: 0,
};

export default function ServiceForm({ service }: ServiceFormProps) {
  const isEdit = !!service;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const [values, setValues] = useState<ServiceFormInput>(() => {
    if (!service) return EMPTY;
    return {
      slug: service.slug,
      num: service.num,
      title: service.title,
      line: service.line,
      description: service.description,
      region: service.region ?? "",
      tag: service.tag ?? "",
      category: service.category ?? "",
      deliverables: service.deliverables ?? "",
      whenToEngage: service.whenToEngage ?? "",
      featured: service.featured,
      sortOrder: service.sortOrder,
    };
  });

  function setField<K extends keyof ServiceFormInput>(
    key: K,
    val: ServiceFormInput[K]
  ) {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key as string]) {
      setErrors((e) => {
        const copy = { ...e };
        delete copy[key as string];
        return copy;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    // Client-side validation using the shared schema
    const parsed = serviceFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0];
        if (typeof path === "string") fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const url = isEdit
        ? `/api/admin/services/${service.id}`
        : "/api/admin/services";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Save failed");
      }

      startTransition(() => {
        router.push("/admin/services");
        router.refresh();
      });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  const disabled = submitting || isPending;

  return (
    <form onSubmit={handleSubmit} className="serviceForm">
      <style>{`
        .serviceForm {
          display: flex;
          flex-direction: column;
          gap: 26px;
          max-width: 760px;
        }
        .fieldRow {
          display: grid;
          grid-template-columns: 1fr;
          gap: 26px;
        }
        @media (min-width: 700px) {
          .fieldRow.cols2 { grid-template-columns: 1fr 1fr; }
          .fieldRow.cols3 { grid-template-columns: 1fr 1fr 1fr; }
        }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .label {
          font-family: var(--mono);
          font-size: 10px;
          color: var(--gold);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .hint {
          font-family: var(--secondary);
          font-size: 11px;
          color: rgba(255, 238, 198, 0.5);
          line-height: 1.4;
        }
        .input, .textarea, .select {
          font-family: var(--mono);
          font-size: 13px;
          color: var(--cream);
          background: rgba(13, 12, 8, 0.6);
          border: 1px solid rgba(196, 165, 100, 0.25);
          padding: 12px 14px;
          border-radius: 2px;
          width: 100%;
          letter-spacing: 0.02em;
          transition: border-color 180ms ease-out;
        }
        .input:focus, .textarea:focus, .select:focus {
          outline: none;
          border-color: var(--gold);
        }
        .input:disabled { opacity: 0.5; cursor: not-allowed; }
        .textarea { resize: vertical; min-height: 90px; font-family: var(--secondary); font-size: 14px; line-height: 1.55; }
        .textarea.tall { min-height: 140px; }
        .error {
          font-family: var(--mono);
          font-size: 10px;
          color: var(--red, #C16565);
          letter-spacing: 0.08em;
        }
        .checkboxRow {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px;
          background: rgba(13, 12, 8, 0.4);
          border: 1px solid rgba(196, 165, 100, 0.15);
          border-radius: 2px;
          cursor: pointer;
        }
        .checkboxRow input { width: 16px; height: 16px; cursor: pointer; accent-color: var(--gold); }
        .checkboxLabel { font-family: var(--mono); font-size: 11px; color: var(--cream); letter-spacing: 0.06em; }
        .actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px dashed rgba(196, 165, 100, 0.2);
        }
        .submit, .cancel {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 12px 22px;
          border-radius: 2px;
          cursor: pointer;
          font-weight: 700;
          transition: filter 180ms, transform 180ms;
        }
        .submit { background: var(--gold); color: var(--ink); border: 1px solid var(--gold); }
        .submit:hover:not(:disabled) { filter: brightness(1.08); transform: translateY(-1px); }
        .submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .cancel {
          background: transparent;
          color: rgba(255, 238, 198, 0.75);
          border: 1px solid rgba(196, 165, 100, 0.3);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .cancel:hover { background: rgba(196, 165, 100, 0.06); color: var(--cream); }
        .serverError {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--red, #C16565);
          padding: 10px 14px;
          background: rgba(193, 101, 101, 0.08);
          border: 1px solid rgba(193, 101, 101, 0.3);
          border-radius: 2px;
        }
        .locked {
          padding: 8px 12px;
          background: rgba(196, 165, 100, 0.05);
          border: 1px dashed rgba(196, 165, 100, 0.2);
          border-radius: 2px;
          font-family: var(--mono);
          font-size: 12px;
          color: rgba(255, 238, 198, 0.8);
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* ── Identification ── */}
      <div className="fieldRow cols2">
        <div className="field">
          <label className="label" htmlFor="slug">Slug</label>
          {isEdit ? (
            <div className="locked">{values.slug}</div>
          ) : (
            <input
              id="slug"
              className="input"
              type="text"
              value={values.slug}
              onChange={(e) => setField("slug", e.target.value)}
              placeholder="e.g. preconstruction-feasibility"
              disabled={disabled}
            />
          )}
          {isEdit && (
            <span className="hint">
              Slug is locked after creation — changing it would break URLs.
            </span>
          )}
          {errors.slug && <span className="error">{errors.slug}</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="num">Number</label>
          <input
            id="num"
            className="input"
            type="text"
            value={values.num}
            onChange={(e) => setField("num", e.target.value)}
            placeholder='e.g. "01"'
            disabled={disabled}
          />
          {errors.num && <span className="error">{errors.num}</span>}
        </div>
      </div>

      {/* ── Display ── */}
      <div className="field">
        <label className="label" htmlFor="title">Title</label>
        <input
          id="title"
          className="input"
          type="text"
          value={values.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="e.g. Pre-construction Feasibility"
          disabled={disabled}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="line">One-line tagline</label>
        <input
          id="line"
          className="input"
          type="text"
          value={values.line}
          onChange={(e) => setField("line", e.target.value)}
          placeholder="Short summary, shown on cards"
          disabled={disabled}
        />
        {errors.line && <span className="error">{errors.line}</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="description">Description</label>
        <textarea
          id="description"
          className="textarea tall"
          value={values.description}
          onChange={(e) => setField("description", e.target.value)}
          placeholder="Long-form description for the detail page"
          disabled={disabled}
        />
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
      </div>

      {/* ── Metadata ── */}
      <div className="fieldRow cols3">
        <div className="field">
          <label className="label" htmlFor="region">Region</label>
          <input
            id="region"
            className="input"
            type="text"
            value={values.region ?? ""}
            onChange={(e) => setField("region", e.target.value)}
            placeholder='e.g. "US · IN"'
            disabled={disabled}
          />
          {errors.region && <span className="error">{errors.region}</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="category">Category</label>
          <input
            id="category"
            className="input"
            type="text"
            value={values.category ?? ""}
            onChange={(e) => setField("category", e.target.value)}
            placeholder='e.g. "Strategy"'
            disabled={disabled}
          />
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="sortOrder">Sort order</label>
          <input
            id="sortOrder"
            className="input"
            type="number"
            value={values.sortOrder}
            onChange={(e) =>
              setField("sortOrder", parseInt(e.target.value, 10) || 0)
            }
            disabled={disabled}
          />
          <span className="hint">Lower numbers come first. Use 10/20/30…</span>
          {errors.sortOrder && (
            <span className="error">{errors.sortOrder}</span>
          )}
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="tag">Tag (mono caption)</label>
        <input
          id="tag"
          className="input"
          type="text"
          value={values.tag ?? ""}
          onChange={(e) => setField("tag", e.target.value)}
          placeholder='e.g. "DELIVERABLE · FEASIBILITY DECK"'
          disabled={disabled}
        />
        {errors.tag && <span className="error">{errors.tag}</span>}
      </div>

      {/* ── Lists ── */}
      <div className="field">
        <label className="label" htmlFor="deliverables">Deliverables</label>
        <textarea
          id="deliverables"
          className="textarea"
          value={values.deliverables ?? ""}
          onChange={(e) => setField("deliverables", e.target.value)}
          placeholder="Site assessment report, Regulatory matrix, Risk register"
          disabled={disabled}
        />
        <span className="hint">
          Comma or new-line separated. Each item shows as a bullet on the
          detail page.
        </span>
        {errors.deliverables && (
          <span className="error">{errors.deliverables}</span>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="whenToEngage">When to engage</label>
        <textarea
          id="whenToEngage"
          className="textarea"
          value={values.whenToEngage ?? ""}
          onChange={(e) => setField("whenToEngage", e.target.value)}
          placeholder="Before site selection, Sanity check on scope, Before issuing design RFP"
          disabled={disabled}
        />
        <span className="hint">
          Trigger scenarios. Comma or new-line separated.
        </span>
        {errors.whenToEngage && (
          <span className="error">{errors.whenToEngage}</span>
        )}
      </div>

      {/* ── Featured ── */}
      <label className="checkboxRow">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(e) => setField("featured", e.target.checked)}
          disabled={disabled}
        />
        <span className="checkboxLabel">
          Featured on homepage Services preview
        </span>
      </label>

      {/* ── Errors + Actions ── */}
      {serverError && <div className="serverError">{serverError}</div>}

      <div className="actions">
        <button type="submit" className="submit" disabled={disabled}>
          {disabled ? "Saving…" : isEdit ? "Save changes →" : "Create service →"}
        </button>
        <a href="/admin/services" className="cancel">
          Cancel
        </a>
      </div>
    </form>
  );
}
