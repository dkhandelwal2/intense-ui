"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@registry/components/accordion";
import { RTL_ITEMS, DEFAULT_ITEMS } from "../constants";
import { CustomProps } from "../types";

interface AccordionVariantRendererProps {
  id: string;
  customProps?: CustomProps;
}

export function AccordionVariantRenderer({
  id,
  customProps = {},
}: AccordionVariantRendererProps) {
  const isRtl = id === "rtl";
  const items = isRtl ? RTL_ITEMS : DEFAULT_ITEMS;

  const getAccordionProps = () => {
    switch (id) {
      case "multiple":
        return {
          type: "multiple" as const,
          defaultValue: ["item-1", "item-2"],
          className: "w-full",
        };
      case "card":
        return {
          type: "single" as const,
          collapsible: true,
          className: "w-full space-y-4",
        };
      case "customization":
        return {
          type: "single" as const,
          collapsible: true,
          className: "w-full space-y-2",
          defaultValue: customProps.isDefaultExpanded ? "item-2" : undefined,
        };
      case "border":
        return {
          type: "single" as const,
          collapsible: true,
          className: "w-full border rounded-md px-4",
        };
      case "expanded-default":
        return {
          type: "single" as const,
          collapsible: true,
          defaultValue: "item-2",
          className: "w-full",
        };
      default:
        return {
          type: "single" as const,
          collapsible: true,
          className: "w-full",
        };
    }
  };

  const getItemProps = (index: number) => {
    if (id === "disabled" && index === 1) return { disabled: true };
    if (id === "card") {
      return {
        className:
          "border px-4 py-2 rounded-lg bg-card text-card-foreground shadow-xs",
      };
    }
    if (id === "customization") {
      return {
        borderWidth:
          customProps.borderWidth !== undefined
            ? `${customProps.borderWidth}px`
            : undefined,
        borderColor: customProps.borderColor,
        borderRadius:
          customProps.borderRadius !== undefined
            ? `${customProps.borderRadius}px`
            : undefined,
        hideBorder: customProps.hideBorder,
        className: "px-4 bg-background",
      };
    }
    if (id === "border" && index === 2) return { className: "border-b-0" };
    if (id === "without-border") return { hideBorder: true };
    return {};
  };

  const getTriggerProps = (index: number) => {
    if (id === "card") return { className: "hover:no-underline" };
    if (id === "without-icon") return { hideIcon: true };
    if (id === "with-onclick") {
      return {
        onClick: () => {
          if (index === 0) alert("Item 1 clicked!");
          else if (index === 1) console.log("Item 2 clicked!");
        },
      };
    }
    if (id === "customization") {
      const sizeMap = {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-4 w-4",
        lg: "h-5 w-5",
        xl: "h-6 w-6",
      };
      const iconSize = sizeMap[customProps.size || "md"];

      return {
        size: customProps.size,
        weight: customProps.weight,
        iconPosition: customProps.iconPosition,
        icon:
          customProps.iconType === "Custom" ? (
            <ArrowDown
              className={iconSize}
              style={{ color: customProps.iconColor || "var(--theme-primary)" }}
            />
          ) : undefined,
        hideIcon: customProps.hideIcon,
        iconColor: customProps.iconColor,
        headingUnderline: customProps.headingUnderline,
        headingColor: customProps.headingColor,
        onClick: customProps.hasOnClick
          ? () =>
              alert(`Interactive onClick triggered for item ${index + 1}!`)
          : undefined,
      };
    }
    return {};
  };

  const accordionKey =
    id === "customization"
      ? `accordion-${customProps.isDefaultExpanded}`
      : undefined;

  const accordionProps = getAccordionProps();

  const content = (
    <Accordion key={accordionKey} {...accordionProps}>
      {items.map((item, i) => (
        <AccordionItem key={item.value} value={item.value} {...getItemProps(i)}>
          <AccordionTrigger {...getTriggerProps(i)}>
            {id === "disabled" && i === 1 ? "Is it styled? (Disabled)" : item.trigger}
          </AccordionTrigger>
          <AccordionContent
            contentColor={
              id === "customization" ? customProps.contentColor : undefined
            }
          >
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return isRtl ? (
    <div dir="rtl" className="w-full text-right">
      {content}
    </div>
  ) : (
    content
  );
}
