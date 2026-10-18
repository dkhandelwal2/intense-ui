"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPreviewRevamp = pathname?.startsWith("/preview-revamp");
  const isComponentDocs = pathname?.startsWith("/docs/components/");
  const isErrorPage = pathname === "/404" || pathname === "/500" || pathname === "/503";

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      {!isErrorPage && <SiteHeader />}
      <div className={`flex-1 ${!isErrorPage ? "pt-20 sm:pt-24" : ""}`}>{children}</div>
      {!isPreviewRevamp && !isComponentDocs && !isErrorPage && <SiteFooter />}
    </div>
  );
}
