"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

interface Props {
  id: number;
  preview: string;
}

export default function DeleteButton({ id, preview }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function onDelete() {
    setError(null);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Delete failed: ${res.status}`);
      }
      startTransition(() => {
        router.refresh();
        setConfirming(false);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className={styles.deleteBtn}
      >
        Delete
      </button>
    );
  }

  return (
    <div className={styles.deleteConfirm}>
      <span className={styles.deleteConfirmText}>Delete this testimonial?</span>
      <span className={styles.deleteConfirmPreview}>{preview}</span>
      <div className={styles.deleteConfirmRow}>
        <button
          type="button"
          onClick={onDelete}
          disabled={isPending}
          className={styles.deleteBtnConfirm}
        >
          {isPending ? "Deleting…" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirming(false);
            setError(null);
          }}
          disabled={isPending}
          className={styles.deleteBtnCancel}
        >
          Cancel
        </button>
      </div>
      {error && <span className={styles.deleteError}>{error}</span>}
    </div>
  );
}