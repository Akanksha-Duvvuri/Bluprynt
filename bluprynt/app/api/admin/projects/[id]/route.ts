import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, projects } from "@/db";
import { projectFormSchema, projectFormToDbShape } from "@/lib/validation";

/**
 * /api/admin/projects/[id] — single-project endpoints
 *
 * DELETE — remove the project
 * PATCH  — update the project
 *
 * Both require auth.
 */

interface Context {
  params: Promise<{ id: string }>;
}

/* ── DELETE ──────────────────────────────────────────────── */
export async function DELETE(_req: NextRequest, ctx: Context) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idStr } = await ctx.params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const result = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning({ id: projects.id });

  if (result.length === 0) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, deletedId: result[0].id });
}

/* ── PATCH ───────────────────────────────────────────────── */
export async function PATCH(req: NextRequest, ctx: Context) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idStr } = await ctx.params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = projectFormSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: `${firstIssue.path.join(".")}: ${firstIssue.message}` },
      { status: 400 }
    );
  }

  const data = projectFormToDbShape(parsed.data);

  // Don't allow slug to change on edit (keeps URLs stable)
  // We get the existing slug from the DB and use it instead of the form value.
  const existing = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  if (existing.length === 0) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const updated = await db
    .update(projects)
    .set({
      ...data,
      slug: existing[0].slug, // preserve original slug
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning({ id: projects.id, slug: projects.slug });

  return NextResponse.json({ ok: true, project: updated[0] });
}
