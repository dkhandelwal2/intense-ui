"use client";

import React from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipCustomProps } from "./types";

interface TooltipPreviewProps {
  customProps: TooltipCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}

export function TooltipPreview({
  customProps,
  activeTocId = "basic",
  isCustomizing = false,
}: TooltipPreviewProps) {
  if (isCustomizing) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-12">
        <Tooltip
          content={customProps.content}
          position={customProps.position}
          bgColor={customProps.bgColor || undefined}
        >
          <button className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-sm shadow-md hover:scale-105 transition-transform">
            Hover Trigger Target
          </button>
        </Tooltip>
        <span className="text-xs font-mono text-muted-foreground">
          Position: {customProps.position.toUpperCase()} • {customProps.bgColor || "Default Dark"}
        </span>
      </div>
    );
  }

  // 1. Bottom
  if (activeTocId === "bottom") {
    return (
      <div className="flex items-center justify-center p-12">
        <Tooltip content="Tooltip docked below" position="bottom">
          <button className="px-4 py-2 rounded-xl border border-border/80 bg-background hover:bg-secondary/60 text-sm font-medium transition-colors">
            Hover: Bottom Placement
          </button>
        </Tooltip>
      </div>
    );
  }

  // 2. Left
  if (activeTocId === "left") {
    return (
      <div className="flex items-center justify-center p-12">
        <Tooltip content="Tooltip docked to the left" position="left">
          <button className="px-4 py-2 rounded-xl border border-border/80 bg-background hover:bg-secondary/60 text-sm font-medium transition-colors">
            Hover: Left Placement
          </button>
        </Tooltip>
      </div>
    );
  }

  // 3. Right
  if (activeTocId === "right") {
    return (
      <div className="flex items-center justify-center p-12">
        <Tooltip content="Tooltip docked to the right" position="right">
          <button className="px-4 py-2 rounded-xl border border-border/80 bg-background hover:bg-secondary/60 text-sm font-medium transition-colors">
            Hover: Right Placement
          </button>
        </Tooltip>
      </div>
    );
  }

  // 4. Custom BG
  if (activeTocId === "custom-bg") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-8">
        <Tooltip content="Electric Sapphire" position="top" bgColor="#3b82f6">
          <button className="px-3.5 py-1.5 rounded-lg border border-blue-500/30 text-xs font-medium">
            Sapphire
          </button>
        </Tooltip>
        <Tooltip content="Neon Amethyst" position="top" bgColor="#a855f7">
          <button className="px-3.5 py-1.5 rounded-lg border border-purple-500/30 text-xs font-medium">
            Amethyst
          </button>
        </Tooltip>
        <Tooltip content="Emerald Green" position="top" bgColor="#22c55e">
          <button className="px-3.5 py-1.5 rounded-lg border border-green-500/30 text-xs font-medium">
            Emerald
          </button>
        </Tooltip>
        <Tooltip content="Vivid Amber" position="top" bgColor="#f97316">
          <button className="px-3.5 py-1.5 rounded-lg border border-orange-500/30 text-xs font-medium">
            Amber
          </button>
        </Tooltip>
      </div>
    );
  }

  // Default: Basic (Top)
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12">
      <Tooltip content="Quick action tooltip bubble" position="top">
        <button className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-sm shadow-md hover:scale-105 transition-transform">
          Hover over me
        </button>
      </Tooltip>
      <span className="text-xs font-mono text-muted-foreground">
        Smooth micro-spring entrance with directional pointer arrow
      </span>
    </div>
  );
}
