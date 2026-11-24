"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedPullRequestIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function AnimatedPullRequestIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedPullRequestIconProps) {
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
        <>
          {/* Main branch trunk line */}
          <line x1={6} y1={9} x2={6} y2={21} />

          {/* Curved branch path: draws across from source to target */}
          <motion.path
            d="M 13 6 L 16 6 C 17.105 6 18 6.895 18 8 L 18 15"
            animate={{
              pathLength: [1, 0, 0, 1, 1],
              opacity: [1, 0.3, 0.3, 1, 1],
            }}
            transition={{
              duration: 2.4,
              times: [0, 0.1, 0.25, 0.6, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Source node (top-left): scale bounce matching git-pull-request.json */}
          <motion.circle
            cx={6}
            cy={6}
            r={3}
            animate={{
              scale: [1, 1, 0.87, 1.16, 0.96, 1, 1],
            }}
            transition={{
              duration: 2.4,
              times: [0, 0.05, 0.15, 0.3, 0.45, 0.6, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: "6px", originY: "6px" }}
          />

          {/* Target node (bottom-right): scale bounce when merge branch lands */}
          <motion.circle
            cx={18}
            cy={18}
            r={3}
            animate={{
              scale: [1, 1, 0.87, 1.16, 0.96, 1, 1],
            }}
            transition={{
              duration: 2.4,
              times: [0, 0.4, 0.5, 0.65, 0.8, 0.95, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: "18px", originY: "18px" }}
          />
        </>
      ) : (
        <>
          <circle cx={18} cy={18} r={3} />
          <circle cx={6} cy={6} r={3} />
          <path d="M13 6h3a2 2 0 0 1 2 2v7" />
          <line x1={6} y1={9} x2={6} y2={21} />
        </>
      )}
    </svg>
  );
}
