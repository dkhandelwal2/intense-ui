"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface DynamicIslandNotchProps {
  width?: number;
  height?: number;
  earRadius?: number;
  bottomRadius?: number;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * DynamicIslandNotch:
 * Mathematical SVG notch with C1-continuous concave ear fillets on left and right,
 * seamlessly bridging the card's top border into an elevated Apple Dynamic Island.
 */
export const DynamicIslandNotch = React.memo(function DynamicIslandNotch({
  width = 236,
  height = 36,
  earRadius = 14,
  bottomRadius = 16,
  children,
  className,
  onClick,
}: DynamicIslandNotchProps) {
  const totalSvgWidth = width + earRadius * 2;
  const totalSvgHeight = height + 1;

  // Exact concave ear fillets connecting to convex bottom pill (flush with top border)
  const fillPath = `
    M -${earRadius} 0
    A ${earRadius} ${earRadius} 0 0 1 0 ${earRadius}
    L 0 ${height - bottomRadius}
    A ${bottomRadius} ${bottomRadius} 0 0 0 ${bottomRadius} ${height}
    L ${width - bottomRadius} ${height}
    A ${bottomRadius} ${bottomRadius} 0 0 0 ${width} ${height - bottomRadius}
    L ${width} ${earRadius}
    A ${earRadius} ${earRadius} 0 0 1 ${width + earRadius} 0
    Z
  `.trim();

  // Perimeter stroke only along the curved boundary (no top seam)
  const strokePath = `
    M -${earRadius} 0
    A ${earRadius} ${earRadius} 0 0 1 0 ${earRadius}
    L 0 ${height - bottomRadius}
    A ${bottomRadius} ${bottomRadius} 0 0 0 ${bottomRadius} ${height}
    L ${width - bottomRadius} ${height}
    A ${bottomRadius} ${bottomRadius} 0 0 0 ${width} ${height - bottomRadius}
    L ${width} ${earRadius}
    A ${earRadius} ${earRadius} 0 0 1 ${width + earRadius} 0
  `.trim();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label="Click to open fullscreen screensaver"
      title="Click to open fullscreen screensaver"
      className={cn(
        "relative flex items-center justify-center select-none cursor-pointer transition-transform active:scale-[0.98]",
        className
      )}
      style={{ width, height }}
    >
      {/* SVG Notch Backing with Concave Ears */}
      <svg
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none drop-shadow-md z-0 overflow-visible"
        width={totalSvgWidth}
        height={totalSvgHeight}
        viewBox={`-${earRadius} 0 ${totalSvgWidth} ${totalSvgHeight}`}
      >
        {/* Solid Black Fill */}
        <path
          d={fillPath}
          className="fill-black"
        />
        {/* Border Stroke wrapping ears and bottom */}
        <path
          d={strokePath}
          fill="none"
          className="stroke-zinc-200/90 dark:stroke-zinc-800"
          strokeWidth="1"
        />
      </svg>

      {/* Island Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-between px-3.5 text-white">
        {children}
      </div>
    </div>
  );
});
