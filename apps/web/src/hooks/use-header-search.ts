"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { BookOpen, Terminal, type LucideIcon } from "lucide-react";
import { componentsConfig } from "@/config/components";

export interface HeaderSearchItem {
  title: string;
  href: string;
  category: string;
  icon: LucideIcon;
  description: string;
}

export interface UseHeaderSearchOptions {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export function useHeaderSearch({ isOpen, onClose, onNavigate }: UseHeaderSearchOptions) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);

  // Search items database
  const searchItems: HeaderSearchItem[] = useMemo(
    () => [
      {
        title: "Documentation",
        href: "/docs",
        category: "Guide",
        icon: BookOpen,
        description: "Overview, architecture, principles, and guidelines.",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        category: "Guide",
        icon: Terminal,
        description: "Set up Intense UI CLI, React 19, and Tailwind CSS v4.",
      },
      ...componentsConfig
        .filter((c) => c.enabled)
        .map((c) => ({
          title: c.name,
          href: c.href,
          category: "Component",
          icon: BookOpen,
          description: c.description,
        })),
    ],
    []
  );

  const filteredSearchItems = useMemo(() => {
    if (!searchQuery.trim()) return searchItems;
    const q = searchQuery.toLowerCase();
    return searchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [searchQuery, searchItems]);

  useEffect(() => {
    setSelectedSearchIndex(0);
  }, [searchQuery]);

  // Global keyboard shortcuts (Cmd+K, Escape, Arrow navigation, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setSearchQuery("");
        }
      } else if (e.key === "Escape") {
        if (isOpen) {
          onClose();
        }
      } else if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedSearchIndex((prev) =>
            filteredSearchItems.length > 0 ? (prev + 1) % filteredSearchItems.length : 0
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedSearchIndex((prev) =>
            filteredSearchItems.length > 0
              ? (prev - 1 + filteredSearchItems.length) % filteredSearchItems.length
              : 0
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredSearchItems[selectedSearchIndex]) {
            onNavigate(filteredSearchItems[selectedSearchIndex].href);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNavigate, filteredSearchItems, selectedSearchIndex]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return {
    searchInputRef,
    searchQuery,
    setSearchQuery,
    selectedSearchIndex,
    setSelectedSearchIndex,
    filteredSearchItems,
  };
}
