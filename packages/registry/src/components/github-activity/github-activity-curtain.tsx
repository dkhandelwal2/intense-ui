"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GithubActivityCurtainProps {
  activeKey: string;
  children: React.ReactNode;
  curtainColor?: string;
  className?: string;
}

/**
 * GithubActivityCurtain: Smooth animated container for view transitions.
 * Reverted to the smooth normal animation flow with subtle upward float & fade.
 */
export function GithubActivityCurtain({
  activeKey,
  children,
  className,
}: GithubActivityCurtainProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden rounded-2xl", className)}>
      <motion.div
        key={activeKey}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
