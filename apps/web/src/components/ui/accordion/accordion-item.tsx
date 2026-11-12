"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AccordionItemProps } from "./types";
import { AccordionItemContext } from "./context";

export function AccordionItem({
  value,
  children,
  className,
  disabled,
  borderWidth,
  borderRadius,
  borderColor,
  hideBorder,
}: AccordionItemProps) {
  const customStyles = hideBorder
    ? {
        border: "none",
        ...(borderRadius !== undefined && { borderRadius }),
      }
    : {
        ...(borderWidth !== undefined && { borderWidth }),
        ...(borderRadius !== undefined && { borderRadius }),
        ...(borderColor !== undefined && { borderColor }),
      };

  return (
    <AccordionItemContext.Provider value={{ value, disabled }}>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          !hideBorder && "border-b",
          disabled && "opacity-50",
          className
        )}
        style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}
