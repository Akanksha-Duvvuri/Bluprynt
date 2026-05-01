import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, projects } from "@/db";
import { projectFormSchema, projectFormToDbShape } from "@/lib/validation";

/**
 * POST /api/admin/projects — create a new project.
 *
 * Returns the created project's id and slug, or an error message.
 */
export async function POST(req: NextRequest) {
  // Auth
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validate with Zod (defense in depth — client should already have done this)
  const parsed = projectFormSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: `${firstIssue.path.join(".")}: ${firstIssue.message}` },
      { status: 400 }
    );
  }

  const data = projectFormToDbShape(parsed.data);

  // Check slug uniqueness — friendlier error than a Postgres unique-violation
  const existing = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.slug, data.slug))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json(
      { error: `A project with slug "${data.slug}" already exists` },
      { status: 409 }
    );
  }

  // Insert
  const inserted = await db
    .insert(projects)
    .values(data)
    .returning({ id: projects.id, slug: projects.slug });

  return NextResponse.json({ ok: true, project: inserted[0] }, { status: 201 });
}
