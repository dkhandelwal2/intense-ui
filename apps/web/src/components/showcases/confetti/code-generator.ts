import { ConfettiCustomProps } from "./types";

export function generateConfettiCode(props: ConfettiCustomProps): string {
  const isBasic = props.variant === "basic";
  const parts: string[] = [];

  if (!isBasic) {
    parts.push(`variant="${props.variant}"`);
  }

  if (props.particleCount !== 80 || props.spread !== 50 || props.scalar !== 1) {
    const opts: string[] = [];
    if (props.particleCount !== 80) opts.push(`particleCount: ${props.particleCount}`);
    if (props.spread !== 80) opts.push(`spread: ${props.spread}`);
    if (props.scalar !== 1) opts.push(`scalar: ${props.scalar}`);
    parts.push(`options={{ ${opts.join(", ")} }}`);
  }

  const propsStr = parts.length > 0 ? ` ${parts.join(" ")}` : "";

  return `"use client";

import { ConfettiButton } from "@/components/ui/confetti";

export default function ConfettiDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <ConfettiButton${propsStr}>
        Trigger Confetti 🎉
      </ConfettiButton>
    </div>
  );
}`;
}
