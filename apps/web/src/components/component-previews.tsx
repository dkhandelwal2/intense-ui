"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@registry/components/accordion";
import { AccordionShowcase } from "@/components/showcases/accordion/accordion-showcase";
import { BreadcrumbShowcase } from "@/components/showcases/breadcrumb/breadcrumb-showcase";
import { NavbarShowcase } from "@/components/showcases/nav-bar/navbar-showcase";
import { NavbarGooey } from "@/components/ui/nav-bar";
import { Switch } from "@registry/components/switch";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { ColorGrid } from "@/components/ui/color-grid";
import { Button } from "@registry/components/button";
import { Slider } from "@registry/components/slider";
import { Tooltip } from "@registry/components/tooltip";

// ---------------------------------------------------------------------------
// Compact mini-card previews (used in index grid / listing cards)
// ---------------------------------------------------------------------------

function SliderInteractivePreview() {
  const [val, setVal] = React.useState(50);
  return (
    <div className="w-full max-w-[220px] flex flex-col gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/50">
      <div className="flex justify-between text-[11px] font-mono text-zinc-500">
        <span>Volume</span>
        <span>{val}%</span>
      </div>
      <Slider value={val} min={0} max={100} onChange={setVal} />
    </div>
  );
}

const AccordionMiniCardPreview = (
  <div className="w-full max-w-[220px] text-xs">
    <Accordion type="single" defaultValue="preview" className="w-full">
      <AccordionItem value="preview" className="border-b border-zinc-200 dark:border-zinc-800">
        <AccordionTrigger className="py-2 px-1 text-xs hover:no-underline font-medium">
          Is it animated?
        </AccordionTrigger>
        <AccordionContent className="px-1 pb-2 text-[11px] text-zinc-500 dark:text-zinc-400">
          Yes, smoothly animated with Framer Motion physics.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

const ButtonCardPreview = (
  <div className="flex flex-wrap items-center justify-center gap-3 p-4">
    <Button variant="default">Default</Button>
    <Button variant="glow">Glowing Hover</Button>
  </div>
);

const SwitchCardPreview = (
  <div className="flex items-center justify-center pointer-events-none scale-75">
    <Switch checked={true} onChange={() => { }} size="md" />
  </div>
);

const TooltipCardPreview = (
  <div className="flex items-center justify-center p-4">
    <Tooltip content="3D Interactive Tooltip" position="top">
      <button className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium transition-colors cursor-pointer">
        Hover over me
      </button>
    </Tooltip>
  </div>
);

const SeparatorCardPreview = (
  <div className="w-full max-w-[220px] flex flex-col gap-3 py-2 items-center justify-center">
    <div className="w-full flex items-center justify-between text-[10px] font-mono text-zinc-500">
      <span>gradient</span>
      <span>glow</span>
    </div>
    <Separator />
    <Separator glow />
    <Separator variant="dashed" />
  </div>
);

const BreadcrumbCardPreview = (
  <div className="w-full max-w-[280px] p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/50 backdrop-blur-xs flex items-center justify-center">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild><span>Docs</span></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild><span>Components</span></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
);

const SkeletonCardPreview = (
  <div className="w-full max-w-[240px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/50 backdrop-blur-xs flex items-center gap-3">
    <Skeleton className="w-10 h-10 rounded-full" />
    <div className="flex-1 flex flex-col gap-2">
      <Skeleton className="h-3.5 w-3/4 rounded-md" />
      <Skeleton className="h-3 w-1/2 rounded-md" />
    </div>
  </div>
);

const ColorGridCardPreview = (
  <div className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background/50 backdrop-blur-xs flex items-center justify-center">
    <ColorGrid value="var(--theme-primary)" onChange={() => { }} onClear={() => { }} />
  </div>
);

const NavBarCardPreview = (
  <NavbarGooey
    items={[
      { id: "home", label: "Home", icon: "🏠" },
      { id: "explore", label: "Explore", icon: "🧭" },
      { id: "profile", label: "Profile", icon: "👤" },
    ]}
    size="sm"
  />
);

// ---------------------------------------------------------------------------
// Card-grid mini previews — keyed by both title-case name and slug
// ---------------------------------------------------------------------------
export const componentPreviews: Record<string, React.ReactNode> = {
  // Title-cased
  "Accordion": AccordionMiniCardPreview,
  "Button": ButtonCardPreview,
  "Animated Button": ButtonCardPreview,
  "Glowing Button": ButtonCardPreview,
  "Switch": SwitchCardPreview,
  "Slider": <SliderInteractivePreview />,
  "Tooltip": TooltipCardPreview,
  "Separator": SeparatorCardPreview,
  "Breadcrumb": BreadcrumbCardPreview,
  "Skeleton": SkeletonCardPreview,
  "Color Grid": ColorGridCardPreview,
  "Color Palette": ColorGridCardPreview,
  "Nav Bar": NavBarCardPreview,
  "Navbar": NavBarCardPreview,
  // Slug-cased
  "accordion": AccordionMiniCardPreview,
  "button": ButtonCardPreview,
  "animated-button": ButtonCardPreview,
  "glowing-button": ButtonCardPreview,
  "switch": SwitchCardPreview,
  "slider": <SliderInteractivePreview />,
  "tooltip": TooltipCardPreview,
  "separator": SeparatorCardPreview,
  "breadcrumb": BreadcrumbCardPreview,
  "skeleton": SkeletonCardPreview,
  "color-grid": ColorGridCardPreview,
  "color-palette": ColorGridCardPreview,
  "nav-bar": NavBarCardPreview,
  "navbar": NavBarCardPreview,
};

// ---------------------------------------------------------------------------
// Full-page rich showcase registry (used on /docs/components/[slug] pages)
// Each entry is a zero-arg React component that renders the full showcase.
// To add a new component: add one entry here — no if-chains needed.
// ---------------------------------------------------------------------------
const FULL_PAGE_SHOWCASE_REGISTRY: Record<string, React.ComponentType> = {
  "accordion": AccordionShowcase,
  "breadcrumb": BreadcrumbShowcase,
  "nav-bar": NavbarShowcase,
  "navbar": NavbarShowcase,
};

// ---------------------------------------------------------------------------
// ComponentPreview — entry point for /docs/components/[slug]/page.tsx
// ---------------------------------------------------------------------------
export function ComponentPreview({
  name,
  slug,
}: {
  name?: string;
  slug?: string;
}) {
  const cleanSlug = (slug || "").toLowerCase().trim();
  const cleanName = (name || "").toLowerCase().replace(/\s+/g, "-").trim();

  // 1. Check full-page showcase registry first (rich multi-card interactive views)
  const FullPageShowcase =
    FULL_PAGE_SHOWCASE_REGISTRY[cleanSlug] ||
    FULL_PAGE_SHOWCASE_REGISTRY[cleanName];

  if (FullPageShowcase) {
    return <FullPageShowcase />;
  }

  // 2. Fall back to compact mini-card preview wrapped in a centred container
  const preview =
    componentPreviews[name || ""] ||
    componentPreviews[slug || ""] ||
    componentPreviews[cleanName] ||
    componentPreviews[cleanSlug];

  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full p-4 lg:p-10">
      {preview ?? (
        <div className="text-muted-foreground text-center">
          Interactive preview coming soon
        </div>
      )}
    </div>
  );
}
