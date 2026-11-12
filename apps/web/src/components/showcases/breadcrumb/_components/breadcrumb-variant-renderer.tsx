"use client";

import React from "react";
import { BreadcrumbCollapsed } from "@/components/ui/breadcrumb";
import { CustomProps } from "../types";
import {
  PreviewCanvas,
  DemoDropdown,
  CollapsedBreadcrumbShowcase,
  SimpleBreadcrumbTrail,
  getSeparatorIcon,
  SEPARATOR_EXAMPLES,
} from "./breadcrumb-showcase-helpers";

interface BreadcrumbVariantRendererProps {
  id: string;
  customProps?: CustomProps;
}

export function BreadcrumbVariantRenderer({
  id,
  customProps,
}: BreadcrumbVariantRendererProps) {
  switch (id) {
    case "basic":
      return (
        <PreviewCanvas>
          <SimpleBreadcrumbTrail
            items={[{ label: "Home" }, { label: "Docs" }, { label: "Components" }]}
            currentPage={{ label: "Breadcrumb" }}
          />
        </PreviewCanvas>
      );

    case "with-icon":
      return (
        <PreviewCanvas>
          <SimpleBreadcrumbTrail
            items={[
              { label: "Home", icon: "🏠" },
              { label: "Docs", icon: "📁" },
              { label: "Components", icon: "🧩" },
            ]}
            currentPage={{ label: "Breadcrumb", icon: "🍞" }}
          />
        </PreviewCanvas>
      );

    case "custom-separator":
      return (
        <div className="flex flex-col gap-6 items-center justify-center py-6 px-4 w-full">
          {SEPARATOR_EXAMPLES.map((ex) => (
            <div
              key={ex.label}
              className="w-full flex flex-col items-center justify-center text-center gap-1.5"
            >
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {ex.label}
              </span>
              <SimpleBreadcrumbTrail
                separator={ex.separator}
                items={ex.items}
                currentPage={{ label: ex.current }}
              />
            </div>
          ))}
        </div>
      );

    case "dropdown":
      return (
        <PreviewCanvas className="flex-col gap-3 pt-3 pb-36 min-h-[220px]">
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono text-center">
            Click the &quot;...&quot; button to open dropdown
          </span>
          <SimpleBreadcrumbTrail
            items={[{ label: "Home" }]}
            dropdown={<DemoDropdown />}
            afterDropdownItems={[{ label: "Components" }]}
            currentPage={{ label: "Breadcrumb" }}
          />
        </PreviewCanvas>
      );

    case "collapsed":
      return <CollapsedBreadcrumbShowcase />;

    case "chips":
      return (
        <div className="flex flex-col gap-6 items-center justify-center py-6 px-4 w-full">
          <div className="w-full flex flex-col items-center justify-center text-center gap-1.5">
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Chips / Pills Mode
            </span>
            <SimpleBreadcrumbTrail
              variant="chips"
              size="md"
              items={[
                { label: "Projects" },
                { label: "Intense UI" },
                { label: "Components" },
              ]}
              currentPage={{ label: "breadcrumb.tsx", icon: "🍞" }}
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center text-center gap-1.5">
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Outlined Pills Mode
            </span>
            <SimpleBreadcrumbTrail
              variant="outline"
              size="sm"
              items={[{ label: "Root" }, { label: "Config" }]}
              currentPage={{ label: "tailwind.config.ts" }}
            />
          </div>
        </div>
      );

    case "customization": {
      if (!customProps) return null;
      const showIcons = customProps.showIcons;

      if (customProps.hasCollapsed) {
        const collapsedItems = [
          { label: "Home", href: "#", icon: showIcons ? "🏠" : undefined, onClick: (e: React.MouseEvent) => e.preventDefault() },
          { label: "Docs", href: "#", icon: showIcons ? "📁" : undefined, onClick: (e: React.MouseEvent) => e.preventDefault() },
          { label: "Guides", href: "#", icon: showIcons ? "📖" : undefined, onClick: (e: React.MouseEvent) => e.preventDefault() },
          { label: "Components", href: "#", icon: showIcons ? "🧩" : undefined, onClick: (e: React.MouseEvent) => e.preventDefault() },
          { label: "Breadcrumb", icon: showIcons ? "🍞" : undefined },
        ];

        return (
          <PreviewCanvas className="flex-col gap-3 py-4">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono text-center">
              Click &quot;...&quot; to expand all items into row
            </span>
            <BreadcrumbCollapsed
              variant={customProps.variant}
              size={customProps.size}
              separator={getSeparatorIcon(customProps.separator)}
              separatorColor={customProps.separatorColor}
              activeColor={customProps.activeColor}
              items={collapsedItems}
              maxItems={4}
              itemsBeforeCollapse={1}
              itemsAfterCollapse={2}
              allowCollapse={true}
            />
          </PreviewCanvas>
        );
      }

      const baseItems = customProps.hasDropdown
        ? [{ label: "Home", icon: showIcons ? "🏠" : undefined }]
        : [
          { label: "Home", icon: showIcons ? "🏠" : undefined },
          { label: "Docs", icon: showIcons ? "📁" : undefined },
          { label: "Components", icon: showIcons ? "🧩" : undefined },
        ];

      return (
        <PreviewCanvas className={customProps.hasDropdown ? "flex-col gap-3 pt-3 pb-36 min-h-[220px]" : undefined}>
          <SimpleBreadcrumbTrail
            variant={customProps.variant}
            size={customProps.size}
            separator={getSeparatorIcon(customProps.separator)}
            separatorColor={customProps.separatorColor}
            activeColor={customProps.activeColor}
            items={baseItems}
            dropdown={customProps.hasDropdown ? <DemoDropdown /> : undefined}
            currentPage={{ label: "Breadcrumb", icon: showIcons ? "🍞" : undefined }}
          />
        </PreviewCanvas>
      );
    }

    default:
      return null;
  }
}
