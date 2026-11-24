"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedEyeIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function AnimatedEyeIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedEyeIconProps) {
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
          {/* Eyelid outline with natural blink cycle */}
          <motion.path
            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
            animate={{
              scaleY: [1, 1, 0.1, 1, 1],
            }}
            transition={{
              duration: 2.6,
              times: [0, 0.45, 0.5, 0.55, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: "12px", originY: "12px" }}
          />

          {/* Pupil with downward glance matching eye.json keyframe */}
          <motion.circle
            cx={12}
            cy={12}
            r={3}
            animate={{
              y: [0, 0, 1.8, 0, 0],
              scaleY: [1, 1, 0.2, 1, 1],
            }}
            transition={{
              duration: 2.6,
              times: [0, 0.25, 0.45, 0.55, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: "12px", originY: "12px" }}
          />
        </>
      ) : (
        <>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx={12} cy={12} r={3} />
        </>
      )}
    </svg>
  );
}
