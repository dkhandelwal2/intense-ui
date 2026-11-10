"use client";

import React from "react";
import { Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarcodeSVG } from "../barcode-svg";
import { BarcodeProps } from "../types";

export function ShippingLabelBarcode({
  value,
  format = "code128",
  dotStyle,
  size,
  color,
  metadata,
  className,
}: BarcodeProps) {
  const carrier = metadata?.carrier || "EXPRESS LOGISTICS";
  const weight = metadata?.weight || "2.45 KG";
  const trackingId = metadata?.trackingId || value;
  const badge = metadata?.badge || "PRIORITY 1";

  return (
    <div
      className={cn(
        "relative w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl overflow-hidden font-mono",
        className
      )}
    >
      {/* Carrier Top Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span className="text-xs font-bold tracking-wider uppercase text-zinc-800 dark:text-zinc-200">
            {carrier}
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
          {badge}
        </span>
      </div>

      {/* Routing & Address Meta */}
      <div className="p-4 grid grid-cols-2 gap-3 border-b border-zinc-200 dark:border-zinc-800/80 text-xs">
        <div className="border-r border-zinc-200 dark:border-zinc-800/80 pr-2">
          <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Package className="w-3 h-3 text-zinc-400" /> Destination Hub
          </div>
          <div className="font-bold text-sm text-zinc-800 dark:text-zinc-200">US-ORD-04</div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 font-sans">Chicago Central Depot</div>
        </div>
        <div className="pl-2">
          <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">
            Package Weight
          </div>
          <div className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{weight}</div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">ZONE 3 AIR</div>
        </div>
      </div>

      {/* Tracking ID Header */}
      <div className="px-5 pt-3 text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
        <span>TRACKING NO:</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-bold">{trackingId}</span>
      </div>

      {/* Main Barcode Display */}
      <div className="px-5 py-4 flex flex-col items-center justify-center">
        <BarcodeSVG
          value={value}
          format={format}
          height={65}
          size={size || 120}
          dotStyle={dotStyle}
          barWidth={1.8}
          color={color || "currentColor"}
          showText={true}
          copyable={true}
          downloadable={true}
        />
      </div>

      {/* Bottom Barcode Security Footer */}
      <div className="px-5 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-[9px] text-zinc-500 flex items-center justify-between">
        <span>GS1 COMPLIANT</span>
        <span>AUTO-SORT VERIFIED</span>
      </div>
    </div>
  );
}
