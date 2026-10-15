"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_ROUTES } from "@/config/site";

interface ExploreBannerProps {
  className?: string;
  badge?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function ExploreBanner({
  className,
  badge = "Explore Library",
  title = "Ready to craft intense web experiences?",
  description = "Every component is interactive, accessible, and customizable. Browse live demos, properties, and variations.",
  buttonText = "Browse Components",
  buttonHref = APP_ROUTES.COMPONENTS,
}: ExploreBannerProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[var(--theme-primary)] via-pink-600 to-purple-700 p-6 sm:p-8 text-white shadow-2xl overflow-hidden w-full min-w-0",
        className
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
        <div className="space-y-1.5 max-w-xl">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-white/20 text-white backdrop-blur-sm">
            {badge}
          </span>
          <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
            {description}
          </p>
        </div>

        <Link
          href={buttonHref}
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-white text-zinc-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-zinc-100 hover:gap-3 transition-all shrink-0 active:scale-95"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4 text-[var(--theme-primary)]" />
        </Link>
      </div>
    </motion.div>
  );
}
