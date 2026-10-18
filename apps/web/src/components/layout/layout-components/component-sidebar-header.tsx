"use client";

import React from "react";
import { Monitor, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentActiveTab } from "./types";
import { ComponentMoreMenu } from "./component-more-menu";
import { Separator } from "@/components/ui/separator";

export interface ComponentSidebarHeaderProps {
  title: string;
  activeTab: ComponentActiveTab;
  onTabChange: (tab: ComponentActiveTab) => void;
  className?: string;
  isBottomBar?: boolean;
  isOpen?: boolean;
}

export function ComponentSidebarHeader({
  title,
  activeTab,
  onTabChange,
  className,
  isBottomBar = false,
  isOpen = true,
}: ComponentSidebarHeaderProps) {
  const isTabActive = (tab: ComponentActiveTab) =>
    isBottomBar ? isOpen && activeTab === tab : activeTab === tab;

  const handleInstallClick = () => {
    onTabChange(!isBottomBar && activeTab === "install" ? "info" : "install");
  };

  const headerContent = (
    <div className="flex items-center justify-between gap-3 py-0.5 w-full min-w-0">
      <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase truncate min-w-0 flex-1">
        {title}
      </h2>
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={handleInstallClick}
          className={cn(
            "px-6 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer min-h-[38px]",
            isTabActive("install")
              ? "bg-[var(--theme-primary)] text-white shadow-sm"
              : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
          )}
        >
          Install
        </button>
        <div className="flex items-center p-1 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full">
          <button
            type="button"
            onClick={() => onTabChange("info")}
            className={cn(
              "p-1.5 rounded-full transition-colors cursor-pointer",
              isTabActive("info")
                ? "bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
            )}
            title="Preview"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onTabChange("code")}
            className={cn(
              "p-1.5 rounded-full transition-colors cursor-pointer",
              isTabActive("code")
                ? "bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
            )}
            title="Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <ComponentMoreMenu />
        </div>
      </div>
    </div>
  );

  if (isBottomBar) {
    return (
      <div
        className={cn(
          "fixed bottom-0 left-0 md:left-[68px] right-0 z-40 bg-background/90 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 pl-12 pr-4 sm:px-6 py-3.5 shadow-2xl flex items-center justify-between xl:hidden rounded-t-3xl",
          className
        )}
      >
        {headerContent}
      </div>
    );
  }

  return (
    <div className={cn("shrink-0 flex flex-col mb-4 w-full", className)}>
      {headerContent}
      {/* ─── Gradient Hairline Separator below Header ─── */}
      <Separator className="mt-3" />
    </div>
  );
}
