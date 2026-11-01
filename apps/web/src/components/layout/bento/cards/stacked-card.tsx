"use client";

import React, { useRef, createContext, useContext } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const StackedCardsContext = createContext<{ scrollYProgress: MotionValue<number> } | null>(null);

export function StackedCardsContainer({
  children,
  className,
  scrollContainer,
}: {
  children: React.ReactNode;
  className?: string;
  scrollContainer?: React.RefObject<HTMLElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the entire stack of cards
  const { scrollYProgress } = useScroll({
    container: scrollContainer || undefined,
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <StackedCardsContext.Provider value={{ scrollYProgress }}>
      <div
        ref={containerRef}
        data-stacked-container="true"
        className={cn("relative block", className)}
      >
        {children}
      </div>
    </StackedCardsContext.Provider>
  );
}

export function StackedCard({
  id,
  children,
  index,
  total,
  className,
}: {
  id?: string;
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

  // Build a progressive array map for cascading physics without altering card backgrounds
  const { points, scales, opacities, yOffsets } = React.useMemo(() => {
    const pts = [];
    const scs = [];
    const ops = [];
    const yOffs = [];

    for (let i = 0; i <= total; i++) {
      pts.push(i / total);

      if (i <= index) {
        scs.push(1);
        ops.push(1);
        yOffs.push(0);
      } else {
        if (isLast) {
          scs.push(1);
          ops.push(1);
          yOffs.push(0);
        } else {
          const distance = i - index;
          scs.push(1 - distance * 0.04);
          yOffs.push(-(distance * 32));

          if (distance > 3) {
            ops.push(0);
          } else {
            ops.push(1);
          }
        }
      }
    }

    return { points: pts, scales: scs, opacities: ops, yOffsets: yOffs };
  }, [index, total, isLast]);

  // Map progress to raw target values
  const scaleTarget = useTransform(scrollYProgress, points, scales);
  const opacityTarget = useTransform(scrollYProgress, points, opacities);
  const yTarget = useTransform(scrollYProgress, points, yOffsets);

  // Apply ultra-smooth spring physics to the mapped values
  const scale = useSpring(scaleTarget, { stiffness: 150, damping: 25, restDelta: 0.001 });
  const opacity = useSpring(opacityTarget, { stiffness: 150, damping: 25, restDelta: 0.001 });
  const y = useSpring(yTarget, { stiffness: 150, damping: 25, restDelta: 0.001 });

  return (
    <>
      {id && (
        <div
          id={`anchor-${id}`}
          data-card-anchor={id}
          className="relative w-full h-0 pointer-events-none invisible"
          aria-hidden="true"
        />
      )}
      <div
        data-card-id={id}
        data-card-index={index}
        className={cn(
          "sticky w-full my-[8vh]",
          className
        )}
        style={{
          top: `10vh`,
          zIndex: index,
        }}
      >
        <motion.div
          style={
            isLast
              ? undefined
              : {
                scale,
                opacity,
                y,
              }
          }
          className="w-full origin-top"
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
