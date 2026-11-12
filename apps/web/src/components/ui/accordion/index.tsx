"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AccordionProps } from "./types";
import { AccordionContext } from "./context";

export function Accordion({
  children,
  type = "single",
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  collapsible = true,
}: AccordionProps) {
  const [uncontrolledValues, setUncontrolledValues] = useState<string[]>(
    Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
        ? [defaultValue]
        : []
  );

  const isControlled = controlledValue !== undefined;
  const activeValues = isControlled
    ? Array.isArray(controlledValue)
      ? controlledValue
      : controlledValue
        ? [controlledValue]
        : []
    : uncontrolledValues;

  const toggleItem = (itemValue: string) => {
    let nextValues: string[];
    if (activeValues.includes(itemValue)) {
      if (type === "single" && !collapsible) {
        return;
      }
      nextValues = activeValues.filter((v) => v !== itemValue);
    } else {
      if (type === "single") {
        nextValues = [itemValue];
      } else {
        nextValues = [...activeValues, itemValue];
      }
    }

    if (!isControlled) {
      setUncontrolledValues(nextValues);
    }

    if (onValueChange) {
      if (type === "single") {
        onValueChange(nextValues[0] || "");
      } else {
        onValueChange(nextValues);
      }
    }
  };

  return (
    <AccordionContext.Provider value={{ activeValues, toggleItem, type }}>
      <div className={cn("w-full space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export { AccordionItem } from "./accordion-item";
export { AccordionTrigger } from "./accordion-trigger";
export { AccordionContent } from "./accordion-content";
export * from "./types";
