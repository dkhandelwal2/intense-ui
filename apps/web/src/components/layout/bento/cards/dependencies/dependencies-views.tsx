"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DependencyItem, PackageManager } from "../../types";
import { PEER_DEPENDENCIES } from "../../constants";
import { DependencyChip } from "./dependency-chip";
import { MARQUEE_TRACKS, getPackageInstallCommand } from "./helpers";

interface DependenciesMarqueeViewProps {
  filledRows: [DependencyItem[], DependencyItem[], DependencyItem[]];
  copiedChip: string | null;
  packageManager: PackageManager;
  onCopy: (name: string) => void;
}

export const DependenciesMarqueeView = React.memo(function DependenciesMarqueeView({
  filledRows,
  copiedChip,
  packageManager,
  onCopy,
}: DependenciesMarqueeViewProps) {
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
              {filledRows[track.rowIdx].map((dep, idx) => (
                <DependencyChip
                  key={`${track.id}-a-${idx}-${dep.name}`}
                  dep={dep}
                  isCopied={copiedChip === dep.name}
                  installCommand={getPackageInstallCommand(dep.name, packageManager)}
                  onCopy={onCopy}
                />
              ))}
            </div>
            <div
              className={cn("marquee-group", animClass)}
              aria-hidden="true"
              style={{ animationDuration: "32s" }}
            >
              {filledRows[track.rowIdx].map((dep, idx) => (
                <DependencyChip
                  key={`${track.id}-b-${idx}-${dep.name}`}
                  dep={dep}
                  isCopied={copiedChip === dep.name}
                  installCommand={getPackageInstallCommand(dep.name, packageManager)}
                  onCopy={onCopy}
                  isDuplicate={true}
                />
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
});

interface DependenciesStaticViewProps {
  depFilter: "direct" | "peer";
  directDeps: DependencyItem[];
  copiedChip: string | null;
  packageManager: PackageManager;
  onCopy: (name: string) => void;
}

export const DependenciesStaticView = React.memo(function DependenciesStaticView({
  depFilter,
  directDeps,
  copiedChip,
  packageManager,
  onCopy,
}: DependenciesStaticViewProps) {
  if (depFilter === "direct") {
    const half = Math.ceil(directDeps.length / 2);
    return (
      <motion.div
        key="static-direct"
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="flex-1 flex flex-col justify-center gap-2.5 px-3.5 py-1 z-10"
      >
        <div className="flex items-center gap-2 flex-wrap">
          {directDeps.slice(0, half).map((dep, idx) => (
            <DependencyChip
              key={`d-rowa-${dep.name}-${idx}`}
              dep={dep}
              isCopied={copiedChip === dep.name}
              installCommand={getPackageInstallCommand(dep.name, packageManager)}
              onCopy={onCopy}
            />
          ))}
        </div>
        {directDeps.length > 1 && (
          <div className="flex items-center gap-2 flex-wrap">
            {directDeps.slice(half).map((dep, idx) => (
              <DependencyChip
                key={`d-rowb-${dep.name}-${idx}`}
                dep={dep}
                isCopied={copiedChip === dep.name}
                installCommand={getPackageInstallCommand(dep.name, packageManager)}
                onCopy={onCopy}
              />
            ))}
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
        {PEER_DEPENDENCIES.slice(0, 2).map((dep, idx) => (
          <DependencyChip
            key={`p-0-${dep.name}-${idx}`}
            dep={dep}
            isCopied={copiedChip === dep.name}
            installCommand={getPackageInstallCommand(dep.name, packageManager)}
            onCopy={onCopy}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {PEER_DEPENDENCIES.slice(2, 4).map((dep, idx) => (
          <DependencyChip
            key={`p-1-${dep.name}-${idx}`}
            dep={dep}
            isCopied={copiedChip === dep.name}
            installCommand={getPackageInstallCommand(dep.name, packageManager)}
            onCopy={onCopy}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {PEER_DEPENDENCIES.slice(4).map((dep, idx) => (
          <DependencyChip
            key={`p-2-${dep.name}-${idx}`}
            dep={dep}
            isCopied={copiedChip === dep.name}
            installCommand={getPackageInstallCommand(dep.name, packageManager)}
            onCopy={onCopy}
          />
        ))}
      </div>
    </motion.div>
  );
});
