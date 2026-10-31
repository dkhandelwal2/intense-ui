"use client";

import React, { useState, useEffect } from "react";
import { StackedCardsContainer } from "@/components/ui/stacked-card";
import { useShowcaseCodeUpdate } from "@/components/showcases/common";
import { useComponentPlayground } from "@/context";
import { ACCORDION_EXAMPLES } from "./constants";
import { CustomProps } from "./types";
import {
  AccordionCard,
  AccordionPlaygroundStudio,
  AccordionLivePreview,
  DEFAULT_CUSTOM_PROPS,
} from "./_components";
import { generateAccordionCode } from "./code-generator";

export function AccordionShowcase() {
  const [customProps, setCustomProps] = useState<CustomProps>(DEFAULT_CUSTOM_PROPS);
  const { registerPlayground, unregisterPlayground } = useComponentPlayground();

  // Syncs generated code into context (no window events)
  useShowcaseCodeUpdate(generateAccordionCode(customProps));

  useEffect(() => {
    registerPlayground(
      <AccordionPlaygroundStudio customProps={customProps} onChange={setCustomProps} />,
      <AccordionLivePreview customProps={customProps} />
    );
    return () => {
      unregisterPlayground();
    };
  }, [customProps, registerPlayground, unregisterPlayground]);

  return (
    <StackedCardsContainer>
      {ACCORDION_EXAMPLES.map((item, index) => (
        <AccordionCard
          key={item.id}
          item={item}
          index={index}
          total={ACCORDION_EXAMPLES.length}
          customProps={customProps}
        />
      ))}
    </StackedCardsContainer>
  );
}

// Generic naming alias for backwards compatibility
export { AccordionShowcase as AccordionExamples };
