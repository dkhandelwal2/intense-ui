"use client";

import React from "react";
import { motion, type Transition } from "framer-motion";
import { Calendar, Activity, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GithubActivityVariant, GithubActivityStatsData } from "./types";

export interface NavItemConfig {
  value: GithubActivityVariant;
  label: string;
  sublabel: string;
  bgColor: string;
  color: string;
  icon: "heatmap" | "timeline" | "stats";
}

export const NAV_ITEMS: NavItemConfig[] = [
  { value: "heatmap", label: "Heatmap", sublabel: "Contribution calendar", bgColor: "#10b981", color: "#ffffff", icon: "heatmap" },
  { value: "timeline", label: "Timeline", sublabel: "Activity stream", bgColor: "#6366f1", color: "#ffffff", icon: "timeline" },
  { value: "stats", label: "Stats", sublabel: "Productivity", bgColor: "#f59e0b", color: "#ffffff", icon: "stats" },
];

export const SPRING = { type: "spring", bounce: 0.2, duration: 0.62 } as const;
export const HEADER_SPRING = { ...SPRING, bounce: 0.45 } as const;
export const ROW_SPRING = { ...SPRING, bounce: 0.26, delay: 0.08 } as const;
export const ROW_OFFSET = 16;
export const LIST_MOTION = {
  initial: { opacity: 0, x: ROW_OFFSET, y: ROW_OFFSET },
  animate: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: ROW_OFFSET, y: ROW_OFFSET },
};

export function getNavZIndex(index: number, activeIndex: number): number {
  if (index === activeIndex) return 30;
  if (activeIndex === 0) return 30 - index * 10;
  if (activeIndex === 2) return 10 + index * 10;
  return 10;
}

export function NavItemIcon({ icon, className }: { icon: "heatmap" | "timeline" | "stats"; className?: string }) {
  if (icon === "heatmap") return <Calendar className={cn("size-3.5", className)} />;
  if (icon === "timeline") return <Activity className={cn("size-3.5", className)} />;
  return <TrendingUp className={cn("size-3.5", className)} />;
}

export const NavAvatar = ({
  item,
  layoutId,
  transition = SPRING,
  className,
  style,
  asButton = false,
  isSelected = false,
  onClick,
}: {
  item: NavItemConfig;
  layoutId?: string;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  asButton?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  const Component = asButton ? motion.button : motion.span;
  return (
    <Component
      layoutId={layoutId}
      transition={transition}
      {...(asButton ? { type: "button" as const, role: "tab", "aria-label": item.label, "aria-selected": isSelected, onClick } : {})}
      className={cn(
        "relative grid size-7 shrink-0 place-items-center overflow-hidden rounded-full ring-2 ring-white dark:ring-zinc-950 shadow-2xs select-none",
        isSelected && "scale-105 shadow-sm",
        asButton && "cursor-pointer focus:outline-none hover:scale-105 active:scale-95",
        className
      )}
      style={{ backgroundColor: item.bgColor, color: item.color, ...style }}
    >
      <NavItemIcon icon={item.icon} />
    </Component>
  );
};

export const Chevron = ({ open, transition = SPRING }: { open: boolean; transition?: Transition }) => (
  <motion.svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
    className="size-5 text-zinc-500 dark:text-zinc-400" initial={false}
    animate={{ rotate: open ? 180 : 0 }} transition={transition}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m16 10-4 4-4-4" />
  </motion.svg>
);

export function getNavMetric(value: GithubActivityVariant, stats?: GithubActivityStatsData, totalCount?: number): string {
  if (value === "heatmap") return (totalCount ?? 1171).toLocaleString();
  if (value === "timeline") return (stats?.commitsCount ?? 124).toLocaleString();
  return `${stats?.currentStreak ?? 10}d`;
}
