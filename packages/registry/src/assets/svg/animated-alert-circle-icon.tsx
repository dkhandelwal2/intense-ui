"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedAlertCircleIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function AnimatedAlertCircleIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedAlertCircleIconProps) {
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
          {/* Main outer boundary circle */}
          <circle cx={12} cy={12} r={10} />

          {/* Outward pulse ripple wave matching alert-circle.json */}
          <motion.circle
            cx={12}
            cy={12}
            r={10}
            animate={{
              scale: [1, 1.25, 1.25],
              opacity: [0.65, 0, 0],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.55, 1],
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{ originX: "12px", originY: "12px" }}
          />

          {/* Exclamation stem and dot with alert bounce */}
          <motion.g
            animate={{
              scale: [1, 1, 1.15, 0.95, 1, 1],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.1, 0.25, 0.4, 0.55, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: "12px", originY: "12px" }}
          >
            <line x1={12} y1={8} x2={12} y2={12} />
            <line x1={12} y1={16} x2={12.01} y2={16} />
          </motion.g>
        </>
      ) : (
        <>
          <circle cx={12} cy={12} r={10} />
          <line x1={12} y1={8} x2={12} y2={12} />
          <line x1={12} y1={16} x2={12.01} y2={16} />
        </>
      )}
    </svg>
  );
}
