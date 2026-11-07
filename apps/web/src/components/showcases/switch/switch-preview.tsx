"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { SwitchCustomProps } from "./types";

interface SwitchPreviewProps {
  customProps: SwitchCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}

export function SwitchPreview({
  customProps,
  activeTocId = "basic",
  isCustomizing = false,
}: SwitchPreviewProps) {
  const [checked, setChecked] = useState(true);
  const [cutoutVal, setCutoutVal] = useState(true);
  const [capsuleVal, setCapsuleVal] = useState(true);
  const [industrialVal, setIndustrialVal] = useState(true);
  const [squareVal, setSquareVal] = useState(true);
  const [pillVal, setPillVal] = useState(true);
  const [binaryVal, setBinaryVal] = useState(true);

  if (isCustomizing) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Switch
          checked={customProps.checked}
          onChange={() => {}}
          disabled={customProps.disabled}
          variant={customProps.variant}
          size={customProps.size}
          sliderText={customProps.sliderText}
          showDotIcon={customProps.showDotIcon}
          shadowColor={customProps.shadowColor}
        />
        <span className="text-xs font-mono text-muted-foreground uppercase">
          Variant: {customProps.variant} • Size: {customProps.size} • {customProps.checked ? "ON" : "OFF"}
        </span>
      </div>
    );
  }

  // 1. Cutout Ring Thumb
  if (activeTocId === "cutout") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Switch variant="cutout" checked={cutoutVal} onChange={setCutoutVal} size="md" />
        <span className="text-xs font-mono text-muted-foreground">
          Neon ring donut thumb sliding edge-to-edge inside recessed track
        </span>
      </div>
    );
  }

  // 2. Capsule with Internal Text
  if (activeTocId === "capsule-text") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Switch variant="capsule-text" checked={capsuleVal} onChange={setCapsuleVal} size="md" />
        <span className="text-xs font-mono text-muted-foreground">
          Capsule outline with inline OFF / ON text typography
        </span>
      </div>
    );
  }

  // 3. Industrial Binary Switch
  if (activeTocId === "industrial") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Switch variant="industrial" checked={industrialVal} onChange={setIndustrialVal} size="md" />
        <span className="text-xs font-mono text-muted-foreground">
          Tactile machinery toggle with binary | (ON) and ○ (OFF) indicators
        </span>
      </div>
    );
  }

  // 4. Square Push Tile
  if (activeTocId === "square") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Switch variant="square" checked={squareVal} onChange={setSquareVal} sliderText="yes/no" size="md" />
        <span className="text-xs font-mono text-muted-foreground">
          Tactile neo-brutalist square push tile with NO / YES labels
        </span>
      </div>
    );
  }

  // 5. Classic Pill Track
  if (activeTocId === "pill") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Switch variant="pill" checked={pillVal} onChange={setPillVal} size="md" />
        <span className="text-xs font-mono text-muted-foreground">
          Ultra-smooth minimalist pill slider with edge-to-edge spring thumb
        </span>
      </div>
    );
  }

  // 6. Binary I/O Morphing Capsule
  if (activeTocId === "binary-io") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Switch variant="binary-io" checked={binaryVal} onChange={setBinaryVal} size="md" />
        <span className="text-xs font-mono text-muted-foreground">
          Neon binary switch morphing between green bar (ON) and orange ring (OFF)
        </span>
      </div>
    );
  }

  // Default: 3D Origami Rocker
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Switch checked={checked} onChange={setChecked} variant="rocker" size="md" />
      <span className="text-xs font-mono text-muted-foreground">
        3D physical rocker with crease tilt & status indicator
      </span>
    </div>
  );
}
