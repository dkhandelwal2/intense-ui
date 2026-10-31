"use client";

import React from "react";
import { Terminal, Activity, Sliders, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { PackageManager } from "@/components/ui/package-manager";
import { TocItem } from "@/components/layout/layout-components";
import {
  DependenciesCard,
  SupportCard,
} from "./index";
import { MobileBentoCanvasProps } from "./types";

export const MobileBentoCanvas = React.memo(function MobileBentoCanvas({
  slug,
  title,
  formattedSlugName,
  activeTocId,
  currentTocItem,
  effectiveTocItems,
  handleTocItemClick,
  isCustomizing,
  setIsCustomizing,
  activeVariantName,
  activeScale,
  renderStagePreview,
  handleViewCode,
  directDeps,
  packageManager,
  onOpenPlayground,
}: MobileBentoCanvasProps) {
  return (
    <div className="flex-1 min-h-0 min-w-0 flex xl:hidden flex-col h-full overflow-y-auto px-2 sm:px-4 py-2 pb-28 sm:pb-32 gap-4 hide-scrollbar">
      {/* 1. Mobile Hero Presentation Stage Card */}
      <div className="w-full rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-4 sm:p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden shrink-0">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px]"
        />

        {/* Stage Header */}
        <div className="relative z-10 flex items-center justify-between w-full shrink-0 select-none">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-zinc-900/90 dark:bg-black/70 border border-zinc-700/60 dark:border-zinc-800 text-[11px] font-mono text-foreground flex items-center gap-1.5 shadow-xs">
              <Terminal className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0 animate-pulse" />
              <span className="text-zinc-400 font-medium">{slug} /</span>
              <span className="font-bold text-white tracking-wide">{isCustomizing ? "customization" : activeTocId}</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-foreground/90 font-medium">{title}</span>
          </div>
        </div>

        {/* Center Presentation Stage */}
        <div className="relative z-10 w-full max-w-[620px] min-h-[160px] p-4 sm:p-6 rounded-2xl bg-zinc-50/90 dark:bg-zinc-800/80 border border-border shadow-xs backdrop-blur-xl flex items-center justify-center overflow-hidden mx-auto transition-all duration-300">
          <div className="w-full flex items-center justify-center">
            {renderStagePreview()}
          </div>
        </div>

        {/* Live Feedback Status Pill */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 border border-border text-[10.5px] font-mono text-muted-foreground mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Variant:</span>
          <strong className="text-foreground capitalize">{activeVariantName}</strong>
          <span className="text-muted-foreground/60">•</span>
          <span>Scale:</span>
          <strong className="text-foreground uppercase">{activeScale}</strong>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pt-1">
          {isCustomizing && (
            <button
              type="button"
              onClick={() => setIsCustomizing(false)}
              className="px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium border border-border transition-all cursor-pointer"
            >
              Exit to standard variant
            </button>
          )}
          <button
            type="button"
            onClick={onOpenPlayground}
            className="px-3.5 py-1.5 rounded-xl bg-[var(--theme-primary)] hover:opacity-90 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Playground Studio</span>
          </button>
          <button
            type="button"
            onClick={handleViewCode}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-foreground text-xs font-medium border border-border shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Code className="w-3.5 h-3.5" />
            <span>View Code</span>
          </button>
        </div>
      </div>

      {/* 2. TOC Variant Switcher */}
      {effectiveTocItems.length > 1 && (
        <div className="w-full flex flex-col gap-1.5 shrink-0">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
              Variants ({effectiveTocItems.length})
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              Tap to preview
            </span>
          </div>
          <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {effectiveTocItems.map((item) => {
              const isActive = !isCustomizing && activeTocId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTocItemClick(item.id)}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 border",
                    isActive
                      ? "bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-[0_0_12px_var(--theme-primary)]/40 font-semibold"
                      : "bg-white dark:bg-zinc-900 text-muted-foreground hover:text-foreground border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-2xs"
                  )}
                >
                  {item.icon && <span className="[&_svg]:w-4 [&_svg]:h-4">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-3 ">

        {/* 3. Dependencies Card */}
        <div className="w-full shrink-0">
          <DependenciesCard
            directDeps={directDeps}
            packageManager={packageManager}
            width="100%"
            className="relative w-full z-10 rounded-xl"
          />
        </div>

        {/* 4. Support Card */}
        <div className="w-full shrink-0">
          <SupportCard
            componentName={formattedSlugName}
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
    </div>
  );
});
