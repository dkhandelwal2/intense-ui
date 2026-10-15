"use client";
import { createContext, useContext, RefObject } from "react";

const ScrollContainerContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}

export function ScrollContainerProvider({ 
  containerRef, 
  children 
}: { 
  containerRef: RefObject<HTMLDivElement | null>, 
  children: React.ReactNode 
}) {
  return (
    <ScrollContainerContext.Provider value={containerRef}>
      {children}
    </ScrollContainerContext.Provider>
  );
}
