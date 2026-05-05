"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Reveals a string character-by-character. Returns the currently visible substring
 * plus a `done` flag for the cursor blink state.
 */
export function useTypewriter(
  text: string,
  { delay = 0, charMs = 28 }: { delay?: number; charMs?: number } = {},
) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut("");
    setDone(false);

    if (reduced) {
      setOut(text);
      setDone(true);
      return;
    }

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const start = setTimeout(function tick() {
      if (i >= text.length) {
        setDone(true);
        return;
      }
      i++;
      setOut(text.slice(0, i));
      timer = setTimeout(tick, charMs);
    }, delay);

    return () => {
      clearTimeout(start);
      clearTimeout(timer!);
    };
  }, [text, delay, charMs, reduced]);

  return { text: out, done };
}
