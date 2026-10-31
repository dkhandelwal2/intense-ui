"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/layout/sidebar";
import { usePathname } from "next/navigation";
import type { MobileSidebarDrawerProps } from "./types";

export function MobileSidebarDrawer({
  isOpen,
  onClose,
}: MobileSidebarDrawerProps) {
  const pathname = usePathname();
  const prevPathname = React.useRef(pathname);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile drawer ONLY when route actually navigates
  React.useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Lock body scroll safely when mobile drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-sidebar-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] xl:hidden flex p-4 pt-20 pointer-events-auto"
        >
          {/* Fade Backdrop */}
          <motion.div
            key="mobile-sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm -z-10"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-over Card with Spring Physics */}
          <motion.div
            key="mobile-sidebar-panel"
            initial={{ x: -120, opacity: 0, scale: 0.94 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -120, opacity: 0, scale: 0.94 }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 320,
              mass: 0.8,
            }}
            className="relative w-full max-w-[270px] h-[calc(100vh-6.5rem)] rounded-[32px] bg-background/95 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl shadow-2xl shadow-black/15 dark:shadow-black/70 py-3.5 px-0 flex flex-col overflow-visible will-change-[transform,opacity] border border-black/10 dark:border-white/10"
          >
            <Separator
              orientation="vertical"
              className="absolute right-0 top-0 bottom-0 pointer-events-none"
            />
            <Sidebar onClick={onClose} onToggleCollapse={onClose} isCollapsed={false} />
          </motion.div>

          {/* Click-outside backdrop space */}
          <div className="flex-1" onClick={onClose} aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
