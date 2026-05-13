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
  tools: z.string().optional().nullable(),

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

/* ── SERVICE ───────────────────────────────────────────────── */
export const serviceFormSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug too long")
    .regex(slugRegex, "Slug must be lowercase letters, numbers, and hyphens only"),

  num: z.string().min(1, "Number is required (e.g. \"01\")").max(10),

  title: z.string().min(1, "Title is required").max(200),
  line: z.string().min(1, "One-line tagline is required").max(300),
  description: z.string().min(20, "Description needs at least 20 characters"),

  region: z.string().max(50).optional().nullable(),
  tag: z.string().max(200).optional().nullable(),
  category: z.string().max(100).optional().nullable(),

  // Form fields are comma-or-newline separated text; converted to arrays in the helper
  deliverables: z.string().optional().nullable(),
  whenToEngage: z.string().optional().nullable(),

  featured: z.boolean(),
  sortOrder: z
    .number()
    .int()
    .min(0, "Sort order must be 0 or higher")
    .max(9999),
});

export type ServiceFormInput = z.infer<typeof serviceFormSchema>;

/* ── HELPER: form data → DB shape for projects ───────────── */
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
    status: (row.status as ProjectFormInput["status"]) ?? "complete",
    client: (row.client as string) ?? "",
    location: (row.location as string) ?? "",
    tools: toolsStr,
    challenge: (row.challenge as string) ?? "",
    approach: (row.approach as string) ?? "",
    outcome: (row.outcome as string) ?? "",
    featured: Boolean(row.featured),
  };
}

/* ── HELPER: form data → DB shape for services ───────────── */
/**
 * Converts comma-or-newline separated form strings (e.g.
 * "Site report, Permitting matrix, Risk register") into the
 * JSON-encoded array the DB column expects.
 */
function splitListField(input: string | null | undefined): string[] {
  if (!input) return [];
  // Split on commas OR newlines, trim whitespace, drop empty entries
  return input
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function serviceFormToDbShape(input: ServiceFormInput) {
  const deliverablesArr = splitListField(input.deliverables);
  const whenToEngageArr = splitListField(input.whenToEngage);

  return {
    slug: input.slug.toLowerCase(),
    num: input.num,
    title: input.title,
    line: input.line,
    description: input.description,
    region: input.region || null,
    tag: input.tag || null,
    category: input.category || null,
    deliverables:
      deliverablesArr.length > 0 ? JSON.stringify(deliverablesArr) : null,
    whenToEngage:
      whenToEngageArr.length > 0 ? JSON.stringify(whenToEngageArr) : null,
    featured: input.featured,
    sortOrder: input.sortOrder,
  };
}

/* ── HELPER: DB row → form initial values for services ───── */
/**
 * Joins JSON-encoded arrays back into comma-separated strings
 * for display in form inputs.
 */
function joinListField(jsonStr: unknown): string {
  if (typeof jsonStr !== "string" || !jsonStr) return "";
  try {
    const arr = JSON.parse(jsonStr) as string[];
    return arr.join(", ");
  } catch {
    return "";
  }
}

export function serviceDbToFormShape(
  row: Record<string, unknown>
): Partial<ServiceFormInput> {
  return {
    slug: (row.slug as string) ?? "",
    num: (row.num as string) ?? "",
    title: (row.title as string) ?? "",
    line: (row.line as string) ?? "",
    description: (row.description as string) ?? "",
    region: (row.region as string) ?? "",
    tag: (row.tag as string) ?? "",
    category: (row.category as string) ?? "",
    deliverables: joinListField(row.deliverables),
    whenToEngage: joinListField(row.whenToEngage),
    featured: Boolean(row.featured),
    sortOrder: (row.sortOrder as number) ?? 0,
  };
}
