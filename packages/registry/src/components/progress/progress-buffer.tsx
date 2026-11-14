"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProgressBufferProps } from "./types";
import { PROGRESS_INTENT_MAP } from "./constants";

export const ProgressBuffer = React.forwardRef<HTMLDivElement, ProgressBufferProps>(
  (
    {
      value = 0,
      loaded = 75,
      max = 100,
      isLoading = false,
      statusText,
      variant = "primary",
      fillColor,
      className,
      ...props
    },
    ref
  ) => {
    const clampedVal = Math.max(0, Math.min(max, value));
    const valPct = Math.max(0, Math.min(100, (clampedVal / max) * 100));
    const loadedPct = Math.max(0, Math.min(100, loaded));
    const cfg = PROGRESS_INTENT_MAP[variant] || PROGRESS_INTENT_MAP.primary;

    return (
      <div ref={ref} className={cn("w-full flex flex-col gap-2 select-none", className)} {...props}>
        {/* Status Header */}
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5">
            {isLoading ? (
              <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                {statusText || "Buffering..."}
              </span>
            ) : (
              <span className="text-muted-foreground">{statusText || "Buffered Playback"}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>Progress: <strong className="text-foreground">{Math.round(valPct)}%</strong></span>
            <span>•</span>
            <span>Buffered: <strong className="text-foreground">{Math.round(loadedPct)}%</strong></span>
          </div>
        </div>

        {/* Dual-Tier Progress Track */}
        <div
          role="progressbar"
          aria-valuenow={clampedVal}
          aria-valuemin={0}
          aria-valuemax={max}
          className="relative w-full h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden shadow-inner"
        >
          {/* Secondary Buffer Layer */}
          <motion.div
            className={cn(
              "absolute top-0 bottom-0 left-0 bg-zinc-300 dark:bg-zinc-700/80 rounded-full",
              isLoading &&
                "bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:16px_16px] animate-[pulse_2s_infinite]"
            )}
            initial={false}
            animate={{ width: `${loadedPct}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />

          {/* Primary Active Value Layer */}
          <motion.div
            className={cn("absolute top-0 bottom-0 left-0 rounded-full", !fillColor && cfg.track)}
            style={fillColor ? { backgroundColor: fillColor } : undefined}
            initial={false}
            animate={{ width: `${valPct}%` }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          />
        </div>
      </div>
    );
  }
);
ProgressBuffer.displayName = "ProgressBuffer";
