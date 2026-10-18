"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ className, ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" className={cn("relative", className)} {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-xs font-medium text-muted-foreground sm:gap-2",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5 sm:gap-2", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, children, href, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(
          "transition-colors hover:text-foreground cursor-pointer",
          child.props.className,
          className
        ),
      });
    }

    if (href && href.startsWith("/")) {
      return (
        <Link
          href={href}
          className={cn(
            "transition-colors hover:text-foreground cursor-pointer",
            className
          )}
          {...props}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "transition-colors hover:text-foreground cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-medium text-foreground capitalize", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5 text-[var(--theme-primary)] select-none shrink-0", className)}
    {...props}
  >
    {children ?? <ChevronRight className="w-3.5 h-3.5" />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-6 w-6 items-center justify-center text-muted-foreground", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export interface BreadcrumbSegment {
  label: React.ReactNode;
  href?: string;
  isCurrentPage?: boolean;
}

export interface DynamicBreadcrumbsProps extends React.ComponentPropsWithoutRef<typeof Breadcrumb> {
  items?: BreadcrumbSegment[];
  pathname?: string;
  separator?: React.ReactNode;
  homeHref?: string;
  currentLabel?: React.ReactNode;
}

const KNOWN_LABELS: Record<string, string> = {
  docs: "Docs",
  components: "Components",
  installation: "Installation",
  introduction: "Documentation",
};

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
    } else if (KNOWN_LABELS[part.toLowerCase()]) {
      formattedLabel = KNOWN_LABELS[part.toLowerCase()];
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

export type BreadcrumbsProps = DynamicBreadcrumbsProps;

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, pathname: customPathname, separator, currentLabel, className, ...props }, ref) => {
    const nextPathname = usePathname();
    const activePath = customPathname ?? nextPathname ?? "";

    const computedItems = React.useMemo(() => {
      if (items && items.length > 0) return items;
      if (activePath) return parsePathnameToSegments(activePath, currentLabel);
      return [];
    }, [items, activePath, currentLabel]);

    if (!computedItems.length) return null;

    return (
      <Breadcrumb ref={ref} className={className} {...props}>
        <BreadcrumbList>
          {computedItems.map((item, index) => {
            const isLast = index === computedItems.length - 1;
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {isLast || item.isCurrentPage || !item.href ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator>
                    {separator}
                  </BreadcrumbSeparator>
                )}
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

export {
  Breadcrumb,
  Breadcrumbs,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
