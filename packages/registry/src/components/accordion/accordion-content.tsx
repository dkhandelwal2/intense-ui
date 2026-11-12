"use client";

import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AccordionContentProps } from "./types";
import { AccordionContext, AccordionItemContext } from "./context";

export function AccordionContent({
  value: propValue,
  children,
  className,
  disabled: _disabled,
  contentColor,
}: AccordionContentProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext) {
    throw new Error("AccordionContent must be used within an Accordion");
  }

  const value = propValue ?? itemContext?.value;
  const { activeValues } = accordionContext;
  const isOpen = value ? activeValues.includes(value) : false;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              "pb-4 pt-0 text-sm transition-all duration-300 ease-in-out",
              !contentColor && "text-zinc-600 dark:text-zinc-400",
              className
            )}
            style={contentColor ? { color: contentColor } : undefined}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
