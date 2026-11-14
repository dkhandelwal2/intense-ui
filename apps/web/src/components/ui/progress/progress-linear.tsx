"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProgressProps } from "./types";
import { PROGRESS_SIZES, PROGRESS_INTENT_MAP } from "./constants";

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = "md",
      variant = "primary",
      fillColor,
      striped = false,
      animated = false,
      indeterminate = false,
      showValue = false,
      formatValue,
      className,
      ...props
    },
    ref
  ) => {
    const clampedVal = Math.max(0, Math.min(max, value));
    const pct = Math.max(0, Math.min(100, (clampedVal / max) * 100));
    const cfg = PROGRESS_INTENT_MAP[variant] || PROGRESS_INTENT_MAP.primary;
    const activeColor = fillColor || cfg.hex;
    const heightClass = PROGRESS_SIZES[size] || PROGRESS_SIZES.md;

    const formattedText = formatValue
      ? formatValue(clampedVal, max)
      : `${Math.round(pct)}%`;

    return (
      <div ref={ref} className={cn("w-full flex flex-col gap-1.5 select-none", className)} {...props}>
        {showValue && (
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-bold text-foreground">{formattedText}</span>
          </div>
        )}

        <div
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : clampedVal}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "relative w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden shadow-inner",
            heightClass
          )}
        >
          {indeterminate ? (
            <motion.div
              className={cn("absolute inset-y-0 w-1/3 rounded-full", !fillColor && cfg.track)}
              style={fillColor ? { backgroundColor: fillColor } : undefined}
              animate={{ left: ["-35%", "105%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          ) : (
            <motion.div
              className={cn(
                "h-full rounded-full overflow-hidden transition-all duration-300 ease-out",
                !fillColor && cfg.track,
                striped &&
                  "bg-[linear-gradient(45deg,rgba(255,255,255,0.18)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.18)_50%,rgba(255,255,255,0.18)_75%,transparent_75%,transparent)] bg-[length:16px_16px]",
                striped && animated && "animate-[marquee-ltr_20s_linear_infinite]"
              )}
              style={{
                width: `${pct}%`,
                backgroundColor: fillColor || undefined,
              }}
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            />
          )}
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";
