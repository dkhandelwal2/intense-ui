"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LocationTrafficVehiclesProps {
  accent?: string;
  className?: string;
}

interface WaypointPoint {
  cx: number;
  cy: number;
}

interface TrafficRoute {
  name: string;
  pathD: string;
  waypoints?: WaypointPoint[];
  left: string[];
  top: string[];
  rotate: number[];
  times: number[];
  duration: number;
  opacity: number[];
  isMirrored?: boolean;
}

interface AutonomousVehicleProps {
  id: string;
  defaultEmoji: string;
  emojiPool: string[];
  routes: TrafficRoute[];
  initialDelay?: number;
  fontSize?: string;
  accent?: string;
}

/**
 * Slot 1: North & Northwest Corridor (Street 40 & Avenue 38)
 * Dynamic random paths with matching visible navigation tracks:
 * - Route 1-A: Top Street 40 Westbound -> Intersection Yield Stop & Pass -> Turn South onto Avenue 38
 * - Route 1-B: Top Street 40 Full-Span Express Westbound
 * - Route 1-C: Avenue 38 Full-Span Perimeter Southbound
 */
const SLOT_1_ROUTES: TrafficRoute[] = [
  {
    name: "Street 40 to Avenue 38 Junction Stop & Pass",
    pathD: "M 325 40 L 46 40 Q 38 40 38 48 L 38 395",
    waypoints: [
      { cx: 278, cy: 40 },
      { cx: 38, cy: 40 },
    ],
    left: ["100%", "92.5%", "92.5%", "86.88%", "45.0%", "14.38%", "11.88%", "11.88%"],
    top: ["10.53%", "10.53%", "10.53%", "10.53%", "10.53%", "10.53%", "12.63%", "105%"],
    rotate: [0, 0, 0, 0, 0, 0, -90, -90],
    opacity: [0.4, 1, 1, 1, 1, 1, 1, 0.4],
    times: [0, 0.088, 0.238, 0.3, 0.52, 0.725, 0.75, 1],
    duration: 8.0,
  },
  {
    name: "Street 40 Express Westbound",
    pathD: "M 325 40 L -15 40",
    waypoints: [
      { cx: 278, cy: 40 },
      { cx: 182, cy: 40 },
      { cx: 38, cy: 40 },
    ],
    left: ["100%", "-8.0%"],
    top: ["10.53%", "10.53%"],
    rotate: [0, 0],
    opacity: [0.4, 1],
    times: [0, 1],
    duration: 5.5,
  },
  {
    name: "Avenue 38 Perimeter Southbound",
    pathD: "M 38 -15 L 38 395",
    waypoints: [
      { cx: 38, cy: 40 },
      { cx: 38, cy: 280 },
    ],
    left: ["11.88%", "11.88%"],
    top: ["-5%", "105%"],
    rotate: [-90, -90],
    opacity: [0.4, 1],
    times: [0, 1],
    duration: 6.2,
  },
];
const SLOT_1_EMOJIS = ["🚕", "🚗", "🚙", "🚓"];

/**
 * Slot 2: South & Arterial Corridor (Street 280 & Avenue 230)
 * Dynamic random paths with matching visible navigation tracks:
 * - Route 2-A: South-East Cross-Town Arterial Stop & Pass across Avenue 278
 * - Route 2-B: Street 280 Eastbound -> Turn South onto Avenue 230
 * - Route 2-C: Street 280 Full-Span Westbound Commute
 */
