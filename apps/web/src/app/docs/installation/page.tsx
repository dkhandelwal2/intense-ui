"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Sparkles,
  Check,
  Copy,
  ArrowRight,
  Play,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Layers,
  Cpu,
  Zap,
  Box,
  SlidersHorizontal,
  ToggleRight,
  LayoutList,
  Wrench,
  HelpCircle,
  Rocket,
  Package,
  Code2,
  Download,
  FolderGit2
} from "lucide-react";
import { toast } from "sonner";
import { CodeBlock } from "@/components/ui/code-block";
import { Switch } from "../../../../../../packages/registry/src/components/switch";
import { Slider } from "../../../../../../packages/registry/src/components/slider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "../../../../../../packages/registry/src/components/accordion";
import { cn } from "@/lib/utils";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
type ComponentSlug = "switch" | "slider" | "accordion" | "tooltip" | "animated-button";

const COMPONENTS_LIST: { slug: ComponentSlug; label: string; icon: React.ReactNode; desc: string }[] = [
  { slug: "switch", label: "Switch", icon: <ToggleRight className="w-3.5 h-3.5" />, desc: "Tactile 3D rocker switch" },
  { slug: "slider", label: "Slider", icon: <SlidersHorizontal className="w-3.5 h-3.5" />, desc: "Smooth spring-tracked slider" },
  { slug: "accordion", label: "Accordion", icon: <LayoutList className="w-3.5 h-3.5" />, desc: "Physics animated accordion" },
  { slug: "tooltip", label: "Tooltip", icon: <Sparkles className="w-3.5 h-3.5" />, desc: "Hover floating preview" },
  { slug: "animated-button", label: "Button", icon: <Box className="w-3.5 h-3.5" />, desc: "Magnetic glow button" },
];

