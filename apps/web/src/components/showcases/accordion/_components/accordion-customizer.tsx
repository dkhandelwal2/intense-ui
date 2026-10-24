"use client";

import React from "react";
import { CustomProps } from "../types";
import {
  DEFAULT_CUSTOM_PROPS,
  getModifiedCount,
  CustomizerHeader,
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
  const modifiedCount = getModifiedCount(customProps);

  const handleReset = () => {
    onChange(DEFAULT_CUSTOM_PROPS);
  };

  return (
    <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-black/30 backdrop-blur-md p-4 sm:p-5 space-y-4 max-w-full overflow-hidden rounded-b-xl [isolation:isolate] [transform:translateZ(0)]">
      {/* ── Playground Header & Reset Action ── */}
      <CustomizerHeader
        modifiedCount={modifiedCount}
        onReset={handleReset}
      />

      {/* ── All Props Controls ── */}
      <ViewAllTab customProps={customProps} onChange={onChange} />
    </div>
  );
}
