"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ProgressCircularProps } from "./types";
import { PROGRESS_INTENT_MAP } from "./constants";

export const ProgressCircular = React.forwardRef<HTMLDivElement, ProgressCircularProps>(
  (
    {
      value = 0,
      max = 100,
      size = 140,
      strokeWidth = 10,
      variant = "primary",
      fillColor,
      showValue = true,
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

    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (pct / 100) * circumference;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedVal}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || "Circular Progress"}
        style={{ width: size, height: size }}
        className={cn(
          "relative select-none flex items-center justify-center shrink-0",
          className
        )}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full -rotate-90 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <filter id={`prog-circ-glow-${size}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor={activeColor} floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-zinc-200 dark:stroke-zinc-800 transition-colors"
          />

          {/* Active Progress Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={activeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            filter={`url(#prog-circ-glow-${size})`}
            className="transition-[stroke-dashoffset] duration-300 ease-out"
          />
        </svg>

        {/* Center Readout & Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
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
      </div>
    );
  }
);
ProgressCircular.displayName = "ProgressCircular";
