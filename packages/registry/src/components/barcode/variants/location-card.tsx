"use client";

import React, { useState } from "react";
import { Check, Copy, Navigation2, Radio } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { EXTERNAL_LINKS } from "@/config/site";
import { BarcodeSVG } from "../barcode-svg";
import { BarcodeProps } from "../types";
import { GpsBeaconPin, LocationStreetGrid, LocationTrafficVehicles } from "@/assets/svg";

export { GpsBeaconPin, LocationStreetGrid, LocationTrafficVehicles } from "@/assets/svg";

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

  // Defaults aligned with Pinterest reference (Brooklyn GPS check-in)
  const title = metadata?.title || metadata?.place || "BROOKLYN";
  const subtitle = metadata?.subtitle || metadata?.address || "New York, NY";
  const coordinates = metadata?.coordinates || "40.6782° N, 73.9442° W";
  const badge = metadata?.badge || "GPS CHECK-IN";
  const accent = accentColor || color || metadata?.accentColor || metadata?.color || "#38bdf8";

  const defaultCenterIcon = <GpsBeaconPin accent={accent} size={36} />;

  const activeCenterIcon =
    centerIcon !== undefined
      ? centerIcon
      : metadata?.logo !== undefined
      ? metadata.logo
      : defaultCenterIcon;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(coordinates || value);
      setCopied(true);
      toast.success("Coordinates copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const target = coordinates || value;
      const url = target.startsWith("http")
        ? target
        : EXTERNAL_LINKS.getGoogleMapsUrl(target);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      style={
        {
          "--loc-accent": accent,
        } as React.CSSProperties
      }
      className={cn(
        "group/card relative w-full max-w-[310px] rounded-[32px] bg-gradient-to-b from-white via-zinc-50/90 to-zinc-100/70 dark:from-zinc-900/95 dark:via-zinc-950/98 dark:to-[#07080b] border border-zinc-200/90 dark:border-white/[0.08] text-zinc-900 dark:text-white p-5 flex flex-col items-center font-sans overflow-hidden transition-all duration-300 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08),0_0_30px_-8px_color-mix(in_srgb,var(--loc-accent)_20%,transparent)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.4),0_0_35px_-8px_color-mix(in_srgb,var(--loc-accent)_26%,transparent)] hover:shadow-[0_28px_70px_-12px_color-mix(in_srgb,var(--loc-accent)_38%,transparent)] hover:border-[color-mix(in_srgb,var(--loc-accent)_35%,transparent)] select-none",
        className
      )}
      {...props}
    >
      {/* Top Ambient Glow & Specular Line */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-36 blur-3xl pointer-events-none rounded-full opacity-25 dark:opacity-40"
        style={{ backgroundColor: "var(--loc-accent)" }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--loc-accent)] to-transparent opacity-40 dark:opacity-60" />

      {/* City Street Grid Background */}
      <LocationStreetGrid accent="var(--loc-accent)" />

      {/* Live City Traffic Layer: Dynamically Generated Tracks & Vehicles at z-[2] */}
      <LocationTrafficVehicles accent="var(--loc-accent)" />

      {/* Header Bar */}
      <div className="w-full flex items-center justify-between pb-1 relative z-10">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-xl border flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "color-mix(in srgb, var(--loc-accent) 12%, transparent)",
              borderColor: "color-mix(in srgb, var(--loc-accent) 28%, transparent)",
            }}
          >
            {headerIcon || <Radio className="w-3.5 h-3.5" style={{ color: "var(--loc-accent)" }} />}
          </div>
          <span className="text-[11px] font-mono tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold uppercase truncate">
            {badge}
          </span>
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase shrink-0 border"
          style={{
            borderColor: "color-mix(in srgb, var(--loc-accent) 35%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--loc-accent) 12%, transparent)",
            color: "var(--loc-accent)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shadow-xs"
            style={{ backgroundColor: "var(--loc-accent)" }}
          />
          ACTIVE LOCK
        </div>
      </div>

      {/* Viewfinder QR Scanner Stage */}
      <div className="relative my-3.5 p-4 rounded-2xl bg-white dark:bg-zinc-950/80 border border-zinc-200/90 dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] flex items-center justify-center group/stage z-10">
        {/* Viewfinder Corner Crosshairs */}
        <span
          className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 rounded-tl-sm pointer-events-none transition-colors"
          style={{ borderColor: "color-mix(in srgb, var(--loc-accent) 55%, transparent)" }}
        />
        <span
          className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm pointer-events-none transition-colors"
          style={{ borderColor: "color-mix(in srgb, var(--loc-accent) 55%, transparent)" }}
        />
        <span
          className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm pointer-events-none transition-colors"
          style={{ borderColor: "color-mix(in srgb, var(--loc-accent) 55%, transparent)" }}
        />
        <span
          className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 rounded-br-sm pointer-events-none transition-colors"
          style={{ borderColor: "color-mix(in srgb, var(--loc-accent) 55%, transparent)" }}
        />

        {/* Ambient Radial Backlight behind QR */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-10 dark:opacity-20 blur-xl"
          style={{
            background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
          }}
        />

        {/* Dynamic Vector QR Code with Centered Beacon Pin and its Localized Ripple */}
        <div className="relative z-10 text-zinc-900 dark:text-white">
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
      </div>

      {/* Bottom Info: Bold Uppercase Location & Coordinates (Direct Pinterest Match) */}
      <div className="w-full flex items-end justify-between gap-3 mt-1 relative z-10">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-extrabold tracking-wide text-zinc-900 dark:text-white uppercase truncate leading-tight">
            {title}
          </h3>
          <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 font-medium tracking-tight mt-0.5 truncate">
            {coordinates}
          </p>
          {subtitle && (
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Interactive Action Pill Buttons */}
        <div className="flex items-center gap-1.5 shrink-0 pb-0.5">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/90 dark:hover:bg-zinc-700 text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white border border-zinc-200 dark:border-white/10 font-medium text-[10px] transition-all active:scale-95 shadow-2xs cursor-pointer"
            title="Copy Coordinates"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-zinc-400" />
            )}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            type="button"
            onClick={handleOpenMaps}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-zinc-950 font-semibold text-[10px] transition-all active:scale-95 shadow-sm cursor-pointer"
            style={{ backgroundColor: "var(--loc-accent)" }}
            title="Open in Maps"
          >
            <Navigation2 className="w-3 h-3 fill-current" />
            <span>Maps</span>
          </button>
        </div>
      </div>

    </div>
  );
}
