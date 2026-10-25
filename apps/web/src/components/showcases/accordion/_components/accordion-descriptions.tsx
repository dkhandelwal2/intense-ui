import React from "react";

export const ACCORDION_DESCRIPTIONS: Record<string, React.ReactNode> = {
  basic: "Single collapsible panel expanding smoothly with spring physics and auto-collapse.",
  multiple: "Multi-panel expansion allowing multiple content sections to remain open simultaneously.",
  disabled: "Non-interactive disabled state with visual dimming and pointer event suppression.",
  card: "Card surface layout with independent elevation frames and dedicated padding.",
  border: "Enclosed border outline delineating container bounds and separating panel groups.",
  rtl: "Native Right-to-Left writing mode support with mirrored chevrons and aligned text.",
  "without-border": "Clean borderless presentation for flat, minimalist interface integration.",
  "without-icon": "Streamlined header trigger without chevrons for custom interactive patterns.",
  "with-onclick": "Trigger callback listener firing telemetry, analytics, or custom event handlers.",
  "expanded-default": "Pre-opened panel on initial render to highlight high-priority default content.",
  customization: "Interactive studio with real-time prop controls and dynamic code generation.",
};

interface SpecCardProps {
  title: string;
  badge: string;
  summary: React.ReactNode;
  specs: { label: string; value: string }[];
  tip?: string;
}

function AccordionSpecDetail({
  title,
  badge,
  summary,
  specs,
  tip,
}: SpecCardProps) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100 text-xs">
          <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)]" />
          <span>{title}</span>
        </div>
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20">
          {badge}
        </span>
      </div>

      {/* Deep Summary */}
      <div className="text-zinc-600 dark:text-zinc-300 text-[11.5px] leading-relaxed">
        {summary}
      </div>

      {/* Structured Technical Specs */}
      <div className="space-y-1.5 bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
        <div className="text-[9.5px] font-mono font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mb-1">
          Technical Specifications
        </div>
        {specs.map((spec, i) => (
          <div key={i} className="flex items-start justify-between gap-2 text-[11px]">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium shrink-0">{spec.label}</span>
            <span className="font-mono text-zinc-800 dark:text-zinc-200 text-right font-medium">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Best Practice Tip */}
      {tip && (
        <div className="text-[10.5px] text-zinc-500 dark:text-zinc-400 italic bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/15 rounded-lg px-2.5 py-1.5">
          💡 {tip}
        </div>
      )}
    </div>
  );
}

