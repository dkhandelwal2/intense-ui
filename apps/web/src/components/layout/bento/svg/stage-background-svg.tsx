"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { StageBackgroundSvgProps } from "../types";
import { BENTO_STAGE_GEOMETRY } from "../constants";

/**
 * Computes the exact SVG path for the L-shaped molded background
 * with curved concave and convex fillets wrapping around the cutout notch.
 */
export function computeStageCutoutPath(
  width: number,
  height: number,
  dockWidth: number,
  cutoutY: number,
  cornerRadius: number = BENTO_STAGE_GEOMETRY.CORNER_RADIUS,
  concaveRadius: number = BENTO_STAGE_GEOMETRY.CONCAVE_RADIUS
): string {
  const w = width;
  const h = height;
  const r = cornerRadius;
  const rConcave = concaveRadius;

  return `
    M ${r} 0
    L ${w - r} 0
    A ${r} ${r} 0 0 1 ${w} ${r}
    L ${w} ${cutoutY - r}
    A ${r} ${r} 0 0 1 ${w - r} ${cutoutY}
    L ${dockWidth + rConcave} ${cutoutY}
    A ${rConcave} ${rConcave} 0 0 0 ${dockWidth} ${cutoutY + rConcave}
    L ${dockWidth} ${h - r}
    A ${r} ${r} 0 0 1 ${dockWidth - r} ${h}
    L ${r} ${h}
    A ${r} ${r} 0 0 1 0 ${h - r}
    L 0 ${r}
    A ${r} ${r} 0 0 1 ${r} 0
    Z
  `
    .trim()
    .replace(/\s+/g, " ");
}

export const StageBackgroundSvg = React.memo(function StageBackgroundSvg({
  width,
  height,
  dockWidth,
  cutoutY,
  hasMeasured,
  className,
}: StageBackgroundSvgProps) {
  const pathD = useMemo(
    () => computeStageCutoutPath(width, height, dockWidth, cutoutY),
    [width, height, dockWidth, cutoutY]
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
        <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" className="fill-zinc-300/40 dark:fill-white/[0.05]" />
        </pattern>
      </defs>
      <path
        d={pathD}
        className="fill-white dark:fill-zinc-900 stroke-zinc-200 dark:stroke-zinc-800"
        strokeWidth="1.5"
      />
      <path d={pathD} fill="url(#dot-grid)" />
    </svg>
  );
});
