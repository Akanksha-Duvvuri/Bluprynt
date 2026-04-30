import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, projects } from "@/db";

/**
 * ──────────────────────────────────────────────────────────────
 * /api/admin/projects/[id] — single-project endpoints
 *
 * DELETE /api/admin/projects/123 — delete project with id=123
 * (PATCH and GET come in Phase 3B for the edit form)
 *
 * Auth: every method calls auth() first and returns 401 if no
 * session. Defense in depth — the middleware also blocks /admin/*,
 * but API routes need their own check because they could be hit
 * directly from outside the browser.
 * ──────────────────────────────────────────────────────────────
 */

interface Context {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: NextRequest, ctx: Context) {
  // 1. Auth check
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse + validate the id from the URL
  const { id: idStr } = await ctx.params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  // 3. Delete (returns affected rows so we can confirm it existed)
  const result = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning({ id: projects.id });

  if (result.length === 0) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, deletedId: result[0].id });
}