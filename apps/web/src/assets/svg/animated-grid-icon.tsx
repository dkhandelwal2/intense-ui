"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedGridIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

// 4 dots in a 2x2 grid inside the square box
const DOTS = [
  { cx: 8.5, cy: 8.5 },
  { cx: 15.5, cy: 8.5 },
  { cx: 8.5, cy: 15.5 },
  { cx: 15.5, cy: 15.5 },
];

// 4 radiating diagonal rays starting from the 2x2 dots towards the 4 corners of the square box
const RAYS = [
  { x1: 8.5, y1: 8.5, x2: 3.5, y2: 3.5 },
  { x1: 15.5, y1: 8.5, x2: 20.5, y2: 3.5 },
  { x1: 15.5, y1: 15.5, x2: 20.5, y2: 20.5 },
  { x1: 8.5, y1: 15.5, x2: 3.5, y2: 20.5 },
];

// 4 symmetrical quadrant corner paths that meet at the midpoints
// to enclose and form the complete rounded square box (width 17, height 17, rx 2)
const CORNER_BRANCHES = [
  "M 3.5 12 L 3.5 5.5 C 3.5 4.4 4.4 3.5 5.5 3.5 L 12 3.5",
  "M 12 3.5 L 18.5 3.5 C 19.6 3.5 20.5 4.4 20.5 5.5 L 20.5 12",
  "M 20.5 12 L 20.5 18.5 C 20.5 19.6 19.6 20.5 18.5 20.5 L 12 20.5",
  "M 12 20.5 L 5.5 20.5 C 4.4 20.5 3.5 19.6 3.5 18.5 L 3.5 12",
];

export function AnimatedGridIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedGridIconProps) {
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
      className={cn("shrink-0 overflow-visible", className)}
      aria-hidden="true"
    >
      {shouldAnimate ? (
        <g>
          {/* 4 dots pulsing as starting energy origin */}
          {DOTS.map((d, i) => (
            <motion.circle
              key={`dot-${i}`}
              cx={d.cx}
              cy={d.cy}
              r={1.5}
              fill={color}
              stroke="none"
              animate={{
                scale: [0.65, 1.25, 1, 1, 0.65],
                opacity: [0.45, 1, 1, 1, 0.45],
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.22, 0.38, 0.86, 1],
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}

          {/* 4 rays shooting from dots to corners to initiate square perimeter lines */}
          {RAYS.map((r, i) => (
            <motion.line
              key={`ray-${i}`}
              x1={r.x1}
              y1={r.y1}
              x2={r.x2}
              y2={r.y2}
              strokeWidth={1.8}
              animate={{
                pathLength: [0, 1, 1, 0, 0],
                opacity: [0, 1, 0.75, 0, 0],
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.22, 0.36, 0.46, 1],
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          ))}

          {/* 4 corner branches meeting at midpoints to complete square box */}
          {CORNER_BRANCHES.map((d, i) => (
            <motion.path
              key={`branch-${i}`}
              d={d}
              animate={{
                pathLength: [0, 0, 1, 1, 0, 0],
                opacity: [0, 0.25, 1, 1, 0, 0],
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.16, 0.44, 0.86, 0.96, 1],
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          ))}
        </g>
      ) : (
        <g>
          <rect x="3.5" y="3.5" width="17" height="17" rx="2" strokeWidth={2} />
          {DOTS.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={1.5} fill={color} stroke="none" />
          ))}
        </g>
      )}
    </svg>
  );
}
