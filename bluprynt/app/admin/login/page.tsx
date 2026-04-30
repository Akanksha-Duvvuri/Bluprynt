"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Use NextAuth's client-side signIn — handles the JWT cookie creation
    // and the redirect dance automatically.
    const result = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email or password is incorrect.");
      return;
    }

    // Successful login — go where the user was trying to go (or /admin).
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className={styles.shell}>
      {/* Faint background grid for the brand feel */}
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.card}>
        <div className={styles.brandBlock}>
          <div className={styles.brandMark}>B</div>
          <div className={styles.brandText}>
            Bluprynt <span>Admin</span>
          </div>
        </div>

        <div className={styles.headLabel}>▸ A-LOGIN · Restricted access</div>
        <h1 className={styles.heading}>
          Sign in to
          <br />
          the <span className={styles.em}>workshop.</span>
        </h1>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              ▸ Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="[email protected]"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              ▸ Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className={styles.error} role="alert">
              <span className={styles.errorTag}>FLAGGED</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submit}
            disabled={loading || !email || !password}
          >
            {loading ? "Verifying credentials…" : "Sign in →"}
          </button>
        </form>

        <div className={styles.footnote}>
          <Link href="/" className={styles.publicLink}>
            ← Back to public site
          </Link>
          <div className={styles.footnoteRight}>
            Forgot your password?{" "}
            <span className={styles.contactPrompt}>
              Contact the other founder.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  // useSearchParams requires a Suspense boundary in Next 15
  return (
    <Suspense fallback={<div className={styles.shell}>Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}