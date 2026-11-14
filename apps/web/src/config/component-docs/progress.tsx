import React from "react";
import { ComponentDocData } from "./types";
import { PROGRESS_EXAMPLES } from "@/components/showcases/progress/constants";

export const PROGRESS_USAGE = `"use client";

import { useState } from "react";
import {
  Progress,
  ProgressCircular,
  ProgressSemicircle,
  ProgressBuffer,
  ProgressShimmer,
  ProgressCapsule,
} from "@/components/ui/progress";
import { CloudUpload } from "lucide-react";

export default function ProgressDemo() {
  const [val] = useState(65);

  return (
    <div className="w-full max-w-sm space-y-6 p-6">
      {/* 1. Linear Progress */}
      <Progress value={val} showValue />

      {/* 2. Circular Ring */}
      <ProgressCircular value={78} label="Storage" unit="%" />

      {/* 3. Semicircle Speedometer Gauge */}
      <ProgressSemicircle value={72} label="Throttle" />

      {/* 4. Streaming Buffer */}
      <ProgressBuffer value={45} loaded={85} isLoading statusText="Buffering Track..." />

      {/* 5. Shimmer Wave */}
      <ProgressShimmer value={58} />

      {/* 6. Loaded % Inside Capsule */}
      <ProgressCapsule value={68} label="Upload" icon={<CloudUpload className="w-4 h-4" />} />
    </div>
  );
}`;

export const progressDoc: ComponentDocData = {
  usageCode: PROGRESS_USAGE,
  codeContent: PROGRESS_USAGE,
  codes: PROGRESS_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: PROGRESS_EXAMPLES.map((ex) => ({
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
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Progress Props (Linear)",
      props: [
        { prop: "value", type: "number", defaultValue: "0", description: "Current numerical completion value." },
        { prop: "max", type: "number", defaultValue: "100", description: "Maximum completion boundary value." },
        { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Calibrated height scale tier." },
        { prop: "variant", type: '"primary" | "success" | "danger" | "warning" | "info" | "shimmer"', defaultValue: '"primary"', description: "Semantic color theme intent." },
        { prop: "fillColor", type: "string", defaultValue: "-", description: "Custom hex/CSS color override for progress bar." },
        { prop: "striped", type: "boolean", defaultValue: "false", description: "Enables diagonal barbershop texture." },
        { prop: "animated", type: "boolean", defaultValue: "false", description: "Animates striped texture along the track." },
        { prop: "indeterminate", type: "boolean", defaultValue: "false", description: "Continuous traveling wave for unknown duration tasks." },
        { prop: "showValue", type: "boolean", defaultValue: "false", description: "Renders live text percentage readout above track." },
      ],
    },
    {
      title: "ProgressCircular Props (360° Ring)",
      props: [
        { prop: "value", type: "number", defaultValue: "0", description: "Current numerical value." },
        { prop: "max", type: "number", defaultValue: "100", description: "Maximum boundary value." },
        { prop: "size", type: "number", defaultValue: "140", description: "Diameter of circular ring in pixels." },
        { prop: "strokeWidth", type: "number", defaultValue: "10", description: "Thickness of progress stroke arc." },
        { prop: "label", type: "string", defaultValue: "-", description: "Label rendered above center percentage." },
        { prop: "unit", type: "string", defaultValue: '"%"', description: "Unit string appended to value readout." },
      ],
    },
    {
      title: "ProgressSemicircle Props (180° Gauge)",
      props: [
        { prop: "value", type: "number", defaultValue: "0", description: "Current numerical value." },
        { prop: "max", type: "number", defaultValue: "100", description: "Maximum baseline boundary value." },
        { prop: "size", type: "number", defaultValue: "200", description: "Width of gauge in pixels." },
        { prop: "strokeWidth", type: "number", defaultValue: "12", description: "Thickness of gauge stroke arc." },
        { prop: "label", type: "string", defaultValue: "-", description: "Label rendered in center of dial." },
        { prop: "showMinMax", type: "boolean", defaultValue: "true", description: "Render 0% and 100% boundary labels." },
      ],
    },
    {
      title: "ProgressBuffer Props (Media Loader)",
      props: [
        { prop: "value", type: "number", defaultValue: "0", description: "Active playback/task progress value." },
        { prop: "loaded", type: "number", defaultValue: "75", description: "Secondary buffered progress percentage (0 - 100)." },
        { prop: "isLoading", type: "boolean", defaultValue: "false", description: "Pulsing network buffering state." },
        { prop: "statusText", type: "string", defaultValue: '"Buffered Playback"', description: "Custom status label displayed in header." },
      ],
    },
    {
      title: "ProgressCapsule Props (Loaded % Inside)",
      props: [
        { prop: "value", type: "number", defaultValue: "0", description: "Current completion percentage." },
        { prop: "label", type: "string", defaultValue: "-", description: "Text label displayed inside the capsule." },
        { prop: "icon", type: "ReactNode", defaultValue: "-", description: "Icon rendered on the left inside the track." },
        { prop: "showPercentage", type: "boolean", defaultValue: "true", description: "Whether to render percentage text inside the track." },
      ],
    },
  ],
};
