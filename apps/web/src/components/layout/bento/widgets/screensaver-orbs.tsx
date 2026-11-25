"use client";

import React from "react";
import { motion } from "framer-motion";

export const ScreensaverOrbs = React.memo(function ScreensaverOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[var(--theme-primary)]/15 dark:bg-[var(--theme-primary)]/20 blur-[130px]"
      />
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -right-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-[140px]"
      />
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/4 w-80 sm:w-[400px] h-80 sm:h-[400px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 blur-[120px]"
      />
    </div>
  );
});
