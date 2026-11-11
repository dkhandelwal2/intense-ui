"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarcodeSVG } from "../barcode-svg";
import { BarcodeProps } from "../types";
import { DottedGlobe } from "./dotted-globe";
import { AirplaneIcon } from "./airplane-icon";
import { TicketNotchDivider } from "./ticket-notch-divider";

const TOP_NOTCH_STYLE = {
  backgroundImage:
    "radial-gradient(circle 14px at 0% 100%, transparent 13.5px, var(--card-bg) 14px), radial-gradient(circle 14px at 100% 100%, transparent 13.5px, var(--card-bg) 14px)",
  backgroundSize: "51% 100%", backgroundPosition: "left top, right top", backgroundRepeat: "no-repeat",
};

const BOTTOM_NOTCH_STYLE = {
  backgroundImage:
    "radial-gradient(circle 14px at 0% 0%, transparent 13.5px, var(--card-bg) 14px), radial-gradient(circle 14px at 100% 0%, transparent 13.5px, var(--card-bg) 14px)",
  backgroundSize: "51% 100%", backgroundPosition: "left top, right top", backgroundRepeat: "no-repeat",
};

const FLIGHT_TIMES = [0, 0.7, 0.82, 0.88, 0.9, 0.96, 1];

export function BoardingPassBarcode({
  value,
  format = "code128",
  dotStyle = "dots",
  size,
  color,
  accentColor,
  airplaneIcon,
  metadata,
  className,
}: BarcodeProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const {
    from = "YYZ", to = "LAX", flight = "AC518", seat = "04A", gate = "G12",
    group = "PRIORITY", groupLabel = "Group", fromCity = "TORONTO", toCity = "LOS ANGELES",
    departure = "11:12 AM", arrival = "4:34 PM", departureLabel = "DEPARTURE", arrivalLabel = "ARRIVAL",
    status = "ON TIME", statusLabel, statusColor, logo, icon,
  } = metadata || {};

  const activePlane = airplaneIcon || metadata?.airplaneIcon || metadata?.flightIcon || metadata?.icon || (
    <AirplaneIcon className="w-4 h-4 text-zinc-900 dark:text-white drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
  );

  return (
    <div className={cn("relative w-full max-w-[340px] text-zinc-900 dark:text-zinc-100 font-sans select-none drop-shadow-xl", className)}>
      {/* Top Section: Flight Tracker HUD with 3D Globe */}
      <div className="relative p-5 pb-5 overflow-hidden rounded-t-[28px] [--card-bg:#ffffff] dark:[--card-bg:#09090b]" style={TOP_NOTCH_STYLE}>
        {/* Top Rounded Border Cap */}
        <svg className="absolute top-0 inset-x-0 w-full h-7 pointer-events-none" viewBox="0 0 340 28" fill="none">
          <path d="M 0 28 A 28 28 0 0 1 28 0 L 312 0 A 28 28 0 0 1 340 28" stroke="currentColor" strokeWidth="1" className="text-zinc-200 dark:text-zinc-800" />
        </svg>

        {/* Side Borders stopping 14px above divider (no straight border crossing notch) */}
        <div className="absolute left-0 top-7 bottom-[14px] w-px bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />
        <div className="absolute right-0 top-7 bottom-[14px] w-px bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />

        {/* Departure & Arrival Times */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-zinc-500 dark:text-zinc-400 font-medium mb-3">
          <span>{departureLabel ? `${departureLabel}: ` : ""}{departure}</span>
          <span>{arrivalLabel ? `${arrivalLabel}: ` : ""}{arrival}</span>
        </div>

        {/* Airport Codes & Moving Airplane Route */}
        <div className="relative z-10 flex items-center justify-between my-2">
          <div className="text-left z-10">
            <div className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">{from}</div>
            <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider mt-1 uppercase">{fromCity}</div>
          </div>

          {/* Center Flight Track with Moving Airplane */}
          <div
            className="flex-1 px-4 flex flex-col items-center justify-center cursor-pointer group select-none"
            onClick={() => setIsPlaying(!isPlaying)}
            title="Click to toggle flight animation"
          >
            <div className="relative w-full h-6 flex items-center">
              <div className="absolute inset-x-0 border-t border-dashed border-zinc-300 dark:border-zinc-700 pointer-events-none" />

              {/* Active Glowing Contrail (Left to Right only, smooth fade loop) */}
              <div className="absolute left-0 h-[2.5px] rounded-full overflow-hidden w-full pointer-events-none">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 shadow-[0_0_12px_#10b981]"
                  animate={
                    isPlaying
                      ? { width: ["0%", "100%", "100%", "0%", "0%", "0%", "0%"], opacity: [1, 1, 1, 0, 0, 1, 1] }
                      : { width: "70%", opacity: 1 }
                  }
                  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, times: FLIGHT_TIMES }}
                />
              </div>

              {/* Free-flying Airplane Icon (Facing Right, Left-to-Right only, smooth fade loop) */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 -ml-2 z-20 pointer-events-none"
                animate={
                  isPlaying
                    ? { left: ["0%", "100%", "100%", "100%", "0%", "0%", "0%"], opacity: [1, 1, 1, 0, 0, 1, 1] }
                    : { left: "70%", opacity: 1 }
                }
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, times: FLIGHT_TIMES }}
              >
                {activePlane}
              </motion.div>

              <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 z-10" />
            </div>

            <div
              className={cn("flex items-center gap-1.5 mt-1.5 text-[10px] font-bold tracking-widest", !statusColor && "text-emerald-600 dark:text-emerald-400")}
              style={statusColor ? { color: statusColor } : undefined}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: statusColor || "#10b981" }} />
              {statusLabel || status}
            </div>
          </div>

          <div className="text-right z-10">
            <div className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">{to}</div>
            <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider mt-1 uppercase">{toCity}</div>
          </div>
        </div>

        {/* 3D Dotted Globe Horizon Curve sitting cleanly below status badge */}
        <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none overflow-hidden z-0">
          <DottedGlobe className="w-full h-full text-zinc-500 dark:text-zinc-100" />
        </div>

        {/* Bottom HUD: Flight Pill & Airline Logo */}
        <div className="relative z-10 flex items-center justify-between mt-5 pt-1">
          <div className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono font-bold text-zinc-800 dark:text-zinc-200 tracking-wide shadow-xs">
            {flight}
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center border shadow-xs"
            style={{ backgroundColor: accentColor || (metadata as any)?.accentColor || "#dc2626", borderColor: accentColor || (metadata as any)?.accentColor || "#ef4444" }}
          >
            {logo || icon || <Compass className="w-4 h-4 text-white" />}
          </div>
        </div>
      </div>

      {/* Perforated Divider with Half-Rounded Notch Arcs (No straight border) */}
      <TicketNotchDivider />

      {/* Bottom Stub: Boarding Details & Barcode */}
      <div className="relative px-5 pt-3 pb-5 flex flex-col items-center rounded-b-[28px] [--card-bg:#ffffff] dark:[--card-bg:#09090b]" style={BOTTOM_NOTCH_STYLE}>
        {/* Side Borders starting 14px below divider */}
        <div className="absolute left-0 top-[14px] bottom-7 w-px bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />
        <div className="absolute right-0 top-[14px] bottom-7 w-px bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />

        {/* Bottom Rounded Border Cap */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-7 pointer-events-none" viewBox="0 0 340 28" fill="none">
          <path d="M 340 0 A 28 28 0 0 1 312 28 L 28 28 A 28 28 0 0 1 0 0" stroke="currentColor" strokeWidth="1" className="text-zinc-200 dark:text-zinc-800" />
        </svg>

        <div className="w-full grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 text-center font-mono text-[10px] mb-3">
          <div>
            <div className="text-zinc-500 uppercase text-[9px]">Gate</div>
            <div className="font-bold text-zinc-900 dark:text-zinc-200 text-xs">{gate}</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase text-[9px]">Seat</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">{seat}</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase text-[9px]">{groupLabel}</div>
            <div className="font-bold text-zinc-900 dark:text-zinc-200 text-xs">{group}</div>
          </div>
        </div>

        <BarcodeSVG
          value={value}
          format={format}
          height={55}
          size={size || 120}
          dotStyle={dotStyle}
          barWidth={1.7}
          color={color || "currentColor"}
          showText={true}
          copyable={true}
          downloadable={true}
          className="text-zinc-900 dark:text-zinc-100"
        />
      </div>
    </div>
  );
}
