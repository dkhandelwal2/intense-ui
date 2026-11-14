export interface ProgressExample {
  id: string;
  label: string;
  emoji: string;
  description: string;
  code: string;
}

export const PROGRESS_EXAMPLES: ProgressExample[] = [
  {
    id: "linear",
    label: "Linear Progress",
    emoji: "📏",
    description: "Standard fluid spring-animated linear progress bar with value readout",
    code: `"use client";\nimport { useState } from "react";\nimport { Progress } from "@/components/ui/progress";\n\nexport default function LinearProgressDemo() {\n  const [progress] = useState(65);\n  return (\n    <div className="w-full max-w-sm space-y-3 p-6">\n      <Progress value={progress} showValue />\n    </div>\n  );\n}`,
  },
  {
    id: "circular",
    label: "Circular Ring",
    emoji: "⭕",
    description: "360° circular progress ring with smooth stroke dashoffset and center percentage",
    code: `"use client";\nimport { useState } from "react";\nimport { ProgressCircular } from "@/components/ui/progress";\n\nexport default function CircularProgressDemo() {\n  const [val] = useState(78);\n  return (\n    <div className="flex flex-col items-center justify-center p-6">\n      <ProgressCircular value={val} label="Storage" unit="%" />\n    </div>\n  );\n}`,
  },
  {
    id: "semicircle",
    label: "Semicircle Gauge",
    emoji: "🧭",
    description: "180° arched speedometer gauge with baseline bounds and fluid arc progress",
    code: `"use client";\nimport { useState } from "react";\nimport { ProgressSemicircle } from "@/components/ui/progress";\n\nexport default function SemicircleGaugeDemo() {\n  const [speed] = useState(72);\n  return (\n    <div className="flex flex-col items-center justify-center p-6">\n      <ProgressSemicircle value={speed} label="Throttle" />\n    </div>\n  );\n}`,
  },
  {
    id: "buffer",
    label: "Streaming Buffer",
    emoji: "⏳",
    description: "Dual-layer media player buffer loader with secondary loaded progress layer",
    code: `"use client";\nimport { useState } from "react";\nimport { ProgressBuffer } from "@/components/ui/progress";\n\nexport default function BufferProgressDemo() {\n  const [pos] = useState(45);\n  return (\n    <div className="w-full max-w-sm p-6">\n      <ProgressBuffer value={pos} loaded={85} isLoading statusText="Buffering Track..." />\n    </div>\n  );\n}`,
  },
  {
    id: "shimmer",
    label: "Shimmer Wave",
    emoji: "✨",
    description: "Futuristic high-tech glowing shimmer light beam continuously sweeping along the active track",
    code: `"use client";\nimport { useState } from "react";\nimport { ProgressShimmer } from "@/components/ui/progress";\n\nexport default function ShimmerProgressDemo() {\n  const [val] = useState(58);\n  return (\n    <div className="w-full max-w-sm p-6">\n      <ProgressShimmer value={val} />\n    </div>\n  );\n}`,
  },
  {
    id: "capsule",
    label: "Loaded % Inside",
    emoji: "💊",
    description: "Tactile wide pill container with inverted typography and dynamic percentage inside",
    code: `"use client";\nimport { useState } from "react";\nimport { ProgressCapsule } from "@/components/ui/progress";\nimport { CloudUpload } from "lucide-react";\n\nexport default function CapsuleProgressDemo() {\n  const [val] = useState(68);\n  return (\n    <div className="w-full max-w-sm p-6">\n      <ProgressCapsule value={val} label="Upload" icon={<CloudUpload className="w-4 h-4" />} />\n    </div>\n  );\n}`,
  },
  {
    id: "striped",
    label: "Striped & Animated",
    emoji: "💈",
    description: "Diagonal barbershop striped pattern with continuous marquee-flowing animation",
    code: `"use client";\nimport { useState } from "react";\nimport { Progress } from "@/components/ui/progress";\n\nexport default function StripedProgressDemo() {\n  const [val] = useState(75);\n  return (\n    <div className="w-full max-w-sm p-6">\n      <Progress value={val} striped animated size="lg" showValue />\n    </div>\n  );\n}`,
  },
  {
    id: "indeterminate",
    label: "Indeterminate",
    emoji: "🌊",
    description: "Infinite wave beacon for asynchronous operations with unknown duration",
    code: `"use client";\nimport { Progress } from "@/components/ui/progress";\n\nexport default function IndeterminateProgressDemo() {\n  return (\n    <div className="w-full max-w-sm p-6 space-y-2">\n      <span className="text-xs font-mono text-muted-foreground">Fetching dependencies...</span>\n      <Progress indeterminate size="md" variant="info" />\n    </div>\n  );\n}`,
  },
  {
    id: "intents",
    label: "Intent Types",
    emoji: "🎨",
    description: "Semantic color variants: Primary, Success, Danger, Warning, and Info",
    code: `"use client";\nimport { Progress } from "@/components/ui/progress";\n\nexport default function ProgressIntentsDemo() {\n  return (\n    <div className="w-full max-w-sm p-6 space-y-4">\n      <Progress value={80} variant="primary" showValue />\n      <Progress value={65} variant="success" showValue />\n      <Progress value={45} variant="warning" showValue />\n      <Progress value={25} variant="danger" showValue />\n    </div>\n  );\n}`,
  },
];
