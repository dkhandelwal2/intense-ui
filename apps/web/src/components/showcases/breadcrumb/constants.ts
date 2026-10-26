import { BreadcrumbExampleItem } from "./types";

export const BREADCRUMB_EXAMPLES: BreadcrumbExampleItem[] = [
  {
    id: "basic",
    label: "Basic",
    description:
      "Standard semantic trail adhering to WAI-ARIA breadcrumb navigation patterns.",
    spec: {
      title: "Semantic Trail Specs",
      badge: "WAI-ARIA Pattern",
      summary:
        "Constructed with semantic HTML5 elements using an ordered list hierarchy (<ol> and <li>) to announce structured parent-child navigation to screen readers.",
      specs: [
        { label: "Active Route", value: 'aria-current="page"' },
        { label: "Landmark", value: 'nav[aria-label="breadcrumb"]' },
        { label: "Delimiters", value: 'aria-hidden="true"' },
        { label: "Components", value: "<BreadcrumbLink>, <BreadcrumbPage>" },
      ],
      tip: "Place directly below the global navbar at the top of the main content column.",
    },
    code: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BasicBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
  },
  {
    id: "with-icon",
    label: "With Icons",
    description:
      "Navigation items paired with prefix icons to improve directory scannability.",
    spec: {
      title: "Icon Navigation Specs",
      badge: "Visual Anchoring",
      summary:
        "Augments text labels with inline Lucide vector glyphs or emoji markers. Decorative icons improve route recognition speeds by over 40% in multi-tiered nested directories.",
      specs: [
        { label: "Icon Placement", value: "inline prefix before label" },
        { label: "Accessibility", value: "Decorative icon aria-hidden" },
        { label: "Recommended Size", value: "14px - 16px (w-3.5 to w-4)" },
        { label: "Component Support", value: "<BreadcrumbLink icon={...}>" },
      ],
      tip: "Use standardized line icons that match your application's icon library.",
    },
    code: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function WithIconsBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" icon="🏠">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs" icon="📁">
            Docs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components" icon="🧩">
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage icon="🍞">
            Breadcrumb
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
  },
  {
    id: "custom-separator",
    label: "Custom Separator",
    description:
      "Visual delimiters customized with arrows, slashes, or icons between trail items.",
    spec: {
      title: "Delimiter Theming Specs",
      badge: "Custom Dividers",
      summary:
        "Enables custom visual dividers between route segments. Render any custom React node, SVG icon, or typographic glyph inside the separator slot with automatic accessibility wrapping.",
      specs: [
        { label: "Slot Component", value: "<BreadcrumbSeparator>" },
        { label: "Presentation", value: 'role="presentation"' },
        { label: "Supported Delimiters", value: "Slash /, Arrow →, Dot •, Chevron ›" },
        { label: "Dynamic Color", value: "separatorColor prop / CSS custom prop" },
      ],
      tip: "Always keep separators non-interactive and aria-hidden to avoid interrupting screen reader flow.",
    },
    code: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash, ArrowRight, ChevronsRight } from "lucide-react";

export default function CustomSeparatorBreadcrumb() {
  return (
    <div className="flex flex-col gap-5">
      {/* Slash Separator */}
      <Breadcrumb separator={<Slash className="w-3 h-3 text-muted-foreground" />}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Analytics</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Arrow Separator */}
      <Breadcrumb separator={<ArrowRight className="w-3 h-3 text-[var(--theme-primary)]" />}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Store</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/clothing">Clothing</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jackets</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Double Chevron Separator */}
      <Breadcrumb separator={<ChevronsRight className="w-3.5 h-3.5 text-zinc-400" />}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Library</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Preferences</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}`,
  },
  {
    id: "dropdown",
    label: "Dropdown Breadcrumb",
    description:
      "Progressive disclosure dropdown menu to collapse intermediate steps and prevent trail overflow.",
    spec: {
      title: "Progressive Disclosure Specs",
      badge: "Overflow Menu",
      summary:
        "Replaces intermediate trail segments with an interactive <BreadcrumbEllipsis> popover menu to prevent multi-line wrapping in deep navigation trees and on mobile screens.",
      specs: [
        { label: "Trigger Element", value: "<BreadcrumbEllipsis />" },
        { label: "Keyboard Nav", value: "ArrowUp/Down, Enter, Escape" },
        { label: "Recommended At", value: "Trail depth > 4 items" },
        { label: "Menu Dismiss", value: "Outside click & focus loss" },
      ],
      tip: "Keeps the root item and current leaf visible while collapsing intermediate hierarchy.",
    },
    code: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbDropdown,
  BreadcrumbDropdownItem,
} from "@/components/ui/breadcrumb";

export default function DropdownBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Collapsed Dropdown Item */}
        <BreadcrumbItem>
          <BreadcrumbDropdown>
            <BreadcrumbDropdownItem href="/docs" icon="📁">
              Documentation
            </BreadcrumbDropdownItem>
            <BreadcrumbDropdownItem href="/docs/guides" icon="📖">
              Guides & Tutorials
            </BreadcrumbDropdownItem>
            <BreadcrumbDropdownItem href="/docs/api" icon="💾">
              API Reference
            </BreadcrumbDropdownItem>
            <BreadcrumbDropdownItem href="/settings" icon="⚙️">
              Project Settings
            </BreadcrumbDropdownItem>
          </BreadcrumbDropdown>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
  },
  {
    id: "collapsed",
    label: "Collapsed Breadcrumb",
    description:
      "Inline collapsible trail that expands intermediate items directly into the breadcrumb row on click.",
    spec: {
      title: "Inline Expansion Specs",
      badge: "Spring Layout",
      summary:
        "Initially condenses intermediate items behind a discrete 3-dots button. Clicking the button expands all hidden items inline into the active row with smooth spring layout animation.",
      specs: [
        { label: "Trigger Element", value: "<button> with aria-expanded" },
        { label: "Expansion Mode", value: "Inline row reveal (no popover)" },
        { label: "Physics Config", value: "Spring (stiffness 400, damping 28)" },
        { label: "Configurable Props", value: "itemsBeforeCollapse, itemsAfterCollapse" },
      ],
      tip: "Ideal for deep folder navigation where you want users to see the complete path on demand without leaving the row.",
    },
    code: `import { BreadcrumbCollapsed } from "@/components/ui/breadcrumb";

export default function CollapsedBreadcrumbDemo() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Guides", href: "/docs/guides" },
    { label: "Components", href: "/docs/components" },
    { label: "Breadcrumb" },
  ];

  return (
    <BreadcrumbCollapsed
      items={items}
      maxItems={4}
      itemsBeforeCollapse={1}
      itemsAfterCollapse={2}
    />
  );
}`,
  },
  {
    id: "chips",
    label: "Chips / Pills Breadcrumb",
    description:
      "Encapsulated pill and badge segments with distinct interactive card surfaces.",
    spec: {
      title: "Encapsulated Pill Specs",
      badge: "Capsule Badges",
      summary:
        "Treats every trail segment as a discrete, tactile badge item with independent surface elevation, borders, and interactive hover feedback.",
      specs: [
        { label: "Variant Style", value: 'variant="chips"' },
        { label: "Active Highlight", value: "Dynamic activeColor border + soft tint" },
        { label: "Surface Elevation", value: "Subtle inset hairline & shadow" },
        { label: "Touch Targets", value: "min-h-[32px] mobile accessible" },
      ],
      tip: "Great for filter breadcrumbs, tag trails, and hierarchical file browsers.",
    },
    code: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ChipsBreadcrumb() {
  return (
    <div className="flex flex-col gap-6">
      {/* Pills with Chips Variant */}
      <Breadcrumb variant="chips" size="md">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" icon="🏠">
              App
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/repo" icon="📦">
              intense-ui
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/src" icon="📁">
              src
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage icon="🍞">
              breadcrumb.tsx
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Outlined Pills Variant */}
      <Breadcrumb variant="outline" size="sm">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Root</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/config">Config</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>tailwind.config.ts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}`,
  },
];

