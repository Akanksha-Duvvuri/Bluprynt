import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, users } from "@/db";

/**
 * ──────────────────────────────────────────────────────────────
 * NextAuth (Auth.js v5) configuration
 *
 * What this file does:
 *   1. Defines a Credentials provider — accepts email + password
 *      from a form, looks up the user in the `users` table, verifies
 *      the password against the bcrypt hash, and creates a session.
 *   2. Stores sessions as JWTs (signed cookies) — no separate
 *      sessions table needed.
 *   3. Exports `auth`, `signIn`, `signOut`, and the route handlers.
 *
 * Used by:
 *   - app/api/auth/[...nextauth]/route.ts (mounts the API)
 *   - middleware.ts (protects /admin/*)
 *   - app/admin/* pages (reads the session)
 *   - app/admin/login/page.tsx (calls signIn)
 * ──────────────────────────────────────────────────────────────
 */

export const { handlers, auth, signIn, signOut } = NextAuth({
  /* Tells NextAuth to use the JWT strategy (not a database sessions table) */
  session: { strategy: "jwt" },

  /* Custom login page — NextAuth will redirect unauthenticated users here */
  pages: {
    signIn: "/admin/login",
  },

  providers: [
    Credentials({
      /* Display name in default UI (we don't use it; we have our own form) */
      name: "Credentials",

      /* Schema of the form fields. Used by NextAuth's auto-generated UI;
         we have our own login form, but the shape still has to match. */
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      /**
       * authorize — runs on every login attempt.
       * Returns the user object on success, null on failure.
       * NextAuth turns the returned object into a JWT.
       */
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        // Look up the user by email
        const rows = await db
          .select()
          .from(users)
          .where(eq(users.email, email.toLowerCase()))
          .limit(1);

        const user = rows[0];
        if (!user) return null;

        // bcrypt.compare returns true if the password matches the hash
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        // Return only what we want in the session — never the password hash
        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? user.email,
        };
      },
    }),
  ],

  callbacks: {
    /**
     * jwt — runs whenever a JWT is created or updated.
     * The first call (right after sign-in) has `user` populated.
     * Subsequent calls only have `token` — we just pass it through.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    /**
     * session — shapes what `auth()` returns to your pages.
     * We pull from the token and expose id/email/name on session.user.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  /* Set in .env.local — generate with: openssl rand -base64 32 */
  secret: process.env.NEXTAUTH_SECRET,
});