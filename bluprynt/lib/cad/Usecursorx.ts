"use client";

import { useEffect, useState } from "react";

/**
 * Cursor X position across the viewport, normalized to [0, 1].
 *   0   = cursor at left edge of viewport
 *   0.5 = centered (default before any movement)
 *   1   = cursor at right edge
 *
 * RAF-throttled. The listener is on `window` so any mouse movement
 * anywhere on the page updates the value — useful for rotating an
 * element regardless of where the mouse is.
 */
export function useCursorX(): number {
  const [x, setX] = useState(0.5);

  useEffect(() => {
    let raf = 0;
    let queued = false;
    let last: number | null = null;

    const flush = () => {
      raf = 0;
      queued = false;
      if (last == null) return;
      const w = window.innerWidth || 1;
      const next = Math.min(1, Math.max(0, last / w));
      setX((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
    };

    const onMove = (e: MouseEvent) => {
      last = e.clientX;
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(flush);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return x;
}