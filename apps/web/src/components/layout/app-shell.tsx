"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPreviewRevamp = pathname?.startsWith("/preview-revamp");
  const isComponentDocs = pathname?.startsWith("/docs/components/");

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <SiteHeader />
      <div className="flex-1 pt-16 sm:pt-20">{children}</div>
      {!isPreviewRevamp && !isComponentDocs && <SiteFooter />}
    </div>
  );
}
