import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, testimonials } from "@/db";
import { testimonialFormSchema } from "@/lib/validation";

interface Context {
  params: Promise<{ id: string }>;
}

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
    .delete(testimonials)
    .where(eq(testimonials.id, id))
    .returning({ id: testimonials.id });

  if (result.length === 0) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, deletedId: result[0].id });
}

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

  const parsed = testimonialFormSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: `${firstIssue.path.join(".")}: ${firstIssue.message}` },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const updated = await db
    .update(testimonials)
    .set({
      quote: data.quote,
      authorName: data.authorName,
      authorTitle: data.authorTitle || null,
      authorCompany: data.authorCompany || null,
      relatedProjectSlug: data.relatedProjectSlug || null,
      featured: data.featured,
      published: data.published,
      sortOrder: data.sortOrder,
      updatedAt: new Date(),
    })
    .where(eq(testimonials.id, id))
    .returning({ id: testimonials.id });

  if (updated.length === 0) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, testimonial: updated[0] });
}