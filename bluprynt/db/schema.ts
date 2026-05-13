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
 * SCHEMA — source of truth for what's in your Postgres database.
 *
 * Adds the `services` table so the firm can manage services
 * through the admin panel instead of editing lib/services.ts.
 *
 * After editing this file:
 *   npm run db:generate    (creates a new SQL migration in /drizzle)
 *   npm run db:migrate     (applies it to the database)
 * ──────────────────────────────────────────────────────────────
 */

/* ── ENUMS ─────────────────────────────────────────────────── */
export const projectStatusEnum = pgEnum("project_status", [
  "live",
  "review",
  "complete",
  "ongoing",
]);

export const emailStatusEnum = pgEnum("email_status", [
  "pending",
  "sent",
  "delivered",
  "bounced",
  "failed",
]);

export const submissionStatusEnum = pgEnum("submission_status", [
  "new",
  "read",
  "responded",
  "archived",
  "spam",
]);

/* ── PROJECTS ──────────────────────────────────────────────── */
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  num: varchar("num", { length: 50 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  nameEm: varchar("name_em", { length: 200 }).notNull(),
  sector: varchar("sector", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  scope: varchar("scope", { length: 200 }).notNull(),
  status: projectStatusEnum("status").default("complete"),
  client: varchar("client", { length: 200 }),
  location: varchar("location", { length: 200 }),
  tools: text("tools"),
  challenge: text("challenge").notNull(),
  approach: text("approach").notNull(),
  outcome: text("outcome").notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── TESTIMONIALS ──────────────────────────────────────────── */
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  authorName: varchar("author_name", { length: 200 }).notNull(),
  authorTitle: varchar("author_title", { length: 200 }),
  authorCompany: varchar("author_company", { length: 200 }),
  relatedProjectSlug: varchar("related_project_slug", { length: 100 }),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── USERS (admin accounts) ─────────────────────────────────── */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── FORM SUBMISSIONS ──────────────────────────────────────── */
export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 200 }),
  message: text("message").notNull(),
  detectedTopic: varchar("detected_topic", { length: 50 }),
  status: submissionStatusEnum("status").default("new").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  prospectEmailLogId: integer("prospect_email_log_id"),
  ownerEmailLogId: integer("owner_email_log_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── EMAIL LOG ─────────────────────────────────────────────── */
export const emailLog = pgTable("email_log", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 50 }).notNull(),
  submissionId: integer("submission_id"),
  toAddress: varchar("to_address", { length: 255 }).notNull(),
  fromAddress: varchar("from_address", { length: 255 }).notNull(),
  replyTo: varchar("reply_to", { length: 255 }),
  subject: varchar("subject", { length: 500 }).notNull(),
  status: emailStatusEnum("status").default("pending").notNull(),
  resendId: varchar("resend_id", { length: 100 }),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── SERVICES (NEW) ────────────────────────────────────────── */
/**
 * What the firm offers. Editable from the admin panel.
 *
 * `deliverables` and `whenToEngage` store comma-or-newline joined
 * strings as JSON-encoded arrays. Helpers in lib/validation.ts
 * handle conversion to/from comma-separated form strings.
 */
export const services = pgTable("services", {
  id: serial("id").primaryKey(),

  // Identification
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  num: varchar("num", { length: 10 }).notNull(),       // "01", "02" — display number

  // Display
  title: varchar("title", { length: 200 }).notNull(),
  line: varchar("line", { length: 300 }).notNull(),    // one-line tagline
  description: text("description").notNull(),          // long-form paragraph

  // Metadata
  region: varchar("region", { length: 50 }),           // "US · IN", "US only", etc.
  tag: varchar("tag", { length: 200 }),                // "DELIVERABLE · FEASIBILITY DECK"
  category: varchar("category", { length: 100 }),      // "Strategy", "Construction"

  // List fields — JSON-encoded arrays of strings
  deliverables: text("deliverables"),                  // ["item 1", "item 2", ...]
  whenToEngage: text("when_to_engage"),                // ["scenario 1", "scenario 2", ...]

  // Display control
  featured: boolean("featured").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── TYPE EXPORTS ──────────────────────────────────────────── */
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type FormSubmission = typeof formSubmissions.$inferSelect;
export type NewFormSubmission = typeof formSubmissions.$inferInsert;

export type EmailLog = typeof emailLog.$inferSelect;
export type NewEmailLog = typeof emailLog.$inferInsert;

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
