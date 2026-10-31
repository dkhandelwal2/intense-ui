"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { sidebarItemVariants } from "./sidebar-animations";
import type { SidebarNavItemData } from "@/hooks/use-sidebar-nav-items";

interface SidebarNavItemProps {
  item: SidebarNavItemData;
  isCollapsed: boolean;
  labelOpacity: MotionValue<number>;
  labelX: MotionValue<number>;
  onClick?: () => void;
}

export function SidebarNavItem({
  item,
  isCollapsed,
  labelOpacity,
  labelX,
  onClick,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  const content = (
    <div className="group relative flex items-center select-none w-full h-[44px] px-3.5">
      {/* ── 1. Left Glowing Neon Indicator Bar on Sidebar Card Outer Border ── */}
      {isActive && (
        <span className="absolute rounded-full bg-[var(--theme-primary)] z-30 pointer-events-none shadow-[0_0_8px_var(--theme-primary),0_0_16px_var(--theme-primary)] left-0 top-1/2 -translate-y-1/2 w-[3px] h-[16px]" />
      )}

      {/* ── 2. Ambient Soft Glow Behind Left Curve of Capsule ── */}
      {isActive && (
        <div className="absolute pointer-events-none z-0 rounded-full bg-[var(--theme-primary)]/20 dark:bg-[var(--theme-primary)]/25 blur-lg left-2 top-1/2 -translate-y-1/2 w-10 h-10" />
      )}

      {/* ── 3. Capsule Pill ── */}
      <div
        className={cn(
          "relative flex items-center rounded-full w-full h-10 overflow-hidden",
          isActive
            ? "text-zinc-950 dark:text-white"
            : "text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04] dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/[0.04]"
        )}
      >
        {/* Active Frosted Capsule Background */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-full z-0 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_8px_-2px_rgba(0,0,0,0.06),inset_2px_0_8px_rgba(255,0,132,0.18)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.38),inset_2px_0_8px_0_rgba(255,0,132,0.25)]"
            style={{
              border: "1px solid transparent",
              background:
                "linear-gradient(to right, rgba(255, 0, 132, 0.08) 0%, var(--sidebar-pill-fill) 25%, var(--sidebar-pill-fill) 100%) padding-box, linear-gradient(90deg, var(--theme-primary) 0%, rgba(255, 0, 132, 0.85) 12%, var(--sidebar-pill-rim) 26%, var(--sidebar-pill-fade) 65%, transparent 100%) border-box",
            }}
          />
        )}

        {/* Centered Icon Box */}
        <div className="w-10 h-10 flex items-center justify-center shrink-0 z-10">
          <Icon
            className={cn(
              "w-[18px] h-[18px] transition-colors",
              isActive
                ? "text-zinc-950 dark:text-white"
                : "text-zinc-500 group-hover:text-zinc-950 dark:text-zinc-400 dark:group-hover:text-white"
            )}
          />
        </div>

        {/* Label & Badges */}
        <motion.div
          style={{ opacity: labelOpacity, x: labelX }}
          className="flex-1 flex items-center justify-between min-w-0 z-10 overflow-hidden whitespace-nowrap pr-3"
        >
          <span
            className={cn(
              "text-[14px] truncate transition-colors",
              isActive
                ? "text-zinc-950 dark:text-white font-medium"
                : "text-zinc-700 group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white font-normal"
            )}
          >
            {item.title}
          </span>

          {item.badge && (
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-bold font-mono shrink-0 transition-colors ml-2",
                isActive
                  ? "bg-black/[0.05] dark:bg-white/[0.08] text-zinc-700 dark:text-zinc-300 border border-black/10 dark:border-white/10"
                  : item.badgeColor === "rose"
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                  : item.badgeColor === "emerald"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 border border-black/10 dark:border-white/10"
              )}
            >
              {item.badge}
            </span>
          )}
        </motion.div>

        {/* Tooltip on Collapsed Mode */}
        {isCollapsed && (
          <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-white dark:bg-[#121215] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-xs font-medium shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 flex items-center gap-1.5">
            <span>{item.title}</span>
            {item.badge && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-black/[0.05] dark:bg-white/[0.08] border border-black/10 dark:border-white/10">
                {item.badge}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (item.isExternal) {
    return (
      <motion.div key={item.href} variants={sidebarItemVariants}>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer"
        >
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div key={item.href} variants={sidebarItemVariants}>
      <Link href={item.href} onClick={onClick} className="block cursor-pointer">
        {content}
      </Link>
    </motion.div>
  );
}
