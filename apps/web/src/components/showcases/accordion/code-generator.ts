import { CustomProps } from "./types";

export function generateAccordionCode(customProps: CustomProps = {}): string {
  const itemProps: string[] = ['value="item-1"'];

  if (customProps.hideBorder) {
    itemProps.push("hideBorder={true}");
  } else {
    if (customProps.borderWidth !== undefined && customProps.borderWidth !== 1) {
      itemProps.push(`borderWidth="${customProps.borderWidth}px"`);
    }
    if (customProps.borderColor && customProps.borderColor !== "var(--theme-primary)") {
      itemProps.push(`borderColor="${customProps.borderColor}"`);
    }
    if (customProps.borderRadius !== undefined && customProps.borderRadius !== 8) {
      itemProps.push(`borderRadius="${customProps.borderRadius}px"`);
    }
  }

  itemProps.push('className="px-4 bg-background"');

  const triggerProps: string[] = [];

  if (customProps.size && customProps.size !== "md") {
    triggerProps.push(`size="${customProps.size}"`);
  }

  if (customProps.weight && customProps.weight !== "Default") {
    triggerProps.push(`weight="${customProps.weight.toLowerCase()}"`);
  }

  if (customProps.hideIcon) {
    triggerProps.push("hideIcon={true}");
  } else {
    if (customProps.iconType === "Custom") {
      triggerProps.push(
        'icon={<ArrowDown className="h-4 w-4 text-[var(--theme-primary)]" />}'
      );
    }
    if (customProps.iconPosition && customProps.iconPosition !== "Right") {
      triggerProps.push(`iconPosition="${customProps.iconPosition.toLowerCase()}"`);
    }
    if (customProps.iconColor && customProps.iconColor.trim() !== "") {
      triggerProps.push(`iconColor="${customProps.iconColor}"`);
    }
  }

  if (customProps.headingUnderline) {
    triggerProps.push("headingUnderline={true}");
  }

  if (customProps.headingColor && customProps.headingColor.trim() !== "") {
    triggerProps.push(`headingColor="${customProps.headingColor}"`);
  }

  if (customProps.hasOnClick) {
    triggerProps.push('onClick={() => alert("Item clicked!")}');
  }

  const contentProps: string[] = [];
  if (customProps.contentColor && customProps.contentColor.trim() !== "") {
    contentProps.push(`contentColor="${customProps.contentColor}"`);
  }

  const isCustomIcon = !customProps.hideIcon && customProps.iconType === "Custom";
  const iconImport = isCustomIcon ? '\nimport { ArrowDown } from "lucide-react";' : "";

  const itemPropsString = itemProps.map((p) => `        ${p}`).join("\n");
  const triggerPropsString =
    triggerProps.length > 0
      ? "\n" + triggerProps.map((p) => `          ${p}`).join("\n") + "\n        "
      : " ";
  const contentPropsString =
    contentProps.length > 0 ? " " + contentProps.join(" ") : "";

  const defaultExpandedAttr = customProps.isDefaultExpanded
    ? ' defaultValue="item-1"'
    : "";

  return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";${iconImport}

export default function CustomizationAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4"${defaultExpandedAttr}>
      <AccordionItem
${itemPropsString}
      >
        <AccordionTrigger${triggerPropsString}>
          Custom Styled Item
        </AccordionTrigger>
        <AccordionContent${contentPropsString}>
          This item dynamically reflects all interactive props selected in the customizer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;
}
