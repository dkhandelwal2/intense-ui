"use client";

import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@registry/components/slider";
import { Switch } from "@registry/components/switch";
import { ColorGrid } from "@/components/ui/color-grid";
import { PALETTE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TabProps } from "../constants";

export function BorderTab({ customProps, onChange }: TabProps) {
  const isBorderZero = customProps.borderWidth === 0;

  return (
    <motion.div
      key="border"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      className="flex sm:grid sm:grid-cols-2 overflow-x-auto sm:overflow-visible gap-3 sm:gap-3.5 pb-2 sm:pb-0 no-scrollbar snap-x snap-mandatory -mr-4 sm:mr-0 pr-4 sm:pr-0"
    >
      {/* Card 1: Hide Border */}
      <div className="min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex items-center justify-between min-h-[88px]">
        <div>
          <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Hide Border
          </div>
          <div className="text-[11px] text-zinc-500">
            Remove outer border lines
          </div>
        </div>
        <Switch
          checked={!!customProps.hideBorder}
          onChange={(checked) =>
            onChange((prev) => ({ ...prev, hideBorder: checked }))
          }
          size="md"
        />
      </div>

      {/* Card 2: Border Width */}
      <div
        className={cn(
          "min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex flex-col justify-between gap-2.5 min-h-[88px]",
          customProps.hideBorder && "opacity-40 pointer-events-none"
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Border Width
            </div>
            <div className="text-[11px] text-zinc-500">
              Set border stroke thickness
            </div>
          </div>
          <span className="font-mono text-xs text-[var(--theme-primary)] font-semibold shrink-0 ml-2">
            {customProps.borderWidth}px
          </span>
        </div>
        <Slider
          min={0}
          max={4}
          value={customProps.borderWidth || 0}
          onChange={(v) => onChange((prev) => ({ ...prev, borderWidth: v }))}
          disabled={!!customProps.hideBorder}
        />
      </div>

      {/* Card 3: Border Radius */}
      <div
        className={cn(
          "min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex flex-col justify-between gap-2.5 min-h-[88px]",
          (customProps.hideBorder || isBorderZero) && "opacity-40 pointer-events-none"
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Border Radius
            </div>
            <div className="text-[11px] text-zinc-500">
              Adjust corner curvature roundness
            </div>
          </div>
          <span className="font-mono text-xs text-[var(--theme-primary)] font-semibold shrink-0 ml-2">
            {customProps.borderRadius}px
          </span>
        </div>
        <Slider
          min={0}
          max={32}
          value={customProps.borderRadius || 0}
          onChange={(v) => onChange((prev) => ({ ...prev, borderRadius: v }))}
          disabled={!!customProps.hideBorder || isBorderZero}
        />
      </div>

      {/* Card 4: Border Color */}
      <div
        className={cn(
          "min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex items-center justify-between min-h-[88px]",
          (customProps.hideBorder || isBorderZero) && "opacity-40 pointer-events-none"
        )}
      >
        <div className="mr-3">
          <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Border Color
          </div>
          <div className="text-[11px] text-zinc-500">
            Select border accent tint
          </div>
        </div>
        <ColorGrid
          colors={PALETTE_COLORS}
          value={customProps.borderColor || "var(--theme-primary)"}
          onChange={(c) => onChange((prev) => ({ ...prev, borderColor: c }))}
          onClear={
            customProps.borderColor !== "var(--theme-primary)"
              ? () =>
                  onChange((prev) => ({
                    ...prev,
                    borderColor: "var(--theme-primary)",
                  }))
              : undefined
          }
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
