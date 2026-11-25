import type { SignaturePadCustomProps } from "./types";

export function generateSignaturePadCode(props: SignaturePadCustomProps): string {
  const parts: string[] = [];

  if (props.buttonLabel !== "Start Signing") {
    parts.push(`buttonLabel="${props.buttonLabel}"`);
  }
  if (props.finishLabel !== "Finish Signing") {
    parts.push(`finishLabel="${props.finishLabel}"`);
  }
  if (props.title !== "Sign") {
    parts.push(`title="${props.title}"`);
  }
  if (props.width !== 320) {
    parts.push(`width={${props.width}}`);
  }
  if (props.height !== 380) {
    parts.push(`height={${props.height}}`);
  }
  if (props.strokeWidth !== 2.5) {
    parts.push(`strokeWidth={${props.strokeWidth}}`);
  }
  if (props.strokeColor !== "var(--theme-primary)") {
    parts.push(`strokeColor="${props.strokeColor}"`);
  }
  if (!props.showClear) {
    parts.push(`showClear={false}`);
  }
  if (!props.showClose) {
    parts.push(`showClose={false}`);
  }
  if (props.disabled) {
    parts.push(`disabled`);
  }

  const propsStr = parts.length > 0 ? " " + parts.join(" ") : "";

  return `"use client";

import { SignaturePad, type SignatureResult } from "@/components/ui/signature-pad";

export default function SignaturePadDemo() {
  const handleSign = (result: SignatureResult) => {
    console.log("Captured signature:", result.dataUrl);
  };

  return (
    <div className="flex items-center justify-center p-8">
      <SignaturePad${propsStr} onSign={handleSign} />
    </div>
  );
}`;
}
