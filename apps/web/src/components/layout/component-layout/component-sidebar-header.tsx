"use client";

import React from "react";
import { Monitor, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentActiveTab } from "./types";
import { ComponentMoreMenu } from "./component-more-menu";

export interface ComponentSidebarHeaderProps {
  title: string;
  activeTab: ComponentActiveTab;
  onTabChange: (tab: ComponentActiveTab) => void;
}

export function ComponentSidebarHeader({
  title,
  activeTab,
  onTabChange,
}: ComponentSidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between z-[70] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3 px-4 border-t border-black/5 dark:border-white/5 fixed bottom-0 left-0 right-0 xl:px-0 xl:py-2 xl:border-t-0 xl:border-b xl:sticky xl:top-0 xl:bottom-auto xl:left-auto xl:right-auto xl:bg-background xl:backdrop-blur-none xl:mb-6">
      <h1 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase truncate max-w-[45%]">
        {title}
      </h1>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onTabChange(activeTab === "install" ? "info" : "install")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-full transition-colors",
            activeTab === "install"
              ? "bg-[var(--theme-primary)] text-white"
              : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
          )}
        >
          Install
        </button>
        <div className="flex items-center p-1 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full">
          <button
            onClick={() => onTabChange("info")}
            className={cn(
              "p-1.5 rounded-full transition-colors",
              activeTab === "info"
                ? "bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
            )}
            title="Preview"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => onTabChange("code")}
            className={cn(
              "p-1.5 rounded-full transition-colors",
              activeTab === "code"
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
}
