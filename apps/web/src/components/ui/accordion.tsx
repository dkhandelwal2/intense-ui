"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextType = {
  activeValues: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

type AccordionItemContextType = {
  value: string;
  disabled?: boolean;
};

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

export interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  className?: string;
  collapsible?: boolean;
}

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

export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  borderWidth?: string | number;
  borderRadius?: string | number;
  borderColor?: string;
  hideBorder?: boolean;
}

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

export interface AccordionTriggerProps {
  value?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "Left" | "Right";
  hideIcon?: boolean;
  iconColor?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "Default" | "Bold";
  headingUnderline?: boolean;
  headingColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const sizeClasses = {
  xs: "py-2 text-xs gap-1.5",
  sm: "py-3 text-sm gap-2",
  md: "py-4 text-sm gap-2",
  lg: "py-4 text-base gap-3",
  xl: "py-4 text-lg gap-3",
};

const weightClasses = {
  Default: "font-medium",
  Bold: "font-bold",
};

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

  const iconSizeClass = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-4 w-4",
    lg: "h-5 w-5",
    xl: "h-6 w-6",
  }[size];

  const renderedIcon = !hideIcon && (
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn("transition-all duration-300 ease-in-out shrink-0")}
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
        sizeClasses[size],
        weightClasses[weight],
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

export interface AccordionContentProps {
  value?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  contentColor?: string;
}

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
