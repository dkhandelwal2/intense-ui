"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedCommitIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function AnimatedCommitIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedCommitIconProps) {
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
          {/* Left connecting line: shoots through */}
          <motion.line
            x1={1.05}
            y1={12}
            x2={7}
            y2={12}
            animate={{
              pathLength: [1, 0, 0, 1, 1],
              opacity: [1, 0.4, 0.4, 1, 1],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.15, 0.25, 0.45, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Center commit node: scale bounce matching git-commit.json keyframes */}
          <motion.circle
            cx={12}
            cy={12}
            r={4}
            animate={{
              scale: [1, 1, 0.87, 1.16, 0.96, 1, 1],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.3, 0.4, 0.55, 0.7, 0.85, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: "12px", originY: "12px" }}
          />
          {/* Right connecting line: shoots out after impact */}
          <motion.line
            x1={17.01}
            y1={12}
            x2={22.96}
            y2={12}
            animate={{
              pathLength: [1, 1, 0, 1, 1],
              opacity: [1, 1, 0.4, 1, 1],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.35, 0.45, 0.65, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      ) : (
        <>
          <circle cx={12} cy={12} r={4} />
          <line x1={1.05} y1={12} x2={7} y2={12} />
          <line x1={17.01} y1={12} x2={22.96} y2={12} />
        </>
      )}
    </svg>
  );
}
