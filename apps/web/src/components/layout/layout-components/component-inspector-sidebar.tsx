"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ComponentActiveTab } from "./types";
import { ComponentSidebarHeader } from "./component-sidebar-header";

export interface ComponentInspectorSidebarProps {
  title: string;
  activeTab: ComponentActiveTab;
  onTabChange: (tab: ComponentActiveTab) => void;
  children: React.ReactNode;
}

export function ComponentInspectorSidebar({
  title,
  activeTab,
  onTabChange,
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
    <aside className="sticky top-20 z-30 hidden xl:flex flex-col xl:w-[360px] 2xl:w-[460px] h-[calc(100vh-6rem)] shrink-0 py-1">
      <div
        className={cn(
          "w-full h-full flex flex-col transition-colors duration-300",
          "bg-background/80 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl",
          "shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/60",
          "relative rounded-[32px] p-5 overflow-hidden"
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
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Scrollable inner content */}
        <div
          ref={rightSidebarRef}
          className="flex-1 min-h-0 overflow-y-auto hide-scrollbar flex flex-col w-full"
        >
          {children}
        </div>
      </div>
    </aside>
  );
}
