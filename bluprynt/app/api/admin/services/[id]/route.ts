import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, services } from "@/db";
import { eq } from "drizzle-orm";
import {
  serviceFormSchema,
  serviceFormToDbShape,
} from "@/lib/validation";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/admin/services/[id]
 *
 * Updates an existing service.
 * - Auth required
 * - Slug from the request body is IGNORED on edit — slug is locked to
 *   the database row's existing value. Prevents URL breakage.
 */
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = serviceFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues,
      },
      { status: 400 }
    );
  }

  // Verify row exists and grab its locked slug
  const existing = await db
    .select({ slug: services.slug })
    .from(services)
    .where(eq(services.id, numericId))
    .limit(1);

  if (existing.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Apply update — overwrite slug with the DB's locked value so client can't change it
  const dbShape = serviceFormToDbShape(parsed.data);
  dbShape.slug = existing[0].slug;

  await db
    .update(services)
    .set({
      ...dbShape,
      updatedAt: new Date(),
    })
    .where(eq(services.id, numericId));

  return NextResponse.json({ ok: true });
}

/**
 * DELETE /api/admin/services/[id]
 */
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const result = await db
    .delete(services)
    .where(eq(services.id, numericId))
    .returning({ id: services.id });

  if (result.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
