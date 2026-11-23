"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedTrendingIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function AnimatedTrendingIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedTrendingIconProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldAnimate = animate && mounted;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 overflow-visible", className)}
      aria-hidden="true"
    >
      {shouldAnimate ? (
        <motion.polyline
          points="5 22 12.5 14.5 17.5 19.5 27 10"
          animate={{
            pathLength: [1, 1, 0, 0, 1, 1],
            pathOffset: [0, 0, 1, 0, 0, 0],
          }}
          transition={{
            duration: 1.4,
            times: [0, 0.05, 0.23, 0.25, 0.6, 1],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ) : (
        <polyline points="5 22 12.5 14.5 17.5 19.5 27 10" />
      )}
    </svg>
  );
}
