"use client";

import { motion, type MotionValue } from "framer-motion";
import { sidebarItemVariants } from "./sidebar-animations";

interface SidebarSectionHeaderProps {
  title: string;
  count?: number;
  isCollapsed: boolean;
  headerOpacity: MotionValue<number>;
  headerY: MotionValue<number>;
  headerScale: MotionValue<number>;
}

export function SidebarSectionHeader({
  title,
  count,
  isCollapsed,
  headerOpacity,
  headerY,
  headerScale,
}: SidebarSectionHeaderProps) {
  return (
    <motion.div
      variants={sidebarItemVariants}
      className="group/sec h-6 shrink-0 relative flex items-center justify-between px-4"
    >
      <div className="w-full h-full flex items-center justify-between overflow-hidden pointer-events-none">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
          className="flex items-center justify-between w-full text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 whitespace-nowrap will-change-[transform,opacity]"
        >
          <span>{title}</span>
          {count !== undefined && (
            <span className="w-5 h-5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 flex items-center justify-center text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">
              {count}
            </span>
          )}
        </motion.div>
      </div>

      {/* Tooltip on Collapsed Mode */}
      {isCollapsed && (
        <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-white dark:bg-[#121215] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-xs font-medium shadow-2xl pointer-events-none opacity-0 group-hover/sec:opacity-100 transition-opacity whitespace-nowrap z-50 flex items-center gap-1.5">
          <span>{title}</span>
          {count !== undefined && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-black/[0.05] dark:bg-white/[0.08] border border-black/10 dark:border-white/10">
              {count}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
