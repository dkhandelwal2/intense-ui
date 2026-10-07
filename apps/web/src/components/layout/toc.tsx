"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    // Slight delay to allow DOM to render dynamically mapped headings
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll("h2, h3"))
        .filter((el) => el.id)
        .map((el) => ({
          id: el.id,
          text: el.textContent || "",
          level: Number(el.tagName.charAt(1)),
        }));
      setHeadings(elements);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 pt-8">
      <p className="font-medium text-sm mb-4 text-foreground">On this page</p>
      <div className="relative border-l border-border/50 pl-4 space-y-1">
        {headings.map((heading, i) => {
          const isActive = activeId === heading.id;
          return (
            <motion.div
              key={heading.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTOCIndicator"
                  className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-[2px] h-full bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <Link
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 text-[13px] transition-all hover:text-foreground line-clamp-1",
                  heading.level === 3 ? "pl-4" : "",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {heading.text}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
