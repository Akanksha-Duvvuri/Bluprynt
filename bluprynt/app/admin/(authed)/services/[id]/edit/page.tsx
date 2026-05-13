import Link from "next/link";
import { notFound } from "next/navigation";
import { db, services } from "@/db";
import { eq } from "drizzle-orm";
import { serviceDbToFormShape } from "@/lib/validation";
import ServiceForm from "../../ServiceForm";

export const metadata = {
  title: "Edit service · Admin",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  const rows = await db
    .select()
    .from(services)
    .where(eq(services.id, numericId))
    .limit(1);

  if (rows.length === 0) notFound();
  const row = rows[0];
  const initial = serviceDbToFormShape(row);

  return (
    <div>
      <header
        style={{
          marginBottom: 36,
          paddingBottom: 24,
          borderBottom: "1px dashed rgba(196, 165, 100, 0.25)",
        }}
      >
        <Link
          href="/admin/services"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255, 238, 198, 0.55)",
            textDecoration: "none",
            marginBottom: 18,
            display: "inline-block",
          }}
        >
          ← Back to services
        </Link>
        <h1
          style={{
            fontFamily: "var(--primary)",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.025em",
            margin: "8px 0 6px",
            lineHeight: 1,
          }}
        >
          Edit <span style={{ color: "var(--gold)", fontWeight: 400 }}>{row.title}</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--secondary)",
            fontSize: 14,
            color: "rgba(255, 238, 198, 0.65)",
            margin: 0,
          }}
        >
          Slug is locked. Changes save instantly to the live site.
        </p>
      </header>

      <ServiceForm
        service={{
          id: row.id,
          slug: initial.slug ?? "",
          num: initial.num ?? "",
          title: initial.title ?? "",
          line: initial.line ?? "",
          description: initial.description ?? "",
          region: row.region,
          tag: row.tag,
          category: row.category,
          deliverables: initial.deliverables ?? "",
          whenToEngage: initial.whenToEngage ?? "",
          featured: initial.featured ?? false,
          sortOrder: initial.sortOrder ?? 0,
        }}
      />
    </div>
  );
}
