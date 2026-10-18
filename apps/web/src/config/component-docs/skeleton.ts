import { ComponentDocData } from "./types";

export const SKELETON_USAGE = `import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4 p-6">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}`;

export const SKELETON_EXAMPLES = [
  {
    id: "basic",
    label: "Basic",
    code: `import { Skeleton } from "@/components/ui/skeleton";

export default function BasicSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}`,
  },
  {
    id: "card",
    label: "Card Placeholder",
    code: `import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 w-[260px] p-4 border rounded-2xl">
      <Skeleton className="h-[120px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}`,
  },
  {
    id: "shimmer",
    label: "Shimmer Variant",
    code: `import { Skeleton } from "@/components/ui/skeleton";

export default function ShimmerSkeleton() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <Skeleton variant="shimmer" className="h-6 w-3/4" />
      <Skeleton variant="shimmer" className="h-4 w-full" />
      <Skeleton variant="shimmer" className="h-4 w-1/2" />
    </div>
  );
}`,
  },
];

export const skeletonDoc: ComponentDocData = {
  usageCode: SKELETON_USAGE,
  codeContent: SKELETON_USAGE,
  codes: SKELETON_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: SKELETON_EXAMPLES.map((ex) => ({
    id: ex.id,
    label: ex.label,
  })),
  dependencies: [
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Skeleton",
      props: [
        {
          prop: "variant",
          type: '"pulse" | "shimmer"',
          defaultValue: '"pulse"',
          description: "Animation style applied to placeholder (standard pulse or gradient shimmer).",
        },
        {
          prop: "className",
          type: "string",
          defaultValue: "-",
          description: "Width, height, and border-radius classes defining skeleton geometry.",
        },
      ],
    },
  ],
};
