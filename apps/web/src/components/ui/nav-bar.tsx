"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type NavbarSize = "sm" | "md" | "lg";
export type NavbarVariant = "default" | "gooey" | "floating" | "pills";

/* =========================================================================
   Gooey / Fluid Navigation Bar Component
   ========================================================================= */

export interface NavbarItemData {
  id: string;
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface NavbarGooeyProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "onSelect"> {
  items: NavbarItemData[];
  activeId?: string;
  defaultActiveId?: string;
  onSelect?: (id: string) => void;
  size?: NavbarSize;
  activeColor?: string;
  className?: string;
}

const gooeySizes: Record<
  NavbarSize,
  {
    button: string;
    gap: string;
    fontSize: string;
  }
> = {
  sm: {
    button: "h-8 px-3 text-xs",
    gap: "mr-2",
    fontSize: "text-xs",
  },
  md: {
    button: "h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-sm",
    gap: "mr-2.5 sm:mr-3",
    fontSize: "text-xs sm:text-sm",
  },
  lg: {
    button: "h-12 px-5 sm:px-6 text-sm sm:text-base",
    gap: "mr-3 sm:mr-3.5",
    fontSize: "text-sm sm:text-base",
  },
};

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
    const currentSize = gooeySizes[size];

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

          // Grouping logic for contiguous inactive islands
          const isBefore = index < activeIndex;
          const isFirstOfGroup = isBefore
            ? index === 0
            : index === activeIndex + 1;
          const isLastOfGroup = isBefore
            ? index === activeIndex - 1
            : index === items.length - 1;

          // Gap spacing between islands / active pill
          const hasGapAfter =
            index < items.length - 1 && (isItemActive || isLastOfGroup);

          // Border radius matching morphing islands
          const radiusClass = isItemActive
            ? "rounded-2xl"
            : isFirstOfGroup && isLastOfGroup
            ? "rounded-2xl"
            : isFirstOfGroup
            ? "rounded-l-2xl rounded-r-none"
            : isLastOfGroup
            ? "rounded-r-2xl rounded-l-none"
            : "rounded-none";

          // Clean border outlines for unified islands (1px constant to avoid layout shifts)
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

/* =========================================================================
   Floating Capsule Nav Bar Component
   ========================================================================= */

export interface NavbarFloatingProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "onSelect"> {
  items: NavbarItemData[];
  activeId?: string;
  defaultActiveId?: string;
  onSelect?: (id: string) => void;
  size?: NavbarSize;
  activeColor?: string;
  layoutId?: string;
  className?: string;
}

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

    const sizeClasses = {
      sm: "h-9 px-1 gap-1 text-xs",
      md: "h-11 px-1.5 gap-1.5 text-xs sm:text-sm",
      lg: "h-13 px-2 gap-2 text-sm sm:text-base",
    };

    const itemPadding = {
      sm: "px-3 py-1",
      md: "px-4 py-1.5",
      lg: "px-5 py-2",
    };

    return (
      <nav
        ref={ref}
        className={cn(
          "relative inline-flex items-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/40",
          sizeClasses[size],
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
                itemPadding[size],
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

/* =========================================================================
   Standard Nav Bar Container & Compound Items
   ========================================================================= */

export interface NavbarProps extends React.ComponentPropsWithoutRef<"nav"> {
  variant?: NavbarVariant;
  size?: NavbarSize;
  className?: string;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Main Navigation"
        className={cn(
          "w-full flex items-center justify-between",
          variant === "floating" &&
            "rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-lg p-1.5",
          variant === "pills" && "gap-2",
          className
        )}
        {...props}
      >
        {children}
      </nav>
    );
  }
);
Navbar.displayName = "Navbar";

export const NavbarList = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex items-center gap-1 sm:gap-2 list-none p-0 m-0", className)}
    {...props}
  />
));
NavbarList.displayName = "NavbarList";

export const NavbarItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("inline-flex items-center", className)} {...props} />
));
NavbarItem.displayName = "NavbarItem";

export interface NavbarLinkProps
  extends React.ComponentPropsWithoutRef<"a"> {
  active?: boolean;
  icon?: React.ReactNode;
}

export const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ className, active, icon, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer",
        active
          ? "bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-semibold"
          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>}
      {children}
    </a>
  )
);
NavbarLink.displayName = "NavbarLink";
