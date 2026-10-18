"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CustomProps } from "../types";
import {
  CustomizerTab,
  DEFAULT_CUSTOM_PROPS,
  getModifiedCount,
  CustomizerHeader,
  BorderTab,
  TypographyTab,
  IconTab,
  BehaviorTab,
  ViewAllTab,
} from "./customizer";

export { DEFAULT_CUSTOM_PROPS } from "./customizer";

export interface AccordionCustomizerProps {
  customProps: CustomProps;
  onChange: React.Dispatch<React.SetStateAction<CustomProps>>;
}

export function AccordionCustomizer({
  customProps,
  onChange,
}: AccordionCustomizerProps) {
  const [activeTab, setActiveTab] = useState<CustomizerTab>("border");
  const modifiedCount = getModifiedCount(customProps);

  const handleReset = () => {
    onChange(DEFAULT_CUSTOM_PROPS);
  };

  return (
    <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-black/30 backdrop-blur-md p-4 sm:p-5 space-y-4 max-w-full overflow-hidden rounded-b-xl [isolation:isolate] [transform:translateZ(0)]">
      {/* ── Playground Header & Tab Navigation ── */}
      <CustomizerHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        modifiedCount={modifiedCount}
        onReset={handleReset}
      />

      {/* ── Tab Panels with Smooth Transitions ── */}
      <AnimatePresence mode="wait">
        {activeTab === "border" && (
          <BorderTab customProps={customProps} onChange={onChange} />
        )}
        {activeTab === "typography" && (
          <TypographyTab customProps={customProps} onChange={onChange} />
        )}
        {activeTab === "icon" && (
          <IconTab customProps={customProps} onChange={onChange} />
        )}
        {activeTab === "behavior" && (
          <BehaviorTab customProps={customProps} onChange={onChange} />
        )}
        {activeTab === "all" && (
          <ViewAllTab customProps={customProps} onChange={onChange} />
        )}
      </AnimatePresence>
    </div>
  );
}
