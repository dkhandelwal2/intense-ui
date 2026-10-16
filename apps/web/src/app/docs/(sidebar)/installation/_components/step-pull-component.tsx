"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Terminal,
  RotateCcw,
  Play,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PackageManager, PackageManagerSelector } from "@/components/ui/package-manager";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { ScrollStepCard } from "./scroll-step-card";
import {
  ComponentSlug,
  COMPONENTS_LIST,
  getAddCommand,
} from "./constants";

export interface StepPullComponentProps {
  stepNumber: string;
  selectedPm: PackageManager;
  onSelectPm: (pm: PackageManager) => void;
}

export function StepPullComponent({
  stepNumber,
  selectedPm,
  onSelectPm,
}: StepPullComponentProps) {
  const [selectedComp, setSelectedComp] = useState<ComponentSlug>("switch");
  const [hasCopied, setHasCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const currentAddCmd = getAddCommand(selectedPm, selectedComp);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAddCmd);
    setHasCopied(true);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 500);
    setTimeout(() => setSimStep(3), 1100);
    setTimeout(() => setSimStep(4), 1700);
    setTimeout(() => {
      setSimStep(5);
      setIsSimulating(false);
      toast.success(`Simulation of ${selectedComp} completed!`);
    }, 2400);
  };

  return (
    <ScrollStepCard
      stepNumber={stepNumber}
      badgeText={`STEP ${stepNumber} // PULL COMPONENT`}
      badgeColor="text-purple-400 bg-purple-500/10 border-purple-500/20"
      icon={<Package className="w-6 h-6 text-white" />}
      glowColor="from-purple-500/40 to-indigo-500/20"
      numberGradient="from-purple-400 via-indigo-400 to-sky-400"
      numberShadow="drop-shadow-[0_10px_35px_rgba(168,85,247,0.25)]"
      iconGradient="bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_25px_rgba(168,85,247,0.45)]"
      borderHoverColor="hover:border-purple-500/40"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg sm:text-2xl font-bold text-zinc-950 dark:text-white">
            Add any Intense UI component
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-purple-500/10 text-purple-400 border border-purple-500/20 whitespace-nowrap shrink-0">
            Universal Command
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
          Install any component using its name. The CLI pulls pure source code into your <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-200/50 dark:bg-white/10 px-1 py-0.5 rounded">components/ui/</code> folder.
        </p>
      </div>

      {/* Interactive Terminal Experience */}
      <TerminalWindow
        title="intense-ui-cli"
        headerAction={
          <PackageManagerSelector
            value={selectedPm}
            onChange={onSelectPm}
            activeClassName="bg-purple-600 text-white shadow-sm font-bold"
            inactiveClassName="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
          />
        }
      >
        {/* Component Selector Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 bg-black/[0.02] dark:bg-white/[0.01] border-b border-black/5 dark:border-white/5 overflow-x-auto hide-scrollbar min-w-0">
          <span className="text-[11px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400 shrink-0 mr-1">Component:</span>
          {COMPONENTS_LIST.map((comp) => (
            <button
              key={comp.slug}
              onClick={() => {
                setSelectedComp(comp.slug);
                setSimStep(0);
                setIsSimulating(false);
              }}
              className={cn(
                "relative shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border",
                selectedComp === comp.slug
                  ? "bg-purple-500/15 dark:bg-purple-500/20 border-purple-500 text-purple-700 dark:text-white shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                  : "bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-black/10 dark:hover:border-white/20"
              )}
            >
              {comp.icon}
              <span>{comp.label}</span>
            </button>
          ))}
        </div>

        {/* Terminal Content Area */}
        <div className="p-3 sm:p-6 font-mono text-xs sm:text-sm space-y-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1 min-w-0 flex-1">
              <span className="text-purple-500 dark:text-purple-400 font-bold select-none">&gt;</span>
              <span className="text-zinc-900 dark:text-white select-all font-mono whitespace-nowrap text-xs sm:text-sm">{currentAddCmd}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border",
                  isSimulating
                    ? "bg-black/[0.02] dark:bg-white/5 border-black/5 dark:border-white/10 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
                    : "bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border-black/10 dark:border-white/10 text-zinc-800 dark:text-white hover:border-purple-500/40 active:scale-95"
                )}
                title="Simulate the installation flow"
              >
                {isSimulating ? (
                  <RotateCcw className="w-3.5 h-3.5 animate-spin text-purple-500 dark:text-purple-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                )}
                <span>{isSimulating ? "Running..." : "Test Run"}</span>
              </button>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] active:scale-95"
              >
                {hasCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{hasCopied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Live Simulated CLI Output Box */}
          <AnimatePresence>
            {simStep > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-3 sm:pt-4 border-t border-black/5 dark:border-white/10 space-y-2 text-xs"
              >
                {simStep >= 1 && (
                  <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <span className="text-blue-500 dark:text-blue-400">ℹ</span>
                    <span className="truncate">Connecting to registry: <span className="text-zinc-900 dark:text-zinc-200">github.com/dkhandelwal2/intense-ui</span></span>
                  </motion.div>
                )}
                {simStep >= 2 && (
                  <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>Matched item: <span className="text-emerald-600 dark:text-emerald-300 font-semibold">{selectedComp}</span> (registry:ui)</span>
                  </motion.div>
                )}
                {simStep >= 3 && (
                  <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>Resolved dependencies: <span className="text-purple-600 dark:text-purple-300">framer-motion</span>, <span className="text-purple-600 dark:text-purple-300">lucide-react</span></span>
                  </motion.div>
                )}
                {simStep >= 4 && (
                  <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>Injected to <span className="text-purple-600 dark:text-purple-300 font-semibold">src/components/ui/{selectedComp}.tsx</span></span>
                  </motion.div>
                )}
                {simStep >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center justify-between text-xs"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                      Ready to import! Check Step {stepNumber === "01" ? "02" : "03"} below.
                    </span>
                    <button
                      onClick={() => setSimStep(0)}
                      className="text-[10px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline"
                    >
                      Clear
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </TerminalWindow>
    </ScrollStepCard>
  );
}
