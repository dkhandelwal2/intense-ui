"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { SharePlatform } from "./types";
import { PLATFORM_ICONS, SHARE_SIZES } from "./constants";

interface NeumorphicShareProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  platforms: SharePlatform[];
  onSelect: (p: SharePlatform, e: React.MouseEvent) => void;
}

export function NeumorphicShare({ className, size = "md", platforms, onSelect }: NeumorphicShareProps) {
  const [expanded, setExpanded] = useState(false);
  const cfg = SHARE_SIZES[size] || SHARE_SIZES.md;

  return (
    <motion.div
      animate={{ width: expanded ? cfg.expandedWidth : cfg.collapsedWidth }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={cn(
        "relative rounded-full bg-[#edf2f7] dark:bg-[#181d28] border border-white/70 dark:border-white/5 p-1 select-none overflow-hidden",
        "shadow-[7px_7px_16px_rgba(163,177,198,0.5),-7px_-7px_16px_rgba(255,255,255,0.95)] dark:shadow-[6px_6px_14px_rgba(0,0,0,0.5),-6px_-6px_14px_rgba(255,255,255,0.03)]",
        cfg.height,
        className
      )}
    >
      <div
        onClick={() => expanded && setExpanded(false)}
        className="relative w-full h-full rounded-full cursor-pointer select-none overflow-hidden"
      >
        {/* Layer 1: Sunken Well with 4 Social Icons */}
        <div className="absolute inset-0 px-4 rounded-full bg-[#e9eef5] dark:bg-[#151922] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.55),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.03)] flex items-center justify-around text-[#243775] dark:text-indigo-400">
          {platforms.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={(e) => onSelect(p, e)}
              className="flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(36,55,117,0.45)] hover:scale-125 transition-transform duration-150 cursor-pointer"
              aria-label={p.label || p.id}
              title={p.label || p.id}
            >
              {p.icon || PLATFORM_ICONS[p.id.toLowerCase()] || <Share2 className={cfg.iconSize} />}
            </button>
          ))}
        </div>

        {/* Layer 2: Raised Cover with "Share" that slides UP when opening (Pinterest animation) */}
        <motion.div
          animate={{ y: expanded ? "-105%" : "0%" }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className={cn(
            "absolute inset-0 rounded-full bg-[#edf2f7] dark:bg-[#1a202c] flex items-center justify-center font-semibold text-[#283b56] dark:text-zinc-200 shadow-[4px_4px_10px_rgba(163,177,198,0.45),-4px_-4px_10px_rgba(255,255,255,1)] dark:shadow-[3px_3px_8px_rgba(0,0,0,0.4),-3px_-3px_8px_rgba(255,255,255,0.04)] hover:brightness-102 cursor-pointer z-10",
            cfg.textSize
          )}
        >
          Share
        </motion.div>
      </div>
    </motion.div>
  );
}
