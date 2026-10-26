"use client";

import React from "react";
import { ShowcaseCard } from "@/components/showcases/common";
import { NavbarIcons } from "./navbar-icons";
import { NavbarExampleItem } from "../types";
import { NavbarVariantRenderer } from "./navbar-variant-renderer";

interface NavbarCardProps {
  item: NavbarExampleItem;
  index: number;
  total: number;
}

export const NavbarCard = React.memo(function NavbarCard({
  item,
  index,
  total,
}: NavbarCardProps) {
  const IconComponent =
    NavbarIcons[item.id as keyof typeof NavbarIcons] ||
    NavbarIcons.gooey;

  return (
    <ShowcaseCard
      id={item.id}
      label={item.label}
      icon={IconComponent}
      description={item.description}
      spec={item.spec}
      infoContent={item.infoContent}
      code={item.code}
      index={index}
      total={total}
    >
      <NavbarVariantRenderer id={item.id} />
    </ShowcaseCard>
  );
});
