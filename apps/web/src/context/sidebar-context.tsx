"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

interface SidebarContextValue {
  isMobileOpen: boolean;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const openMobileSidebar = useCallback(() => setIsMobileOpen(true), []);
  const closeMobileSidebar = useCallback(() => setIsMobileOpen(false), []);
  const toggleMobileSidebar = useCallback(() => setIsMobileOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({
      isMobileOpen,
      openMobileSidebar,
      closeMobileSidebar,
      toggleMobileSidebar,
    }),
    [isMobileOpen, openMobileSidebar, closeMobileSidebar, toggleMobileSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

const defaultContext: SidebarContextValue = {
  isMobileOpen: false,
  openMobileSidebar: () => {},
  closeMobileSidebar: () => {},
  toggleMobileSidebar: () => {},
};

export function useSidebarContext(): SidebarContextValue {
  const context = useContext(SidebarContext);
  return context ?? defaultContext;
}
