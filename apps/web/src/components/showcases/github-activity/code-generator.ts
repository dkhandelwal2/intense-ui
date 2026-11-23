import { GithubActivityCustomProps } from "./types";

export function generateGithubActivityCode(props: GithubActivityCustomProps): string {
  const parts: string[] = [];

  if (props.username) {
    parts.push(`  username="${props.username}"`);
  }

  if (props.variant && props.variant !== "compact") {
    parts.push(`  variant="${props.variant}"`);
  }

  if (props.theme && props.theme !== "github") {
    parts.push(`  theme="${props.theme}"`);
  }

  if (props.mode === "3d") {
    parts.push(`  mode="3d"`);
  }

  if (props.dotSize && props.dotSize !== "md") {
    parts.push(`  dotSize="${props.dotSize}"`);
  }

  if (props.year && props.year !== 2026) {
    parts.push(`  year={${props.year}}`);
  }

  if (props.weeksCount !== undefined && props.weeksCount !== 52) {
    parts.push(`  weeksCount={${props.weeksCount}}`);
  }

  if (props.showFullYear) {
    parts.push(`  showFullYear`);
  }

  if (props.showHeader === false) {
    parts.push(`  showHeader={false}`);
  }

  if (props.showTabs === false) {
    parts.push(`  showTabs={false}`);
  }

  if (props.showYearSelector === false) {
    parts.push(`  showYearSelector={false}`);
  }

  if (props.showModeToggle === false) {
    parts.push(`  showModeToggle={false}`);
  }

  if (props.showStreaks === false) {
    parts.push(`  showStreaks={false}`);
  }

  if (props.showSearch === false) {
    parts.push(`  showSearch={false}`);
  }

  if (props.showFilter === false) {
    parts.push(`  showFilter={false}`);
  }

  if (props.showSort === false) {
    parts.push(`  showSort={false}`);
  }

  if (props.staticIcons) {
    parts.push(`  staticIcons`);
  }

  if (props.maxEvents && (props.variant === "timeline" || props.variant === "compact")) {
    parts.push(`  maxEvents={${props.maxEvents}}`);
  }

  const propsStr = parts.length > 0 ? `\n${parts.join("\n")}\n` : " ";

  return `"use client";

import { GithubActivity } from "@/components/ui/github-activity";

export default function Example() {
  return (
    <div className="w-full max-w-3xl p-4">
      <GithubActivity${propsStr}/>
    </div>
  );
}`;
}
