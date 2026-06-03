"use client";

import { useEffect, useRef } from "react";
import { useSheet } from "./SheetProvider";

/**
 * Attach to any section element. The sheet code updates when the section
 * crosses the "active band" — a horizontal strip in the middle 20% of the
 * viewport. This is independent of section height, so even tall sections
 * (like contact) activate reliably.
 *
 * Usage:
 *   const ref = useSheetObserver("A-002");
 *   return <section ref={ref}>...</section>;
 */
export function useSheetObserver<T extends HTMLElement = HTMLElement>(
  code: string,
) {
  const ref = useRef<T | null>(null);
  const { setSheet } = useSheet();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSheet(code);
            break;
          }
        }
      },
      {
        // Shrink the viewport to a 20% band in the middle.
        // Section is "active" when its body crosses this band.
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [code, setSheet]);

  return ref;
}