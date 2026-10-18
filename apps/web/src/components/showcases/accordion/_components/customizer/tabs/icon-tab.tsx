"use client";

import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@registry/components/slider";
import { Switch } from "@registry/components/switch";
import { ColorGrid } from "@/components/ui/color-grid";
import { PALETTE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ICON_TYPES, ICON_POSITIONS, TabProps } from "../constants";

export function IconTab({ customProps, onChange }: TabProps) {
  return (
    <motion.div
      key="icon"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      className="flex sm:grid sm:grid-cols-2 overflow-x-auto sm:overflow-visible gap-3 sm:gap-3.5 pb-2 sm:pb-0 no-scrollbar snap-x snap-mandatory -mr-4 sm:mr-0 pr-4 sm:pr-0"
    >
      {/* Card 1: Hide Icon */}
      <div className="min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex items-center justify-between min-h-[88px]">
        <div>
          <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Hide Icon
          </div>
          <div className="text-[11px] text-zinc-500">
            Remove chevron or custom icon
          </div>
        </div>
        <Switch
          checked={!!customProps.hideIcon}
          onChange={(checked) =>
            onChange((prev) => ({ ...prev, hideIcon: checked }))
          }
          size="md"
        />
      </div>

      {/* Card 2: Icon Type */}
      <div
        className={cn(
          "min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex flex-col justify-between gap-2.5 min-h-[88px]",
          customProps.hideIcon && "opacity-40 pointer-events-none"
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Icon Type
            </div>
            <div className="text-[11px] text-zinc-500">
              Switch between chevron and custom icon
            </div>
          </div>
          <span className="font-mono text-xs text-[var(--theme-primary)] font-semibold shrink-0 ml-2">
            {customProps.iconType}
          </span>
        </div>
        <Slider
          min={0}
          max={1}
          value={customProps.iconType === "Custom" ? 1 : 0}
          onChange={(v) => onChange((prev) => ({ ...prev, iconType: ICON_TYPES[v] }))}
          disabled={!!customProps.hideIcon}
        />
      </div>

      {/* Card 3: Icon Position */}
      <div
        className={cn(
          "min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex flex-col justify-between gap-2.5 min-h-[88px]",
          customProps.hideIcon && "opacity-40 pointer-events-none"
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Icon Position
            </div>
            <div className="text-[11px] text-zinc-500">
              Place icon on left or right side
            </div>
          </div>
          <span className="font-mono text-xs text-[var(--theme-primary)] font-semibold shrink-0 ml-2">
            {customProps.iconPosition}
          </span>
        </div>
        <Slider
          min={0}
          max={1}
          value={customProps.iconPosition === "Left" ? 1 : 0}
          onChange={(v) =>
            onChange((prev) => ({ ...prev, iconPosition: ICON_POSITIONS[v] }))
          }
          disabled={!!customProps.hideIcon}
        />
      </div>

      {/* Card 4: Icon Color */}
      <div
        className={cn(
          "min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex items-center justify-between min-h-[88px]",
          customProps.hideIcon && "opacity-40 pointer-events-none"
        )}
      >
        <div className="mr-3">
          <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Icon Color
          </div>
          <div className="text-[11px] text-zinc-500">
            Accent color for indicator icon
          </div>
        </div>
        <ColorGrid
          colors={PALETTE_COLORS}
          value={customProps.iconColor || ""}
          onChange={(c) => onChange((prev) => ({ ...prev, iconColor: c }))}
          onClear={
            customProps.iconColor
              ? () => onChange((prev) => ({ ...prev, iconColor: "" }))
              : undefined
          }
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
