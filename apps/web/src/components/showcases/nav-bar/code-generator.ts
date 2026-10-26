import { CustomNavbarProps } from "./types";

export function generateNavbarCode(customProps: CustomNavbarProps): string {
  const isFloating = customProps.variant === "floating";
  const componentName = isFloating ? "NavbarFloating" : "NavbarGooey";

  const sizeProp =
    customProps.size && customProps.size !== "md"
      ? ` size="${customProps.size}"`
      : "";

  const colorProp =
    customProps.activeColor && customProps.activeColor !== ""
      ? ` activeColor="${customProps.activeColor}"`
      : "";

  const homeIcon = customProps.showIcons ? ', icon: "🏠"' : "";
  const exploreIcon = customProps.showIcons ? ', icon: "🧭"' : "";
  const libraryIcon = customProps.showIcons ? ', icon: "📚"' : "";
  const settingsIcon = customProps.showIcons ? ', icon: "⚙️"' : "";

  const exploreBadge = customProps.showBadges ? ', badge: "NEW"' : "";

  return `import { ${componentName} } from "@/components/ui/nav-bar";

export default function NavbarDemo() {
  const items = [
    { id: "home", label: "Home"${homeIcon} },
    { id: "explore", label: "Explore"${exploreIcon}${exploreBadge} },
    { id: "library", label: "Library"${libraryIcon} },
    { id: "settings", label: "Settings"${settingsIcon} },
  ];

  return (
    <div className="flex items-center justify-center p-6">
      <${componentName}${sizeProp}${colorProp}
        items={items}
        onSelect={(id) => console.log("Selected tab:", id)}
      />
    </div>
  );
}`;
}
