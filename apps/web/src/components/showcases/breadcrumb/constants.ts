import { BreadcrumbExampleItem } from "./types";

export const BREADCRUMB_EXAMPLES: BreadcrumbExampleItem[] = [
  {
    id: "basic",
    label: "Basic",
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
    id: "gooey",
    label: "Gooey Breadcrumb",
    code: `import { BreadcrumbGooey } from "@/components/ui/breadcrumb";

export default function GooeyBreadcrumb() {
  const items = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "docs", label: "Docs", icon: "📖" },
    { id: "business", label: "Business", icon: "💼" },
  ];

  return (
    <div className="flex items-center justify-center p-4">
      <BreadcrumbGooey
        items={items}
        onSelect={(id) => console.log("Selected:", id)}
      />
    </div>
  );
}`,
  },
  {
    id: "chips",
    label: "Chips / Pills Breadcrumb",
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
    type: '"default" | "chips" | "gooey" | "outline" | "ghost"',
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
    type: '"default" | "chips" | "gooey" | "outline" | "ghost"',
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
    type: '"default" | "chips" | "gooey" | "outline" | "ghost"',
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

export const BREADCRUMB_GOOEY_API_REFERENCE = [
  {
    prop: "items",
    type: "GooeyBreadcrumbItem[]",
    defaultValue: "[]",
    description:
      "Array of navigation items ({ id, label, href?, icon? }) rendered with fluid motion.",
  },
  {
    prop: "activeId",
    type: "string",
    defaultValue: "First item id",
    description: "Controlled id of the active/selected breadcrumb segment.",
  },
  {
    prop: "onSelect",
    type: "(id: string) => void",
    defaultValue: "-",
    description: "Callback invoked when a breadcrumb segment is clicked.",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Pill dimensions and font size scaling.",
  },
  {
    prop: "activeColor",
    type: "string",
    defaultValue: '"var(--theme-primary)"',
    description: "Custom background color for the detached active pill.",
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
