import { GithubActivityCustomProps } from "./types";

export function generateGithubActivityCode(props: GithubActivityCustomProps): string {
  const parts: string[] = [];

  if (props.variant !== "compact") {
    parts.push(`  variant="${props.variant}"`);
  }

  if (props.theme !== "github") {
    parts.push(`  theme="${props.theme}"`);
  }

  if (props.mode === "3d") {
    parts.push(`  mode="3d"`);
  }

  if (props.username && props.username !== "octocat") {
    parts.push(`  username="${props.username}"`);
  }

  if (props.year && props.year !== 2026) {
    parts.push(`  year={${props.year}}`);
  }

  if (!props.showYearSelector) {
    parts.push(`  showYearSelector={false}`);
  }

  if (props.showFullYear) {
    parts.push(`  showFullYear`);
  }

  if (props.weeksCount !== 52) {
    parts.push(`  weeksCount={${props.weeksCount}}`);
  }

  if (props.maxEvents !== 6) {
    parts.push(`  maxEvents={${props.maxEvents}}`);
  }

  if (!props.showHeader) {
    parts.push(`  showHeader={false}`);
  }

  if (!props.showTabs) {
    parts.push(`  showTabs={false}`);
  }

  if (props.showStreaks === false) {
    parts.push(`  showStreaks={false}`);
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
