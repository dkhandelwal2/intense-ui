"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface QuickInstallProps {
  command: string;
}

export function QuickInstall({ command }: QuickInstallProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  const onCopy = React.useCallback(() => {
    navigator.clipboard.writeText(command);
    setHasCopied(true);
    toast.success("Command copied to clipboard!");
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [command]);

  return (
    <div className="flex flex-col gap-2 shrink-0 md:mt-2">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider hidden md:block">Install component</p>
      <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-mono border">
        <span className="text-muted-foreground truncate max-w-[200px] sm:max-w-[300px]">npx shadcn@latest add ...</span>
        <button 
          onClick={onCopy}
          className="ml-auto flex h-6 w-6 items-center justify-center rounded-md hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
          title="Copy install command"
        >
          {hasCopied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
        </button>
      </div>
    </div>
  );
}
