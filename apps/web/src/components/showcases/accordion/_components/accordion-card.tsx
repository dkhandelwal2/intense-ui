"use client";

import React from "react";
import { ShowcaseCard } from "@/components/showcases/common";
import { AccordionIcons } from "./accordion-icons";
import { CustomProps, AccordionExampleItem } from "../types";
import { AccordionVariantRenderer } from "./accordion-variant-renderer";

export type { AccordionExampleItem };

interface AccordionCardProps {
  item: AccordionExampleItem;
  index: number;
  total: number;
  customProps: CustomProps;
  onCustomPropsChange?: React.Dispatch<React.SetStateAction<CustomProps>>;
}

export function AccordionCard({
  item,
  index,
  total,
  customProps,
}: AccordionCardProps) {
  const IconComponent =
    AccordionIcons[item.id as keyof typeof AccordionIcons] ||
    AccordionIcons.basic;

  return (
    <ShowcaseCard
      id={item.id}
      label={item.label}
      icon={IconComponent}
      description={item.description}
      spec={item.spec}
      infoContent={item.infoContent}
      code={item.code}
      index={index}
      total={total}
    >
      <AccordionVariantRenderer id={item.id} customProps={customProps} />
    </ShowcaseCard>
  );
}
