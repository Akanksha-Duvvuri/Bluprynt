"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: number;
  title: string;
}

export default function DeleteButton({ id, title }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleDelete() {
    setError(null);
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Delete failed");
      }
      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <span
        style={{
          display: "inline-flex",
          gap: 8,
          alignItems: "center",
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
        }}
      >
        <span style={{ color: "var(--red, #C16565)" }}>
          Delete &ldquo;{title}&rdquo;?
        </span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          style={{
            padding: "6px 10px",
            background: "var(--red, #C16565)",
            color: "var(--ink)",
            border: "1px solid var(--red, #C16565)",
            borderRadius: 2,
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          {isPending ? "..." : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={isPending}
          style={{
            padding: "6px 10px",
            background: "transparent",
            color: "rgba(255,238,198,0.7)",
            border: "1px solid rgba(255,238,198,0.3)",
            borderRadius: 2,
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          No
        </button>
        {error && (
          <span style={{ color: "var(--red, #C16565)", fontSize: 10 }}>
            {error}
          </span>
        )}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      style={{
        appearance: "none",
        background: "transparent",
        color: "rgba(193, 101, 101, 0.85)",
        border: "1px solid rgba(193, 101, 101, 0.4)",
        padding: "8px 14px",
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        cursor: "pointer",
        borderRadius: 2,
        transition: "background 180ms ease-out",
      }}
    >
      Delete
    </button>
  );
}
