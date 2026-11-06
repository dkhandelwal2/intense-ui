"use client";

import React, { useState, useEffect } from "react";
import { Slider, RangeSlider, MultiSlider } from "@/components/ui/slider";
import { SliderCustomProps } from "./types";
import { Volume1, Volume2, Sun } from "lucide-react";

interface SliderPreviewProps {
  customProps: SliderCustomProps; activeTocId?: string; isCustomizing?: boolean;
}

export function SliderPreview({
  customProps, activeTocId = "basic", isCustomizing = false,
}: SliderPreviewProps) {
  const [val, setVal] = useState(50), [stepVal, setStepVal] = useState(50), [multiVal, setMultiVal] = useState<number[]>([20, 50, 80]);
  const [zoomVal, setZoomVal] = useState(320), [rangeVal, setRangeVal] = useState<[number, number]>([25, 75]), [iconsVal, setIconsVal] = useState(65);
  const [thumbIconVal, setThumbIconVal] = useState(80), [vertVal, setVertVal] = useState(60), [inputVal, setInputVal] = useState(42), [tipVal, setTipVal] = useState(85);
  const [pulseVal, setPulseVal] = useState(40), [glowVal, setGlowVal] = useState(70), [scaleVal, setScaleVal] = useState(55);
  const [pVal, setPVal] = useState(75), [sVal, setSVal] = useState(60), [dVal, setDVal] = useState(30);

  const [customVal, setCustomVal] = useState(customProps.value);
  const [customRange, setCustomRange] = useState(customProps.rangeValue);

  useEffect(() => {
    setCustomVal(customProps.value);
    setCustomRange(customProps.rangeValue);
  }, [customProps.value, customProps.rangeValue]);

  if (isCustomizing) {
    return (
      <div className="w-full max-w-sm flex flex-col items-center justify-center gap-4 p-8">
        {customProps.isRange ? (
          <div className="w-full space-y-4">
            <div className="flex justify-between text-xs font-mono text-muted-foreground"><span>Range: {customRange[0]} - {customRange[1]}</span></div>
            <RangeSlider value={customRange} min={customProps.min} max={customProps.max} step={customProps.step} onChange={setCustomRange} variant={customProps.variant} fillColor={customProps.fillColor} tooltip={customProps.tooltip} disabled={customProps.disabled} />
          </div>
        ) : (
          <Slider value={customVal} min={customProps.min} max={customProps.max} step={customProps.step} onChange={setCustomVal} disabled={customProps.disabled} orientation={customProps.orientation} variant={customProps.variant} fillColor={customProps.fillColor} thumbAnimation={customProps.thumbAnimation} tooltip={customProps.tooltip} showInput={customProps.showInput} leftIcon={customProps.withIcons ? <Volume1 className="w-4 h-4" /> : undefined} rightIcon={customProps.withIcons ? <Volume2 className="w-4 h-4" /> : undefined} />
        )}
        <span className="text-xs font-mono text-muted-foreground text-center">Interactive customization mode with live property controls and real-time preview</span>
      </div>
    );
  }

  if (activeTocId === "step") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <div className="w-full flex justify-between text-xs font-mono">
          <span className="text-muted-foreground">Step Snap Progress</span>
          <span className="font-bold text-[var(--theme-primary)]">{stepVal}%</span>
        </div>
        <Slider value={stepVal} step={25} min={0} max={100} onChange={setStepVal} marks={["0%", "25%", "50%", "75%", "100%"]} />
        <span className="text-xs font-mono text-muted-foreground text-center">Discrete snap steps with props-driven bottom percentage markers or custom labels</span>
      </div>
    );
  }

  if (activeTocId === "multi") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <div className="w-full flex justify-between text-xs font-mono">
          <span className="text-muted-foreground">Multi-Point Checkpoints</span>
          <span className="font-mono text-xs font-bold text-[var(--theme-primary)]">{multiVal.join(" • ")}</span>
        </div>
        <MultiSlider values={multiVal} min={0} max={100} onChange={setMultiVal} tooltip marks={["Min", "Low", "Mid", "High", "Max"]} />
        <span className="text-xs font-mono text-muted-foreground text-center">Multi-point slider supporting 3 or more independently draggable thumbs on a single track</span>
      </div>
    );
  }

  if (activeTocId === "zoom") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <div className="w-full flex justify-between text-xs font-mono"><span className="text-muted-foreground">Canvas Zoom: 100% to 500%</span><span className="font-bold text-[var(--theme-primary)]">{zoomVal}%</span></div>
        <Slider value={zoomVal} min={100} max={500} onChange={setZoomVal} zoomEffect tooltip />
        <span className="text-xs font-mono text-muted-foreground text-center">Configurable numerical boundaries with fine-grained step resolution for canvas zoom</span>
      </div>
    );
  }

  if (activeTocId === "range") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <div className="w-full flex justify-between text-xs font-mono"><span className="text-muted-foreground">Price Filter:</span><span className="font-bold text-[var(--theme-primary)]">${rangeVal[0]} - ${rangeVal[1]}</span></div>
        <RangeSlider value={rangeVal} min={0} max={100} onChange={setRangeVal} tooltip />
        <span className="text-xs font-mono text-muted-foreground text-center">Dual-thumb interactive range selector with independent low and high bounds</span>
      </div>
    );
  }

  if (activeTocId === "with-icons") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <Slider value={iconsVal} onChange={setIconsVal} leftIcon={<Volume1 className="w-4 h-4" />} rightIcon={<Volume2 className="w-4 h-4" />} />
        <span className="text-xs font-mono text-muted-foreground text-center">Interactive edge icons for instant one-click min and max boundary snaps</span>
      </div>
    );
  }

  if (activeTocId === "thumb-icon") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <Slider value={thumbIconVal} onChange={setThumbIconVal} thumbIcon={<Sun className="w-3.5 h-3.5" />} variant="warning" tooltip />
        <span className="text-xs font-mono text-muted-foreground text-center">Custom icon embedded directly within the sliding thumb indicator</span>
      </div>
    );
  }

  if (activeTocId === "vertical") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 h-72">
        <Slider value={vertVal} onChange={setVertVal} orientation="vertical" tooltip />
        <span className="text-xs font-mono text-muted-foreground text-center">Space-saving vertical orientation with inverted bottom-to-top fluid fill</span>
      </div>
    );
  }

  if (activeTocId === "animation") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <div className="w-full space-y-4">
          <div className="space-y-1"><span className="text-[10px] uppercase font-mono text-muted-foreground">Pulse Effect</span><Slider value={pulseVal} onChange={setPulseVal} thumbAnimation="pulse" variant="info" /></div>
          <div className="space-y-1"><span className="text-[10px] uppercase font-mono text-muted-foreground">Glow Aura</span><Slider value={glowVal} onChange={setGlowVal} thumbAnimation="glow" variant="success" /></div>
          <div className="space-y-1"><span className="text-[10px] uppercase font-mono text-muted-foreground">Scale on Hover</span><Slider value={scaleVal} onChange={setScaleVal} thumbAnimation="scale" variant="primary" /></div>
        </div>
        <span className="text-xs font-mono text-muted-foreground text-center">Visual micro-interaction reactions including pulse, glow halo, and hover scale</span>
      </div>
    );
  }

  if (activeTocId === "intents") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <div className="w-full space-y-4">
          <Slider value={pVal} onChange={setPVal} variant="primary" />
          <Slider value={sVal} onChange={setSVal} variant="success" />
          <Slider value={dVal} onChange={setDVal} variant="danger" />
        </div>
        <span className="text-xs font-mono text-muted-foreground text-center">Semantic color themes for primary, success, danger, and warning feedback</span>
      </div>
    );
  }

  if (activeTocId === "with-input") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
        <Slider value={inputVal} onChange={setInputVal} showInput />
        <span className="text-xs font-mono text-muted-foreground text-center">Bidirectional synchronized numeric text field with real-time value validation</span>
      </div>
    );
  }

  if (activeTocId === "tooltip") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8 pt-12">
        <Slider value={tipVal} onChange={setTipVal} tooltip />
        <span className="text-xs font-mono text-muted-foreground text-center">Floating popover indicator displaying real-time numerical value on hover and drag</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-4 p-8">
      <div className="w-full space-y-3">
        <div className="flex justify-between text-sm font-medium"><span>Volume Intensity</span><span className="font-mono text-xs text-muted-foreground">{val}%</span></div>
        <Slider value={val} min={0} max={100} onChange={setVal} />
      </div>
      <span className="text-xs font-mono text-muted-foreground text-center">Fluid spring-animated single value slider with responsive track feedback</span>
    </div>
  );
}
