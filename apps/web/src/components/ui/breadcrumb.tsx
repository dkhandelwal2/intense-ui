"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, MoreHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbVariant = "default" | "chips" | "gooey" | "outline" | "ghost";
export type BreadcrumbSize = "sm" | "md" | "lg";

interface BreadcrumbContextValue {
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separator?: React.ReactNode;
  separatorColor?: string;
  activeColor?: string;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  variant: "default",
  size: "md",
});

export const useBreadcrumbContext = () => React.useContext(BreadcrumbContext);

export interface BreadcrumbProps
  extends React.ComponentPropsWithoutRef<"nav"> {
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separator?: React.ReactNode;
  separatorColor?: string;
  activeColor?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
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
  ) => {
    return (
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
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbListProps
  extends React.ComponentPropsWithoutRef<"ol"> {
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
}

const sizeClasses: Record<BreadcrumbSize, string> = {
  sm: "text-xs gap-1 sm:gap-1.5",
  md: "text-xs sm:text-sm gap-1.5 sm:gap-2",
  lg: "text-sm sm:text-base gap-2 sm:gap-2.5",
};

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, variant: propVariant, size: propSize, ...props }, ref) => {
    const context = useBreadcrumbContext();
    const variant = propVariant ?? context.variant ?? "default";
    const size = propSize ?? context.size ?? "md";

    return (
      <ol
        ref={ref}
        className={cn(
          "flex flex-wrap items-center break-words font-medium text-muted-foreground",
          sizeClasses[size],
          variant === "chips" && "gap-1 sm:gap-1.5",
          className
        )}
        {...props}
      />
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";

export interface BreadcrumbItemProps
  extends React.ComponentPropsWithoutRef<"li"> {
  isCurrentPage?: boolean;
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5 shrink-0", className)}
        {...props}
      />
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

const linkSizeStyles: Record<BreadcrumbSize, string> = {
  sm: "px-2 py-0.5 text-xs rounded-md",
  md: "px-2.5 py-1 text-xs sm:text-sm rounded-lg",
  lg: "px-3 py-1.5 text-sm sm:text-base rounded-xl",
};

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, children, href, icon, ...props }, ref) => {
    const { variant = "default", size = "md" } = useBreadcrumbContext();

    const isChipStyle = variant === "chips";
    const isOutlineStyle = variant === "outline";
    const isGhostStyle = variant === "ghost";

    const variantStyles = isChipStyle
      ? cn(
          "border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/70 dark:bg-zinc-800/60 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all shadow-2xs",
          linkSizeStyles[size]
        )
      : isOutlineStyle
        ? cn(
            "border border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all",
            linkSizeStyles[size]
          )
        : isGhostStyle
          ? cn(
              "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-all",
              linkSizeStyles[size]
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
        <Link
          href={href}
          className={cn(
            "inline-flex items-center gap-1.5 cursor-pointer",
            variantStyles,
            className
          )}
          {...props}
        >
          {content}
        </Link>
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

export interface BreadcrumbPageProps
  extends React.ComponentPropsWithoutRef<"span"> {
  icon?: React.ReactNode;
}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
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
          linkSizeStyles[size]
        )
      : isOutlineStyle
        ? cn(
            "border bg-transparent font-semibold",
            activeColor
              ? "border-current text-current"
              : "border-[var(--theme-primary)] text-[var(--theme-primary)]",
            linkSizeStyles[size]
          )
        : isGhostStyle
          ? cn(
              "bg-zinc-100 dark:bg-zinc-800/80 font-semibold",
              !activeColor && "text-foreground",
              linkSizeStyles[size]
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

export interface BreadcrumbSeparatorProps
  extends React.ComponentProps<"li"> {
  separator?: React.ReactNode;
}

const BreadcrumbSeparator = ({
  children,
  className,
  separator: propSeparator,
  style,
  ...props
}: BreadcrumbSeparatorProps) => {
  const { separator: contextSeparator, separatorColor } = useBreadcrumbContext();
  const activeSeparator = propSeparator !== undefined ? propSeparator : children !== undefined ? children : contextSeparator;

  // If separator is explicitly null or empty, don't render a separator
  if (activeSeparator === null) {
    return null;
  }

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

export interface BreadcrumbEllipsisProps
  extends React.ComponentProps<"span"> {
  onClick?: () => void;
}

const BreadcrumbEllipsis = ({
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

/* =========================================================================
   Breadcrumb Dropdown Component
   ========================================================================= */

export interface BreadcrumbDropdownItemProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
}

export function BreadcrumbDropdownItem({
  href,
  onClick,
  children,
  icon,
  active,
}: BreadcrumbDropdownItemProps) {
  const content = (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer",
        active
          ? "bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-semibold"
          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground"
      )}
    >
      {icon && (
        <span className="shrink-0 inline-flex items-center justify-center leading-none text-sm select-none [&>svg]:w-3.5 [&>svg]:h-3.5 text-zinc-400">
          {icon}
        </span>
      )}
      <span className="truncate">{children}</span>
    </div>
  );

  if (href) {
    if (href.startsWith("/")) {
      return <Link href={href}>{content}</Link>;
    }
    return <a href={href}>{content}</a>;
  }

  return content;
}

export interface BreadcrumbDropdownProps {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}

export function BreadcrumbDropdown({
  trigger,
  children,
  align = "left",
  className,
}: BreadcrumbDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const alignStyles = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer select-none"
      >
        {trigger ?? (
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-800/80 text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-2xs cursor-pointer"
            aria-label="Open breadcrumb menu"
            aria-expanded={isOpen}
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute top-full mt-1.5 z-50 min-w-[170px] max-w-[240px] p-1 rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/95 shadow-xl shadow-zinc-950/10 dark:shadow-black/50 backdrop-blur-md",
              alignStyles[align]
            )}
            onClick={() => setIsOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
   Gooey / Fluid Breadcrumb Component
   ========================================================================= */

export interface GooeyBreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbGooeyProps {
  items: GooeyBreadcrumbItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  size?: BreadcrumbSize;
  activeColor?: string;
}

const gooeySizes: Record<
  BreadcrumbSize,
  {
    button: string;
    gap: string;
    fontSize: string;
  }
> = {
  sm: {
    button: "h-8 px-3 text-xs",
    gap: "mr-2",
    fontSize: "text-xs",
  },
  md: {
    button: "h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-sm",
    gap: "mr-2.5 sm:mr-3",
    fontSize: "text-xs sm:text-sm",
  },
  lg: {
    button: "h-12 px-5 sm:px-6 text-sm sm:text-base",
    gap: "mr-3 sm:mr-3.5",
    fontSize: "text-sm sm:text-base",
  },
};

export function BreadcrumbGooey({
  items,
  activeId: controlledActiveId,
  onSelect,
  className,
  size = "md",
  activeColor,
}: BreadcrumbGooeyProps) {
  const [internalActiveId, setInternalActiveId] = React.useState(
    items[0]?.id || ""
  );

  const activeId = controlledActiveId ?? internalActiveId;
  const currentSize = gooeySizes[size];

  const handleItemClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (id === activeId) return;
    setInternalActiveId(id);
    onSelect?.(id);
  };

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId)
  );

  return (
    <nav
      aria-label="Gooey breadcrumb"
      className={cn("relative inline-flex items-center select-none", className)}
    >
      {items.map((item, index) => {
        const isItemActive = index === activeIndex;

        // Grouping logic for contiguous inactive islands
        const isBefore = index < activeIndex;
        const isFirstOfGroup = isBefore
          ? index === 0
          : index === activeIndex + 1;
        const isLastOfGroup = isBefore
          ? index === activeIndex - 1
          : index === items.length - 1;

        // Gap spacing between islands / active pill
        const hasGapAfter =
          index < items.length - 1 && (isItemActive || isLastOfGroup);

        // Border radius matching morphing islands
        const radiusClass = isItemActive
          ? "rounded-2xl"
          : isFirstOfGroup && isLastOfGroup
          ? "rounded-2xl"
          : isFirstOfGroup
          ? "rounded-l-2xl rounded-r-none"
          : isLastOfGroup
          ? "rounded-r-2xl rounded-l-none"
          : "rounded-none";

        // Clean border outlines for unified islands (1px constant to avoid layout shifts)
        const borderClass = isItemActive
          ? "border border-transparent"
          : isFirstOfGroup && isLastOfGroup
          ? "border border-zinc-200/90 dark:border-white/5"
          : isFirstOfGroup
          ? "border-y border-l border-r-0 border-zinc-200/90 dark:border-white/5"
          : isLastOfGroup
          ? "border-y border-r border-l-0 border-zinc-200/90 dark:border-white/5"
          : "border-y border-x-0 border-zinc-200/90 dark:border-white/5";

        const customActiveStyle: React.CSSProperties = isItemActive
          ? {
              backgroundColor: activeColor || "var(--theme-primary)",
            }
          : {};

        return (
          <button
            key={item.id}
            type="button"
            onClick={(e) => handleItemClick(e, item.id)}
            style={customActiveStyle}
            className={cn(
              "relative inline-flex items-center justify-center gap-1.5 cursor-pointer select-none font-medium leading-none",
              "transition-[background-color,border-radius,border-color,box-shadow,color,margin,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97]",
              currentSize.button,
              radiusClass,
              borderClass,
              hasGapAfter && currentSize.gap,
              isItemActive
                ? "bg-[var(--theme-primary)] text-white shadow-md shadow-[var(--theme-primary)]/25"
                : "bg-zinc-100/90 dark:bg-[#1a1a1c] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            )}
          >
            {item.icon && (
              <span
                className={cn(
                  "shrink-0 inline-flex items-center justify-center leading-none text-sm select-none [&>svg]:w-3.5 [&>svg]:h-3.5 transition-colors duration-200",
                  isItemActive ? "text-white" : "text-zinc-500 dark:text-zinc-400"
                )}
              >
                {item.icon}
              </span>
            )}
            {item.label ? <span>{item.label}</span> : null}
          </button>
        );
      })}
    </nav>
  );
}

/* =========================================================================
   Dynamic Next.js Pathname Helpers
   ========================================================================= */

export interface BreadcrumbSegment {
  label: React.ReactNode;
  href?: string;
  isCurrentPage?: boolean;
  icon?: React.ReactNode;
}

export interface DynamicBreadcrumbsProps
  extends React.ComponentPropsWithoutRef<typeof Breadcrumb> {
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
