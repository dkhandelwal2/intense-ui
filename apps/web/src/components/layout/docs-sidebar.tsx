"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { componentsConfig } from "@/config/components";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Terminal, 
  LayoutList, 
  ToggleRight, 
  SlidersHorizontal, 
  MessageSquare, 
  MousePointerClick, 
  LayoutGrid, 
  Magnet,
  Component
} from "lucide-react";

// Icon mapping based on component name or generic fallback
const getIconForTitle = (title: string) => {
  switch (title) {
    case "Introduction": return <BookOpen className="h-4 w-4 shrink-0" />;
    case "Installation": return <Terminal className="h-4 w-4 shrink-0" />;
    case "Accordion": return <LayoutList className="h-4 w-4 shrink-0" />;
    case "Switch": return <ToggleRight className="h-4 w-4 shrink-0" />;
    case "Slider": return <SlidersHorizontal className="h-4 w-4 shrink-0" />;
    case "Tooltip": return <MessageSquare className="h-4 w-4 shrink-0" />;
    case "Glowing Button": return <MousePointerClick className="h-4 w-4 shrink-0" />;
    case "Bento Grid": return <LayoutGrid className="h-4 w-4 shrink-0" />;
    case "Magnetic Card": return <Magnet className="h-4 w-4 shrink-0" />;
    default: return <Component className="h-4 w-4 shrink-0" />;
  }
};

export const docsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Installation", href: "/docs/installation" },
      ],
    },
    {
      title: "Components",
      items: componentsConfig
        .filter((c) => c.enabled)
        .map((c) => ({ title: c.name, href: c.href })),
    },
  ],
};

export function DocsSidebar({ onClick, isCollapsed = false }: { onClick?: () => void, isCollapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <div className="w-full relative">
      {docsConfig.sidebarNav.map((item, index) => (
        <motion.div 
          key={index} 
          className={cn("pb-6", isCollapsed && "pb-2")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {/* Section titles */}
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.h4 
                key="title-expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-2 rounded-md px-2 py-1 text-sm font-bold tracking-tight whitespace-nowrap overflow-hidden"
              >
                {item.title}
              </motion.h4>
            ) : (
               <motion.div key="title-collapsed" className="h-4" /> // spacing when collapsed
            )}
          </AnimatePresence>
          
          <div className="flex flex-col text-sm gap-1">
            {item.items.map((linkItem, linkIndex) => {
              const isActive = pathname === linkItem.href;
              const icon = getIconForTitle(linkItem.title);
              
              return (
                <motion.div
                  key={linkIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: (index * 0.1) + (linkIndex * 0.05) }}
                >
                  <Link
                    href={linkItem.href}
                    onClick={onClick}
                    title={isCollapsed ? linkItem.title : undefined}
                    className={cn(
                      "group relative flex w-full items-center rounded-md border border-transparent transition-all duration-200 overflow-hidden",
                      isCollapsed ? "justify-center px-0 py-3" : "px-3 py-2",
                      isActive
                        ? "font-medium text-primary bg-primary/10"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarIndicator"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    
                    <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
                      {icon}
                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.div
                            key="text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="whitespace-nowrap"
                          >
                            {linkItem.title}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
