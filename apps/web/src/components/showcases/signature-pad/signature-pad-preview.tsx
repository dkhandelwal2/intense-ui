"use client";

import React, { useState } from "react";
import { Download, Check } from "lucide-react";
import { SignaturePad, type SignatureResult } from "@/components/ui/signature-pad";
import { cn } from "@/lib/utils";
import type { SignaturePadCustomProps } from "./types";

export interface SignaturePadPreviewProps {
  customProps: SignaturePadCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
  className?: string;
}

export function SignaturePadPreview({
  customProps,
  activeTocId = "default",
  className,
}: SignaturePadPreviewProps) {
  const [signatureResult, setSignatureResult] = useState<SignatureResult | null>(null);

  const handleDownload = () => {
    if (!signatureResult?.dataUrl) return;
    const a = document.createElement("a");
    a.href = signatureResult.dataUrl;
    a.download = "signature.png";
    a.click();
  };

  const isInitiallyExpanded = activeTocId === "expanded";

  return (
    <div className={cn("w-full flex flex-col items-center justify-center p-4 gap-4", className)}>
      <SignaturePad
        key={`sig-pad-${activeTocId}`}
        width={customProps.width}
        height={customProps.height}
        strokeColor={customProps.strokeColor}
        strokeWidth={customProps.strokeWidth}
        buttonLabel={customProps.buttonLabel}
        finishLabel={customProps.finishLabel}
        title={customProps.title}
        showClear={customProps.showClear}
        showClose={customProps.showClose}
        disabled={customProps.disabled}
        initialExpanded={isInitiallyExpanded}
        onSign={setSignatureResult}
        onClear={() => setSignatureResult(null)}
      />

      {signatureResult && !signatureResult.isEmpty && (
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 text-xs font-mono text-zinc-600 dark:text-zinc-300 shadow-xs animate-in fade-in duration-300">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <Check className="size-3.5" />
            <span>Captured</span>
          </span>
          <span className="text-zinc-300 dark:text-zinc-600">•</span>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer font-medium"
          >
            <Download className="size-3" />
            <span>Download PNG</span>
          </button>
        </div>
      )}
    </div>
  );
}
