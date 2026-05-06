"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks the cursor over a target element and writes its position into
 * the element's --mx / --my CSS custom properties. RAF-throttled.
 *
 * Listens to BOTH mousemove and scroll — when the user scrolls without
 * moving the mouse, the section moves under a stationary cursor, so we
 * still need to recompute the cursor's position relative to the section.
 */
export function useSpotlight<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let queued = false;
    let lastX = 0;
    let lastY = 0;
    let everMoved = false;

    const flush = () => {
      raf = 0;
      queued = false;
      if (!everMoved) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${lastX - rect.left}px`);
      el.style.setProperty("--my", `${lastY - rect.top}px`);
    };

    const requestFlush = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(flush);
    };

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      everMoved = true;
      requestFlush();
    };

    const onScroll = () => {
      if (!everMoved) return;
      requestFlush();
    };

    const onLeave = () => {
      el.style.setProperty("--mx", "-9999px");
      el.style.setProperty("--my", "-9999px");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}