"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedBoxIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

// 3 symmetric branches originating from center point (12, 12).
// Each branch radiates 1 inner spoke outward, then draws 1/3 of the outer perimeter to form the complete 3D cube.
const BRANCH_1 =
  "M 12 12 L 3.27 7 C 3.1 7.3 3 7.65 3 8 L 3 16 C 3 16.71 3.38 17.37 4 17.73 L 11 21.73 C 11.45 21.99 11.75 22.08 12 22.08";
const BRANCH_2 =
  "M 12 12 L 12 22.08 C 12.25 22.08 12.55 21.99 13 21.73 L 20 17.73 C 20.62 17.37 21 16.71 21 16 L 21 8 C 21 7.65 20.9 7.3 20.73 7";
const BRANCH_3 =
  "M 12 12 L 20.73 7 C 20.56 6.7 20.31 6.45 20 6.27 L 13 2.27 C 12.38 1.91 11.62 1.91 11 2.27 L 4 6.27 C 3.69 6.45 3.44 6.7 3.27 7";

const BRANCHES = [BRANCH_1, BRANCH_2, BRANCH_3];

export function AnimatedBoxIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedBoxIconProps) {
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
          {BRANCHES.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              animate={{
                pathLength: [0, 1, 1, 0, 0],
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.4, 0.75, 0.95, 1],
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          ))}
        </g>
      ) : (
        <g>
          <path d="M 21 16 L 21 8 C 21.00 7.29, 20.62 6.63, 20 6.27 L 13 2.27 C 12.38 1.91, 11.62 1.91, 11 2.27 L 4 6.27 C 3.38 6.63, 3.00 7.29, 3 8 L 3 16 C 3.00 16.71, 3.38 17.37, 4 17.73 L 11 21.73 C 11.62 22.09, 12.38 22.09, 13 21.73 L 20 17.73 C 20.62 17.37, 21.00 16.71, 21 16 Z" />
          <path d="M 3.27 6.96 L 12 12.01 L 20.73 6.96" />
          <path d="M 12 22.08 L 12 12" />
        </g>
      )}
    </svg>
  );
}
