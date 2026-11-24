"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedFilterIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

export function AnimatedFilterIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedFilterIconProps) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      {shouldAnimate ? (
        <motion.line
          x1={10}
          y1={13}
          x2={14}
          y2={13}
          strokeWidth={2}
          animate={{
            y1: [13, 18, 13],
            y2: [13, 18, 13],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.2,
          }}
        />
      ) : (
        <line x1="10" y1="13" x2="14" y2="13" strokeWidth={2} opacity={0.5} />
      )}
    </svg>
  );
}
