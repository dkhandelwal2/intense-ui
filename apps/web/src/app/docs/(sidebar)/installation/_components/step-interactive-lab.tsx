"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { Switch } from "@registry/components/switch";
import { Slider } from "@registry/components/slider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@registry/components/accordion";
import { ScrollStepCard } from "./scroll-step-card";
import { WindowHeader } from "@/components/ui/window-header";

export interface StepInteractiveLabProps {
  stepNumber: string;
}

export function StepInteractiveLab({ stepNumber }: StepInteractiveLabProps) {
  const [activeLabTab, setActiveLabTab] = useState<"switch" | "slider" | "accordion">("switch");
  const [liveSwitchChecked, setLiveSwitchChecked] = useState(true);
  const [liveSliderValue, setLiveSliderValue] = useState(65);

  return (
    <ScrollStepCard
      stepNumber={stepNumber}
      badgeText={`STEP ${stepNumber} // LIVE DEMO LAB`}
      badgeColor="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      icon={<Code2 className="w-6 h-6 text-white" />}
      glowColor="from-indigo-500/40 to-emerald-500/20"
      numberGradient="from-indigo-400 via-teal-400 to-emerald-400"
      numberShadow="drop-shadow-[0_10px_35px_rgba(16,185,129,0.25)]"
      iconGradient="bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_25px_rgba(16,185,129,0.45)]"
      borderHoverColor="hover:border-emerald-500/40"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg sm:text-2xl font-bold text-zinc-950 dark:text-white">
              Import &amp; use with universal syntax
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap shrink-0">
              Interactive Sandbox
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
            Import from your local <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-200/50 dark:bg-white/10 px-1 py-0.5 rounded">@/components/ui/</code> directory. Interact with the live component below:
          </p>
        </div>

        {/* Lab component switcher */}
        <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/10 self-start sm:self-auto overflow-x-auto">
          {(["switch", "slider", "accordion"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveLabTab(tab)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all",
                activeLabTab === tab
                  ? "bg-emerald-500 text-white shadow-sm font-bold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Live Interactive Canvas + Code Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch w-full min-w-0">
        {/* Interactive Preview Canvas */}
        <div className="lg:col-span-5 rounded-2xl border border-emerald-500/20 dark:border-emerald-500/25 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 flex flex-col justify-between relative min-h-[220px] shadow-inner overflow-hidden w-full min-w-0">
          <WindowHeader
            title="preview"
            prompt=">_"
            action={
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
              </span>
            }
            className="w-full bg-zinc-100/50 dark:bg-white/[0.02] border-b-emerald-500/20 dark:border-b-emerald-500/25 rounded-none px-3.5 sm:px-4 py-2"
          />

          <div className="p-5 sm:p-6 flex flex-col items-center justify-center gap-4 flex-1">

          <AnimatePresence mode="wait">
            {activeLabTab === "switch" && (
              <motion.div
                key="demo-switch"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-3"
              >
                <Switch
                  checked={liveSwitchChecked}
                  onChange={(checked) => setLiveSwitchChecked(checked)}
                  size="lg"
                />
                <span className="text-xs font-mono text-zinc-500">
                  State: <strong className="text-emerald-500">{liveSwitchChecked ? "ON (true)" : "OFF (false)"}</strong>
                </span>
              </motion.div>
            )}

            {activeLabTab === "slider" && (
              <motion.div
                key="demo-slider"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-[240px] flex flex-col items-center gap-3"
              >
                <Slider
                  value={liveSliderValue}
                  min={0}
                  max={100}
                  onChange={(val) => setLiveSliderValue(val)}
                />
                <span className="text-xs font-mono text-zinc-500">
                  Value: <strong className="text-emerald-500">{liveSliderValue}%</strong>
                </span>
              </motion.div>
            )}

            {activeLabTab === "accordion" && (
              <motion.div
                key="demo-accordion"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full"
              >
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full text-xs">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="py-2.5 text-xs font-medium">
                      Is it animated?
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-zinc-500">
                      Yes! Smooth Framer Motion spring physics.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>

        {/* Corresponding Source Code */}
        <div className="lg:col-span-7 w-full max-w-full overflow-hidden rounded-xl sm:rounded-2xl border border-black/5 dark:border-white/10">
          <AnimatePresence mode="wait">
            {activeLabTab === "switch" && (
              <motion.div
                key="code-switch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-full overflow-hidden"
              >
                <CodeBlock
                  filename="src/app/page.tsx"
                  language="tsx"
                  code={`import { Switch } from "@/components/ui/switch";

export default function Demo() {
  return (
    <Switch
      checked={true}
      onChange={(val) => console.log(val)}
      size="lg"
    />
  );
}`}
                />
              </motion.div>
            )}

            {activeLabTab === "slider" && (
              <motion.div
                key="code-slider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-full overflow-hidden"
              >
                <CodeBlock
                  filename="src/app/page.tsx"
                  language="tsx"
                  code={`import { Slider } from "@/components/ui/slider";

export default function Demo() {
  return (
    <Slider
      value={65}
      min={0}
      max={100}
      onChange={(val) => console.log(val)}
    />
  );
}`}
                />
              </motion.div>
            )}

            {activeLabTab === "accordion" && (
              <motion.div
                key="code-accordion"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-full overflow-hidden"
              >
                <CodeBlock
                  filename="src/app/page.tsx"
                  language="tsx"
                  code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Demo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes! Smooth spring physics.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ScrollStepCard>
  );
}
