export interface ColorGridExample {
  id: string;
  label: string;
  emoji: string;
  code: string;
}

export const COLOR_GRID_EXAMPLES: ColorGridExample[] = [
  {
    id: "basic", label: "Basic Swatches", emoji: "🎨",
    code: `"use client";\n\nimport { useState } from "react";\nimport { ColorGrid } from "@/components/ui/color-grid";\n\nexport default function BasicColorGridDemo() {\n  const [color, setColor] = useState("var(--theme-primary)");\n\n  return (\n    <div className="flex flex-col items-center gap-6 p-8">\n      <ColorGrid\n        value={color}\n        onChange={setColor}\n        defaultValue="var(--theme-primary)"\n        onClear={() => setColor("var(--theme-primary)")}\n        showCustomPicker\n      />\n    </div>\n  );\n}`,
  },
  {
    id: "vertical", label: "Vertical Layout", emoji: "📐",
    code: `"use client";\n\nimport { useState } from "react";\nimport { ColorGrid } from "@/components/ui/color-grid";\n\nexport default function VerticalColorGridDemo() {\n  const [color, setColor] = useState("#3b82f6");\n\n  return (\n    <div className="flex items-center justify-center p-8">\n      <ColorGrid orientation="vertical" value={color} onChange={setColor} />\n    </div>\n  );\n}`,
  },
  {
    id: "sizes", label: "Size Variants", emoji: "📏",
    code: `"use client";\n\nimport { useState } from "react";\nimport { ColorGrid } from "@/components/ui/color-grid";\n\nexport default function SizesColorGridDemo() {\n  const [color, setColor] = useState("#10b981");\n\n  return (\n    <div className="flex flex-col items-center gap-4 p-8">\n      <ColorGrid size="sm" value={color} onChange={setColor} />\n      <ColorGrid size="md" value={color} onChange={setColor} />\n      <ColorGrid size="lg" value={color} onChange={setColor} />\n    </div>\n  );\n}`,
  },
  {
    id: "custom-picker", label: "Custom Picker & EyeDropper", emoji: "💧",
    code: `"use client";\n\nimport { useState } from "react";\nimport { ColorGrid } from "@/components/ui/color-grid";\n\nexport default function CustomPickerColorGridDemo() {\n  const [color, setColor] = useState("#f43f5e");\n\n  return (\n    <div className="flex flex-col items-center gap-6 p-8">\n      <ColorGrid value={color} onChange={setColor} showCustomPicker />\n    </div>\n  );\n}`,
  },
  {
    id: "draggable", label: "Draggable Reorder", emoji: "✋",
    code: `"use client";\n\nimport { useState } from "react";\nimport { ColorGrid } from "@/components/ui/color-grid";\n\nexport default function DraggableColorGridDemo() {\n  const [color, setColor] = useState("#8b5cf6");\n\n  return (\n    <div className="flex flex-col items-center gap-6 p-8">\n      <ColorGrid value={color} onChange={setColor} draggable />\n    </div>\n  );\n}`,
  },
  {
    id: "grid-layout", label: "Responsive Columns", emoji: "▦",
    code: `"use client";\n\nimport { useState } from "react";\nimport { ColorGrid } from "@/components/ui/color-grid";\n\nexport default function GridLayoutColorGridDemo() {\n  const [color, setColor] = useState("#06b6d4");\n\n  return (\n    <div className="flex flex-col items-center gap-6 p-8">\n      <ColorGrid columns={3} value={color} onChange={setColor} />\n    </div>\n  );\n}`,
  },
];
