"use client";

import React from "react";
import { motion } from "framer-motion";

export interface LocationStreetGridProps {
  accent?: string;
  className?: string;
}

// Mathematically aligned navigation routes following street channels
// Avenue x: [38, 86, 134, 182, 230, 278] | Street y: [40, 88, 136, 184, 232, 280, 328]
const ROUTE_1_INBOUND =
  "M 278 -10 L 278 78 Q 278 88 268 88 L 192 88 Q 182 88 182 98 L 182 174 Q 182 184 172 184 L 140 184";
const ROUTE_2_ARTERIAL =
  "M -10 232 L 76 232 Q 86 232 86 242 L 86 270 Q 86 280 96 280 L 220 280 Q 230 280 230 290 L 230 390";
const ROUTE_3_NORTHWEST =
  "M 134 -10 L 134 30 Q 134 40 124 40 L 48 40 Q 38 40 38 50 L 38 174 Q 38 184 48 184 L 110 184";

/**
 * Realistic City Navigation Street Grid:
 * - Orthogonal city blocks aligned with real street channels
 * - Distinct visible road beds and dashed centerline navigation tracks
 * - Animated GPS light beams travelling strictly along the visible street paths
 * - Smooth radiused cornering at street intersections leading toward the central GPS lock
 */
export function LocationStreetGrid({
  accent = "#38bdf8",
  className,
}: LocationStreetGridProps) {
  return (
    <svg
      viewBox="0 0 320 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || "absolute inset-0 w-full h-full pointer-events-none"}
      aria-hidden="true"
    >
      <defs>
        {/* Exact city block tile aligned with 48x48 street grid */}
        <pattern
          id="loc-street-pattern"
          width="48"
          height="48"
          x="14"
          y="16"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="5"
            y="5"
            width="38"
            height="38"
            rx="4"
            fill="currentColor"
            opacity="0.04"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.07"
          />
        </pattern>

        {/* Soft glowing filter for traveling light pulses */}
        <filter id="street-pulse-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base City Blocks Pattern */}
      <rect width="100%" height="100%" fill="url(#loc-street-pattern)" />

      {/* Subtle Street Channel Centerlines */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.08">
        {/* Avenues */}
        <line x1="38" y1="-10" x2="38" y2="390" />
        <line x1="86" y1="-10" x2="86" y2="390" />
        <line x1="134" y1="-10" x2="134" y2="390" />
        <line x1="182" y1="-10" x2="182" y2="390" />
        <line x1="230" y1="-10" x2="230" y2="390" />
        <line x1="278" y1="-10" x2="278" y2="390" />
        {/* Cross Streets */}
        <line x1="-10" y1="40" x2="330" y2="40" />
        <line x1="-10" y1="88" x2="330" y2="88" />
        <line x1="-10" y1="136" x2="330" y2="136" />
        <line x1="-10" y1="184" x2="330" y2="184" />
        <line x1="-10" y1="232" x2="330" y2="232" />
        <line x1="-10" y1="280" x2="330" y2="280" />
        <line x1="-10" y1="328" x2="330" y2="328" />
      </g>

      {/* =========================================================================
          LAYER 1: VISIBLE ROAD TRACKS
          Clearly visible paths on the map that define the transit & navigation network
          ========================================================================= */}
      <g fill="none">
        {/* Route 1: Road Bed & Dashed Route Line */}
        <path
          d={ROUTE_1_INBOUND}
          stroke={accent}
          strokeWidth="4"
          strokeOpacity="0.08"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={ROUTE_1_INBOUND}
          stroke={accent}
          strokeWidth="1.2"
          strokeOpacity="0.32"
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Route 2: Road Bed & Dashed Route Line */}
        <path
          d={ROUTE_2_ARTERIAL}
          stroke={accent}
          strokeWidth="4"
          strokeOpacity="0.07"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={ROUTE_2_ARTERIAL}
          stroke={accent}
          strokeWidth="1.2"
          strokeOpacity="0.26"
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Route 3: Road Bed & Dashed Route Line */}
        <path
          d={ROUTE_3_NORTHWEST}
          stroke={accent}
          strokeWidth="4"
          strokeOpacity="0.07"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={ROUTE_3_NORTHWEST}
          stroke={accent}
          strokeWidth="1.2"
          strokeOpacity="0.26"
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Junction Waypoint Dots along the Navigation Routes */}
      <circle cx="182" cy="88" r="2.2" fill={accent} fillOpacity="0.5" />
      <circle cx="86" cy="232" r="2.2" fill={accent} fillOpacity="0.5" />
      <circle cx="230" cy="280" r="2.2" fill={accent} fillOpacity="0.5" />
      <circle cx="38" cy="40" r="2.2" fill={accent} fillOpacity="0.5" />
      <circle cx="38" cy="184" r="2.2" fill={accent} fillOpacity="0.5" />

      {/* =========================================================================
          LAYER 2: ANIMATED GPS LIGHT BEAMS
          Pulses strictly following the visible road paths and turning at intersections
          ========================================================================= */}
      <g fill="none">
        {/* Pulse 1: Inbound toward GPS Beacon Center */}
        <motion.path
          d={ROUTE_1_INBOUND}
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#street-pulse-glow)"
          strokeDasharray="50 350"
          initial={{ strokeDashoffset: 400, opacity: 0 }}
          animate={{
            strokeDashoffset: [400, 0],
            opacity: [0, 0.95, 0.95, 0],
          }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.88, 1],
          }}
        />

        {/* Pulse 2: South Cross-Town Arterial */}
        <motion.path
          d={ROUTE_2_ARTERIAL}
          stroke={accent}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#street-pulse-glow)"
          strokeDasharray="45 420"
          initial={{ strokeDashoffset: 465, opacity: 0 }}
          animate={{
            strokeDashoffset: [465, 0],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 5.4,
            repeat: Infinity,
            ease: "linear",
            delay: 1.6,
            times: [0, 0.1, 0.88, 1],
          }}
        />

        {/* Pulse 3: Northwest Sector Approach */}
        <motion.path
          d={ROUTE_3_NORTHWEST}
          stroke={accent}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#street-pulse-glow)"
          strokeDasharray="42 380"
          initial={{ strokeDashoffset: 422, opacity: 0 }}
          animate={{
            strokeDashoffset: [422, 0],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 5.0,
            repeat: Infinity,
            ease: "linear",
            delay: 3.2,
            times: [0, 0.1, 0.88, 1],
          }}
        />
      </g>
    </svg>
  );
}
