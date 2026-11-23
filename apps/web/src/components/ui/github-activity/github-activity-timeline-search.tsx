"use client";

import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { AnimatedSearchIcon } from "@/assets/svg";
import { cn } from "@/lib/utils";
import type { GithubActivityTimelineSearchProps } from "./types";

export function GithubActivityTimelineSearch({
  value,
  onChange,
  placeholder = "Search...",
  staticIcons = false,
  className,
}: GithubActivityTimelineSearchProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(Boolean(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) setIsExpanded(true);
  }, [value]);

  const isOpen = isExpanded || Boolean(value);

  const handleClear = () => {
    onChange("");
    setIsExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onChange("");
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center h-7.5 rounded-full border transition-all duration-300 ease-out shrink-0 select-none",
        isOpen
          ? "w-36 sm:w-44 bg-white dark:bg-zinc-900 border-[var(--theme-primary)]/80 ring-1 ring-[var(--theme-primary)]/30 shadow-xs"
          : "w-7.5 justify-center bg-zinc-100/70 dark:bg-zinc-800/50 border-zinc-200/80 dark:border-zinc-700/60 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60 cursor-pointer",
        className
      )}
      onClick={() => {
        if (!isOpen) {
          setIsExpanded(true);
          inputRef.current?.focus();
        }
      }}
    >
      <AnimatedSearchIcon
        animate={!staticIcons}
        className={cn(
          "w-3.5 h-3.5 shrink-0 transition-all duration-200 pointer-events-none",
          isOpen ? "absolute left-2.5 text-zinc-400" : "text-zinc-500 dark:text-zinc-400"
        )}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => {
          if (!value) setIsExpanded(false);
        }}
        placeholder={placeholder}
        aria-label="Search recent activity"
        spellCheck={false}
        className={cn(
          "h-full text-xs outline-none bg-transparent transition-opacity duration-200",
          isOpen
            ? "w-full pl-7.5 pr-6 opacity-100 pointer-events-auto text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            : "w-0 p-0 opacity-0 pointer-events-none"
        )}
      />
      {value && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
          aria-label="Clear search"
          className="absolute right-1.5 p-0.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
