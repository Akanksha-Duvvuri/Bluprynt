import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
// (drizzle-kit doesn't read these by default; Next.js does)
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local before running drizzle commands."
  );
}

/**
 * Drizzle Kit config — drives:
 *   npx drizzle-kit generate   (create a new migration from schema changes)
 *   npx drizzle-kit migrate    (apply pending migrations to the database)
 *   npx drizzle-kit studio     (open a web UI to inspect/edit the database)
 */
export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",          // migrations live here
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});