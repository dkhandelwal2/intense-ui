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

// Keyframes extracted from droplet.json (squash, stretch and rebound at base y=22)
const DROPLET_KEYFRAMES = [
  "M 12.000 2.690 C 12.000 2.690 17.660 8.350 17.660 8.350 C 19.949 10.638 20.635 14.079 19.397 17.069 C 18.159 20.059 15.241 22.009 12.005 22.009 C 8.769 22.009 5.851 20.059 4.613 17.069 C 3.375 14.079 4.061 10.638 6.350 8.350 Z",
  "M 12.000 -0.356 C 12.000 -0.356 17.320 5.757 17.320 5.757 C 19.472 8.228 20.117 11.945 18.953 15.174 C 17.789 18.403 15.047 20.509 12.005 20.509 C 8.963 20.509 6.220 18.403 5.056 15.174 C 3.893 11.945 4.537 8.228 6.689 5.757 Z",
  "M 12.000 1.917 C 12.000 1.917 17.434 7.804 17.434 7.804 C 19.631 10.183 20.290 13.762 19.101 16.871 C 17.913 19.981 15.111 22.009 12.005 22.009 C 8.898 22.009 6.097 19.981 4.908 16.871 C 3.720 13.762 4.379 10.183 6.576 7.804 Z",
  "M 12.000 4.622 C 12.000 4.622 18.226 9.716 18.226 9.716 C 20.744 11.775 21.498 14.872 20.137 17.563 C 18.775 20.254 15.565 22.009 12.006 22.009 C 8.446 22.009 5.236 20.254 3.874 17.563 C 2.512 14.872 3.267 11.775 5.785 9.716 Z",
  "M 12.000 2.110 C 12.000 2.110 17.490 7.940 17.490 7.940 C 19.711 10.297 20.376 13.841 19.175 16.921 C 17.974 20.001 15.144 22.009 12.005 22.009 C 8.866 22.009 6.035 20.001 4.835 16.921 C 3.634 13.841 4.299 10.297 6.519 7.940 Z",
  "M 12.000 2.690 C 12.000 2.690 17.660 8.350 17.660 8.350 C 19.949 10.638 20.635 14.079 19.397 17.069 C 18.159 20.059 15.241 22.009 12.005 22.009 C 8.769 22.009 5.851 20.059 4.613 17.069 C 3.375 14.079 4.061 10.638 6.350 8.350 Z",
];

export function AnimatedDropletIcon({
  className,
  size = 16,
  color = "currentColor",
  fill = "currentColor",
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
          d={DROPLET_KEYFRAMES[0]}
          initial={{ d: DROPLET_KEYFRAMES[0] }}
          animate={{
            d: DROPLET_KEYFRAMES,
          }}
          transition={{
            duration: 1.2,
            times: [0, 0.18, 0.4, 0.5, 0.72, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        />
      ) : (
        <path d={DROPLET_KEYFRAMES[0]} />
      )}
    </svg>
  );
}
