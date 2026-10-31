"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MobileSidebarTriggerProps } from "./types";

export function MobileSidebarTrigger({
  isOpen,
  onToggle,
  className,
}: MobileSidebarTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-xl transition-all active:scale-95 cursor-pointer touch-manipulation",
        "bg-white/95 text-zinc-800 border border-black/10 shadow-sm hover:bg-white hover:text-zinc-950 hover:border-black/20",
        "dark:bg-zinc-900/95 dark:text-zinc-100 dark:border-white/15 dark:shadow-md dark:shadow-black/70 dark:hover:bg-zinc-800 dark:hover:text-white dark:hover:border-white/25",
        isOpen &&
          "border-[var(--theme-primary)]/40 text-[var(--theme-primary)] dark:border-[var(--theme-primary)]/50 dark:text-[var(--theme-primary)]",
        className
      )}
      onClick={onToggle}
      aria-label="Toggle navigation drawer"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close-icon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="flex items-center justify-center"
          >
            <PanelLeftClose className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="open-icon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="flex items-center justify-center"
          >
            <PanelLeftOpen className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
