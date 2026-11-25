"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PenSquiggleIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function PenSquiggleIcon({
  className,
  size = 20,
  color = "currentColor",
  animate = true,
  ...props
}: PenSquiggleIconProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldAnimate = animate && mounted;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 select-none overflow-visible", className)}
      aria-hidden="true"
      {...props}
    >
      {shouldAnimate ? (
        <>
          {/* Touchdown Ink Dot - pulses as the nib touches down */}
          <motion.circle
            cx={4.5}
            cy={19.5}
            r={1.2}
            fill={color}
            stroke="none"
            animate={{
              scale: [0.7, 1.3, 1, 1, 0.7],
              opacity: [0.3, 1, 0.9, 0.5, 0.3],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.2, 0.55, 0.85, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />

          {/* Cursive Squiggle Ink Trail - drawn out smoothly matching pen.json */}
          <motion.path
            d="M4.5 19.5c1.2-1.5 2.8-2 4.2-1.2 1.6 0.9 2.5 0.2 3.8-1.8"
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            animate={{
              pathLength: [0.08, 0.45, 0.85, 1, 1, 0.08],
              opacity: [0.35, 0.8, 1, 1, 0.35, 0.35],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.25, 0.55, 0.8, 0.95, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Tilted Pen / Nib Body - writing glide & tilt rotation matching pen.json */}
          <motion.g
            animate={{
              rotate: [0, -6, 5, -3, 2, 0],
              x: [0, -0.8, 1.2, -0.4, 0.4, 0],
              y: [0, -0.6, 0.5, -0.3, 0.2, 0],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.2, 0.45, 0.7, 0.85, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: "9px", originY: "15.5px" }}
          >
            <path
              d="M17.8 4.2a2.12 2.12 0 0 1 3 3L13.5 14.5l-4.5 1 1-4.5L17.8 4.2z"
              fill="currentColor"
              stroke={color}
              strokeWidth={1.5}
            />
            {/* Pen Tip Slit */}
            <line
              x1="16.5"
              y1="5.5"
              x2="18.5"
              y2="7.5"
              stroke="var(--bg-card, #ffffff)"
              strokeWidth={1}
            />
          </motion.g>
        </>
      ) : (
        <>
          {/* Static Tilted Pen / Nib Body */}
          <path
            d="M17.8 4.2a2.12 2.12 0 0 1 3 3L13.5 14.5l-4.5 1 1-4.5L17.8 4.2z"
            fill="currentColor"
            stroke={color}
            strokeWidth={1.5}
          />
          {/* Static Pen Tip Slit */}
          <line
            x1="16.5"
            y1="5.5"
            x2="18.5"
            y2="7.5"
            stroke="var(--bg-card, #ffffff)"
            strokeWidth={1}
          />
          {/* Static Cursive Squiggle Ink Trail */}
          <path
            d="M4.5 19.5c1.2-1.5 2.8-2 4.2-1.2 1.6 0.9 2.5 0.2 3.8-1.8"
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export type AnimatedPenSquiggleIconProps = PenSquiggleIconProps;
export type AnimatedPenIconProps = PenSquiggleIconProps;
export { PenSquiggleIcon as AnimatedPenSquiggleIcon, PenSquiggleIcon as AnimatedPenIcon };
