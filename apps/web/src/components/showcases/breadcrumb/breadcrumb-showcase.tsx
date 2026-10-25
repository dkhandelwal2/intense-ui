"use client";

import React, { useState, useEffect } from "react";
import { StackedCardsContainer } from "@/components/ui/stacked-card";
import { BREADCRUMB_EXAMPLES } from "./constants";
import { CustomProps } from "./types";
import { BreadcrumbCard, DEFAULT_CUSTOM_PROPS } from "./_components";
import { generateBreadcrumbCode } from "./code-generator";

export function BreadcrumbShowcase() {
  const [customProps, setCustomProps] = useState<CustomProps>(DEFAULT_CUSTOM_PROPS);

  useEffect(() => {
    const code = generateBreadcrumbCode(customProps);
    window.dispatchEvent(
      new CustomEvent("intense-ui:code-update", {
        detail: { id: "customization", code },
      })
    );
  }, [customProps]);

  return (
    <StackedCardsContainer>
      {BREADCRUMB_EXAMPLES.map((item, index) => (
        <BreadcrumbCard
          key={item.id}
          item={item}
          index={index}
          total={BREADCRUMB_EXAMPLES.length}
          customProps={customProps}
          onCustomPropsChange={setCustomProps}
        />
      ))}
    </StackedCardsContainer>
  );
}

// Generic naming alias for backwards compatibility
export { BreadcrumbShowcase as BreadcrumbExamples };
