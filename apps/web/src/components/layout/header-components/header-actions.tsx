"use client";

import React from "react";
import { motion, type MotionValue } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon, SparkleStarIcon } from "@/icons";
import { siteConfig } from "@/config/site";
import { useGitHubStars } from "@/hooks/use-github-stars";

export interface HeaderActionsProps {
  isMenuOpen: boolean;
  isMenuClosing: boolean;
  onOpenSearch: () => void;
  onToggleMenu: () => void;
  desktopHamburgerWidth: MotionValue<number>;
  desktopHamburgerOpacity: MotionValue<number>;
  desktopHamburgerScale: MotionValue<number>;
  desktopHamburgerMarginLeft: MotionValue<number>;
  desktopHamburgerPointerEvents: MotionValue<"none" | "auto">;
}

/**
 * Header right-side actions: Search trigger, GitHub star button, ThemeToggle, and Hamburger toggles
 */
export function HeaderActions({
  isMenuOpen,
  isMenuClosing,
  onOpenSearch,
  onToggleMenu,
  desktopHamburgerWidth,
  desktopHamburgerOpacity,
  desktopHamburgerScale,
  desktopHamburgerMarginLeft,
  desktopHamburgerPointerEvents,
}: HeaderActionsProps) {
  const { starCountText } = useGitHubStars();

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* 1. Search trigger button */}
      <button
        type="button"
        onClick={onOpenSearch}
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[var(--theme-primary)]/40 hover:text-foreground text-muted-foreground transition-all cursor-pointer shrink-0 group active:scale-95",
          "h-10 w-10 sm:h-9 sm:w-auto sm:px-3 sm:gap-2"
        )}
        title="Search documentation (⌘K)"
      >
        <Search className="h-4 w-4 text-zinc-400 group-hover:text-[var(--theme-primary)] transition-colors" />
        <span className="hidden sm:inline text-xs text-muted-foreground/80 group-hover:text-foreground transition-colors">
          Search...
        </span>
        <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground/70 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10">
          ⌘K
        </kbd>
      </button>

      {/* 2 & 3. Desktop-only secondary actions: GitHub & Theme Toggle */}
      <div className="hidden md:flex items-center gap-2">
        {/* GitHub repository with dynamic Star Count and animated hover morph */}
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Repository & Stars"
          className="group inline-flex items-center gap-2 h-8 sm:h-9 px-3 rounded-full bg-black/5 dark:bg-zinc-900/90 border border-black/10 dark:border-white/10 hover:border-amber-500/40 hover:bg-black/10 dark:hover:bg-zinc-800/90 transition-all shrink-0 cursor-pointer select-none active:scale-95 shadow-xs"
        >
          {/* Animated Icon: GitHub transforms into sparkling golden star on hover */}
          <div className="relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
            <GithubIcon className="w-4 h-4 absolute transition-all duration-300 ease-out transform group-hover:scale-0 group-hover:rotate-45 group-hover:opacity-0 pointer-events-none text-zinc-600 dark:text-zinc-400 group-hover:text-foreground" />
            <SparkleStarIcon className="w-4.5 h-4.5 absolute transition-all duration-300 ease-out transform scale-0 -rotate-45 opacity-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
          </div>

          {/* Dynamic Star Count */}
          <span className="text-xs sm:text-[13px] font-sans font-medium tracking-tight text-zinc-700 dark:text-zinc-200 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors">
            {starCountText || "★"}
          </span>
        </a>

        {/* Theme toggle */}
        <ThemeToggle className="inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[var(--theme-primary)]/40 hover:text-foreground text-muted-foreground transition-all shrink-0 cursor-pointer p-0" />
      </div>

      {/* Tablet & Mobile Hamburger (< lg): Static, immediate CSS rendering without layout shift */}
      <div className="flex lg:hidden items-center justify-center shrink-0">
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          title={isMenuOpen ? "Close menu" : "Open menu"}
          className={cn(
            "inline-flex items-center justify-center h-10 w-10 rounded-full border transition-all cursor-pointer shrink-0 relative overflow-hidden active:scale-95",
            isMenuOpen
              ? "bg-black/10 text-zinc-950 border-black/15 shadow-xs dark:bg-white/10 dark:text-white dark:border-white/15 dark:shadow-xs"
              : "bg-black/5 text-zinc-700 hover:text-zinc-950 border-black/10 hover:border-[var(--theme-primary)]/40 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-white dark:border-white/10 dark:hover:border-[var(--theme-primary)]/40"
          )}
        >
          <div className="w-5 h-5 relative flex items-center justify-center pointer-events-none">
            <motion.span
              initial={false}
              animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-4.5 h-[2px] bg-current rounded-full absolute"
            />
            <motion.span
              initial={false}
              animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="w-4.5 h-[2px] bg-current rounded-full absolute"
            />
            <motion.span
              initial={false}
              animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-4.5 h-[2px] bg-current rounded-full absolute"
            />
          </div>
        </button>
      </div>

      {/* Desktop Hamburger (≥ lg): Scroll-scrubbed dynamic island morph */}
      <motion.div
        initial={false}
        style={{
          width: isMenuOpen || isMenuClosing ? 36 : desktopHamburgerWidth,
          opacity: isMenuOpen || isMenuClosing ? 1 : desktopHamburgerOpacity,
          scale: isMenuOpen || isMenuClosing ? 1 : desktopHamburgerScale,
          marginLeft: isMenuOpen || isMenuClosing ? 4 : desktopHamburgerMarginLeft,
          pointerEvents: isMenuOpen || isMenuClosing ? "auto" : desktopHamburgerPointerEvents,
        }}
        className="hidden lg:flex overflow-hidden items-center justify-center shrink-0 will-change-[width,opacity,transform]"
      >
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          title={isMenuOpen ? "Close menu" : "Open menu"}
          className={cn(
            "inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full border transition-all cursor-pointer shrink-0 relative overflow-hidden active:scale-95",
            isMenuOpen
              ? "bg-black/10 text-zinc-950 border-black/15 shadow-xs dark:bg-white/10 dark:text-white dark:border-white/15 dark:shadow-xs"
              : "bg-black/5 text-zinc-700 hover:text-zinc-950 border-black/10 hover:border-[var(--theme-primary)]/40 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-white dark:border-white/10 dark:hover:border-[var(--theme-primary)]/40"
          )}
        >
          <div className="w-4 h-4 relative flex items-center justify-center pointer-events-none">
            <motion.span
              initial={false}
              animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4.5 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-3.5 h-[1.75px] bg-current rounded-full absolute"
            />
            <motion.span
              initial={false}
              animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="w-3.5 h-[1.75px] bg-current rounded-full absolute"
            />
            <motion.span
              initial={false}
              animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4.5 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-3.5 h-[1.75px] bg-current rounded-full absolute"
            />
          </div>
        </button>
      </motion.div>
    </div>
  );
}
