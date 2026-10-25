"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Code, SlidersHorizontal, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
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
export function ComponentTabControls({
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

  const handleInstallClick = () => {
    onTabChange(!isBottomBar && activeTab === "install" ? "info" : "install");
  };

  const tabs = [
    ...(hasPlayground
      ? [
          {
            id: "playground" as const,
            title: "Playground Studio",
            icon: SlidersHorizontal,
          },
        ]
      : []),
    {
      id: "info" as const,
      title: "Preview",
      icon: Monitor,
    },
    {
      id: "code" as const,
      title: "Code",
      icon: Code,
    },
  ];

  return (
    <div className={cn("flex items-center gap-1.5 sm:gap-2 shrink-0 select-none", className)}>
      {/* Cyber Terminal Install Pill Button */}
      <button
        type="button"
        onClick={handleInstallClick}
        className={cn(
          "relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer select-none min-h-[34px] sm:min-h-[36px]",
          isTabActive("install")
            ? "bg-[var(--theme-primary)] text-white shadow-[0_0_16px_var(--theme-primary)]/45 border border-white/30"
            : "bg-zinc-100/90 dark:bg-white/[0.06] hover:bg-zinc-200/90 dark:hover:bg-white/[0.12] text-zinc-700 dark:text-zinc-200 border border-black/[0.08] dark:border-white/[0.1] backdrop-blur-xl shadow-xs active:scale-95"
        )}
      >
        <Terminal
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isTabActive("install") ? "text-white" : "text-zinc-500 dark:text-zinc-400"
          )}
        />
        <span>Install</span>
      </button>

      {/* Floating Glassmorphic Capsule with Fluid Framer-Motion Spring Indicator */}
      <div className="relative flex items-center p-1 bg-zinc-100/90 dark:bg-black/50 border border-black/[0.08] dark:border-white/[0.12] rounded-full backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)]">
        {tabs.map((tab) => {
          const active = isTabActive(tab.id);
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative p-1.5 sm:p-2 rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center text-xs focus:outline-none select-none",
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
              <Icon
                className={cn(
                  "relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-200",
                  active
                    ? "text-[var(--theme-primary)] drop-shadow-[0_0_8px_var(--theme-primary)]"
                    : "text-zinc-500 dark:text-zinc-400"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
