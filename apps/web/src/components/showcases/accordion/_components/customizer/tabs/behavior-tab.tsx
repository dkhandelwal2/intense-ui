"use client";

import React from "react";
import { motion } from "framer-motion";
import { Switch } from "@registry/components/switch";
import { TabProps } from "../constants";

export function BehaviorTab({ customProps, onChange }: TabProps) {
  return (
    <motion.div
      key="behavior"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      className="flex sm:grid sm:grid-cols-2 overflow-x-auto sm:overflow-visible gap-3 sm:gap-3.5 pb-2 sm:pb-0 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory items-stretch -mr-4 sm:mr-0 pr-4 sm:pr-0"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Card 1: Default Expanded */}
      <div className="min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex items-center justify-between min-h-[88px]">
        <div>
          <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Expanded on Load
          </div>
          <div className="text-[11px] text-zinc-500">
            Opens default item automatically on mount
          </div>
        </div>
        <Switch
          checked={!!customProps.isDefaultExpanded}
          onChange={(checked) =>
            onChange((prev) => ({ ...prev, isDefaultExpanded: checked }))
          }
          size="md"
        />
      </div>

      {/* Card 2: Interactive onClick */}
      <div className="min-w-[260px] sm:min-w-0 shrink-0 sm:shrink snap-start p-3.5 sm:p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.035] transition-all flex items-center justify-between min-h-[88px]">
        <div>
          <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Interactive onClick
          </div>
          <div className="text-[11px] text-zinc-500">
            Triggers custom click handler callback
          </div>
        </div>
        <Switch
          checked={!!customProps.hasOnClick}
          onChange={(checked) =>
            onChange((prev) => ({ ...prev, hasOnClick: checked }))
          }
          size="md"
        />
      </div>
    </motion.div>
  );
}
