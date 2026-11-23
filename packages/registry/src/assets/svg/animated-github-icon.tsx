"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedGithubIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  animate?: boolean;
}

// Extracted directly from github.json Lottie animation (32x32, 30fps)
const BODY_PATH =
  "M 20.00 26.00 L 20.00 22.13 C 20.08 21.16, 19.73 20.21, 19.06 19.52 C 22.20 19.17, 25.50 17.98, 25.50 12.52 C 25.50 11.12, 24.96 9.78, 24.00 8.77 C 24.46 7.55, 24.42 6.20, 23.91 5.00 C 23.91 5.00, 22.73 4.65, 20.00 6.48 C 17.71 5.86, 15.29 5.86, 13.00 6.48 C 10.27 4.65, 9.09 5.00, 9.09 5.00 C 8.58 6.20, 8.54 7.55, 9.00 8.77 C 8.03 9.79, 7.49 11.14, 7.50 12.55 C 7.50 17.97, 10.80 19.16, 13.94 19.55 C 13.27 20.24, 12.93 21.18, 13.00 22.13 L 13.00 26.00";

const ARM_KEYFRAMES = [
  "M 13.00 23.00 C 8.00 24.50, 8.00 20.50, 6.00 20.00",
  "M 13.00 23.00 C 8.86 23.07, 6.79 22.57, 6.00 20.00",
  "M 13.00 23.00 C 11.00 19.50, 7.57 23.79, 6.00 20.00",
  "M 13.00 23.00 C 10.25 20.75, 8.93 19.64, 6.00 20.00",
  "M 13.00 23.00 C 9.36 24.29, 8.46 20.07, 6.00 20.00",
  "M 13.00 23.00 C 8.00 24.50, 6.86 21.50, 6.00 20.00",
  "M 13.00 23.00 C 10.29 21.36, 7.36 23.43, 6.00 20.00",
  "M 13.00 23.00 C 11.00 19.50, 7.57 23.79, 6.00 20.00",
  "M 13.00 23.00 C 10.57 20.21, 7.79 21.07, 6.00 20.00",
  "M 13.00 23.00 C 9.03 22.79, 9.64 19.50, 6.00 20.00",
  "M 13.00 23.00 C 8.00 24.50, 8.00 20.50, 6.00 20.00",
];

const ARM_TIMES = [0, 0.1, 0.233, 0.333, 0.433, 0.533, 0.633, 0.733, 0.833, 0.933, 1];

export function AnimatedGithubIcon({
  className,
  size = 16,
  color = "currentColor",
  animate = true,
}: AnimatedGithubIconProps) {
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
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 overflow-visible", className)}
      aria-hidden="true"
    >
      {/* Octocat Head & Body Outline from github.json */}
      <path d={BODY_PATH} />

      {/* Waving Arm with Keyframed Morphing from github.json */}
      {shouldAnimate ? (
        <motion.path
          d={ARM_KEYFRAMES[0]}
          animate={{ d: ARM_KEYFRAMES }}
          transition={{
            duration: 1.0,
            times: ARM_TIMES,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        />
      ) : (
        <path d={ARM_KEYFRAMES[0]} />
      )}
    </svg>
  );
}
