"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { componentsConfig } from "@/config/components";
import { componentPreviews } from "@/components/component-previews";

export default function ComponentsPage() {
  const enabledComponents = componentsConfig.filter((c) => c.enabled);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10 md:py-16">
      <div className="flex flex-col space-y-4 max-w-[800px] mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Components</h1>
        <p className="text-lg text-muted-foreground">
          A collection of beautifully designed, animated React components. 
          Ready to be copied and pasted into your projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enabledComponents.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50"
          >
            {/* Preview Area */}
            <div className="flex h-[200px] w-full items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 p-6 border-b">
              {componentPreviews[component.name] || (
                <div className="text-sm text-muted-foreground">No preview available</div>
              )}
            </div>
            
            {/* Component Info */}
            <div className="p-5">
              <h3 className="font-semibold text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                {component.name}
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {component.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
