"use client";

import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@registry/components/slider";
import { Switch } from "@registry/components/switch";
import { ColorGrid } from "@/components/ui/color-grid";
import { PALETTE_COLORS } from "@/lib/constants";
import { SIZES, WEIGHTS, TabProps } from "../constants";

export function TypographyTab({ customProps, onChange }: TabProps) {
  return (
    <motion.div
      key="typography"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      className="flex sm:grid sm:grid-cols-2 overflow-x-auto sm:overflow-visible gap-3 sm:gap-3.5 pb-2 sm:pb-0 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory -mr-4 sm:mr-0 pr-4 sm:pr-0"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Card 1: Button Size */}
      <div className="min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex flex-col justify-between gap-2.5 min-h-[88px]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Button Size
            </div>
            <div className="text-[11px] text-zinc-500">
              Scale heading font size and padding
            </div>
          </div>
          <span className="font-mono text-xs text-[var(--theme-primary)] font-semibold uppercase shrink-0 ml-2">
            {customProps.size}
          </span>
        </div>
        <Slider
          min={0}
          max={4}
          value={SIZES.indexOf((customProps.size || "md") as (typeof SIZES)[number])}
          onChange={(v) => onChange((prev) => ({ ...prev, size: SIZES[v] }))}
        />
      </div>

      {/* Card 2: Button Weight & Heading Underline */}
      <div className="min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex flex-col justify-between gap-3 min-h-[88px]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Weight:{" "}
              <span className="font-mono text-[var(--theme-primary)] font-semibold">
                {customProps.weight}
              </span>
            </div>
            <div className="text-[11px] text-zinc-500">
              Toggle regular or bold font
            </div>
          </div>
          <div className="w-28 sm:w-32 shrink-0 ml-2">
            <Slider
              min={0}
              max={1}
              value={customProps.weight === "Bold" ? 1 : 0}
              onChange={(v) => onChange((prev) => ({ ...prev, weight: WEIGHTS[v] }))}
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-1.5 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <div>
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Heading Underline
            </div>
            <div className="text-[11px] text-zinc-500">
              Add text decoration on trigger
            </div>
          </div>
          <Switch
            checked={!!customProps.headingUnderline}
            onChange={(checked) =>
              onChange((prev) => ({ ...prev, headingUnderline: checked }))
            }
            size="sm"
          />
        </div>
      </div>

      {/* Card 3: Title (Heading) Color */}
      <div className="min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex items-center justify-between min-h-[88px]">
        <div className="mr-3">
          <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Title Color
          </div>
          <div className="text-[11px] text-zinc-500">
            Heading text color palette
          </div>
        </div>
        <ColorGrid
          size="sm"
          colors={PALETTE_COLORS}
          value={customProps.headingColor || ""}
          onChange={(c) => onChange((prev) => ({ ...prev, headingColor: c }))}
          onClear={
            customProps.headingColor
              ? () => onChange((prev) => ({ ...prev, headingColor: "" }))
              : undefined
          }
          draggable={false}
        />
      </div>

      {/* Card 4: Content Text Color */}
      <div className="min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex items-center justify-between min-h-[88px]">
        <div className="mr-3">
          <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Content Color
          </div>
          <div className="text-[11px] text-zinc-500">
            Body text color palette
          </div>
        </div>
        <ColorGrid
          size="sm"
          colors={PALETTE_COLORS}
          value={customProps.contentColor || ""}
          onChange={(c) => onChange((prev) => ({ ...prev, contentColor: c }))}
          onClear={
            customProps.contentColor
              ? () => onChange((prev) => ({ ...prev, contentColor: "" }))
              : undefined
          }
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
