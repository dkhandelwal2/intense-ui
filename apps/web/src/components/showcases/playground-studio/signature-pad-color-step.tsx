"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ColorGrid } from "@/components/ui/color-grid";
import {
  DEFAULT_STROKE_COLOR,
  SIGNATURE_INK_COLORS,
  SIGNATURE_INK_LABELS,
} from "@/components/ui/signature-pad/constants";
import type { SignaturePadCustomProps } from "@/components/showcases/signature-pad/types";

export interface SignaturePadColorStepProps {
  customProps: SignaturePadCustomProps;
  onChange: React.Dispatch<React.SetStateAction<SignaturePadCustomProps>>;
}

const NIB_WEIGHTS = [
  { width: 1.5, label: "Fine" },
  { width: 2.5, label: "Std" },
  { width: 3.5, label: "Bold" },
  { width: 5.0, label: "Chisel" },
];

export function SignaturePadColorStep({ customProps, onChange }: SignaturePadColorStepProps) {
  const isThemePrimary = customProps.strokeColor.trim() === DEFAULT_STROKE_COLOR;

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange((p) => ({ ...p, strokeColor: val }));
  };

  const handleHexBlur = () => {
    if (!customProps.strokeColor.trim()) {
      onChange((p) => ({ ...p, strokeColor: DEFAULT_STROKE_COLOR }));
    }
  };

  return (
    <div className="flex flex-col gap-2.5 py-0.5 w-full">
      {/* Ink Pigment Header + Hex Input & Preview Dot */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
          Ink Pigment
        </span>
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={isThemePrimary ? "" : customProps.strokeColor}
            onChange={handleHexChange}
            onBlur={handleHexBlur}
            placeholder="PRIMARY"
            maxLength={9}
            className="w-20 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 placeholder:text-[var(--theme-primary)] outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
            aria-label="Custom color hex code"
          />
          <span
            className="size-4 rounded-full border border-black/20 dark:border-white/20 shrink-0 shadow-2xs"
            style={{ backgroundColor: customProps.strokeColor }}
          />
        </div>
      </div>

      {/* 4-Column ColorGrid Card — wraps neatly with zero horizontal overflow */}
      <div className="flex items-center justify-center py-2 px-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <ColorGrid
          size="sm"
          columns={4}
          colors={SIGNATURE_INK_COLORS}
          labels={SIGNATURE_INK_LABELS}
          value={customProps.strokeColor}
          defaultValue={DEFAULT_STROKE_COLOR}
          showCustomPicker={true}
          onChange={(hex) => onChange((p) => ({ ...p, strokeColor: hex }))}
          onClear={() => onChange((p) => ({ ...p, strokeColor: DEFAULT_STROKE_COLOR }))}
          className="border-0 shadow-none p-0 gap-2.5 place-items-center bg-transparent dark:bg-transparent"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-200/60 dark:border-zinc-800/80" />

      {/* Nib Stroke Weight Header + Value */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
          Nib Weight
        </span>
        <span className="text-[10.5px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
          {customProps.strokeWidth}px
        </span>
      </div>

      {/* Compact 4-Column Nib Selector */}
      <div className="grid grid-cols-4 gap-1.5">
        {NIB_WEIGHTS.map((nw) => {
          const isSelected = customProps.strokeWidth === nw.width;
          return (
            <button
              key={nw.width}
              type="button"
              onClick={() => onChange((p) => ({ ...p, strokeWidth: nw.width }))}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-lg border transition-all cursor-pointer",
                isSelected
                  ? "border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]"
                  : "border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400"
              )}
              aria-pressed={isSelected}
              title={`${nw.label} (${nw.width}px)`}
            >
              <span
                className="w-5 rounded-full bg-current transition-colors"
                style={{ height: Math.max(1.5, nw.width) }}
              />
              <span className="text-[9.5px] font-mono font-bold leading-none">
                {nw.width}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
