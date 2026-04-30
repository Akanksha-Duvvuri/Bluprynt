import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * ──────────────────────────────────────────────────────────────
 * SCHEMA — the source of truth for what's in your Postgres database.
 *
 * Each `pgTable` call defines a table. Columns are typed in TypeScript
 * AND in Postgres, so a typo here errors at build time and a wrong type
 * at query time also errors at build time.
 *
 * Migrations: when you change this file, run
 *     npx drizzle-kit generate
 * which produces an SQL file in /drizzle. Then run
 *     npx drizzle-kit migrate
 * to apply it to the actual database.
 * ──────────────────────────────────────────────────────────────
 */

/* ── ENUMS ─────────────────────────────────────────────────── */
export const projectStatusEnum = pgEnum("project_status", [
  "live",
  "review",
  "complete",
  "ongoing",
]);

/* ── PROJECTS ──────────────────────────────────────────────── */
export const projects = pgTable("projects", {
  // Auto-incrementing integer primary key.
  // We could use UUIDs but for an admin-managed table integers are simpler.
  id: serial("id").primaryKey(),

  // URL slug — must be unique. The "{ unique: true }" tells Postgres
  // to enforce uniqueness, and the index speeds up "find by slug" lookups.
  slug: varchar("slug", { length: 100 }).notNull().unique(),

  // Project number — e.g. "P-024 / 2025"
  num: varchar("num", { length: 50 }).notNull(),

  // Display name split into "name" + "nameEm" so we can render the
  // gold-highlighted suffix. e.g. name="Eastwood ", nameEm="Viaduct"
  name: varchar("name", { length: 200 }).notNull(),
  nameEm: varchar("name_em", { length: 200 }).notNull(),

  // Sector / type tag — e.g. "Structural · Feasibility"
  sector: varchar("sector", { length: 100 }).notNull(),

  // Year as a plain integer
  year: integer("year").notNull(),

  // One-line scope summary — e.g. "3-span · 240m"
  scope: varchar("scope", { length: 200 }).notNull(),

  // Live / review / complete / ongoing
  status: projectStatusEnum("status").default("complete"),

  // Optional metadata
  client: varchar("client", { length: 200 }),
  location: varchar("location", { length: 200 }),
  // Tools is a JSON array stored as TEXT — simpler than a separate table
  // for now. We'll parse on read.
  tools: text("tools"),  // JSON-encoded string

  // Long-form case study content
  challenge: text("challenge").notNull(),
  approach: text("approach").notNull(),
  outcome: text("outcome").notNull(),

  // Featured = appears on homepage
  featured: boolean("featured").default(false).notNull(),

  // Auto-managed timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── TESTIMONIALS ──────────────────────────────────────────── */
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),

  // Quote — required, free-text
  quote: text("quote").notNull(),

  // Attribution
  authorName: varchar("author_name", { length: 200 }).notNull(),
  authorTitle: varchar("author_title", { length: 200 }),    // "CTO" / "Project Director"
  authorCompany: varchar("author_company", { length: 200 }),

  // Optional link back to a project — stored as the slug, not a foreign key
  // for now (keeps things simple; we can upgrade to a relation later).
  relatedProjectSlug: varchar("related_project_slug", { length: 100 }),

  // Show on homepage / hide
  featured: boolean("featured").default(false).notNull(),
  // Soft-published: set to false to hide a testimonial without deleting it
  published: boolean("published").default(true).notNull(),

  // Display order — lower numbers show first
  sortOrder: integer("sort_order").default(0).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── USERS (for Phase 2 auth — present but unused this phase) ─ */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  // bcrypt hash; never store plaintext passwords
  passwordHash: text("password_hash").notNull(),

  // Display name shown in the admin UI
  name: varchar("name", { length: 200 }),

  // Future: roles, permissions. For now, anyone with an account is an admin.
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── TYPE EXPORTS ──────────────────────────────────────────── */
// Drizzle gives us TypeScript types inferred from the schema.
// "Project" = a row read from the db. "NewProject" = the shape needed to insert.
// You'll import these throughout the app to stay type-safe.
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;