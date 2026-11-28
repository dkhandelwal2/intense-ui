"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Sliders, PenTool, Barcode as BarcodeIcon, Layers, ShieldCheck } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Barcode } from "@/components/ui/barcode";
import { ProgressCircular } from "@/components/ui/progress";
import { SignaturePad } from "@/components/ui/signature-pad";
import { APP_ROUTES } from "@/config/site";
import { cn } from "@/lib/utils";

export function DocsInteractiveBento() {
  // Card states
  const [sliderVal, setSliderVal] = useState(65);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [barcodeFormat, setBarcodeFormat] = useState<"qr" | "code128">("qr");

  return (
    <section className="relative w-full pt-6 sm:pt-10 pb-16 sm:pb-20 select-none">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-[var(--theme-primary)]" />
          <span>Live Interactive Matrix</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Touch, Drag, &amp; Draw
        </h2>
        <p className="mt-3 text-xs sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
          Don't just look at pictures. Every card below is a live, working component directly embedded from the registry.
        </p>
      </div>

      {/* Bento Grid: 2 Pristine, Perfectly-Balanced Full Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {/* CARD 1: SIGNATURE PAD (DRAWABLE CANVAS) - 4 COLS (2/3 WIDTH) */}
        <div className="lg:col-span-4 md:col-span-2 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-900/80 p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between overflow-hidden relative group hover:border-[var(--theme-primary)]/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-pink-500/10 text-[var(--theme-primary)] border border-pink-500/20">
                <PenTool className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center flex-wrap gap-2">
                  <span>Signature Pad</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-bold">
                    LIVE DRAWING
                  </span>
                </h3>
                <p className="text-xs text-zinc-500">Draw directly on the canvas below</p>
              </div>
            </div>

            <Link
              href="/docs/components/signature-pad"
              className="p-2 rounded-xl text-zinc-400 hover:text-[var(--theme-primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="View Signature Pad Docs"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Embedded Signature Pad */}
          <div className="w-full flex-1 min-h-[220px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-black/40 overflow-hidden flex items-center justify-center p-2">
            <SignaturePad
              width={380}
              height={180}
              strokeColor="var(--theme-primary)"
              strokeWidth={3}
              showClear={true}
              className="border-none shadow-none bg-transparent max-w-full"
            />
          </div>
        </div>

        {/* CARD 2: 3D ROCKER SWITCH - 2 COLS (1/3 WIDTH) */}
        <div className="lg:col-span-2 md:col-span-1 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-900/80 p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between overflow-hidden relative group hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  3D Rocker Switch
                </h3>
                <p className="text-xs text-zinc-500">Tactile physical rocker</p>
              </div>
            </div>

            <Link
              href="/docs/components/switch"
              className="p-2 rounded-xl text-zinc-400 hover:text-purple-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="View Switch Docs"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex-1 min-h-[160px] flex flex-col items-center justify-center gap-4 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-black/40">
            <Switch
              checked={switchChecked}
              onChange={(c) => setSwitchChecked(c)}
              variant="rocker"
              size="lg"
            />
            <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
              {switchChecked ? "STATUS: ON (ACTIVE)" : "STATUS: OFF (IDLE)"}
            </span>
          </div>
        </div>

        {/* CARD 3: MAGNETIC SLIDER & CIRCULAR PROGRESS - 2 COLS (1/3 WIDTH) */}
        <div className="lg:col-span-2 md:col-span-1 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-900/80 p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between overflow-hidden relative group hover:border-emerald-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Magnetic Slider
                </h3>
                <p className="text-xs text-zinc-500">Scrub &amp; syncs live</p>
              </div>
            </div>

            <Link
              href="/docs/components/slider"
              className="p-2 rounded-xl text-zinc-400 hover:text-emerald-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="View Slider Docs"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex-1 min-h-[160px] flex flex-col justify-center gap-4 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-black/40">
            <div className="flex items-center justify-between">
              <ProgressCircular
                value={sliderVal}
                size={68}
                strokeWidth={7}
                showValue={true}
                variant="success"
              />
              <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                {sliderVal}%
              </span>
            </div>
            <Slider
              value={sliderVal}
              onChange={(v) => setSliderVal(v)}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>

        {/* CARD 4: BARCODE & VECTOR QR - 2 COLS (1/3 WIDTH) */}
        <div className="lg:col-span-2 md:col-span-1 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-900/80 p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between overflow-hidden relative group hover:border-blue-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <BarcodeIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Barcode / QR
                </h3>
                <p className="text-xs text-zinc-500">Single-path dynamic vector</p>
              </div>
            </div>

            <Link
              href="/docs/components/barcode"
              className="p-2 rounded-xl text-zinc-400 hover:text-blue-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="View Barcode Docs"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex-1 min-h-[160px] flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-black/40">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-bold">
              <button
                type="button"
                onClick={() => setBarcodeFormat("qr")}
                className={cn(
                  "px-2.5 py-1 rounded-lg cursor-pointer transition-all",
                  barcodeFormat === "qr"
                    ? "bg-blue-500 text-white shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                QR Matrix
              </button>
              <button
                type="button"
                onClick={() => setBarcodeFormat("code128")}
                className={cn(
                  "px-2.5 py-1 rounded-lg cursor-pointer transition-all",
                  barcodeFormat === "code128"
                    ? "bg-blue-500 text-white shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                Code 128
              </button>
            </div>

            <div className="w-full flex items-center justify-center overflow-hidden">
              <Barcode
                value="https://intense-ui.com"
                format={barcodeFormat}
                size={barcodeFormat === "qr" ? 100 : undefined}
                height={barcodeFormat === "qr" ? undefined : 36}
                barWidth={1.5}
                showText={true}
                className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* CARD 5: ACCORDION SPRING DISCLOSURE - 2 COLS (1/3 WIDTH) */}
        <div className="lg:col-span-2 md:col-span-1 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-900/80 p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between overflow-hidden relative group hover:border-amber-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Kinetic Accordion
                </h3>
                <p className="text-xs text-zinc-500">Accessible spring height</p>
              </div>
            </div>

            <Link
              href="/docs/components/accordion"
              className="p-2 rounded-xl text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="View Accordion Docs"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-black/40">
            <Accordion type="single" defaultValue="feat-1" collapsible={true}>
              <AccordionItem value="feat-1">
                <AccordionTrigger>
                  <span className="font-semibold text-xs sm:text-sm">
                    Spring Physics
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    Calculated using real-world stiffness and damping matrices rather
                    than abrupt CSS bezier approximations.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="feat-2">
                <AccordionTrigger>
                  <span className="font-semibold text-xs sm:text-sm">
                    Zero Monolithic Lock-In
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    Pull source code straight into your components folder with complete ownership.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href={APP_ROUTES.COMPONENTS}
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--theme-primary)] via-pink-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-[var(--theme-primary)]/20 hover:opacity-95 transition-all cursor-pointer active:scale-95"
        >
          <span>Explore All 14+ Primitives</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
