import { Sparkles, Layers, Sliders, CheckCircle2, Wand2 } from "lucide-react";

export const STEP_CARDS = [
  { title: "Border & Radius", subtitle: "Gooey curves & hairlines", description: "Configurable outline borders with liquid rounded geometry.", icon: Layers, accent: "from-sky-500/20 via-cyan-500/10 to-transparent" },
  { title: "Typography Scale", subtitle: "Fluid responsive typography", description: "Hierarchical type ramping with optical letter spacing.", icon: Sparkles, accent: "from-purple-500/20 via-pink-500/10 to-transparent" },
  { title: "Color Themes", subtitle: "Adaptive dual-tone palettes", description: "Engineered high-contrast tokens adhering to WCAG AAA standards.", icon: Sliders, accent: "from-amber-500/20 via-orange-500/10 to-transparent" },
  { title: "Motion Dynamics", subtitle: "Spring-damped gooey filters", description: "Physically calculated liquid matrix filters powered by SVG feColorMatrix.", icon: Wand2, accent: "from-emerald-500/20 via-teal-500/10 to-transparent" },
  { title: "Production Ready", subtitle: "Zero-config export code", description: "Self-contained accessible primitives ready for immediate zero-config copy-paste.", icon: CheckCircle2, accent: "from-rose-500/20 via-red-500/10 to-transparent" },
];

export type AnimationMode = "slide" | "zoom" | "flip" | "stagger";

export const MOTION_MODES = [
  { id: "slide", label: "Slide" },
  { id: "zoom", label: "Zoom Pop" },
  { id: "flip", label: "3D Flip" },
  { id: "stagger", label: "Stagger" },
] as const;

export const MOTION_VARIANTS = {
  slide: {
    initial: (d: number = 1) => ({ opacity: 0, x: (d ?? 1) >= 0 ? 32 : -32, filter: "blur(4px)" }),
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (d: number = 1) => ({ opacity: 0, x: (d ?? 1) >= 0 ? -32 : 32, filter: "blur(4px)" }),
  },
  zoom: {
    initial: () => ({ opacity: 0, scale: 0.88, filter: "blur(4px)" }),
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: () => ({ opacity: 0, scale: 1.08, filter: "blur(4px)" }),
  },
  flip: {
    initial: (d: number = 1) => ({ opacity: 0, rotateX: (d ?? 1) >= 0 ? 25 : -25, y: 12 }),
    animate: { opacity: 1, rotateX: 0, y: 0 },
    exit: (d: number = 1) => ({ opacity: 0, rotateX: (d ?? 1) >= 0 ? -25 : 25, y: -12 }),
  },
  stagger: {
    initial: () => ({ opacity: 0, y: 14 }),
    animate: { opacity: 1, y: 0 },
    exit: () => ({ opacity: 0, y: -14 }),
  },
};

export interface StepCarouselExample {
  id: string;
  label: string;
  emoji: string;
  code: string;
}