const SLOT_2_ROUTES: TrafficRoute[] = [
  {
    name: "Street 280 Eastbound Arterial Stop & Pass",
    pathD: "M 45 280 L 335 280",
    waypoints: [
      { cx: 134, cy: 280 },
      { cx: 230, cy: 280 },
      { cx: 278, cy: 280 },
    ],
    left: ["15.0%", "79.5%", "79.5%", "86.88%", "105%"],
    top: ["73.68%", "73.68%", "73.68%", "73.68%", "73.68%"],
    rotate: [0, 0, 0, 0, 0],
    opacity: [0.4, 1, 1, 1, 0.4],
    times: [0, 0.475, 0.65, 0.76, 1],
    duration: 8.0,
    isMirrored: true,
  },
  {
    name: "Street 280 to Avenue 230 Turn",
    pathD: "M 45 280 L 222 280 Q 230 280 230 288 L 230 395",
    waypoints: [
      { cx: 134, cy: 280 },
      { cx: 230, cy: 280 },
    ],
    left: ["15.0%", "69.38%", "71.88%", "71.88%"],
    top: ["73.68%", "73.68%", "75.79%", "105%"],
    rotate: [0, 0, 90, 90],
    opacity: [0.4, 1, 1, 0.4],
    times: [0, 0.569, 0.614, 1],
    duration: 6.5,
    isMirrored: true,
  },
  {
    name: "Street 280 Westbound Commute",
    pathD: "M 235 280 L -15 280",
    waypoints: [
      { cx: 230, cy: 280 },
      { cx: 134, cy: 280 },
      { cx: 38, cy: 280 },
    ],
    left: ["71.88%", "-8.0%"],
    top: ["73.68%", "73.68%"],
    rotate: [0, 0],
    opacity: [0.4, 1],
    times: [0, 1],
    duration: 5.5,
    isMirrored: false,
  },
];
const SLOT_2_EMOJIS = ["🚚", "🚐", "🚗", "🚕"];

/**
 * Slot 3: East Avenue Downtown Axis (Avenue 278)
 * Dynamic random paths with matching visible navigation tracks:
 * - Route 3-A: Priority Downtown Cruise
 * - Route 3-B: Avenue Intersection Yield Stop & Pass (yielding to Street 40 cross-traffic)
 * - Route 3-C: Fast Highway Commute
 */
const SLOT_3_ROUTES: TrafficRoute[] = [
  {
    name: "Avenue 278 Priority Cruise",
    pathD: "M 278 -15 L 278 395",
    waypoints: [
      { cx: 278, cy: 40 },
      { cx: 278, cy: 280 },
    ],
    left: ["86.88%", "86.88%"],
    top: ["-5%", "105%"],
    rotate: [-90, -90],
    opacity: [0.4, 1],
    times: [0, 1],
    duration: 6.5,
  },
  {
    name: "Avenue 278 Yield Stop & Pass",
    pathD: "M 278 -15 L 278 395",
    waypoints: [
      { cx: 278, cy: 40 },
      { cx: 278, cy: 280 },
    ],
    left: ["86.88%", "86.88%", "86.88%", "86.88%", "86.88%"],
    top: ["-5%", "4.0%", "4.0%", "10.53%", "105%"],
    rotate: [-90, -90, -90, -90, -90],
    opacity: [0.4, 1, 1, 1, 0.4],
    times: [0, 0.1, 0.275, 0.35, 1],
    duration: 8.0,
  },
  {
    name: "Avenue 278 Fast Highway Transit",
    pathD: "M 278 -15 L 278 395",
    waypoints: [
      { cx: 278, cy: 40 },
      { cx: 278, cy: 280 },
    ],
    left: ["86.88%", "86.88%"],
    top: ["-5%", "105%"],
    rotate: [-90, -90],
    opacity: [0.4, 1],
    times: [0, 1],
    duration: 4.5,
  },
];
const SLOT_3_EMOJIS = ["🚗", "🏎️", "🚓", "🚙"];

