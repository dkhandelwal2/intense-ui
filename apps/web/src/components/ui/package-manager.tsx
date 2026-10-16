"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  PackageManagerLogo,
  PACKAGE_MANAGERS,
  type PackageManager,
  type PackageManagerLogoProps,
} from "@/icons";

export { PackageManagerLogo, PACKAGE_MANAGERS, type PackageManager, type PackageManagerLogoProps };

export interface PackageManagerSelectorProps {
  value: PackageManager;
  onChange: (pm: PackageManager) => void;
  className?: string;
  size?: "sm" | "default";
  activeClassName?: string;
  inactiveClassName?: string;
}

export function PackageManagerSelector({
  value,
  onChange,
  className,
  size = "default",
  activeClassName = "bg-[var(--theme-primary)] text-white shadow-sm font-bold",
  inactiveClassName = "text-zinc-400 hover:text-white",
}: PackageManagerSelectorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-white/5 p-1 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className
      )}
    >
      {PACKAGE_MANAGERS.map((pm) => {
        const isSelected = value === pm;
        return (
          <button
            key={pm}
            type="button"
            onClick={() => onChange(pm)}
            className={cn(
              "rounded-lg font-mono transition-all inline-flex items-center gap-1.5 shrink-0 select-none",
              size === "sm" ? "px-2 py-1 text-[11px]" : "px-2.5 py-1 text-xs",
              isSelected ? activeClassName : inactiveClassName
            )}
          >
            <PackageManagerLogo
              pm={pm}
              colored={!isSelected}
              className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"}
            />
            <span>{pm}</span>
          </button>
        );
      })}
    </div>
  );
}
