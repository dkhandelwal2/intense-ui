import React from "react";
import { cn } from "@/lib/utils";
import type { PlaygroundStudioStepData } from "./types";

export interface PlaygroundStudioOptionsPanelProps {
  step: PlaygroundStudioStepData;
  activeGradient: string;
}

export const PlaygroundStudioOptionsPanel = React.memo(function PlaygroundStudioOptionsPanel({
  step,
  activeGradient,
}: PlaygroundStudioOptionsPanelProps) {
  return (
    <div className="relative flex flex-col justify-start pt-10 sm:pt-11 pb-2 pr-4 pl-2 sm:pr-5 sm:pl-3 overflow-y-auto subtle-scrollbar h-full min-h-0 select-none z-10">
      <div className="w-full">
        {/* Table Column Headers (Clean without duplicate heading/subheading) */}
        <div className="flex items-center justify-between text-[8px] 2xl:text-[8.5px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase pt-0.5 pb-1 border-b border-zinc-200/60 dark:border-zinc-800/80 mb-1">
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors duration-500",
                activeGradient
              )}
            />
            <span>PROPERTY</span>
          </div>
          <span className="pr-1">VALUE</span>
        </div>

        {/* Rows List */}
        {step.rows ? (
          <div className="divide-y divide-zinc-100/90 dark:divide-zinc-800/60">
            {step.rows.map((row) => (
              <div
                key={row.id}
                onClick={
                  row.actionType === "toggle"
                    ? () => row.onToggleChange?.(!row.toggleChecked)
                    : row.onSelect
                }
                className={cn(
                  "w-full py-0.5 2xl:py-1 px-1.5 flex items-center justify-between transition-colors text-left cursor-pointer group rounded-lg my-0.5",
                  row.isSelected
                    ? "bg-[var(--theme-primary)]/10 text-zinc-900 dark:text-zinc-100"
                    : "hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
                )}
              >
                <div className="min-w-0 pr-1.5">
                  <div
                    className={cn(
                      "text-[10.5px] 2xl:text-xs font-bold truncate leading-tight",
                      row.isSelected
                        ? "text-[var(--theme-primary)]"
                        : "text-zinc-900 dark:text-zinc-100"
                    )}
                  >
                    {row.label}
                  </div>
                  <div className="text-[8.5px] 2xl:text-[9px] text-zinc-400 dark:text-zinc-500 font-mono truncate">
                    {row.spec}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                  <div className="text-xs leading-none">{row.thumbnail}</div>
                  {row.actionType === "toggle" ? (
                    <div
                      role="switch"
                      aria-checked={row.toggleChecked}
                      onClick={(e) => {
                        e.stopPropagation();
                        row.onToggleChange?.(!row.toggleChecked);
                      }}
                      className={cn(
                        "w-6 h-3.5 rounded-full transition-colors relative cursor-pointer p-0.5 flex items-center shrink-0",
                        row.toggleChecked
                          ? "bg-[var(--theme-primary)]"
                          : "bg-zinc-200 dark:bg-zinc-700"
                      )}
                    >
                      <div
                        className={cn(
                          "w-2.5 h-2.5 rounded-full bg-white transition-transform shadow-xs",
                          row.toggleChecked ? "translate-x-2.5" : "translate-x-0"
                        )}
                      />
                    </div>
                  ) : (
                    <span
                      className={cn(
                        "w-4 h-4 2xl:w-5 2xl:h-5 rounded-full flex items-center justify-center text-[10px] 2xl:text-[11px] font-bold transition-all shadow-2xs",
                        row.isSelected
                          ? "bg-[var(--theme-primary)] text-white scale-105"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                      )}
                    >
                      {row.isSelected ? "✓" : "+"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          step.customRightContent
        )}
      </div>
    </div>
  );
});
