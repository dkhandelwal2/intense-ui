"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { DependenciesCardProps } from "../../types";
import { PEER_DEPENDENCIES } from "../../constants";
import { IsometricBlocksSvg, ScoopedCornerNotchSvg } from "@/assets/svg";
import {
  FILTER_TABS,
  getPackageInstallCommand,
  fillTrack,
  buildMarqueeRows,
} from "./helpers";
import { DependenciesMarqueeView, DependenciesStaticView } from "./dependencies-views";

export const DependenciesCard = React.memo(function DependenciesCard({
  directDeps,
  packageManager,
  width = 380,
  className,
}: DependenciesCardProps) {
  const [depFilter, setDepFilter] = useState<"all" | "direct" | "peer">("all");
  const [copiedChip, setCopiedChip] = useState<string | null>(null);

  const copyChip = useCallback(
    (name: string) => {
      navigator.clipboard.writeText(getPackageInstallCommand(name, packageManager));
      setCopiedChip(name);
      setTimeout(() => setCopiedChip(null), 1500);
    },
    [packageManager]
  );

  const filledRows = useMemo(() => {
    const rows = buildMarqueeRows(directDeps);
    return [fillTrack(rows[0]), fillTrack(rows[1]), fillTrack(rows[2])] as [
      typeof directDeps,
      typeof directDeps,
      typeof directDeps,
    ];
  }, [directDeps]);

  return (
    <div
      className={cn(
        "rounded-[26px] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between overflow-hidden select-none",
        className || "h-[185px] absolute bottom-0 right-0 z-20"
      )}
      style={width ? { width } : undefined}
    >
      <IsometricBlocksSvg id="dep-iso-blocks-pattern" />
      <ScoopedCornerNotchSvg />

      {/* Header Row */}
      <div className="relative z-10 flex items-center justify-between shrink-0 h-9 px-3.5 pt-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground select-none">
          <Package className="w-3.5 h-3.5 text-pink-500 shrink-0" />
          <span>Dependencies</span>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 select-none pr-1">
          {FILTER_TABS.map((f) => {
            const isActive = depFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setDepFilter(f.id)}
                className={cn(
                  "group flex items-center gap-1.5 py-0.5 px-1 rounded transition-all duration-150 select-none cursor-pointer focus:outline-none",
                  isActive
                    ? "text-pink-500 font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 font-medium"
                )}
                title={`Filter by ${f.label.toLowerCase()} dependencies`}
              >
                <span
                  className={cn(
                    "w-2 h-2 rounded-[2px] transition-all duration-150 shrink-0",
                    isActive
                      ? "bg-pink-500 shadow-[0_0_10px_rgba(244,63,94,0.9)]"
                      : "border border-zinc-400 dark:border-zinc-600 bg-transparent group-hover:border-zinc-500 dark:group-hover:border-zinc-400"
                  )}
                />
                <span className="font-mono text-[9px] tracking-wider uppercase leading-none">
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content: Dynamic Marquee Tracks or Filtered Static Chips */}
      {depFilter === "all" ? (
        <DependenciesMarqueeView
          filledRows={filledRows}
          copiedChip={copiedChip}
          packageManager={packageManager}
          onCopy={copyChip}
        />
      ) : (
        <DependenciesStaticView
          depFilter={depFilter}
          directDeps={directDeps}
          copiedChip={copiedChip}
          packageManager={packageManager}
          onCopy={copyChip}
        />
      )}

      {/* Footer Micro Stat */}
      <div className="relative z-10 flex items-center justify-between px-3.5 pb-2 text-[10px] font-mono text-muted-foreground/70">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>
            {depFilter === "all"
              ? `${directDeps.length} direct • ${PEER_DEPENDENCIES.length} peer`
              : depFilter === "direct"
                ? `${directDeps.length} direct packages`
                : `${PEER_DEPENDENCIES.length} peer packages`}
          </span>
        </span>
        <span className="text-[9px] text-zinc-400 dark:text-zinc-600">click chip to copy</span>
      </div>
    </div>
  );
});
