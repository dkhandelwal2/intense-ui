"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  BreadcrumbSegment,
  BreadcrumbsProps,
} from "./types";
import { KNOWN_BREADCRUMB_LABELS } from "./constants";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "./breadcrumb-base";
import { BreadcrumbLink, BreadcrumbPage } from "./breadcrumb-links";

export function parsePathnameToSegments(
  pathname: string,
  currentLabel?: React.ReactNode
): BreadcrumbSegment[] {
  const cleanPath = pathname.split("?")[0].split("#")[0];
  const parts = cleanPath.split("/").filter(Boolean);

  if (parts.length === 0) {
    return [{ label: "Home", href: "/", isCurrentPage: true }];
  }

  const segments: BreadcrumbSegment[] = [];
  let accumulatedPath = "";

  parts.forEach((part, index) => {
    accumulatedPath += `/${part}`;
    const isCurrentPage = index === parts.length - 1;

    let formattedLabel: React.ReactNode;
    if (isCurrentPage && currentLabel) {
      formattedLabel = currentLabel;
    } else if (KNOWN_BREADCRUMB_LABELS[part.toLowerCase()]) {
      formattedLabel = KNOWN_BREADCRUMB_LABELS[part.toLowerCase()];
    } else {
      formattedLabel = part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    segments.push({
      label: formattedLabel,
      href: isCurrentPage ? undefined : accumulatedPath,
      isCurrentPage,
    });
  });

  return segments;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      pathname: customPathname,
      separator,
      currentLabel,
      className,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
    const nextPathname = usePathname();
    const activePath = customPathname ?? nextPathname ?? "";

    const computedItems = React.useMemo(() => {
      if (items && items.length > 0) return items;
      if (activePath) return parsePathnameToSegments(activePath, currentLabel);
      return [];
    }, [items, activePath, currentLabel]);

    if (!computedItems.length) return null;

    return (
      <Breadcrumb
        ref={ref}
        variant={variant}
        size={size}
        separator={separator}
        className={className}
        {...props}
      >
        <BreadcrumbList>
          {computedItems.map((item, index) => {
            const isLast = index === computedItems.length - 1;
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {isLast || item.isCurrentPage || !item.href ? (
                    <BreadcrumbPage icon={item.icon}>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href} icon={item.icon}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";

export const DynamicBreadcrumbs = Breadcrumbs;
