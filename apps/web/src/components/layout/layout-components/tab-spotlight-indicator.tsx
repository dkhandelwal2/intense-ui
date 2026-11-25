"use client";

import React from "react";
import { motion } from "framer-motion";

interface TabSpotlightIndicatorProps {
  layoutId: string;
}

export const TabSpotlightIndicator = React.memo(function TabSpotlightIndicator({
  layoutId,
}: TabSpotlightIndicatorProps) {
  return (
    <motion.div
      layoutId={layoutId}
      className="absolute inset-0 pointer-events-none z-0"
      transition={{ type: "spring", stiffness: 450, damping: 32 }}
    >
      {/* Downward Spotlight Cone / Beam (Starts strictly at bar width, flares downward over icon) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: "polygon(25% 0%, 75% 0%, 94% 100%, 6% 100%)",
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--theme-primary) 55%, transparent) 0%, color-mix(in srgb, var(--theme-primary) 20%, transparent) 40%, transparent 95%)",
        }}
      />

      {/* Top Overhead Glowing Light Bar (Crisp, solid white pill with theme glow) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-6 sm:w-7 h-[3px] rounded-full pointer-events-none bg-white"
        style={{
          boxShadow:
            "0 0 8px var(--theme-primary), 0 0 2px var(--theme-primary), 0 1px 2px rgba(0,0,0,0.3)",
        }}
      />
    </motion.div>
  );
});
