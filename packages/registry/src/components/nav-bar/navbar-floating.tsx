"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavbarFloatingProps } from "./types";
import { FLOATING_SIZE_CLASSES, FLOATING_ITEM_PADDING } from "./constants";

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
    const generatedId = React.useId();
    const indicatorLayoutId =
      layoutId || `navbar-floating-indicator-${generatedId}`;
    const [internalActiveId, setInternalActiveId] = React.useState(
      defaultActiveId || items[0]?.id || ""
    );
    const activeId = controlledActiveId ?? internalActiveId;

    return (
      <nav
        ref={ref}
        className={cn(
          "relative inline-flex items-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/40",
          FLOATING_SIZE_CLASSES[size],
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
                "relative z-10 inline-flex items-center gap-1.5 rounded-full font-medium transition-colors cursor-pointer select-none",
                FLOATING_ITEM_PADDING[size],
                isActive
                  ? activeColor
                    ? "text-white"
                    : "text-zinc-950 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
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
                    "absolute inset-0 rounded-full border border-black/[0.04] dark:border-white/[0.06] shadow-xs",
                    !activeColor && "bg-zinc-100 dark:bg-zinc-800"
                  )}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {item.icon && (
                <span className="relative z-10 shrink-0 text-sm [&>svg]:w-3.5 [&>svg]:h-3.5">
                  {item.icon}
                </span>
              )}
              <span className="relative z-10">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "relative z-10 ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold",
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
