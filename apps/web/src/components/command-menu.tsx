"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, FileText, Component } from "lucide-react";
import { componentsConfig } from "@/config/components";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle modal with Cmd+K or Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      // Close modal on Escape
      else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Close modal if clicking outside the modal content
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Use mousedown instead of click for more reliable outside detection (catches drags)
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      setQuery("");
      command();
    },
    []
  );

  // Define searchable items
  const docsItems = [
    { name: "Introduction", href: "/docs", type: "doc" },
    { name: "Installation", href: "/docs/installation", type: "doc" },
  ];

  const componentItems = componentsConfig
    .filter((c) => c.enabled)
    .map((c) => ({
      name: c.name,
      href: c.href,
      type: "component",
    }));

  const allItems = [...docsItems, ...componentItems];

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "relative inline-flex h-9 w-full items-center justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground sm:pr-12 md:w-64 lg:w-80 px-4"
        )}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {isMounted && createPortal(
        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 z-[100]">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              />
              {/* Modal */}
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
                animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="fixed left-[50%] top-[1%] z-[101] flex w-[90%] max-w-xl flex-col overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl"
              >
                <div className="flex items-center border-b px-3">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <input
                    autoFocus
                    className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Type a command or search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && filteredItems.length > 0) {
                        runCommand(() => router.push(filteredItems[0].href));
                      }
                    }}
                  />
                </div>

                <div className="max-h-[400px] overflow-y-auto p-2 hide-scrollbar">
                  {filteredItems.length === 0 ? (
                    <p className="p-4 text-center text-sm text-muted-foreground">
                      No results found.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {filteredItems.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => runCommand(() => router.push(item.href))}
                          className="flex w-full items-center gap-2 rounded-sm px-2 py-3 text-sm hover:bg-accent hover:text-accent-foreground text-left"
                        >
                          {item.type === "doc" ? (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Component className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
