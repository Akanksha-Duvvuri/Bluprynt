import { db, services } from "@/db";
import { eq, asc } from "drizzle-orm";

/**
 * ──────────────────────────────────────────────────────────────
 * SERVICES — now DB-backed.
 *
 * All accessors preserve their original signatures from when this
 * file was a static array, so consumers (homepage preview, /services
 * index, /services/[slug] detail) keep working with no changes.
 *
 * The only change: every accessor is now async — call sites must
 * use `await`. The original homepage/services pages already do.
 * ──────────────────────────────────────────────────────────────
 */

export type Service = {
  id: string | number;
  slug: string;
  num: string;
  title: string;
  line: string;
  description?: string;
  region: string;
  tag: string;
  category?: string;
  deliverables?: readonly string[];
  whenToEngage?: readonly string[];
  featured?: boolean;
};

/* ── Helpers ──────────────────────────────────────────────── */

function parseJsonArray(value: unknown): readonly string[] {
  if (typeof value !== "string" || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function rowToService(row: typeof services.$inferSelect): Service {
  return {
    id: row.id,
    slug: row.slug,
    num: row.num,
    title: row.title,
    line: row.line,
    description: row.description ?? undefined,
    region: row.region ?? "",
    tag: row.tag ?? "",
    category: row.category ?? undefined,
    deliverables: parseJsonArray(row.deliverables),
    whenToEngage: parseJsonArray(row.whenToEngage),
    featured: row.featured,
  };
}

/* ── Accessors ────────────────────────────────────────────── */

/**
 * Returns services flagged as `featured`, ordered by sortOrder.
 * Used by the homepage Services preview.
 */
export async function getFeaturedServices(limit = 3): Promise<readonly Service[]> {
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.featured, true))
    .orderBy(asc(services.sortOrder));

  return rows.slice(0, limit).map(rowToService);
}

/**
 * Returns a service by URL slug, or null if not found.
 * Used by /services/[slug].
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);

  if (rows.length === 0) return null;
  return rowToService(rows[0]);
}

/**
 * Returns every service slug for generateStaticParams in /services/[slug].
 */
export async function allServiceSlugs(): Promise<{ slug: string }[]> {
  const rows = await db.select({ slug: services.slug }).from(services);
  return rows.map((r) => ({ slug: r.slug }));
}

/**
 * Returns every service, ordered by sortOrder.
 * Used by /services index.
 */
export async function getAllServices(): Promise<readonly Service[]> {
  const rows = await db
    .select()
    .from(services)
    .orderBy(asc(services.sortOrder));
  return rows.map(rowToService);
}

/**
 * Groups all services by their `category` field for section breaks
 * on the /services index page. Categories preserve insertion order.
 */
export async function getServicesGroupedByCategory(): Promise<
  Record<string, readonly Service[]>
> {
  const all = await getAllServices();
  const groups: Record<string, Service[]> = {};
  for (const s of all) {
    const key = s.category ?? "Uncategorized";
    if (!groups[key]) groups[key] = [];
    groups[key].push(s);
  }
  return groups;
}
