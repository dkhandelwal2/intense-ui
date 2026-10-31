"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PackageManagerLogo,
  PACKAGE_MANAGERS,
  type PackageManager,
  type PackageManagerLogoProps,
} from "@/assets/icons";

export { PackageManagerLogo, PACKAGE_MANAGERS, type PackageManager, type PackageManagerLogoProps };

export interface PackageManagerDropdownProps {
  value: PackageManager;
  onChange: (pm: PackageManager) => void;
  className?: string;
  size?: "sm" | "default";
}

export function PackageManagerDropdown({
  value,
  onChange,
  className,
  size = "default",
}: PackageManagerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
    isFlipped: boolean;
  }>({ top: 0, left: 0, width: 0, isFlipped: false });

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateCoords = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const menuHeight = size === "sm" ? 116 : 124;
    const spaceBelow = window.innerHeight - rect.bottom;
    const shouldFlip = spaceBelow < menuHeight && rect.top > menuHeight;

    setCoords({
      top: shouldFlip ? rect.top - menuHeight : rect.bottom,
      left: rect.left,
      width: rect.width,
      isFlipped: shouldFlip,
    });
  }, [size]);

  // Track scroll and resize across all containers
  useEffect(() => {
    if (!isOpen) return;
    updateCoords();

    const handleScrollOrResize = () => {
      updateCoords();
    };

    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, updateCoords]);

  // Close dropdown on click outside or escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center justify-between gap-1 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-800 dark:text-zinc-200 font-mono font-medium transition-colors cursor-pointer select-none shrink-0",
          size === "sm" ? "h-7 w-[84px] px-2 text-[11px]" : "h-8 w-[90px] px-2.5 text-xs",
          isOpen &&
            (coords.isFlipped
              ? "rounded-t-none border-t-transparent ring-1 ring-[var(--theme-primary)]/40 border-[var(--theme-primary)]/40 bg-black/10 dark:bg-white/10"
              : "rounded-b-none border-b-transparent ring-1 ring-[var(--theme-primary)]/40 border-[var(--theme-primary)]/40 bg-black/10 dark:bg-white/10"),
          className
        )}
        title="Select package manager"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <PackageManagerLogo
            pm={value}
            colored={true}
            className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"}
          />
          <span className="capitalize">{value}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-3 h-3 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-[var(--theme-primary)]"
          )}
        />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, scaleY: 0.95 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.95 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: coords.top,
                  left: coords.left,
                  width: coords.width,
                  zIndex: 9999,
                }}
                className={cn(
                  "bg-white/95 dark:bg-[#141416]/98 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl shadow-black/30 p-0.5 flex flex-col gap-0.5 select-none overflow-hidden",
                  coords.isFlipped
                    ? "rounded-t-lg origin-bottom border-b-0 border-[var(--theme-primary)]/40 ring-1 ring-[var(--theme-primary)]/40"
                    : "rounded-b-lg origin-top border-t-0 border-[var(--theme-primary)]/40 ring-1 ring-[var(--theme-primary)]/40"
                )}
                role="listbox"
              >
                {PACKAGE_MANAGERS.map((pm) => {
                  const isSelected = value === pm;
                  return (
                    <button
                      key={pm}
                      type="button"
                      onClick={() => {
                        onChange(pm);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-1.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer group",
                        isSelected
                          ? "bg-[var(--theme-primary)]/15 text-[var(--theme-primary)] font-bold"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-950 dark:hover:text-white"
                      )}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <PackageManagerLogo
                          pm={pm}
                          colored={true}
                          className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"}
                        />
                        <span className="capitalize">{pm}</span>
                      </div>
                      {isSelected && (
                        <Check className="w-3 h-3 text-[var(--theme-primary)] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export interface PackageManagerSelectorProps {
  value: PackageManager;
  onChange: (pm: PackageManager) => void;
  className?: string;
  size?: "sm" | "default";
  activeClassName?: string;
  inactiveClassName?: string;
  variant?: "dropdown" | "pills";
}

export function PackageManagerSelector({
  value,
  onChange,
  className,
  size = "default",
  activeClassName = "bg-[var(--theme-primary)] text-white shadow-sm font-bold",
  inactiveClassName = "text-zinc-400 hover:text-white",
  variant = "dropdown",
}: PackageManagerSelectorProps) {
  if (variant === "dropdown") {
    return (
      <PackageManagerDropdown
        value={value}
        onChange={onChange}
        className={className}
        size={size}
      />
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-white/5 p-1 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className
      )}
    >
      {PACKAGE_MANAGERS.map((pm) => {
        const isSelected = value === pm;
        return (
          <button
            key={pm}
            type="button"
            onClick={() => onChange(pm)}
            className={cn(
              "rounded-full font-mono transition-all inline-flex items-center gap-1.5 shrink-0 select-none",
              size === "sm" ? "px-2 py-1 text-[11px]" : "px-2.5 py-1 text-xs",
              isSelected ? activeClassName : inactiveClassName
            )}
          >
            <PackageManagerLogo
              pm={pm}
              colored={!isSelected}
              className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"}
            />
            <span>{pm}</span>
          </button>
        );
      })}
    </div>
  );
}
