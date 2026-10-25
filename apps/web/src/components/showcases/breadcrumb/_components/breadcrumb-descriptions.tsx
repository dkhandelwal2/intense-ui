import React from "react";

export function getBreadcrumbDescription(id: string): React.ReactNode {
  switch (id) {
    case "basic":
      return (
        <div className="space-y-2">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            Semantic & Accessible Navigation
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            A standard WAI-ARIA breadcrumb trail utilizing semantic HTML elements
            (&lt;nav&gt;, &lt;ol&gt;, &lt;li&gt;, and &lt;a&gt;) with automatic
            aria-current=&quot;page&quot; tagging.
          </p>
        </div>
      );
    case "with-icon":
      return (
        <div className="space-y-2">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            Visual Icon Identifiers
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Enhances scannability by prepending contextual icons to each path
            segment, providing instant visual hierarchy for nested routes.
          </p>
        </div>
      );
    case "custom-separator":
      return (
        <div className="space-y-2">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            Configurable Delimiters
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Supports custom separators including slashes, directional arrows,
            bullets, and double chevrons defined globally or per-slot.
          </p>
        </div>
      );
    case "dropdown":
      return (
        <div className="space-y-2">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            Progressive Disclosure & Collapsing
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Collapses intermediate hierarchical segments into an animated dropdown
            menu to prevent horizontal overflow on deep folder trees.
          </p>
        </div>
      );
    case "gooey":
      return (
        <div className="space-y-2">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            Fluid Molten Pill Physics
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            A tactile, playful interaction where a pill background smoothly glides
            and morphs between items using Framer Motion layout springs.
          </p>
        </div>
      );
    case "chips":
      return (
        <div className="space-y-2">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            Pill & Badge Framing
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Wraps each segment inside a pill capsule with subtle borders and
            backgrounds, creating a modern tag-like navigation bar.
          </p>
        </div>
      );
    case "customization":
      return (
        <div className="space-y-2">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            Interactive Bento Playground
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Test and tweak styles, custom separators, sizing, accent colors, and
            dropdown behavior live with real-time code generation.
          </p>
        </div>
      );
    default:
      return null;
  }
}
