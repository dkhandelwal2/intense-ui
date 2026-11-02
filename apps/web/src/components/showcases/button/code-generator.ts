import { ButtonCustomProps } from "./types";

export function generateButtonCode(props: ButtonCustomProps): string {
  if (props.variant === "share") {
    const sizePart = props.size !== "md" ? ` size="${props.size}"` : "";
    return `<Button variant="share"${sizePart} onShare={(platform) => console.log(platform)} />`;
  }

  if (props.variant === "delete" || props.variant === "confirm") {
    const sizePart = props.size !== "md" ? ` size="${props.size}"` : "";
    const actionPart = props.confirmAction ? ` confirmAction="${props.confirmAction}"` : "";
    return `<Button variant="${props.variant}"${actionPart}${sizePart} onConfirm={() => console.log("Action confirmed")} />`;
  }

  const parts: string[] = [];

  if (props.variant !== "default") {
    parts.push(`variant="${props.variant}"`);
  }
  if (props.size !== "md") {
    parts.push(`size="${props.size}"`);
  }
  if (props.disabled) {
    parts.push(`disabled`);
  }

  const propsStr = parts.length > 0 ? " " + parts.join(" ") : "";

  if (props.showIcon) {
    if (props.iconPosition === "right") {
      return `<Button${propsStr}>
  ${props.label || "Interactive Button"}
  <ArrowRight className="w-4 h-4" />
</Button>`;
    }
    return `<Button${propsStr}>
  <Sparkles className="w-4 h-4" />
  ${props.label || "Interactive Button"}
</Button>`;
  }

  return `<Button${propsStr}>
  ${props.label || "Interactive Button"}
</Button>`;
}
