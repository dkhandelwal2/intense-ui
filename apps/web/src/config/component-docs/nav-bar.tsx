import React from "react";
import { ComponentDocData } from "./types";
import {
  USAGE_CODE,
  NAVBAR_EXAMPLES,
  NAVBAR_GOOEY_API_REFERENCE,
  NAVBAR_FLOATING_API_REFERENCE,
  NAVBAR_API_REFERENCE,
} from "@/components/showcases/nav-bar/constants";
import { NavbarIcons } from "@/components/showcases/nav-bar/_components/navbar-icons";

export const navBarDoc: ComponentDocData = {
  usageCode: USAGE_CODE,
  codeContent: USAGE_CODE,
  description: (
    <>
      A fluid, responsive navigation bar component engineered with{" "}
      <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
        Framer Motion
      </strong>{" "}
      molten spring physics. Features dynamic contiguous island decoupling, detached
      floating indicator pills, prefix emoji markers, and multiple responsive scaling tiers.
    </>
  ),
  codes: NAVBAR_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: NAVBAR_EXAMPLES.map((ex) => {
    const Icon =
      NavbarIcons[ex.id as keyof typeof NavbarIcons] || NavbarIcons.gooey;
    return { id: ex.id, label: ex.label, icon: <Icon /> };
  }),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "NavbarGooey",
      props: NAVBAR_GOOEY_API_REFERENCE,
    },
    {
      title: "NavbarFloating",
      props: NAVBAR_FLOATING_API_REFERENCE,
    },
    {
      title: "Navbar",
      props: NAVBAR_API_REFERENCE,
    },
  ],
};
