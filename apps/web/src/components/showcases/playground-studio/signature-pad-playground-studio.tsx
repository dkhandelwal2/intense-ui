"use client";

import React from "react";
import { Maximize2, Sliders } from "lucide-react";
import { PenSquiggleIcon } from "@/assets/svg";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { SignaturePadColorStep } from "./signature-pad-color-step";
import {
  SignaturePadCustomProps,
  DEFAULT_SIGNATURE_PAD_PROPS,
} from "@/components/showcases/signature-pad/types";

export interface SignaturePadPlaygroundStudioProps {
  customProps: SignaturePadCustomProps;
  onChange: React.Dispatch<React.SetStateAction<SignaturePadCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const PAD_DIMENSIONS = [
  { width: 280, height: 340, label: "Compact Mobile", badge: "SM", spec: "280 × 340 tight modal footprint" },
  { width: 320, height: 380, label: "Standard Pad", badge: "MD", spec: "320 × 380 balanced golden ratio" },
  { width: 360, height: 420, label: "Spacious Canvas", badge: "LG", spec: "360 × 420 generous signing surface" },
  { width: 420, height: 380, label: "Wide Landscape", badge: "XL", spec: "420 × 380 expanded landscape deck" },
];

const TITLE_PRESETS = [
  { title: "Sign", label: "Title: Sign", badge: "01", spec: "Concise minimalist modal card title" },
  { title: "Authorize", label: "Title: Authorize", badge: "02", spec: "Official document authorization header" },
  { title: "Digital Signature", label: "Title: Digital Signature", badge: "03", spec: "Formal identity verification header" },
];

const BUTTON_PRESETS = [
  { btn: "Start Signing", finish: "Finish Signing", label: "Action: Start Signing", badge: "01", spec: "Default interactive prompt labels" },
  { btn: "Sign Document", finish: "Accept & Save", label: "Action: Sign Document", badge: "02", spec: "Paperwork & legal document flow" },
  { btn: "Add Signature", finish: "Confirm Signature", label: "Action: Add Signature", badge: "03", spec: "Inline checkout & approval flow" },
];

export function SignaturePadPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: SignaturePadPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "ink-nib",
      titleLine1: "Ink &",
      titleLine2: "nib",
      categoryTag: "01 / 03",
      colorGradient: "bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#4338CA]",
      icon: <PenSquiggleIcon className="w-3.5 h-3.5" />,
      headerTitle: "Ink Pigment & Nib",
      headerSubtitle: "palette swatches, custom hex & nib weight",
      headerEmoji: "🖋️",
      customRightContent: (
        <SignaturePadColorStep customProps={customProps} onChange={onChange} />
      ),
    },
    {
      id: "dimensions",
      titleLine1: "Scale &",
      titleLine2: "geometry",
      categoryTag: "02 / 03",
      colorGradient: "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]",
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      headerTitle: "Pad Dimensions",
      headerSubtitle: "interactive drawing surface proportions",
      headerEmoji: "📐",
      rows: PAD_DIMENSIONS.map((dim) => ({
        id: `dim-${dim.width}-${dim.height}`,
        label: dim.label,
        spec: dim.spec,
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">
            {dim.badge}
          </span>
        ),
        isSelected: customProps.width === dim.width && customProps.height === dim.height,
        onSelect: () => onChange((p) => ({ ...p, width: dim.width, height: dim.height })),
      })),
    },
    {
      id: "chrome",
      titleLine1: "Chrome &",
      titleLine2: "toggles",
      categoryTag: "03 / 03",
      colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]",
      icon: <Sliders className="w-3.5 h-3.5" />,
      headerTitle: "Controls & Actions",
      headerSubtitle: "card chrome, actions & disabled state",
      headerEmoji: "⚡",
      rows: [
        {
          id: "toggle-clear",
          label: "Show Reset Button",
          spec: "Display bottom-left canvas refresh wipe action",
          thumbnail: <span className="text-sm">🔄</span>,
          actionType: "toggle" as const,
          toggleChecked: customProps.showClear,
          onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, showClear: checked })),
          onSelect: () => onChange((p) => ({ ...p, showClear: !p.showClear })),
        },
        {
          id: "toggle-close",
          label: "Show Close Badge",
          spec: "Display top-right dismiss badge on header",
          thumbnail: <span className="text-sm">✕</span>,
          actionType: "toggle" as const,
          toggleChecked: customProps.showClose,
          onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, showClose: checked })),
          onSelect: () => onChange((p) => ({ ...p, showClose: !p.showClose })),
        },
        {
          id: "toggle-disabled",
          label: "Disabled State",
          spec: "Prevent opening, drawing, and interaction",
          thumbnail: <span className="text-sm">🚫</span>,
          actionType: "toggle" as const,
          toggleChecked: customProps.disabled,
          onToggleChange: (checked: boolean) => onChange((p) => ({ ...p, disabled: checked })),
          onSelect: () => onChange((p) => ({ ...p, disabled: !p.disabled })),
        },
        ...TITLE_PRESETS.map((t) => ({
          id: `title-${t.badge}`,
          label: t.label,
          spec: t.spec,
          thumbnail: (
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {t.badge}
            </span>
          ),
          isSelected: customProps.title === t.title,
          onSelect: () => onChange((p) => ({ ...p, title: t.title })),
        })),
        ...BUTTON_PRESETS.map((b) => ({
          id: `btn-${b.badge}`,
          label: b.label,
          spec: b.spec,
          thumbnail: (
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {b.badge}
            </span>
          ),
          isSelected:
            customProps.buttonLabel === b.btn && customProps.finishLabel === b.finish,
          onSelect: () =>
            onChange((p) => ({ ...p, buttonLabel: b.btn, finishLabel: b.finish })),
        })),
      ],
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      onReset={() => onChange(DEFAULT_SIGNATURE_PAD_PROPS)}
      onViewCode={onViewCode}
      hidePreview={hidePreview}
      className={className}
    />
  );
}
