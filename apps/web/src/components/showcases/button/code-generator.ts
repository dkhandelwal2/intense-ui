import { ButtonCustomProps } from "./types";

export function generateButtonCode(props: ButtonCustomProps): string {
  const iconImports: string[] = [];
  if (props.showIcon) {
    if (props.iconPosition === "right") iconImports.push("ArrowRight");
    else iconImports.push("Sparkles");
  } else if (props.size === "icon") {
    iconImports.push("Sparkles");
  }

  const iconImportLine = iconImports.length > 0 ? `\nimport { ${iconImports.join(", ")} } from "lucide-react";` : "";

  if (props.variant === "share") {
    const sizePart = props.size !== "md" ? `\n      size="${props.size}"` : "";
    return `import { Button } from "@/components/ui/button";

export default function ShareButtonDemo() {
  return (
    <Button
      variant="share"${sizePart}
      onShare={(platform) => console.log(platform)}
    />
  );
}`;
  }

  if (props.variant === "confirmation") {
    const sizePart = props.size !== "md" ? `\n      size="${props.size}"` : "";
    const actionPart = props.confirmAction ? `\n      confirmAction="${props.confirmAction}"` : "";
    const typePart = props.confirmType === "icon" ? `\n      confirmType="icon"` : "";
    return `import { Button } from "@/components/ui/button";

export default function ConfirmationButtonDemo() {
  return (
    <Button
      variant="confirmation"${actionPart}${typePart}${sizePart}
      onConfirm={() => console.log("Action confirmed")}
    />
  );
}`;
  }

  const parts: string[] = [];
  if (props.variant !== "default") parts.push(`variant="${props.variant}"`);
  if (props.size !== "md") parts.push(`size="${props.size}"`);
  if (props.rounded) parts.push(`rounded`);
  if (props.loading) parts.push(`loading`);
  if (props.disabled) parts.push(`disabled`);

  const propsStr = parts.length > 0 ? " " + parts.join(" ") : "";

  let inner = `      ${props.label || "Interactive Button"}`;
  if (props.size === "icon") {
    inner = `      <Sparkles className="w-4 h-4" />`;
  } else if (props.showIcon) {
    if (props.iconPosition === "right") {
      inner = `      ${props.label || "Interactive Button"}\n      <ArrowRight className="w-4 h-4" />`;
    } else {
      inner = `      <Sparkles className="w-4 h-4" />\n      ${props.label || "Interactive Button"}`;
    }
  }

  return `import { Button } from "@/components/ui/button";${iconImportLine}

export default function ButtonDemo() {
  return (
    <Button${propsStr}>
${inner}
    </Button>
  );
}`;
}
