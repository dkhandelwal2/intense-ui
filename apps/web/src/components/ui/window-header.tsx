"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface WindowDotsProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WindowDots({ size = "md", className }: WindowDotsProps) {
  const dotSize =
    size === "sm"
      ? "w-2.5 h-2.5"
      : size === "lg"
        ? "w-3.5 h-3.5"
        : "w-2.5 h-2.5 sm:w-3 sm:h-3";

  return (
    <div className={cn("flex items-center gap-1.5 sm:gap-2 shrink-0", className)}>
      <span
        className={cn(
          dotSize,
          "rounded-full bg-[#ff5f56] border border-[#e0443e]/40 shadow-xs inline-block"
        )}
      />
      <span
        className={cn(
          dotSize,
          "rounded-full bg-[#ffbd2e] border border-[#dea123]/40 shadow-xs inline-block"
        )}
      />
      <span
        className={cn(
          dotSize,
          "rounded-full bg-[#27c93f] border border-[#1aab29]/40 shadow-xs inline-block"
        )}
      />
    </div>
  );
}

export interface WindowHeaderProps {
  title?: React.ReactNode;
  prompt?: React.ReactNode;
  icon?: React.ReactNode;
  divider?: boolean;
  action?: React.ReactNode;
  dotSize?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function WindowHeader({
  title = "preview",
  prompt = ">_",
  icon,
  divider = true,
  action,
  dotSize = "md",
  className,
  children,
}: WindowHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100/60 dark:bg-black/40 rounded-t-xl select-none",
        className
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        {/* macOS Browser Dots */}
        <WindowDots size={dotSize} />

        {/* Divider */}
        {divider && (
          <span className="h-3.5 w-px bg-zinc-300 dark:bg-zinc-700/80 mx-1.5 sm:mx-2 shrink-0" />
        )}

        {/* Terminal Title / Prompt */}
        {(prompt || icon || title) && (
          <div className="flex items-center gap-1.5 font-mono text-xs min-w-0">
            {prompt && (
              <span className="text-[var(--theme-primary)] font-bold tracking-tight shrink-0">
                {prompt}
              </span>
            )}
            {icon && <span className="shrink-0">{icon}</span>}
            {title && (
              <span className="text-zinc-600 dark:text-zinc-300 font-medium truncate">
                {title}
              </span>
            )}
          </div>
        )}

        {children}
      </div>

      {action && (
        <div className="flex items-center gap-2 shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
