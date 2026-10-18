import { ComponentDocData } from "./types";

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function getFallbackDoc(slug: string): ComponentDocData {
  const componentName = toPascalCase(slug);

  const usageCode = `import { ${componentName} } from "@/components/ui/${slug}";

export default function ${componentName}Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <${componentName} />
    </div>
  );
}`;

  return {
    usageCode,
    codeContent: usageCode,
    codes: {
      basic: usageCode,
    },
    tocItems: [
      {
        id: "basic",
        label: "Basic",
      },
    ],
    dependencies: [
      { name: "clsx", command: "npm install clsx" },
      { name: "tailwind-merge", command: "npm install tailwind-merge" },
    ],
  };
}
