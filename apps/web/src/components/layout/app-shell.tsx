"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SidebarProvider } from "@/context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPreviewRevamp = pathname?.startsWith("/preview-revamp");
  const isComponentDocs = pathname?.startsWith("/docs/components/");
  const isErrorPage = pathname === "/404" || pathname === "/500" || pathname === "/503";

  return (
    <SidebarProvider>
      {isPreviewRevamp || isComponentDocs ? (
        <div className="relative h-dvh max-h-dvh w-full flex flex-col bg-background overflow-hidden">
          <SiteHeader />
          <div className="flex-1 min-h-0 pt-20 flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      ) : (
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          {!isErrorPage && <SiteHeader />}
          <div className={`flex-1 ${!isErrorPage ? "pt-20 sm:pt-24" : ""}`}>{children}</div>
          {!isPreviewRevamp && !isComponentDocs && !isErrorPage && <SiteFooter />}
        </div>
      )}
    </SidebarProvider>
  );
}
