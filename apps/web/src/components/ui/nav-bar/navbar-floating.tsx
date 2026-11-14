"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavbarFloatingProps } from "./types";
import { FLOATING_SIZES, FLOATING_SIZE_CLASSES, FLOATING_ITEM_PADDING } from "./constants";

export const NavbarFloating = React.forwardRef<HTMLElement, NavbarFloatingProps>(
  (
    {
      items,
      activeId: controlledActiveId,
      defaultActiveId,
      onSelect,
      className,
      size = "md",
      activeColor,
      layoutId,
      ...props
    },
    ref
  ) => {
    const rawId = React.useId();
    const safeId = React.useMemo(
      () => rawId.replace(/[^a-zA-Z0-9_-]/g, "_"),
      [rawId]
    );
    const indicatorLayoutId =
      layoutId || `navbar-floating-indicator-${safeId}`;
    const [internalActiveId, setInternalActiveId] = React.useState(
      defaultActiveId || items[0]?.id || ""
    );
    const activeId = controlledActiveId ?? internalActiveId;
    const sizeConfig = FLOATING_SIZES[size] || FLOATING_SIZES.md;

    return (
      <nav
        ref={ref}
        aria-label="Floating Navigation Bar"
        className={cn(
          "relative inline-flex items-center rounded-full border border-black/10 dark:border-white/15 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/50 select-none",
          sizeConfig.container,
          className
        )}
        {...props}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                if (controlledActiveId === undefined) {
                  setInternalActiveId(item.id);
                }
                onSelect?.(item.id);
              }}
              className={cn(
                "relative z-10 inline-flex items-center justify-center rounded-full font-medium transition-colors cursor-pointer select-none leading-none",
                sizeConfig.button,
                isActive
                  ? activeColor
                    ? "text-white"
                    : "text-zinc-950 dark:text-white font-semibold"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white",
                item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId={indicatorLayoutId}
                  style={
                    activeColor
                      ? {
                          backgroundColor: activeColor,
                          boxShadow: `0 2px 10px ${activeColor}40`,
                        }
                      : undefined
                  }
                  className={cn(
                    "absolute inset-0 rounded-full border border-black/[0.06] dark:border-white/15 shadow-xs",
                    !activeColor && "bg-zinc-200/80 dark:bg-zinc-800"
                  )}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {item.icon && (
                <span
                  className={cn(
                    "relative z-10 shrink-0 inline-flex items-center justify-center leading-none",
                    sizeConfig.icon
                  )}
                >
                  {item.icon}
                </span>
              )}
              <span className="relative z-10 leading-none">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "relative z-10 ml-1 rounded-full font-mono font-semibold leading-none",
                    sizeConfig.badge,
                    isActive
                      ? activeColor
                        ? "bg-white/20 text-white"
                        : "bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    );
  }
);
NavbarFloating.displayName = "NavbarFloating";
