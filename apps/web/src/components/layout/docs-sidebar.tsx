"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import {
  BookOpen,
  Compass,
  Terminal,
  Layers,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, SparkleStarIcon } from "@/icons";
import { siteConfig } from "@/config/site";
import { componentsConfig } from "@/config/components";
import { getComponentIcon } from "@/config/component-icons";
import { useGitHubStars } from "@/hooks/use-github-stars";

export interface DocsSidebarProps {
  onClick?: () => void;
  progress?: MotionValue<number>;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function DocsSidebar({
  onClick,
  progress,
  isCollapsed: manualIsCollapsed,
  onToggleCollapse,
}: DocsSidebarProps) {
  const pathname = usePathname();
  const { starCountText } = useGitHubStars();
  const defaultProgress = useMotionValue(0);
  const activeProgress = progress ?? defaultProgress;

  // Track boolean collapsed state for tooltip display (active when progress > 0.7)
  const [isRailMode, setIsRailMode] = React.useState(false);
  React.useEffect(() => {
    if (!progress) return;
    const initialRailMode = progress.get() > 0.7;
    setIsRailMode(initialRailMode);
    let prevRailMode = initialRailMode;

    let timeoutId: NodeJS.Timeout | null = null;
    const unsub = progress.on("change", (latest) => {
      const nextRailMode = latest > 0.7;
      if (nextRailMode !== prevRailMode) {
        prevRailMode = nextRailMode;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsRailMode(nextRailMode);
        }, 0);
      }
    });

    return () => {
      unsub();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [progress]);

  const isCollapsed = manualIsCollapsed ?? isRailMode;

  // 1:1 smooth opacity and subtle glide transforms
  const labelOpacity = useTransform(activeProgress, [0, 0.65], [1, 0], { clamp: true });
  const labelX = useTransform(activeProgress, [0, 0.65], [0, -8], { clamp: true });
  // Section headers scrub vertically (bottom-to-top approach synced with scroll)
  const headerOpacity = useTransform(activeProgress, [0, 0.55], [1, 0], { clamp: true });
  const headerY = useTransform(activeProgress, [0, 0.55], [0, -18], { clamp: true });
  const headerScale = useTransform(activeProgress, [0, 0.55], [1, 0.92], { clamp: true });

  // Staggered cascade entrance variants on initial load / refresh
  const sidebarContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.038,
        delayChildren: 0.06,
      },
    },
  };

  const sidebarItemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Navigation Items matching the screenshot
  const gettingStartedItems = [
    { title: "Documentation", href: siteConfig.routes.DOCS, icon: BookOpen },
    { title: "Installation", href: siteConfig.routes.INSTALLATION, icon: Terminal },
  ];

  // Dynamic component items loaded from componentsConfig (single source of truth with enable/disable)
  const componentItems = React.useMemo(() => {
    return componentsConfig
      .filter((c) => c.enabled)
      .map((c) => {
        const Icon = getComponentIcon(c.slug);
        const badgeInfo = siteConfig.sidebar.showBadges
          ? siteConfig.sidebar.componentBadges[c.slug]
          : undefined;

        return {
          title: c.name,
          href: c.href,
          icon: Icon,
          badge: badgeInfo?.badge,
          badgeColor: badgeInfo?.color,
        };
      });
  }, []);

  const renderItem = (item: {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    isExternal?: boolean;
    badge?: string;
    badgeColor?: string;
  }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    const content = (
      <div className="group relative flex items-center select-none w-full h-[44px] px-3.5">
        {/* ── 1. Left Glowing Neon Indicator Bar on Sidebar Card Outer Border ── */}
        {isActive && (
          <span
            className="absolute rounded-full bg-[var(--theme-primary)] z-30 pointer-events-none shadow-[0_0_8px_var(--theme-primary),0_0_16px_var(--theme-primary)] left-0 top-1/2 -translate-y-1/2 w-[3px] h-[16px]"
          />
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
          {/* Active Frosted Capsule Background matching Reference Image */}
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

          {/* Centered Icon Box (40px x 40px) */}
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

          {/* Label & Badges with scroll/hover driven opacity and subtle glide */}
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
        <Link
          href={item.href}
          onClick={onClick}
          className="block cursor-pointer"
        >
          {content}
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col select-none">
      {/* ─── Top Header: Logo Icon Only + Collapsible Toggle ─── */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="shrink-0 px-3.5 pb-2"
      >
        <div className="flex items-center pt-1 w-full">
          <Link
            href="/"
            onClick={onClick}
            className="flex items-center group cursor-pointer"
            title="Intense UI"
          >
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <div className="w-8 h-8 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo-icon.png"
                  alt="Intense UI"
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </Link>

          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="ml-auto text-zinc-500 hover:text-zinc-900 dark:hover:text-white p-1.5 rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
              title="Toggle sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>

      {/* ─── Separator 1: Below Sidebar Logo ─── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="w-full my-2.5 origin-left"
      >
        <Separator />
      </motion.div>

      {/* ─── Navigation Items List (Staggered One-By-One Entrance) ─── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sidebarContainerVariants}
        className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-1 w-full"
      >
        {/* Section 1: GETTING STARTED (Fixed h-6 slot with vertical bottom-to-top scroll glide) */}
        <motion.div variants={sidebarItemVariants} className="group/sec1 h-6 shrink-0 relative flex items-center px-4">
          <div className="w-full h-full flex items-center overflow-hidden pointer-events-none">
            <motion.div
              style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 whitespace-nowrap will-change-[transform,opacity]"
            >
              Getting Started
            </motion.div>
          </div>

          {/* Tooltip on Collapsed Mode */}
          {isCollapsed && (
            <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-white dark:bg-[#121215] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-xs font-medium shadow-2xl pointer-events-none opacity-0 group-hover/sec1:opacity-100 transition-opacity whitespace-nowrap z-50">
              Getting Started
            </div>
          )}
        </motion.div>

        {gettingStartedItems.map(renderItem)}

        {/* ─── Separator 2: Below Getting Started ─── */}
        <motion.div variants={sidebarItemVariants}>
          <Separator className="my-3" />
        </motion.div>

        {/* Section 2: COMPONENTS Header with Badge (5) (Fixed h-6 slot with vertical bottom-to-top scroll glide) */}
        <motion.div variants={sidebarItemVariants} className="group/sec2 h-6 shrink-0 relative flex items-center justify-between px-4">
          <div className="w-full h-full flex items-center justify-between overflow-hidden pointer-events-none">
            <motion.div
              style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
              className="flex items-center justify-between w-full text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 whitespace-nowrap will-change-[transform,opacity]"
            >
              <span>Components</span>
              <span className="w-5 h-5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 flex items-center justify-center text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">
                {componentItems.length}
              </span>
            </motion.div>
          </div>

          {/* Tooltip on Collapsed Mode */}
          {isCollapsed && (
            <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-white dark:bg-[#121215] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-xs font-medium shadow-2xl pointer-events-none opacity-0 group-hover/sec2:opacity-100 transition-opacity whitespace-nowrap z-50 flex items-center gap-1.5">
              <span>Components</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-black/[0.05] dark:bg-white/[0.08] border border-black/10 dark:border-white/10">
                {componentItems.length}
              </span>
            </div>
          )}
        </motion.div>

        {/* Components List */}
        {componentItems.map(renderItem)}

        {/* ─── Separator 3: Where Component Ends ─── */}
        <motion.div variants={sidebarItemVariants}>
          <Separator className="my-3" />
        </motion.div>

        {/* Section 3: GitHub with animated morph & golden star badge matching header */}
        <motion.div variants={sidebarItemVariants}>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository & Stars"
            className="group relative flex items-center select-none w-full h-[44px] px-3.5 cursor-pointer block"
          >
            {/* Capsule Pill Container */}
            <div
              className={cn(
                "relative flex items-center rounded-full w-full h-10 overflow-hidden transition-all",
                "text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04] dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/[0.04]"
              )}
            >
              {/* Centered Icon Box (40px x 40px) with Animated GitHub -> SparkleStar morph */}
              <div className="w-10 h-10 flex items-center justify-center shrink-0 z-10 relative">
                <GithubIcon className="w-[18px] h-[18px] absolute transition-all duration-300 ease-out transform group-hover:scale-0 group-hover:rotate-45 group-hover:opacity-0 pointer-events-none text-zinc-500 group-hover:text-zinc-950 dark:text-zinc-400 dark:group-hover:text-white" />
                <SparkleStarIcon className="w-[19px] h-[19px] absolute transition-all duration-300 ease-out transform scale-0 -rotate-45 opacity-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
              </div>

              {/* Label & Star Count Pill with scroll/hover driven opacity and subtle glide */}
              <motion.div
                style={{ opacity: labelOpacity, x: labelX }}
                className="flex-1 flex items-center justify-between min-w-0 z-10 overflow-hidden whitespace-nowrap pr-3"
              >
                <span className="text-[14px] truncate transition-colors text-zinc-700 group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white font-normal">
                  GitHub
                </span>

                {/* Star Capsule Pill matching Header */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-sans font-medium shrink-0 ml-2 transition-all bg-black/[0.05] dark:bg-white/[0.08] border border-black/10 dark:border-white/10 group-hover:border-amber-500/40 text-zinc-700 dark:text-zinc-300 group-hover:text-amber-500 dark:group-hover:text-amber-300 shadow-xs">
                  <SparkleStarIcon className="w-3.5 h-3.5 shrink-0 pointer-events-none drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
                  <span>{starCountText || "★"}</span>
                </span>
              </motion.div>

              {/* Tooltip on Collapsed Mode */}
              {isCollapsed && (
                <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-white dark:bg-[#121215] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-xs font-medium shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 flex items-center gap-2">
                  <span>GitHub</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-sans font-medium text-amber-500 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20">
                    <SparkleStarIcon className="w-3 h-3 shrink-0" />
                    <span>{starCountText || "★"}</span>
                  </span>
                </div>
              )}
            </div>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
