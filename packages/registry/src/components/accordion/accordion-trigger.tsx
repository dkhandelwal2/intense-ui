"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccordionTriggerProps } from "./types";
import { AccordionContext, AccordionItemContext } from "./context";
import {
  ACCORDION_SIZE_CLASSES,
  ACCORDION_WEIGHT_CLASSES,
  ACCORDION_ICON_SIZE_CLASSES,
} from "./constants";

export function AccordionTrigger({
  value: propValue,
  children,
  className,
  disabled: propDisabled,
  icon,
  iconPosition = "Right",
  hideIcon,
  iconColor,
  size = "md",
  weight = "Default",
  headingUnderline,
  headingColor,
  onClick,
}: AccordionTriggerProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext) {
    throw new Error("AccordionTrigger must be used within an Accordion");
  }

  const value = propValue ?? itemContext?.value;
  const disabled = propDisabled ?? itemContext?.disabled;

  const { activeValues, toggleItem } = accordionContext;
  const isOpen = value ? activeValues.includes(value) : false;

  const iconSizeClass = ACCORDION_ICON_SIZE_CLASSES[size];

  const renderedIcon = !hideIcon && (
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="transition-all duration-300 ease-in-out shrink-0"
      style={iconColor ? { color: iconColor } : undefined}
    >
      {icon ? (
        icon
      ) : (
        <ChevronDown
          className={cn(
            iconSizeClass,
            "transition-all duration-300 ease-in-out shrink-0",
            !iconColor && "text-zinc-500"
          )}
        />
      )}
    </motion.div>
  );

  return (
    <button
      disabled={disabled}
      onClick={(e) => {
        if (value) toggleItem(value);
        if (onClick) onClick(e);
      }}
      style={headingColor ? { color: headingColor } : undefined}
      className={cn(
        "flex flex-1 w-full items-center transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950",
        ACCORDION_SIZE_CLASSES[size],
        ACCORDION_WEIGHT_CLASSES[weight],
        iconPosition === "Right" ? "justify-between" : "justify-start",
        disabled ? "cursor-not-allowed" : "",
        headingUnderline ? "underline" : "",
        className
      )}
    >
      {iconPosition === "Left" && renderedIcon}
      {children}
      {iconPosition === "Right" && renderedIcon}
    </button>
  );
}
