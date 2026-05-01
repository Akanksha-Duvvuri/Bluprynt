import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq, asc } from "drizzle-orm";
import { db, testimonials, projects } from "@/db";
import TestimonialForm from "../../TestimonialForm";
import styles from "../../../projects/form.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit testimonial · Admin",
};

export default async function EditTestimonialPage({ params }: PageProps) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) notFound();

  const [rows, slugRows] = await Promise.all([
    db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1),
    db.select({ slug: projects.slug }).from(projects).orderBy(asc(projects.year)),
  ]);

  const t = rows[0];
  if (!t) notFound();

  return (
    <div>
      <header className={styles.pageHeader}>
        <Link href="/admin/testimonials" className={styles.pageBackLink}>
          ← All testimonials
        </Link>
        <div className={styles.pageLabel}>
          ▸ Content · Edit · #{String(t.id).padStart(3, "0")}
        </div>
        <h1 className={styles.pageTitle}>
          Edit <span className={styles.pageEm}>{t.authorName}</span>&apos;s
          testimonial
        </h1>
      </header>

      <TestimonialForm
        mode="edit"
        testimonialId={id}
        initialValues={{
          quote: t.quote,
          authorName: t.authorName,
          authorTitle: t.authorTitle ?? "",
          authorCompany: t.authorCompany ?? "",
          relatedProjectSlug: t.relatedProjectSlug ?? "",
          featured: t.featured,
          published: t.published,
          sortOrder: t.sortOrder,
        }}
        projectSlugs={slugRows.map((r) => r.slug)}
      />
    </div>
  );
}