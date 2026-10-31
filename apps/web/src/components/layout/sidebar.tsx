"use client";

import {
  motion,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { useRailMode } from "@/hooks/use-rail-mode";
import { useSidebarNavItems } from "@/hooks/use-sidebar-nav-items";
import {
  sidebarContainerVariants,
  sidebarItemVariants,
  SidebarHeader,
  SidebarSectionHeader,
  SidebarNavItem,
  SidebarGithubLink,
} from "./sidebar-components";

export interface DocsSidebarProps {
  onClick?: () => void;
  progress?: MotionValue<number>;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  onClick,
  progress,
  isCollapsed: manualIsCollapsed,
  onToggleCollapse,
}: DocsSidebarProps) {
  const defaultProgress = useMotionValue(0);
  const activeProgress = progress ?? defaultProgress;

  const isRailMode = useRailMode(progress);
  const isCollapsed = manualIsCollapsed ?? isRailMode;

  const { gettingStartedItems, componentItems } = useSidebarNavItems();

  // Scroll scrubbed transformations
  const labelOpacity = useTransform(activeProgress, [0, 0.65], [1, 0], {
    clamp: true,
  });
  const labelX = useTransform(activeProgress, [0, 0.65], [0, -8], {
    clamp: true,
  });
  const headerOpacity = useTransform(activeProgress, [0, 0.55], [1, 0], {
    clamp: true,
  });
  const headerY = useTransform(activeProgress, [0, 0.55], [0, -18], {
    clamp: true,
  });
  const headerScale = useTransform(activeProgress, [0, 0.55], [1, 0.92], {
    clamp: true,
  });

  return (
    <div className="w-full h-full flex flex-col select-none">
      {/* ─── Top Header: Logo Icon Only + Collapsible Toggle ─── */}
      <SidebarHeader onClick={onClick} onToggleCollapse={onToggleCollapse} />

      {/* ─── Separator 1: Below Sidebar Logo ─── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="w-full my-2.5 origin-left"
      >
        <Separator />
      </motion.div>

      {/* ─── Navigation Items List (Staggered One-By-One Entrance) ─── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sidebarContainerVariants}
        className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-1 w-full"
      >
        {/* Section 1: GETTING STARTED */}
        <SidebarSectionHeader
          title="Getting Started"
          isCollapsed={isCollapsed}
          headerOpacity={headerOpacity}
          headerY={headerY}
          headerScale={headerScale}
        />

        {gettingStartedItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isCollapsed={isCollapsed}
            labelOpacity={labelOpacity}
            labelX={labelX}
            onClick={onClick}
          />
        ))}

        {/* ─── Separator 2: Below Getting Started ─── */}
        <motion.div variants={sidebarItemVariants}>
          <Separator className="my-3" />
        </motion.div>

        {/* Section 2: COMPONENTS Header with Badge */}
        <SidebarSectionHeader
          title="Components"
          count={componentItems.length}
          isCollapsed={isCollapsed}
          headerOpacity={headerOpacity}
          headerY={headerY}
          headerScale={headerScale}
        />

        {/* Components List */}
        {componentItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isCollapsed={isCollapsed}
            labelOpacity={labelOpacity}
            labelX={labelX}
            onClick={onClick}
          />
        ))}

        {/* ─── Separator 3: Where Component Ends ─── */}
        <motion.div variants={sidebarItemVariants}>
          <Separator className="my-3" />
        </motion.div>

        {/* Section 3: GitHub with animated morph & golden star badge */}
        <SidebarGithubLink
          isCollapsed={isCollapsed}
          labelOpacity={labelOpacity}
          labelX={labelX}
        />
      </motion.div>
    </div>
  );
}
