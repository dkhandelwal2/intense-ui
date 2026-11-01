"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNpmPackageUrl } from "@/components/docs";
import { renderDependencyLogo } from "@/assets/icons";
import type { DependencyItem } from "../../types";

export interface DependencyChipProps {
  dep: DependencyItem;
  isCopied: boolean;
  installCommand: string;
  onCopy: (name: string) => void;
  className?: string;
  isDuplicate?: boolean;
}

export const DependencyChip = React.memo(function DependencyChip({
  dep,
  isCopied,
  installCommand,
  onCopy,
  className,
  isDuplicate = false,
}: DependencyChipProps) {
  const content = (
    <>
      {renderDependencyLogo(dep.name, true)}
      <span className="text-[10px] font-mono font-medium tracking-tight">
        {isCopied ? (
          <span className="text-emerald-500 font-semibold flex items-center gap-0.5 text-[9px]">
            <Check className="w-2.5 h-2.5" /> Copied!
          </span>
        ) : (
          dep.name
        )}
      </span>
      <span className="text-[7.5px] text-zinc-500 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-900/90 px-1 py-[0.5px] rounded border border-zinc-200 dark:border-zinc-800 font-medium leading-none">
        {dep.version}
      </span>
    </>
  );

  const sharedClassName = cn(
    "group inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all duration-200 select-none shrink-0 h-[22px]",
    "bg-white/95 dark:bg-zinc-800/90 border-zinc-200/80 dark:border-zinc-700/70 text-foreground",
    !isDuplicate && "cursor-pointer hover:bg-white dark:hover:bg-zinc-700 hover:border-pink-500/50 hover:shadow-xs hover:scale-105 active:scale-95 shadow-2xs",
    isDuplicate && "pointer-events-none",
    className
  );

  if (isDuplicate) {
    return (
      <span className={sharedClassName} aria-hidden="true">
        {content}
      </span>
    );
  }

  return (
    <a
      href={getNpmPackageUrl(dep.name)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Copy ${installCommand}`}
      onClick={(e) => {
        e.preventDefault();
        onCopy(dep.name);
      }}
      className={sharedClassName}
      title={`Click to copy ${installCommand}`}
    >
      {content}
    </a>
  );
});
