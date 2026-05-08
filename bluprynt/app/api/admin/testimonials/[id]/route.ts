import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, testimonials } from "@/db";

interface Ctx {
  params: Promise<{ id: string }>;
}

async function getId(ctx: Ctx): Promise<number | NextResponse> {
  const { id: idStr } = await ctx.params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  return id;
}

/**
 * GET /api/admin/testimonials/[id]
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
    .from(testimonials)
    .where(eq(testimonials.id, id))
    .limit(1);

  if (!rows[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}

/**
 * PATCH /api/admin/testimonials/[id]
 *
 * NOTE: Adjust the .set({...}) field list below to match YOUR testimonials
 * schema. Common fields shown — if you have additional columns or different
 * names (e.g. authorName vs author_name), update accordingly.
 */
export async function PATCH(req: Request, ctx: Ctx) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = await getId(ctx);
  if (id instanceof NextResponse) return id;

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Minimal validation — quote is required
  if (!body.quote || typeof body.quote !== "string") {
    return NextResponse.json(
      { error: "Quote is required" },
      { status: 400 }
    );
  }

  await db
    .update(testimonials)
    .set({
      quote: body.quote as string,
      authorName: (body.authorName as string) ?? "",
      authorTitle: (body.authorTitle as string) ?? "",
      authorCompany: (body.authorCompany as string) ?? "",
      relatedProjectSlug: (body.relatedProjectSlug as string) || null,
      featured: Boolean(body.featured),
      published: Boolean(body.published),
      sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
      updatedAt: new Date(),
    })
    .where(eq(testimonials.id, id));

  return NextResponse.json({ success: true });
}

/**
 * DELETE /api/admin/testimonials/[id]
 */
export async function DELETE(_req: Request, ctx: Ctx) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = await getId(ctx);
  if (id instanceof NextResponse) return id;

  await db.delete(testimonials).where(eq(testimonials.id, id));

  return NextResponse.json({ success: true });
}