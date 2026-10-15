"use client";

import Link from "next/link";
import { Terminal, AlertCircle, CheckCircle2, Sparkles, ArrowRight, Layers, FileCode } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function InstallationPage() {
  return (
    <div className="max-w-4xl py-10 px-4 md:px-8 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 border-b border-black/5 dark:border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quickstart Guide</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Installation & Setup
        </h1>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Intense UI distributes components directly via the official <strong>shadcn CLI</strong> registry. You own the code — it drops directly into your repository with zero lock-in.
        </p>
      </div>

      {/* Critical First-Time Callout */}
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-3">
        <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-semibold text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>First Time Installing in a Project?</span>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          The <code className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-mono text-xs">shadcn add</code> command requires your project to have a <code className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-mono text-xs">components.json</code> file. If you haven&apos;t run <code className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-mono text-xs">shadcn init</code> yet, follow <strong>Step 1</strong> below before adding components.
        </p>
      </div>

      {/* Step 1: Project Initialization */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--theme-primary)] text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Initialize shadcn in your project (One-time setup)
          </h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 pl-11">
          Run the initialization command in your project root. This sets up Tailwind CSS, configures your <code className="text-xs font-mono bg-zinc-100 dark:bg-white/10 px-1 py-0.5 rounded">@/*</code> path alias, and creates <code className="text-xs font-mono bg-zinc-100 dark:bg-white/10 px-1 py-0.5 rounded">components.json</code>:
        </p>

        <div className="pl-11">
          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="mb-3 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5">
              {["npm", "pnpm", "yarn", "bun"].map((pm) => (
                <TabsTrigger
                  key={pm}
                  value={pm}
                  className="text-xs data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white"
                >
                  {pm}
                </TabsTrigger>
              ))}
            </TabsList>
            {[
              { pm: "npm", cmd: "npx shadcn@latest init" },
              { pm: "pnpm", cmd: "pnpm dlx shadcn@latest init" },
              { pm: "yarn", cmd: "npx shadcn@latest init" },
              { pm: "bun", cmd: "bunx --bun shadcn@latest init" },
            ].map(({ pm, cmd }) => (
              <TabsContent key={pm} value={pm}>
                <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5">
                  <CodeBlock code={cmd} language="bash" />
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-3.5 text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong>CLI Prompts:</strong> You can select default settings (Style: New York, Base Color: Slate, CSS Variables: Yes). This only needs to be run <em>once</em> per project repository.
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Add Component */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--theme-primary)] text-white font-bold text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Add Intense UI components
          </h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 pl-11">
          Add any component directly from our GitHub registry. The CLI will automatically download the code into your <code className="text-xs font-mono bg-zinc-100 dark:bg-white/10 px-1 py-0.5 rounded">components/ui/</code> folder and install all required animation dependencies (like <code className="text-xs font-mono bg-zinc-100 dark:bg-white/10 px-1 py-0.5 rounded">framer-motion</code> and <code className="text-xs font-mono bg-zinc-100 dark:bg-white/10 px-1 py-0.5 rounded">lucide-react</code>):
        </p>

        <div className="pl-11 space-y-4">
          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="mb-3 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5">
              {["npm", "pnpm", "yarn", "bun"].map((pm) => (
                <TabsTrigger
                  key={pm}
                  value={pm}
                  className="text-xs data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white"
                >
                  {pm}
                </TabsTrigger>
              ))}
            </TabsList>
            {[
              { pm: "npm", cmd: "npx shadcn@latest add dkhandelwal2/intense-ui/accordion" },
              { pm: "pnpm", cmd: "pnpm dlx shadcn@latest add dkhandelwal2/intense-ui/accordion" },
              { pm: "yarn", cmd: "npx shadcn@latest add dkhandelwal2/intense-ui/accordion" },
              { pm: "bun", cmd: "bunx --bun shadcn@latest add dkhandelwal2/intense-ui/accordion" },
            ].map(({ pm, cmd }) => (
              <TabsContent key={pm} value={pm}>
                <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5">
                  <CodeBlock code={cmd} language="bash" />
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Replace <code className="font-mono text-zinc-700 dark:text-zinc-300">accordion</code> with any available component: <code className="font-mono text-zinc-700 dark:text-zinc-300">switch</code>, <code className="font-mono text-zinc-700 dark:text-zinc-300">slider</code>, <code className="font-mono text-zinc-700 dark:text-zinc-300">tooltip</code>, or <code className="font-mono text-zinc-700 dark:text-zinc-300">animated-button</code>.
          </p>
        </div>
      </div>

      {/* Step 3: Use the Component */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--theme-primary)] text-white font-bold text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Import and use in your application
          </h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 pl-11">
          Once installed, import the component anywhere in your React or Next.js app:
        </p>

        <div className="pl-11">
          <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5">
            <CodeBlock
              filename="src/app/page.tsx"
              language="tsx"
              code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MyPage() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes! Crafted with smooth Framer Motion spring physics.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`}
            />
          </div>
        </div>
      </div>

      {/* Troubleshooting Section */}
      <div className="border-t border-black/5 dark:border-white/10 pt-10 space-y-6">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
          <Layers className="w-5 h-5 text-[var(--theme-primary)]" />
          <h2>Common Issues & Troubleshooting</h2>
        </div>

        <div className="grid gap-4">
          {/* Issue 1 */}
          <div className="rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] p-5 space-y-2">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Error: &quot;You need to create a components.json file to add components&quot;
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong>Cause:</strong> You ran <code className="font-mono bg-zinc-200/50 dark:bg-white/10 px-1 py-0.5 rounded">shadcn add</code> before initializing shadcn in the project.<br />
              <strong>Fix:</strong> Run <code className="font-mono text-[var(--theme-primary)] font-semibold">npx shadcn@latest init</code> first to generate your configuration file.
            </p>
          </div>

          {/* Issue 2 */}
          <div className="rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] p-5 space-y-2">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              TypeScript Error: &quot;Cannot find module &apos;@/lib/utils&apos;&quot;
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong>Cause:</strong> Your project is missing the <code className="font-mono bg-zinc-200/50 dark:bg-white/10 px-1 py-0.5 rounded">@/*</code> path alias in TypeScript.<br />
              <strong>Fix:</strong> Add path mapping in your <code className="font-mono">tsconfig.json</code> under <code className="font-mono">compilerOptions</code>:
            </p>
            <div className="pt-1">
              <CodeBlock
                filename="tsconfig.json"
                language="json"
                code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
              />
            </div>
          </div>

          {/* Issue 3 */}
          <div className="rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] p-5 space-y-2">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Missing Peer Dependencies (<code className="font-mono">framer-motion</code>)
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The shadcn CLI installs required dependencies automatically. If you ever install components manually, simply run:
            </p>
            <div className="pt-1">
              <CodeBlock
                language="bash"
                code="npm install framer-motion lucide-react clsx tailwind-merge"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Explore Components CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-[var(--theme-primary)]/10 via-[var(--theme-primary)]/5 to-transparent border border-[var(--theme-primary)]/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Ready to build?</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Explore our curated library of interactive, high-performance UI components.
          </p>
        </div>
        <Link
          href="/docs/components"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--theme-primary)] text-white text-xs font-semibold hover:opacity-90 transition-opacity shrink-0"
        >
          <span>Browse Components</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
