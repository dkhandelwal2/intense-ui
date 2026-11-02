"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export interface CanvasBackdropSvgProps {
  width: number;
  height: number;
  dockWidth: number;
  cutoutY: number;
  cornerRadius?: number;
  concaveRadius?: number;
  hasMeasured?: boolean;
  className?: string;
}

/**
 * Computes an exact SVG path for an L-shaped molded background
 * with concave and convex fillets wrapping around a cutout notch.
 */
export function computeCutoutPath(
  width: number,
  height: number,
  dockWidth: number,
  cutoutY: number,
  cornerRadius = 24,
  concaveRadius = 24
): string {
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return "";
  }
  const w = width;
  const h = height;
  const r = Math.min(cornerRadius, w / 2, h / 2);
  const rConcave = Math.min(concaveRadius, w / 2, h / 2);
  const safeDockWidth = Math.max(0, Math.min(w, dockWidth || 0));
  const safeCutoutY = Math.max(0, Math.min(h, cutoutY || 0));

  return `
    M ${r} 0
    L ${w - r} 0
    A ${r} ${r} 0 0 1 ${w} ${r}
    L ${w} ${safeCutoutY - r}
    A ${r} ${r} 0 0 1 ${w - r} ${safeCutoutY}
    L ${safeDockWidth + rConcave} ${safeCutoutY}
    A ${rConcave} ${rConcave} 0 0 0 ${safeDockWidth} ${safeCutoutY + rConcave}
    L ${safeDockWidth} ${h - r}
    A ${r} ${r} 0 0 1 ${safeDockWidth - r} ${h}
    L ${r} ${h}
    A ${r} ${r} 0 0 1 0 ${h - r}
    L 0 ${r}
    A ${r} ${r} 0 0 1 ${r} 0
    Z
  `
    .trim()
    .replace(/\s+/g, " ");
}

export const CanvasBackdropSvg = React.memo(function CanvasBackdropSvg({
  width,
  height,
  dockWidth,
  cutoutY,
  cornerRadius = 24,
  concaveRadius = 24,
  hasMeasured = true,
  className,
}: CanvasBackdropSvgProps) {
  const pathD = useMemo(
    () =>
      computeCutoutPath(
        width,
        height,
        dockWidth,
        cutoutY,
        cornerRadius,
        concaveRadius
      ),
    [width, height, dockWidth, cutoutY, cornerRadius, concaveRadius]
  );

  return (
    <svg
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0 transition-opacity duration-150",
        hasMeasured ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.06))" }}
    >
      <defs>
        <pattern
          id="canvas-dot-grid"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="2"
            cy="2"
            r="1"
            className="fill-zinc-300/40 dark:fill-white/[0.05]"
          />
        </pattern>
      </defs>
      {pathD ? (
        <>
          <path
            d={pathD}
            className="fill-white dark:fill-zinc-900 stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="1.5"
          />
          <path d={pathD} fill="url(#canvas-dot-grid)" />
        </>
      ) : null}
    </svg>
  );
});

// Generic & backward-compatible aliases
export const StageBackgroundSvg = CanvasBackdropSvg;
export const computeStageCutoutPath = computeCutoutPath;
export type StageBackgroundSvgProps = CanvasBackdropSvgProps;
