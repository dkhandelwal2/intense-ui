"use client";

import React, { useState, useEffect } from "react";
import { ColorGrid } from "@/components/ui/color-grid";
import { ColorGridCustomProps } from "./types";

interface ColorGridPreviewProps {
  customProps: ColorGridCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}

const DEFAULT_COLOR = "var(--theme-primary)";

export function ColorGridPreview({
  customProps,
  activeTocId = "basic",
  isCustomizing = false,
}: ColorGridPreviewProps) {
  const [basicColor, setBasicColor] = useState(DEFAULT_COLOR);
  const [vertColor, setVertColor] = useState(DEFAULT_COLOR);
  const [sizeColor, setSizeColor] = useState(DEFAULT_COLOR);
  const [dragColor, setDragColor] = useState(DEFAULT_COLOR);
  const [gridColor, setGridColor] = useState(DEFAULT_COLOR);
  const [customColor, setCustomColor] = useState(customProps.value || DEFAULT_COLOR);

  useEffect(() => {
    setCustomColor(customProps.value || DEFAULT_COLOR);
  }, [customProps.value]);

  if (isCustomizing) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <ColorGrid
          value={customColor}
          onChange={setCustomColor}
          defaultValue={DEFAULT_COLOR}
          onClear={() => setCustomColor(DEFAULT_COLOR)}
          size={customProps.size}
          orientation={customProps.orientation}
          showCustomPicker={customProps.showCustomPicker}
          draggable={customProps.draggable}
          columns={customProps.columns}
        />
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-8 rounded-lg border border-border/80 shadow-inner transition-colors duration-200"
            style={{ backgroundColor: customColor }}
          />
          <span className="text-xs font-mono text-muted-foreground">{customColor}</span>
        </div>
      </div>
    );
  }

  // 1. Vertical Layout
  if (activeTocId === "vertical") {
    return (
      <div className="flex items-center justify-center gap-8 p-8">
        <ColorGrid
          orientation="vertical"
          value={vertColor}
          onChange={setVertColor}
          defaultValue={DEFAULT_COLOR}
          onClear={() => setVertColor(DEFAULT_COLOR)}
          showCustomPicker
        />
        <div
          className="w-12 h-28 rounded-xl border border-border shadow-inner transition-colors"
          style={{ backgroundColor: vertColor }}
        />
      </div>
    );
  }

  // 2. Size Variants
  if (activeTocId === "sizes") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-muted-foreground uppercase w-12 text-right">SM</span>
          <ColorGrid
            size="sm"
            value={sizeColor}
            onChange={setSizeColor}
            defaultValue={DEFAULT_COLOR}
            onClear={() => setSizeColor(DEFAULT_COLOR)}
            showCustomPicker={false}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-muted-foreground uppercase w-12 text-right">MD</span>
          <ColorGrid
            size="md"
            value={sizeColor}
            onChange={setSizeColor}
            defaultValue={DEFAULT_COLOR}
            onClear={() => setSizeColor(DEFAULT_COLOR)}
            showCustomPicker={false}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-muted-foreground uppercase w-12 text-right">LG</span>
          <ColorGrid
            size="lg"
            value={sizeColor}
            onChange={setSizeColor}
            defaultValue={DEFAULT_COLOR}
            onClear={() => setSizeColor(DEFAULT_COLOR)}
            showCustomPicker={false}
          />
        </div>
      </div>
    );
  }

  // 3. Custom Hex Picker
  if (activeTocId === "custom-picker") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <ColorGrid
          value={basicColor}
          onChange={setBasicColor}
          defaultValue={DEFAULT_COLOR}
          onClear={() => setBasicColor(DEFAULT_COLOR)}
          showCustomPicker={true}
        />
        <span className="text-xs font-mono text-muted-foreground">
          Click the + button to open custom hex code input & native eye-dropper
        </span>
      </div>
    );
  }

  // 4. Draggable Reorder Swatches
  if (activeTocId === "draggable") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <ColorGrid
          value={dragColor}
          onChange={setDragColor}
          defaultValue={DEFAULT_COLOR}
          onClear={() => setDragColor(DEFAULT_COLOR)}
          draggable={true}
          showCustomPicker
        />
        <span className="text-xs font-mono text-muted-foreground">
          Grab the grip handle on the left to drag & re-order swatches
        </span>
      </div>
    );
  }

  // 5. Grid Layout (Columns)
  if (activeTocId === "grid-layout") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <ColorGrid
          columns={3}
          value={gridColor}
          onChange={setGridColor}
          defaultValue={DEFAULT_COLOR}
          onClear={() => setGridColor(DEFAULT_COLOR)}
          showCustomPicker={true}
        />
        <span className="text-xs font-mono text-muted-foreground">
          Organized in 3 responsive columns
        </span>
      </div>
    );
  }

  // Default: Basic
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <ColorGrid
        value={basicColor}
        onChange={setBasicColor}
        defaultValue={DEFAULT_COLOR}
        onClear={() => setBasicColor(DEFAULT_COLOR)}
        showCustomPicker
      />
      <div
        className="w-24 h-10 rounded-xl border border-border shadow-inner transition-colors duration-200"
        style={{ backgroundColor: basicColor }}
      />
    </div>
  );
}
