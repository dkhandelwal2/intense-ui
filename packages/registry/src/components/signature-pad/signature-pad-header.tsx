"use client";

import React from "react";
import { RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SignaturePadHeaderProps } from "./types";

export function SignaturePadHeader({
  title = "Sign",
  onClear,
  onClose,
  canClear = true,
  showClear = true,
  showClose = true,
}: SignaturePadHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full px-1 py-0.5 select-none shrink-0 relative">
      <div className="w-8 flex items-center justify-start">
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            disabled={!canClear}
            aria-label="Clear signature"
            title="Clear signature"
            className={cn(
              "size-7 rounded-full flex items-center justify-center transition-all cursor-pointer",
              "text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-90",
              !canClear && "opacity-40 cursor-not-allowed pointer-events-none"
            )}
          >
            <RotateCcw className="size-4" strokeWidth={2.2} />
          </button>
        )}
      </div>

      <h3 className="text-sm font-semibold tracking-tight text-zinc-700 dark:text-zinc-200">
        {title}
      </h3>

      <div className="w-8 flex items-center justify-end">
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close signature pad"
            title="Close"
            className={cn(
              "size-6 rounded-full flex items-center justify-center transition-all cursor-pointer",
              "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100",
              "hover:bg-zinc-300 dark:hover:bg-zinc-700 active:scale-90 shadow-2xs"
            )}
          >
            <X className="size-3.5" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}
