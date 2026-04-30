"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

interface DeleteButtonProps {
  id: number;
  name: string;
}

/**
 * DeleteButton — client component for project deletion.
 *
 * Two-step interaction:
 *   1. First click → show inline confirmation
 *   2. Second click on "Confirm delete" → POST to /api/admin/projects/[id]
 *
 * Uses useTransition so the button shows a pending state while the
 * delete request is in flight, then router.refresh() reloads the
 * page server-side without a full reload.
 */
export default function DeleteButton({ id, name }: DeleteButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function onDelete() {
    setError(null);

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Delete failed: ${res.status}`);
      }

      // Server delete succeeded — re-fetch this page's data
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
      <span className={styles.deleteConfirmText}>
        Delete &ldquo;{name}&rdquo;?
      </span>
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
      {error && <span className={styles.deleteError}>{error}</span>}
    </div>
  );
}