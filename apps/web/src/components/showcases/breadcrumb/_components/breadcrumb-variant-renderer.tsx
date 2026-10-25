"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbDropdown,
  BreadcrumbDropdownItem,
  BreadcrumbGooey,
  BreadcrumbVariant,
  BreadcrumbSize,
} from "@/components/ui/breadcrumb";
import { Slash, ArrowRight, ChevronRight, ChevronsRight } from "lucide-react";
import { CustomProps } from "../types";
import { cn } from "@/lib/utils";

// ── Shared Data Constants ──
const GOOEY_ITEMS = [
  { id: "home", label: "", icon: "🏠" },
  { id: "changelog", label: "Changelog", icon: "📖" },
  { id: "career", label: "Career", icon: "💼" },
  { id: "about", label: "About", icon: "👤" },
];

const DROPDOWN_ITEMS = [
  { label: "Documentation", icon: "📁" },
  { label: "Guides & Tutorials", icon: "📖" },
  { label: "API Reference", icon: "💾" },
  { label: "Project Settings", icon: "⚙️" },
];

const SEPARATOR_EXAMPLES = [
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

// ── Shared Helper Components ──
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
        "w-full flex items-center justify-center py-6 px-4",
        className
      )}
    >
      {children}
    </div>
  );
}

function DemoDropdown() {
  return (
    <BreadcrumbDropdown>
      {DROPDOWN_ITEMS.map((item) => (
        <BreadcrumbDropdownItem key={item.label} href="#" icon={item.icon}>
          {item.label}
        </BreadcrumbDropdownItem>
      ))}
    </BreadcrumbDropdown>
  );
}

function getSeparatorIcon(type?: string) {
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

interface BreadcrumbTrailProps {
  items: { label: string; href?: string; icon?: React.ReactNode }[];
  afterDropdownItems?: {
    label: string;
    href?: string;
    icon?: React.ReactNode;
  }[];
  dropdown?: React.ReactNode;
  currentPage: { label: string; icon?: React.ReactNode };
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separator?: React.ReactNode;
  separatorColor?: string;
  activeColor?: string;
}

function SimpleBreadcrumbTrail({
  items,
  afterDropdownItems,
  dropdown,
  currentPage,
  variant,
  size,
  separator,
  separatorColor,
  activeColor,
}: BreadcrumbTrailProps) {
  return (
    <Breadcrumb
      className="justify-center"
      variant={variant}
      size={size}
      separator={separator}
      separatorColor={separatorColor}
      activeColor={activeColor}
    >
      <BreadcrumbList className="justify-center items-center text-center">
        {items.map((it) => (
          <React.Fragment key={it.label}>
            <BreadcrumbItem>
              <BreadcrumbLink href={it.href || "#"} icon={it.icon}>
                {it.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}

        {dropdown && (
          <>
            <BreadcrumbItem>{dropdown}</BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {afterDropdownItems?.map((it) => (
          <React.Fragment key={it.label}>
            <BreadcrumbItem>
              <BreadcrumbLink href={it.href || "#"} icon={it.icon}>
                {it.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage icon={currentPage.icon}>
            {currentPage.label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// ── Main Variant Renderer ──
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
            items={[
              { label: "Home" },
              { label: "Docs" },
              { label: "Components" },
            ]}
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
        <PreviewCanvas className="flex-col gap-3 py-4">
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

    case "gooey":
      return (
        <PreviewCanvas className="flex-col gap-3">
          <BreadcrumbGooey items={GOOEY_ITEMS} />
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono text-center">
            Click any segment to detach it into the fluid active pill
          </span>
        </PreviewCanvas>
      );

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
                { label: "App", icon: "🏠" },
                { label: "intense-ui", icon: "📦" },
                { label: "src", icon: "📁" },
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

      if (customProps.variant === "gooey") {
        return (
          <PreviewCanvas>
            <BreadcrumbGooey
              size={customProps.size}
              activeColor={customProps.activeColor || "var(--theme-primary)"}
              items={GOOEY_ITEMS.map((it) => ({
                ...it,
                icon: customProps.showIcons ? it.icon : undefined,
              }))}
            />
          </PreviewCanvas>
        );
      }

      const showIcons = customProps.showIcons;
      const baseItems = customProps.hasDropdown
        ? [{ label: "Home", icon: showIcons ? "🏠" : undefined }]
        : [
          { label: "Home", icon: showIcons ? "🏠" : undefined },
          { label: "Docs", icon: showIcons ? "📁" : undefined },
          { label: "Components", icon: showIcons ? "🧩" : undefined },
        ];

      return (
        <PreviewCanvas>
          <SimpleBreadcrumbTrail
            variant={customProps.variant}
            size={customProps.size}
            separator={getSeparatorIcon(customProps.separator)}
            separatorColor={customProps.separatorColor}
            activeColor={customProps.activeColor}
            items={baseItems}
            dropdown={customProps.hasDropdown ? <DemoDropdown /> : undefined}
            currentPage={{
              label: "Breadcrumb",
              icon: showIcons ? "🍞" : undefined,
            }}
          />
        </PreviewCanvas>
      );
    }

    default:
      return null;
  }
}
