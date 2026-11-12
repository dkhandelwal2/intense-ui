"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NavbarGooeyProps } from "./types";
import { GOOEY_SIZES } from "./constants";

export const NavbarGooey = React.forwardRef<HTMLElement, NavbarGooeyProps>(
  (
    {
      items,
      activeId: controlledActiveId,
      defaultActiveId,
      onSelect,
      className,
      size = "md",
      activeColor,
      ...props
    },
    ref
  ) => {
    const [internalActiveId, setInternalActiveId] = React.useState(
      defaultActiveId || items[0]?.id || ""
    );

    const activeId = controlledActiveId ?? internalActiveId;
    const currentSize = GOOEY_SIZES[size];

    const handleItemClick = (e: React.MouseEvent, id: string, disabled?: boolean) => {
      if (disabled) return;
      e.stopPropagation();
      if (id === activeId) return;
      if (controlledActiveId === undefined) {
        setInternalActiveId(id);
      }
      onSelect?.(id);
    };

    const activeIndex = Math.max(
      0,
      items.findIndex((item) => item.id === activeId)
    );

    return (
      <nav
        ref={ref}
        aria-label="Navigation bar"
        className={cn("relative inline-flex items-center select-none", className)}
        {...props}
      >
        {items.map((item, index) => {
          const isItemActive = index === activeIndex;

          const isBefore = index < activeIndex;
          const isFirstOfGroup = isBefore
            ? index === 0
            : index === activeIndex + 1;
          const isLastOfGroup = isBefore
            ? index === activeIndex - 1
            : index === items.length - 1;

          const hasGapAfter =
            index < items.length - 1 && (isItemActive || isLastOfGroup);

          const radiusClass = isItemActive
            ? "rounded-2xl"
            : isFirstOfGroup && isLastOfGroup
              ? "rounded-2xl"
              : isFirstOfGroup
                ? "rounded-l-2xl rounded-r-none"
                : isLastOfGroup
                  ? "rounded-r-2xl rounded-l-none"
                  : "rounded-none";

          const borderClass = isItemActive
            ? "border border-transparent"
            : isFirstOfGroup && isLastOfGroup
              ? "border border-zinc-200/90 dark:border-white/5"
              : isFirstOfGroup
                ? "border-y border-l border-r-0 border-zinc-200/90 dark:border-white/5"
                : isLastOfGroup
                  ? "border-y border-r border-l-0 border-zinc-200/90 dark:border-white/5"
                  : "border-y border-x-0 border-zinc-200/90 dark:border-white/5";

          const customActiveStyle: React.CSSProperties = isItemActive
            ? {
                backgroundColor: activeColor || "var(--theme-primary)",
              }
            : {};

          return (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={(e) => handleItemClick(e, item.id, item.disabled)}
              style={customActiveStyle}
              className={cn(
                "relative inline-flex items-center justify-center gap-1.5 cursor-pointer select-none font-medium leading-none",
                "transition-[background-color,border-radius,border-color,box-shadow,color,margin,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97]",
                currentSize.button,
                radiusClass,
                borderClass,
                hasGapAfter && currentSize.gap,
                isItemActive
                  ? "bg-[var(--theme-primary)] text-white shadow-md shadow-[var(--theme-primary)]/25"
                  : "bg-zinc-100/90 dark:bg-[#1a1a1c] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white",
                item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
            >
              {item.icon && (
                <span
                  className={cn(
                    "shrink-0 inline-flex items-center justify-center leading-none text-sm select-none [&>svg]:w-3.5 [&>svg]:h-3.5 transition-colors duration-200",
                    isItemActive ? "text-white" : "text-zinc-500 dark:text-zinc-400"
                  )}
                >
                  {item.icon}
                </span>
              )}
              {item.label ? <span>{item.label}</span> : null}
              {item.badge && (
                <span
                  className={cn(
                    "ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold",
                    isItemActive
                      ? "bg-white/20 text-white"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
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
NavbarGooey.displayName = "NavbarGooey";
