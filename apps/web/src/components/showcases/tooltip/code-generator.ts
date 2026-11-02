import { TooltipCustomProps } from "./types";

export function generateTooltipCode(props: TooltipCustomProps): string {
  const parts: string[] = [`content="${props.content}"`];

  if (props.position !== "top") parts.push(`position="${props.position}"`);
  if (props.bgColor) parts.push(`bgColor="${props.bgColor}"`);

  return `import { Tooltip } from "@/components/ui/tooltip";

export default function TooltipDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Tooltip ${parts.join(" ")}>
        <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-colors">
          Hover for hint
        </button>
      </Tooltip>
    </div>
  );
}`;
}
