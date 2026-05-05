"use client";

import { useEffect, useState } from "react";

/**
 * Reactive hook for prefers-reduced-motion. Returns true when the user
 * has opted out of motion. Updates if the OS setting changes mid-session.
 */
export function useReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setPrefers(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefers;
}
