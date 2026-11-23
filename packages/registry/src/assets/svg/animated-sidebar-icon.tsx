"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedSidebarIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function AnimatedSidebarIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedSidebarIconProps) {
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
      {/* Outer rounded window container */}
      <rect x="3" y="3" width="18" height="18" rx="3" />
      {/* Sliding sidebar separator panel from sidebar.json */}
      {shouldAnimate ? (
        <motion.line
          x1="9"
          y1="3"
          x2="9"
          y2="21"
          animate={{
            x: [0, -1, 5, 5, 0],
          }}
          transition={{
            duration: 1.4,
            times: [0, 0.15, 0.42, 0.65, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.4,
          }}
        />
      ) : (
        <line x1="9" y1="3" x2="9" y2="21" />
      )}
    </svg>
  );
}
