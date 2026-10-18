"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { WindowHeader } from "./window-header";

export interface TerminalWindowProps {
  title?: string;
  icon?: React.ReactNode;
  prompt?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export function TerminalWindow({
  title = "terminal",
  icon,
  prompt,
  headerAction,
  children,
  className,
  headerClassName,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#09090b]/95 shadow-xl backdrop-blur-xl overflow-hidden min-w-0 transition-colors",
        className
      )}
    >
      <WindowHeader
        title={title}
        prompt={prompt}
        icon={icon || (!prompt && <Terminal className="w-3.5 h-3.5 text-[var(--theme-primary)]" />)}
        action={headerAction}
        className={cn(
          "px-3 sm:px-6 py-2.5 sm:py-3 border-b-zinc-200/80 dark:border-b-zinc-800/80 bg-zinc-100/50 dark:bg-white/[0.02] rounded-none",
          headerClassName
        )}
      />
      {children}
    </div>
  );
}

export { WindowHeader, WindowDots } from "./window-header";
