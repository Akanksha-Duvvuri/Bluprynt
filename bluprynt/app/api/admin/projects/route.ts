import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { auth } from "@/auth";
import { db, projects } from "@/db";
import { projectFormSchema } from "@/lib/validation";

/**
 * GET /api/admin/projects
 * List all projects (sorted newest first by year then id).
 */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const all = await db
    .select()
    .from(projects)
    .orderBy(desc(projects.year), desc(projects.id));

  return NextResponse.json(all);
}

/**
 * POST /api/admin/projects
 * Create a new project. Body must match projectFormSchema.
 * Returns the inserted row.
 */
export async function POST(req: Request) {
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

  const inserted = await db
    .insert(projects)
    .values({
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
    })
    .returning();

  return NextResponse.json(inserted[0], { status: 201 });
}