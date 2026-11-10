import React from "react";
import { ComponentDocData } from "./types";
import { BARCODE_EXAMPLES } from "@/components/showcases/barcode/constants";

export { BARCODE_EXAMPLES };

export const BARCODE_USAGE = `"use client";

import { Barcode } from "@/components/ui/barcode";

export default function BarcodeDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Barcode value="INTENSE-2026" format="code128" copyable downloadable />
    </div>
  );
}`;

export const barcodeDoc: ComponentDocData = {
  usageCode: BARCODE_USAGE,
  codeContent: BARCODE_USAGE,
  codes: BARCODE_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: BARCODE_EXAMPLES.map((ex) => ({
    id: ex.id,
    label: ex.label,
    icon: (
      <span role="img" aria-label={ex.label} className="inline-flex items-center justify-center select-none leading-none">
        {ex.emoji}
      </span>
    ),
  })),
  dependencies: [
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Barcode Props",
      props: [
        { prop: "value", type: "string", defaultValue: "-", description: "The dynamic string, tracking number, URL, or serial to encode." },
        { prop: "format", type: '"code128" | "qr" | "data-matrix" | "code39" | "ean13"', defaultValue: '"code128"', description: "Barcode standard (1D linear or 2D square matrix)." },
        { prop: "variant", type: '"classic" | "brand-card" | "boarding-pass" | "shipping-label" | "cyber-scan" | "retail-tag"', defaultValue: '"classic"', description: "Card archetype and visual presentation style." },
        { prop: "dotStyle", type: '"square" | "dots" | "rounded"', defaultValue: '"square"', description: "Geometry style for 2D matrix modules." },
        { prop: "centerIcon", type: "React.ReactNode", defaultValue: "-", description: "Optional icon or logo centered inside 2D QR matrix." },
        { prop: "barWidth", type: "number", defaultValue: "2", description: "Width multiplier in pixels for 1D modules." },
        { prop: "height", type: "number", defaultValue: "80", description: "Vertical bar height in pixels for 1D barcodes." },
        { prop: "size", type: "number", defaultValue: "140", description: "Square dimension for 2D matrix barcodes (QR code, Data Matrix)." },
        { prop: "color", type: "string", defaultValue: '"currentColor"', description: "Fill color for the barcode bars/dots." },
        { prop: "accentColor", type: "string", defaultValue: '"#6366f1"', description: "Custom accent color driving background ambient glow, 3D diamond shading, reticles, and hover effects." },
        { prop: "showShape", type: "boolean", defaultValue: "true", description: "Whether to render the shaded geometric background vector graphics." },
        { prop: "shape", type: '"diamond" | "none"', defaultValue: '"diamond"', description: "Geometric background archetype for card variants." },
        { prop: "background", type: "string", defaultValue: '"transparent"', description: "Background fill behind the barcode." },
        { prop: "showText", type: "boolean", defaultValue: "true", description: "Whether to render human-readable text below the barcode." },
        { prop: "copyable", type: "boolean", defaultValue: "false", description: "Shows a click-to-copy button to copy the encoded text." },
        { prop: "downloadable", type: "boolean", defaultValue: "false", description: "Shows a one-click button to download the barcode as an SVG vector file." },
        { prop: "metadata", type: "object", defaultValue: "{}", description: "Contextual data for card variants (flight, carrier, weight, price, etc.)." },
      ],
    },
  ],
};
