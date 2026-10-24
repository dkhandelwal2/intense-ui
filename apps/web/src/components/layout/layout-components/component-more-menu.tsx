"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, MessageSquare, Mail, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export interface ComponentMoreMenuProps {
  direction?: "up" | "down" | "auto";
  className?: string;
}

export function ComponentMoreMenu({
  direction = "auto",
  className,
}: ComponentMoreMenuProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<"up" | "down">(
    direction === "up" ? "up" : "down"
  );

  useEffect(() => {
    if (!isOpen) return;

    if (direction === "up" || direction === "down") {
      setPlacement(direction);
      return;
    }

    // Auto-detect based on screen position
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      if (spaceBelow < 260 && spaceAbove > spaceBelow) {
        setPlacement("up");
      } else {
        setPlacement("down");
      }
    }
  }, [isOpen, direction]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex items-center justify-center p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 rounded-full transition-colors group",
          isOpen && "bg-zinc-200 dark:bg-white/10 text-zinc-900 dark:text-white"
        )}
        title="More options"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex gap-[3px] items-center justify-center w-4 h-4">
          <div className="w-1 h-1 rounded-full bg-current group-hover:animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1 h-1 rounded-full bg-current group-hover:animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1 h-1 rounded-full bg-current group-hover:animate-bounce" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: placement === "up" ? 6 : -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: placement === "up" ? 6 : -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute right-0 w-64 max-w-[calc(100vw-32px)] p-1.5 rounded-2xl bg-white dark:bg-[#141416] border border-black/10 dark:border-white/10 shadow-2xl shadow-black/15 dark:shadow-black/60 z-50 flex flex-col gap-1 backdrop-blur-xl",
              placement === "up" ? "bottom-full mb-2" : "top-full mt-2",
              className
            )}
          >
            <div className="px-2.5 py-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Feedback &amp; Support
            </div>

            {/* 1. Report Bug */}
            <a
              href={siteConfig.links.issues}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors group/item"
            >
              <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 shrink-0 group-hover/item:scale-105 transition-transform">
                <Bug className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                  Report Bug
                  <ExternalLink className="w-3 h-3 text-zinc-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </span>
                <span className="text-[10px] text-zinc-500 truncate">Open an issue on GitHub</span>
              </div>
            </a>

            {/* 2. GitHub Discussion / Community */}
            <a
              href={siteConfig.links.discussions}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors group/item"
            >
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500 border border-purple-500/20 shrink-0 group-hover/item:scale-105 transition-transform">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                  GitHub Community
                  <ExternalLink className="w-3 h-3 text-zinc-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </span>
                <span className="text-[10px] text-zinc-500 truncate">Ask questions &amp; discussions</span>
              </div>
            </a>

            {/* 3. Email */}
            <a
              href={siteConfig.links.email}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors group/item"
            >
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 shrink-0 group-hover/item:scale-105 transition-transform">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Email</span>
                <span className="text-[10px] text-zinc-500 truncate">{siteConfig.author.email}</span>
              </div>
            </a>

            <div className="h-px bg-black/5 dark:bg-white/5 my-0.5" />

            {/* GitHub Repository */}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
