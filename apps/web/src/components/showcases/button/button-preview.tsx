"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Zap, Trash2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonCustomProps } from "./types";

export function ButtonPreview({ customProps, activeTocId = "basic", isCustomizing = false }: { customProps: ButtonCustomProps; activeTocId?: string; isCustomizing?: boolean }) {
  const [sharedPlatform, setSharedPlatform] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  if (isCustomizing) {
    if (customProps.variant === "share") {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <Button variant="share" size={customProps.size === "icon" ? "md" : customProps.size} onShare={(p) => setSharedPlatform(p)} />
          {sharedPlatform && <span className="text-xs font-mono text-emerald-500">Shared to {sharedPlatform}!</span>}
        </div>
      );
    }
    if (customProps.variant === "confirmation") {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <Button variant="confirmation" confirmAction={customProps.confirmAction} confirmType={customProps.confirmType} size={customProps.size === "icon" ? "md" : customProps.size} onConfirm={() => setLastAction(customProps.confirmAction)} />
          {lastAction && <span className="text-xs font-mono text-emerald-500 uppercase">{lastAction} confirmed!</span>}
        </div>
      );
    }
    const Icon = customProps.iconPosition === "right" ? ArrowRight : Sparkles;
    return (
      <div className="flex items-center justify-center p-8">
        <Button variant={customProps.variant} size={customProps.size} rounded={customProps.rounded} loading={customProps.loading} disabled={customProps.disabled}>
          {customProps.size === "icon" ? (
            <Sparkles className="w-4 h-4" />
          ) : (
            <>
              {customProps.showIcon && customProps.iconPosition === "left" && <Icon className="w-4 h-4" />}
              <span>{customProps.label || "Interactive Button"}</span>
              {customProps.showIcon && customProps.iconPosition === "right" && <Icon className="w-4 h-4" />}
            </>
          )}
        </Button>
      </div>
    );
  }

  if (activeTocId === "confirmation" || activeTocId === "delete") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">1. Pill Mode (Text + In-Place Morph)</span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="confirmation" confirmAction="delete" confirmType="pill" onConfirm={() => setLastAction("Deleted (Pill)")} />
            <Button variant="confirmation" confirmAction="confirm" confirmType="pill" onConfirm={() => setLastAction("Confirmed (Pill)")} />
            <Button variant="confirmation" confirmAction="archive" confirmType="pill" onConfirm={() => setLastAction("Archived (Pill)")} />
            <Button variant="confirmation" confirmAction="discard" confirmType="pill" onConfirm={() => setLastAction("Discarded (Pill)")} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 pt-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">2. Icon Mode (Squircle Morph)</span>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button variant="confirmation" confirmAction="delete" confirmType="icon" onConfirm={() => setLastAction("Deleted (Icon)")} />
            <Button variant="confirmation" confirmAction="confirm" confirmType="icon" onConfirm={() => setLastAction("Confirmed (Icon)")} />
            <Button variant="confirmation" confirmAction="archive" confirmType="icon" onConfirm={() => setLastAction("Archived (Icon)")} />
            <Button variant="confirmation" confirmAction="discard" confirmType="icon" onConfirm={() => setLastAction("Discarded (Icon)")} />
          </div>
        </div>
        <span className="text-xs text-muted-foreground font-mono">{lastAction ? `${lastAction} executed in place!` : "Click any button to trigger in-place inline confirmation"}</span>
      </div>
    );
  }

  if (activeTocId === "text") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-8">
        <Button variant="text">Text Only</Button>
        <Button variant="ghost"><ArrowRight className="w-4 h-4" /> Ghost Link</Button>
      </div>
    );
  }

  if (activeTocId === "icon-btn") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-8">
        <Button size="icon" variant="default" aria-label="Favorite"><Heart className="w-4 h-4 text-red-500 fill-red-500" /></Button>
        <Button size="icon" variant="outline" aria-label="Delete"><Trash2 className="w-4 h-4 text-zinc-400" /></Button>
        <Button size="icon" rounded variant="glow" aria-label="Quick Action"><Zap className="w-4 h-4 text-amber-400" /></Button>
      </div>
    );
  }

  if (activeTocId === "outline") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 p-8">
        <Button variant="outline" size="sm">Small Outline</Button>
        <Button variant="outline" size="md">Medium Outline</Button>
        <Button variant="outline" size="lg">Large Outline</Button>
      </div>
    );
  }

  if (activeTocId === "loading") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-8">
        <Button loading>Saving...</Button>
        <Button loading variant="outline">Please wait</Button>
        <Button loading size="icon" variant="default" aria-label="Loading" />
      </div>
    );
  }

  if (activeTocId === "3d") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-8">
        <Button variant="3d">Push 3D Button</Button>
        <Button variant="3d" size="lg"><Zap className="w-4 h-4 text-amber-400" /> Tactile Press</Button>
      </div>
    );
  }

  if (activeTocId === "animation") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-8">
        <Button variant="shimmer"><Sparkles className="w-4 h-4" /> Shimmer Beam</Button>
        <Button variant="ripple">Click For Ripple</Button>
        <Button variant="filled-border">Filled Border Sweep</Button>
      </div>
    );
  }

  if (activeTocId === "rounded") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-8">
        <Button rounded variant="default">Rounded Default</Button>
        <Button rounded variant="outline">Rounded Outline</Button>
        <Button rounded variant="glow"><Sparkles className="w-4 h-4" /> Rounded Glow</Button>
      </div>
    );
  }

  if (activeTocId === "share") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Button variant="share" size="md" onShare={(p) => setSharedPlatform(p)} />
          <Button variant="share" size="lg" onShare={(p) => setSharedPlatform(p)} />
        </div>
        <span className="text-xs text-muted-foreground font-mono">{sharedPlatform ? `Shared to ${sharedPlatform.toUpperCase()}!` : "Click 'SHARE' to expand social platforms"}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Button variant="default" size="md">Interactive Button</Button>
      <span className="text-xs text-muted-foreground font-mono">Tap or hover to experience spring dynamic physics</span>
    </div>
  );
}
