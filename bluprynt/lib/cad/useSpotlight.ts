"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks the cursor over a target element and writes its position into
 * the element's `--mx` / `--my` CSS custom properties. RAF-throttled.
 *
 *   const ref = useSpotlight<HTMLElement>();
 *   <section ref={ref}>…</section>
 *
 * Pair with a CSS layer that uses those vars, e.g. a radial-gradient mask:
 *   mask-image: radial-gradient(circle 220px at var(--mx) var(--my), black, transparent 75%);
 */
export function useSpotlight<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let queued = false;
    let last: { x: number; y: number } | null = null;

    const flush = () => {
      raf = 0;
      queued = false;
      const evt = last;
      if (!evt) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${evt.x - rect.left}px`);
      el.style.setProperty("--my", `${evt.y - rect.top}px`);
    };

    const onMove = (e: MouseEvent) => {
      last = { x: e.clientX, y: e.clientY };
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      el.style.setProperty("--mx", "-9999px");
      el.style.setProperty("--my", "-9999px");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}