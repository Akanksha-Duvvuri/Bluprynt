/**
 * lib/testimonials.ts
 *
 * Database accessors for the testimonials table.
 * Mirrors the pattern of lib/projects.ts.
 *
 * The homepage <Testimonials /> section accepts a Testimonial[] with:
 *   { id, quote, author, role, org, project }
 *
 * Our DB stores:
 *   { id, quote, authorName, authorTitle, authorCompany,
 *     relatedProjectSlug, featured, published, sortOrder, ... }
 *
 * These functions translate from the DB shape to the component shape,
 * left-joining to projects so we can render "Eastwood Viaduct, 2024"
 * instead of just a slug.
 */

import { db, testimonials, projects } from "@/db";
import { and, asc, eq } from "drizzle-orm";

/** Shape consumed by the homepage Testimonials section. */
export type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role?: string | null;
  org?: string | null;
  /** Display-ready project string, e.g. "Eastwood Viaduct, 2024" */
  project?: string | null;
};

/**
 * Internal — common select + join used by every accessor.
 * Returns one row per testimonial, with optional project name + year
 * pulled in via leftJoin.
 */
function baseQuery() {
  return db
    .select({
      id: testimonials.id,
      quote: testimonials.quote,
      authorName: testimonials.authorName,
      authorTitle: testimonials.authorTitle,
      authorCompany: testimonials.authorCompany,
      relatedProjectSlug: testimonials.relatedProjectSlug,
      sortOrder: testimonials.sortOrder,
      featured: testimonials.featured,
      published: testimonials.published,
      // Joined columns from projects (null if no related slug):
      projectName: projects.name,
      projectNameEm: projects.nameEm,
      projectYear: projects.year,
    })
    .from(testimonials)
    .leftJoin(projects, eq(projects.slug, testimonials.relatedProjectSlug));
}

/** Hydrate a raw row into the homepage component shape. */
function hydrate(r: Awaited<ReturnType<typeof baseQuery>>[number]): Testimonial {
  // Compose project string only when we found a matching project AND have a year
  const projectStr =
    r.projectName && r.projectYear
      ? `${r.projectName}${r.projectNameEm ?? ""}, ${r.projectYear}`
      : null;

  return {
    id: r.id,
    quote: r.quote,
    author: r.authorName,
    role: r.authorTitle,
    org: r.authorCompany,
    project: projectStr,
  };
}

/**
 * Featured + published testimonials, ordered by sortOrder asc, then id.
 * Used on the homepage. Default limit = 3 (matches the section design).
 */
export async function getFeaturedTestimonials(
  limit = 3
): Promise<Testimonial[]> {
  const rows = await baseQuery()
    .where(
      and(
        eq(testimonials.featured, true),
        eq(testimonials.published, true)
      )
    )
    .orderBy(asc(testimonials.sortOrder), asc(testimonials.id))
    .limit(limit);

  return rows.map(hydrate);
}

/**
 * All published testimonials. Useful if you ever build a /testimonials
 * archive page.
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  const rows = await baseQuery()
    .where(eq(testimonials.published, true))
    .orderBy(asc(testimonials.sortOrder), asc(testimonials.id));

  return rows.map(hydrate);
}

/**
 * Single testimonial by id (admin / preview use).
 */
export async function getTestimonialById(
  id: number
): Promise<Testimonial | undefined> {
  const rows = await baseQuery().where(eq(testimonials.id, id)).limit(1);
  return rows[0] ? hydrate(rows[0]) : undefined;
}