"use client";

import React from "react";
import { motion } from "framer-motion";

export interface GpsBeaconPinProps {
  accent?: string;
  size?: number;
  className?: string;
}

/**
 * Pure SVG GPS Beacon Pin matching the Pinterest reference:
 * - Electric-blue beacon core with dark outline and bright white center pinpoint
 * - Tight localized sonar ripples confined strictly to the icon (never overflowing across QR)
 * - Declarative 60fps animations driven by framer-motion (zero internal CSS injection)
 */
export function GpsBeaconPin({
  accent = "#38bdf8",
  size = 36,
  className,
}: GpsBeaconPinProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || "overflow-visible"}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="beacon-ambient-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.7" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Localized Sonar Ripple Waves - Strictly confined around the beacon icon */}
      <motion.circle
        cx="18"
        cy="18"
        r="9"
        stroke={accent}
        strokeWidth="1.5"
        fill="none"
        style={{ transformOrigin: "18px 18px" }}
        initial={{ scale: 0.65, opacity: 0.95 }}
        animate={{
          scale: [0.65, 1.12, 1.6],
          opacity: [0.95, 0.4, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: [0.1, 0.7, 0.3, 1],
        }}
      />
      <motion.circle
        cx="18"
        cy="18"
        r="9"
        stroke={accent}
        strokeWidth="1.2"
        fill="none"
        style={{ transformOrigin: "18px 18px" }}
        initial={{ scale: 0.65, opacity: 0.95 }}
        animate={{
          scale: [0.65, 1.12, 1.6],
          opacity: [0.95, 0.4, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: [0.1, 0.7, 0.3, 1],
          delay: 1.1,
        }}
      />

      {/* Ambient Beacon Soft Glow */}
      <circle cx="18" cy="18" r="13" fill="url(#beacon-ambient-glow)" />

      {/* Solid GPS Location Beacon (outer ring with high-contrast border) */}
      <circle
        cx="18"
        cy="18"
        r="6.5"
        fill={accent}
        stroke="#090a0f"
        strokeWidth="2"
      />

      {/* Bright Core Pinpoint Dot */}
      <circle cx="18" cy="18" r="2.2" fill="#ffffff" />
    </svg>
  );
}
