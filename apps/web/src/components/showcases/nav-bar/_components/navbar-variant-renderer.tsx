"use client";

import React from "react";
import {
  NavbarGooey,
  NavbarFloating,
} from "@/components/ui/nav-bar";
import { CustomNavbarProps } from "../types";
import { cn } from "@/lib/utils";

const GOOEY_ITEMS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "explore", label: "Explore", icon: "🧭" },
  { id: "library", label: "Library", icon: "📚" },
  { id: "news", label: "News", icon: "📰" },
];

const WITH_ICON_ITEMS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "activity", label: "Activity", icon: "⚡", badge: "LIVE" },
  { id: "deployments", label: "Deployments", icon: "🚀" },
  { id: "analytics", label: "Analytics", icon: "📈", badge: "PRO" },
];

const FLOATING_ITEMS = [
  { id: "feed", label: "Feed", icon: "✨" },
  { id: "bookmarks", label: "Bookmarks", icon: "🔖" },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "profile", label: "Profile", icon: "👤" },
];

const SIZE_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
];

function PreviewCanvas({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center my-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function NavbarVariantRenderer({
  id,
  customProps,
}: {
  id: string;
  customProps?: CustomNavbarProps;
}) {
  const [activeSizesVariant, setActiveSizesVariant] = React.useState<"gooey" | "floating">(
    customProps?.variant === "floating" ? "floating" : "gooey"
  );

  React.useEffect(() => {
    if (customProps?.variant === "floating") {
      setActiveSizesVariant("floating");
    } else if (customProps?.variant) {
      setActiveSizesVariant("gooey");
    }
  }, [customProps?.variant]);

  switch (id) {
    case "gooey":
      return (
        <PreviewCanvas className="flex-col gap-3 py-6">
          <NavbarGooey items={GOOEY_ITEMS} />
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono text-center">
            Click any segment to detach it into the fluid active pill
          </span>
        </PreviewCanvas>
      );

    case "with-icon":
      return (
        <PreviewCanvas className="flex-col gap-3 py-6">
          <NavbarGooey
            items={WITH_ICON_ITEMS}
            activeColor="var(--theme-primary)"
          />
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono text-center">
            Rich navigation tabs paired with icons &amp; status badges
          </span>
        </PreviewCanvas>
      );

    case "floating":
      return (
        <PreviewCanvas className="flex-col gap-3 py-6">
          <NavbarFloating
            items={FLOATING_ITEMS}
            size={customProps?.size || "md"}
            activeColor={customProps?.activeColor}
          />
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono text-center">
            Glassmorphic floating capsule with fluid spring layout
          </span>
        </PreviewCanvas>
      );

    case "sizes": {
      const isFloating = activeSizesVariant === "floating";
      return (
        <div className="flex flex-col gap-3.5 sm:gap-4 items-center justify-center py-2 sm:py-3 px-2 w-full">
          {/* Variant Switcher Pill for Scale & Sizing */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800/90 border border-black/[0.08] dark:border-white/10 text-xs select-none shadow-xs">
            <button
              type="button"
              onClick={() => setActiveSizesVariant("gooey")}
              className={cn(
                "px-3 py-1 rounded-full font-medium transition-all text-xs cursor-pointer",
                !isFloating
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              Fluid Gooey
            </button>
            <button
              type="button"
              onClick={() => setActiveSizesVariant("floating")}
              className={cn(
                "px-3 py-1 rounded-full font-medium transition-all text-xs cursor-pointer",
                isFloating
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              Floating Capsule
            </button>
          </div>

          <div className="w-full flex flex-col items-center justify-center text-center gap-1">
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Small (sm)
            </span>
            {isFloating ? (
              <NavbarFloating
                layoutId="floating-nav-size-sm"
                items={SIZE_ITEMS}
                size="sm"
                activeColor={customProps?.activeColor}
              />
            ) : (
              <NavbarGooey
                items={SIZE_ITEMS}
                size="sm"
                activeColor={customProps?.activeColor}
              />
            )}
          </div>

          <div className="w-full flex flex-col items-center justify-center text-center gap-1">
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Medium (md - Default)
            </span>
            {isFloating ? (
              <NavbarFloating
                layoutId="floating-nav-size-md"
                items={SIZE_ITEMS}
                size="md"
                activeColor={customProps?.activeColor}
              />
            ) : (
              <NavbarGooey
                items={SIZE_ITEMS}
                size="md"
                activeColor={customProps?.activeColor}
              />
            )}
          </div>

          <div className="w-full flex flex-col items-center justify-center text-center gap-1">
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Large (lg)
            </span>
            {isFloating ? (
              <NavbarFloating
                layoutId="floating-nav-size-lg"
                items={SIZE_ITEMS}
                size="lg"
                activeColor={customProps?.activeColor}
              />
            ) : (
              <NavbarGooey
                items={SIZE_ITEMS}
                size="lg"
                activeColor={customProps?.activeColor}
              />
            )}
          </div>
        </div>
      );
    }

    case "customization": {
      if (!customProps) return null;

      const items = GOOEY_ITEMS.map((it) => ({
        ...it,
        icon: customProps.showIcons ? it.icon : undefined,
        badge:
          customProps.showBadges && it.id === "explore"
            ? "NEW"
            : undefined,
      }));

      if (customProps.variant === "floating") {
        return (
          <PreviewCanvas className="py-6">
            <NavbarFloating
              items={items}
              size={customProps.size}
              activeColor={customProps.activeColor}
            />
          </PreviewCanvas>
        );
      }

      return (
        <PreviewCanvas className="py-6">
          <NavbarGooey
            items={items}
            size={customProps.size}
            activeColor={customProps.activeColor || "var(--theme-primary)"}
          />
        </PreviewCanvas>
      );
    }

    default:
      return null;
  }
}
