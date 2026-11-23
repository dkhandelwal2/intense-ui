"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GithubActivityPulseIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function GithubActivityPulseIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: GithubActivityPulseIconProps) {
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
      {/* Static faint baseline track */}
      <polyline
        points="2 12 6 12 9 3 15 21 18 12 22 12"
        className={shouldAnimate ? "opacity-25" : "opacity-100"}
      />
      {/* Animated traveling cardiac pulse beam left-to-right matching the Lottie JSON activity animation */}
      {shouldAnimate && (
        <motion.polyline
          points="2 12 6 12 9 3 15 21 18 12 22 12"
          initial={{ pathLength: 0.28, pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{
            duration: 1.33,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        />
      )}
    </svg>
  );
}