function AutonomousVehicle({
  id,
  defaultEmoji,
  emojiPool,
  routes,
  initialDelay = 0,
  fontSize = "text-[15px]",
  accent = "var(--loc-accent, #38bdf8)",
}: AutonomousVehicleProps) {
  // Deterministic SSR state to guarantee hydration integrity
  const [routeIndex, setRouteIndex] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(defaultEmoji);
  const [tripCount, setTripCount] = useState(0);
  const [delay, setDelay] = useState(initialDelay);

  const activeRoute = routes[routeIndex];

  const handleAnimationComplete = () => {
    // Choose next route randomly, ensuring varied city dynamics
    setRouteIndex((prev) => {
      const candidates = routes.map((_, idx) => idx).filter((idx) => idx !== prev);
      return candidates[Math.floor(Math.random() * candidates.length)] ?? 0;
    });

    // Randomize vehicle model from pool
    setCurrentEmoji(emojiPool[Math.floor(Math.random() * emojiPool.length)] ?? defaultEmoji);

    // Realistic traffic interval delay (0.8s - 2.2s) before next vehicle enters
    setDelay(0.8 + Math.random() * 1.4);

    // Increment trip count to re-trigger the fresh route animation
    setTripCount((prev) => prev + 1);
  };

  return (
    <>
      {/* Dynamically Generated Navigation Track for This Active Route */}
      <svg
        key={`track-${id}-${tripCount}`}
        viewBox="0 0 320 380"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Subtle glowing road bed */}
          <path
            d={activeRoute.pathD}
            stroke={accent}
            strokeWidth="3.5"
            strokeOpacity="0.08"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Active dashed navigation track */}
          <path
            d={activeRoute.pathD}
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.28"
            strokeDasharray="4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Waypoint dots along the active route */}
          {activeRoute.waypoints?.map((pt, i) => (
            <circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r="2.2"
              fill={accent}
              fillOpacity="0.5"
            />
          ))}
        </motion.g>
      </svg>

      {/* Vehicle Emoji Navigating Strictly Along This Dynamic Track */}
      <motion.div
        key={`vehicle-${id}-${tripCount}`}
        className="absolute pointer-events-none"
        initial={{
          left: activeRoute.left[0],
          top: activeRoute.top[0],
          opacity: activeRoute.opacity[0],
        }}
        animate={{
          left: activeRoute.left,
          top: activeRoute.top,
          opacity: activeRoute.opacity,
        }}
        transition={{
          duration: activeRoute.duration,
          ease: "linear",
          delay,
          times: activeRoute.times,
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        {/* Precision wheel-contact anchor: road line sits directly beneath the tires */}
        <div
          className="pointer-events-none flex items-center justify-center"
          style={{ transform: "translate(-50%, -85%)" }}
        >
          <motion.div
            className={cn(
              "leading-none will-change-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
              fontSize
            )}
            style={{ transformOrigin: "50% 85%" }}
            initial={{ rotate: activeRoute.rotate[0] }}
            animate={{ rotate: activeRoute.rotate }}
            transition={{
              duration: activeRoute.duration,
              ease: "linear",
              delay,
              times: activeRoute.times,
            }}
          >
            {activeRoute.isMirrored ? (
              <span className="inline-block scale-x-[-1]">{currentEmoji}</span>
            ) : (
              currentEmoji
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

/**
 * Realistic City Traffic with Dynamically Generated Navigation Tracks:
 * - Every vehicle runs strictly on its matching dashed navigation track.
 * - Whenever a vehicle selects a random path, that exact path is illuminated on the map.
 * - Intersection yielding and stop-and-pass dynamics occur naturally when routes intersect.
 * - Multi-route randomization, directional heading alignment, and road-top tire anchoring are fully preserved.
 */
export function LocationTrafficVehicles({
  className,
  accent = "var(--loc-accent, #38bdf8)",
}: LocationTrafficVehiclesProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none z-[2] font-sans",
        className
      )}
      aria-hidden="true"
    >
      {/* Slot 1: North & West Corridor Traffic */}
      <AutonomousVehicle
        id="north-west"
        defaultEmoji="🚕"
        emojiPool={SLOT_1_EMOJIS}
        routes={SLOT_1_ROUTES}
        initialDelay={0}
        fontSize="text-[15px]"
        accent={accent}
      />

      {/* Slot 2: South & Arterial Corridor Traffic */}
      <AutonomousVehicle
        id="south-arterial"
        defaultEmoji="🚚"
        emojiPool={SLOT_2_EMOJIS}
        routes={SLOT_2_ROUTES}
        initialDelay={0.5}
        fontSize="text-[16px]"
        accent={accent}
      />

      {/* Slot 3: East Avenue Downtown Traffic */}
      <AutonomousVehicle
        id="east-avenue"
        defaultEmoji="🚗"
        emojiPool={SLOT_3_EMOJIS}
        routes={SLOT_3_ROUTES}
        initialDelay={0}
        fontSize="text-[15px]"
        accent={accent}
      />
    </div>
  );
}
