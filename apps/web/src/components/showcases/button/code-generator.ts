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
    const variantPart = props.shareVariant && props.shareVariant !== "default" ? `\n      shareVariant="${props.shareVariant}"` : "";
    const colorPart = props.shareColor && props.shareColor !== "#2563eb" ? `\n      color="${props.shareColor}"` : "";
    const platformsPart = props.includeYoutube ? `\n      platforms={[\n        { id: "whatsapp", label: "WhatsApp" },\n        { id: "instagram", label: "Instagram" },\n        { id: "x", label: "X" },\n        { id: "facebook", label: "Facebook" },\n        { id: "youtube", label: "YouTube", url: "https://youtube.com" },\n      ]}` : "";
    return `import { Button } from "@/components/ui/button";

export default function ShareButtonDemo() {
  return (
    <Button
      variant="share"${variantPart}${colorPart}${sizePart}${platformsPart}
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
