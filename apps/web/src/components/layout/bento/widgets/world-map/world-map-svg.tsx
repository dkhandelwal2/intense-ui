"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { OPACITY_BUCKETS } from "./world-map-data";

export interface WorldMapSvgProps {
  className?: string;
  dotBuckets: string[];
  sunScreenPos: [number, number] | null;
  terminatorD: string;
  homePin: {
    x: number;
    y: number;
    label: string;
    ping?: boolean;
  } | null;
  remotePin: {
    x: number;
    y: number;
    label: string;
    isLeft: boolean;
    ping?: boolean;
  } | null;
  flightArcD: string | null;
  isArcVisible: boolean;
}

interface MapPinProps {
  x: number;
  y: number;
  label?: string;
  isLeft?: boolean;
  ping?: boolean;
}

const MapPin = React.memo(function MapPin({
  x,
  y,
  label,
  isLeft = false,
}: MapPinProps) {
  const textX = isLeft ? x - 12 : x + 12;
  const textAnchor = isLeft ? "end" : "start";

  return (
    <g>
      <circle cx={x} cy={y} r={3.6} className="fill-blue-500" />
      <circle
        cx={x}
        cy={y}
        r={7}
        strokeWidth={1}
        className="fill-none stroke-blue-500/40"
      />
      {label && (
        <text
          x={textX}
          y={y}
          textAnchor={textAnchor}
          dominantBaseline="central"
          fontSize={11}
          letterSpacing={1.6}
          className="fill-foreground/80 font-mono text-[11px] uppercase tracking-wider select-none pointer-events-none"
        >
          {label}
        </text>
      )}
    </g>
  );
});

export const WorldMapSvg = React.memo(function WorldMapSvg({
  className,
  dotBuckets,
  sunScreenPos,
  terminatorD,
  homePin,
  remotePin,
  flightArcD,
  isArcVisible,
}: WorldMapSvgProps) {
  const glowId = useId();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 260"
      className={cn("w-full h-auto select-none overflow-visible", className)}
    >
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor="rgb(245 158 11)" stopOpacity="0.12" />
          <stop offset="1" stopColor="rgb(245 158 11)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Solar Glow Halo */}
      {sunScreenPos && (
        <circle
          cx={sunScreenPos[0]}
          cy={sunScreenPos[1]}
          r={70}
          fill={`url(#${glowId})`}
        />
      )}

      {/* Dotted World Landmass (5 Illumination Levels) */}
      <g
        className="fill-none transition-opacity duration-300 opacity-85 group-hover:opacity-100"
        strokeLinecap="round"
        strokeWidth={2.6}
      >
        {dotBuckets.map((d, idx) => {
          const bucket = OPACITY_BUCKETS[idx];
          if (!bucket || !d) return null;
          return <path key={bucket.min} className={bucket.className} d={d} />;
        })}
      </g>

      {/* Day / Night Terminator Line */}
      {terminatorD && (
        <path
          d={terminatorD}
          fill="none"
          strokeDasharray="3 4"
          strokeWidth={1}
          className="stroke-foreground/25 transition-colors"
        />
      )}

      {/* Solar Marker Icon & Rays */}
      {sunScreenPos && (
        <g className="text-amber-500/80 stroke-current" strokeWidth={1}>
          <circle cx={sunScreenPos[0]} cy={sunScreenPos[1]} r={4.5} fill="none" />
          {Array.from({ length: 8 }, (_, a) => {
            const angle = (a / 8) * Math.PI * 2;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const x1 = sunScreenPos[0] + 7.5 * cos;
            const y1 = sunScreenPos[1] + 7.5 * sin;
            const x2 = 3 * cos;
            const y2 = 3 * sin;
            return (
              <path
                key={`ray-${a}`}
                d={`M${x1.toFixed(1)} ${y1.toFixed(1)}l${x2.toFixed(1)} ${y2.toFixed(1)}`}
                strokeLinecap="round"
              />
            );
          })}
        </g>
      )}

      {/* Flight Arc and Connecting Path */}
      {isArcVisible && flightArcD && (
        <g className="transition-opacity duration-300">
          <path
            className="stroke-foreground/35"
            d={flightArcD}
            fill="none"
            strokeDasharray="3 4"
            strokeWidth={1}
          />
          <path
            className="stroke-blue-500 transition-all duration-700 ease-out"
            d={flightArcD}
            fill="none"
            pathLength={1}
            strokeDasharray="1 1"
            strokeWidth={1.4}
          />
        </g>
      )}

      {/* Destination Pin (if active & different timezone) */}
      {isArcVisible && remotePin && (
        <MapPin
          x={remotePin.x}
          y={remotePin.y}
          label={remotePin.label}
          isLeft={remotePin.isLeft}
          ping={remotePin.ping}
        />
      )}

      {/* Home Pin / User Location Pin */}
      {homePin && (
        <MapPin
          x={homePin.x}
          y={homePin.y}
          label={homePin.label}
          ping={homePin.ping}
        />
      )}
    </svg>
  );
});
