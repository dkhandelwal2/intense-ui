import { NavbarExampleItem } from "./types";

export const NAVBAR_EXAMPLES: NavbarExampleItem[] = [
  {
    id: "gooey",
    label: "Gooey Nav Bar",
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
