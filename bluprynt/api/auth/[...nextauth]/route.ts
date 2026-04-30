/**
 * ──────────────────────────────────────────────────────────────
 * NextAuth API route
 *
 * The literal `[...nextauth]` folder name is a Next.js catch-all
 * route — it matches /api/auth/signin, /api/auth/callback, etc.
 *
 * NextAuth's `handlers` object exposes a GET and POST function
 * that handle every auth subpath internally. We just re-export them.
 * ──────────────────────────────────────────────────────────────
 */
import { handlers } from "@/auth";

export const { GET, POST } = handlers;