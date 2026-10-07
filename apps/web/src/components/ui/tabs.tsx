"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // I will create this utility next

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextProps | null>(null);

export function Tabs({ defaultValue, value, onValueChange, children, className }: { defaultValue?: string; value?: string; onValueChange?: (value: string) => void; children: React.ReactNode; className?: string }) {
  const [uncontrolledTab, setUncontrolledTab] = React.useState(defaultValue || "");
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : uncontrolledTab;

  const setActiveTab = React.useCallback((newValue: string) => {
    if (!isControlled) {
      setUncontrolledTab(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  }, [isControlled, onValueChange]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className, title }: { value: string; children: React.ReactNode; className?: string; title?: string }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be inside Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      title={title}
      onClick={() => context.setActiveTab(value)}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow" : "hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be inside Tabs");

  if (context.activeTab !== value) return null;

  return (
    <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
      {children}
    </div>
  );
}
