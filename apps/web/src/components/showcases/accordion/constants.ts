import { AccordionExampleItem } from "./types";

export const ACCORDION_EXAMPLES: AccordionExampleItem[] = [
  {
    id: "basic",
    label: "Basic",
    description:
      "Single collapsible panel expanding smoothly with spring physics and auto-collapse.",
    spec: {
      title: "Single Expand Architecture",
      badge: "WAI-ARIA Pattern",
      summary:
        'Enforces a single active accordion panel at any given time. Uses the type="single" configuration. Expanding another panel automatically triggers a fluid spring collapse on the previously opened section.',
      specs: [
        { label: "Type Mode", value: 'type="single"' },
        { label: "Collapsible", value: "collapsible={true}" },
        { label: "ARIA States", value: "aria-expanded, aria-controls" },
        { label: "Keyboard Nav", value: "Enter / Space / ArrowUp & Down" },
      ],
      tip: "Ideal for compact FAQ lists or wizards where users should focus on one section at a time.",
    },
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BasicAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  },
  {
    id: "multiple",
    label: "Multiple",
    description:
      "Multi-panel expansion allowing multiple content sections to remain open simultaneously.",
    spec: {
      title: "Multi-Panel Expansion",
      badge: "Concurrent Mode",
      summary:
        'Allows arbitrary combinations of panels to open and close independently without affecting adjacent items by passing type="multiple" to the root accordion.',
      specs: [
        { label: "Type Mode", value: 'type="multiple"' },
        { label: "State Type", value: "string[] array of active keys" },
        { label: "Animation", value: "Framer Motion height: auto" },
        { label: "Spring Physics", value: "stiffness: 300, damping: 28" },
      ],
      tip: "Great for filter panels or settings where users need to compare information across multiple sections.",
    },
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MultipleAccordion() {
  return (
    <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  },
  {
    id: "disabled",
    label: "Disabled",
    description:
      "Non-interactive disabled state with visual dimming and pointer event suppression.",
    spec: {
      title: "Disabled State Guardrails",
      badge: "State Lock",
      summary:
        "Locks trigger interaction while retaining semantic ARIA announcement. Apply the disabled prop directly to an <AccordionItem> to gray it out and disable clicks.",
      specs: [
        { label: "Target Prop", value: "<AccordionItem disabled>" },
        { label: "Pointer Events", value: "none (cursor not-allowed)" },
        { label: "Visual Opacity", value: "50% muted styling" },
        { label: "ARIA Disabled", value: 'aria-disabled="true"' },
      ],
      tip: "Always communicate to the user via tooltip or helper text why an item is disabled.",
    },
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DisabledAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Is it styled? (Disabled)</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  },
  {
    id: "card",
    label: "Card",
    description:
      "Card surface layout with independent elevation frames and dedicated padding.",
    spec: {
      title: "Elevated Card Containers",
      badge: "Modular Cards",
      summary:
        "Styles each accordion item as an independent elevated card container. Pass custom classes with border and background styling to each <AccordionItem>.",
      specs: [
        { label: "Container Style", value: "Elevated rounded-2xl cards" },
        { label: "Item Spacing", value: "gap-3 independent items" },
        { label: "Border Radius", value: "rounded-2xl (16px)" },
        { label: "Shadow", value: "shadow-xs soft elevation" },
      ],
      tip: "Use card style when accordion items represent distinct entities like pricing tiers or order summaries.",
    },
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CardAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      <AccordionItem value="item-1" className="border px-4 py-2 rounded-lg bg-card text-card-foreground shadow-sm">
        <AccordionTrigger className="hover:no-underline">Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border px-4 py-2 rounded-lg bg-card text-card-foreground shadow-sm">
        <AccordionTrigger className="hover:no-underline">Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="border px-4 py-2 rounded-lg bg-card text-card-foreground shadow-sm">
        <AccordionTrigger className="hover:no-underline">Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  },
  {
    id: "border",
    label: "Border",
    description:
      "Enclosed border outline delineating container bounds and separating panel groups.",
    spec: {
      title: "Bounded Frame Styling",
      badge: "Structural Frame",
      summary:
        'Adds complete boundary borders around the accordion items. Pass a custom className="border" to the root or individual items for clear visual delineation.',
      specs: [
        { label: "Frame Style", value: "Enclosed border outlines" },
        { label: "Dividers", value: "divide-y divide-border/60" },
        { label: "Border Radius", value: "rounded-xl (12px)" },
        { label: "Hairlines", value: "1px crisp boundary" },
      ],
      tip: "Pair with minimalist backgrounds to provide visual containment on light surfaces.",
    },
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BorderAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full border rounded-md px-4">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="border-b-0">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  },
  {
    id: "rtl",
    label: "RTL",
    description:
      "Native Right-to-Left writing mode support with mirrored chevrons and aligned text.",
    spec: {
      title: "Right-To-Left Bi-Directional Specs",
      badge: "Internationalization",
      summary:
        'Supports Right-To-Left text direction layouts automatically when placed inside a container with dir="rtl". Chevrons mirror cleanly to the opposite edge.',
      specs: [
        { label: "Direction Prop", value: 'dir="rtl"' },
        { label: "Trigger Layout", value: "flex-row-reverse alignment" },
        { label: "Icon Rotation", value: "Mirrored 180° chevron" },
        { label: "Text Direction", value: "RTL paragraph justification" },
      ],
      tip: "Wrap your accordion in a container with dir='rtl' or configure document.dir for seamless i18n.",
    },
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RtlAccordion() {
  return (
    <div dir="rtl" className="w-full text-right">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>هل يمكن الوصول إليه؟</AccordionTrigger>
          <AccordionContent>
            نعم. يتوافق مع نمط تصميم WAI-ARIA.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>هل هو مصمم؟</AccordionTrigger>
          <AccordionContent>
            نعم. يأتي بأنماط افتراضية تطابق جمالية المكونات الأخرى.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>هل هو متحرك؟</AccordionTrigger>
          <AccordionContent>
            نعم. هو متحرك بشكل افتراضي، ولكن يمكنك تعطيله إذا كنت تفضل ذلك.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}`,
  },
  {
    id: "without-border",
    label: "No Border",
    description:
      "Clean borderless presentation for flat, minimalist interface integration.",
    spec: {
      title: "Borderless Minimalist Specs",
      badge: "Flat Layout",
      summary:
        "Strips away default borders and dividers for a flat, minimalist look. Pass the hideBorder prop directly to the <AccordionItem> component.",
      specs: [
        { label: "Item Prop", value: "<AccordionItem hideBorder>" },
        { label: "Visual Style", value: "Ultra-light flat style" },
        { label: "Dividers", value: "Border none" },
        { label: "Use Case", value: "Embedded sidebars / documentation" },
      ],
      tip: "Best suited for editorial pages or sidebars where heavy borders add visual clutter.",
    },
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function WithoutBorderAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" hideBorder>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" hideBorder>
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  },
  {
    id: "without-icon",
    label: "No Icon",
    description:
      "Streamlined header trigger without chevrons for custom interactive patterns.",
    spec: {
      title: "Custom Trigger Glyph Specs",
      badge: "Clean Trigger",
      summary:
        "Suppresses the default chevron indicator for custom trigger designs. Use the hideIcon prop on the <AccordionTrigger> component.",
      specs: [
        { label: "Trigger Prop", value: "<AccordionTrigger hideIcon>" },
        { label: "Chevron Status", value: "Hidden (display: none)" },
        { label: "Slot Flexibility", value: "Accepts trailing badges or actions" },
        { label: "Interaction", value: "Full header still clickable" },
      ],
      tip: "Ensure the heading text or custom badge still hints at clickability if omitting the chevron.",
    },
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function WithoutIconAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger hideIcon>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger hideIcon>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  },
  {
    id: "with-onclick",
    label: "On-Click",
    description:
      "Trigger callback listener firing telemetry, analytics, or custom event handlers.",
    spec: {
      title: "Interactive Callback Specs",
      badge: "Event Telemetry",
      summary:
        "Fires custom events when a trigger is clicked. Pass a standard onClick handler to the <AccordionTrigger> to track telemetry or update parent state.",
      specs: [
        { label: "Handler Prop", value: "onClick={(e) => void}" },
        { label: "Execution", value: "Synchronous callback invocation" },
        { label: "Default Action", value: "Non-blocking (item still expands)" },
        { label: "Event Object", value: "SyntheticMouseEvent<HTMLButtonElement>" },
      ],
      tip: "Use this to fire Google Analytics or PostHog tracking events when users inspect key disclosures.",
    },
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function OnClickAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger onClick={() => alert("Item 1 clicked!")}>
          Click to see alert
        </AccordionTrigger>
        <AccordionContent>
          You triggered an onClick event before this expanded!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger onClick={() => console.log("Item 2 clicked!")}>
          Click to log to console
        </AccordionTrigger>
        <AccordionContent>
          Check your developer console for the logged message.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  },
  {
    id: "expanded-default",
    label: "Expanded",
    description:
      "Pre-opened panel on initial render to highlight high-priority default content.",
    spec: {
      title: "Default Open Value Specs",
      badge: "Pre-Expanded",
      summary:
        "Automatically opens specified items on initial render by passing the defaultValue prop to the root <Accordion> component.",
      specs: [
        { label: "Root Prop", value: 'defaultValue="item-1"' },
        { label: "Mount State", value: "Expanded on initial paint" },
        { label: "Animation", value: "Immediate without mount flicker" },
        { label: "SSR Support", value: "Fully server-rendered in open state" },
      ],
      tip: "Keep the most frequently needed item default-expanded to reduce friction for first-time visitors.",
    },
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ExpandedDefaultAccordion() {
  return (
    <Accordion type="single" collapsible defaultValue="item-2" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          This item is expanded automatically on initial render because it is set as the defaultValue!
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  },
];

export const MANUAL_INSTALL_CODE = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MyAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;

export const ACCORDION_API_REFERENCE = [
  {
    prop: "type",
    type: '"single" | "multiple"',
    defaultValue: '"single"',
    description: "Determines whether one or multiple items can be opened at the same time.",
  },
  {
    prop: "value",
    type: "string | string[]",
    defaultValue: "-",
    description: "The controlled value of the item(s) to expand.",
  },
  {
    prop: "defaultValue",
    type: "string | string[]",
    defaultValue: "-",
    description: "The value of the item(s) to expand by default when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value: string | string[]) => void",
    defaultValue: "-",
    description: "Event handler called when the expanded state changes.",
  },
  {
    prop: "collapsible",
    type: "boolean",
    defaultValue: "true",
    description: "When type is single, allows closing content when clicking trigger for an open item.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes to apply to the accordion container.",
  },
];

export const ACCORDION_ITEM_API_REFERENCE = [
  {
    prop: "hideBorder",
    type: "boolean",
    defaultValue: "false",
    description: "Hide the bottom border of the accordion item."
  },
  {
    prop: "borderWidth",
    type: "string | number",
    defaultValue: "-",
    description: "Set explicit border width."
  },
  {
    prop: "borderRadius",
    type: "string | number",
    defaultValue: "-",
    description: "Set explicit border radius."
  },
  {
    prop: "borderColor",
    type: "string",
    defaultValue: "-",
    description: "Set explicit border color."
  },
  {
    prop: "value",
    type: "string",
    defaultValue: "-",
    description: "A unique value for the item. Required.",
  },
  {
    prop: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, prevents the user from interacting with the accordion item.",
  },
];

export const DEFAULT_ITEMS = [
  {
    value: "item-1",
    trigger: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-2",
    trigger: "Is it styled?",
    content: "Yes. It comes with default styles that matches the other components' aesthetic.",
  },
  {
    value: "item-3",
    trigger: "Is it animated?",
    content: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export const RTL_ITEMS = [
  {
    value: "item-1",
    trigger: "هل يمكن الوصول إليه؟",
    content: "نعم. يتوافق مع نمط تصميم WAI-ARIA.",
  },
  {
    value: "item-2",
    trigger: "هل هو مصمم؟",
    content: "نعم. يأتي بأنماط افتراضية تطابق جمالية المكونات الأخرى.",
  },
  {
    value: "item-3",
    trigger: "هل هو متحرك؟",
    content: "نعم. هو متحرك بشكل افتراضي، ولكن يمكنك تعطيله إذا كنت تفضل ذلك.",
  },
];

export const ACCORDION_TRIGGER_API_REFERENCE = [
  {
    prop: "hideIcon",
    type: "boolean",
    defaultValue: "false",
    description: "Hide the accordion chevron icon."
  },
  {
    prop: "onClick",
    type: "React.MouseEventHandler<HTMLButtonElement>",
    defaultValue: "-",
    description: "Callback function when the trigger is clicked."
  },
  {
    prop: "size",
    type: "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"",
    defaultValue: "\"md\"",
    description: "Size preset for the trigger button."
  },
  {
    prop: "weight",
    type: "\"default\" | \"bold\"",
    defaultValue: "\"default\"",
    description: "Font weight preset for the trigger text."
  },
  {
    prop: "headingUnderline",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the heading should be permanently underlined."
  },
  {
    prop: "headingColor",
    type: "string",
    defaultValue: "-",
    description: "Custom explicit text color for the heading."
  },
  {
    prop: "icon",
    type: "ReactNode",
    defaultValue: "<ChevronDown />",
    description: "Custom icon to display instead of the default ChevronDown.",
  },
  {
    prop: "iconPosition",
    type: '"left" | "right"',
    defaultValue: '"right"',
    description: "Position of the icon relative to the trigger text.",
  },
  {
    prop: "iconColor",
    type: "string",
    defaultValue: "-",
    description: "Custom explicit color for the chevron or custom icon.",
  },
  {
    prop: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, disables interactions and applies cursor-not-allowed.",
  },
];

export const ACCORDION_CONTENT_API_REFERENCE = [
  {
    prop: "contentColor",
    type: "string",
    defaultValue: "-",
    description: "Custom explicit text color for the content."
  },
  {
    prop: "value",
    type: "string",
    defaultValue: "-",
    description: "The item value this content belongs to. Managed automatically.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Additional CSS classes for the content wrapper.",
  }
];


export const USAGE_CODE = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;
