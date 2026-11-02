"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonCustomProps } from "./types";

interface ButtonPreviewProps {
  customProps: ButtonCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}

export function ButtonPreview({
  customProps,
  activeTocId = "basic",
  isCustomizing = false,
}: ButtonPreviewProps) {
  const [sharedPlatform, setSharedPlatform] = useState<string | null>(null);

  if (isCustomizing) {
    if (customProps.variant === "share") {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <Button variant="share" size={customProps.size} onShare={(p) => setSharedPlatform(p)} />
          {sharedPlatform && (
            <span className="text-xs font-mono text-emerald-500 animate-fade-in">
              Shared to {sharedPlatform}!
            </span>
          )}
        </div>
      );
    }

    const Icon = customProps.iconPosition === "right" ? ArrowRight : Sparkles;
    return (
      <div className="flex items-center justify-center p-8">
        <Button
          variant={customProps.variant}
          size={customProps.size}
          disabled={customProps.disabled}
        >
          {customProps.showIcon && customProps.iconPosition === "left" && (
            <Icon className="w-4 h-4" />
          )}
          <span>{customProps.label || "Interactive Button"}</span>
          {customProps.showIcon && customProps.iconPosition === "right" && (
            <Icon className="w-4 h-4" />
          )}
        </Button>
      </div>
    );
  }

  // 1. Social Share Morphing Button (Pinterest Design)
  if (activeTocId === "share") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Button variant="share" size="md" onShare={(p) => setSharedPlatform(p)} />
          <Button variant="share" size="lg" onShare={(p) => setSharedPlatform(p)} />
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {sharedPlatform
            ? `Shared to ${sharedPlatform.toUpperCase()}!`
            : "Click 'SHARE' to expand social platforms (WhatsApp, IG, X, FB)"}
        </span>
      </div>
    );
  }

  // 2. Neon Glow Variant
  if (activeTocId === "glow") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Button variant="glow" size="lg">
          <Sparkles className="w-4 h-4" />
          Glowing Action
        </Button>
        <span className="text-xs text-muted-foreground font-mono">
          Spring damping with primary radiant glow
        </span>
      </div>
    );
  }

  // 3. Minimal Outline Variant
  if (activeTocId === "outline") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 p-8">
        <Button variant="outline" size="sm">Small Outline</Button>
        <Button variant="outline" size="md">Medium Outline</Button>
        <Button variant="outline" size="lg">Large Outline</Button>
      </div>
    );
  }

  // 4. Subtle Muted Variant
  if (activeTocId === "subtle") {
    return (
      <div className="flex items-center justify-center gap-3 p-8">
        <Button variant="subtle" size="md">Subtle Neutral</Button>
        <Button variant="subtle" size="md">
          <Check className="w-4 h-4 text-emerald-500" />
          Confirmed
        </Button>
      </div>
    );
  }

  // 5. Size Variants
  if (activeTocId === "sizes") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-8">
        <Button size="sm">Small (SM)</Button>
        <Button size="md">Medium (MD)</Button>
        <Button size="lg">Large (LG)</Button>
      </div>
    );
  }

  // 6. With Icons
  if (activeTocId === "icon") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-8">
        <Button variant="default">
          <Zap className="w-4 h-4 text-amber-400" />
          Quick Action
        </Button>
        <Button variant="glow">
          <Sparkles className="w-4 h-4" />
          Get Started
        </Button>
        <Button variant="outline">
          Continue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // 7. Disabled State
  if (activeTocId === "disabled") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 p-8">
        <Button variant="default" disabled>Default Disabled</Button>
        <Button variant="glow" disabled>Glow Disabled</Button>
        <Button variant="outline" disabled>Outline Disabled</Button>
      </div>
    );
  }

  // Default: Basic Button
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Button variant="default" size="md">
        Interactive Button
      </Button>
      <span className="text-xs text-muted-foreground font-mono">
        Tap or hover to experience spring dynamic physics
      </span>
    </div>
  );
}
