"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

type SheetContextValue = {
  sheet: string;
  setSheet: (sheet: string) => void;
};

const SheetContext = createContext<SheetContextValue | null>(null);

export function SheetProvider({
  children,
  initial = "A-001",
}: {
  children: ReactNode;
  initial?: string;
}) {
  const [sheet, setSheetState] = useState(initial);

  // Avoid re-renders when the value didn't actually change
  const setSheet = useCallback((next: string) => {
    setSheetState((prev) => (prev === next ? prev : next));
  }, []);

  const value = useMemo(() => ({ sheet, setSheet }), [sheet, setSheet]);

  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
}

export function useSheet(): SheetContextValue {
  const ctx = useContext(SheetContext);
  if (!ctx) {
    throw new Error("useSheet must be used within <SheetProvider>");
  }
  return ctx;
}
