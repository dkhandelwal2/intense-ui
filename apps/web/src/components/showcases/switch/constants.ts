export interface SwitchExample {
  id: string;
  label: string;
  emoji: string;
  code: string;
}

export const SWITCH_EXAMPLES: SwitchExample[] = [
  {
    id: "basic", label: "3D Origami Rocker", emoji: "🔘",
    code: `"use client";\n\nimport { useState } from "react";\nimport { Switch } from "@/components/ui/switch";\n\nexport default function RockerSwitchDemo() {\n  const [checked, setChecked] = useState(true);\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Switch checked={checked} onChange={setChecked} variant="rocker" size="md" />\n    </div>\n  );\n}`,
  },
  {
    id: "pill", label: "Classic Smooth Pill", emoji: "💊",
    code: `"use client";\n\nimport { useState } from "react";\nimport { Switch } from "@/components/ui/switch";\n\nexport default function PillSwitchDemo() {\n  const [checked, setChecked] = useState(true);\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Switch variant="pill" checked={checked} onChange={setChecked} size="md" />\n    </div>\n  );\n}`,
  },
  {
    id: "cutout", label: "Ring Donut Slider", emoji: "🟠",
    code: `"use client";\n\nimport { useState } from "react";\nimport { Switch } from "@/components/ui/switch";\n\nexport default function CutoutSwitchDemo() {\n  const [checked, setChecked] = useState(true);\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Switch variant="cutout" checked={checked} onChange={setChecked} size="md" />\n    </div>\n  );\n}`,
  },
  {
    id: "capsule-text", label: "Inline Text Capsule", emoji: "🏷️",
    code: `"use client";\n\nimport { useState } from "react";\nimport { Switch } from "@/components/ui/switch";\n\nexport default function CapsuleTextSwitchDemo() {\n  const [checked, setChecked] = useState(true);\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Switch variant="capsule-text" checked={checked} onChange={setChecked} size="md" />\n    </div>\n  );\n}`,
  },
  {
    id: "industrial", label: "Industrial Machinery", emoji: "⚙️",
    code: `"use client";\n\nimport { useState } from "react";\nimport { Switch } from "@/components/ui/switch";\n\nexport default function IndustrialSwitchDemo() {\n  const [checked, setChecked] = useState(true);\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Switch variant="industrial" checked={checked} onChange={setChecked} size="md" />\n    </div>\n  );\n}`,
  },
  {
    id: "square", label: "Square Push Tile", emoji: "🔲",
    code: `"use client";\n\nimport { useState } from "react";\nimport { Switch } from "@/components/ui/switch";\n\nexport default function SquareSwitchDemo() {\n  const [checked, setChecked] = useState(true);\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Switch variant="square" checked={checked} onChange={setChecked} sliderText="yes/no" size="md" />\n    </div>\n  );\n}`,
  },
];
