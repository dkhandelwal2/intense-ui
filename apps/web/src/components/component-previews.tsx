"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@registry/components/accordion";
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
import { Button, AnimatedButton } from "@registry/components/button";
import { Slider } from "@registry/components/slider";
import { Tooltip } from "@registry/components/tooltip";

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

export const componentPreviews: Record<string, React.ReactNode> = {
  "Accordion": (
      <div className="w-full max-w-[200px]">
        <Accordion type="single" defaultValue="preview" className="w-full text-xs">
          <AccordionItem value="preview">
            <AccordionTrigger className="py-2 px-3">Toggle me</AccordionTrigger>
            <AccordionContent className="px-3 pb-2">
              Smoothly animated!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  ),
  "Button": (
      <div className="flex flex-wrap items-center justify-center gap-3 p-4">
        <Button variant="default">Default</Button>
        <Button variant="glow">Glowing Hover</Button>
      </div>
  ),
  "Animated Button": (
      <div className="flex flex-wrap items-center justify-center gap-3 p-4">
        <Button variant="default">Default</Button>
        <Button variant="glow">Glowing Hover</Button>
      </div>
  ),
  "Switch": (
      <div className="flex items-center justify-center pointer-events-none scale-75">
        <Switch checked={true} onChange={() => {}} size="md" />
      </div>
  ),
  "Slider": (
      <SliderInteractivePreview />
  ),
  "Tooltip": (
      <div className="flex items-center justify-center p-4">
        <Tooltip content="3D Interactive Tooltip" position="top">
          <button className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium transition-colors">
            Hover over me
          </button>
        </Tooltip>
      </div>
  ),
  "Glowing Button": (
      <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow">
        Hover me
      </button>
  ),
  "Bento Grid": (
      <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
        <div className="h-12 bg-muted rounded-md border" />
        <div className="h-12 bg-muted rounded-md border" />
        <div className="h-12 bg-muted rounded-md border col-span-2" />
      </div>
  ),
  "Magnetic Card": (
      <div className="w-full max-w-[150px] h-20 bg-card border shadow-sm rounded-lg flex items-center justify-center text-sm text-muted-foreground">
        Card
      </div>
  ),
  "Separator": (
      <div className="w-full max-w-[220px] flex flex-col gap-3 py-2 items-center justify-center">
        <div className="w-full flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>gradient</span>
          <span>glow</span>
        </div>
        <Separator />
        <Separator glow />
        <Separator variant="dashed" />
      </div>
  ),
  "Breadcrumb": (
      <div className="w-full max-w-[280px] p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/50 backdrop-blur-xs flex items-center justify-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
  ),
  "Skeleton": (
      <div className="w-full max-w-[240px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/50 backdrop-blur-xs flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="h-3.5 w-3/4 rounded-md" />
          <Skeleton className="h-3 w-1/2 rounded-md" />
        </div>
      </div>
  ),
  "Color Grid": (
      <div className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background/50 backdrop-blur-xs flex items-center justify-center">
        <ColorGrid
          value="var(--theme-primary)"
          onChange={() => {}}
          onClear={() => {}}
        />
      </div>
  ),
  "Color Palette": (
      <div className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background/50 backdrop-blur-xs flex items-center justify-center">
        <ColorGrid
          value="var(--theme-primary)"
          onChange={() => {}}
          onClear={() => {}}
        />
      </div>
  )
};
