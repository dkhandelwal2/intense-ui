"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ProgressSemicircleProps } from "./types";
import { PROGRESS_INTENT_MAP } from "./constants";

export const ProgressSemicircle = React.forwardRef<HTMLDivElement, ProgressSemicircleProps>(
  (
    {
      value = 0,
      max = 100,
      size = 200,
      strokeWidth = 12,
      variant = "primary",
      fillColor,
      showValue = true,
      showMinMax = true,
      unit = "%",
      label,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const clampedVal = Math.max(0, Math.min(max, value));
    const pct = Math.max(0, Math.min(100, (clampedVal / max) * 100));
    const cfg = PROGRESS_INTENT_MAP[variant] || PROGRESS_INTENT_MAP.primary;
    const activeColor = fillColor || cfg.hex;

    const height = Math.round(size * 0.6);
    const cx = size / 2;
    const cy = height - strokeWidth - 4;
    const radius = cx - strokeWidth - 4;
    const arcLength = Math.PI * radius;
    const strokeDashoffset = arcLength - (pct / 100) * arcLength;

    const arcPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedVal}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || "Gauge Progress"}
        style={{ width: size, height }}
        className={cn(
          "relative select-none flex flex-col items-center justify-end shrink-0",
          className
        )}
        {...props}
      >
        <svg
          width={size}
          height={height}
          viewBox={`0 0 ${size} ${height}`}
          className="overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <filter id={`prog-semi-glow-${size}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor={activeColor} floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background Track Arc */}
          <path
            d={arcPath}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="stroke-zinc-200 dark:stroke-zinc-800 transition-colors"
          />

          {/* Active Filled Progress Arc */}
          <path
            d={arcPath}
            fill="none"
            stroke={activeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            filter={`url(#prog-semi-glow-${size})`}
            className="transition-[stroke-dashoffset] duration-300 ease-out"
          />
        </svg>

        {/* Center Readout */}
        <div
          className="absolute inset-x-0 bottom-2 flex flex-col items-center justify-center text-center pointer-events-none"
          style={{ height: height * 0.65 }}
        >
          {children ? (
            children
          ) : (
            <>
              {label && (
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                  {label}
                </span>
              )}
              {showValue && (
                <span className="text-2xl font-extrabold font-mono tracking-tight text-foreground">
                  {Math.round(pct)}
                  <span className="text-xs font-normal text-muted-foreground ml-0.5">{unit}</span>
                </span>
              )}
            </>
          )}
        </div>

        {/* Baseline Min & Max Endpoints */}
        {showMinMax && (
          <div className="w-full flex justify-between px-2 text-[10px] font-mono text-muted-foreground pointer-events-none select-none">
            <span>0{unit}</span>
            <span>{max}{unit}</span>
          </div>
        )}
      </div>
    );
  }
);
ProgressSemicircle.displayName = "ProgressSemicircle";
