import { ProgressCustomProps } from "./types";

export function generateProgressCode(props: ProgressCustomProps): string {
  if (props.type === "circular") {
    return `"use client";

import { ProgressCircular } from "@/components/ui/progress";

export default function CircularProgressDemo() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <ProgressCircular value={${props.value}} label="Storage" unit="%" />
    </div>
  );
}`;
  }

  if (props.type === "semicircle") {
    return `"use client";

import { ProgressSemicircle } from "@/components/ui/progress";

export default function SemicircleGaugeDemo() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <ProgressSemicircle value={${props.value}} label="Throttle" />
    </div>
  );
}`;
  }

  if (props.type === "buffer") {
    return `"use client";

import { ProgressBuffer } from "@/components/ui/progress";

export default function BufferProgressDemo() {
  return (
    <div className="w-full max-w-sm p-6">
      <ProgressBuffer value={${props.value}} loaded={${props.loaded}} isLoading={${props.isLoading}} statusText="Buffering Track..." />
    </div>
  );
}`;
  }

  if (props.type === "shimmer" || props.variant === "shimmer") {
    return `"use client";

import { ProgressShimmer } from "@/components/ui/progress";

export default function ShimmerProgressDemo() {
  return (
    <div className="w-full max-w-sm p-6">
      <ProgressShimmer value={${props.value}} />
    </div>
  );
}`;
  }

  if (props.type === "capsule") {
    return `"use client";

import { ProgressCapsule } from "@/components/ui/progress";
import { CloudUpload } from "lucide-react";

export default function CapsuleProgressDemo() {
  return (
    <div className="w-full max-w-sm p-6">
      <ProgressCapsule value={${props.value}} label="Upload" icon={<CloudUpload className="w-4 h-4" />} />
    </div>
  );
}`;
  }

  const parts: string[] = [`value={${props.value}}`];
  if (props.size !== "md") parts.push(`size="${props.size}"`);
  if (props.variant !== "primary") parts.push(`variant="${props.variant}"`);
  if (props.fillColor) parts.push(`fillColor="${props.fillColor}"`);
  if (props.striped) parts.push("striped");
  if (props.animated) parts.push("animated");
  if (props.indeterminate) parts.push("indeterminate");
  if (props.showValue) parts.push("showValue");

  return `"use client";

import { Progress } from "@/components/ui/progress";

export default function ProgressDemo() {
  return (
    <div className="w-full max-w-sm p-6">
      <Progress ${parts.join(" ")} />
    </div>
  );
}`;
}
