"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProgressCapsuleProps } from "./types";
import { PROGRESS_INTENT_MAP } from "./constants";

export const ProgressCapsule = React.forwardRef<HTMLDivElement, ProgressCapsuleProps>(
  (
    {
      value = 0,
      max = 100,
      variant = "primary",
      fillColor,
      height,
      icon,
      label,
      showPercentage = true,
      formatValue,
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(300);

    const clampedVal = Math.max(0, Math.min(max, value));
    const pct = Math.max(0, Math.min(100, (clampedVal / max) * 100));
    const cfg = PROGRESS_INTENT_MAP[variant] || PROGRESS_INTENT_MAP.primary;

    useEffect(() => {
      if (!containerRef.current) return;
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      };
      updateWidth();
      const observer = new ResizeObserver(updateWidth);
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    const formattedText = formatValue
      ? formatValue(clampedVal, max)
      : `${Math.round(pct)}%`;

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="progressbar"
        aria-valuenow={clampedVal}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || "Capsule Progress"}
        style={{ height: height || undefined }}
        className={cn(
          "relative w-full h-11 rounded-full select-none overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 shadow-inner",
          className
        )}
        {...props}
      >
        {/* Layer 1: Inactive Background Content (Muted Text) */}
        <div className="absolute inset-0 px-4 flex items-center justify-between text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 pointer-events-none">
          <div className="flex items-center gap-2">
            {icon && <span className="shrink-0">{icon}</span>}
            {label && <span className="font-semibold truncate uppercase text-[11px]">{label}</span>}
          </div>
          {showPercentage && <span className="font-bold">{formattedText}</span>}
        </div>

        {/* Layer 2: Filled Active Track Container (Clipped View) */}
        <motion.div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full overflow-hidden pointer-events-none",
            !fillColor && cfg.track
          )}
          style={{
            width: `${pct}%`,
            backgroundColor: fillColor || undefined,
          }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          {/* Layer 3: Active Foreground Content (Crisp Inverted White Text) */}
          <div
            className="absolute inset-y-0 left-0 px-4 flex items-center justify-between text-xs font-mono font-bold text-white drop-shadow-xs"
            style={{ width: containerWidth }}
          >
            <div className="flex items-center gap-2">
              {icon && <span className="shrink-0">{icon}</span>}
              {label && <span className="truncate uppercase text-[11px]">{label}</span>}
            </div>
            {showPercentage && <span>{formattedText}</span>}
          </div>
        </motion.div>
      </div>
    );
  }
);
ProgressCapsule.displayName = "ProgressCapsule";
