"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ComponentActiveTab } from "./types";
import { ComponentSidebarHeader } from "./component-sidebar-header";

export interface ComponentInspectorSidebarProps {
  title: string;
  slug?: string;
  activeTab: ComponentActiveTab;
  onTabChange: (tab: ComponentActiveTab) => void;
  hasPlayground?: boolean;
  children: React.ReactNode;
}

export function ComponentInspectorSidebar({
  title,
  slug,
  activeTab,
  onTabChange,
  hasPlayground = true,
  children,
}: ComponentInspectorSidebarProps) {
  const rightSidebarRef = useRef<HTMLDivElement>(null);

  const resetScroll = () => {
    if (rightSidebarRef.current) {
      rightSidebarRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reset scroll to top whenever active tab changes
  useEffect(() => {
    resetScroll();
    const timer = setTimeout(() => {
      if (rightSidebarRef.current && rightSidebarRef.current.scrollTop !== 0) {
        rightSidebarRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 220);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleTabChange = (tab: ComponentActiveTab) => {
    onTabChange(tab);
    resetScroll();
  };

  return (
    <aside
      className="sticky top-20 z-30 hidden xl:flex flex-col xl:w-[360px] 2xl:w-[500px] h-[calc(100vh-5rem)] shrink-0"
    >
      <div
        className={cn(
          "w-full h-full flex flex-col transition-colors duration-300",
          "bg-background/80 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl",
          "shadow-2xl shadow-black/5 dark:shadow-black/60",
          "border-l border-black/[0.08] dark:border-white/[0.08]",
          "relative rounded-l-[32px] rounded-r-none overflow-hidden"
        )}
      >
        {/* Left-side gradient hairline separator */}
        <Separator
          orientation="vertical"
          className="absolute left-0 top-0 bottom-0 pointer-events-none"
        />

        {/* Pinned / Fixed Header on Top */}
        <ComponentSidebarHeader
          title={title}
          slug={slug}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          hasPlayground={hasPlayground}
        />

        {/* Scrollable inner content with its own dedicated padding */}
        <div
          ref={rightSidebarRef}
          className="flex-1 min-h-0 overflow-y-auto hide-scrollbar flex flex-col w-full p-4 sm:p-5"
        >
          {children}
        </div>
      </div>
    </aside>
  );
}
