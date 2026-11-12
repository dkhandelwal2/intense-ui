"use client";

import React from "react";
import {
  BreadcrumbDropdown,
  BreadcrumbDropdownItem,
  BreadcrumbCollapsed,
} from "@/components/ui/breadcrumb";
import { Slash, ArrowRight, ChevronRight, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export { SimpleBreadcrumbTrail } from "./breadcrumb-trail";
export type { BreadcrumbTrailProps } from "./breadcrumb-trail";

export const DROPDOWN_ITEMS = [
  { label: "Documentation", icon: "📁" },
  { label: "Guides & Tutorials", icon: "📖" },
  { label: "API Reference", icon: "💾" },
  { label: "Project Settings", icon: "⚙️" },
];

export const SEPARATOR_EXAMPLES = [
  {
    label: "Slash Separator",
    separator: <Slash className="w-3 h-3 text-zinc-400" />,
    items: [{ label: "Home" }, { label: "Dashboard" }],
    current: "Analytics",
  },
  {
    label: "Arrow Separator",
    separator: (
      <ArrowRight className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
    ),
    items: [{ label: "Store" }, { label: "Clothing" }],
    current: "Jackets",
  },
  {
    label: "Double Chevron Separator",
    separator: <ChevronsRight className="w-3.5 h-3.5 text-zinc-400" />,
    items: [{ label: "Library" }, { label: "Audio" }],
    current: "Podcasts",
  },
];

export function PreviewCanvas({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full flex items-center justify-center p-1", className)}>
      {children}
    </div>
  );
}

export function DemoDropdown() {
  return (
    <BreadcrumbDropdown align="center">
      {DROPDOWN_ITEMS.map((item) => (
        <BreadcrumbDropdownItem
          key={item.label}
          onClick={(e) => e?.preventDefault?.()}
          icon={item.icon}
        >
          {item.label}
        </BreadcrumbDropdownItem>
      ))}
    </BreadcrumbDropdown>
  );
}

export function CollapsedBreadcrumbShowcase() {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const items = [
    { label: "Home", href: "#", onClick: (e: React.MouseEvent) => e.preventDefault() },
    { label: "Docs", href: "#", onClick: (e: React.MouseEvent) => e.preventDefault() },
    { label: "Guides", href: "#", onClick: (e: React.MouseEvent) => e.preventDefault() },
    { label: "Components", href: "#", onClick: (e: React.MouseEvent) => e.preventDefault() },
    { label: "Breadcrumb" },
  ];

  return (
    <PreviewCanvas className="flex-col gap-3 py-4">
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono text-center">
          {isCollapsed
            ? 'Click the "..." button to expand all items into row'
            : "All items expanded inline in breadcrumb row"}
        </span>
        {!isCollapsed && (
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
          >
            Re-collapse
          </button>
        )}
      </div>

      <BreadcrumbCollapsed
        items={items}
        maxItems={4}
        itemsBeforeCollapse={1}
        itemsAfterCollapse={2}
        isCollapsed={isCollapsed}
        onCollapsedChange={setIsCollapsed}
      />
    </PreviewCanvas>
  );
}

export function getSeparatorIcon(type?: string) {
  switch (type) {
    case "slash":
      return <Slash className="w-3.5 h-3.5" />;
    case "arrow":
      return <ArrowRight className="w-3.5 h-3.5" />;
    case "chevrons":
      return <ChevronsRight className="w-3.5 h-3.5" />;
    case "dot":
      return <span className="text-xs">•</span>;
    case "none":
      return null;
    default:
      return <ChevronRight className="w-3.5 h-3.5" />;
  }
}
