"use client";

import React, { useState } from "react";
import { StackedCardsContainer } from "@/components/ui/stacked-card";
import { ACCORDION_EXAMPLES } from "./constants";
import { CustomProps } from "./types";
import { AccordionCard } from "./_components";

export function AccordionShowcase() {
  const [customProps, setCustomProps] = useState<CustomProps>({
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "var(--theme-primary)",
    size: "md",
    weight: "Default",
    iconType: "Default",
    iconPosition: "Right",
    headingUnderline: false,
    headingColor: "",
    contentColor: "",
  });

  return (
    <StackedCardsContainer>
      {ACCORDION_EXAMPLES.map((item, index) => (
        <AccordionCard
          key={item.id}
          item={item}
          index={index}
          total={ACCORDION_EXAMPLES.length}
          customProps={customProps}
          onCustomPropsChange={setCustomProps}
        />
      ))}
    </StackedCardsContainer>
  );
}

// Generic naming alias for backwards compatibility
export { AccordionShowcase as AccordionExamples };
