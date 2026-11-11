"use client";

import React, { useState } from "react";
import { Check, Copy, ExternalLink, LocateFixed, MapPin, Navigation2, QrCode } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BarcodeSVG } from "../barcode-svg";
import { BarcodeProps } from "../types";

export interface LocationCardBarcodeProps extends BarcodeProps {
  accentColor?: string;
}

export function LocationCardBarcode({
  value,
  format = "qr",
  dotStyle = "dots",
  size = 145,
  color,
  accentColor,
  copyable = true,
  downloadable = true,
  centerIcon,
  headerIcon,
  metadata,
  className,
  ...props
}: LocationCardBarcodeProps) {
  const [copied, setCopied] = useState(false);

  const title = metadata?.title || (metadata as any)?.place || "Bethesda Terrace";
  const subtitle = metadata?.subtitle || (metadata as any)?.address || "Central Park, New York, NY";
  const coordinates = (metadata as any)?.coordinates || "40.7739° N, 73.9712° W";
  const badge = metadata?.badge || "GEO LOCK";
  const accent = accentColor || color || (metadata as any)?.accentColor || (metadata as any)?.color || "#10b981";

  const defaultCenterIcon = <Navigation2 className="fill-current" style={{ color: accent }} strokeWidth={1.5} />;
  const activeCenterIcon = centerIcon !== undefined ? centerIcon : metadata?.logo !== undefined ? metadata.logo : defaultCenterIcon;

  const activeHeaderIcon = headerIcon !== undefined ? headerIcon : metadata?.icon !== undefined ? metadata.icon : (
    <MapPin className="w-4 h-4" style={{ color: accent }} />
  );

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Location coordinates copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = value.startsWith("http") ? value : `https://maps.google.com/?q=${encodeURIComponent(value)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      style={{
        ["--loc-accent" as any]: accent,
        boxShadow: "0 20px 50px -15px rgba(0,0,0,0.14), 0 0 35px -10px color-mix(in srgb, var(--loc-accent) 26%, transparent)",
      }}
      className={cn(
        "group/card relative w-full max-w-[320px] rounded-[28px] bg-gradient-to-b from-white via-zinc-50/80 to-zinc-100/50 dark:from-zinc-900/95 dark:via-zinc-950/98 dark:to-[#09090b] border border-zinc-200/90 dark:border-white/[0.08] p-5 flex flex-col items-center font-sans overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_-12px_color-mix(in_srgb,var(--loc-accent)_38%,transparent)] hover:border-[color-mix(in_srgb,var(--loc-accent)_35%,transparent)] select-none",
        className
      )}
      {...props}
    >
      {/* Top Ambient Glow & Specular Line */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-52 h-36 blur-3xl pointer-events-none rounded-full opacity-60 dark:opacity-40" style={{ backgroundColor: "var(--loc-accent)" }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--loc-accent)] to-transparent opacity-60" />

      {/* Radar Coordinate Grid Background */}
      <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 ease-out group-hover/card:scale-105 opacity-35 dark:opacity-25">
        <circle cx="160" cy="180" r="140" stroke="var(--loc-accent)" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.3" />
        <circle cx="160" cy="180" r="95" stroke="var(--loc-accent)" strokeWidth="0.8" opacity="0.4" />
        <circle cx="160" cy="180" r="50" stroke="var(--loc-accent)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.3" />
        <line x1="20" y1="180" x2="300" y2="180" stroke="var(--loc-accent)" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.25" />
        <line x1="160" y1="40" x2="160" y2="320" stroke="var(--loc-accent)" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.25" />
        <path d="M160 180 L290 120 A140 140 0 0 0 250 80 Z" fill="url(#radarSweep)" opacity="0.4" />
        <defs>
          <radialGradient id="radarSweep" cx="0%" cy="100%" r="100%">
            <stop offset="0%" stopColor="var(--loc-accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--loc-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Location Header */}
      <div className="w-full flex items-center justify-between pb-1 relative z-10">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-9 h-9 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs"
            style={{
              borderColor: "color-mix(in srgb, var(--loc-accent) 32%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--loc-accent) 14%, transparent)",
            }}
          >
            {activeHeaderIcon}
          </div>
          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-tight text-zinc-900 dark:text-zinc-100 truncate">{title}</span>
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate font-medium">{subtitle}</div>
          </div>
        </div>
        <div
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase shrink-0 border"
          style={{
            borderColor: "color-mix(in srgb, var(--loc-accent) 35%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--loc-accent) 12%, transparent)",
            color: "var(--loc-accent)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--loc-accent)" }} />
          {badge}
        </div>
      </div>

      {/* Viewfinder QR Scanner Stage */}
      <div className="relative my-3.5 p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/[0.08] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] flex items-center justify-center group/stage z-10">
        <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 rounded-tl-sm pointer-events-none transition-colors" style={{ borderColor: "color-mix(in srgb, var(--loc-accent) 50%, transparent)" }} />
        <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm pointer-events-none transition-colors" style={{ borderColor: "color-mix(in srgb, var(--loc-accent) 50%, transparent)" }} />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm pointer-events-none transition-colors" style={{ borderColor: "color-mix(in srgb, var(--loc-accent) 50%, transparent)" }} />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 rounded-br-sm pointer-events-none transition-colors" style={{ borderColor: "color-mix(in srgb, var(--loc-accent) 50%, transparent)" }} />

        <BarcodeSVG
          value={value}
          format={format}
          size={size}
          dotStyle={dotStyle}
          color={color || "currentColor"}
          centerIcon={activeCenterIcon}
          showText={false}
          copyable={copyable}
          downloadable={downloadable}
        />
      </div>

      {/* Interactive Coordinates / Actions Strip */}
      <div className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-white/[0.06] text-[11px] relative z-10">
        <div className="flex items-center gap-1.5 truncate text-zinc-600 dark:text-zinc-400 font-mono text-[10px]">
          <LocateFixed className="w-3 h-3 animate-pulse shrink-0" style={{ color: "var(--loc-accent)" }} />
          <span className="truncate">{coordinates}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700 font-medium text-[10px] transition-all active:scale-95 shadow-2xs cursor-pointer"
            title="Copy Coordinates / Link"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            type="button"
            onClick={handleOpenMaps}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-white font-medium text-[10px] transition-all active:scale-95 shadow-2xs cursor-pointer"
            style={{ backgroundColor: "var(--loc-accent)" }}
            title="Open in Maps"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Maps</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer Spec */}
      <div className="w-full mt-1 pt-2.5 border-t border-zinc-200/70 dark:border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400 relative z-10">
        <span className="flex items-center gap-1">
          <QrCode className="w-3 h-3 text-zinc-400" />
          WGS84 • GPS Check-in
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold" style={{ color: "var(--loc-accent)" }}>
          Scan to Navigate
        </span>
      </div>
    </div>
  );
}
