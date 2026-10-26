import React from "react";

export const NAVBAR_DESCRIPTIONS: Record<string, React.ReactNode> = {
  gooey: "Fluid molten spring pill background that dynamically morphs and detaches across navigation segments.",
  "with-icon": "Enhanced navigation tabs with prefix emoji icons and contextual status badge markers.",
  floating: "Glassmorphic floating capsule container with spring indicator physics.",
  sizes: "Three proportional scaling tiers (sm, md, lg) tailored for compact sidebars to expansive headers.",
  customization: "Interactive studio with real-time customizer controls and synchronized code generation.",
};

interface SpecCardProps {
  title: string;
  badge: string;
  summary: React.ReactNode;
  specs: { label: string; value: string }[];
  tip?: string;
}

function NavbarSpecDetail({
  title,
  badge,
  summary,
  specs,
  tip,
}: SpecCardProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100 text-xs">
          <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)]" />
          <span>{title}</span>
        </div>
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20">
          {badge}
        </span>
      </div>

      <div className="text-zinc-600 dark:text-zinc-300 text-[11.5px] leading-relaxed">
        {summary}
      </div>

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

      {tip && (
        <div className="text-[10.5px] text-zinc-500 dark:text-zinc-400 italic bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/15 rounded-lg px-2.5 py-1.5">
          💡 {tip}
        </div>
      )}
    </div>
  );
}

export const NAVBAR_INFO_DETAILS: Record<string, React.ReactNode> = {
  gooey: (
    <NavbarSpecDetail
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
      tip="Best suited for top navigation bars, step wizards, and interactive web application headers."
    />
  ),
  "with-icon": (
    <NavbarSpecDetail
      title="Icon & Badge Specs"
      badge="Visual Scannability"
      summary={
        <>
          Pairs segment labels with Lucide vector icons or emojis, and adds optional status badges (e.g. &quot;PRO&quot;, &quot;LIVE&quot;) for rich data hierarchy.
        </>
      }
      specs={[
        { label: "Icon Alignment", value: "Left prefix, shrink-0" },
        { label: "Badge Support", value: "badge prop (ReactNode)" },
        { label: "Interactive Feedback", value: "Smooth color crossfade" },
      ]}
      tip="Use badges sparingly for attention-worthy states like live events or unread notifications."
    />
  ),
  floating: (
    <NavbarSpecDetail
      title="Capsule Dock Specs"
      badge="Glassmorphism"
      summary={
        <>
          An ultra-modern floating capsule bar with backdrop blur filters and a sliding spring layout indicator moving between active items.
        </>
      }
      specs={[
        { label: "Container Style", value: "rounded-full backdrop-blur-xl" },
        { label: "Spring Engine", value: "Framer Motion layoutId indicator" },
        { label: "Shadow Elevation", value: "Multi-layered depth shadow" },
      ]}
      tip="Place as a floating bottom bar on mobile or a centered floating header on desktop."
    />
  ),
  sizes: (
    <NavbarSpecDetail
      title="Scaling Specs"
      badge="Responsive Tiers"
      summary={
        <>
          Available in 3 calibrated scale tiers: Small (h-8), Medium (h-10 to h-11), and Large (h-12).
        </>
      }
      specs={[
        { label: "Small (sm)", value: "32px height, 12px text" },
        { label: "Medium (md)", value: "40-44px height, 13-14px text" },
        { label: "Large (lg)", value: "48px height, 15-16px text" },
      ]}
      tip="Default to medium for web headers; use small for compact panel controllers."
    />
  ),
  customization: (
    <NavbarSpecDetail
      title="Interactive Studio Specs"
      badge="Live Generator"
      summary={
        <>
          Two-way synchronized studio. Props modified in the studio update the live component preview and synthesize copy-ready TypeScript/TSX code in real time.
        </>
      }
      specs={[
        { label: "State Sync", value: "React Context & Custom Events" },
        { label: "Code Format", value: "Clean idiomatic TSX" },
        { label: "Configurable Props", value: "size, activeColor, icons, badges" },
      ]}
      tip="Customize your theme colors and copy the code directly into your project."
    />
  ),
};

export function getNavbarDescription(id: string): React.ReactNode {
  return NAVBAR_DESCRIPTIONS[id] || <>A navigation bar example.</>;
}

export function getNavbarInfoContent(id: string): React.ReactNode {
  return NAVBAR_INFO_DETAILS[id] || null;
}
