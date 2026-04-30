import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * ──────────────────────────────────────────────────────────────
 * DB CLIENT — the one place we connect to Postgres.
 *
 * Why this file exists: every API route and server component that
 * reads or writes data imports `db` from here. A single client means
 * we don't open a thousand connections to Neon.
 *
 * Why neon-http (not pg or postgres.js): Neon's HTTP driver works
 * over fetch, no TCP connection pool needed. This is what makes it
 * work cleanly inside Vercel's serverless functions and Next.js
 * middleware. With a regular pg pool you'd hit "too many connections"
 * errors on bursty traffic.
 * ──────────────────────────────────────────────────────────────
 */

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment");
}

// `neon()` returns a tagged-template SQL function.
const sql = neon(process.env.DATABASE_URL);

// Drizzle wraps it and gives us the typed query API.
// We pass the schema object so Drizzle knows about every table.
export const db = drizzle(sql, { schema });

// Re-export the schema for convenient `import { db, projects } from "@/db"`.
export * from "./schema";