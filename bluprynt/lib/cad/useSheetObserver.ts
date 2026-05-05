"use client";

import { useEffect, useRef } from "react";
import { useSheet } from "./SheetProvider";

/**
 * Attach to any section element. When the section enters the viewport at
 * the threshold, the global sheet code updates — driving the status bar
 * label and the crosshair's SHEET readout.
 *
 * Usage:
 *   const ref = useSheetObserver("A-002");
 *   return <section ref={ref}>...</section>;
 */
export function useSheetObserver<T extends HTMLElement = HTMLElement>(
  code: string,
  threshold = 0.5,
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
      { threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [code, setSheet, threshold]);

  return ref;
}
