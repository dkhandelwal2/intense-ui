"use client";

import { ComponentPageLayout } from "@/components/layout/component-page-layout";
import { AccordionExamples } from "./accordion-examples";
import { AccordionIcons } from "@/components/ui/accordion-icons";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MANUAL_INSTALL_CODE,
  PACKAGE_MANAGERS,
  ACCORDION_API_REFERENCE,
  ACCORDION_ITEM_API_REFERENCE,
  ACCORDION_TRIGGER_API_REFERENCE,
  ACCORDION_CONTENT_API_REFERENCE,
  ACCORDION_EXAMPLES,
  USAGE_CODE
} from "./constants";

export default function AccordionPage() {
  const tocItems = ACCORDION_EXAMPLES.map(ex => { const Icon = AccordionIcons[ex.id as keyof typeof AccordionIcons] || AccordionIcons.basic; return { id: ex.id, label: ex.label, icon: <Icon /> }; });
  const codes = ACCORDION_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>);

  const codesJs = ACCORDION_EXAMPLES.reduce((acc, ex) => {
    // Simple basic type stripping for JS representation
    acc[ex.id] = ex.code
      .replace(/: React\.ReactNode/g, "")
      .replace(/interface [a-zA-Z]+ {[^}]+}/g, "")
      .replace(/type [a-zA-Z]+ = [^;]+;/g, "");
    return acc;
  }, {} as Record<string, string>);

  const propsTable = (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-300">Accordion</h4>
        {ACCORDION_API_REFERENCE.map(api => (
          <div key={api.prop} className="flex flex-col gap-1 border-b border-black/5 dark:border-white/5 pb-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-primary">{api.prop}</span>
              <span className="font-mono text-[10px] text-zinc-500">{api.type}</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{api.description}</p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-300">AccordionItem</h4>
        {ACCORDION_ITEM_API_REFERENCE.map(api => (
          <div key={api.prop} className="flex flex-col gap-1 border-b border-black/5 dark:border-white/5 pb-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-primary">{api.prop}</span>
              <span className="font-mono text-[10px] text-zinc-500">{api.type}</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{api.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const installContent = (
    <div className="flex flex-col gap-8 mt-2">
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="cli" className="data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white">CLI</TabsTrigger>
            <TabsTrigger value="manual" className="data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white">Manual</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cli" className="space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Run the following command to securely add the component to your project:</p>
            <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-zinc-950 dark:bg-[#0c0c0c]">
              <CodeBlock code="npx shadcn@latest add dkhandelwal2/intense-ui/accordion" language="bash" />
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4 mt-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">1. Install the required dependencies:</p>
            <Tabs defaultValue="npm" className="w-full">
              <TabsList className="mb-4 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5">
                {PACKAGE_MANAGERS.map(pm => (
                  <TabsTrigger key={pm.name} value={pm.name} className="text-xs data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white">{pm.name}</TabsTrigger>
                ))}
              </TabsList>
              {PACKAGE_MANAGERS.map(pm => (
                <TabsContent key={pm.name} value={pm.name}>
                  <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-zinc-950 dark:bg-[#0c0c0c]">
                    <CodeBlock code={pm.command} language="bash" />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-6">2. Copy and paste the source code into your project:</p>
            <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-zinc-950 dark:bg-[#0c0c0c]">
              <CodeBlock code={MANUAL_INSTALL_CODE} language="tsx" />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex flex-col gap-4 border-t border-black/5 dark:border-white/5 pt-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-300">Usage</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Once installed, import and use the component:</p>
        <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-zinc-950 dark:bg-[#0c0c0c]">
          <CodeBlock code={USAGE_CODE} language="tsx" />
        </div>
      </div>
    </div>
  );

  return (
    <ComponentPageLayout
      title="Accordion"
      description={
        <>
          A beautifully animated, accessible accordion component built with <strong className="font-medium text-zinc-900 dark:text-zinc-100">Framer Motion</strong>. 
          Perfect for FAQs, collapsible menus, and reducing vertical screen clutter in modern React and Next.js applications. 
          Fully typed, keyboard navigable, and endlessly customizable.
        </>
      }
      dependencies={[
        { name: "framer-motion", command: "" },
        { name: "lucide-react", command: "" }
      ]}
      propsTable={propsTable}
      tocItems={tocItems}
      codeContent={MANUAL_INSTALL_CODE}
      codeContentJs={MANUAL_INSTALL_CODE.replace(/: React\.ReactNode/g, "").replace(/interface [a-zA-Z]+ {[^}]+}/g, "")}
      codes={codes}
      codesJs={codesJs}
      installContent={installContent}
    >
      <AccordionExamples />
    </ComponentPageLayout>
  );
}
