"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { BreadcrumbDropdownProps, BreadcrumbDropdownItemProps } from "./types";

const NextLink = Link as any;

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
      return <NextLink href={href}>{content}</NextLink>;
    }
    return <a href={href}>{content}</a>;
  }

  return content;
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
