"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon, SparkleStarIcon } from "@/icons";
import { useGitHubStars } from "@/hooks/use-github-stars";

export interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-screen centered navigation overlay for mobile and compact viewports
 */
export function HeaderMobileMenu({ isOpen, onClose }: HeaderMobileMenuProps) {
  const pathname = usePathname();
  const { starCountText } = useGitHubStars();

  const isItemActive = (href: string, matchExact?: boolean) => {
    if (href === "/") return pathname === "/";
    if (matchExact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="full-screen-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          className="fixed inset-0 z-[65] bg-background/70 dark:bg-black/60 backdrop-blur-2xl flex flex-col items-center justify-center p-6 select-none pointer-events-auto"
        >
          {/* Centered navigation stack */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.08,
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  staggerChildren: 0.05,
                  staggerDirection: -1,
                },
              },
            }}
            className="flex flex-col items-center gap-7 sm:gap-9 text-center max-w-md w-full"
          >
            {siteConfig.header.navItems.map((item) => {
              const isActive = isItemActive(item.href, item.matchExact);
              return (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 340,
                        damping: 26,
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -16,
                      scale: 0.95,
                      transition: {
                        duration: 0.24,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-block transition-all duration-200 tracking-tight hover:scale-105 cursor-pointer",
                      isActive
                        ? "text-3xl sm:text-4xl font-bold text-foreground hover:text-primary"
                        : "text-2xl sm:text-3xl font-medium text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}

            {/* Mobile-only Quick Action Buttons (GitHub, Theme Mode) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 340,
                    damping: 26,
                  },
                },
                exit: {
                  opacity: 0,
                  y: -12,
                  scale: 0.95,
                  transition: {
                    duration: 0.2,
                  },
                },
              }}
              className="flex md:hidden items-center justify-center gap-3 pt-6 w-full max-w-[180px]"
            >
              {/* GitHub repository icon with animated hover morph and stars */}
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Repository & Stars"
                className="group inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-black/5 dark:bg-zinc-900/90 border border-black/10 dark:border-white/10 hover:border-amber-500/40 hover:bg-black/10 dark:hover:bg-zinc-800/90 transition-all shrink-0 cursor-pointer active:scale-95 select-none shadow-xs"
              >
                <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                  <GithubIcon className="w-5 h-5 absolute transition-all duration-300 ease-out transform group-hover:scale-0 group-hover:rotate-45 group-hover:opacity-0 pointer-events-none text-zinc-600 dark:text-zinc-400" />
                  <SparkleStarIcon className="w-5 h-5 absolute transition-all duration-300 ease-out transform scale-0 -rotate-45 opacity-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                </div>
                <span className="text-sm font-sans font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors">
                  {starCountText || "★"}
                </span>
              </a>

              {/* Theme toggle */}
              <ThemeToggle className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[var(--theme-primary)]/40 hover:text-foreground text-muted-foreground transition-all shrink-0 cursor-pointer p-0 active:scale-95" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
