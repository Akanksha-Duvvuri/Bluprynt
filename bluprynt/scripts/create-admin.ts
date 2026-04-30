/**
 * ──────────────────────────────────────────────────────────────
 * Create-admin CLI
 *
 * Run with: npm run create:admin
 *
 * Prompts for email, name, and password from the terminal.
 * Hashes the password with bcrypt (10 rounds) and inserts into
 * the `users` table.
 *
 * Run this ONCE after setting up Phase 2. After that, the founders
 * sign in via /admin/login. If you need to add another admin later,
 * just run this script again.
 *
 * Why a CLI script and not a "register" page: there's no public
 * signup on this site. Admin accounts are bootstrapped via the
 * developer's command line — no anonymous user can create one.
 * ──────────────────────────────────────────────────────────────
 */

import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, users } from "../db";

async function ask(rl: ReturnType<typeof createInterface>, q: string): Promise<string> {
  const a = await rl.question(q);
  return a.trim();
}

async function askPassword(rl: ReturnType<typeof createInterface>, q: string): Promise<string> {
  // readline doesn't mask input by default. For a real production CLI
  // you'd use a tty raw-mode trick to hide characters; here it's a
  // dev-only script run on a developer's own machine, so plain input
  // is acceptable. Just don't run this on a shared screen.
  const a = await rl.question(q);
  return a.trim();
}

async function main() {
  const rl = createInterface({ input, output });

  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Bluprynt — Create Admin User");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");

  const email = (await ask(rl, "Email:    ")).toLowerCase();
  if (!email || !/.+@.+\..+/.test(email)) {
    console.error("✗ Invalid email format. Aborting.");
    rl.close();
    process.exit(1);
  }

  // Check if user already exists
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    console.error(`✗ A user with email "${email}" already exists. Aborting.`);
    console.error("  To reset their password, edit the row directly in db:studio,");
    console.error("  or delete the row and re-run this script.");
    rl.close();
    process.exit(1);
  }

  const name = await ask(rl, "Name:     ");
  if (!name) {
    console.error("✗ Name is required. Aborting.");
    rl.close();
    process.exit(1);
  }

  const password = await askPassword(rl, "Password: ");
  if (password.length < 8) {
    console.error("✗ Password must be at least 8 characters. Aborting.");
    rl.close();
    process.exit(1);
  }

  const passwordConfirm = await askPassword(rl, "Confirm:  ");
  if (password !== passwordConfirm) {
    console.error("✗ Passwords don't match. Aborting.");
    rl.close();
    process.exit(1);
  }

  rl.close();

  console.log("");
  console.log("Hashing password…");
  const passwordHash = await bcrypt.hash(password, 10);

  console.log("Inserting user into database…");
  await db.insert(users).values({
    email,
    passwordHash,
    name,
  });

  console.log("");
  console.log("✓ Admin user created.");
  console.log("");
  console.log("  Sign in at: http://localhost:3000/admin/login");
  console.log("  Email:      " + email);
  console.log("");
}

main()
  .catch((err) => {
    console.error("");
    console.error("✗ Failed to create admin:", err);
    process.exit(1);
  })
  .then(() => process.exit(0));