"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { formatPresetLabel } from "./constants";
import { TimerPresetChipsProps } from "./types";

export function TimerPresetChips({
  presets,
  selectedDuration,
  isEditing = false,
  chipActiveClass,
  onSelect,
  className,
}: TimerPresetChipsProps) {
  if (!presets || presets.length === 0) return null;

  return (
    <div className={cn("flex items-center justify-center gap-1.5 px-2", className)}>
      {presets.map((p, idx) => {
        const isSelected = selectedDuration === p && !isEditing;
        return (
          <button
            key={`preset-${p}-${idx}`}
            type="button"
            onClick={() => onSelect(p)}
            className={cn(
              "px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shadow-2xs",
              isSelected
                ? chipActiveClass || "bg-amber-600 text-white"
                : "bg-zinc-200/80 hover:bg-zinc-300 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-400"
            )}
          >
            {formatPresetLabel(p)}
          </button>
        );
      })}
    </div>
  );
}
