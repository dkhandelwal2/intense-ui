"use client";

import React, { useRef, createContext, useContext } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollContainer } from "@/components/layout/scroll-context";

const StackedCardsContext = createContext<{ scrollYProgress: MotionValue<number> } | null>(null);

export function StackedCardsContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainer = useScrollContainer();

  // Track scroll progress across the entire stack of cards
  const { scrollYProgress } = useScroll({
    container: scrollContainer || undefined,
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <StackedCardsContext.Provider value={{ scrollYProgress }}>
      <div ref={containerRef} className={cn("relative block pb-[15vh]", className)}>
        {children}
      </div>
    </StackedCardsContext.Provider>
  );
}

export function StackedCard({
  children,
  index,
  total,
  className,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  className?: string;
}) {
  const context = useContext(StackedCardsContext);
  if (!context) {
    throw new Error("StackedCard must be used within a StackedCardsContainer");
  }

  const { scrollYProgress } = context;
  const isLast = index === total - 1;

  // Build a progressive array map for perfect cascading physics
  const points = [];
  const scales = [];
  const overlayOpacities = [];
  const opacities = [];
  const yOffsets = [];

  for (let i = 0; i <= total; i++) {
    points.push(i / total);

    if (i <= index) {
      // The card hasn't been covered yet
      scales.push(1);
      overlayOpacities.push(0);
      opacities.push(1);
      yOffsets.push(0);
    } else {
      // The card is being covered by (i - index) subsequent cards
      if (isLast) {
        // The last card should NEVER shrink or dim, because there is no card below it to cover it.
        // This ensures the interactive props remain fully visible and usable.
        scales.push(1);
        overlayOpacities.push(0);
        opacities.push(1);
        yOffsets.push(0);
      } else {
        const distance = i - index;
        // Progressively shrink and dim the background cards to create a true depth pyramid
        scales.push(1 - distance * 0.04);
        overlayOpacities.push(Math.min(0.5, distance * 0.15));
        yOffsets.push(-(distance * 32)); // Stagger UPWARDS behind the active card

        // Hide cards that are more than 3 positions away to prevent a giant vertical staircase when many variants exist
        if (distance > 3) {
          opacities.push(0);
        } else {
          opacities.push(Math.max(0, 1 - distance * 0.25));
        }
      }
    }
  }

  // Map progress to raw target values
  const scaleTarget = useTransform(scrollYProgress, points, scales);
  const overlayOpacityTarget = useTransform(scrollYProgress, points, overlayOpacities);
  const opacityTarget = useTransform(scrollYProgress, points, opacities);
  const yTarget = useTransform(scrollYProgress, points, yOffsets);

  // Apply ultra-smooth spring physics to the mapped values
  const scale = useSpring(scaleTarget, { stiffness: 150, damping: 25, restDelta: 0.001 });
  const overlayOpacity = useSpring(overlayOpacityTarget, { stiffness: 150, damping: 25, restDelta: 0.001 });
  const opacity = useSpring(opacityTarget, { stiffness: 150, damping: 25, restDelta: 0.001 });
  const y = useSpring(yTarget, { stiffness: 150, damping: 25, restDelta: 0.001 });


  // We set transform origin to top so the scaling doesn't pull the top edge down.
  return (
    <div
      className={cn(
        "sticky w-full mb-[5vh]",
        className
      )}
      style={{
        // ALL cards stick to the exact same top position. The stagger is handled by the dynamic 'y' offset!
        top: `10vh`,
        zIndex: index,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
          "--stack-tint": overlayOpacity
        } as any}
        className="w-full origin-top [&>*]:relative [&>*]:after:absolute [&>*]:after:inset-0 [&>*]:after:bg-[var(--theme-primary)] [&>*]:after:pointer-events-none [&>*]:after:rounded-[inherit] [&>*]:after:opacity-[var(--stack-tint)] dark:[&>*]:after:opacity-[calc(var(--stack-tint)*0.5)] [&>*]:after:transition-opacity [&>*]:after:duration-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
