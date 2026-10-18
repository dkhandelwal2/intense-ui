import React from "react";
import { ComponentDocData } from "./types";
import {
  USAGE_CODE,
  MANUAL_INSTALL_CODE,
  ACCORDION_EXAMPLES,
  ACCORDION_API_REFERENCE,
  ACCORDION_ITEM_API_REFERENCE,
  ACCORDION_TRIGGER_API_REFERENCE,
  ACCORDION_CONTENT_API_REFERENCE,
} from "@/components/showcases/accordion/constants";
import { AccordionIcons } from "@/components/showcases/accordion/_components/accordion-icons";

export const accordionDoc: ComponentDocData = {
  usageCode: USAGE_CODE,
  codeContent: MANUAL_INSTALL_CODE,
  description: (
    <>
      A beautifully animated, accessible accordion component built with{" "}
      <strong className="font-medium text-zinc-900 dark:text-zinc-100">
        Framer Motion
      </strong>
      . Perfect for FAQs, collapsible menus, and reducing vertical screen
      clutter in modern React and Next.js applications. Fully typed, keyboard
      navigable, and endlessly customizable.
    </>
  ),
  codes: ACCORDION_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: ACCORDION_EXAMPLES.map((ex) => {
    const Icon =
      AccordionIcons[ex.id as keyof typeof AccordionIcons] ||
      AccordionIcons.basic;
    return { id: ex.id, label: ex.label, icon: <Icon /> };
  }),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "lucide-react", command: "npm install lucide-react" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Accordion",
      props: ACCORDION_API_REFERENCE,
    },
    {
      title: "AccordionItem",
      props: ACCORDION_ITEM_API_REFERENCE,
    },
    {
      title: "AccordionTrigger",
      props: ACCORDION_TRIGGER_API_REFERENCE,
    },
    {
      title: "AccordionContent",
      props: ACCORDION_CONTENT_API_REFERENCE,
    },
  ],
};
