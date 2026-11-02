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

  if (isCustomizing) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Switch
          checked={customProps.checked}
          onChange={() => {}}
          disabled={customProps.disabled}
          variant={customProps.variant}
          orientation={customProps.orientation}
          size={customProps.size}
          sliderText={customProps.sliderText}
          showDotIcon={customProps.showDotIcon}
          shadowColor={customProps.shadowColor}
        />
        <span className="text-xs font-mono text-muted-foreground uppercase">
          Variant: {customProps.variant} • {customProps.checked ? "ON" : "OFF"}
        </span>
      </div>
    );
  }

  // 1. Cutout Ring Thumb (Row 2 Pinterest)
  if (activeTocId === "cutout") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex items-center gap-8">
          <Switch variant="cutout" checked={cutoutVal} onChange={setCutoutVal} size="lg" />
          <Switch variant="cutout" checked={!cutoutVal} onChange={() => setCutoutVal(!cutoutVal)} size="md" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Neon ring donut thumb sliding inside recessed track
        </span>
      </div>
    );
  }

  // 2. Capsule with Internal Text (Row 2 Col 3 Pinterest)
  if (activeTocId === "capsule-text") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex items-center gap-6">
          <Switch variant="capsule-text" checked={capsuleVal} onChange={setCapsuleVal} size="md" />
          <Switch variant="capsule-text" checked={capsuleVal} onChange={setCapsuleVal} size="lg" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Capsule outline with inline OFF / ON text typography
        </span>
      </div>
    );
  }

  // 3. Industrial Binary Switch (Row 3 Col 1 Pinterest)
  if (activeTocId === "industrial") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex items-center gap-8">
          <Switch variant="industrial" checked={industrialVal} onChange={setIndustrialVal} size="md" />
          <Switch variant="industrial" checked={!industrialVal} onChange={() => setIndustrialVal(!industrialVal)} size="lg" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Vertical machinery rocker with binary | (ON) and ○ (OFF) indicators
        </span>
      </div>
    );
  }

  // 4. Square Push Tile (Row 1 Col 1 Pinterest)
  if (activeTocId === "square") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex items-center gap-6">
          <Switch variant="square" checked={squareVal} onChange={setSquareVal} sliderText="yes/no" size="md" />
          <Switch variant="square" checked={squareVal} onChange={setSquareVal} sliderText="on/off" size="lg" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Tactile neo-brutalist square push tile with NO / YES labels
        </span>
      </div>
    );
  }

  // 5. Classic Pill Track (Row 1 Col 2 & Row 4 Col 3 Pinterest)
  if (activeTocId === "pill") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex items-center gap-6">
          <Switch variant="pill" checked={pillVal} onChange={setPillVal} size="sm" />
          <Switch variant="pill" checked={pillVal} onChange={setPillVal} size="md" />
          <Switch variant="pill" checked={pillVal} onChange={setPillVal} size="lg" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Ultra-smooth minimalist pill slider with spring thumb
        </span>
      </div>
    );
  }

  // 6. Vertical Rocker
  if (activeTocId === "vertical") {
    return (
      <div className="flex items-center justify-center gap-8 p-8">
        <Switch orientation="vertical" checked={false} onChange={() => {}} />
        <Switch orientation="vertical" checked={true} onChange={() => {}} />
      </div>
    );
  }

  // 7. Size Scales
  if (activeTocId === "sizes") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 p-8">
        <Switch size="sm" checked={checked} onChange={setChecked} />
        <Switch size="md" checked={checked} onChange={setChecked} />
        <Switch size="lg" checked={checked} onChange={setChecked} />
      </div>
    );
  }

  // Default: 3D Origami Rocker
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Switch checked={checked} onChange={setChecked} variant="rocker" />
      <span className="text-xs font-mono text-muted-foreground">
        3D physical rocker with crease tilt & status indicator
      </span>
    </div>
  );
}
