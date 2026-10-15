"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../../packages/registry/src/components/accordion";
import { Switch } from "../../../../packages/registry/src/components/switch";

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
  "Switch": (
      <div className="flex items-center justify-center pointer-events-none scale-75">
        <Switch checked={true} onChange={() => {}} size="md" />
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
  )
};
