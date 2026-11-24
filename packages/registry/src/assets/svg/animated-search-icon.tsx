"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedSearchIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function AnimatedSearchIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedSearchIconProps) {
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
        <motion.circle
          cx="11"
          cy="11"
          r="8"
          animate={{
            r: [8, 8.8, 8],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.3,
          }}
        />
      ) : (
        <circle cx="11" cy="11" r="8" />
      )}
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
