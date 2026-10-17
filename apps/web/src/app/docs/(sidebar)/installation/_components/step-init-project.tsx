"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { PackageManager, PackageManagerDropdown } from "@/components/ui/package-manager";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { ScrollStepCard } from "./scroll-step-card";
import { getInitCommand } from "./constants";

export interface StepInitProjectProps {
  selectedPm: PackageManager;
  onSelectPm: (pm: PackageManager) => void;
}

export function StepInitProject({
  selectedPm,
  onSelectPm,
}: StepInitProjectProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    const cmd = getInitCommand(selectedPm);
    navigator.clipboard.writeText(cmd);
    setHasCopied(true);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <ScrollStepCard
      stepNumber="01"
      badgeText="STEP 01 // INITIALIZE PROJECT"
      icon={<Terminal className="w-6 h-6 text-white" />}
      glowColor="from-[var(--theme-primary)]/40 to-pink-500/20"
      numberGradient="from-[var(--theme-primary)] via-pink-400 to-purple-400"
      numberShadow="drop-shadow-[0_10px_35px_rgba(255,0,132,0.25)]"
      iconGradient="bg-gradient-to-br from-[var(--theme-primary)] to-pink-600 shadow-[0_0_25px_rgba(255,0,132,0.45)]"
      borderHoverColor="hover:border-[var(--theme-primary)]/40"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg sm:text-2xl font-bold text-zinc-950 dark:text-white">
            Initialize shadcn in your project
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 whitespace-nowrap shrink-0">
            One-Time Only
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
          Generates <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-200/50 dark:bg-white/10 px-1 py-0.5 rounded">components.json</code> and configures your <code className="font-mono">@/*</code> path alias in TypeScript.
        </p>
      </div>

      {/* Terminal Window */}
      <TerminalWindow title="shadcn-init">
        {/* Command Row */}
        <div className="p-3 sm:p-5 font-mono text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <PackageManagerDropdown value={selectedPm} onChange={onSelectPm} size="sm" />
            <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 shrink-0" />
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1 min-w-0 flex-1">
              <span className="text-[var(--theme-primary)] font-bold select-none shrink-0">&gt;</span>
              <span className="text-zinc-900 dark:text-white select-all font-mono whitespace-nowrap text-xs sm:text-sm">
                {getInitCommand(selectedPm)}
              </span>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--theme-primary)] hover:opacity-90 text-white text-xs font-semibold transition-all shadow-md active:scale-95 shrink-0 self-end sm:self-auto cursor-pointer"
          >
            {hasCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{hasCopied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </TerminalWindow>

      <div className="rounded-xl bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/20 p-3.5 text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[var(--theme-primary)] shrink-0 mt-0.5" />
        <div>
          <strong>Why is this required?</strong> The shadcn CLI relies on <code className="font-mono">components.json</code> to discover your source directory and styling configuration. Without it, running <code className="font-mono">shadcn add</code> prompts a preset configuration error.
        </div>
      </div>
    </ScrollStepCard>
  );
}
