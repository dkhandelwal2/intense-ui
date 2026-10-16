"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TerminalWindowProps {
  title?: string;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function TerminalWindow({
  title = "terminal",
  icon,
  headerAction,
  children,
  className,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#09090b]/95 shadow-xl backdrop-blur-xl overflow-hidden min-w-0 transition-colors",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-white/[0.02] gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80 inline-block shadow-inner" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80 inline-block shadow-inner" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80 inline-block shadow-inner" />
          </div>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
          <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
            {icon || <Terminal className="w-3.5 h-3.5 text-[var(--theme-primary)]" />}
            <span>{title}</span>
          </span>
        </div>
        {headerAction}
      </div>
      {children}
    </div>
  );
}
