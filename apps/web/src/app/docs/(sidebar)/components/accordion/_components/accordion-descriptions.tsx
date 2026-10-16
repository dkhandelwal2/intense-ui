import React from "react";

export const ACCORDION_DESCRIPTIONS: Record<string, React.ReactNode> = {
  basic: (
    <>
      A simple, single-item accordion. Uses the{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        type=&quot;single&quot;
      </code>{" "}
      prop on the root component to ensure only one item can be expanded at a time.
    </>
  ),
  multiple: (
    <>
      Allows multiple items to be expanded simultaneously by passing the{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        type=&quot;multiple&quot;
      </code>{" "}
      prop to the root accordion.
    </>
  ),
  disabled: (
    <>
      Prevents interaction with specific items. Apply the{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        disabled
      </code>{" "}
      prop directly to an{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        &lt;AccordionItem&gt;
      </code>{" "}
      to gray it out and disable clicks.
    </>
  ),
  card: (
    <>
      Styles the accordion items as distinct elevated cards. Achieve this by passing a custom{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        className
      </code>{" "}
      with borders and padding to each{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        &lt;AccordionItem&gt;
      </code>
      .
    </>
  ),
  border: (
    <>
      Adds full borders around the accordion items. Simply pass a custom{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        className=&quot;border&quot;
      </code>{" "}
      to the root or individual items.
    </>
  ),
  rtl: (
    <>
      Supports Right-To-Left text direction layouts automatically when placed inside a container with{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        dir=&quot;rtl&quot;
      </code>
      .
    </>
  ),
  "without-border": (
    <>
      Removes the default bottom borders for a clean look. Pass the{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        hideBorder
      </code>{" "}
      prop directly to the{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        &lt;AccordionItem&gt;
      </code>{" "}
      component.
    </>
  ),
  "without-icon": (
    <>
      Hides the chevron indicator for custom trigger designs. Use the{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        hideIcon
      </code>{" "}
      prop on the{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        &lt;AccordionTrigger&gt;
      </code>{" "}
      component.
    </>
  ),
  "with-onclick": (
    <>
      Fires custom events when a trigger is clicked. Pass a standard{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        onClick
      </code>{" "}
      handler to the{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        &lt;AccordionTrigger&gt;
      </code>
      .
    </>
  ),
  "expanded-default": (
    <>
      Automatically opens specified items on initial render by passing the{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        defaultValue
      </code>{" "}
      prop to the root{" "}
      <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">
        &lt;Accordion&gt;
      </code>{" "}
      component.
    </>
  ),
  customization: (
    <>Playground to test all available interactive properties dynamically.</>
  ),
};

export function getAccordionDescription(id: string): React.ReactNode {
  return ACCORDION_DESCRIPTIONS[id] || <>An accordion example.</>;
}
