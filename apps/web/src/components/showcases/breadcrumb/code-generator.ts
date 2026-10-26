import { CustomProps } from "./types";

function getBreadcrumbOptionName(customProps: CustomProps): string {
  if (customProps.hasCollapsed) return "CollapsedBreadcrumb";
  if (customProps.hasDropdown) return "DropdownBreadcrumb";
  if (customProps.variant === "chips") return "ChipsBreadcrumb";
  if (customProps.variant === "outline") return "OutlineBreadcrumb";
  if (customProps.variant === "ghost") return "GhostBreadcrumb";
  if (customProps.separator && customProps.separator !== "chevron") return "CustomSeparatorBreadcrumb";
  if (customProps.showIcons) return "WithIconsBreadcrumb";
  return "BasicBreadcrumb";
}

export function generateBreadcrumbCode(customProps: CustomProps): string {
  const optionFunctionName = getBreadcrumbOptionName(customProps);

  if (customProps.hasCollapsed) {
    const iconImports: string[] = [];
    const rootProps: string[] = [];

    if (customProps.variant && customProps.variant !== "default") {
      rootProps.push(`variant="${customProps.variant}"`);
    }

    if (customProps.size && customProps.size !== "md") {
      rootProps.push(`size="${customProps.size}"`);
    }

    if (customProps.separator === "slash") {
      rootProps.push('separator={<Slash className="w-3.5 h-3.5" />}');
      iconImports.push("Slash");
    } else if (customProps.separator === "arrow") {
      rootProps.push('separator={<ArrowRight className="w-3.5 h-3.5" />}');
      iconImports.push("ArrowRight");
    } else if (customProps.separator === "chevrons") {
      rootProps.push('separator={<ChevronsRight className="w-3.5 h-3.5" />}');
      iconImports.push("ChevronsRight");
    } else if (customProps.separator === "dot") {
      rootProps.push('separator={<span className="text-xs">•</span>}');
    } else if (customProps.separator === "none") {
      rootProps.push("separator={null}");
    }

    if (customProps.separatorColor && customProps.separatorColor !== "") {
      rootProps.push(`separatorColor="${customProps.separatorColor}"`);
    }

    if (customProps.activeColor && customProps.activeColor !== "") {
      rootProps.push(`activeColor="${customProps.activeColor}"`);
    }

    rootProps.push("maxItems={4}");
    rootProps.push("itemsBeforeCollapse={1}");
    rootProps.push("itemsAfterCollapse={2}");

    const rootPropsString = rootProps.length > 0 ? `\n      ${rootProps.join("\n      ")}` : "";

    const homeIcon = customProps.showIcons ? ', icon: "🏠"' : "";
    const docsIcon = customProps.showIcons ? ', icon: "📁"' : "";
    const guidesIcon = customProps.showIcons ? ', icon: "📖"' : "";
    const compIcon = customProps.showIcons ? ', icon: "🧩"' : "";
    const pageIcon = customProps.showIcons ? ', icon: "🍞"' : "";

    const importLines = ['import { BreadcrumbCollapsed } from "@/components/ui/breadcrumb";'];
    if (iconImports.length > 0) {
      importLines.push(`import { ${Array.from(new Set(iconImports)).join(", ")} } from "lucide-react";`);
    }

    return `${importLines.join("\n")}

export default function ${optionFunctionName}() {
  const items = [
    { label: "Home", href: "/"${homeIcon} },
    { label: "Docs", href: "/docs"${docsIcon} },
    { label: "Guides", href: "/docs/guides"${guidesIcon} },
    { label: "Components", href: "/docs/components"${compIcon} },
    { label: "Breadcrumb"${pageIcon} },
  ];

  return (
    <BreadcrumbCollapsed
      items={items}${rootPropsString}
    />
  );
}`;
  }

  const imports = [
    "Breadcrumb",
    "BreadcrumbList",
    "BreadcrumbItem",
    "BreadcrumbLink",
    "BreadcrumbPage",
    "BreadcrumbSeparator",
  ];

  const iconImports: string[] = [];

  if (customProps.hasDropdown) {
    imports.push("BreadcrumbDropdown", "BreadcrumbDropdownItem");
  }

  if (customProps.separator === "slash") {
    iconImports.push("Slash");
  } else if (customProps.separator === "arrow") {
    iconImports.push("ArrowRight");
  } else if (customProps.separator === "chevrons") {
    iconImports.push("ChevronsRight");
  }

  const rootProps: string[] = [];

  if (customProps.variant && customProps.variant !== "default") {
    rootProps.push(`variant="${customProps.variant}"`);
  }

  if (customProps.size && customProps.size !== "md") {
    rootProps.push(`size="${customProps.size}"`);
  }

  if (customProps.separator === "slash") {
    rootProps.push('separator={<Slash className="w-3.5 h-3.5" />}');
  } else if (customProps.separator === "arrow") {
    rootProps.push('separator={<ArrowRight className="w-3.5 h-3.5" />}');
  } else if (customProps.separator === "chevrons") {
    rootProps.push('separator={<ChevronsRight className="w-3.5 h-3.5" />}');
  } else if (customProps.separator === "dot") {
    rootProps.push('separator={<span className="text-xs">•</span>}');
  } else if (customProps.separator === "none") {
    rootProps.push("separator={null}");
  }

  if (customProps.separatorColor && customProps.separatorColor !== "") {
    rootProps.push(`separatorColor="${customProps.separatorColor}"`);
  }

  if (customProps.activeColor && customProps.activeColor !== "") {
    rootProps.push(`activeColor="${customProps.activeColor}"`);
  }

  const rootPropsString = rootProps.length > 0 ? ` ${rootProps.join(" ")}` : "";

  const homeIcon = customProps.showIcons ? ' icon="🏠"' : "";
  const docsIcon = customProps.showIcons ? ' icon="📁"' : "";
  const compIcon = customProps.showIcons ? ' icon="🧩"' : "";
  const pageIcon = customProps.showIcons ? ' icon="🍞"' : "";

  let itemsCode = `        <BreadcrumbItem>
          <BreadcrumbLink href="/"${homeIcon}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />`;

  if (customProps.hasDropdown) {
    itemsCode += `
        <BreadcrumbItem>
          <BreadcrumbDropdown>
            <BreadcrumbDropdownItem href="/docs" icon="📁">
              Documentation
            </BreadcrumbDropdownItem>
            <BreadcrumbDropdownItem href="/guides" icon="📖">
              Guides & Tutorials
            </BreadcrumbDropdownItem>
            <BreadcrumbDropdownItem href="/settings" icon="⚙️">
              Project Settings
            </BreadcrumbDropdownItem>
          </BreadcrumbDropdown>
        </BreadcrumbItem>
        <BreadcrumbSeparator />`;
  } else {
    itemsCode += `
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs"${docsIcon}>Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components"${compIcon}>Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />`;
  }

  itemsCode += `
        <BreadcrumbItem>
          <BreadcrumbPage${pageIcon}>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>`;

  const importSection = [
    `import {\n  ${imports.join(",\n  ")},\n} from "@/components/ui/breadcrumb";`,
  ];

  if (iconImports.length > 0) {
    importSection.push(
      `import { ${Array.from(new Set(iconImports)).join(", ")} } from "lucide-react";`
    );
  }

  return `${importSection.join("\n")}

export default function ${optionFunctionName}() {
  return (
    <Breadcrumb${rootPropsString}>
      <BreadcrumbList>
${itemsCode}
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;
}
