"use client";

import React, { useState } from "react";
import { Check, Copy, Plane, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarcodeSVG } from "../barcode-svg";
import { BarcodeProps } from "../types";
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

export function ShippingLabelBarcode({
  value,
  format = "code128",
  dotStyle,
  size,
  color,
  accentColor,
  airplaneIcon,
  headerIcon,
  metadata,
  className,
}: BarcodeProps) {
  const [copiedId, setCopiedId] = useState(false);
  const accent = accentColor || metadata?.accentColor || "#f59e0b";
  const { carrier = "GLOBAL AIR CARGO", subtitle = "FREIGHT WAYBILL // EXPEDITE", weight = "2.45 KG", badge = "PRIORITY 1 // AIR" } = metadata || {};
  const { from = "JFK", fromCity = "NEW YORK, NY", to = "ORD-04", toCity = "CHICAGO O'HARE" } = metadata || {};
  const { service = "NEXT-DAY AIR", pieces = "1 OF 1", status = "SORT CLEARED", method = "DIRECT AIR" } = (metadata as any) || {};
  const { securityLabel = "IATA SECURE CARGO", compliance = "CLASS 9 // AUTO-SORT PASS", trackingLabel = "CARGO TRACKING:" } = (metadata as any) || {};
  const showSortMatrix = (metadata as any)?.showSortMatrix === true;
  const trackingId = metadata?.trackingId || value;

  const activePlane = airplaneIcon || metadata?.airplaneIcon || metadata?.routeIcon || (
    <Plane className="w-3.5 h-3.5 rotate-45" style={{ color: accent }} />
  );
  const activeHeaderIcon = headerIcon || metadata?.headerIcon || metadata?.icon || airplaneIcon || metadata?.airplaneIcon || (
    <Plane className="w-4 h-4 fill-black/20 rotate-45" />
  );

  const handleCopyId = () => {
    if (!trackingId) return;
    navigator.clipboard?.writeText(trackingId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div
      className={cn("relative w-full max-w-[360px] text-zinc-900 dark:text-zinc-100 font-mono select-none drop-shadow-2xl", className)}
      style={{ filter: `drop-shadow(0 20px 30px ${accent}20)` }}
    >
      {/* Top Section */}
      <div className="relative overflow-hidden rounded-t-2xl [--card-bg:#ffffff] dark:[--card-bg:#09090b]" style={TOP_NOTCH_STYLE}>
        <div className="absolute top-0 inset-x-0 h-px bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-[14px] w-px bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-[14px] w-px bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />

        <div
          className="h-1.5 w-full opacity-80"
          style={{ background: `repeating-linear-gradient(45deg, ${accent}, ${accent} 8px, #09090b 8px, #09090b 16px)` }}
        />

        {/* Carrier Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-black font-bold shadow-sm" style={{ backgroundColor: accent }}>
              {activeHeaderIcon}
            </div>
            <div>
              <div className="text-[11px] font-black tracking-wider uppercase leading-none text-zinc-900 dark:text-zinc-100">{carrier}</div>
              <div className="text-[9px] text-zinc-500 font-sans tracking-tight mt-0.5">{subtitle}</div>
            </div>
          </div>
          <div
            className="text-[9px] font-black px-2 py-0.5 rounded-md border tracking-wider uppercase font-mono shadow-sm"
            style={{ backgroundColor: `${accent}15`, color: accent, borderColor: `${accent}40` }}
          >
            {badge}
          </div>
        </div>

        {/* Route Section */}
        <div className="p-4 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[8.5px] font-bold text-zinc-400 tracking-wider">FROM</div>
                  <div className="text-xl font-black tracking-tight leading-none text-zinc-900 dark:text-zinc-50">{from}</div>
                  <div className="text-[8.5px] text-zinc-500 truncate max-w-[90px] mt-0.5">{fromCity}</div>
                </div>

                <div className="flex-1 flex flex-col items-center px-2">
                  <div className="flex items-center gap-1 w-full text-zinc-400">
                    <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
                    {activePlane}
                    <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
                  </div>
                  <span className="text-[7.5px] font-bold text-zinc-400 uppercase mt-0.5">{method}</span>
                </div>

                <div className="text-right">
                  <div className="text-[8.5px] font-bold text-zinc-400 tracking-wider">DESTINATION</div>
                  <div className="text-xl font-black tracking-tight leading-none" style={{ color: accent }}>{to}</div>
                  <div className="text-[8.5px] text-zinc-500 truncate max-w-[105px] mt-0.5">{toCity}</div>
                </div>
              </div>
            </div>

            {showSortMatrix && (
              <div className="pl-3 border-l border-zinc-200 dark:border-zinc-800/80 flex flex-col items-center shrink-0">
                <div className="p-1 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <BarcodeSVG value={trackingId} format="qr" size={44} showText={false} color="currentColor" />
                </div>
                <span className="text-[7px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 mt-1 uppercase">SORT 2D</span>
              </div>
            )}
          </div>
        </div>

        {/* Telemetry Strip - Clean divider below */}
        <div className="grid grid-cols-[1fr_1.2fr_0.9fr_1.3fr] divide-x divide-zinc-200 dark:divide-zinc-800/80 text-center py-2 px-3.5 bg-zinc-50/50 dark:bg-zinc-900/30 text-[9px]">
          <div className="px-1"><div className="text-[7.5px] text-zinc-400 uppercase">WEIGHT</div><div className="font-bold text-[10.5px] text-zinc-800 dark:text-zinc-200 mt-0.5">{weight}</div></div>
          <div className="px-1"><div className="text-[7.5px] text-zinc-400 uppercase">SERVICE</div><div className="font-bold text-[10.5px] text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">{service}</div></div>
          <div className="px-1"><div className="text-[7.5px] text-zinc-400 uppercase">PIECES</div><div className="font-bold text-[10.5px] text-zinc-800 dark:text-zinc-200 mt-0.5">{pieces}</div></div>
          <div className="px-1"><div className="text-[7.5px] text-zinc-400 uppercase">STATUS</div><div className="flex items-center justify-center gap-1 font-bold text-[9px] mt-0.5 text-emerald-600 dark:text-emerald-400 whitespace-nowrap"><span className="w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-500 animate-pulse" />{status}</div></div>
        </div>
      </div>

      {/* Ticket Notch Divider */}
      <TicketNotchDivider />

      {/* Bottom Section */}
      <div className="relative overflow-hidden rounded-b-2xl px-5 pt-3 pb-4 flex flex-col [--card-bg:#ffffff] dark:[--card-bg:#09090b]" style={BOTTOM_NOTCH_STYLE}>
        <div className="absolute left-0 top-[14px] bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />
        <div className="absolute right-0 top-[14px] bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-zinc-200 dark:bg-zinc-800 pointer-events-none" />

        {/* Tracking Header */}
        <div className="flex items-center justify-between text-[9.5px] mb-2 px-1">
          <span className="text-zinc-500 uppercase tracking-wider font-semibold">{trackingLabel}</span>
          <button
            type="button"
            onClick={handleCopyId}
            className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-bold hover:text-amber-500 dark:hover:text-amber-400 transition-colors cursor-pointer group"
          >
            <span>{trackingId}</span>
            {copiedId ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-zinc-400 group-hover:text-amber-500 transition-colors" />}
          </button>
        </div>

        {/* Recessed Thermal Scanning Surface */}
        <div className="relative p-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center">
          <div className="absolute top-1 left-1.5 text-[8px] text-zinc-400 select-none">+</div>
          <div className="absolute top-1 right-1.5 text-[8px] text-zinc-400 select-none">+</div>
          <div className="absolute bottom-1 left-1.5 text-[8px] text-zinc-400 select-none">+</div>
          <div className="absolute bottom-1 right-1.5 text-[8px] text-zinc-400 select-none">+</div>

          <BarcodeSVG
            value={value}
            format={format}
            height={56}
            size={size || 120}
            dotStyle={dotStyle}
            barWidth={1.8}
            color={color || "currentColor"}
            showText={true}
            copyable={true}
            downloadable={true}
          />
        </div>

        {/* Regulatory Footer */}
        <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800/80 text-[9px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-bold tracking-wider text-zinc-700 dark:text-zinc-300">{securityLabel}</span>
          </div>
          <div className="font-mono text-[8.5px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {compliance}
          </div>
        </div>
      </div>
    </div>
  );
}
