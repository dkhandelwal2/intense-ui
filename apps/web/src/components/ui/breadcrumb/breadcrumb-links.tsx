"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BreadcrumbLinkProps, BreadcrumbPageProps } from "./types";
import { useBreadcrumbContext } from "./context";
import { BREADCRUMB_LINK_SIZE_STYLES } from "./constants";

const NextLink = Link as any;

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, children, href, icon, ...props }, ref) => {
    const { variant = "default", size = "md" } = useBreadcrumbContext();
    const isChipStyle = variant === "chips";
    const isOutlineStyle = variant === "outline";
    const isGhostStyle = variant === "ghost";

    const variantStyles = isChipStyle
      ? cn(
          "border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/70 dark:bg-zinc-800/60 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all shadow-2xs",
          BREADCRUMB_LINK_SIZE_STYLES[size]
        )
      : isOutlineStyle
        ? cn(
            "border border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all",
            BREADCRUMB_LINK_SIZE_STYLES[size]
          )
        : isGhostStyle
          ? cn(
              "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-all",
              BREADCRUMB_LINK_SIZE_STYLES[size]
            )
          : "transition-colors hover:text-foreground";

    const content = (
      <>
        {icon && (
          <span className="shrink-0 inline-flex items-center justify-center leading-none text-sm select-none [&>svg]:w-3.5 [&>svg]:h-3.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </>
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
      return React.cloneElement(child, {
        className: cn(
          "inline-flex items-center gap-1.5 cursor-pointer",
          variantStyles,
          child.props.className,
          className
        ),
      });
    }

    if (href && href.startsWith("/")) {
      return (
        <NextLink
          href={href}
          className={cn(
            "inline-flex items-center gap-1.5 cursor-pointer",
            variantStyles,
            className
          )}
          {...props}
        >
          {content}
        </NextLink>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "inline-flex items-center gap-1.5 cursor-pointer",
          variantStyles,
          className
        )}
        {...props}
      >
        {content}
      </a>
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, children, icon, style, ...props }, ref) => {
    const { variant = "default", size = "md", activeColor } = useBreadcrumbContext();
    const isChipStyle = variant === "chips";
    const isOutlineStyle = variant === "outline";
    const isGhostStyle = variant === "ghost";

    const customActiveStyle: React.CSSProperties = activeColor
      ? {
          color: activeColor,
          borderColor: isChipStyle || isOutlineStyle ? activeColor : undefined,
          backgroundColor: isChipStyle
            ? `color-mix(in srgb, ${activeColor} 12%, transparent)`
            : undefined,
          ...style,
        }
      : style || {};

    const variantStyles = isChipStyle
      ? cn(
          "border font-semibold shadow-xs",
          activeColor
            ? "border-current/40 bg-current/10 text-current"
            : "border-[var(--theme-primary)]/40 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]",
          BREADCRUMB_LINK_SIZE_STYLES[size]
        )
      : isOutlineStyle
        ? cn(
            "border bg-transparent font-semibold",
            activeColor
              ? "border-current text-current"
              : "border-[var(--theme-primary)] text-[var(--theme-primary)]",
            BREADCRUMB_LINK_SIZE_STYLES[size]
          )
        : isGhostStyle
          ? cn(
              "bg-zinc-100 dark:bg-zinc-800/80 font-semibold",
              !activeColor && "text-foreground",
              BREADCRUMB_LINK_SIZE_STYLES[size]
            )
          : cn("font-semibold", !activeColor && "text-foreground");

    return (
      <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        style={customActiveStyle}
        className={cn(
          "inline-flex items-center gap-1.5 select-none",
          variantStyles,
          className
        )}
        {...props}
      >
        {icon && (
          <span className="shrink-0 inline-flex items-center justify-center leading-none text-sm select-none [&>svg]:w-3.5 [&>svg]:h-3.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </span>
    );
  }
);
BreadcrumbPage.displayName = "BreadcrumbPage";