export const STEP_CAROUSEL_EXAMPLES: StepCarouselExample[] = [
  {
    id: "basic", label: "Basic Carousel", emoji: "🎬",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nexport default function BasicCarouselDemo() {\n  const [step, setStep] = useState(0);\n  return (\n    <div className="flex items-center justify-center p-6">\n      <StepCarousel totalSteps={5} currentStep={step} onStepChange={setStep} duration={3500} loop={false} />\n    </div>\n  );\n}`,
  },
  {
    id: "gooey", label: "Gooey Fluid Matrix", emoji: "🫧",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nexport default function GooeyCarouselDemo() {\n  const [step, setStep] = useState(0);\n  return (\n    <div className="flex items-center justify-center p-6">\n      <StepCarousel totalSteps={5} currentStep={step} onStepChange={setStep} duration={3500} loop gooey />\n    </div>\n  );\n}`,
  },
  {
    id: "sizes", label: "Size Variants", emoji: "📐",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nexport default function SizesCarouselDemo() {\n  const [s1, setS1] = useState(0);\n  const [s2, setS2] = useState(1);\n  const [s3, setS3] = useState(2);\n  return (\n    <div className="flex flex-col items-center gap-6 p-6">\n      <StepCarousel totalSteps={4} currentStep={s1} onStepChange={setS1} size="sm" />\n      <StepCarousel totalSteps={5} currentStep={s2} onStepChange={setS2} size="md" />\n      <StepCarousel totalSteps={6} currentStep={s3} onStepChange={setS3} size="lg" />\n    </div>\n  );\n}`,
  },
  {
    id: "primary", label: "Primary Accent", emoji: "🎨",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nexport default function PrimaryCarouselDemo() {\n  const [step, setStep] = useState(0);\n  return (\n    <div className="flex items-center justify-center p-6">\n      <StepCarousel totalSteps={5} currentStep={step} onStepChange={setStep} colorScheme="primary" />\n    </div>\n  );\n}`,
  },
  {
    id: "autoplay", label: "Autoplay Loop", emoji: "🔄",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nexport default function AutoplayCarouselDemo() {\n  const [step, setStep] = useState(0);\n  return (\n    <div className="flex items-center justify-center p-6">\n      <StepCarousel totalSteps={5} currentStep={step} onStepChange={setStep} defaultPlaying loop duration={3000} />\n    </div>\n  );\n}`,
  },
  {
    id: "without-button", label: "Minimal Dots", emoji: "🔘",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nexport default function MinimalCarouselDemo() {\n  const [step, setStep] = useState(0);\n  return (\n    <div className="flex items-center justify-center p-6">\n      <StepCarousel totalSteps={5} currentStep={step} onStepChange={setStep} showPlayButton={false} />\n    </div>\n  );\n}`,
  },
  {
    id: "pause-on-hover", label: "Pause On Hover", emoji: "⏸️",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nexport default function PauseOnHoverCarouselDemo() {\n  const [step, setStep] = useState(0);\n  return (\n    <div className="flex items-center justify-center p-6">\n      <StepCarousel totalSteps={5} currentStep={step} onStepChange={setStep} defaultPlaying pauseOnHover />\n    </div>\n  );\n}`,
  },
  {
    id: "fast", label: "Fast Speed", emoji: "⚡",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nexport default function FastCarouselDemo() {\n  const [step, setStep] = useState(0);\n  return (\n    <div className="flex items-center justify-center p-6">\n      <StepCarousel totalSteps={5} currentStep={step} onStepChange={setStep} duration={1200} defaultPlaying loop />\n    </div>\n  );\n}`,
  },
  {
    id: "overflow", label: "Overflow (+More)", emoji: "🔢",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nexport default function OverflowCarouselDemo() {\n  const [step, setStep] = useState(0);\n  return (\n    <div className="flex items-center justify-center p-6">\n      <StepCarousel totalSteps={8} currentStep={step} onStepChange={setStep} maxVisibleSteps={5} />\n    </div>\n  );\n}`,
  },
  {
    id: "controlled", label: "External Controls", emoji: "🎛️",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nexport default function ControlledCarouselDemo() {\n  const [step, setStep] = useState(0);\n  return (\n    <div className="flex flex-col items-center gap-4 p-6">\n      <StepCarousel totalSteps={5} currentStep={step} onStepChange={setStep} />\n      <div className="flex gap-2">\n        <button onClick={() => setStep(s => Math.max(0, s - 1))} className="px-3 py-1 text-xs rounded border border-border">Prev</button>\n        <button onClick={() => setStep(s => Math.min(4, s + 1))} className="px-3 py-1 text-xs rounded border border-border">Next</button>\n      </div>\n    </div>\n  );\n}`,
  },
  {
    id: "motion", label: "Content Motion Effects", emoji: "✨",
    code: `"use client";\n\nimport { useState } from "react";\nimport { StepCarousel } from "@/components/ui/step-carousel";\n\nconst SLIDES = ["Border & Radius", "Typography Scale", "Color Themes", "Motion Dynamics", "Production Ready"].map((title, i) => (\n  <div key={i} className="w-full h-32 rounded-2xl border border-border bg-card p-4 flex flex-col justify-center items-center gap-2 shadow-sm">\n    <span className="text-xs font-mono text-muted-foreground uppercase">Slide 0\${i + 1}</span>\n    <h4 className="text-lg font-bold text-foreground">{title}</h4>\n  </div>\n));\n\nexport default function ContentMotionDemo() {\n  return (\n    <div className="w-full max-w-md p-6">\n      <StepCarousel items={SLIDES} animation="slide" duration={3000} loop />\n    </div>\n  );\n}`,
  },
];
