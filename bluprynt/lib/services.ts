/**
 * ──────────────────────────────────────────────────────────────
 * lib/services.ts — DATABASE-BACKED VERSION
 *
 * Used to be a static array. After moving services to the DB,
 * this fetches via Drizzle. Keeps the same public function signatures
 * (mostly) so existing pages don't need to change — except they now
 * need to be `async` to await these.
 *
 * NOTE: category grouping is removed. Services are now one flat list.
 * If your services index page used getServicesGroupedByCategory,
 * update it to use getAllServices instead.
 * ──────────────────────────────────────────────────────────────
 */

import { db, services } from "@/db";
import { eq, asc } from "drizzle-orm";
import type { Service as DbService } from "@/db";

/** Shape the rest of the app expects. */
export interface Service {
  id: number;
  slug: string;
  num: string;
  title: string;
  line: string;
  description: string;
  region?: string;        // ← `?:` belongs HERE (interface)
  tag?: string;
  category?: string;
  deliverables?: string[];
  whenToEngage?: string[];
  featured: boolean;
  sortOrder: number;
}

/** Defensive JSON parser — falls back to comma-split if not valid JSON. */
function parseList(raw: string | null): string[] | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    /* fall through */
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Hydrate a raw DB row into the shape pages consume. */
function hydrate(row: DbService): Service {
  return {
    id: row.id,
    slug: row.slug,
    num: row.num,
    title: row.title,
    line: row.line,
    description: row.description,
    region: row.region ?? undefined,
    tag: row.tag ?? undefined,
    category: row.category ?? undefined,
    deliverables: parseList(row.deliverables),
    whenToEngage: parseList(row.whenToEngage),
    featured: row.featured,
    sortOrder: row.sortOrder,
  };
}

/* ── PUBLIC API ─────────────────────────────────────────────── */

/** All services, ordered by sortOrder asc then id asc. */
export async function getAllServices(): Promise<Service[]> {
  const rows = await db
    .select()
    .from(services)
    .orderBy(asc(services.sortOrder), asc(services.id));
  return rows.map(hydrate);
}

/** Featured services only — used by homepage ServicesPreview. */
export async function getFeaturedServices(): Promise<Service[]> {
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.featured, true))
    .orderBy(asc(services.sortOrder), asc(services.id));
  return rows.map(hydrate);
}

/** Single service by slug — used by /services/[slug]. */
export async function getServiceBySlug(
  slug: string
): Promise<Service | null> {
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);
  return rows[0] ? hydrate(rows[0]) : null;
}

/** All slugs — for generateStaticParams in /services/[slug]. */
export async function allServiceSlugs(): Promise<{ slug: string }[]> {
  const rows = await db.select({ slug: services.slug }).from(services);
  return rows.map((r) => ({ slug: r.slug }));
}