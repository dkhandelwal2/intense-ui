"use client";

import React, { useEffect } from "react";
import { Sparkles, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { Barcode, BarcodeDotStyle } from "@/components/ui/barcode";
import { useComponentPlayground } from "@/context";

interface QrPreviewCardProps {
  dotStyle?: BarcodeDotStyle;
  description: string;
  withLogo: boolean;
  onToggleLogo: (withLogo: boolean) => void;
}

function getQrSnippet(dotStyle: BarcodeDotStyle, withIcon: boolean): string {
  const isDots = dotStyle === "dots";
  const fnName = isDots ? "QrDotsDemo" : "QrCodeDemo";
  const dotAttr = isDots ? ' dotStyle="dots"' : "";

  if (withIcon) {
    return `"use client";

import { Barcode } from "@/components/ui/barcode";
import { Sparkles } from "lucide-react";

export default function ${fnName}() {
  return (
    <div className="flex items-center justify-center p-8">
      <Barcode
        value="https://intenseui.dev"
        format="qr"${dotAttr}
        centerIcon={<Sparkles stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />}
        copyable
        downloadable
      />
    </div>
  );
}`;
  }

  return `"use client";

import { Barcode } from "@/components/ui/barcode";

export default function ${fnName}() {
  return (
    <div className="flex items-center justify-center p-8">
      <Barcode value="https://intenseui.dev" format="qr"${dotAttr} copyable downloadable />
    </div>
  );
}`;
}

export function QrPreviewCard({
  dotStyle = "square",
  description,
  withLogo,
  onToggleLogo,
}: QrPreviewCardProps) {
  const { setActiveVariantCode } = useComponentPlayground();

  useEffect(() => {
    if (setActiveVariantCode) {
      if (withLogo) {
        setActiveVariantCode(getQrSnippet(dotStyle, true));
      } else {
        setActiveVariantCode(null);
      }
    }
  }, [dotStyle, withLogo, setActiveVariantCode]);

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 w-full select-none">
      <div className="relative w-full max-w-[320px] rounded-[28px] bg-white dark:bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800/80 shadow-2xl p-6 flex flex-col items-center gap-5 transition-all">
        {/* Interactive Segmented Switch */}
        <div className="relative inline-flex items-center p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-inner w-56">
          {/* Animated Sliding Pill Indicator without layoutId deadlock */}
          <div
            className={cn(
              "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0",
              !withLogo
                ? "left-1 bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/80 dark:border-zinc-700/60"
                : "left-[50%] bg-[var(--theme-primary)] shadow-[0_0_14px_rgba(255,0,132,0.4)]"
            )}
          />

          <button
            type="button"
            onClick={() => onToggleLogo(false)}
            className={cn(
              "relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer select-none",
              !withLogo
                ? "text-zinc-900 dark:text-zinc-100 font-bold"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium"
            )}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Plain</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleLogo(true)}
            className={cn(
              "relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer select-none",
              withLogo
                ? "text-white font-bold"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>With Logo</span>
          </button>
        </div>

        {/* Viewfinder Scanning Stage Frame */}
        <div className="relative p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-inner flex items-center justify-center">
          <span className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-500/50 dark:border-emerald-400/50 rounded-tl-sm pointer-events-none" />
          <span className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-500/50 dark:border-emerald-400/50 rounded-tr-sm pointer-events-none" />
          <span className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-500/50 dark:border-emerald-400/50 rounded-bl-sm pointer-events-none" />
          <span className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-500/50 dark:border-emerald-400/50 rounded-br-sm pointer-events-none" />

          <Barcode
            value="https://intenseui.dev"
            format="qr"
            size={140}
            dotStyle={dotStyle}
            centerIcon={withLogo ? <Sparkles stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} /> : null}
            copyable={true}
            downloadable={true}
          />
        </div>
      </div>

      <span className="text-xs font-mono text-muted-foreground text-center mt-4">
        {description}
      </span>
    </div>
  );
}
