"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export interface HeaderNavProps {
  isMenuOpen: boolean;
  navOpacity: MotionValue<number>;
  navScale: MotionValue<number>;
  navX: MotionValue<number>;
  navPointerEvents: MotionValue<"none" | "auto">;
}

/**
 * Desktop navigation menu tabs with Framer Motion active pill indicator
 */
export function HeaderNav({
  isMenuOpen,
  navOpacity,
  navScale,
  navX,
  navPointerEvents,
}: HeaderNavProps) {
  const pathname = usePathname();

  const isItemActive = (href: string, matchExact?: boolean) => {
    if (href === "/") return pathname === "/";
    if (matchExact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="flex-1 flex justify-center items-center px-2 overflow-hidden">
      <motion.nav
        style={{
          opacity: isMenuOpen ? 0 : navOpacity,
          scale: isMenuOpen ? 0.9 : navScale,
          x: isMenuOpen ? 0 : navX,
          pointerEvents: isMenuOpen ? "none" : navPointerEvents,
        }}
        className="hidden lg:flex items-center gap-1 bg-black/[0.04] dark:bg-zinc-900/90 p-1 rounded-full border border-black/5 dark:border-white/10 text-xs font-medium shrink-0 will-change-[opacity,transform] backdrop-blur-md"
      >
        {siteConfig.header.navItems.map((item) => {
          const isActive = isItemActive(item.href, item.matchExact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-xs transition-colors duration-200 select-none z-10",
                isActive
                  ? "text-zinc-950 dark:text-white font-semibold"
                  : "text-muted-foreground dark:text-zinc-400 hover:text-foreground dark:hover:text-white font-medium"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="header-active-pill"
                  transition={{
                    type: "spring",
                    stiffness: 440,
                    damping: 32,
                  }}
                  className="absolute inset-0 rounded-full -z-10 bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/15 shadow-xs"
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
