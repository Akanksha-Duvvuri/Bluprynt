import type { Metadata } from "next";
import Link from "next/link";
import ProjectForm from "../ProjectForm";
import styles from "../form.module.css";

export const metadata: Metadata = {
  title: "New project · Admin",
};

export default function NewProjectPage() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <Link href="/admin/projects" className={styles.pageBackLink}>
          ← All projects
        </Link>
        <div className={styles.pageLabel}>▸ Content · New project</div>
        <h1 className={styles.pageTitle}>
          Create a new <span className={styles.pageEm}>project.</span>
        </h1>
      </header>

      <ProjectForm mode="create" />
    </div>
  );
}