export default function InstallationPage() {
  const [setupMode, setSetupMode] = useState<"fresh" | "existing">("fresh");
  const [selectedPm, setSelectedPm] = useState<PackageManager>("npm");
  const [selectedComp, setSelectedComp] = useState<ComponentSlug>("switch");
  const [hasCopiedTerminal, setHasCopiedTerminal] = useState(false);

  // Terminal simulator state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  // Live interactive playground state for Step 3
  const [activeLabTab, setActiveLabTab] = useState<"switch" | "slider" | "accordion">("switch");
  const [liveSwitchChecked, setLiveSwitchChecked] = useState(true);
  const [liveSliderValue, setLiveSliderValue] = useState(65);

  const getAddCommand = (pm: PackageManager, slug: string) => {
    switch (pm) {
      case "pnpm": return `pnpm dlx shadcn@latest add dkhandelwal2/intense-ui/${slug}`;
      case "bun": return `bunx --bun shadcn@latest add dkhandelwal2/intense-ui/${slug}`;
      case "yarn": return `npx shadcn@latest add dkhandelwal2/intense-ui/${slug}`;
      default: return `npx shadcn@latest add dkhandelwal2/intense-ui/${slug}`;
    }
  };

  const getInitCommand = (pm: PackageManager) => {
    switch (pm) {
      case "pnpm": return "pnpm dlx shadcn@latest init";
      case "bun": return "bunx --bun shadcn@latest init";
      case "yarn": return "npx shadcn@latest init";
      default: return "npx shadcn@latest init";
    }
  };

  const currentAddCmd = getAddCommand(selectedPm, selectedComp);

  const copyToClipboard = (text: string, onDone?: () => void) => {
    navigator.clipboard.writeText(text);
    toast.success("Command copied to clipboard!");
    if (onDone) onDone();
  };

  // Run terminal install simulation
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
    <div className="relative w-full max-w-5xl mx-auto py-6 sm:py-10 px-3 sm:px-6 md:px-8 space-y-12 sm:space-y-16 overflow-x-hidden min-w-0">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[250px] sm:h-[350px] bg-gradient-to-tr from-[var(--theme-primary)]/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-[600px] right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[var(--theme-primary)]/8 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Hero Header with Floating Tech Icons */}
      <div className="flex flex-col items-start gap-4 sm:gap-5 w-full min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/25 shadow-[0_0_15px_rgba(255,0,132,0.15)] backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Intense UI Registry v1.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-ping" />
          </motion.div>

          {/* Floating animated icon badges */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400"
          >
            <FolderGit2 className="w-3 h-3 text-[var(--theme-primary)]" />
            <span>GitHub Registry Powered</span>
          </motion.div>
        </div>

        <div className="space-y-3 w-full min-w-0">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.1] break-words"
          >
            Installation &amp;{" "}
            <span className="bg-gradient-to-r from-[var(--theme-primary)] via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Quickstart
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
          >
            No external libraries to bundle. Install components directly to your source code using the shadcn CLI with 100% ownership and zero lock-in.
          </motion.p>
        </div>

        {/* Project Setup Persona Switcher (Responsive) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 rounded-2xl bg-zinc-100 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-sm gap-1"
        >
          <button
            onClick={() => setSetupMode("fresh")}
            className={cn(
              "relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2",
              setupMode === "fresh"
                ? "text-white shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            {setupMode === "fresh" && (
              <motion.div
                layoutId="setupModePill"
                className="absolute inset-0 bg-[var(--theme-primary)] rounded-xl"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Fresh Project Setup</span>
            </span>
          </button>

          <button
            onClick={() => setSetupMode("existing")}
            className={cn(
              "relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2",
              setupMode === "existing"
                ? "text-white shadow-md"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            {setupMode === "existing" && (
              <motion.div
                layoutId="setupModePill"
                className="absolute inset-0 bg-[var(--theme-primary)] rounded-xl"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Already using shadcn</span>
            </span>
          </button>
        </motion.div>
      </div>

      {/* Interactive Terminal Experience (Fully Responsive) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-zinc-950/95 dark:bg-[#09090b]/95 shadow-2xl backdrop-blur-xl overflow-hidden min-w-0"
      >
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-6 py-3 border-b border-white/10 bg-white/[0.02] gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80 inline-block shadow-inner" />
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80 inline-block shadow-inner" />
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80 inline-block shadow-inner" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
              <span>intense-ui-cli</span>
            </span>
          </div>

          {/* Package Manager Selector Tabs */}
          <div className="flex items-center justify-start gap-1 bg-white/5 p-1 rounded-xl border border-white/10 self-start sm:self-auto overflow-x-auto">
            {(["npm", "pnpm", "yarn", "bun"] as PackageManager[]).map((pm) => (
              <button
                key={pm}
                onClick={() => setSelectedPm(pm)}
                className={cn(
                  "px-2.5 py-1 text-xs font-mono rounded-lg transition-all",
                  selectedPm === pm
                    ? "bg-[var(--theme-primary)] text-white shadow-sm font-bold"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        {/* Component Selector Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 bg-white/[0.01] border-b border-white/5 overflow-x-auto hide-scrollbar min-w-0">
          <span className="text-[11px] sm:text-xs font-medium text-zinc-400 shrink-0 mr-1">Component:</span>
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
                  ? "bg-[var(--theme-primary)]/20 border-[var(--theme-primary)] text-white shadow-[0_0_12px_rgba(255,0,132,0.3)]"
                  : "bg-white/[0.03] border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
              )}
            >
              {comp.icon}
              <span>{comp.label}</span>
            </button>
          ))}
        </div>

        {/* Terminal Content Area (Responsive Stacking) */}
        <div className="p-3 sm:p-6 font-mono text-xs sm:text-sm space-y-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1 min-w-0 flex-1">
              <span className="text-[var(--theme-primary)] font-bold select-none">&gt;</span>
              <span className="text-white select-all font-mono whitespace-nowrap text-xs sm:text-sm">{currentAddCmd}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border",
                  isSimulating
                    ? "bg-white/5 border-white/10 text-zinc-500 cursor-not-allowed"
                    : "bg-white/10 hover:bg-white/15 border-white/10 text-white hover:border-[var(--theme-primary)]/40 active:scale-95"
                )}
                title="Simulate the installation flow"
              >
                {isSimulating ? (
                  <RotateCcw className="w-3.5 h-3.5 animate-spin text-[var(--theme-primary)]" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                )}
                <span>{isSimulating ? "Running..." : "Test Run"}</span>
              </button>

              <button
                onClick={() =>
                  copyToClipboard(currentAddCmd, () => {
                    setHasCopiedTerminal(true);
                    setTimeout(() => setHasCopiedTerminal(false), 2000);
                  })
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--theme-primary)] hover:opacity-90 text-white text-xs font-semibold transition-all shadow-[0_0_15px_rgba(255,0,132,0.3)] active:scale-95"
              >
                {hasCopiedTerminal ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{hasCopiedTerminal ? "Copied!" : "Copy"}</span>
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
                className="pt-3 sm:pt-4 border-t border-white/10 space-y-2 text-xs"
              >
                {simStep >= 1 && (
                  <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-zinc-400">
                    <span className="text-blue-400">ℹ</span>
                    <span className="truncate">Connecting to registry: <span className="text-zinc-200">github.com/dkhandelwal2/intense-ui</span></span>
                  </motion.div>
                )}
                {simStep >= 2 && (
                  <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Matched item: <span className="text-emerald-300 font-semibold">{selectedComp}</span> (registry:ui)</span>
                  </motion.div>
                )}
                {simStep >= 3 && (
                  <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Resolved dependencies: <span className="text-purple-300">framer-motion</span>, <span className="text-purple-300">lucide-react</span></span>
                  </motion.div>
                )}
                {simStep >= 4 && (
                  <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Injected to <span className="text-pink-300">src/components/ui/{selectedComp}.tsx</span></span>
                  </motion.div>
                )}
                {simStep >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold flex items-center justify-between text-xs"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Ready to import! Check Step 3 below.
                    </span>
                    <button
                      onClick={() => setSimStep(0)}
                      className="text-[10px] text-zinc-400 hover:text-white underline"
                    >
                      Clear
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Futuristic Guided Steps with Animated Energy Conduit */}
      <div className="relative space-y-10 sm:space-y-14 w-full min-w-0">
        {/* Animated Laser Beam Conduit connecting steps */}
        <div className="hidden sm:block absolute left-[26px] top-8 bottom-8 w-1 rounded-full bg-zinc-200 dark:bg-white/10 pointer-events-none overflow-hidden">
          {/* Laser Gradient Beam */}
          <div className="w-full h-full bg-gradient-to-b from-[var(--theme-primary)] via-purple-500 to-indigo-500 opacity-60" />
          {/* Traveling energy photon */}
          <motion.div
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-white to-transparent blur-[1px]"
          />
        </div>

        {/* STEP 1: Project Initialization */}
        <AnimatePresence>
          {setupMode === "fresh" && (
            <motion.div
              key="step-init"
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: -20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col sm:flex-row items-start gap-3 sm:gap-7 group w-full min-w-0"
            >
              {/* Modern Animated Step Node Avatar */}
              <div className="relative shrink-0 flex items-center gap-3 sm:block">
                <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[var(--theme-primary)] to-pink-600 text-white shadow-[0_0_30px_rgba(255,0,132,0.5)] z-10 border border-white/20">
                  {/* Subtle radar pulse animation */}
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-2xl bg-[var(--theme-primary)]/40 blur-sm pointer-events-none"
                  />
                  <Terminal className="w-6 h-6 text-white" />
                  <Rocket className="w-3.5 h-3.5 text-pink-200 absolute -top-1 -right-1" />
                </div>
                <span className="sm:hidden text-xs font-mono font-bold uppercase tracking-wider text-[var(--theme-primary)]">
                  Step 01 // Initialize
                </span>
              </div>

              {/* Step Card Body */}
              <div className="flex-1 w-full min-w-0 rounded-2xl sm:rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50/70 dark:bg-white/[0.02] p-4 sm:p-7 backdrop-blur-md space-y-4 hover:border-[var(--theme-primary)]/40 hover:shadow-lg transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="hidden sm:inline-block text-[10px] font-mono font-bold tracking-widest uppercase text-[var(--theme-primary)]">
                      Step 01 // Project Setup
                    </span>
                    <h3 className="text-base sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                      <span>Initialize shadcn in your project</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        One-Time Only
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      Generates <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-200/50 dark:bg-white/10 px-1 py-0.5 rounded">components.json</code> and configures your <code className="font-mono">@/*</code> path alias in TypeScript.
                    </p>
                  </div>
                </div>

                {/* Command Block */}
                <div className="w-full max-w-full overflow-hidden rounded-xl sm:rounded-2xl border border-black/5 dark:border-white/10">
                  <CodeBlock code={getInitCommand(selectedPm)} language="bash" />
                </div>

                <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-3 sm:p-3.5 text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Why is this needed?</strong> The shadcn CLI requires <code className="font-mono">components.json</code> to configure your components folder. Without it, running <code className="font-mono">shadcn add</code> will throw a configuration error.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 2: Add Component */}
        <div className="relative flex flex-col sm:flex-row items-start gap-3 sm:gap-7 group w-full min-w-0">
          {/* Modern Animated Step Node Avatar */}
          <div className="relative shrink-0 flex items-center gap-3 sm:block">
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.45)] z-10 border border-white/20">
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-0 rounded-2xl bg-purple-500/40 blur-sm pointer-events-none"
              />
              <Package className="w-6 h-6 text-white" />
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-1 -right-1"
              >
                <Download className="w-3.5 h-3.5 text-purple-200" />
              </motion.div>
            </div>
            <span className="sm:hidden text-xs font-mono font-bold uppercase tracking-wider text-purple-500">
              {setupMode === "fresh" ? "Step 02 // Pull Component" : "Step 01 // Pull Component"}
            </span>
          </div>

          {/* Step Card Body */}
          <div className="flex-1 w-full min-w-0 rounded-2xl sm:rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50/70 dark:bg-white/[0.02] p-4 sm:p-7 backdrop-blur-md space-y-4 hover:border-purple-500/40 hover:shadow-lg transition-all">
            <div>
              <span className="hidden sm:inline-block text-[10px] font-mono font-bold tracking-widest uppercase text-purple-500">
                {setupMode === "fresh" ? "Step 02 // Pull Component" : "Step 01 // Pull Component"}
              </span>
              <h3 className="text-base sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <span>Add any Intense UI component</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  Universal Syntax
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Install any component using its slug. The CLI automatically places source code into <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-200/50 dark:bg-white/10 px-1 py-0.5 rounded">components/ui/</code> and configures required animations.
              </p>
            </div>

            {/* Command Block */}
            <div className="w-full max-w-full overflow-hidden rounded-xl sm:rounded-2xl border border-black/5 dark:border-white/10">
              <CodeBlock code={currentAddCmd} language="bash" />
            </div>

            {/* Interactive component chips */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Click to select:</span>
              {COMPONENTS_LIST.map((comp) => (
                <button
                  key={comp.slug}
                  onClick={() => setSelectedComp(comp.slug)}
                  className={cn(
                    "px-2.5 sm:px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 border",
                    selectedComp === comp.slug
                      ? "bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-sm"
                      : "bg-zinc-100 dark:bg-white/5 border-black/5 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-[var(--theme-primary)]/40 active:scale-95"
                  )}
                >
                  {comp.icon}
                  <span>{comp.slug}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STEP 3: Universal Import & Live Interactive Lab */}
        <div className="relative flex flex-col sm:flex-row items-start gap-3 sm:gap-7 group w-full min-w-0">
          {/* Modern Animated Step Node Avatar */}
          <div className="relative shrink-0 flex items-center gap-3 sm:block">
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.45)] z-10 border border-white/20">
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute inset-0 rounded-2xl bg-indigo-500/40 blur-sm pointer-events-none"
              />
              <Code2 className="w-6 h-6 text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </motion.div>
            </div>
            <span className="sm:hidden text-xs font-mono font-bold uppercase tracking-wider text-indigo-500">
              {setupMode === "fresh" ? "Step 03 // Live Demo Lab" : "Step 02 // Live Demo Lab"}
            </span>
          </div>

          {/* Step Card Body */}
          <div className="flex-1 w-full min-w-0 rounded-2xl sm:rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50/70 dark:bg-white/[0.02] p-4 sm:p-7 backdrop-blur-md space-y-5 hover:border-indigo-500/40 hover:shadow-lg transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="hidden sm:inline-block text-[10px] font-mono font-bold tracking-widest uppercase text-indigo-500">
                  {setupMode === "fresh" ? "Step 03 // Live Sandbox" : "Step 02 // Live Sandbox"}
                </span>
                <h3 className="text-base sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <span>Import &amp; use with universal syntax</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Live Demo Lab
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Import directly from your local <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-200/50 dark:bg-white/10 px-1 py-0.5 rounded">@/components/ui/</code> folder. Test them live below:
                </p>
              </div>

              {/* Lab component switcher */}
              <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/10 self-start sm:self-auto overflow-x-auto">
                {(["switch", "slider", "accordion"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveLabTab(tab)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all",
                      activeLabTab === tab
                        ? "bg-[var(--theme-primary)] text-white shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Canvas + Code Split (Responsive) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch w-full min-w-0">
              {/* Interactive Preview Canvas */}
              <div className="lg:col-span-5 rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 p-5 sm:p-6 flex flex-col items-center justify-center gap-4 relative min-h-[200px] sm:min-h-[220px] shadow-inner overflow-hidden w-full min-w-0">
                <div className="absolute top-3 left-3 text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                  Interactive Preview
                </div>

                <AnimatePresence mode="wait">
                  {activeLabTab === "switch" && (
                    <motion.div
                      key="demo-switch"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <Switch
                        checked={liveSwitchChecked}
                        onChange={(checked) => setLiveSwitchChecked(checked)}
                        size="lg"
                      />
                      <span className="text-xs font-mono text-zinc-500">
                        State: <strong className="text-[var(--theme-primary)]">{liveSwitchChecked ? "ON (true)" : "OFF (false)"}</strong>
                      </span>
                    </motion.div>
                  )}

                  {activeLabTab === "slider" && (
                    <motion.div
                      key="demo-slider"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="w-full max-w-[240px] flex flex-col items-center gap-3"
                    >
                      <Slider
                        value={liveSliderValue}
                        min={0}
                        max={100}
                        onChange={(val) => setLiveSliderValue(val)}
                      />
                      <span className="text-xs font-mono text-zinc-500">
                        Value: <strong className="text-[var(--theme-primary)]">{liveSliderValue}%</strong>
                      </span>
                    </motion.div>
                  )}

                  {activeLabTab === "accordion" && (
                    <motion.div
                      key="demo-accordion"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="w-full"
                    >
                      <Accordion type="single" collapsible defaultValue="item-1" className="w-full text-xs">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="py-2.5 text-xs font-medium">
                            Is it animated?
                          </AccordionTrigger>
                          <AccordionContent className="text-xs text-zinc-500">
                            Yes! Smooth Framer Motion spring physics.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Corresponding Source Code */}
              <div className="lg:col-span-7 w-full max-w-full overflow-hidden rounded-xl sm:rounded-2xl border border-black/5 dark:border-white/10">
                <AnimatePresence mode="wait">
                  {activeLabTab === "switch" && (
                    <motion.div
                      key="code-switch"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full max-w-full overflow-hidden"
                    >
                      <CodeBlock
                        filename="src/app/page.tsx"
                        language="tsx"
                        code={`import { Switch } from "@/components/ui/switch";

export default function Demo() {
  return (
    <Switch
      checked={true}
      onChange={(val) => console.log(val)}
      size="lg"
    />
  );
}`}
                      />
                    </motion.div>
                  )}

                  {activeLabTab === "slider" && (
                    <motion.div
                      key="code-slider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full max-w-full overflow-hidden"
                    >
                      <CodeBlock
                        filename="src/app/page.tsx"
                        language="tsx"
                        code={`import { Slider } from "@/components/ui/slider";

export default function Demo() {
  return (
    <Slider
      value={65}
      min={0}
      max={100}
      onChange={(val) => console.log(val)}
    />
  );
}`}
                      />
                    </motion.div>
                  )}

                  {activeLabTab === "accordion" && (
                    <motion.div
                      key="code-accordion"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full max-w-full overflow-hidden"
                    >
                      <CodeBlock
                        filename="src/app/page.tsx"
                        language="tsx"
                        code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Demo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes! Smooth spring physics.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Troubleshooting Bento (Fully Responsive) */}
      <div className="space-y-6 pt-4 border-t border-black/5 dark:border-white/10 w-full min-w-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">Troubleshooting Diagnostic Center</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Quick fixes for common first-time installation errors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
          {/* Card 1: Missing components.json */}
          <div className="rounded-2xl sm:rounded-3xl border border-red-500/20 bg-red-500/[0.02] dark:bg-red-500/[0.03] p-5 sm:p-6 space-y-3 hover:border-red-500/40 transition-colors w-full min-w-0 overflow-hidden">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">&quot;You need to create a components.json file&quot;</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why it happens:</strong> You ran <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">shadcn add</code> before setting up shadcn in your project root.
            </p>
            <div className="pt-1 w-full max-w-full overflow-hidden">
              <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">Run this fix:</span>
              <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
                <CodeBlock code="npx shadcn@latest init" language="bash" />
              </div>
            </div>
          </div>

          {/* Card 2: Path Alias Missing */}
          <div className="rounded-2xl sm:rounded-3xl border border-amber-500/20 bg-amber-500/[0.02] dark:bg-amber-500/[0.03] p-5 sm:p-6 space-y-3 hover:border-amber-500/40 transition-colors w-full min-w-0 overflow-hidden">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">&quot;Cannot find module &apos;@/lib/utils&apos;&quot;</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong>Why it happens:</strong> Your TypeScript config does not recognize the <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">@/*</code> path alias mapping.
            </p>
            <div className="pt-1 w-full max-w-full overflow-hidden">
              <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">Add to tsconfig.json:</span>
              <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
                <CodeBlock
                  filename="tsconfig.json"
                  language="json"
                  code={`"compilerOptions": {
  "paths": {
    "@/*": ["./src/*"]
  }
}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corrected Browse Components Link Banner */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[var(--theme-primary)] via-pink-600 to-purple-700 p-6 sm:p-8 text-white shadow-2xl overflow-hidden w-full min-w-0"
      >
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-white/20 text-white backdrop-blur-sm">
              Explore Library
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Ready to craft intense web experiences?
            </h3>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Every component is interactive, accessible, and customizable. Browse live demos, properties, and variations.
            </p>
          </div>

          {/* Corrected Link to /components */}
          <Link
            href="/components"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-white text-zinc-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-zinc-100 hover:gap-3 transition-all shrink-0 active:scale-95"
          >
            <span>Browse Components</span>
            <ArrowRight className="w-4 h-4 text-[var(--theme-primary)]" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
