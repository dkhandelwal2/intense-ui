"use client";

import React, { useState } from "react";
import {
  Progress,
  ProgressCircular,
  ProgressSemicircle,
  ProgressBuffer,
  ProgressShimmer,
  ProgressCapsule,
} from "@/components/ui/progress";
import { ProgressCustomProps } from "./types";
import { CloudUpload } from "lucide-react";

interface ProgressPreviewProps {
  customProps: ProgressCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}

export function ProgressPreview({
  customProps,
  activeTocId = "linear",
  isCustomizing = false,
}: ProgressPreviewProps) {
  const [linearVal] = useState(65);
  const [circularVal] = useState(78);
  const [semicircleVal] = useState(72);
  const [bufferVal] = useState(45);
  const [shimmerVal] = useState(58);
  const [capsuleVal] = useState(68);

  if (isCustomizing) {
    if (customProps.type === "circular") {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <ProgressCircular
            value={customProps.value}
            max={customProps.max}
            variant={customProps.variant}
            fillColor={customProps.fillColor}
            label="Storage"
            unit="%"
          />
          <span className="text-xs font-mono text-muted-foreground text-center">
            Customizing Circular Ring Progress in real time
          </span>
        </div>
      );
    }

    if (customProps.type === "semicircle") {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <ProgressSemicircle
            value={customProps.value}
            max={customProps.max}
            variant={customProps.variant}
            fillColor={customProps.fillColor}
            label="Throttle"
            unit="%"
          />
          <span className="text-xs font-mono text-muted-foreground text-center">
            Customizing Semicircle Gauge Progress in real time
          </span>
        </div>
      );
    }

    if (customProps.type === "buffer") {
      return (
        <div className="w-full max-w-sm flex flex-col items-center justify-center gap-4 p-8">
          <ProgressBuffer
            value={customProps.value}
            max={customProps.max}
            loaded={customProps.loaded}
            isLoading={customProps.isLoading}
            variant={customProps.variant}
            fillColor={customProps.fillColor}
            statusText="Buffering Track..."
          />
          <span className="text-xs font-mono text-muted-foreground text-center">
            Customizing Streaming Buffer Progress in real time
          </span>
        </div>
      );
    }

    if (customProps.type === "shimmer" || customProps.variant === "shimmer") {
      return (
        <div className="w-full max-w-sm flex flex-col items-center justify-center gap-4 p-8">
          <ProgressShimmer
            value={customProps.value}
            max={customProps.max}
            size={customProps.size}
            fillColor={customProps.fillColor}
          />
          <span className="text-xs font-mono text-muted-foreground text-center">
            Customizing Shimmer Wave Progress in real time
          </span>
        </div>
      );
    }

    if (customProps.type === "capsule") {
      return (
        <div className="w-full max-w-sm flex flex-col items-center justify-center gap-4 p-8">
          <ProgressCapsule
            value={customProps.value}
            max={customProps.max}
            variant={customProps.variant}
            fillColor={customProps.fillColor}
            label="Upload"
            icon={<CloudUpload className="w-4 h-4" />}
          />
          <span className="text-xs font-mono text-muted-foreground text-center">
            Customizing Loaded % Inside Capsule Progress in real time
          </span>
        </div>
      );
    }

    return (
      <div className="w-full max-w-sm flex flex-col items-center justify-center gap-4 p-8">
        <Progress
          value={customProps.value}
          max={customProps.max}
          size={customProps.size}
          variant={customProps.variant}
          fillColor={customProps.fillColor}
          striped={customProps.striped}
          animated={customProps.animated}
          indeterminate={customProps.indeterminate}
          showValue={customProps.showValue}
        />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Interactive customization mode with live property controls and real-time preview
        </span>
      </div>
    );
  }

  // 1. Linear Progress
  if (activeTocId === "linear") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <Progress value={linearVal} showValue />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Standard fluid spring-animated linear progress bar with value readout
        </span>
      </div>
    );
  }

  // 2. Circular Ring
  if (activeTocId === "circular") {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <ProgressCircular value={circularVal} label="Storage" unit="%" />
        <span className="text-xs font-mono text-muted-foreground text-center max-w-xs">
          360° circular progress ring with smooth stroke dashoffset and center percentage
        </span>
      </div>
    );
  }

  // 3. Semicircle Gauge
  if (activeTocId === "semicircle") {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <ProgressSemicircle value={semicircleVal} label="Throttle" />
        <span className="text-xs font-mono text-muted-foreground text-center max-w-xs">
          180° arched speedometer gauge with baseline bounds and fluid arc progress
        </span>
      </div>
    );
  }

  // 4. Streaming Buffer
  if (activeTocId === "buffer") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <ProgressBuffer value={bufferVal} loaded={85} isLoading statusText="Buffering Track..." />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Dual-layer media player buffer loader with secondary loaded progress layer
        </span>
      </div>
    );
  }

  // 5. Shimmer Wave
  if (activeTocId === "shimmer") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <ProgressShimmer value={shimmerVal} />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Futuristic high-tech glowing shimmer light beam continuously sweeping along the active track
        </span>
      </div>
    );
  }

  // 6. Loaded % Inside Capsule
  if (activeTocId === "capsule") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <ProgressCapsule value={capsuleVal} label="Upload" icon={<CloudUpload className="w-4 h-4" />} />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Tactile wide pill container with inverted typography and dynamic percentage inside
        </span>
      </div>
    );
  }

  // 7. Striped & Animated
  if (activeTocId === "striped") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <Progress value={75} striped animated size="lg" showValue />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Diagonal barbershop striped pattern with continuous marquee-flowing animation
        </span>
      </div>
    );
  }

  // 8. Indeterminate
  if (activeTocId === "indeterminate") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8 space-y-2">
        <div className="w-full flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>Fetching dependencies...</span>
          <span className="animate-pulse">Loading</span>
        </div>
        <Progress indeterminate size="md" variant="info" />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Infinite wave beacon for asynchronous operations with unknown duration
        </span>
      </div>
    );
  }

  // 9. Intent Types
  if (activeTocId === "intents") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <div className="w-full space-y-3.5">
          <Progress value={85} variant="primary" showValue />
          <Progress value={65} variant="success" showValue />
          <Progress value={45} variant="warning" showValue />
          <Progress value={25} variant="danger" showValue />
        </div>
        <span className="text-xs font-mono text-muted-foreground text-center">
          Semantic color variants: Primary, Success, Danger, Warning, and Info
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
      <Progress value={linearVal} showValue />
    </div>
  );
}
