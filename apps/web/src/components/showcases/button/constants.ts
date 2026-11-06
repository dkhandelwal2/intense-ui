export interface ButtonExampleItem {
  id: string;
  label: string;
  emoji: string;
  code: string;
}

export const BUTTON_EXAMPLES: ButtonExampleItem[] = [
  {
    id: "basic", label: "Basic Button", emoji: "🔘",
    code: `import { Button } from "@/components/ui/button";

export default function BasicButton() {
  return (
    <Button variant="default" size="md">
      Interactive Button
    </Button>
  );
}`,
  },
  {
    id: "confirmation", label: "Confirmation Button", emoji: "⚡",
    code: `import { Button } from "@/components/ui/button";

export default function ConfirmationButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* 1. Pill Mode */}
      <div className="flex flex-wrap gap-4">
        <Button variant="confirmation" confirmAction="delete" confirmType="pill" onConfirm={() => console.log("Deleted")} />
        <Button variant="confirmation" confirmAction="confirm" confirmType="pill" onConfirm={() => console.log("Confirmed")} />
      </div>
      {/* 2. Icon Mode */}
      <div className="flex flex-wrap gap-4">
        <Button variant="confirmation" confirmAction="delete" confirmType="icon" onConfirm={() => console.log("Deleted (Icon)")} />
        <Button variant="confirmation" confirmAction="confirm" confirmType="icon" onConfirm={() => console.log("Confirmed (Icon)")} />
      </div>
    </div>
  );
}`,
  },
  {
    id: "text", label: "Text & Ghost", emoji: "📝",
    code: `import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function TextButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="text">Text Only</Button>
      <Button variant="ghost"><ArrowRight className="w-4 h-4" /> Ghost Link</Button>
    </div>
  );
}`,
  },
  {
    id: "icon-btn", label: "Icon Button", emoji: "🎯",
    code: `import { Button } from "@/components/ui/button";
import { Heart, Trash2, Zap } from "lucide-react";

export default function IconButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button size="icon" variant="default" aria-label="Favorite"><Heart className="w-4 h-4 text-red-500 fill-red-500" /></Button>
      <Button size="icon" variant="outline" aria-label="Delete"><Trash2 className="w-4 h-4" /></Button>
      <Button size="icon" rounded variant="glow" aria-label="Quick Action"><Zap className="w-4 h-4 text-amber-400" /></Button>
    </div>
  );
}`,
  },
  {
    id: "outline", label: "Minimal Outline", emoji: "🔲",
    code: `import { Button } from "@/components/ui/button";

export default function OutlineButtonDemo() {
  return (
    <div className="flex gap-3">
      <Button variant="outline" size="sm">Small Outline</Button>
      <Button variant="outline" size="md">Medium Outline</Button>
      <Button variant="outline" size="lg">Large Outline</Button>
    </div>
  );
}`,
  },
  {
    id: "loading", label: "Loading State", emoji: "⏳",
    code: `import { Button } from "@/components/ui/button";

export default function LoadingButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button loading>Saving changes...</Button>
      <Button loading variant="outline">Please wait</Button>
      <Button loading size="icon" variant="default" aria-label="Loading" />
    </div>
  );
}`,
  },
  {
    id: "3d", label: "3D Tactile Button", emoji: "🧱",
    code: `import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function ThreeDButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="3d">Push 3D Button</Button>
      <Button variant="3d" size="lg"><Zap className="w-4 h-4 text-amber-400" /> Tactile Press</Button>
    </div>
  );
}`,
  },
  {
    id: "animation", label: "Animated Buttons", emoji: "✨",
    code: `import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function ButtonAnimationDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="shimmer"><Sparkles className="w-4 h-4" /> Shimmer Beam</Button>
      <Button variant="ripple">Click for Ripple</Button>
      <Button variant="filled-border">Filled Border Sweep</Button>
    </div>
  );
}`,
  },
  {
    id: "rounded", label: "Rounded Button", emoji: "💊",
    code: `import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function RoundedButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button rounded variant="default">Rounded Default</Button>
      <Button rounded variant="outline">Rounded Outline</Button>
      <Button rounded variant="glow"><Sparkles className="w-4 h-4" /> Rounded Glow</Button>
    </div>
  );
}`,
  },
  {
    id: "share", label: "Social Share Morph", emoji: "🔗",
    code: `import { Button } from "@/components/ui/button";

export default function ShareButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* 1. Floating Glow */}
      <Button variant="share" shareVariant="glow" />

      {/* 2. Neumorphic Soft Card */}
      <Button variant="share" shareVariant="neumorphic" />

      {/* 3. Bold Solid Capsule */}
      <Button variant="share" shareVariant="default" />
    </div>
  );
}`,
  },
];
