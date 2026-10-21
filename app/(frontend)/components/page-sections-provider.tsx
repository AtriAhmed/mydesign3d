"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SectionValues } from "@/lib/cms";

const SectionsContext = createContext<SectionValues>({});

export function PageSectionsProvider({ children, sections }: { children: ReactNode; sections: SectionValues }) {
  return <SectionsContext.Provider value={sections}>{children}</SectionsContext.Provider>;
}

export function usePageSection<T extends Record<string, unknown>>(key: string, defaults: T): T {
  const sections = useContext(SectionsContext);
  return { ...defaults, ...sections[key] } as T;
}
