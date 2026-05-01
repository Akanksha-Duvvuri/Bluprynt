import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, projects } from "@/db";
import { projectDbToFormShape } from "@/lib/validation";
import ProjectForm from "../../ProjectForm";
import styles from "../../form.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit project · Admin",
};

export default async function EditProjectPage({ params }: PageProps) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) notFound();

  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  const project = rows[0];
  if (!project) notFound();

  const initialValues = projectDbToFormShape(project);

  return (
    <div>
      <header className={styles.pageHeader}>
        <Link href="/admin/projects" className={styles.pageBackLink}>
          ← All projects
        </Link>
        <div className={styles.pageLabel}>▸ Content · Edit · {project.num}</div>
        <h1 className={styles.pageTitle}>
          Edit <span className={styles.pageEm}>{project.name}{project.nameEm}</span>
        </h1>
      </header>

      <ProjectForm
        mode="edit"
        projectId={id}
        initialValues={initialValues}
      />
    </div>
  );
}
