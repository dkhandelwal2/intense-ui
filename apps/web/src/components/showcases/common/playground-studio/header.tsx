"use client";

import React from "react";
import { RotateCcw, Code } from "lucide-react";

export interface PlaygroundStudioHeaderProps {
  modifiedCount?: number;
  onReset?: () => void;
  onViewCode?: (e?: React.MouseEvent) => void;
  description?: string;
}

export const PlaygroundStudioHeader = React.memo(function PlaygroundStudioHeader({
  modifiedCount = 0,
  onReset,
  onViewCode,
  description,
}: PlaygroundStudioHeaderProps) {
  return (
    <div className="flex items-center justify-between px-1 py-0.5 shrink-0 select-none">
      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal leading-tight truncate">
        {description || "Interact with props below to customize variants in real time."}
      </p>

      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        {modifiedCount > 0 && (
          <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-[var(--theme-primary)]/15 text-[var(--theme-primary)]">
            {modifiedCount} mod
          </span>
        )}
        {onReset && modifiedCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white bg-zinc-200/80 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all cursor-pointer shadow-2xs"
            title="Reset props to defaults"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
        <button
          type="button"
          onClick={onViewCode}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10.5px] font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white bg-zinc-200/80 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all cursor-pointer shadow-2xs hover:border-[var(--theme-primary)]/40"
          title="Inspect generated code with current customized props"
        >
          <Code className="w-3 h-3 text-[var(--theme-primary)]" />
          <span>View Code</span>
        </button>
      </div>
    </div>
  );
});
