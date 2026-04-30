import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

/**
 * Login layout — wraps just /admin/login.
 * Does NOT render TopBar/Footer/Crosshair from the root layout —
 * the login page is a standalone full-screen experience.
 *
 * Returns the children directly. The `<html>` and `<body>` tags
 * still come from app/layout.tsx (Next.js requires exactly one
 * root layout per route tree), but this layout overrides metadata
 * and lets the page itself control its own visual chrome.
 */
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}