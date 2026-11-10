import { BarcodeCustomProps } from "./types";

export function generateBarcodeCode(props: BarcodeCustomProps): string {
  const parts: string[] = [`value="${props.value || "INTENSE-2026"}"`];

  if (props.format !== "code128") {
    parts.push(`format="${props.format}"`);
  }

  if (props.variant !== "classic") {
    parts.push(`variant="${props.variant}"`);
  }

  if (props.dotStyle && props.dotStyle !== "square") {
    parts.push(`dotStyle="${props.dotStyle}"`);
  }

  if (props.barWidth !== 2) {
    parts.push(`barWidth={${props.barWidth}}`);
  }

  if (props.height !== 80) {
    parts.push(`height={${props.height}}`);
  }

  if (!props.showText) {
    parts.push(`showText={false}`);
  }

  if (props.copyable) {
    parts.push(`copyable`);
  }

  if (props.downloadable) {
    parts.push(`downloadable`);
  }

  return `"use client";

import { Barcode } from "@/components/ui/barcode";

export default function BarcodeDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Barcode ${parts.join(" ")} />
    </div>
  );
}`;
}
