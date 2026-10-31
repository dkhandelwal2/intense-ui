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
  { id: "settings", label: "Settings", icon: "⚙️" },
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
        "w-full flex items-center justify-center p-4",
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
          <NavbarFloating items={FLOATING_ITEMS} size="md" />
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono text-center">
            Glassmorphic floating capsule with fluid spring layout
          </span>
        </PreviewCanvas>
      );

    case "sizes":
      return (
        <div className="flex flex-col gap-6 items-center justify-center py-6 px-4 w-full">
          <div className="w-full flex flex-col items-center justify-center text-center gap-1.5">
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Small (sm)
            </span>
            <NavbarGooey items={SIZE_ITEMS} size="sm" />
          </div>

          <div className="w-full flex flex-col items-center justify-center text-center gap-1.5">
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Medium (md - Default)
            </span>
            <NavbarGooey items={SIZE_ITEMS} size="md" />
          </div>

          <div className="w-full flex flex-col items-center justify-center text-center gap-1.5">
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Large (lg)
            </span>
            <NavbarGooey items={SIZE_ITEMS} size="lg" />
          </div>
        </div>
      );

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
