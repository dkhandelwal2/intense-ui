"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { useSidebarCollapse } from "@/hooks/use-sidebar-collapse";
import { useSidebarContext } from "@/context";
import {
  MobileSidebarDrawer,
  DesktopSidebar,
  type SidebarWrapperProps,
} from "./sidebar-components";

export type { SidebarWrapperProps };

export function SidebarWrapper({
  className,
  isInline,
  isEmbedded,
}: SidebarWrapperProps = {}) {
  const { isMobileOpen, closeMobileSidebar } = useSidebarContext();

  // Manual toggle state (only used if siteConfig.sidebar.enableManualToggle is true)
  const [manualOpen, setManualOpen] = React.useState(true);

  const { effectiveProgress, width, handleMouseEnter, handleMouseLeave } =
    useSidebarCollapse({ manualOpen });

  return (
    <>
      <MobileSidebarDrawer
        isOpen={isMobileOpen}
        onClose={closeMobileSidebar}
      />

      <DesktopSidebar
        className={className}
        isInline={isInline}
        isEmbedded={isEmbedded}
        width={width}
        effectiveProgress={effectiveProgress}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onToggleCollapse={
          siteConfig.sidebar.enableManualToggle
            ? () => setManualOpen((prev) => !prev)
            : undefined
        }
      />
    </>
  );
}
