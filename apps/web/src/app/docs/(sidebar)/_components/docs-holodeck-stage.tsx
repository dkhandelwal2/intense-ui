"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Sparkles,
  Zap,
  Sliders,
  Terminal,
  ArrowDown,
  Layers,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ProgressCircular } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function DocsHolodeckStage() {
  const runwayRef = useRef<HTMLDivElement>(null);

  // Track scroll position through the 300vh Holodeck runway
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  // Active chapter state
  const [activeChapter, setActiveChapter] = useState<0 | 1 | 2 | 3>(0);
  const [signatureProgress, setSignatureProgress] = useState(0);
  const [tactileSliderVal, setTactileSliderVal] = useState(30);
  const [hapticSwitch, setHapticSwitch] = useState(false);

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      if (v < 0.26) {
        setActiveChapter(0);
        setSignatureProgress(Math.min(Math.round((v / 0.26) * 100), 100));
      } else if (v < 0.52) {
        setActiveChapter(1);
      } else if (v < 0.78) {
        setActiveChapter(2);
        const mapped = Math.round(20 + ((v - 0.52) / 0.26) * 75);
        setTactileSliderVal(Math.min(Math.max(mapped, 20), 95));
        setHapticSwitch(v > 0.65);
      } else {
        setActiveChapter(3);
      }
    });
  }, [smoothProgress]);

  // 3D Perspective Transformations based on scroll
  const holodeckRotateX = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [14, 2, -4, 0]);
  const holodeckRotateZ = useTransform(smoothProgress, [0, 0.45, 0.75, 1], [-2, 4, -2, 0]);
  const holodeckScale = useTransform(smoothProgress, [0, 0.5, 1], [0.94, 1, 0.98]);

  const scrollToChapter = (chapterIdx: number) => {
    setActiveChapter(chapterIdx as any);
    if (!runwayRef.current) return;
    const top = runwayRef.current.offsetTop;
    const height = runwayRef.current.offsetHeight;
    const targetY = top + (chapterIdx / 3) * (height - window.innerHeight);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section ref={runwayRef} className="relative w-full h-[340vh] select-none">
      {/* Sticky Holodeck Viewport pinned to viewport as user scrolls */}
      <div className="sticky top-20 sm:top-24 z-20 flex flex-col items-center w-full">
        {/* Floating Holodeck Badge */}
        <div className="flex flex-col items-center text-center mb-5 sm:mb-7">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-widest text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 shadow-xs mb-2">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>The Spatial Holodeck</span>
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Scroll to Drive the Matrix
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500 max-w-md">
            Scroll down to watch the holodeck morph between vector lasers, 3D depth, and tactile haptics.
          </p>
        </div>

        {/* 3D Kinetic Stage */}
        <motion.div
          style={{
            rotateX: holodeckRotateX,
            rotateZ: holodeckRotateZ,
            scale: holodeckScale,
            transformPerspective: 1400,
          }}
          className="relative w-full max-w-4xl rounded-[32px] sm:rounded-[40px] border border-black/10 dark:border-white/15 bg-gradient-to-b from-white/95 via-zinc-50/95 to-zinc-100/95 dark:from-[#0e0e11]/95 dark:via-[#09090b]/95 dark:to-black/95 p-6 sm:p-10 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_90px_rgba(255,0,132,0.12)] overflow-hidden min-h-[460px] sm:min-h-[520px] flex flex-col justify-between"
        >
          {/* Ambient Specular Highlight & Atmospheric Lighting */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[380px] sm:w-[600px] h-[160px] bg-gradient-to-b from-[var(--theme-primary)]/25 to-transparent blur-3xl -z-10 rounded-full" />
          <div className="pointer-events-none absolute -bottom-24 right-10 w-72 h-72 bg-purple-500/15 blur-3xl -z-10 rounded-full" />

          {/* Titanium Header Bar */}
          <div>
            <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-zinc-400">
                  spatial-holodeck.matrix
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[11px] font-bold border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  60+ FPS Real-Time
                </span>
              </div>
            </div>

            {/* Quick Chapter Pill Controller */}
            <div className="flex items-center justify-between sm:justify-start gap-1 sm:gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 overflow-x-auto hide-scrollbar mb-6 w-full sm:w-auto">
              {[
                { label: "01. Laser Signature", short: "01. Laser", id: 0 },
                { label: "02. 3D Spatial Grid", short: "02. 3D Grid", id: 1 },
                { label: "03. Tactile Sliders", short: "03. Sliders", id: 2 },
                { label: "04. Registry CLI", short: "04. CLI", id: 3 },
              ].map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToChapter(ch.id)}
                  className={cn(
                    "px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all shrink-0 cursor-pointer",
                    activeChapter === ch.id
                      ? "bg-[var(--theme-primary)] text-white shadow-md shadow-[var(--theme-primary)]/20"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  )}
                >
                  <span className="hidden lg:inline">{ch.label}</span>
                  <span className="lg:hidden">{ch.short}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE CHAPTER STAGE VIEWPORT */}
          <div className="flex-1 min-h-0 flex flex-col justify-center my-auto">
            {/* CHAPTER 0: LASER VECTOR SIGNATURE */}
            {activeChapter === 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--theme-primary)] font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                    Chapter 01: Dynamic Laser Calligraphy (Scroll Scrubbed)
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    Stroke: {signatureProgress}%
                  </span>
                </div>

                <div className="relative w-full h-44 sm:h-52 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-950 p-4 overflow-hidden flex items-center justify-center shadow-inner">
                  {/* Subtle Grid Backdrop */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

                  <svg viewBox="0 0 500 130" className="w-full h-full max-w-[440px] z-10">
                    {/* Background Trace */}
                    <path
                      d="M 30 70 Q 80 15, 130 70 T 230 70 T 330 45 T 430 80 Q 460 95, 480 40"
                      fill="none"
                      stroke="#27272a"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Luminous Foreground Laser Stroke */}
                    <motion.path
                      d="M 30 70 Q 80 15, 130 70 T 230 70 T 330 45 T 430 80 Q 460 95, 480 40"
                      fill="none"
                      stroke="var(--theme-primary)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: signatureProgress / 100 }}
                      transition={{ ease: "linear", duration: 0.05 }}
                    />
                  </svg>

                  {/* Pulsing Glowing Laser Beacon at Pen Tip */}
                  <span className="absolute bottom-3 right-4 text-[11px] font-mono text-zinc-400">
                    Bézier curve drawn on scroll wheel
                  </span>
                </div>
              </div>
            )}

            {/* CHAPTER 1: 3D SPATIAL ISOMETRIC GRID */}
            {activeChapter === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-500 font-bold flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Chapter 02: 3D Isometric Elevation Matrix
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    Depth: Extruded
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 py-6 px-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/50">
                  {[
                    { label: "Radix ARIA", val: "100%", color: "bg-blue-500" },
                    { label: "Framer Spring", val: "60 FPS", color: "bg-[var(--theme-primary)]" },
                    { label: "Tailwind 4", val: "OKLCH", color: "bg-purple-500" },
                    { label: "Edge SSG", val: "<50ms", color: "bg-emerald-500" },
                    { label: "Hydration", val: "0 CLS", color: "bg-amber-500" },
                    { label: "Zero Lock", val: "Own Code", color: "bg-cyan-500" },
                  ].map((tile, i) => (
                    <motion.div
                      key={tile.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg flex flex-col items-center justify-center text-center cursor-pointer"
                    >
                      <span className={cn("w-2 h-2 rounded-full mb-2", tile.color)} />
                      <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100">
                        {tile.val}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 mt-0.5">
                        {tile.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CHAPTER 2: TACTILE CONTROLS & HAPTIC SWITCH */}
            {activeChapter === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-500 font-bold flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    Chapter 03: Tactile Dual Sliders &amp; Rocker Switch
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                    Value: {tactileSliderVal}%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/50 items-center">
                  <div className="sm:col-span-4 flex flex-col items-center justify-center gap-2">
                    <ProgressCircular
                      value={tactileSliderVal}
                      size={90}
                      strokeWidth={8}
                      showValue={true}
                      variant="success"
                    />
                    <span className="text-[11px] font-mono text-zinc-400">Live Buffer Fill</span>
                  </div>

                  <div className="sm:col-span-8 space-y-4">
                    <Slider
                      value={tactileSliderVal}
                      onChange={(v) => setTactileSliderVal(v)}
                      min={0}
                      max={100}
                    />

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={hapticSwitch}
                          onChange={(c) => setHapticSwitch(c)}
                          variant="rocker"
                          size="md"
                        />
                        <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                          {hapticSwitch ? "HAPTIC ENGAGED" : "HAPTIC STANDBY"}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">Magnetic Ticks</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CHAPTER 3: CLI CODE EXTRUSION */}
            {activeChapter === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-500 font-bold flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Chapter 04: One-Command Registry CLI Extrusion
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-500">
                    Ready to Deploy
                  </span>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-[#0c0c0e] p-5 font-mono text-xs text-zinc-300 space-y-2.5 shadow-2xl">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="text-[var(--theme-primary)] font-black">$</span>
                    <span className="text-zinc-100 font-bold">npx intense-ui add signature-pad</span>
                  </div>
                  <div className="pt-2 text-[11px] text-zinc-400 space-y-1">
                    <div className="text-emerald-400">✔ Ready! Source code installed into components/ui/signature-pad</div>
                    <div>✦ 100% full ownership — customize freely in your repo</div>
                    <div>✦ Zero monthly subscription • Zero runtime dependencies</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Stage Progress Indicator */}
          <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-2">
              <ArrowDown className="w-3.5 h-3.5 text-[var(--theme-primary)] animate-bounce" />
              <span>Scroll down to continue kinetic journey</span>
            </span>
            <span className="font-bold text-[var(--theme-primary)]">
              Chapter {activeChapter + 1} of 4
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
