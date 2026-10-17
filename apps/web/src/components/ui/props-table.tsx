"use client";

import React from "react";
import { motion } from "framer-motion";
import { Component } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PropDefinition {
  prop: string;
  type: string;
  defaultValue?: string;
  description: React.ReactNode;
}

export interface PropGroup {
  title?: string;
  description?: string;
  props: PropDefinition[];
}

export interface PropsTableProps {
  groups?: PropGroup[];
  props?: PropDefinition[];
  className?: string;
}

export function PropItemRow({
  item,
  delay = 0,
}: {
  item: PropDefinition;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className="flex flex-col gap-1.5 border-b border-black/5 dark:border-white/5 pb-3.5 pt-1.5"
    >
      <div className="flex items-center justify-between gap-2 min-w-0">
        <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          {item.prop}
        </span>
        <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 truncate max-w-[65%] text-right font-medium">
          {item.type}
        </span>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {item.description}
      </p>
      {item.defaultValue && item.defaultValue !== "-" && (
        <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1 pt-0.5">
          <span>default:</span>
          <span className="text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-white/5 px-2 py-0.2 rounded-full">
            {item.defaultValue}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function formatComponentTag(title: string) {
  const trimmed = title.trim();
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    return trimmed;
  }
  if (/^[A-Za-z][a-zA-Z0-9]*$/.test(trimmed)) {
    return `<${trimmed} />`;
  }
  return trimmed;
}

export function PropsTable({ groups, props, className }: PropsTableProps) {
  if (groups && groups.length > 0) {
    return (
      <div className={cn("flex flex-col gap-6 w-full", className)}>
        {groups.map((group, groupIdx) => {
          const displayTitle = group.title ? formatComponentTag(group.title) : "";

          return (
            <div key={group.title || groupIdx} className="space-y-2.5">
              {group.title && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-between px-3 py-1.5 rounded-full bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 shadow-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 shrink-0 flex items-center justify-center">
                      <Component className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
                      {displayTitle}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-700/70 text-zinc-600 dark:text-zinc-300 border border-black/5 dark:border-white/5 shrink-0">
                    {group.props.length} {group.props.length === 1 ? "prop" : "props"}
                  </span>
                </motion.div>
              )}
              {group.description && (
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 px-1">
                  {group.description}
                </p>
              )}
              <div className="flex flex-col">
                {group.props.map((item, itemIdx) => (
                  <PropItemRow
                    key={item.prop}
                    item={item}
                    delay={Math.min(itemIdx * 0.03, 0.12)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (props && props.length > 0) {
    return (
      <div className={cn("flex flex-col w-full", className)}>
        {props.map((item, itemIdx) => (
          <PropItemRow
            key={item.prop}
            item={item}
            delay={Math.min(itemIdx * 0.03, 0.12)}
          />
        ))}
      </div>
    );
  }

  return null;
}
