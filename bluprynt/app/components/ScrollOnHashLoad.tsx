"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls to the URL hash anchor when the homepage loads.
 *
 * Without this, navigating to `/#contact` from another page (e.g. /about)
 * lands at the top of the homepage — Next.js fires its hash-scroll before
 * the async server components have finished rendering, so the target
 * element doesn't exist yet at scroll time.
 *
 * We watch pathname changes; when we land on "/" with a hash present,
 * we wait a frame for layout to settle, then smooth-scroll to the target.
 *
 * Uses scrollIntoView, which respects the [id] { scroll-margin-top } rule
 * in globals.css for the fixed navbar offset.
 */
export function ScrollOnHashLoad() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    if (!id) return;

    // Wait for layout to settle (handles async server components).
    // Two RAFs because some browsers commit layout on the second frame.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }, [pathname]);

  return null;
}