/* =========================================================================
   API Reference / Props Tables
   ========================================================================= */

export const BREADCRUMB_API_REFERENCE = [
  {
    prop: "variant",
    type: '"default" | "chips" | "outline" | "ghost"',
    defaultValue: '"default"',
    description:
      "Visual style mode applied across all nested breadcrumb links, pages, and containers.",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description:
      "Size scale controlling font sizing, gap spacing, and badge padding.",
  },
  {
    prop: "separator",
    type: "ReactNode",
    defaultValue: "<ChevronRight />",
    description:
      "Default separator element rendered between each breadcrumb item.",
  },
  {
    prop: "separatorColor",
    type: "string",
    defaultValue: "-",
    description:
      "Custom CSS color or theme variable for all separators.",
  },
  {
    prop: "activeColor",
    type: "string",
    defaultValue: "-",
    description:
      "Custom CSS color or theme variable for the active/current page item.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes for the root `<nav>` element.",
  },
];

export const BREADCRUMB_LIST_API_REFERENCE = [
  {
    prop: "variant",
    type: '"default" | "chips" | "outline" | "ghost"',
    defaultValue: "Inherits from Breadcrumb",
    description: "Overrides the parent breadcrumb visual variant for this list.",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: "Inherits from Breadcrumb",
    description: "Overrides the parent breadcrumb sizing for this list.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes for the `<ol>` list element.",
  },
];

