import { SwitchCustomProps } from "./types";

export function generateSwitchCode(props: SwitchCustomProps): string {
  const parts: string[] = ["checked={checked}", "onChange={setChecked}"];

  if (props.variant && props.variant !== "rocker") {
    parts.push(`variant="${props.variant}"`);
  }
  if (props.size !== "md") {
    parts.push(`size="${props.size}"`);
  }
  if (props.sliderText !== "on/off") {
    parts.push(`sliderText="${props.sliderText}"`);
  }
  if (!props.showDotIcon) {
    parts.push(`showDotIcon={false}`);
  }
  if (props.shadowColor && props.shadowColor !== "var(--theme-primary)") {
    parts.push(`shadowColor="${props.shadowColor}"`);
  }
  if (props.disabled) {
    parts.push(`disabled`);
  }

  return `"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(${props.checked});

  return (
    <Switch ${parts.join(" ")} />
  );
}`;
}
