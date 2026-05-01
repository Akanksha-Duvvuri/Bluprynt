import type { Metadata } from "next";
import Link from "next/link";
import { db, projects } from "@/db";
import { asc } from "drizzle-orm";
import TestimonialForm from "../TestimonialForm";
import styles from "../../projects/form.module.css";

export const metadata: Metadata = {
  title: "New testimonial · Admin",
};

export default async function NewTestimonialPage() {
  // Get all project slugs so the form can offer a "linked project" dropdown
  const slugRows = await db
    .select({ slug: projects.slug })
    .from(projects)
    .orderBy(asc(projects.year));

  return (
    <div>
      <header className={styles.pageHeader}>
        <Link href="/admin/testimonials" className={styles.pageBackLink}>
          ← All testimonials
        </Link>
        <div className={styles.pageLabel}>▸ Content · New testimonial</div>
        <h1 className={styles.pageTitle}>
          Create a new <span className={styles.pageEm}>testimonial.</span>
        </h1>
      </header>

      <TestimonialForm
        mode="create"
        projectSlugs={slugRows.map((r) => r.slug)}
      />
    </div>
  );
}
