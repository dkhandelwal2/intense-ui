"use client";

import React from "react";
import { StackedCard } from "@/components/ui/stacked-card";
import { AccordionIcons } from "./accordion-icons";
import { CustomProps } from "../types";
import { AccordionVariantRenderer } from "./accordion-variant-renderer";
import { AccordionCustomizer } from "./accordion-customizer";
import { getAccordionDescription } from "./accordion-descriptions";

export interface AccordionExampleItem {
  id: string;
  label: string;
  code: string;
}

interface AccordionCardProps {
  item: AccordionExampleItem;
  index: number;
  total: number;
  customProps: CustomProps;
  onCustomPropsChange: React.Dispatch<React.SetStateAction<CustomProps>>;
}

export function AccordionCard({
  item,
  index,
  total,
  customProps,
  onCustomPropsChange,
}: AccordionCardProps) {
  const IconComponent =
    AccordionIcons[item.id as keyof typeof AccordionIcons] ||
    AccordionIcons.basic;

  return (
    <StackedCard index={index} total={total}>
      <section className="bg-card text-card-foreground max-w-4xl mx-auto rounded-[1.5rem] overflow-hidden p-3.5 sm:p-6 md:p-8 pb-6 sm:pb-10 md:pb-[4rem]">
        {/* Section Header */}
        <div className="flex items-start gap-4 py-4">
          <div className="p-2.5 sm:p-3 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-xl shrink-0">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h2
              id={item.id}
              className="text-xl font-bold tracking-tight scroll-mt-24 mb-1 text-zinc-900 dark:text-zinc-100"
            >
              {item.label}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
              {getAccordionDescription(item.id)}
            </p>
          </div>
        </div>

        {/* Preview Frame */}
        <div className="flex flex-col gap-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-[1.5rem] relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
          <div className="flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden group">
            <div className="w-full relative z-10">
              <AccordionVariantRenderer
                id={item.id}
                customProps={customProps}
              />
            </div>
          </div>

          {/* Optional Interactive Customizer for the Playground */}
          {item.id === "customization" && (
            <AccordionCustomizer
              customProps={customProps}
              onChange={onCustomPropsChange}
            />
          )}
        </div>
      </section>
    </StackedCard>
  );
}
