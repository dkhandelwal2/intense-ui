"use client";

import * as React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocsSidebar } from "./docs-sidebar";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function SidebarWrapper() {
  const pathname = usePathname();

  // Mobile functionality for ALL screen sizes (overlay style)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Desktop fixed functionality
  const [isOpen, setIsOpen] = React.useState(true);
  const [width, setWidth] = React.useState(260); // Default width
  const isResizing = React.useRef(false);

  const COLLAPSED_WIDTH = 64; // width when minimized

  // Close mobile overlay on route change
  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Auto-collapse sidebar on tablet / small desktop (<1280px)
  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 1280px)");
    const handleChange = (e: any) => {
      if (e.matches) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    // Initial check
    handleChange(mql);
    
    // Add listener for crossing the breakpoint
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const startResizing = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const stopResizing = React.useCallback(() => {
    if (isResizing.current) {
      isResizing.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing.current) {
        const newWidth = mouseMoveEvent.clientX;
        if (newWidth >= 200 && newWidth <= 450) {
          setWidth(newWidth);
        }
      }
    },
    []
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  // Force strict pixel strings to guarantee CSS applies them!
  const currentWidthStr = isOpen ? `${width}px` : `${COLLAPSED_WIDTH}px`;

  return (
    <>
      <button
        className="md:hidden fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 transition-all active:scale-95"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <PanelLeftClose className="h-6 w-6" /> : <PanelLeftOpen className="h-6 w-6" />}
      </button>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 z-50 h-full w-4/5 max-w-sm border-r bg-background p-6 shadow-2xl overflow-y-auto pt-16">
            <DocsSidebar onClick={() => setIsMobileOpen(false)} isCollapsed={false} />
          </div>
        </div>
      )}

      {/* Desktop Resizable/Collapsible Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: currentWidthStr,
          minWidth: currentWidthStr,
          maxWidth: currentWidthStr,
          paddingLeft: isOpen ? "24px" : "8px",
          paddingRight: isOpen ? "24px" : "8px"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-14 z-30 hidden h-[calc(100vh-3.5rem)] md:block border-r border-border/40 group/sidebar bg-background flex-shrink-0"
      >
        {/* Toggle Button: Positioned on the border for a premium feel */}
        <div className="absolute right-[-14px] top-6 z-50 hidden md:flex transition-all">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-7 w-7 items-center justify-center rounded-sm bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-foreground hover:shadow-md transition-all"
          >
            {isOpen ? <PanelLeftClose className="h-6 w-6" /> : <PanelLeftOpen className="h-6 w-6" />}
          </button>
        </div>

        {/* Prevent horizontal text from artificially expanding the flex-item width! */}
        <div className="overflow-y-auto overflow-x-hidden pt-14 pb-10 h-full w-full hide-scrollbar">
          <DocsSidebar isCollapsed={!isOpen} />
        </div>

        {isOpen && (
          <div
            className="absolute top-0 right-[-3px] w-[6px] h-full cursor-col-resize hover:bg-primary/50 active:bg-primary transition-colors z-40 group"
            onMouseDown={startResizing}
          >
            <div className="absolute right-[3px] top-0 bottom-0 w-[2px] bg-primary/20 group-hover:bg-primary/50 group-active:bg-primary transition-colors" />
          </div>
        )}
      </motion.aside>
    </>
  );
}
