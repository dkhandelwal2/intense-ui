"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { getComponentIcon } from "@/config/component-icons";

export interface ComponentTitleBadgeProps {
  title: string;
  slug?: string;
  icon?: React.ComponentType<{ className?: string }>;
  showStudioTag?: boolean;
  className?: string;
}

/**
 * Single source of truth for the Cyber Glass Component Title Badge:
 * Used across the desktop sticky inspector sidebar, mobile bottom controller bar,
 * and mobile bottom sheet drawer header.
 */
export function ComponentTitleBadge({
  title,
  slug,
  icon,
  showStudioTag = true,
  className,
}: ComponentTitleBadgeProps) {
  const ComponentIcon = icon || getComponentIcon(slug || title);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-zinc-100/90 dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xl shadow-2xs min-w-0 max-w-full shrink-0",
        className
      )}
    >
      <div className="flex items-center gap-1 shrink-0">
        <ComponentIcon className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
      </div>
      <h2 className="text-[10px] sm:text-xs font-black text-zinc-800 dark:text-zinc-100 tracking-tight sm:tracking-wider uppercase whitespace-nowrap">
        {title}
      </h2>
      {showStudioTag && (
        <span className="text-[9px] font-mono font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest hidden sm:inline border-l border-zinc-200 dark:border-white/10 pl-2">
          STUDIO
        </span>
      )}
    </div>
  );
}
