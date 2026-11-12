"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NavbarProps, NavbarLinkProps } from "./types";

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant = "default", size: _size = "md", children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Main Navigation"
        className={cn(
          "w-full flex items-center justify-between",
          variant === "floating" &&
            "rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-lg p-1.5",
          variant === "pills" && "gap-2",
          className
        )}
        {...props}
      >
        {children}
      </nav>
    );
  }
);
Navbar.displayName = "Navbar";

export const NavbarList = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex items-center gap-1 sm:gap-2 list-none p-0 m-0", className)}
    {...props}
  />
));
NavbarList.displayName = "NavbarList";

export const NavbarItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("inline-flex items-center", className)} {...props} />
));
NavbarItem.displayName = "NavbarItem";

export const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ className, active, icon, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer",
        active
          ? "bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-semibold"
          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>}
      {children}
    </a>
  )
);
NavbarLink.displayName = "NavbarLink";

export { NavbarGooey } from "./navbar-gooey";
export { NavbarFloating } from "./navbar-floating";
export * from "./types";
export * from "./constants";
