import { SeparatorCustomProps } from "./types";

export function generateSeparatorCode(props: SeparatorCustomProps): string {
  const parts: string[] = [];

  if (props.orientation !== "horizontal") parts.push(`orientation="${props.orientation}"`);
  if (props.variant !== "gradient") parts.push(`variant="${props.variant}"`);
  if (props.glow) parts.push(`glow`);

  const propsStr = parts.length > 0 ? ` ${parts.join(" ")}` : "";

  if (props.orientation === "vertical") {
    return `import { Separator } from "@/components/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="flex items-center space-x-4 h-8 text-sm">
      <span>Dashboard</span>
      <Separator${propsStr} />
      <span>Analytics</span>
      <Separator${propsStr} />
      <span>Settings</span>
    </div>
  );
}`;
  }

  return `import { Separator } from "@/components/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm space-y-4 p-6">
      <div>
        <h4 className="text-sm font-semibold">Intense UI</h4>
        <p className="text-xs text-muted-foreground">High performance component ecosystem.</p>
      </div>
      <Separator${propsStr} />
      <div className="text-xs text-muted-foreground">
        Ready for production interfaces.
      </div>
    </div>
  );
}`;
}
