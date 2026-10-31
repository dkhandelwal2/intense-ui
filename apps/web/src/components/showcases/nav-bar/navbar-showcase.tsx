"use client";

import React, { useState, useEffect } from "react";
import { StackedCardsContainer } from "@/components/ui/stacked-card";
import { useShowcaseCodeUpdate } from "@/components/showcases/common";
import { useComponentPlayground } from "@/context";
import { NAVBAR_EXAMPLES } from "./constants";
import { CustomNavbarProps } from "./types";
import {
  NavbarCard,
  DEFAULT_CUSTOM_PROPS,
  NavbarPlaygroundStudio,
  NavbarLivePreview,
} from "./_components";
import { generateNavbarCode } from "./code-generator";

export function NavbarShowcase() {
  const [customProps, setCustomProps] = useState<CustomNavbarProps>(DEFAULT_CUSTOM_PROPS);
  const { registerPlayground, unregisterPlayground } = useComponentPlayground();

  // Syncs generated code into context (no window events)
  useShowcaseCodeUpdate(generateNavbarCode(customProps));

  useEffect(() => {
    registerPlayground(
      <NavbarPlaygroundStudio customProps={customProps} onChange={setCustomProps} />,
      <NavbarLivePreview customProps={customProps} />
    );
    return () => {
      unregisterPlayground();
    };
  }, [customProps, registerPlayground, unregisterPlayground]);

  return (
    <StackedCardsContainer>
      {NAVBAR_EXAMPLES.map((item, index) => (
        <NavbarCard
          key={item.id}
          item={item}
          index={index}
          total={NAVBAR_EXAMPLES.length}
        />
      ))}
    </StackedCardsContainer>
  );
}

export { NavbarShowcase as NavbarExamples };
