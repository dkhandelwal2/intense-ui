"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedTerminalIcon, AnimatedCodeIcon } from "@/assets/icons";
import { PlaygroundReorderIcon } from "@/components/showcases/common";
import { ComponentActiveTab } from "./types";

export interface ComponentTabControlsProps {
  activeTab: ComponentActiveTab;
  onTabChange: (tab: ComponentActiveTab) => void;
  hasPlayground?: boolean;
  isBottomBar?: boolean;
  isOpen?: boolean;
  layoutIdPrefix?: string;
  className?: string;
}

/**
 * Cyber Glassmorphic Tab Controls
 * Single source of truth for component inspector tab navigation
 * (Terminal Install button + Floating glass capsule with fluid spring indicator).
 */
export const ComponentTabControls = React.memo(function ComponentTabControls({
  activeTab,
  onTabChange,
  hasPlayground = true,
  isBottomBar = false,
  isOpen = true,
  layoutIdPrefix = isBottomBar ? "bottom-bar" : "tab-controls",
  className,
}: ComponentTabControlsProps) {
  const isTabActive = (tab: ComponentActiveTab) =>
    isBottomBar ? isOpen && activeTab === tab : activeTab === tab;

  const tabs = [
    {
      id: "install" as const,
      title: "CLI Installation",
    },
    ...(hasPlayground
      ? [
        {
          id: "playground" as const,
          title: "Playground Studio",
        },
      ]
      : []),
    {
      id: "code" as const,
      title: "Preview & Source Code",
    },
  ];

  return (
    <div className={cn("flex items-center gap-1.5 sm:gap-2 shrink-0 select-none", className)}>
      {/* Floating Glassmorphic Capsule with Fluid Framer-Motion Spring Indicator */}
      <div className="relative flex items-center p-0.5 sm:p-1 bg-zinc-100/90 dark:bg-black/50 border border-black/[0.08] dark:border-white/[0.12] rounded-full backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)] shrink-0">
        {tabs.map((tab) => {
          const active = isTabActive(tab.id);
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative p-1.5 sm:p-2 rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center text-sm focus:outline-none select-none touch-manipulation mx-1",
                active
                  ? "text-[var(--theme-primary)]"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              )}
              title={tab.title}
              aria-label={tab.title}
            >
              {active && (
                <motion.div
                  layoutId={`${layoutIdPrefix}-tab-indicator`}
                  className="absolute inset-0 rounded-full bg-[var(--theme-primary)]/20 dark:bg-[var(--theme-primary)]/30 border border-[var(--theme-primary)]/50 shadow-[0_0_12px_var(--theme-primary)]/40 backdrop-blur-md"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {tab.id === "install" && (
                <div className="relative z-10 flex items-center justify-center">
                  <AnimatedTerminalIcon size="sm" active={active} />
                </div>
              )}
              {tab.id === "playground" && (
                <div className="relative z-10 flex items-center justify-center p-0.5">
                  <PlaygroundReorderIcon size="sm" />
                </div>
              )}
              {tab.id === "code" && (
                <div className="relative z-10 flex items-center justify-center">
                  <AnimatedCodeIcon size="sm" active={active} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});
