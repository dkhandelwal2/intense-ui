"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProgressShimmerProps } from "./types";
import { PROGRESS_SIZES, PROGRESS_INTENT_MAP } from "./constants";

export const ProgressShimmer = React.forwardRef<HTMLDivElement, ProgressShimmerProps>(
  (
    {
      value = 0,
      max = 100,
      size = "md",
      variant = "shimmer",
      fillColor,
      shimmerColor,
      className,
      ...props
    },
    ref
  ) => {
    const clampedVal = Math.max(0, Math.min(max, value));
    const pct = Math.max(0, Math.min(100, (clampedVal / max) * 100));
    const cfg = PROGRESS_INTENT_MAP[variant] || PROGRESS_INTENT_MAP.shimmer;
    const heightClass = PROGRESS_SIZES[size] || PROGRESS_SIZES.md;

    return (
      <div ref={ref} className={cn("w-full flex flex-col gap-1.5 select-none", className)} {...props}>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 text-fuchsia-500 font-semibold">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            Shimmer Progress
          </span>
          <span className="font-bold text-foreground">{Math.round(pct)}%</span>
        </div>

        <div
          role="progressbar"
          aria-valuenow={clampedVal}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "relative w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden shadow-inner",
            heightClass
          )}
        >
          {/* Active Filled Track */}
          <motion.div
            className={cn(
              "absolute top-0 bottom-0 left-0 rounded-full overflow-hidden shadow-sm",
              !fillColor && cfg.track
            )}
            style={
              fillColor
                ? {
                    background: `linear-gradient(90deg, ${fillColor}, ${shimmerColor || "#ec4899"})`,
                  }
                : undefined
            }
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            {/* Continuous traveling specular shimmer wave */}
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
                width: "60%",
              }}
              animate={{
                x: ["-100%", "250%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  }
);
ProgressShimmer.displayName = "ProgressShimmer";
