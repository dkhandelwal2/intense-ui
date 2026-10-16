"use client";

import { ComponentPageLayout } from "@/components/layout/component-page-layout";
import { AccordionExamples } from "./accordion-examples";
import { AccordionIcons } from "@/components/icons";
import { PropsTable } from "@/components/docs";
import {
  MANUAL_INSTALL_CODE,
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
    <PropsTable
      groups={[
        { title: "Accordion", props: ACCORDION_API_REFERENCE },
        { title: "AccordionItem", props: ACCORDION_ITEM_API_REFERENCE },
        { title: "AccordionTrigger", props: ACCORDION_TRIGGER_API_REFERENCE },
        { title: "AccordionContent", props: ACCORDION_CONTENT_API_REFERENCE },
      ]}
    />
  );



return (
    <ComponentPageLayout
      title="Accordion"
      description={
        <>
          A beautifully animated, accessible accordion component built with <strong className="font-medium text-zinc-900 dark:text-zinc-100">Framer Motion</strong>. 
          Perfect for FAQs, collapsible menus, and reducing vertical screen clutter in modern React and Next.js applications. Fully typed, keyboard navigable, and endlessly customizable.
        </>
      }
      dependencies={[
        { name: "framer-motion", command: "npm install framer-motion" },
        { name: "lucide-react", command: "npm install lucide-react" },
        { name: "clsx", command: "npm install clsx" },
        { name: "tailwind-merge", command: "npm install tailwind-merge" }
      ]}
      propsTable={propsTable}
      tocItems={tocItems}
      codeContent={MANUAL_INSTALL_CODE}
      codeContentJs={MANUAL_INSTALL_CODE.replace(/: React\.ReactNode/g, "").replace(/interface [a-zA-Z]+ {[^}]+}/g, "")}
      codes={codes}
      codesJs={codesJs}
      slug="accordion"
      usageCode={USAGE_CODE}
    >
      <AccordionExamples />
    </ComponentPageLayout>
  );
}
