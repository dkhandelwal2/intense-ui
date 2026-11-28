"use client";

import React, { useRef, useState } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  motion,
} from "framer-motion";
import { DOC_PILLARS } from "./constants";
import { DocsPillarsHud } from "./docs-pillars-hud";
import { DocsPillarCard } from "./docs-pillar-card";

/**
 * DocsPillars - Apple & Linear Style Stacking Cards
 *
 * Architecture:
 * - HUD and Card Deck share a single sticky wrapper pinned at `top-20 md:top-24`.
 * - Cards remain 100% opaque at all times to completely eliminate text bleed-through.
 * - Depth is achieved via subtle scale down (1.0 -> 0.96 -> 0.92) and a darkening overlay.
 * - Entire assembly unpins simultaneously as one solid block into the FAQ section.
 */
export function DocsPillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lockedCount, setLockedCount] = useState(1);
  const [alignPct, setAlignPct] = useState(25);

  // Monitor scroll progress through the runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics for buttery-smooth 60+ FPS motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.5,
    restDelta: 0.001,
  });

  // Card 0 (Spatial Micro-Interactions)
  const card0Y = useTransform(smoothProgress, [0.20, 0.40, 0.62], [0, -12, -24]);
  const card0Scale = useTransform(smoothProgress, [0.20, 0.40, 0.62], [1.0, 0.96, 0.92]);
  const card0Dim = useTransform(smoothProgress, [0.20, 0.40, 0.62], [0, 0.25, 0.45]);

  // Card 1 (Direct Code Ownership)
  const card1Y = useTransform(smoothProgress, [0.15, 0.35, 0.45, 0.65], [420, 0, 0, -12]);
  const card1Scale = useTransform(smoothProgress, [0.15, 0.35, 0.45, 0.65], [0.94, 1.0, 1.0, 0.96]);
  const card1Opacity = useTransform(smoothProgress, [0.12, 0.18], [0, 1]);
  const card1Dim = useTransform(smoothProgress, [0.45, 0.65], [0, 0.25]);

  // Card 2 (Core Web Vitals First)
  const card2Y = useTransform(smoothProgress, [0.38, 0.58, 0.68, 0.85], [420, 0, 0, -12]);
  const card2Scale = useTransform(smoothProgress, [0.38, 0.58, 0.68, 0.85], [0.94, 1.0, 1.0, 0.96]);
  const card2Opacity = useTransform(smoothProgress, [0.35, 0.41], [0, 1]);
  const card2Dim = useTransform(smoothProgress, [0.68, 0.85], [0, 0.25]);

  // Card 3 (Strict TypeScript & ARIA)
  const card3Y = useTransform(smoothProgress, [0.62, 0.82], [420, 0]);
  const card3Scale = useTransform(smoothProgress, [0.62, 0.82], [0.94, 1.0]);
  const card3Opacity = useTransform(smoothProgress, [0.59, 0.65], [0, 1]);

  // Sync HUD indicators and percentage
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let count = 1;
    if (latest >= 0.76) count = 4;
    else if (latest >= 0.52) count = 3;
    else if (latest >= 0.30) count = 2;

    const pct = Math.min(
      100,
      Math.max(25, Math.round((Math.min(latest, 0.76) / 0.76) * 100))
    );

    setLockedCount(count);
    setAlignPct(pct);
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full select-none md:h-[220vh]"
    >
      {/* 
        1. Desktop Unified Sticky Stage (md+)
        - Pin to top-0 with min-h-screen and vertical centering
        - Eliminates awkward bottom empty void across all viewport heights
        - Unpins cleanly as one unified block when transitioning into FAQ
      */}
      <div className="hidden md:flex flex-col items-center justify-center sticky top-0 min-h-screen z-20 w-full max-w-3xl mx-auto px-4 py-8">
        {/* Pinned HUD Header */}
        <div className="w-full mb-5">
          <DocsPillarsHud lockedCount={lockedCount} alignPct={alignPct} />
        </div>

        {/* Pinned Card Deck */}
        <div className="relative w-full h-[270px] flex items-center justify-center">
          {/* Pillar 01: Base Card */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              y: card0Y,
              scale: card0Scale,
              zIndex: 10,
            }}
          >
            <div className="relative">
              <DocsPillarCard pillar={DOC_PILLARS[0]} index={0} />
              <motion.div
                style={{ opacity: card0Dim }}
                className="pointer-events-none absolute inset-0 bg-black/40 rounded-3xl transition-opacity"
              />
            </div>
          </motion.div>

          {/* Pillar 02: Stacks over Pillar 01 */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              y: card1Y,
              scale: card1Scale,
              opacity: card1Opacity,
              zIndex: 11,
            }}
          >
            <div className="relative">
              <DocsPillarCard pillar={DOC_PILLARS[1]} index={1} />
              <motion.div
                style={{ opacity: card1Dim }}
                className="pointer-events-none absolute inset-0 bg-black/40 rounded-3xl transition-opacity"
              />
            </div>
          </motion.div>

          {/* Pillar 03: Stacks over Pillar 02 */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              y: card2Y,
              scale: card2Scale,
              opacity: card2Opacity,
              zIndex: 12,
            }}
          >
            <div className="relative">
              <DocsPillarCard pillar={DOC_PILLARS[2]} index={2} />
              <motion.div
                style={{ opacity: card2Dim }}
                className="pointer-events-none absolute inset-0 bg-black/40 rounded-3xl transition-opacity"
              />
            </div>
          </motion.div>

          {/* Pillar 04: Top Stacking Card */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              y: card3Y,
              scale: card3Scale,
              opacity: card3Opacity,
              zIndex: 13,
            }}
          >
            <DocsPillarCard pillar={DOC_PILLARS[3]} index={3} />
          </motion.div>
        </div>
      </div>

      {/* 
        2. Mobile Responsive Flow (< md)
        Clean, static vertical stack without scroll trapping.
      */}
      <div className="md:hidden flex flex-col gap-6 py-6 px-3">
        <div className="w-full mb-2">
          <DocsPillarsHud lockedCount={4} alignPct={100} />
        </div>
        {DOC_PILLARS.map((pillar, idx) => (
          <div key={`mobile-${pillar.id}`} className="w-full">
            <DocsPillarCard pillar={pillar} index={idx} />
          </div>
        ))}
      </div>
    </section>
  );
}
