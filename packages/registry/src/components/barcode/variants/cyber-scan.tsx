"use client";

import React, { useState } from "react";
import { Crosshair, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarcodeSVG } from "../barcode-svg";
import { BarcodeProps } from "../types";

export function CyberScanBarcode({
  value,
  format = "code128",
  dotStyle,
  size,
  color,
  accentColor,
  headerIcon,
  copyable = false,
  downloadable = false,
  metadata,
  className,
}: BarcodeProps) {
  const [isScanning, setIsScanning] = useState(true);
  const title = metadata?.title || "CYBER_ID // 0x8F9";
  const barColor = color || metadata?.color || "#34d399";

  const activeHeaderIcon = headerIcon || metadata?.headerIcon || metadata?.icon || (
    <Crosshair className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
  );

  const scanningText = metadata?.scanningLabel || metadata?.status || "SCANNING";
  const standbyText = metadata?.standbyLabel || "STANDBY";

  const freq = metadata?.frequency || metadata?.freq || "915.00 MHz";
  const freqLabel = metadata?.frequencyLabel !== undefined ? metadata.frequencyLabel : (freq.startsWith("FREQ") ? "" : "FREQ: ");

  const lock = metadata?.opticalLock || metadata?.lockStatus || "TRUE";
  const lockLabel = metadata?.opticalLockLabel !== undefined ? metadata.opticalLockLabel : (lock.startsWith("OPTICAL") ? "" : "OPTICAL_LOCK: ");

  return (
    <div
      className={cn(
        "relative w-full max-w-sm rounded-2xl bg-zinc-950 border border-emerald-500/40 p-5 shadow-xl dark:shadow-[0_0_25px_rgba(16,185,129,0.15)] font-mono text-zinc-100 overflow-hidden",
        className
      )}
    >
      {/* Sci-Fi HUD Corner Brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />

      {/* Cyber Header */}
      <div className="flex items-center justify-between mb-4 border-b border-emerald-500/20 pb-2.5">
        <div className="flex items-center gap-2">
          {activeHeaderIcon}
          <span className="text-xs font-bold tracking-wider text-emerald-400">
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsScanning(!isScanning)}
          className={cn(
            "flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold border transition-colors cursor-pointer",
            isScanning
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-zinc-800 text-zinc-400 border-zinc-700"
          )}
        >
          <Radio className={cn("w-2.5 h-2.5", isScanning && "animate-pulse")} />
          {isScanning ? scanningText : standbyText}
        </button>
      </div>

      {/* Barcode Frame with Animated Laser Scanline */}
      <div className="relative p-3 rounded-xl bg-black/80 border border-emerald-500/20 flex flex-col items-center justify-center overflow-hidden">
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-laser-sweep z-20 pointer-events-none" />
        )}

        <BarcodeSVG
          value={value}
          format={format}
          height={65}
          size={size || 130}
          dotStyle={dotStyle}
          barWidth={1.8}
          color={barColor}
          textColor={barColor}
          showText={true}
          copyable={copyable}
          downloadable={downloadable}
        />
      </div>

      {/* Bottom Status Ticker */}
      <div className="mt-3 flex items-center justify-between text-[9px] text-emerald-400/80">
        <span>{freqLabel}{freq}</span>
        <span>{lockLabel}{lock}</span>
      </div>
    </div>
  );
}
