"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  WidgetCapsule,
  DependenciesCard,
  SupportCard,
} from "./index";
import { StagePreviewCard } from "./stage-preview-card";
import type { BentoCanvasProps } from "./types";

export const MobileCanvasView = React.memo(function MobileCanvasView({
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
  onOpenPlayground,
  directDeps,
  packageManager,
}: BentoCanvasProps) {
  return (
    <div className="flex-1 min-h-0 min-w-0 flex flex-col h-full overflow-y-auto px-2 sm:px-4 py-2 pb-28 sm:pb-32 gap-4 hide-scrollbar">
      <WidgetCapsule className="w-full shrink-0" />

      <StagePreviewCard
        slug={slug}
        title={title}
        activeTocId={activeTocId}
        currentTocLabel={currentTocItem?.label}
        isCustomizing={isCustomizing}
        setIsCustomizing={setIsCustomizing}
        activeVariantName={activeVariantName}
        activeScale={activeScale}
        renderStagePreview={renderStagePreview}
        handleViewCode={handleViewCode}
        onOpenPlayground={onOpenPlayground}
        isDesktop={false}
      />

      {effectiveTocItems.length > 1 && (
        <div className="w-full flex flex-col gap-1.5 shrink-0">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
              Variants ({effectiveTocItems.length})
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Tap to preview</span>
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

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-3">
        <DependenciesCard
          directDeps={directDeps}
          packageManager={packageManager}
          width="100%"
          className="relative w-full z-10 rounded-xl shrink-0"
        />
        <SupportCard
          componentName={formattedSlugName}
          className="w-full h-full rounded-xl shrink-0"
        />
      </div>
    </div>
  );
});
