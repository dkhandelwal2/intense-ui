"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Package, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNpmPackageUrl } from "@/components/docs";
import { DependencyItem, DependenciesCardProps } from "./types";
import { PEER_DEPENDENCIES } from "./constants";
import { renderDependencyLogo } from "@/assets/icons";

function fillTrack(items: DependencyItem[]): DependencyItem[] {
  let res = [...items];
  while (res.length < 6) {
    res = [...res, ...items];
  }
  return res;
}

const FILTER_TABS = [
  { id: "all" as const, label: "ALL" },
  { id: "direct" as const, label: "DIRECT" },
  { id: "peer" as const, label: "PEER" },
];

const MARQUEE_TRACKS = [
  { id: "track-1", direction: "ltr" as const, rowIdx: 0 },
  { id: "track-2", direction: "rtl" as const, rowIdx: 1 },
  { id: "track-3", direction: "ltr" as const, rowIdx: 2 },
];

export const DependenciesCard = React.memo(function DependenciesCard({
  directDeps,
  packageManager,
  width = 380,
  className,
}: DependenciesCardProps) {
  const [depFilter, setDepFilter] = useState<"all" | "direct" | "peer">("all");
  const [copiedChip, setCopiedChip] = useState<string | null>(null);

  const getInstallCommand = useCallback(
    (pkg: string) => {
      switch (packageManager) {
        case "npm":
          return `npm i ${pkg}`;
        case "yarn":
          return `yarn add ${pkg}`;
        case "bun":
          return `bun add ${pkg}`;
        case "pnpm":
        default:
          return `pnpm add ${pkg}`;
      }
    },
    [packageManager]
  );

  const copyChip = useCallback(
    (name: string) => {
      navigator.clipboard.writeText(getInstallCommand(name));
      setCopiedChip(name);
      setTimeout(() => setCopiedChip(null), 1500);
    },
    [getInstallCommand]
  );

  const allMarqueeRows = useMemo<[DependencyItem[], DependencyItem[], DependencyItem[]]>(
    () => [
      [
        directDeps[0] || PEER_DEPENDENCIES[0],
        PEER_DEPENDENCIES[0],
        directDeps[2] || PEER_DEPENDENCIES[4],
        PEER_DEPENDENCIES[4],
      ],
      [
        directDeps[1] || PEER_DEPENDENCIES[1],
        PEER_DEPENDENCIES[1],
        directDeps[3] || PEER_DEPENDENCIES[5],
      ],
      [
        PEER_DEPENDENCIES[2],
        PEER_DEPENDENCIES[3],
        PEER_DEPENDENCIES[5],
      ],
    ],
    [directDeps]
  );

  const filledRows = useMemo(
    () => [
      fillTrack(allMarqueeRows[0]),
      fillTrack(allMarqueeRows[1]),
      fillTrack(allMarqueeRows[2]),
    ],
    [allMarqueeRows]
  );

  const renderChip = useCallback(
    (dep: DependencyItem, key: string) => (
      <a
        key={key}
        href={getNpmPackageUrl(dep.name)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          copyChip(dep.name);
        }}
        className={cn(
          "group inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all duration-200 cursor-pointer shadow-2xs select-none shrink-0 h-[22px]",
          "bg-white/95 dark:bg-zinc-800/90 border-zinc-200/80 dark:border-zinc-700/70 text-foreground",
          "hover:bg-white dark:hover:bg-zinc-700 hover:border-pink-500/50 hover:shadow-xs hover:scale-105 active:scale-95"
        )}
        title={`Click to copy ${getInstallCommand(dep.name)}`}
      >
        {renderDependencyLogo(dep.name, true)}
        <span className="text-[10px] font-mono font-medium tracking-tight">
          {copiedChip === dep.name ? (
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
      </a>
    ),
    [copiedChip, copyChip, getInstallCommand]
  );

  return (
    <div
      className={cn(
        "rounded-[26px] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between overflow-hidden select-none",
        className || "h-[185px] absolute bottom-0 right-0 z-20"
      )}
      style={width ? { width } : undefined}
    >
      {/* Background Isometric Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <defs>
          <pattern
            id="dep-iso-blocks-pattern"
            width="36"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="18,0 36,5 18,10 0,5"
              className="fill-zinc-400/[0.04] dark:fill-white/[0.02] stroke-zinc-300/40 dark:stroke-white/[0.06]"
              strokeWidth="0.7"
            />
            <polygon
              points="0,5 18,10 18,20 0,15"
              className="fill-transparent stroke-zinc-300/30 dark:stroke-white/[0.04]"
              strokeWidth="0.7"
            />
            <polygon
              points="18,10 36,5 36,15 18,20"
              className="fill-zinc-400/[0.02] dark:fill-white/[0.01] stroke-zinc-300/30 dark:stroke-white/[0.04]"
              strokeWidth="0.7"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dep-iso-blocks-pattern)"
          style={{
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 85%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 85%)",
          }}
        />
      </svg>

      {/* Molded Scooped Notch in Upper-Right */}
      <svg
        className="absolute top-0 right-0 pointer-events-none overflow-visible z-1"
        width="210"
        height="40"
        viewBox="0 0 210 40"
      >
        <path
          d="M 0 0 C 14 0, 18 36, 32 36 L 210 36 L 210 0 Z"
          className="fill-zinc-100/60 dark:fill-zinc-950/50"
        />
        <path
          d="M 0 0 C 14 0, 18 36, 32 36 L 210 36"
          className="fill-none stroke-zinc-200/90 dark:stroke-zinc-800"
          strokeWidth="1.5"
        />
      </svg>

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

      {/* Content: Dynamic Marquee Tracks or Filtered Chips */}
      {(() => {
        if (depFilter === "all") {
          return (
            <motion.div
              key="marquee-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="flex-1 flex flex-col justify-center gap-1.5 py-1.5 overflow-hidden relative z-10"
            >
              {MARQUEE_TRACKS.map((track) => {
                const animClass =
                  track.direction === "ltr" ? "animate-marquee-ltr" : "animate-marquee-rtl";
                return (
                  <div
                    key={track.id}
                    className="marquee-track transform-gpu [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"
                  >
                    <div className={cn("marquee-group", animClass)} style={{ animationDuration: "32s" }}>
                      {filledRows[track.rowIdx].map((dep, idx) =>
                        renderChip(dep, `${track.id}-a-${idx}-${dep.name}`)
                      )}
                    </div>
                    <div
                      className={cn("marquee-group", animClass)}
                      aria-hidden="true"
                      style={{ animationDuration: "32s" }}
                    >
                      {filledRows[track.rowIdx].map((dep, idx) =>
                        renderChip(dep, `${track.id}-b-${idx}-${dep.name}`)
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          );
        }

        if (depFilter === "direct") {
          const half = Math.ceil(directDeps.length / 2);
          const rowA = directDeps.slice(0, half);
          const rowB = directDeps.slice(half);

          return (
            <motion.div
              key="static-direct"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="flex-1 flex flex-col justify-center gap-2.5 px-3.5 py-1 z-10"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {rowA.map((dep, idx) => renderChip(dep, `d-rowa-${dep.name}-${idx}`))}
              </div>
              {rowB.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {rowB.map((dep, idx) => renderChip(dep, `d-rowb-${dep.name}-${idx}`))}
                </div>
              )}
            </motion.div>
          );
        }

        return (
          <motion.div
            key="static-peer"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="flex-1 flex flex-col justify-center gap-2 px-3.5 py-1 z-10"
          >
            <div className="flex items-center gap-2 flex-wrap">
              {PEER_DEPENDENCIES.slice(0, 2).map((dep, idx) =>
                renderChip(dep, `p-0-${dep.name}-${idx}`)
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {PEER_DEPENDENCIES.slice(2, 4).map((dep, idx) =>
                renderChip(dep, `p-1-${dep.name}-${idx}`)
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {PEER_DEPENDENCIES.slice(4).map((dep, idx) =>
                renderChip(dep, `p-2-${dep.name}-${idx}`)
              )}
            </div>
          </motion.div>
        );
      })()}

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
