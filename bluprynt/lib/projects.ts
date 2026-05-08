/**
 * ──────────────────────────────────────────────────────────────
 * lib/projects.ts — DATABASE-BACKED VERSION
 *
 * This used to be a static TypeScript array. After Phase 1 it
 * fetches from Postgres via Drizzle.
 *
 * The functions returned by this module match the OLD signatures
 * (getFeaturedProjects, getAllProjectSlugs, getProjectBySlug) so
 * the rest of the app — page components, ProjectsPage, [slug] page,
 * WorkPreview — DOES NOT CHANGE. Just the fetch source did.
 *
 * Note: every function here is async because database calls return
 * promises. Pages that consume these need to be `async` (which all
 * Next.js server components can be).
 * ──────────────────────────────────────────────────────────────
 */

import { db, projects } from "@/db";
import { eq } from "drizzle-orm";
import type { Project as DbProject } from "@/db";

/**
 * The shape the rest of the app expects.
 * Matches the old static-data interface so we don't have to refactor
 * every component that consumes a Project.
 */
export interface Project {
  slug: string;
  num: string;
  name: string;
  nameEm: string;
  sector: string;
  year: number;
  scope: string;
  status?: "live" | "review" | "complete" | "ongoing";
  client?: string;
  location?: string;
  tools?: string[];
  challenge: string;
  approach: string;
  outcome: string;
  featured?: boolean;
}

/**
 * Hydrate a database row into the shape pages expect.
 * Mostly: parse the JSON-encoded `tools` field, and turn nullable
 * columns into optional fields.
 */
function hydrate(row: DbProject): Project {
  return {
    slug: row.slug,
    num: row.num,
    name: row.name,
    nameEm: row.nameEm,
    sector: row.sector,
    year: row.year,
    scope: row.scope,
    status: row.status ?? undefined,
    client: row.client ?? undefined,
    location: row.location ?? undefined,
    tools: parseTools(row.tools),
    challenge: row.challenge,
    approach: row.approach,
    outcome: row.outcome,
    featured: row.featured,
  };
}

function parseTools(raw: string | null): string[] | undefined {
  if (!raw) return undefined;

  // Try JSON-encoded array first (the canonical format):
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map(String);
    }
  } catch {
    // Not JSON — fall through to comma-split.
  }

  // Fallback: treat as plain comma-separated string.
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ── PUBLIC API ─────────────────────────────────────────────── */

/** All projects, newest first. Used by /projects gallery. */
export async function getAllProjects(): Promise<Project[]> {
  const rows = await db.select().from(projects);
  // Sort by year desc, then by id desc for stable ordering within a year
  rows.sort((a, b) => b.year - a.year || b.id - a.id);
  return rows.map(hydrate);
}

/** Featured projects only. Used by homepage WorkPreview. */
export async function getFeaturedProjects(): Promise<Project[]> {
  const rows = await db.select().from(projects).where(eq(projects.featured, true));
  rows.sort((a, b) => b.year - a.year || b.id - a.id);
  return rows.map(hydrate);
}

/** Look up a single project by slug. Used by /projects/[slug]. */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  return rows[0] ? hydrate(rows[0]) : undefined;
}

/** All slugs — used by Next.js generateStaticParams to pre-render pages. */
export async function getAllProjectSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: projects.slug }).from(projects);
  return rows.map((r) => r.slug);
}