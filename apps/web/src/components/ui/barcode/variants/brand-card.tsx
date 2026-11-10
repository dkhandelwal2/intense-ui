"use client";

import React, { useState } from "react";
import { Check, CheckCircle2, Copy, QrCode, Radio, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BarcodeSVG } from "../barcode-svg";
import { BarcodeProps } from "../types";

export interface BrandCardBarcodeProps extends BarcodeProps {
  accentColor?: string;
  showShape?: boolean;
  shape?: "diamond" | "none";
}

export function BrandCardBarcode({
  value,
  format = "qr",
  dotStyle = "dots",
  size = 145,
  color,
  accentColor,
  showShape = true,
  shape = "diamond",
  copyable = true,
  downloadable = true,
  centerIcon,
  headerIcon,
  metadata,
  className,
  ...props
}: BrandCardBarcodeProps) {
  const [copied, setCopied] = useState(false);

  const title = metadata?.title || "Intense UI";
  const subtitle = metadata?.subtitle || "Scan to explore components";
  const accent = accentColor || color || (metadata as any)?.accentColor || (metadata as any)?.color || "#6366f1";
  const hasDiamond = showShape && (shape === "diamond" || (metadata as any)?.shape !== "none");

  const defaultCenterIcon = <Sparkles stroke={accent} fill={accent} fillOpacity={0.2} />;
  const activeCenterIcon = centerIcon !== undefined ? centerIcon : metadata?.logo !== undefined ? metadata.logo : defaultCenterIcon;

  const activeHeaderIcon = headerIcon !== undefined ? headerIcon : metadata?.icon !== undefined ? metadata.icon : metadata?.avatar ? (
    <img src={metadata.avatar} alt="Brand Avatar" className="w-full h-full object-cover rounded-xl" />
  ) : (
    <Sparkles className="w-4 h-4" style={{ color: accent }} />
  );

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Brand pass link copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const domain = value.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

  return (
    <div
      style={{
        ["--brand-accent" as any]: accent,
        boxShadow: "0 20px 50px -15px rgba(0,0,0,0.14), 0 0 35px -10px color-mix(in srgb, var(--brand-accent) 26%, transparent)",
      }}
      className={cn(
        "group/card relative w-full max-w-[320px] rounded-[28px] bg-gradient-to-b from-white via-zinc-50/80 to-zinc-100/50 dark:from-zinc-900/95 dark:via-zinc-950/98 dark:to-[#09090b] border border-zinc-200/90 dark:border-white/[0.08] p-5 flex flex-col items-center font-sans overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_-12px_color-mix(in_srgb,var(--brand-accent)_38%,transparent)] hover:border-[color-mix(in_srgb,var(--brand-accent)_35%,transparent)] select-none",
        className
      )}
      {...props}
    >
      {/* Top Ambient Glow & Specular Line */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-52 h-36 blur-3xl pointer-events-none rounded-full opacity-60 dark:opacity-40" style={{ backgroundColor: "var(--brand-accent)" }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-accent)] to-transparent opacity-60" />

      {/* 3D Faceted Diamond Shaded Background Shape */}
      {hasDiamond && (
        <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 ease-out group-hover/card:scale-105">
          <defs>
            <linearGradient id="facetTL" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.45" /><stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0.12" /></linearGradient>
            <linearGradient id="facetTR" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.3" /><stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0.06" /></linearGradient>
            <linearGradient id="facetBL" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.22" /><stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0.04" /></linearGradient>
            <linearGradient id="facetBR" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.16" /><stop offset="100%" stopColor="transparent" stopOpacity="0" /></linearGradient>
            <linearGradient id="facetEdge" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" /><stop offset="100%" stopColor="transparent" stopOpacity="0" /></linearGradient>
          </defs>

          {/* Primary 3D Octahedral Diamond (Top Right) */}
          <g opacity="0.65" className="dark:opacity-55 mix-blend-screen dark:mix-blend-lighten">
            <polygon points="245,18 175,82 245,108" fill="url(#facetTL)" />
            <polygon points="245,18 245,108 312,76" fill="url(#facetTR)" />
            <polygon points="245,108 175,82 245,188" fill="url(#facetBL)" />
            <polygon points="245,108 245,188 312,76" fill="url(#facetBR)" />
            <line x1="245" y1="18" x2="245" y2="108" stroke="url(#facetEdge)" strokeWidth="1.5" />
            <line x1="245" y1="108" x2="245" y2="188" stroke="var(--brand-accent)" strokeWidth="1.2" strokeOpacity="0.5" />
            <line x1="175" y1="82" x2="245" y2="108" stroke="url(#facetEdge)" strokeWidth="1.2" />
            <line x1="245" y1="108" x2="312" y2="76" stroke="var(--brand-accent)" strokeWidth="1" strokeOpacity="0.4" />
            <polygon points="245,18 312,76 245,188 175,82" stroke="var(--brand-accent)" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 4" />
          </g>

          {/* Secondary 3D Diamond Accent (Lower Left) */}
          <g opacity="0.45" className="dark:opacity-35 mix-blend-screen dark:mix-blend-lighten">
            <polygon points="45,260 12,292 45,306" fill="url(#facetTL)" />
            <polygon points="45,260 45,306 78,288" fill="url(#facetTR)" />
            <polygon points="45,306 12,292 45,348" fill="url(#facetBL)" />
            <polygon points="45,306 45,348 78,288" fill="url(#facetBR)" />
            <line x1="45" y1="260" x2="45" y2="306" stroke="url(#facetEdge)" strokeWidth="1" />
            <polygon points="45,260 78,288 45,348 12,292" stroke="var(--brand-accent)" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 3" />
          </g>
        </svg>
      )}

      {/* Brand Header */}
      <div className="w-full flex items-center justify-between pb-1 relative z-10">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-9 h-9 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs"
            style={{
              borderColor: "color-mix(in srgb, var(--brand-accent) 32%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--brand-accent) 14%, transparent)",
            }}
          >
            {activeHeaderIcon}
          </div>
          <div className="truncate">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold tracking-tight text-zinc-900 dark:text-zinc-100 truncate">{title}</span>
              <CheckCircle2
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: "var(--brand-accent)", fill: "color-mix(in srgb, var(--brand-accent) 15%, transparent)" }}
              />
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate font-medium">{subtitle}</div>
          </div>
        </div>
      </div>

      {/* Viewfinder QR Scanner Stage */}
      <div className="relative my-3.5 p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/[0.08] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] flex items-center justify-center group/stage z-10">
        <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 rounded-tl-sm pointer-events-none transition-colors" style={{ borderColor: "color-mix(in srgb, var(--brand-accent) 50%, transparent)" }} />
        <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm pointer-events-none transition-colors" style={{ borderColor: "color-mix(in srgb, var(--brand-accent) 50%, transparent)" }} />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm pointer-events-none transition-colors" style={{ borderColor: "color-mix(in srgb, var(--brand-accent) 50%, transparent)" }} />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 rounded-br-sm pointer-events-none transition-colors" style={{ borderColor: "color-mix(in srgb, var(--brand-accent) 50%, transparent)" }} />

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

      {/* Interactive Link Strip */}
      <div className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-white/[0.06] text-[11px] relative z-10">
        <div className="flex items-center gap-1.5 truncate text-zinc-600 dark:text-zinc-400 font-mono text-[10px]">
          <Radio className="w-3 h-3 animate-pulse shrink-0" style={{ color: "var(--brand-accent)" }} />
          <span className="truncate">{domain || value}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700 font-medium text-[10px] transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          title="Copy link"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Bottom Footer Spec */}
      <div className="w-full mt-1 pt-2.5 border-t border-zinc-200/70 dark:border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400 relative z-10">
        <span className="flex items-center gap-1">
          <QrCode className="w-3 h-3 text-zinc-400" />
          High-Res 2D Vector
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold" style={{ color: "var(--brand-accent)" }}>
          Tap or Scan
        </span>
      </div>
    </div>
  );
}
