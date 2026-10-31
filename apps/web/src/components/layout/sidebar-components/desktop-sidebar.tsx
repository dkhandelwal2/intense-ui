"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/layout/sidebar";
import type { DesktopSidebarProps } from "./types";

export function DesktopSidebar({
  className,
  isInline,
  isEmbedded,
  width,
  effectiveProgress,
  onMouseEnter,
  onMouseLeave,
  onToggleCollapse,
}: DesktopSidebarProps) {
  return (
    <motion.aside
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ width }}
      className={cn(
        isInline
          ? "relative top-0 z-30 hidden md:flex flex-col h-full shrink-0 select-none will-change-[width]"
          : "sticky top-20 z-30 hidden md:flex flex-col h-[calc(100vh-6rem)] shrink-0 py-1 select-none will-change-[width]",
        className
      )}
    >
      <div
        className={cn(
          "w-full h-full flex flex-col transition-colors duration-300",
          isEmbedded
            ? "bg-zinc-50/40 dark:bg-black/20 border-r border-zinc-200/80 dark:border-zinc-800/80 shadow-none relative py-3.5 px-0 overflow-hidden"
            : "bg-background/80 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/60 relative rounded-[32px] py-3.5 px-0 overflow-hidden"
        )}
      >
        <Separator
          orientation="vertical"
          className="absolute right-0 top-0 bottom-0 pointer-events-none"
        />
        <Sidebar
          progress={effectiveProgress}
          onToggleCollapse={onToggleCollapse}
        />
      </div>
    </motion.aside>
  );
}
