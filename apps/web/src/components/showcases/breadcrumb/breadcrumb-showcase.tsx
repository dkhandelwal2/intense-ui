"use client";

import React, { useState, useEffect } from "react";
import { StackedCardsContainer } from "@/components/ui/stacked-card";
import { useShowcaseCodeUpdate } from "@/components/showcases/common";
import { useComponentPlayground } from "@/components/layout/component-page-layout";
import { BREADCRUMB_EXAMPLES } from "./constants";
import { CustomProps } from "./types";
import {
  BreadcrumbCard,
  DEFAULT_CUSTOM_PROPS,
  BreadcrumbPlaygroundStudio,
  BreadcrumbLivePreview,
} from "./_components";
import { generateBreadcrumbCode } from "./code-generator";

export function BreadcrumbShowcase() {
  const [customProps, setCustomProps] = useState<CustomProps>(DEFAULT_CUSTOM_PROPS);
  const { registerPlayground, unregisterPlayground, setCustomizedCode } = useComponentPlayground();

  const code = generateBreadcrumbCode(customProps);
  useShowcaseCodeUpdate(code);

  useEffect(() => {
    setCustomizedCode(code);
  }, [code, setCustomizedCode]);

  useEffect(() => {
    registerPlayground(
      <BreadcrumbPlaygroundStudio
        customProps={customProps}
        onChange={setCustomProps}
      />,
      <BreadcrumbLivePreview customProps={customProps} />
    );
    return () => {
      unregisterPlayground();
    };
  }, [customProps, registerPlayground, unregisterPlayground]);

  return (
    <StackedCardsContainer>
      {BREADCRUMB_EXAMPLES.map((item, index) => (
        <BreadcrumbCard
          key={item.id}
          item={item}
          index={index}
          total={BREADCRUMB_EXAMPLES.length}
        />
      ))}
    </StackedCardsContainer>
  );
}

// Generic naming alias for backwards compatibility
export { BreadcrumbShowcase as BreadcrumbExamples };
