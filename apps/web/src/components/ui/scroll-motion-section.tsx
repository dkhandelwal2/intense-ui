"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollMotionSectionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
}

export function ScrollMotionSection({
  children,
  className,
  delay = 0,
  yOffset = 24,
  duration = 0.45,
  amount = 0.15,
  once = false,
  ...props
}: ScrollMotionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Aliased as SidebarMotionSection for backwards compatibility
export const SidebarMotionSection = ScrollMotionSection;
export type SidebarMotionSectionProps = ScrollMotionSectionProps;
