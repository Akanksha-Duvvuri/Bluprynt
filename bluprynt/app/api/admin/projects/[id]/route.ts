import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, testimonials } from "@/db";
import { testimonialFormSchema } from "@/lib/validation";

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

  const parsed = testimonialFormSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: `${firstIssue.path.join(".")}: ${firstIssue.message}` },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const inserted = await db
    .insert(testimonials)
    .values({
      quote: data.quote,
      authorName: data.authorName,
      authorTitle: data.authorTitle || null,
      authorCompany: data.authorCompany || null,
      relatedProjectSlug: data.relatedProjectSlug || null,
      featured: data.featured,
      published: data.published,
      sortOrder: data.sortOrder,
    })
    .returning({ id: testimonials.id });

  return NextResponse.json(
    { ok: true, testimonial: inserted[0] },
    { status: 201 }
  );
}