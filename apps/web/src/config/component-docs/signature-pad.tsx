import React from "react";
import type { ComponentDocData } from "./types";
import { SIGNATURE_PAD_EXAMPLES } from "@/components/showcases/signature-pad/constants";

export { SIGNATURE_PAD_EXAMPLES };

export const SIGNATURE_PAD_USAGE = `"use client";

import { SignaturePad, type SignatureResult } from "@/components/ui/signature-pad";

export default function SignaturePadDemo() {
  const handleSign = (result: SignatureResult) => {
    console.log("Captured DataURL:", result.dataUrl);
    console.log("Captured SVG:", result.svg);
  };

  return (
    <div className="flex items-center justify-center p-8">
      <SignaturePad onSign={handleSign} />
    </div>
  );
}`;

export const signaturePadDoc: ComponentDocData = {
  usageCode: SIGNATURE_PAD_USAGE,
  codeContent: SIGNATURE_PAD_USAGE,
  codes: SIGNATURE_PAD_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: SIGNATURE_PAD_EXAMPLES.map((ex) => ({
    id: ex.id,
    label: ex.label,
    icon: (
      <span role="img" aria-label={ex.label} className="inline-flex items-center justify-center select-none leading-none">
        {ex.emoji}
      </span>
    ),
  })),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "lucide-react", command: "npm install lucide-react" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Signature Pad Props",
      props: [
        { prop: "onSign", type: "(result: SignatureResult) => void", defaultValue: "-", description: "Callback invoked when signature is finished, providing dataUrl, SVG string, and strokes array." },
        { prop: "onClear", type: "() => void", defaultValue: "-", description: "Callback fired when the signature canvas is cleared via the reset button." },
        { prop: "onClose", type: "() => void", defaultValue: "-", description: "Callback fired when the close badge is clicked." },
        { prop: "onExpandChange", type: "(isExpanded: boolean) => void", defaultValue: "-", description: "Callback fired when the signature pad expands or collapses." },
        { prop: "buttonLabel", type: "string", defaultValue: '"Start Signing"', description: "Label text displayed inside the collapsed capsule button." },
        { prop: "finishLabel", type: "string", defaultValue: '"Finish Signing"', description: "Label text on the action button at the bottom of the expanded pad." },
        { prop: "title", type: "string", defaultValue: '"Sign"', description: "Title displayed at the top center of the expanded card." },
        { prop: "width", type: "number", defaultValue: "320", description: "Width in pixels of the expanded signature pad card." },
        { prop: "height", type: "number", defaultValue: "380", description: "Total height in pixels of the expanded signature pad card." },
        { prop: "strokeColor", type: "string", defaultValue: '"var(--theme-primary)"', description: "Hex or CSS color string for drawing strokes." },
        { prop: "strokeWidth", type: "number", defaultValue: "2.5", description: "Thickness of the ink stroke in pixels." },
        { prop: "initialExpanded", type: "boolean", defaultValue: "false", description: "Whether to initialize directly in expanded drawing mode." },
        { prop: "showClear", type: "boolean", defaultValue: "true", description: "Whether to show the reset / clear button in the top left header." },
        { prop: "showClose", type: "boolean", defaultValue: "true", description: "Whether to show the close '✕' badge in the top right header." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and dims the control." },
      ],
    },
  ],
};
