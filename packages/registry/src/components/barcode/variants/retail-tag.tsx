"use client";

import React from "react";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarcodeSVG } from "../barcode-svg";
import { BarcodeProps } from "../types";

export function RetailTagBarcode({
  value,
  format = "ean13",
  dotStyle,
  size,
  color,
  metadata,
  className,
}: BarcodeProps) {
  const title = metadata?.title || "INTENSE STUDIO";
  const subtitle = metadata?.subtitle || "OVERSIZED HOODIE // BLK";
  const price = metadata?.price || "$185.00";

  return (
    <div
      className={cn(
        "relative w-full max-w-[280px] rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl p-5 flex flex-col items-center font-sans overflow-hidden",
        className
      )}
    >
      {/* Top Metallic Eyelet Ring Cutout for String Hangtag */}
      <div className="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-900 shadow-inner flex items-center justify-center mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-background border border-zinc-200 dark:border-zinc-800" />
      </div>

      {/* Brand & Item Heading */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-xs uppercase tracking-widest font-semibold">
          <Tag className="w-3 h-3 text-rose-500 dark:text-rose-400" /> {title}
        </div>
        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-mono tracking-tight">
          {subtitle}
        </div>
      </div>

      {/* Price Badge */}
      <div className="w-full py-2 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center mb-5">
        <div className="text-[9px] font-mono text-zinc-500 uppercase">Suggested Retail</div>
        <div className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">{price}</div>
      </div>

      {/* Barcode */}
      <div className="w-full flex flex-col items-center justify-center">
        <BarcodeSVG
          value={value}
          format={format}
          height={60}
          size={size || 120}
          dotStyle={dotStyle}
          barWidth={1.8}
          color={color || "currentColor"}
          showText={true}
          copyable={true}
          downloadable={true}
        />
      </div>

      {/* Bottom Serial */}
      <div className="mt-3 text-[9px] font-mono text-zinc-400 dark:text-zinc-500">
        SKU: INT-2026-FW
      </div>
    </div>
  );
}
