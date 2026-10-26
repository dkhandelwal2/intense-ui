import React from "react";
import { ComponentDocData } from "./types";
import {
  BREADCRUMB_EXAMPLES,
  BREADCRUMB_API_REFERENCE,
  BREADCRUMB_LIST_API_REFERENCE,
  BREADCRUMB_ITEM_API_REFERENCE,
  BREADCRUMB_LINK_API_REFERENCE,
  BREADCRUMB_PAGE_API_REFERENCE,
  BREADCRUMB_SEPARATOR_API_REFERENCE,
  BREADCRUMB_DROPDOWN_API_REFERENCE,
  BREADCRUMB_COLLAPSED_API_REFERENCE,
  BREADCRUMB_GOOEY_API_REFERENCE,
  USAGE_CODE,
} from "@/components/showcases/breadcrumb/constants";
import { BreadcrumbIcons } from "@/components/showcases/breadcrumb/_components/breadcrumb-icons";

export const breadcrumbDoc: ComponentDocData = {
  usageCode: USAGE_CODE,
  codeContent: USAGE_CODE,
  description: (
    <>
      An accessible, responsive navigation component that indicates the current
      page location within a navigational hierarchy. Built with{" "}
      <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
        WAI-ARIA
      </strong>{" "}
      standards and{" "}
      <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
        Framer Motion
      </strong>{" "}
      spring physics, supporting prefix icons, custom delimiters, collapsible
      dropdown menus, fluid gooey indicators, and modern pill styling.
    </>
  ),
  codes: BREADCRUMB_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: BREADCRUMB_EXAMPLES.map((ex) => {
    const Icon =
      BreadcrumbIcons[ex.id as keyof typeof BreadcrumbIcons] ||
      BreadcrumbIcons.basic;
    return { id: ex.id, label: ex.label, icon: <Icon className="w-3.5 h-3.5" /> };
  }),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "lucide-react", command: "npm install lucide-react" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Breadcrumb",
      props: BREADCRUMB_API_REFERENCE,
    },
    {
      title: "BreadcrumbList",
      props: BREADCRUMB_LIST_API_REFERENCE,
    },
    {
      title: "BreadcrumbItem",
      props: BREADCRUMB_ITEM_API_REFERENCE,
    },
    {
      title: "BreadcrumbLink",
      props: BREADCRUMB_LINK_API_REFERENCE,
    },
    {
      title: "BreadcrumbPage",
      props: BREADCRUMB_PAGE_API_REFERENCE,
    },
    {
      title: "BreadcrumbSeparator",
      props: BREADCRUMB_SEPARATOR_API_REFERENCE,
    },
    {
      title: "BreadcrumbDropdown",
      props: BREADCRUMB_DROPDOWN_API_REFERENCE,
    },
    {
      title: "BreadcrumbCollapsed",
      props: BREADCRUMB_COLLAPSED_API_REFERENCE,
    },
    {
      title: "BreadcrumbGooey",
      props: BREADCRUMB_GOOEY_API_REFERENCE,
    },
  ],
};
