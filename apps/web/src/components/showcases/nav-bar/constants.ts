import { NavbarExampleItem } from "./types";

export const NAVBAR_EXAMPLES: NavbarExampleItem[] = [
  {
    id: "gooey",
    label: "Gooey Nav Bar",
    description:
      "Fluid molten spring pill background that dynamically morphs and detaches across navigation segments.",
    spec: {
      title: "Fluid Island Morphing Specs",
      badge: "Fluid Physics",
      summary:
        "Powered by smooth cubic-bezier interpolation and dynamic island grouping. Inactive segments unite into contiguous rounded islands while the active segment detaches into an elevated molten pill.",
      specs: [
        { label: "Morphing Engine", value: "Fluid Island Decoupling" },
        { label: "Physics Config", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
        { label: "Vertical Stability", value: "Locked 0px Y-axis baseline" },
        { label: "Theme Integration", value: "activeColor with ambient tint" },
      ],
      tip: "Best suited for top navigation bars, step wizards, and interactive web application headers.",
    },
    code: `import { NavbarGooey } from "@/components/ui/nav-bar";

export default function GooeyNavbarDemo() {
  const items = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "explore", label: "Explore", icon: "🧭" },
    { id: "library", label: "Library", icon: "📚" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex items-center justify-center p-6">
      <NavbarGooey
        items={items}
        onSelect={(id) => console.log("Selected tab:", id)}
      />
    </div>
  );
}`,
  },
  {
    id: "with-icon",
    label: "With Icons & Badges",
    description:
      "Enhanced navigation tabs with prefix emoji icons and contextual status badge markers.",
    spec: {
      title: "Icon & Badge Specs",
      badge: "Visual Scannability",
      summary:
        'Pairs segment labels with Lucide vector icons or emojis, and adds optional status badges (e.g. "PRO", "LIVE") for rich data hierarchy.',
      specs: [
        { label: "Icon Alignment", value: "Left prefix, shrink-0" },
        { label: "Badge Support", value: "badge prop (ReactNode)" },
        { label: "Interactive Feedback", value: "Smooth color crossfade" },
      ],
      tip: "Use badges sparingly for attention-worthy states like live events or unread notifications.",
    },
    code: `import { NavbarGooey } from "@/components/ui/nav-bar";

export default function WithIconsNavbarDemo() {
  const items = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "activity", label: "Activity", icon: "⚡", badge: "LIVE" },
    { id: "deployments", label: "Deployments", icon: "🚀" },
    { id: "analytics", label: "Analytics", icon: "📈", badge: "PRO" },
  ];

  return (
    <div className="flex items-center justify-center p-6">
      <NavbarGooey
        items={items}
        activeColor="var(--theme-primary)"
        onSelect={(id) => console.log("Navigated to:", id)}
      />
    </div>
  );
}`,
  },
  {
    id: "floating",
    label: "Floating Capsule Nav Bar",
    description:
      "Glassmorphic floating capsule container with spring indicator physics.",
    spec: {
      title: "Capsule Dock Specs",
      badge: "Glassmorphism",
      summary:
        "An ultra-modern floating capsule bar with backdrop blur filters and a sliding spring layout indicator moving between active items.",
      specs: [
        { label: "Container Style", value: "rounded-full backdrop-blur-xl" },
        { label: "Spring Engine", value: "Framer Motion layoutId indicator" },
        { label: "Shadow Elevation", value: "Multi-layered depth shadow" },
      ],
      tip: "Place as a floating bottom bar on mobile or a centered floating header on desktop.",
    },
    code: `import { NavbarFloating } from "@/components/ui/nav-bar";

export default function FloatingNavbarDemo() {
  const items = [
    { id: "feed", label: "Feed", icon: "✨" },
    { id: "bookmarks", label: "Bookmarks", icon: "🔖" },
    { id: "messages", label: "Messages", icon: "💬" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="flex items-center justify-center p-6">
      <NavbarFloating
        items={items}
        size="md"
        onSelect={(id) => console.log("Tab selected:", id)}
      />
    </div>
  );
}`,
  },
  {
    id: "sizes",
    label: "Scale & Sizing",
    description:
      "Three proportional scaling tiers (sm, md, lg) tailored for compact sidebars to expansive headers.",
    spec: {
      title: "Scaling Specs",
      badge: "Responsive Tiers",
      summary:
        "Available in 3 calibrated scale tiers: Small (h-8), Medium (h-10 to h-11), and Large (h-12).",
      specs: [
        { label: "Small (sm)", value: "32px height, 12px text" },
        { label: "Medium (md)", value: "40-44px height, 13-14px text" },
        { label: "Large (lg)", value: "48px height, 15-16px text" },
      ],
      tip: "Default to medium for web headers; use small for compact panel controllers.",
    },
    code: `import { NavbarGooey } from "@/components/ui/nav-bar";

export default function NavbarSizesDemo() {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "projects", label: "Projects" },
    { id: "team", label: "Team" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      {/* Small */}
      <NavbarGooey items={items} size="sm" />

      {/* Medium (Default) */}
      <NavbarGooey items={items} size="md" />

      {/* Large */}
      <NavbarGooey items={items} size="lg" />
    </div>
  );
}`,
  },
];

/* =========================================================================
   API Reference / Props Tables
   ========================================================================= */

export const NAVBAR_GOOEY_API_REFERENCE = [
  {
    prop: "items",
    type: "NavbarItemData[]",
    defaultValue: "[]",
    description:
      "Array of navigation items ({ id, label, href?, icon?, badge?, disabled? }) rendered with fluid motion.",
  },
  {
    prop: "activeId",
    type: "string",
    defaultValue: "First item id",
    description: "Controlled identifier of the currently active navigation segment.",
  },
  {
    prop: "defaultActiveId",
    type: "string",
    defaultValue: "-",
    description: "Uncontrolled initial active item id when mounted.",
  },
  {
    prop: "onSelect",
    type: "(id: string) => void",
    defaultValue: "-",
    description: "Callback triggered when a navigation item is selected by click.",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Dimensions, height, gap spacing, and font size scale.",
  },
  {
    prop: "activeColor",
    type: "string",
    defaultValue: '"var(--theme-primary)"',
    description: "Background color or CSS variable for the fluid detached active pill.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes applied to the root `<nav>` element.",
  },
];

export const NAVBAR_FLOATING_API_REFERENCE = [
  {
    prop: "items",
    type: "NavbarItemData[]",
    defaultValue: "[]",
    description: "Navigation items displayed inside the floating capsule bar.",
  },
  {
    prop: "activeId",
    type: "string",
    defaultValue: "First item id",
    description: "Controlled id of the active floating capsule pill.",
  },
  {
    prop: "defaultActiveId",
    type: "string",
    defaultValue: "-",
    description: "Uncontrolled initial active item id when mounted.",
  },
  {
    prop: "onSelect",
    type: "(id: string) => void",
    defaultValue: "-",
    description: "Callback invoked upon tab selection.",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Capsule dimensions and font scaling.",
  },
  {
    prop: "activeColor",
    type: "string",
    defaultValue: "-",
    description: "Custom background color for the floating active indicator pill.",
  },
  {
    prop: "layoutId",
    type: "string",
    defaultValue: "Unique generated id",
    description: "Custom Framer Motion layoutId for indicator animation synchronization.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes for the floating pill container.",
  },
];

export const NAVBAR_API_REFERENCE = [
  {
    prop: "variant",
    type: '"default" | "gooey" | "floating" | "pills"',
    defaultValue: '"default"',
    description: "Visual design variant of the navigation bar container.",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Size scale controlling height and padding.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes for the root `<nav>` container.",
  },
];

export const USAGE_CODE = `import { NavbarGooey } from "@/components/ui/nav-bar";

export default function NavbarDemo() {
  const items = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "explore", label: "Explore", icon: "🧭" },
    { id: "library", label: "Library", icon: "📚" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <NavbarGooey
      items={items}
      onSelect={(id) => console.log("Selected:", id)}
    />
  );
}`;