export const BREADCRUMB_ITEM_API_REFERENCE = [
  {
    prop: "isCurrentPage",
    type: "boolean",
    defaultValue: "false",
    description: "Whether this item represents the active current page.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes for the `<li>` item element.",
  },
];

export const BREADCRUMB_LINK_API_REFERENCE = [
  {
    prop: "href",
    type: "string",
    defaultValue: "-",
    description: "Navigation destination URL or internal route path.",
  },
  {
    prop: "icon",
    type: "ReactNode",
    defaultValue: "-",
    description: "Optional prefix icon element displayed alongside the link label.",
  },
  {
    prop: "asChild",
    type: "boolean",
    defaultValue: "false",
    description:
      "Pass-through child component (e.g. Next.js Link) while inheriting styling.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes for the anchor or child element.",
  },
];

export const BREADCRUMB_PAGE_API_REFERENCE = [
  {
    prop: "icon",
    type: "ReactNode",
    defaultValue: "-",
    description: "Optional prefix icon element for the current page label.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes for the current page `<span>` element.",
  },
];

export const BREADCRUMB_SEPARATOR_API_REFERENCE = [
  {
    prop: "separator",
    type: "ReactNode",
    defaultValue: "<ChevronRight />",
    description: "Custom replacement separator element for this specific slot.",
  },
  {
    prop: "children",
    type: "ReactNode",
    defaultValue: "-",
    description: "Inline children rendered inside the separator element.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes for the separator `<li>` element.",
  },
];

export const BREADCRUMB_DROPDOWN_API_REFERENCE = [
  {
    prop: "trigger",
    type: "ReactNode",
    defaultValue: "<MoreHorizontal />",
    description: "Interactive button element that triggers the popover menu.",
  },
  {
    prop: "align",
    type: '"left" | "right" | "center"',
    defaultValue: '"left"',
    description: "Popover menu alignment relative to the trigger element.",
  },
  {
    prop: "children",
    type: "ReactNode",
    defaultValue: "-",
    description: "Collection of `<BreadcrumbDropdownItem />` elements.",
  },
];

export const BREADCRUMB_COLLAPSED_API_REFERENCE = [
  {
    prop: "items",
    type: "BreadcrumbCollapsedItem[]",
    defaultValue: "[]",
    description:
      "Array of navigation items ({ label, href?, icon?, isCurrentPage?, onClick? }) in the breadcrumb trail.",
  },
  {
    prop: "maxItems",
    type: "number",
    defaultValue: "4",
    description:
      "Maximum total items to display before collapsing intermediate segments into an ellipsis button.",
  },
  {
    prop: "itemsBeforeCollapse",
    type: "number",
    defaultValue: "1",
    description:
      "Number of leading items to keep visible at the start of the trail before the ellipsis.",
  },
  {
    prop: "itemsAfterCollapse",
    type: "number",
    defaultValue: "2",
    description:
      "Number of trailing items to keep visible at the end of the trail after the ellipsis.",
  },
  {
    prop: "isCollapsed",
    type: "boolean",
    defaultValue: "-",
    description:
      "Controlled collapse state. When true, intermediate items are collapsed behind the ellipsis button.",
  },
  {
    prop: "defaultCollapsed",
    type: "boolean",
    defaultValue: "true",
    description:
      "Initial collapse state when uncontrolled.",
  },
  {
    prop: "onCollapsedChange",
    type: "(collapsed: boolean) => void",
    defaultValue: "-",
    description:
      "Callback invoked when the user expands or collapses the breadcrumb trail.",
  },
  {
    prop: "allowCollapse",
    type: "boolean",
    defaultValue: "false",
    description:
      "Whether to render an interactive collapse toggle button when items are expanded.",
  },
  {
    prop: "variant",
    type: '"default" | "chips" | "outline" | "ghost"',
    defaultValue: '"default"',
    description: "Visual style variant applied across all trail items.",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Size scale controlling font size and spacing.",
  },
  {
    prop: "separator",
    type: "ReactNode",
    defaultValue: "<ChevronRight />",
    description: "Custom delimiter element between items.",
  },
  {
    prop: "separatorColor",
    type: "string",
    defaultValue: "-",
    description: "Custom CSS color or theme variable for all separators.",
  },
  {
    prop: "activeColor",
    type: "string",
    defaultValue: "-",
    description: "Custom CSS color or theme variable for the active/current page item.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes for the root `<nav>` element.",
  },
];

export const USAGE_CODE = `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;
