"use client";

import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
} from "./types";
import { BreadcrumbContext, useBreadcrumbContext } from "./context";
import { BREADCRUMB_SIZE_CLASSES } from "./constants";

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      separator,
      separatorColor,
      activeColor,
      children,
      ...props
    },
    ref
  ) => (
    <BreadcrumbContext.Provider
      value={{ variant, size, separator, separatorColor, activeColor }}
    >
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn("relative flex items-center", className)}
        {...props}
      >
        {children}
      </nav>
    </BreadcrumbContext.Provider>
  )
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, variant: propVariant, size: propSize, ...props }, ref) => {
    const context = useBreadcrumbContext();
    const variant = propVariant ?? context.variant ?? "default";
    const size = propSize ?? context.size ?? "md";

    return (
      <ol
        ref={ref}
        className={cn(
          "flex flex-wrap items-center break-words font-medium text-muted-foreground",
          BREADCRUMB_SIZE_CLASSES[size],
          variant === "chips" && "gap-1 sm:gap-1.5",
          className
        )}
        {...props}
      />
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5 shrink-0", className)}
      {...props}
    />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbSeparator = ({
  children,
  className,
  separator: propSeparator,
  style,
  ...props
}: BreadcrumbSeparatorProps) => {
  const { separator: contextSeparator, separatorColor } = useBreadcrumbContext();
  const activeSeparator =
    propSeparator !== undefined ? propSeparator : children !== undefined ? children : contextSeparator;

  if (activeSeparator === null) return null;

  const customStyle: React.CSSProperties = separatorColor
    ? { color: separatorColor, ...style }
    : style || {};

  return (
    <li
      role="presentation"
      aria-hidden="true"
      style={customStyle}
      className={cn(
        "[&>svg]:w-3.5 [&>svg]:h-3.5 text-zinc-400 dark:text-zinc-500 select-none shrink-0 flex items-center justify-center",
        className
      )}
      {...props}
    >
      {activeSeparator !== undefined ? activeSeparator : <ChevronRight className="w-3.5 h-3.5" />}
    </li>
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = ({
  className,
  onClick,
  ...props
}: BreadcrumbEllipsisProps) => (
  <span
    role="presentation"
    aria-hidden="true"
    onClick={onClick}
    className={cn(
      "flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More options</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
