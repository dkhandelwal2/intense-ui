"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ComponentActiveTab } from "./types";
import { ComponentTabControls } from "./component-tab-controls";
import { ComponentTitleBadge } from "./component-title-badge";

export interface ComponentSidebarHeaderProps {
  title: string;
  slug?: string;
  icon?: React.ComponentType<{ className?: string }>;
  activeTab: ComponentActiveTab;
  onTabChange: (tab: ComponentActiveTab) => void;
  className?: string;
  isBottomBar?: boolean;
  isOpen?: boolean;
  hasPlayground?: boolean;
}

export function ComponentSidebarHeader({
  title,
  slug,
  icon,
  activeTab,
  onTabChange,
  className,
  isBottomBar = false,
  isOpen = true,
  hasPlayground = true,
}: ComponentSidebarHeaderProps) {
  const headerContent = (
    <div className="flex items-center justify-between gap-1.5 sm:gap-3 py-0.5 w-full min-w-0">
      {/* Cyber Glass Title Pill with Common Component Icon and Glowing Live Pulse Dot */}
      <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
        <ComponentTitleBadge
          title={title}
          slug={slug}
          icon={icon}
          showStudioTag={!isBottomBar}
        />
      </div>

      <ComponentTabControls
        activeTab={activeTab}
        onTabChange={onTabChange}
        hasPlayground={hasPlayground}
        isBottomBar={isBottomBar}
        isOpen={isOpen}
        layoutIdPrefix={isBottomBar ? "bottom-bar" : "inspector-sidebar"}
      />
    </div>
  );

  if (isBottomBar) {
    return (
      <div
        style={{
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
        }}
        className={cn(
          "fixed bottom-0 left-0 md:left-[68px] right-0 z-40 bg-background/95 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 px-3.5 sm:px-6 pt-2.5 sm:pt-3 shadow-[0_-12px_32px_rgba(0,0,0,0.3)] flex items-center justify-between xl:hidden rounded-t-[28px] touch-manipulation",
          className
        )}
      >
        {headerContent}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "shrink-0 w-full px-4 sm:px-5 py-3 sm:py-3.5",
        "bg-zinc-50/90 dark:bg-[#0f0f13]/90 backdrop-blur-2xl",
        "relative",
        className
      )}
    >
      {/* Subtle ambient light gradient line at the bottom */}
      <Separator className="absolute bottom-0 left-0 right-0 pointer-events-none" />
      {headerContent}
    </div>
  );
}
