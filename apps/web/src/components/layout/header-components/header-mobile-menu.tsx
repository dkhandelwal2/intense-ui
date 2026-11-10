"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon, SparkleStarIcon } from "@/assets/icons";
import { useGitHubStars } from "@/hooks/use-github-stars";
import {
  OVERLAY_OPEN_TRANSITION,
  OVERLAY_CLOSE_TRANSITION,
  ITEM_ENTER_TRANSITION,
  ITEM_EXIT_TRANSITION,
} from "./constants";
import { HeaderMobileMenuProps } from "./types";

type MenuPhase = "closed" | "sliding-down" | "open" | "items-exiting" | "sliding-up";

export function HeaderMobileMenu({ isOpen, onClose }: HeaderMobileMenuProps) {
  const pathname = usePathname();
  const { starCountText } = useGitHubStars();
  const [phase, setPhase] = useState<MenuPhase>(isOpen ? "open" : "closed");
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Synchronize phase during render when isOpen prop changes (React recommended pattern)
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setPhase("sliding-down");
    } else if (phase === "open" || phase === "sliding-down") {
      setPhase("items-exiting");
    }
  }

  // When items are exiting, trigger overlay slide-up after items finish
  useEffect(() => {
    if (phase === "items-exiting") {
      const timer = setTimeout(() => {
        setPhase("sliding-up");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Handle ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && isOpen && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const isItemActive = (href: string, matchExact?: boolean) => {
    if (href === "/") return pathname === "/";
    if (matchExact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  if (phase === "closed") return null;

  const isOverlayAtZero = phase === "sliding-down" || phase === "open" || phase === "items-exiting";
  const areItemsVisible = phase === "open";

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: isOverlayAtZero ? "0%" : "-100%" }}
      transition={isOverlayAtZero ? OVERLAY_OPEN_TRANSITION : OVERLAY_CLOSE_TRANSITION}
      onAnimationComplete={() => {
        if (phase === "sliding-down") {
          setPhase("open");
        } else if (phase === "sliding-up") {
          setPhase("closed");
        }
      }}
      aria-hidden={!isOpen}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cn(
        "fixed inset-0 z-[65] bg-white/95 dark:bg-[#070709]/98 backdrop-blur-3xl flex flex-col justify-between px-6 pt-28 pb-10 sm:px-12 sm:pt-32 sm:pb-12 select-none overflow-hidden border-b border-zinc-200/60 dark:border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.5)] will-change-transform",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* Centered navigation links: animated ONLY after overlay has finished opening */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        <ul className="flex flex-col items-center gap-6 sm:gap-8 w-full list-none p-0 m-0">
          {siteConfig.header.navItems.map((item, idx) => {
            const isActive = isItemActive(item.href, item.matchExact);
            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={areItemsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={areItemsVisible ? ITEM_ENTER_TRANSITION(idx) : ITEM_EXIT_TRANSITION(idx)}
                className="w-full text-center will-change-[transform,opacity]"
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group inline-flex items-baseline justify-center gap-3 transition-transform duration-200 hover:scale-105 cursor-pointer",
                    isActive
                      ? "text-3xl sm:text-5xl font-bold text-foreground"
                      : "text-2xl sm:text-4xl font-semibold text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="group-hover:text-[var(--theme-primary)] transition-colors">
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[var(--theme-primary)]" />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Action Strip */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={areItemsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={areItemsVisible ? { duration: 0.25, delay: 0.35 } : { duration: 0.15 }}
        className="flex items-center justify-center gap-4 pt-6 border-t border-zinc-200/50 dark:border-white/5 w-full max-w-md mx-auto will-change-[transform,opacity]"
      >
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Repository & Stars"
          className="group inline-flex items-center gap-2 h-10 px-4 rounded-full bg-black/5 dark:bg-zinc-900/90 border border-black/10 dark:border-white/10 hover:border-amber-500/40 transition-all shrink-0 cursor-pointer active:scale-95 select-none shadow-xs text-sm font-medium"
        >
          <div className="relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
            <GithubIcon className="w-4 h-4 absolute transition-all duration-300 ease-out transform group-hover:scale-0 group-hover:rotate-45 group-hover:opacity-0 text-zinc-600 dark:text-zinc-400" />
            <SparkleStarIcon className="w-4.5 h-4.5 absolute transition-all duration-300 ease-out transform scale-0 -rotate-45 opacity-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
          </div>
          <span className="text-zinc-700 dark:text-zinc-200 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors">
            {starCountText || "★"}
          </span>
        </a>

        <ThemeToggle className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[var(--theme-primary)]/40 hover:text-foreground text-muted-foreground transition-all shrink-0 cursor-pointer p-0 active:scale-95" />
      </motion.div>
    </motion.div>
  );
}
