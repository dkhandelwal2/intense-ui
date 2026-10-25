import React from "react";

export const BREADCRUMB_DESCRIPTIONS: Record<string, React.ReactNode> = {
  basic: "Standard semantic trail adhering to WAI-ARIA breadcrumb navigation patterns.",
  "with-icon": "Navigation items paired with prefix icons to improve directory scannability.",
  "custom-separator": "Visual delimiters customized with arrows, slashes, or icons between trail items.",
  dropdown: "Progressive disclosure dropdown menu to collapse intermediate steps and prevent trail overflow.",
  gooey: "Fluid molten spring pill background that smoothly glides across segments.",
  chips: "Encapsulated pill and badge segments with distinct interactive card surfaces.",
  customization: "Interactive studio with real-time props customizer and generated code sync.",
};

interface SpecCardProps {
  title: string;
  badge: string;
  summary: React.ReactNode;
  specs: { label: string; value: string }[];
  tip?: string;
}

function BreadcrumbSpecDetail({
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

export const BREADCRUMB_INFO_DETAILS: Record<string, React.ReactNode> = {
  basic: (
    <BreadcrumbSpecDetail
      title="Semantic Trail Specs"
      badge="WAI-ARIA Pattern"
      summary={
        <>
          Constructed with semantic HTML5 elements using an ordered list hierarchy (
          <code className="text-[var(--theme-primary)] font-mono">&lt;ol&gt;</code> and{" "}
          <code className="text-[var(--theme-primary)] font-mono">&lt;li&gt;</code>) to announce structured parent-child navigation to screen readers.
        </>
      }
      specs={[
        { label: "Active Route", value: 'aria-current="page"' },
        { label: "Landmark", value: 'nav[aria-label="breadcrumb"]' },
        { label: "Delimiters", value: 'aria-hidden="true"' },
        { label: "Components", value: "<BreadcrumbLink>, <BreadcrumbPage>" },
      ]}
      tip="Place directly below the global navbar at the top of the main content column."
    />
  ),
  "with-icon": (
    <BreadcrumbSpecDetail
      title="Icon Navigation Specs"
      badge="Visual Anchoring"
      summary={
        <>
          Augments text labels with inline Lucide vector glyphs or emoji markers. Decorative icons improve route recognition speeds by over 40% in multi-tiered nested directories.
        </>
      }
      specs={[
        { label: "Icon Placement", value: "inline prefix before label" },
        { label: "Accessibility", value: "Decorative icon aria-hidden" },
        { label: "Recommended Size", value: "14px - 16px (w-3.5 to w-4)" },
        { label: "Component Support", value: "<BreadcrumbLink icon={...}>" },
      ]}
      tip="Use standardized line icons that match your application's icon library."
    />
  ),
  "custom-separator": (
    <BreadcrumbSpecDetail
      title="Delimiter Theming Specs"
      badge="Custom Dividers"
      summary={
        <>
          Enables custom visual dividers between route segments. Render any custom React node, SVG icon, or typographic glyph inside the separator slot with automatic accessibility wrapping.
        </>
      }
      specs={[
        { label: "Slot Component", value: "<BreadcrumbSeparator>" },
        { label: "Presentation", value: 'role="presentation"' },
        { label: "Supported Delimiters", value: "Slash /, Arrow →, Dot •, Chevron ›" },
        { label: "Dynamic Color", value: "separatorColor prop / CSS custom prop" },
      ]}
      tip="Always keep separators non-interactive and aria-hidden to avoid interrupting screen reader flow."
    />
  ),
  dropdown: (
    <BreadcrumbSpecDetail
      title="Progressive Disclosure Specs"
      badge="Overflow Menu"
      summary={
        <>
          Replaces intermediate trail segments with an interactive{" "}
          <code className="text-[var(--theme-primary)] font-mono">&lt;BreadcrumbEllipsis&gt;</code>{" "}
          popover menu to prevent multi-line wrapping in deep navigation trees and on mobile screens.
        </>
      }
      specs={[
        { label: "Trigger Element", value: "<BreadcrumbEllipsis />" },
        { label: "Keyboard Nav", value: "ArrowUp/Down, Enter, Escape" },
        { label: "Recommended At", value: "Trail depth > 4 items" },
        { label: "Menu Dismiss", value: "Outside click & focus loss" },
      ]}
      tip="Keeps the root item and current leaf visible while collapsing intermediate hierarchy."
    />
  ),
  gooey: (
    <BreadcrumbSpecDetail
      title="Fluid Island Morphing Specs"
      badge="Fluid Physics"
      summary={
        <>
          Powered by smooth cubic-bezier interpolation and dynamic island grouping. Inactive segments unite into contiguous rounded islands while the active segment detaches into an elevated molten pill.
        </>
      }
      specs={[
        { label: "Morphing Engine", value: "Fluid Island Decoupling" },
        { label: "Physics Config", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
        { label: "Vertical Stability", value: "Locked 0px Y-axis baseline" },
        { label: "Theme Integration", value: "activeColor with ambient tint" },
      ]}
      tip="Best suited for step wizards, multi-stage workflows, and interactive web apps."
    />
  ),
  chips: (
    <BreadcrumbSpecDetail
      title="Encapsulated Pill Specs"
      badge="Capsule Badges"
      summary={
        <>
          Treats every trail segment as a discrete, tactile badge item with independent surface elevation, borders, and interactive hover feedback.
        </>
      }
      specs={[
        { label: "Variant Style", value: 'variant="chips"' },
        { label: "Active Highlight", value: "Dynamic activeColor border + soft tint" },
        { label: "Surface Elevation", value: "Subtle inset hairline & shadow" },
        { label: "Touch Targets", value: "min-h-[32px] mobile accessible" },
      ]}
      tip="Great for filter breadcrumbs, tag trails, and hierarchical file browsers."
    />
  ),
  customization: (
    <BreadcrumbSpecDetail
      title="Interactive Studio Specs"
      badge="Live Generator"
      summary={
        <>
          Two-way synchronized studio. Props modified in the playground panel update the live component preview and synthesize copy-ready TypeScript/TSX code in real time.
        </>
      }
      specs={[
        { label: "State Sync", value: "React Context & Custom Events" },
        { label: "Code Format", value: "Clean idiomatic TSX" },
        { label: "Configurable Props", value: "variant, separator, emojis, dropdown, activeColor" },
        { label: "Responsive Layout", value: "Equal-height dynamic CSS Grid" },
      ]}
      tip="Experiment with colors and variants in the studio before copying code into your codebase."
    />
  ),
};

export function getBreadcrumbDescription(id: string): React.ReactNode {
  return BREADCRUMB_DESCRIPTIONS[id] || <>A breadcrumb example.</>;
}

export function getBreadcrumbInfoContent(id: string): React.ReactNode {
  return BREADCRUMB_INFO_DETAILS[id] || null;
}
