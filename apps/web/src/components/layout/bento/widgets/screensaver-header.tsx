"use client";

import React from "react";
import { X } from "lucide-react";

interface ScreensaverHeaderProps {
  onClose: () => void;
}

export function ScreensaverHeader({ onClose }: ScreensaverHeaderProps) {
  return (
    <div className="w-full flex items-center justify-end z-10">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Exit screensaver"
        title="Exit screensaver (Esc)"
        className="size-9 rounded-full bg-zinc-200/70 hover:bg-zinc-300/80 dark:bg-white/10 dark:hover:bg-white/20 border border-zinc-300/80 dark:border-white/15 flex items-center justify-center text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
      >
        <X className="size-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
