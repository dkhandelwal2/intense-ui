"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SliderThumbProps {
  value: number;
  index: number;
  min: number;
  max: number;
  isSelf: boolean;
  isDragging: boolean;
  isHovered: boolean;
  isVertical: boolean;
  isZoomable: boolean;
  thumbIcon?: React.ReactNode;
  thumbAnimation?: "none" | "pulse" | "glow" | "scale";
  tooltip?: boolean;
  activeColor?: string;
  cfg: { track: string; thumb: string; glow: string };
}

export function SliderThumb({
  value,
  min,
  max,
  isSelf,
  isDragging,
  isHovered,
  isVertical,
  isZoomable,
  thumbIcon,
  thumbAnimation,
  tooltip,
  activeColor,
  cfg,
}: SliderThumbProps) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <motion.div
      className={cn(
        "absolute bg-background border-2 rounded-full shadow-md z-20 pointer-events-none flex items-center justify-center transition-shadow",
        thumbIcon ? "h-6 w-6" : "h-4.5 w-4.5",
        !activeColor && cfg.thumb,
        thumbAnimation === "glow" && cfg.glow
      )}
      style={activeColor ? { borderColor: activeColor, color: activeColor } : undefined}
      initial={false}
      animate={{
        scale: isZoomable && ((isDragging && isSelf) || isHovered) ? (isDragging && isSelf ? 1.25 : 1.15) : 1,
        ...(isVertical ? { bottom: `calc(${pct}% - 9px)` } : { left: `calc(${pct}% - 9px)` }),
      }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
    >
      {isZoomable && (
        <motion.span
          className={cn("absolute rounded-full pointer-events-none -inset-2.5", !activeColor && "bg-current")}
          style={activeColor ? { backgroundColor: activeColor } : undefined}
          initial={false}
          animate={{
            scale: isDragging && isSelf ? 1.4 : isHovered ? 1.15 : 0,
            opacity: isDragging && isSelf ? 0.35 : isHovered ? 0.22 : 0,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      )}
      {thumbAnimation === "pulse" && (
        <span className="absolute inset-0 rounded-full bg-current opacity-40 animate-ping pointer-events-none" />
      )}
      {thumbIcon && <span className="flex items-center justify-center text-current">{thumbIcon}</span>}
      {tooltip && (isHovered || isDragging) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: isVertical ? 0 : 3 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className={cn(
            "absolute px-1.5 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-[10px] font-mono font-bold shadow-md pointer-events-none whitespace-nowrap z-30",
            isVertical ? "left-7 top-1/2 -translate-y-1/2" : "-top-7 left-1/2 -translate-x-1/2"
          )}
        >
          {value}
          <div
            className={cn(
              "absolute border-4 border-transparent",
              isVertical
                ? "top-1/2 -translate-y-1/2 -left-1 border-r-zinc-900 dark:border-r-zinc-100"
                : "top-full left-1/2 -translate-x-1/2 -mt-0.5 border-t-zinc-900 dark:border-t-zinc-100"
            )}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
