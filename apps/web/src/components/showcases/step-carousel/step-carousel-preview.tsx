"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepCarousel } from "@/components/ui/step-carousel";
import { StepCarouselPreviewProps } from "./types";
import { STEP_CARDS } from "./constants";

export function StepCarouselPreview({ customProps, activeTocId = "basic", isCustomizing = false }: StepCarouselPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const total = 5;
  const safeStep = Math.min(currentStep, total - 1);
  const card = STEP_CARDS[safeStep] || STEP_CARDS[0];
  const Icon = card.icon;

  if (isCustomizing) {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <StepCarousel
          totalSteps={customProps.totalSteps}
          duration={customProps.duration}
          loop={customProps.loop}
          defaultPlaying={customProps.defaultPlaying}
          size={customProps.size}
          colorScheme={customProps.colorScheme}
          showPlayButton={customProps.showPlayButton}
          gooey={customProps.gooey}
          pauseOnHover={customProps.pauseOnHover}
        />
      </div>
    );
  }

  // 1. Size Variants (Shows SM, MD, LG)
  if (activeTocId === "sizes") {
    return (
      <div className="w-full max-w-md flex flex-col items-center justify-center gap-6 p-6">
        <div className="flex flex-col items-center gap-2 w-full">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Small (SM)</span>
          <StepCarousel totalSteps={4} size="sm" />
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Medium (MD)</span>
          <StepCarousel totalSteps={5} size="md" defaultStep={1} />
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Large (LG)</span>
          <StepCarousel totalSteps={6} size="lg" defaultStep={2} />
        </div>
      </div>
    );
  }

  // 2. External Controls (Prev / Next buttons)
  if (activeTocId === "controlled") {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6 p-6">
        <div className="text-center font-mono text-xs text-muted-foreground">Current Step: {safeStep + 1} of {total}</div>
        <StepCarousel totalSteps={total} currentStep={safeStep} onStepChange={setCurrentStep} />
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setCurrentStep((s) => Math.max(0, s - 1))} className="px-3.5 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:bg-accent flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all">
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>
          <button type="button" onClick={() => setCurrentStep((s) => Math.min(total - 1, s + 1))} className="px-3.5 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:bg-accent flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all">
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // 3. Gooey Fluid Matrix (Highlights the liquid metaball bridge)
  if (activeTocId === "gooey") {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6 p-6">
        <div className="text-center flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-foreground">Gooey Fluid Matrix</span>
          <span className="text-[11px] text-muted-foreground">Organic liquid metaball connecting dots and play button</span>
        </div>
        <StepCarousel totalSteps={5} duration={3500} loop={true} gooey={true} defaultPlaying={false} />
      </div>
    );
  }

  // 4. Primary Accent
  if (activeTocId === "primary") {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6 p-6">
        <div className="text-center flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-[var(--theme-primary)]">Primary Accent Theme</span>
          <span className="text-[11px] text-muted-foreground">Dynamic brand theme fill tokens</span>
        </div>
        <StepCarousel totalSteps={5} colorScheme="primary" defaultStep={1} />
      </div>
    );
  }

  // 5. Autoplay & Loop
  if (activeTocId === "autoplay") {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6 p-6">
        <div className="text-center flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-foreground">Autoplay with Continuous Loop</span>
          <span className="text-[11px] text-muted-foreground">Auto-advances through all steps and repeats endlessly</span>
        </div>
        <StepCarousel totalSteps={5} duration={2500} defaultPlaying={true} loop={true} />
      </div>
    );
  }

  // 6. Minimal Dots (Without Play Button)
  if (activeTocId === "without-button") {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <div className="text-center flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-foreground">Minimal Dots</span>
          <span className="text-[11px] text-muted-foreground">Decoupled indicator without play action button</span>
        </div>
        <StepCarousel totalSteps={5} showPlayButton={false} />
      </div>
    );
  }

  // 7. Pause on Hover
  if (activeTocId === "pause-on-hover") {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6 p-6">
        <div className="text-center flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-foreground">Pause On Hover</span>
          <span className="text-[11px] text-muted-foreground">Hover cursor over the carousel to pause playback</span>
        </div>
        <StepCarousel totalSteps={5} duration={3000} defaultPlaying={true} loop={true} pauseOnHover={true} />
      </div>
    );
  }

  // 8. Fast Speed
  if (activeTocId === "fast") {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6 p-6">
        <div className="text-center flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-foreground">High-Speed Cycling</span>
          <span className="text-[11px] text-muted-foreground">Fast micro-step advancement (1200ms per step)</span>
        </div>
        <StepCarousel totalSteps={5} duration={1200} defaultPlaying={true} loop={true} />
      </div>
    );
  }

  // 9. Overflow (+More items badge)
  if (activeTocId === "overflow") {
    return (
      <div className="w-full max-w-md flex flex-col items-center gap-6 p-6">
        <div className="text-center flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-foreground">Overflow Dynamic Windowing</span>
          <span className="text-[11px] text-muted-foreground">Caps at 5 visible steps with dynamic +3 overflow counter</span>
        </div>
        <StepCarousel totalSteps={8} maxVisibleSteps={5} defaultStep={0} />
      </div>
    );
  }

  // Basic Carousel (Interactive Card Deck)
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6">
      <div className="relative w-full h-35 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-lg p-3 flex flex-col justify-between">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none transition-all duration-500", card.accent)} />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[var(--theme-primary)] shadow-xs">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">{card.subtitle}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/90 dark:bg-black/60 text-[10px] font-mono text-zinc-300 border border-zinc-700/50">{`0${safeStep + 1} / 0${total}`}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={safeStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="relative z-10 flex flex-col gap-1">
            <h4 className="text-lg font-bold tracking-tight text-foreground">{card.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{card.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <StepCarousel
        totalSteps={total}
        currentStep={safeStep}
        onStepChange={setCurrentStep}
        duration={3500}
        loop={false}
        defaultPlaying={false}
      />
    </div>
  );
}
