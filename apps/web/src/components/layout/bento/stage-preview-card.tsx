"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Activity, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComponentPlayground } from "@/context/playground-context";
import { PlaygroundReorderIcon } from "@/components/showcases/common";

export interface StagePreviewCardProps {
  slug: string;
  title: string;
  activeTocId: string;
  currentTocLabel?: string;
  isCustomizing: boolean;
  setIsCustomizing: (val: boolean) => void;
  activeVariantName?: string;
  activeScale?: string;
  renderStagePreview: () => React.ReactNode;
  handleViewCode?: () => void;
  onOpenPlayground?: () => void;
  isCodeOpened?: boolean;
  isDesktop?: boolean;
  className?: string;
}

export const StagePreviewCard = React.memo(function StagePreviewCard({
  slug,
  title,
  activeTocId,
  currentTocLabel,
  isCustomizing,
  setIsCustomizing,
  activeVariantName,
  activeScale,
  renderStagePreview,
  handleViewCode,
  onOpenPlayground,
  isCodeOpened,
  isDesktop = false,
  className,
}: StagePreviewCardProps) {
  const displayLabel = currentTocLabel || title;
  const { activeDeckCard, isBottomSheetOpen, bottomSheetTab } = useComponentPlayground();
  const isCodeOpen =
    isCodeOpened !== undefined
      ? isCodeOpened
      : isDesktop
      ? activeDeckCard === 6
      : isBottomSheetOpen && bottomSheetTab === "code";

  return (
    <div
      className={cn(
        "flex flex-col justify-between relative overflow-hidden select-none w-full",
        isDesktop
          ? "h-full p-4 sm:p-6"
          : "rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-4 sm:p-6 shadow-sm gap-4 shrink-0",
        className
      )}
    >
      {/* Background Dot Grid for Mobile Mode */}
      {!isDesktop && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px]"
        />
      )}

      {/* Stage Header */}
      <div className="relative z-10 flex items-center justify-between w-full shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="px-3 py-1 rounded-full bg-zinc-900/90 dark:bg-black/70 border border-zinc-700/60 dark:border-zinc-800 text-[11px] font-mono text-foreground flex items-center gap-1.5 shadow-xs backdrop-blur-md">
            <Terminal className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0 animate-pulse" />
            <span className="text-zinc-400 font-medium">{slug} /</span>
            <span className="font-bold text-white tracking-wide">
              {isCustomizing ? "customization" : activeTocId}
            </span>
          </div>
        </div>

        <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span className="text-foreground/90 font-medium cursor-pointer">
            {displayLabel}
          </span>
        </div>
      </div>

      {/* Center Presentation Stage */}
      <div className="relative z-10 flex-1 min-h-[160px] flex flex-col items-center justify-center py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={isCustomizing ? "customization" : activeTocId}
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center w-full"
          >
            <div
              className={cn(
                "rounded-3xl transition-all duration-300 flex items-center justify-center",
                isDesktop
                  ? "w-[62%] p-5 sm:p-7 shadow-md backdrop-blur-xl"
                  : "w-full max-w-[620px] p-4 sm:p-6 rounded-2xl bg-zinc-50/90 dark:bg-zinc-800/80 border border-border shadow-xs backdrop-blur-xl"
              )}
            >
              <div className="w-full flex items-center justify-center">
                {renderStagePreview()}
              </div>
            </div>

            {/* Live Feedback Status Pill */}
            <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border text-[10.5px] font-mono text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Variant:</span>
              <strong className="text-foreground capitalize">{activeVariantName}</strong>
              <span className="text-muted-foreground/60">•</span>
              <span>Scale:</span>
              <strong className="text-foreground uppercase">{activeScale}</strong>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Action Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pt-1">
        {isCustomizing && (
          <button
            type="button"
            onClick={() => setIsCustomizing(false)}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 text-white hover:bg-zinc-800 text-xs font-mono border border-zinc-700 shadow-md transition-all cursor-pointer"
          >
            Exit to {displayLabel}
          </button>
        )}
        {onOpenPlayground && (
          <button
            type="button"
            onClick={onOpenPlayground}
            className="px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <PlaygroundReorderIcon size="sm" className="text-white dark:text-black" />
            <span>Playground Studio</span>
          </button>
        )}
        {handleViewCode && (
          <button
            type="button"
            onClick={isCodeOpen ? undefined : handleViewCode}
            disabled={isCodeOpen}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-medium border shadow-xs flex items-center gap-1.5 transition-all select-none",
              isCodeOpen
                ? "bg-zinc-100/50 dark:bg-zinc-800/40 text-muted-foreground/40 border-border/40 opacity-40 cursor-not-allowed pointer-events-none"
                : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-foreground border-border cursor-pointer hover:scale-105 active:scale-95"
            )}
            title={isCodeOpen ? "Source code is already open" : "View source code"}
            aria-disabled={isCodeOpen}
          >
            <Code
              className={cn(
                "w-3.5 h-3.5 transition-colors",
                isCodeOpen ? "text-muted-foreground/30" : "text-[var(--theme-primary)]"
              )}
            />
            <span>View Code</span>
          </button>
        )}
      </div>
    </div>
  );
});
