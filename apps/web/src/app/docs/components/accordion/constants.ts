export const ACCORDION_EXAMPLES = [
  {
    id: "basic",
    label: "Basic",
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
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MultipleAccordion() {
  return (
    <Accordion type="multiple" className="w-full">
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
  {
    id: "customization",
    label: "Customization",
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star } from "lucide-react";

export default function CustomizationAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      <AccordionItem 
        value="item-1" 
        borderWidth="2px" 
        borderColor="var(--theme-primary)" 
        borderRadius="12px"
        className="px-4 bg-background"
      >
        <AccordionTrigger 
          size="lg" 
          weight="bold" 
          icon={<Star className="h-5 w-5 text-[var(--theme-primary)]" />} 
          iconPosition="left"
          headingUnderline={true}
          headingColor="var(--theme-primary)"
        >
          Custom Styled Item
        </AccordionTrigger>
        <AccordionContent contentColor="var(--theme-primary)">
          This item uses custom props for borders, large text, bold weight, a custom left-aligned icon, heading color, and content color.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  }
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

export const PACKAGE_MANAGERS = [
  { name: "npm", command: "npm install framer-motion lucide-react" },
  { name: "pnpm", command: "pnpm add framer-motion lucide-react" },
  { name: "yarn", command: "yarn add framer-motion lucide-react" },
  { name: "bun", command: "bun add framer-motion lucide-react" },
];

export const ACCORDION_API_REFERENCE = [
  {
    prop: "type",
    type: '"single" | "multiple"',
    defaultValue: '"single"',
    description: "Determines whether one or multiple items can be opened at the same time.",
  },
  {
    prop: "defaultValue",
    type: "string | string[]",
    defaultValue: "-",
    description: "The value of the item(s) to expand by default.",
  },
  {
    prop: "collapsible",
    type: "boolean",
    defaultValue: "false",
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
