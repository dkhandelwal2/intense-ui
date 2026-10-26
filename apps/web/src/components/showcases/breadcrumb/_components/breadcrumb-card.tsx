"use client";

import React from "react";
import { ShowcaseCard } from "@/components/showcases/common";
import { BreadcrumbIcons } from "./breadcrumb-icons";
import { BreadcrumbExampleItem } from "../types";
import { BreadcrumbVariantRenderer } from "./breadcrumb-variant-renderer";

interface BreadcrumbCardProps {
  item: BreadcrumbExampleItem;
  index: number;
  total: number;
}

export const BreadcrumbCard = React.memo(function BreadcrumbCard({
  item,
  index,
  total,
}: BreadcrumbCardProps) {
  const IconComponent =
    BreadcrumbIcons[item.id as keyof typeof BreadcrumbIcons] ||
    BreadcrumbIcons.basic;

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
      previewClassName={
        item.id === "dropdown"
          ? "min-h-[300px] sm:min-h-[340px] pt-8 pb-28 sm:pb-36"
          : undefined
      }
    >
      <BreadcrumbVariantRenderer id={item.id} />
    </ShowcaseCard>
  );
});
