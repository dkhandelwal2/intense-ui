"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedCalendarIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function AnimatedCalendarIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedCalendarIconProps) {
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
      {/* Binder pins from calendar.json */}
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      {/* Calendar body outline */}
      <rect x="3" y="4" width="18" height="18" rx="2" />
      {/* Header dividing line and chevron */}
      {shouldAnimate ? (
        <>
          <motion.line
            x1={3}
            x2={21}
            y1={10}
            y2={10}
            animate={{
              y: [0, -1.2, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.4,
            }}
          />
          <motion.path
            d="M 9 14.5 L 12 17.5 L 15 14.5"
            strokeWidth={1.5}
            animate={{
              y: [0, 2, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.4,
            }}
          />
        </>
      ) : (
        <>
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M 9 15 L 12 18 L 15 15" strokeWidth={1.5} opacity={0.6} />
        </>
      )}
    </svg>
  );
}
