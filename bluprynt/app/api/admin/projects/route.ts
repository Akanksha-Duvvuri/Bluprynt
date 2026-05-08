import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, projects } from "@/db";
import { projectFormSchema } from "@/lib/validation";

interface Ctx {
  params: Promise<{ id: string }>;
}

/**
 * Helper — parse + validate the id param. Returns numeric id or a 400 response.
 */
async function getId(ctx: Ctx): Promise<number | NextResponse> {
  const { id: idStr } = await ctx.params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  return id;
}

/**
 * GET /api/admin/projects/[id]
 * Fetch one project by id.
 */
export async function GET(_req: Request, ctx: Ctx) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = await getId(ctx);
  if (id instanceof NextResponse) return id;

  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  if (!rows[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}

/**
 * PATCH /api/admin/projects/[id]
 * Update one project. Body should match projectFormSchema.
 */
export async function PATCH(req: Request, ctx: Ctx) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = await getId(ctx);
  if (id instanceof NextResponse) return id;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = projectFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Convert form shape → DB shape
  // tools: comma-separated string → JSON-encoded string[]
  const toolsArr =
    typeof data.tools === "string"
      ? data.tools.split(",").map((s) => s.trim()).filter(Boolean)
      : Array.isArray(data.tools)
        ? data.tools
        : [];

  await db
    .update(projects)
    .set({
      slug: data.slug,
      num: data.num,
      name: data.name,
      nameEm: data.nameEm,
      sector: data.sector,
      year: data.year,
      scope: data.scope,
      status: data.status,
      client: data.client || null,
      location: data.location || null,
      tools: JSON.stringify(toolsArr),
      challenge: data.challenge,
      approach: data.approach,
      outcome: data.outcome,
      featured: data.featured ?? false,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id));

  return NextResponse.json({ success: true });
}

/**
 * DELETE /api/admin/projects/[id]
 * Remove one project.
 */
export async function DELETE(_req: Request, ctx: Ctx) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = await getId(ctx);
  if (id instanceof NextResponse) return id;

  await db.delete(projects).where(eq(projects.id, id));

  return NextResponse.json({ success: true });
}