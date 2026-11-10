"use client";

import React from "react";
import { Layers, Sliders, Hash } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { BarcodeCustomProps, DEFAULT_BARCODE_PROPS } from "@/components/showcases/barcode/types";
import { BarcodeFormat, BarcodeVariant } from "@/components/ui/barcode";

export interface BarcodePlaygroundStudioProps {
  customProps: BarcodeCustomProps;
  onChange: React.Dispatch<React.SetStateAction<BarcodeCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const BARCODE_VARIANTS: { id: BarcodeVariant; label: string; spec: string; emoji: string }[] = [
  { id: "classic", label: "Classic Minimal", spec: "Crisp vector monochrome card", emoji: "🏷️" },
  { id: "brand-card", label: "QR Brand Card", spec: "Logo center badge with dot matrix", emoji: "💳" },
  { id: "boarding-pass", label: "Boarding Pass", spec: "Aviation pass with tear notches", emoji: "✈️" },
  { id: "shipping-label", label: "Shipping Label", spec: "Logistics priority warehouse card", emoji: "📦" },
  { id: "cyber-scan", label: "Cyber Scanner", spec: "Sci-fi HUD with animated laser", emoji: "🎯" },
  { id: "retail-tag", label: "Retail Hangtag", spec: "Boutique price tag with eyelet", emoji: "🏷️" },
];

const BARCODE_FORMATS: { id: BarcodeFormat; label: string; spec: string }[] = [
  { id: "code128", label: "Code 128 (Auto)", spec: "Alphanumeric 1D linear barcode" },
  { id: "qr", label: "QR Code (2D Matrix)", spec: "Square 2D code with error correction" },
  { id: "data-matrix", label: "Data Matrix", spec: "ECC 200 industrial square code" },
  { id: "code39", label: "Code 39", spec: "Industrial inventory 1D standard" },
  { id: "ean13", label: "EAN-13 / UPC-A", spec: "GS1 retail point-of-sale barcode" },
];

const SCALE_OPTIONS = [
  { scale: 1.5, height: 60, dot: "square" as const, label: "Compact (1.5x)", spec: "Square modules" },
  { scale: 2, height: 80, dot: "dots" as const, label: "Smooth Dots (2.0x)", spec: "Circular dot matrix" },
  { scale: 2.5, height: 100, dot: "rounded" as const, label: "Rounded (2.5x)", spec: "Soft curved modules" },
];

export function BarcodePlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: BarcodePlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "variant",
      titleLine1: "Barcode Card &",
      titleLine2: "archetype",
      categoryTag: "01 / 03",
      colorGradient: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      icon: <Layers className="w-3.5 h-3.5" />,
      headerTitle: "Card Archetype",
      headerSubtitle: "tickets, cargo, cyber, or retail",
      headerEmoji: "🏷️",
      rows: BARCODE_VARIANTS.map((v) => ({
        id: `var-${v.id}`,
        label: v.label,
        spec: v.spec,
        thumbnail: <span className="text-sm select-none">{v.emoji}</span>,
        isSelected: customProps.variant === v.id,
        onSelect: () => onChange((p) => ({ ...p, variant: v.id })),
      })),
    },
    {
      id: "format",
      titleLine1: "Symbology &",
      titleLine2: "standard",
      categoryTag: "02 / 03",
      colorGradient: "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]",
      icon: <Hash className="w-3.5 h-3.5" />,
      headerTitle: "Barcode Standard",
      headerSubtitle: "1D linear or 2D square matrix",
      headerEmoji: "🔢",
      rows: BARCODE_FORMATS.map((f) => ({
        id: `fmt-${f.id}`,
        label: f.label,
        spec: f.spec,
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">
            {f.id}
          </span>
        ),
        isSelected: customProps.format === f.id,
        onSelect: () => {
          let nextValue = customProps.value;
          if (f.id === "ean13" && !/^\d{12,13}$/.test(nextValue)) {
            nextValue = "9780201379624";
          } else if (f.id === "qr" && nextValue === "INTENSE-2026") {
            nextValue = "https://intenseui.dev";
          }
          onChange((p) => ({ ...p, format: f.id, value: nextValue }));
        },
      })),
    },
    {
      id: "dimensions",
      titleLine1: "Bar Scale &",
      titleLine2: "dot style",
      categoryTag: "03 / 03",
      colorGradient: "bg-gradient-to-br from-[#F59E0B] via-[#D97706] to-[#B45309]",
      icon: <Sliders className="w-3.5 h-3.5" />,
      headerTitle: "Scale & Styling",
      headerSubtitle: "module scale and dot geometry",
      headerEmoji: "📐",
      rows: SCALE_OPTIONS.map((s) => ({
        id: `scale-${s.scale}`,
        label: s.label,
        spec: s.spec,
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {s.scale}x
          </span>
        ),
        isSelected: customProps.barWidth === s.scale,
        onSelect: () => onChange((p) => ({ ...p, barWidth: s.scale, height: s.height, dotStyle: s.dot })),
      })),
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      className={className}
      hidePreview={hidePreview}
      onReset={() => onChange(DEFAULT_BARCODE_PROPS)}
      onViewCode={onViewCode}
    />
  );
}
