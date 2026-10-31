"use client";

import React, { createContext, useContext } from "react";

export const ComponentActiveTocContext = createContext<string | undefined>(undefined);

export interface ComponentActiveTocProviderProps {
  value?: string;
  children: React.ReactNode;
}

export function ComponentActiveTocProvider({
  value,
  children,
}: ComponentActiveTocProviderProps) {
  return (
    <ComponentActiveTocContext.Provider value={value}>
      {children}
    </ComponentActiveTocContext.Provider>
  );
}

export function useComponentActiveToc(): string | undefined {
  return useContext(ComponentActiveTocContext);
}
