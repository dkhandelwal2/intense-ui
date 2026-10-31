"use client";

import { motion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { GithubIcon, SparkleStarIcon } from "@/assets/icons";
import { siteConfig } from "@/config/site";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { sidebarItemVariants } from "./sidebar-animations";

interface SidebarGithubLinkProps {
  isCollapsed: boolean;
  labelOpacity: MotionValue<number>;
  labelX: MotionValue<number>;
}

export function SidebarGithubLink({
  isCollapsed,
  labelOpacity,
  labelX,
}: SidebarGithubLinkProps) {
  const { starCountText } = useGitHubStars();

  return (
    <motion.div variants={sidebarItemVariants}>
      <a
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub Repository & Stars"
        className="group relative flex items-center select-none w-full h-[44px] px-3.5 cursor-pointer block"
      >
        <div
          className={cn(
            "relative flex items-center rounded-full w-full h-10 overflow-hidden transition-all",
            "text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04] dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/[0.04]"
          )}
        >
          {/* Centered Icon Box (40px x 40px) with Animated GitHub -> SparkleStar morph */}
          <div className="w-10 h-10 flex items-center justify-center shrink-0 z-10 relative">
            <GithubIcon className="w-[18px] h-[18px] absolute transition-all duration-300 ease-out transform group-hover:scale-0 group-hover:rotate-45 group-hover:opacity-0 pointer-events-none text-zinc-500 group-hover:text-zinc-950 dark:text-zinc-400 dark:group-hover:text-white" />
            <SparkleStarIcon className="w-[19px] h-[19px] absolute transition-all duration-300 ease-out transform scale-0 -rotate-45 opacity-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
          </div>

          {/* Label & Star Count Pill */}
          <motion.div
            style={{ opacity: labelOpacity, x: labelX }}
            className="flex-1 flex items-center justify-between min-w-0 z-10 overflow-hidden whitespace-nowrap pr-3"
          >
            <span className="text-[14px] truncate transition-colors text-zinc-700 group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white font-normal">
              GitHub
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-sans font-medium shrink-0 ml-2 transition-all bg-black/[0.05] dark:bg-white/[0.08] border border-black/10 dark:border-white/10 group-hover:border-amber-500/40 text-zinc-700 dark:text-zinc-300 group-hover:text-amber-500 dark:group-hover:text-amber-300 shadow-xs">
              <SparkleStarIcon className="w-3.5 h-3.5 shrink-0 pointer-events-none drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
              <span>{starCountText || "★"}</span>
            </span>
          </motion.div>

          {/* Tooltip on Collapsed Mode */}
          {isCollapsed && (
            <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-white dark:bg-[#121215] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-xs font-medium shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 flex items-center gap-2">
              <span>GitHub</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-sans font-medium text-amber-500 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20">
                <SparkleStarIcon className="w-3 h-3 shrink-0" />
                <span>{starCountText || "★"}</span>
              </span>
            </div>
          )}
        </div>
      </a>
    </motion.div>
  );
}
