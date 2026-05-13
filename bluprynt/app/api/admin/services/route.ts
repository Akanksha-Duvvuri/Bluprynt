import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, services } from "@/db";
import { eq } from "drizzle-orm";
import {
  serviceFormSchema,
  serviceFormToDbShape,
} from "@/lib/validation";

/**
 * POST /api/admin/services
 *
 * Creates a new service.
 * - Auth required (defense in depth alongside middleware + layout)
 * - Validates payload with shared Zod schema
 * - Rejects duplicate slugs with 409
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const dbShape = serviceFormToDbShape(parsed.data);

  // Pre-check for slug conflict so we can return a friendly error
  const existing = await db
    .select({ id: services.id })
    .from(services)
    .where(eq(services.slug, dbShape.slug))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json(
      { error: `A service with slug "${dbShape.slug}" already exists.` },
      { status: 409 }
    );
  }

  const [created] = await db
    .insert(services)
    .values(dbShape)
    .returning({ id: services.id, slug: services.slug });

  return NextResponse.json({ ok: true, id: created.id, slug: created.slug });
}
