"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbVariant,
  BreadcrumbSize,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbTrailProps {
  items: { label: string; href?: string; icon?: React.ReactNode }[];
  afterDropdownItems?: {
    label: string;
    href?: string;
    icon?: React.ReactNode;
  }[];
  dropdown?: React.ReactNode;
  currentPage: { label: string; icon?: React.ReactNode };
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separator?: React.ReactNode;
  separatorColor?: string;
  activeColor?: string;
}

export function SimpleBreadcrumbTrail({
  items,
  afterDropdownItems,
  dropdown,
  currentPage,
  variant,
  size,
  separator,
  separatorColor,
  activeColor,
}: BreadcrumbTrailProps) {
  return (
    <Breadcrumb
      className="justify-center"
      variant={variant}
      size={size}
      separator={separator}
      separatorColor={separatorColor}
      activeColor={activeColor}
    >
      <BreadcrumbList className="justify-center items-center text-center">
        {items.map((it) => (
          <React.Fragment key={it.label}>
            <BreadcrumbItem>
              <BreadcrumbLink href={it.href || "#"} icon={it.icon}>
                {it.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}

        {dropdown && (
          <>
            <BreadcrumbItem>{dropdown}</BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {afterDropdownItems?.map((it) => (
          <React.Fragment key={it.label}>
            <BreadcrumbItem>
              <BreadcrumbLink href={it.href || "#"} icon={it.icon}>
                {it.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage icon={currentPage.icon}>
            {currentPage.label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
