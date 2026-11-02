"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { SliderCustomProps } from "./types";

interface SliderPreviewProps {
  customProps: SliderCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}

export function SliderPreview({
  customProps,
  activeTocId = "basic",
  isCustomizing = false,
}: SliderPreviewProps) {
  const [basicVal, setBasicVal] = useState(60);
  const [rangeVal, setRangeVal] = useState(25);
  const [steppedVal, setSteppedVal] = useState(40);
  const [badgeVal, setBadgeVal] = useState(72);
  const [customVal, setCustomVal] = useState(customProps.value);

  // Sync if customProps value changes
  React.useEffect(() => {
    setCustomVal(customProps.value);
  }, [customProps.value]);

  if (isCustomizing) {
    return (
      <div className="w-full max-w-sm space-y-4 p-8">
        {customProps.showValueBadge && (
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">CUSTOM THRESHOLD</span>
            <span className="px-2 py-0.5 rounded bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-bold">
              {customVal}
            </span>
          </div>
        )}
        <Slider
          value={customVal}
          min={customProps.min}
          max={customProps.max}
          onChange={setCustomVal}
          disabled={customProps.disabled}
        />
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground/60">
          <span>Min: {customProps.min}</span>
          <span>Max: {customProps.max}</span>
        </div>
      </div>
    );
  }

  // 1. Custom Range
  if (activeTocId === "custom-range") {
    return (
      <div className="w-full max-w-sm space-y-6 p-8">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Range: 0 to 50</span>
            <span className="text-[var(--theme-primary)] font-semibold">{rangeVal}</span>
          </div>
          <Slider value={rangeVal} min={0} max={50} onChange={setRangeVal} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Zoom: 100 to 500</span>
            <span className="text-[var(--theme-primary)] font-semibold">320</span>
          </div>
          <Slider value={320} min={100} max={500} onChange={() => {}} />
        </div>
      </div>
    );
  }

  // 2. Stepped
  if (activeTocId === "stepped") {
    return (
      <div className="w-full max-w-sm space-y-4 p-8">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-muted-foreground">Discrete Steps (Snap)</span>
          <span className="text-[var(--theme-primary)] font-semibold">{steppedVal}%</span>
        </div>
        <Slider
          value={steppedVal}
          min={0}
          max={100}
          onChange={(v) => setSteppedVal(Math.round(v / 10) * 10)}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    );
  }

  // 3. With Value Badge
  if (activeTocId === "with-badge") {
    return (
      <div className="w-full max-w-sm space-y-4 p-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Output Gain</span>
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-[var(--theme-primary)] text-primary-foreground shadow-sm">
            {badgeVal} dB
          </span>
        </div>
        <Slider value={badgeVal} min={0} max={100} onChange={setBadgeVal} />
        <div className="flex items-center justify-center gap-2 pt-2">
          {[25, 50, 75, 100].map((preset) => (
            <button
              key={preset}
              onClick={() => setBadgeVal(preset)}
              className="text-[10px] font-mono px-2 py-0.5 rounded border border-border/40 hover:bg-secondary/40 transition-colors"
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 4. Disabled State
  if (activeTocId === "disabled") {
    return (
      <div className="w-full max-w-sm space-y-6 p-8">
        <div className="space-y-2 opacity-60">
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>Readonly Preset</span>
            <span>35%</span>
          </div>
          <Slider value={35} min={0} max={100} onChange={() => {}} disabled />
        </div>
        <div className="space-y-2 opacity-60">
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>Locked Peak</span>
            <span>90%</span>
          </div>
          <Slider value={90} min={0} max={100} onChange={() => {}} disabled />
        </div>
      </div>
    );
  }

  // Default: Basic
  return (
    <div className="w-full max-w-sm space-y-3 p-8">
      <div className="flex justify-between text-sm font-medium">
        <span>Volume Intensity</span>
        <span className="font-mono text-xs text-muted-foreground">{basicVal}%</span>
      </div>
      <Slider value={basicVal} min={0} max={100} onChange={setBasicVal} />
    </div>
  );
}
