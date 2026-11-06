import React from "react";
import { cn } from "@/lib/utils";

export interface IsometricBlocksSvgProps {
  id?: string;
  className?: string;
}

export const IsometricBlocksSvg = React.memo(function IsometricBlocksSvg({
  id = "iso-blocks-pattern",
  className,
}: IsometricBlocksSvgProps) {
  return (
    <svg
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0",
        className
      )}
    >
      <defs>
        <pattern
          id={id}
          width="36"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="18,0 36,5 18,10 0,5"
            className="fill-zinc-400/[0.04] dark:fill-white/[0.02] stroke-zinc-300/40 dark:stroke-white/[0.06]"
            strokeWidth="0.7"
          />
          <polygon
            points="0,5 18,10 18,20 0,15"
            className="fill-transparent stroke-zinc-300/30 dark:stroke-white/[0.04]"
            strokeWidth="0.7"
          />
          <polygon
            points="18,10 36,5 36,15 18,20"
            className="fill-zinc-400/[0.02] dark:fill-white/[0.01] stroke-zinc-300/30 dark:stroke-white/[0.04]"
            strokeWidth="0.7"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${id})`}
        style={{
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 85%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 85%)",
        }}
      />
    </svg>
  );
});

export interface ScoopedCornerNotchSvgProps {
  width?: number;
  height?: number;
  className?: string;
}

export const ScoopedCornerNotchSvg = React.memo(function ScoopedCornerNotchSvg({
  width = 210,
  height = 40,
  className,
}: ScoopedCornerNotchSvgProps) {
  return (
    <svg
      className={cn(
        "absolute top-0 right-0 pointer-events-none overflow-visible z-1",
        className
      )}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d={`M 0 0 C 14 0, 18 ${height - 4}, 32 ${height - 4} L ${width} ${height - 4} L ${width} 0 Z`}
        className="fill-zinc-100/60 dark:fill-zinc-950/50"
      />
      <path
        d={`M 0 0 C 14 0, 18 ${height - 4}, 32 ${height - 4} L ${width} ${height - 4}`}
        className="fill-none stroke-zinc-200/90 dark:stroke-zinc-800"
        strokeWidth="1"
      />
    </svg>
  );
});
