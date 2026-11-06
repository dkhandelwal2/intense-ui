export interface SliderExample {
  id: string;
  label: string;
  emoji: string;
  description: string;
  code: string;
}

export const SLIDER_EXAMPLES: SliderExample[] = [
  {
    id: "basic", label: "Basic Slider", emoji: "🎚️",
    description: "Fluid spring-animated single value slider with responsive track feedback",
    code: `"use client";\nimport { useState } from "react";\nimport { Slider } from "@/components/ui/slider";\n\nexport default function BasicSliderDemo() {\n  const [val, setVal] = useState(50);\n  return (\n    <div className="w-full max-w-sm space-y-3 p-6">\n      <div className="flex justify-between text-sm font-medium">\n        <span>Volume</span>\n        <span className="font-mono text-muted-foreground">{val}%</span>\n      </div>\n      <Slider value={val} min={0} max={100} onChange={setVal} />\n    </div>\n  );\n}`,
  },
  {
    id: "step", label: "Step Slider & Marks", emoji: "📊",
    description: "Discrete snap steps with props-driven bottom percentage markers or custom labels",
    code: `"use client";\nimport { useState } from "react";\nimport { Slider } from "@/components/ui/slider";\n\nexport default function StepSliderDemo() {\n  const [val, setVal] = useState(50);\n  return (\n    <div className="w-full max-w-sm space-y-4 p-6">\n      <div className="flex justify-between text-sm font-medium">\n        <span>Step Progress</span>\n        <span className="font-mono text-muted-foreground">{val}%</span>\n      </div>\n      <Slider value={val} step={25} min={0} max={100} onChange={setVal} marks={["0%", "25%", "50%", "75%", "100%"]} />\n    </div>\n  );\n}`,
  },
  {
    id: "multi", label: "Multi-Thumb (3+ Dots)", emoji: "🎯",
    description: "Multi-point slider supporting 3 or more independently draggable thumbs on a single track",
    code: `"use client";\nimport { useState } from "react";\nimport { MultiSlider } from "@/components/ui/slider";\n\nexport default function MultiSliderDemo() {\n  const [vals, setVals] = useState<number[]>([20, 50, 80]);\n  return (\n    <div className="w-full max-w-sm space-y-4 p-6">\n      <div className="flex justify-between text-sm font-medium">\n        <span>Multi-Checkpoint Bounds</span>\n        <span className="font-mono text-xs text-muted-foreground">{vals.join(" • ")}</span>\n      </div>\n      <MultiSlider values={vals} min={0} max={100} onChange={setVals} tooltip marks={["Min", "Low", "Mid", "High", "Max"]} />\n    </div>\n  );\n}`,
  },
  {
    id: "zoom", label: "Zoom Range (100-500)", emoji: "🔍",
    description: "Configurable numerical boundaries with fine-grained step resolution for canvas zoom",
    code: `"use client";\nimport { useState } from "react";\nimport { Slider } from "@/components/ui/slider";\n\nexport default function ZoomSliderDemo() {\n  const [zoom, setZoom] = useState(320);\n  return (\n    <div className="w-full max-w-sm space-y-3 p-6">\n      <div className="flex justify-between text-sm font-medium">\n        <span>Canvas Zoom</span>\n        <span className="font-mono font-bold text-[var(--theme-primary)]">{zoom}%</span>\n      </div>\n      <Slider value={zoom} min={100} max={500} onChange={setZoom} zoomEffect tooltip />\n    </div>\n  );\n}`,
  },
  {
    id: "range", label: "Range Slider", emoji: "↔️",
    description: "Dual-thumb interactive range selector with independent low and high bounds",
    code: `"use client";\nimport { useState } from "react";\nimport { RangeSlider } from "@/components/ui/slider";\n\nexport default function RangeSliderDemo() {\n  const [range, setRange] = useState<[number, number]>([25, 75]);\n  return (\n    <div className="w-full max-w-sm space-y-4 p-6">\n      <div className="flex justify-between text-sm font-medium">\n        <span>Price Range</span>\n        <span className="font-mono text-muted-foreground">\\\${range[0]} - \\\${range[1]}</span>\n      </div>\n      <RangeSlider value={range} min={0} max={100} onChange={setRange} tooltip />\n    </div>\n  );\n}`,
  },
  {
    id: "with-icons", label: "Left & Right Icons", emoji: "🔊",
    description: "Interactive edge icons for instant one-click min and max boundary snaps",
    code: `"use client";\nimport { useState } from "react";\nimport { Slider } from "@/components/ui/slider";\nimport { Volume1, Volume2 } from "lucide-react";\n\nexport default function IconsSliderDemo() {\n  const [val, setVal] = useState(65);\n  return (\n    <div className="w-full max-w-sm p-6">\n      <Slider value={val} onChange={setVal} leftIcon={<Volume1 className="w-4 h-4" />} rightIcon={<Volume2 className="w-4 h-4" />} />\n    </div>\n  );\n}`,
  },
  {
    id: "thumb-icon", label: "Custom Thumb Icon", emoji: "☀️",
    description: "Custom icon embedded directly within the sliding thumb indicator",
    code: `"use client";\nimport { useState } from "react";\nimport { Slider } from "@/components/ui/slider";\nimport { Sun } from "lucide-react";\n\nexport default function ThumbIconDemo() {\n  const [val, setVal] = useState(80);\n  return (\n    <div className="w-full max-w-sm p-6">\n      <Slider value={val} onChange={setVal} thumbIcon={<Sun className="w-3 h-3" />} variant="warning" />\n    </div>\n  );\n}`,
  },
  {
    id: "vertical", label: "Vertical Slider", emoji: "↕️",
    description: "Space-saving vertical orientation with inverted bottom-to-top fluid fill",
    code: `"use client";\nimport { useState } from "react";\nimport { Slider } from "@/components/ui/slider";\n\nexport default function VerticalSliderDemo() {\n  const [val, setVal] = useState(60);\n  return (\n    <div className="flex items-center justify-center p-6 h-64">\n      <Slider value={val} onChange={setVal} orientation="vertical" tooltip />\n    </div>\n  );\n}`,
  },
  {
    id: "animation", label: "Thumb Dot Animation", emoji: "✨",
    description: "Visual micro-interaction reactions including pulse, glow halo, and hover scale",
    code: `"use client";\nimport { useState } from "react";\nimport { Slider } from "@/components/ui/slider";\n\nexport default function AnimatedSliderDemo() {\n  const [p, setP] = useState(40);\n  const [g, setG] = useState(70);\n  const [s, setS] = useState(55);\n  return (\n    <div className="w-full max-w-sm space-y-6 p-6">\n      <Slider value={p} onChange={setP} thumbAnimation="pulse" variant="info" />\n      <Slider value={g} onChange={setG} thumbAnimation="glow" variant="success" />\n      <Slider value={s} onChange={setS} thumbAnimation="scale" variant="primary" />\n    </div>\n  );\n}`,
  },
  {
    id: "intents", label: "Multiple Intent Types", emoji: "🎨",
    description: "Semantic color themes for primary, success, danger, and warning feedback",
    code: `"use client";\nimport { useState } from "react";\nimport { Slider } from "@/components/ui/slider";\n\nexport default function IntentsSliderDemo() {\n  const [p, setP] = useState(75);\n  const [s, setS] = useState(60);\n  const [d, setD] = useState(30);\n  return (\n    <div className="w-full max-w-sm space-y-5 p-6">\n      <Slider value={p} onChange={setP} variant="primary" />\n      <Slider value={s} onChange={setS} variant="success" />\n      <Slider value={d} onChange={setD} variant="danger" />\n    </div>\n  );\n}`,
  },
  {
    id: "with-input", label: "Slider with Input", emoji: "🔢",
    description: "Bidirectional synchronized numeric text field with real-time value validation",
    code: `"use client";\nimport { useState } from "react";\nimport { Slider } from "@/components/ui/slider";\n\nexport default function InputSliderDemo() {\n  const [val, setVal] = useState(42);\n  return (\n    <div className="w-full max-w-sm p-6">\n      <Slider value={val} onChange={setVal} showInput />\n    </div>\n  );\n}`,
  },
  {
    id: "tooltip", label: "Thumb with Tooltip", emoji: "💬",
    description: "Floating popover indicator displaying real-time numerical value on hover and drag",
    code: `"use client";\nimport { useState } from "react";\nimport { Slider } from "@/components/ui/slider";\n\nexport default function TooltipSliderDemo() {\n  const [val, setVal] = useState(85);\n  return (\n    <div className="w-full max-w-sm p-6 pt-10">\n      <Slider value={val} onChange={setVal} tooltip />\n    </div>\n  );\n}`,
  },
];
