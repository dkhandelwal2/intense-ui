"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { BreadcrumbCollapsedProps } from "./types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "./breadcrumb-base";
import { BreadcrumbLink, BreadcrumbPage } from "./breadcrumb-links";

export const BreadcrumbCollapsed = React.forwardRef<HTMLElement, BreadcrumbCollapsedProps>(
  (
    {
      items, maxItems = 4, itemsBeforeCollapse = 1, itemsAfterCollapse = 2,
      isCollapsed: controlledCollapsed, defaultCollapsed = true, onCollapsedChange,
      allowCollapse = false, variant = "default", size = "md", separator,
      separatorColor, activeColor, className, ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
    const isCollapsed =
      controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

    const setCollapsed = (next: boolean) => {
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(next);
      }
      onCollapsedChange?.(next);
    };

    const shouldCollapse = isCollapsed && items.length > maxItems;
    const beforeCount = Math.max(0, itemsBeforeCollapse);
    const afterCount = Math.max(1, itemsAfterCollapse);
    const itemsBefore = shouldCollapse ? items.slice(0, beforeCount) : [];
    const itemsAfter = shouldCollapse ? items.slice(-afterCount) : [];

    return (
      <Breadcrumb
        ref={ref}
        variant={variant}
        size={size}
        separator={separator}
        separatorColor={separatorColor}
        activeColor={activeColor}
        className={className}
        {...props}
      >
        <BreadcrumbList>
          {shouldCollapse ? (
            <>
              {itemsBefore.map((item, idx) => (
                <React.Fragment key={`before-${idx}`}>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink
                        href={item.href}
                        icon={item.icon}
                        onClick={item.onClick}
                      >
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage icon={item.icon}>
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                </React.Fragment>
              ))}

              <BreadcrumbItem key="ellipsis-trigger">
                <button
                  type="button"
                  onClick={() => setCollapsed(false)}
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-2xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)]"
                  aria-label="Expand all breadcrumb items"
                  title="Click to expand all items"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </button>
              </BreadcrumbItem>
              <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>

              {itemsAfter.map((item, idx) => {
                const isLast = idx === itemsAfter.length - 1;
                return (
                  <React.Fragment key={`after-${idx}`}>
                    <BreadcrumbItem>
                      {isLast || item.isCurrentPage || !item.href ? (
                        <BreadcrumbPage icon={item.icon}>
                          {item.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={item.href}
                          icon={item.icon}
                          onClick={item.onClick}
                        >
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && (
                      <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <>
              {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                const isPreviouslyHidden =
                  idx >= beforeCount && idx < items.length - afterCount;

                const itemContent =
                  isLast || item.isCurrentPage || !item.href ? (
                    <BreadcrumbPage icon={item.icon}>
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={item.href}
                      icon={item.icon}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </BreadcrumbLink>
                  );

                return (
                  <React.Fragment key={`item-${idx}`}>
                    {isPreviouslyHidden ? (
                      <motion.li
                        initial={{ opacity: 0, scale: 0.9, y: 2 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: (idx - beforeCount) * 0.04,
                        }}
                        className="inline-flex items-center gap-1.5"
                      >
                        {itemContent}
                      </motion.li>
                    ) : (
                      <BreadcrumbItem>{itemContent}</BreadcrumbItem>
                    )}
                    {!isLast && (
                      <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                );
              })}

              {allowCollapse && items.length > maxItems && (
                <motion.li
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center ml-1"
                >
                  <button
                    type="button"
                    onClick={() => setCollapsed(true)}
                    className="flex h-5 w-5 items-center justify-center rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    aria-label="Collapse breadcrumb items"
                    title="Collapse"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </button>
                </motion.li>
              )}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
);
BreadcrumbCollapsed.displayName = "BreadcrumbCollapsed";
