"use client";

import { useEffect, useState } from "react";

/**
 * Page scroll progress as a value in [0, 1]. RAF-throttled.
 * Used by BuildingDraft to reveal layers as the user scrolls.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let queued = false;

    const compute = () => {
      raf = 0;
      queued = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return setProgress(0);
      const next = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}
