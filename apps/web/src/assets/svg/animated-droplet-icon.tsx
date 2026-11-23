"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedDropletIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  fill?: string;
  animate?: boolean;
}

export function AnimatedDropletIcon({
  className,
  size = 16,
  color = "currentColor",
  fill = "none",
  animate = true,
}: AnimatedDropletIconProps) {
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
      fill={fill}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 overflow-visible", className)}
      aria-hidden="true"
    >
      {shouldAnimate ? (
        <motion.path
          d="M 12 2.69 C 12 2.69 17.66 8.35 17.66 8.35 C 19.949 10.638 20.635 14.079 19.397 17.069 C 18.159 20.059 15.241 22.009 12.005 22.009 C 8.769 22.009 5.851 20.059 4.613 17.069 C 3.375 14.079 4.061 10.638 6.35 8.35 Z"
          style={{ originX: "12px", originY: "22px", transformBox: "fill-box" }}
          animate={{
            y: [0, -2, 0, 0],
            scaleX: [1, 0.92, 1.10, 1],
            scaleY: [1, 1.08, 0.90, 1],
          }}
          transition={{
            duration: 1.2,
            times: [0, 0.25, 0.5, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        />
      ) : (
        <path d="M 12 2.69 C 12 2.69 17.66 8.35 17.66 8.35 C 19.949 10.638 20.635 14.079 19.397 17.069 C 18.159 20.059 15.241 22.009 12.005 22.009 C 8.769 22.009 5.851 20.059 4.613 17.069 C 3.375 14.079 4.061 10.638 6.35 8.35 Z" />
      )}
    </svg>
  );
}