export const ACCORDION_INFO_DETAILS: Record<string, React.ReactNode> = {
  basic: (
    <AccordionSpecDetail
      title="Single Expand Architecture"
      badge="WAI-ARIA Pattern"
      summary={
        <>
          Enforces a single active accordion panel at any given time. Uses the{" "}
          <code className="text-[var(--theme-primary)] font-mono">type=&quot;single&quot;</code>{" "}
          configuration. Expanding another panel automatically triggers a fluid spring collapse on the previously opened section.
        </>
      }
      specs={[
        { label: "Type Mode", value: 'type="single"' },
        { label: "Collapsible", value: "collapsible={true}" },
        { label: "ARIA States", value: "aria-expanded, aria-controls" },
        { label: "Keyboard Nav", value: "Enter / Space / ArrowUp & Down" },
      ]}
      tip="Ideal for compact FAQ lists or wizards where users should focus on one section at a time."
    />
  ),
  multiple: (
    <AccordionSpecDetail
      title="Multi-Panel Expansion"
      badge="Concurrent Mode"
      summary={
        <>
          Allows arbitrary combinations of panels to open and close independently without affecting adjacent items by passing{" "}
          <code className="text-[var(--theme-primary)] font-mono">type=&quot;multiple&quot;</code> to the root accordion.
        </>
      }
      specs={[
        { label: "Type Mode", value: 'type="multiple"' },
        { label: "State Type", value: "string[] array of active keys" },
        { label: "Animation", value: "Framer Motion height: auto" },
        { label: "Spring Physics", value: "stiffness: 300, damping: 28" },
      ]}
      tip="Great for filter panels or settings where users need to compare information across multiple sections."
    />
  ),
  disabled: (
    <AccordionSpecDetail
      title="Disabled State Guardrails"
      badge="State Lock"
      summary={
        <>
          Locks trigger interaction while retaining semantic ARIA announcement. Apply the{" "}
          <code className="text-[var(--theme-primary)] font-mono">disabled</code>{" "}
          prop directly to an{" "}
          <code className="text-[var(--theme-primary)] font-mono">&lt;AccordionItem&gt;</code>{" "}
          to gray it out and disable clicks.
        </>
      }
      specs={[
        { label: "Target Prop", value: "<AccordionItem disabled>" },
        { label: "Pointer Events", value: "none (cursor not-allowed)" },
        { label: "Visual Opacity", value: "50% muted styling" },
        { label: "ARIA Disabled", value: 'aria-disabled="true"' },
      ]}
      tip="Always communicate to the user via tooltip or helper text why an item is disabled."
    />
  ),
  card: (
    <AccordionSpecDetail
      title="Elevated Card Containers"
      badge="Modular Cards"
      summary={
        <>
          Styles each accordion item as an independent elevated card container. Pass custom classes with border and background styling to each{" "}
          <code className="text-[var(--theme-primary)] font-mono">&lt;AccordionItem&gt;</code>.
        </>
      }
      specs={[
        { label: "Container Style", value: "Elevated rounded-2xl cards" },
        { label: "Item Spacing", value: "gap-3 independent items" },
        { label: "Border Radius", value: "rounded-2xl (16px)" },
        { label: "Shadow", value: "shadow-xs soft elevation" },
      ]}
      tip="Use card style when accordion items represent distinct entities like pricing tiers or order summaries."
    />
  ),
  border: (
    <AccordionSpecDetail
      title="Bounded Frame Styling"
      badge="Structural Frame"
      summary={
        <>
          Adds complete boundary borders around the accordion items. Pass a custom{" "}
          <code className="text-[var(--theme-primary)] font-mono">className=&quot;border&quot;</code>{" "}
          to the root or individual items for clear visual delineation.
        </>
      }
      specs={[
        { label: "Frame Style", value: "Enclosed border outlines" },
        { label: "Dividers", value: "divide-y divide-border/60" },
        { label: "Border Radius", value: "rounded-xl (12px)" },
        { label: "Hairlines", value: "1px crisp boundary" },
      ]}
      tip="Pair with minimalist backgrounds to provide visual containment on light surfaces."
    />
  ),
  rtl: (
    <AccordionSpecDetail
      title="Right-To-Left Bi-Directional Specs"
      badge="Internationalization"
      summary={
        <>
          Supports Right-To-Left text direction layouts automatically when placed inside a container with{" "}
          <code className="text-[var(--theme-primary)] font-mono">dir=&quot;rtl&quot;</code>. Chevrons mirror cleanly to the opposite edge.
        </>
      }
      specs={[
        { label: "Direction Prop", value: 'dir="rtl"' },
        { label: "Trigger Layout", value: "flex-row-reverse alignment" },
        { label: "Icon Rotation", value: "Mirrored 180° chevron" },
        { label: "Text Direction", value: "RTL paragraph justification" },
      ]}
      tip="Wrap your accordion in a container with dir='rtl' or configure document.dir for seamless i18n."
    />
  ),
  "without-border": (
    <AccordionSpecDetail
      title="Borderless Minimalist Specs"
      badge="Flat Layout"
      summary={
        <>
          Strips away default borders and dividers for a flat, minimalist look. Pass the{" "}
          <code className="text-[var(--theme-primary)] font-mono">hideBorder</code>{" "}
          prop directly to the{" "}
          <code className="text-[var(--theme-primary)] font-mono">&lt;AccordionItem&gt;</code>{" "}
          component.
        </>
      }
      specs={[
        { label: "Item Prop", value: "<AccordionItem hideBorder>" },
        { label: "Visual Style", value: "Ultra-light flat style" },
        { label: "Dividers", value: "Border none" },
        { label: "Use Case", value: "Embedded sidebars / documentation" },
      ]}
      tip="Best suited for editorial pages or sidebars where heavy borders add visual clutter."
    />
  ),
  "without-icon": (
    <AccordionSpecDetail
      title="Custom Trigger Glyph Specs"
      badge="Clean Trigger"
      summary={
        <>
          Suppresses the default chevron indicator for custom trigger designs. Use the{" "}
          <code className="text-[var(--theme-primary)] font-mono">hideIcon</code>{" "}
          prop on the{" "}
          <code className="text-[var(--theme-primary)] font-mono">&lt;AccordionTrigger&gt;</code>{" "}
          component.
        </>
      }
      specs={[
        { label: "Trigger Prop", value: "<AccordionTrigger hideIcon>" },
        { label: "Chevron Status", value: "Hidden (display: none)" },
        { label: "Slot Flexibility", value: "Accepts trailing badges or actions" },
        { label: "Interaction", value: "Full header still clickable" },
      ]}
      tip="Ensure the heading text or custom badge still hints at clickability if omitting the chevron."
    />
  ),
  "with-onclick": (
    <AccordionSpecDetail
      title="Interactive Callback Specs"
      badge="Event Telemetry"
      summary={
        <>
          Fires custom events when a trigger is clicked. Pass a standard{" "}
          <code className="text-[var(--theme-primary)] font-mono">onClick</code>{" "}
          handler to the{" "}
          <code className="text-[var(--theme-primary)] font-mono">&lt;AccordionTrigger&gt;</code>{" "}
          to track telemetry or update parent state.
        </>
      }
      specs={[
        { label: "Handler Prop", value: "onClick={(e) => void}" },
        { label: "Execution", value: "Synchronous callback invocation" },
        { label: "Default Action", value: "Non-blocking (item still expands)" },
        { label: "Event Object", value: "SyntheticMouseEvent<HTMLButtonElement>" },
      ]}
      tip="Use this to fire Google Analytics or PostHog tracking events when users inspect key disclosures."
    />
  ),
  "expanded-default": (
    <AccordionSpecDetail
      title="Default Open Value Specs"
      badge="Pre-Expanded"
      summary={
        <>
          Automatically opens specified items on initial render by passing the{" "}
          <code className="text-[var(--theme-primary)] font-mono">defaultValue</code>{" "}
          prop to the root{" "}
          <code className="text-[var(--theme-primary)] font-mono">&lt;Accordion&gt;</code>{" "}
          component.
        </>
      }
      specs={[
        { label: "Root Prop", value: 'defaultValue="item-1"' },
        { label: "Mount State", value: "Expanded on initial paint" },
        { label: "Animation", value: "Immediate without mount flicker" },
        { label: "SSR Support", value: "Fully server-rendered in open state" },
      ]}
      tip="Keep the most frequently needed item default-expanded to reduce friction for first-time visitors."
    />
  ),
  customization: (
    <AccordionSpecDetail
      title="Interactive Customizer Studio"
      badge="Live Studio"
      summary={
        <>
          Live interactive playground to test all accordion properties in real time. Customize styles, typography, icons, and behavior to see instant visual changes on the canvas and live generated code in the right sidebar.
        </>
      }
      specs={[
        { label: "Sync Engine", value: "PlaygroundContext + reactive props" },
        { label: "Code Export", value: "TypeScript + Tailwind CSS" },
        { label: "Physics", value: "Framer Motion spring physics" },
        { label: "Customizer Tabs", value: "Variants, Layout, Icons, Behavior" },
      ]}
      tip="Use the customizer to experiment with component themes before copying the ready-to-use code."
    />
  ),
};

export function getAccordionDescription(id: string): React.ReactNode {
  return ACCORDION_DESCRIPTIONS[id] || "An accordion example.";
}

export function getAccordionInfoContent(id: string): React.ReactNode {
  return ACCORDION_INFO_DETAILS[id] || null;
}
