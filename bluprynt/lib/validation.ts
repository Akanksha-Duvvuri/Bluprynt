import { z } from "zod";

/**
 * ──────────────────────────────────────────────────────────────
 * VALIDATION SCHEMAS — shared between client and server.
 *
 * Used by:
 *   - The forms (client) for inline validation feedback
 *   - The API routes (server) to verify what came in over the wire
 *
 * Single source of truth. Change a constraint here and both sides
 * pick it up.
 * ──────────────────────────────────────────────────────────────
 */

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/* ── PROJECT ──────────────────────────────────────────────── */
export const projectFormSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug too long")
    .regex(slugRegex, "Slug must be lowercase letters, numbers, and hyphens only"),

  num: z.string().min(1, "Project number is required").max(50),

  name: z.string().min(1, "Name is required").max(200),
  nameEm: z.string().min(1, "Highlighted suffix is required").max(200),

  sector: z.string().min(1, "Sector is required").max(100),

  year: z
    .number({ error: "Year must be a number" })
    .int("Year must be a whole number")
    .min(1900, "Year too early")
    .max(2100, "Year too far in the future"),

  scope: z.string().min(1, "Scope is required").max(200),

  status: z.enum(["live", "review", "complete", "ongoing"]),

  client: z.string().max(200).optional().nullable(),
  location: z.string().max(200).optional().nullable(),
  tools: z.string().optional().nullable(), // comma-separated input

  challenge: z.string().min(20, "Challenge needs at least 20 characters"),
  approach: z.string().min(20, "Approach needs at least 20 characters"),
  outcome: z.string().min(20, "Outcome needs at least 20 characters"),

  featured: z.boolean(),
});

export type ProjectFormInput = z.infer<typeof projectFormSchema>;

/* ── TESTIMONIAL ──────────────────────────────────────────── */
export const testimonialFormSchema = z.object({
  quote: z.string().min(20, "Quote needs at least 20 characters").max(2000),

  authorName: z.string().min(1, "Name is required").max(200),
  authorTitle: z.string().max(200).optional().nullable(),
  authorCompany: z.string().max(200).optional().nullable(),

  relatedProjectSlug: z.string().max(100).optional().nullable(),

  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: z
    .number()
    .int()
    .min(0, "Sort order must be 0 or higher")
    .max(9999),
});

export type TestimonialFormInput = z.infer<typeof testimonialFormSchema>;

/* ── HELPER: form data → DB shape for projects ───────────── */
/**
 * Converts the form-friendly tools string ("ETABS, Revit, Civil 3D")
 * into the JSON-encoded array the DB column expects.
 */
export function projectFormToDbShape(input: ProjectFormInput) {
  const toolsArr = input.tools
    ? input.tools
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return {
    slug: input.slug.toLowerCase(),
    num: input.num,
    name: input.name,
    nameEm: input.nameEm,
    sector: input.sector,
    year: input.year,
    scope: input.scope,
    status: input.status,
    client: input.client || null,
    location: input.location || null,
    tools: toolsArr.length > 0 ? JSON.stringify(toolsArr) : null,
    challenge: input.challenge,
    approach: input.approach,
    outcome: input.outcome,
    featured: input.featured,
  };
}

/* ── HELPER: DB row → form initial values ─────────────────── */
/**
 * Converts a row from the DB into the shape the form expects.
 * Inverse of projectFormToDbShape.
 */
export function projectDbToFormShape(
  row: Record<string, unknown>
): Partial<ProjectFormInput> {
  let toolsStr = "";
  if (typeof row.tools === "string" && row.tools) {
    try {
      const arr = JSON.parse(row.tools) as string[];
      toolsStr = arr.join(", ");
    } catch {
      toolsStr = "";
    }
  }

  return {
    slug: (row.slug as string) ?? "",
    num: (row.num as string) ?? "",
    name: (row.name as string) ?? "",
    nameEm: (row.nameEm as string) ?? "",
    sector: (row.sector as string) ?? "",
    year: (row.year as number) ?? new Date().getFullYear(),
    scope: (row.scope as string) ?? "",
    status:
      (row.status as ProjectFormInput["status"]) ?? "complete",
    client: (row.client as string) ?? "",
    location: (row.location as string) ?? "",
    tools: toolsStr,
    challenge: (row.challenge as string) ?? "",
    approach: (row.approach as string) ?? "",
    outcome: (row.outcome as string) ?? "",
    featured: Boolean(row.featured),
  };
}