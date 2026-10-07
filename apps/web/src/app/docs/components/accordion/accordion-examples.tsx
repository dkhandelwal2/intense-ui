"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CodeBlock } from "@/components/ui/code-block";
import { motion, AnimatePresence, useAnimation, PanInfo } from "framer-motion";
import { Code, ArrowDown, X, TerminalSquare, Copy } from "lucide-react";
import { AccordionIcons } from "@/components/ui/accordion-icons";
import { StackedCardsContainer, StackedCard } from "@/components/ui/stacked-card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../../../../../packages/registry/src/components/accordion";
import { ACCORDION_EXAMPLES, RTL_ITEMS, DEFAULT_ITEMS } from "./constants";
import { PALETTE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Slider } from "../../../../../../../packages/registry/src/components/slider";
import { ColorPalette } from "../../../../../../../packages/registry/src/components/color-palette";
import { Switch } from "../../../../../../../packages/registry/src/components/switch";
import { CustomProps } from "./types";

const renderExample = (id: string, customProps: CustomProps = {}) => {
  const isRtl = id === "rtl";
  const items = isRtl ? RTL_ITEMS : DEFAULT_ITEMS;

  const getAccordionProps = () => {
    switch (id) {
      case "multiple": return { type: "multiple" as const, defaultValue: ["item-1", "item-2"], className: "w-full" };
      case "card": return { type: "single" as const, collapsible: true, className: "w-full space-y-4" };
      case "customization": return { type: "single" as const, collapsible: true, className: "w-full space-y-2", defaultValue: customProps.isDefaultExpanded ? "item-2" : undefined, key: `accordion-${customProps.isDefaultExpanded}` };
      case "border": return { type: "single" as const, collapsible: true, className: "w-full border rounded-md px-4" };
      case "expanded-default": return { type: "single" as const, collapsible: true, defaultValue: "item-2", className: "w-full" };
      default: return { type: "single" as const, collapsible: true, className: "w-full" };
    }
  };

  const getItemProps = (index: number) => {
    if (id === "disabled" && index === 1) return { disabled: true };
    if (id === "card") return { className: "border px-4 py-2 rounded-lg bg-card text-card-foreground shadow-sm" };
    if (id === "customization") return {
      borderWidth: customProps.borderWidth !== undefined ? `${customProps.borderWidth}px` : undefined,
      borderColor: customProps.borderColor,
      borderRadius: customProps.borderRadius !== undefined ? `${customProps.borderRadius}px` : undefined,
      hideBorder: customProps.hideBorder,
      className: "px-4 bg-background"
    };
    if (id === "border" && index === 2) return { className: "border-b-0" };
    if (id === "without-border") return { hideBorder: true };
    return {};
  };

  const getTriggerProps = (index: number) => {
    if (id === "card") return { className: "hover:no-underline" };
    if (id === "without-icon") return { hideIcon: true };
    if (id === "with-onclick") return {
      onClick: () => {
        if (index === 0) alert("Item 1 clicked!");
        else if (index === 1) console.log("Item 2 clicked!");
      }
    };
    if (id === "customization") {
      const iconSize = { xs: "h-3 w-3", sm: "h-4 w-4", md: "h-4 w-4", lg: "h-5 w-5", xl: "h-6 w-6" }[customProps.size || "md"];
      return {
        size: customProps.size,
        weight: customProps.weight,
        iconPosition: customProps.iconPosition,
        icon: customProps.iconType === "Custom" ? <ArrowDown className={cn(iconSize, "text-[var(--theme-primary)]")} /> : undefined,
        hideIcon: customProps.hideIcon,
        headingUnderline: customProps.headingUnderline,
        headingColor: customProps.headingColor,
        onClick: customProps.hasOnClick ? () => alert(`Interactive onClick triggered for item ${index + 1}!`) : undefined,
      };
    }
    return {};
  };

  const accordionProps = getAccordionProps();
  const { key: accordionKey, ...restAccordionProps } = accordionProps as any;

  const content = (
    <Accordion key={accordionKey} {...restAccordionProps}>
      {items.map((item, i) => (
        <AccordionItem key={item.value} value={item.value} {...getItemProps(i)}>
          <AccordionTrigger {...getTriggerProps(i)}>
            {id === "disabled" && i === 1 ? "Is it styled? (Disabled)" : item.trigger}
          </AccordionTrigger>
          <AccordionContent contentColor={id === "customization" ? customProps.contentColor : undefined}>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return isRtl ? (
    <div dir="rtl" className="w-full text-right">
      {content}
    </div>
  ) : (
    content
  );
};

// Dual-mode Code Viewer: Bottom Sheet on Mobile, Right Sidebar on Desktop
function CodeViewer({
  isOpen,
  onClose,
  title,
  codeTsx,
  codeJs,
  filenameBase,
  isDesktop
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  codeTsx: string;
  codeJs: string;
  filenameBase: string;
  isDesktop: boolean;
}) {
  const [codeLang, setCodeLang] = useState<"tsx" | "js">("tsx");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();

  // Reset animation when opened
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      controls.start({ y: 0, opacity: 1 });
      if (!isDesktop) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, isDesktop, controls]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeLang === "tsx" ? codeTsx : codeJs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    // If dragged down by more than 100px or fast swipe down, close it
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    } else {
      // Snap back
      controls.start({ y: 0 });
    }
  };

  const PanelContent = (
    <>
      {/* Mobile drag handle */}
      {!isDesktop && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full cursor-grab active:cursor-grabbing" />
      )}

      <div className={cn("flex items-center justify-between px-6 py-5 border-b border-white/5", !isDesktop && "mt-4")}>
        <h3 className="font-semibold text-orange-500 tracking-tight text-sm flex items-center gap-2">
          <TerminalSquare className="w-4 h-4" />
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-[11px] font-medium rounded-full border border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
          >
            {copied ? "Copied!" : "Copy code"}
          </button>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 mx-1">
            <button
              onClick={() => setCodeLang("tsx")}
              className={cn(
                "px-2.5 py-1 text-[11px] font-medium rounded-full transition-colors",
                codeLang === "tsx" ? "bg-zinc-200 dark:bg-white/10 text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              TSX
            </button>
            <button
              onClick={() => setCodeLang("js")}
              className={cn(
                "px-2.5 py-1 text-[11px] font-medium rounded-full transition-colors",
                codeLang === "js" ? "bg-zinc-200 dark:bg-white/10 text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              JS
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white rounded-full border border-black/10 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors bg-zinc-50 dark:bg-[#111]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-zinc-950 dark:bg-[#0c0c0c] hide-scrollbar relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${codeLang}-${codeTsx}`}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
          >
            <CodeBlock
              code={codeLang === "tsx" ? codeTsx : codeJs}
              language={codeLang === "tsx" ? "tsx" : "jsx"}
              filename={`app/components/${filenameBase}.${codeLang}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          {!isDesktop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm xl:hidden"
              onClick={onClose}
            />
          )}

          {/* Mobile Bottom Sheet */}
          {!isDesktop && (
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.8 }}
              onDragEnd={handleDragEnd}
              animate={controls}
              initial={{ y: "100%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed bottom-0 left-0 right-0 z-[100] h-[85vh] bg-white dark:bg-[#0c0c0c] border-t border-black/5 dark:border-white/10 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden xl:hidden"
            >
              {PanelContent}
            </motion.div>
          )}

          {/* Desktop Right Sidebar */}
          {isDesktop && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-[600px] bg-white dark:bg-[#0c0c0c] border-l border-black/5 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden hidden xl:flex"
            >
              {PanelContent}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function AccordionExamples() {
  const [codeLang, setCodeLang] = useState<"tsx" | "js">("tsx");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1280); // xl breakpoint
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Customised playground state
  const [customProps, setCustomProps] = useState<CustomProps>({
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "var(--theme-primary)",
    size: "md",
    weight: "Default",
    iconType: "Default",
    iconPosition: "Right",
    headingUnderline: false,
    headingColor: "",
    contentColor: "",
  });

  const isBorderZero = customProps.borderWidth === 0;

  const generateCode = (id: string, props: CustomProps, lang: "tsx" | "js") => {
    if (id !== "customization") {
      const code = ACCORDION_EXAMPLES.find((ex) => ex.id === id)?.code || "";
      if (lang === "js") {
        return code.replace(/: React.ReactNode/g, "").replace(/<[^>]+>/g, (match) => {
          if (match.includes("Accordion") || match.includes("div") || match.includes("span")) return match;
          return "";
        });
      }
      return code;
    }

    let itemProps = [];
    let triggerProps = [];
    let contentProps = [];

    if (props.borderWidth !== undefined) itemProps.push(`borderWidth="${props.borderWidth}px"`);
    if (props.borderRadius !== undefined) itemProps.push(`borderRadius="${props.borderRadius}px"`);
    if (props.borderColor) itemProps.push(`borderColor="${props.borderColor}"`);
    if (props.hideBorder) itemProps.push(`hideBorder`);

    if (props.size) triggerProps.push(`size="${props.size}"`);
    if (props.weight) triggerProps.push(`weight="${props.weight.toLowerCase()}"`);
    if (props.iconType === "Custom") {
      triggerProps.push(`icon={<Star className="h-5 w-5 text-[var(--theme-primary)]" />}`);
    }
    if (props.iconPosition) triggerProps.push(`iconPosition="${props.iconPosition.toLowerCase()}"`);
    if (props.hideIcon) triggerProps.push(`hideIcon`);
    if (props.hasOnClick) triggerProps.push(`onClick={() => alert('Clicked!')}`);

    triggerProps.push(`headingUnderline={${!!props.headingUnderline}}`);
    if (props.headingColor) triggerProps.push(`headingColor="${props.headingColor}"`);

    if (props.contentColor) contentProps.push(`contentColor="${props.contentColor}"`);

    const formatProps = (propsArr: string[], indent: string) => {
      if (propsArr.length === 0) return "";
      return `\n${propsArr.map(p => `${indent}${p}`).join("\n")}\n${indent.slice(0, -2)}`;
    }

    return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";${props.iconType === "Custom" ? '\nimport { Star } from "lucide-react";' : ''}

export default function CustomisedAccordion() {
  return (
    <Accordion type="single" collapsible${props.isDefaultExpanded ? ' defaultValue="item-1"' : ''} className="w-full space-y-4">
      <AccordionItem value="item-1"${itemProps.length > 0 ? formatProps(itemProps, "        ") : ""}>
        <AccordionTrigger${triggerProps.length > 0 ? formatProps(triggerProps, "          ") : ""}>
          Custom Styled Item
        </AccordionTrigger>
        <AccordionContent${contentProps.length > 0 ? formatProps(contentProps, "          ") : ""}>
          This item uses custom props dynamically applied from the playground!
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;
  };

  return (
    <StackedCardsContainer>
      {ACCORDION_EXAMPLES.map((ex, i) => (
        <StackedCard key={ex.id} index={i} total={ACCORDION_EXAMPLES.length}>
          <section className="bg-card text-card-foreground max-w-4xl mx-auto rounded-[1.5rem] overflow-hidden p-8 pb-[4rem]">
            <div className="flex items-start gap-4 py-4">
              <div className="p-2.5 sm:p-3 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-xl shrink-0">
                {(() => {
                  const IconComponent = AccordionIcons[ex.id as keyof typeof AccordionIcons] || AccordionIcons.basic;
                  return <IconComponent className="w-5 h-5" />;
                })()}
              </div>
              <div>
                <h2 id={ex.id} className="text-xl font-bold tracking-tight scroll-mt-24 mb-1 text-zinc-900 dark:text-zinc-100">{ex.label}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                  {(() => {
                    switch (ex.id) {
                      case "basic": return <>A simple, single-item accordion. Uses the <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">type="single"</code> prop on the root component to ensure only one item can be expanded at a time.</>;
                      case "multiple": return <>Allows multiple items to be expanded simultaneously by passing the <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">type="multiple"</code> prop to the root accordion.</>;
                      case "disabled": return <>Prevents interaction with specific items. Apply the <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">disabled</code> prop directly to an <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">&lt;AccordionItem&gt;</code> to gray it out and disable clicks.</>;
                      case "card": return <>Styles the accordion items as distinct elevated cards. Achieve this by passing a custom <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">className</code> with borders and padding to each <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">&lt;AccordionItem&gt;</code>.</>;
                      case "border": return <>Adds full borders around the accordion items. Simply pass a custom <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">className="border"</code> to the root or individual items.</>;
                      case "rtl": return <>Supports Right-To-Left text direction layouts automatically when placed inside a container with <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">dir="rtl"</code>.</>;
                      case "without-border": return <>Removes the default bottom borders for a clean look. Pass the <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">hideBorder</code> prop directly to the <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">&lt;AccordionItem&gt;</code> component.</>;
                      case "without-icon": return <>Hides the chevron indicator for custom trigger designs. Use the <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">hideIcon</code> prop on the <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">&lt;AccordionTrigger&gt;</code> component.</>;
                      case "with-onclick": return <>Fires custom events when a trigger is clicked. Pass a standard <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">onClick</code> handler to the <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">&lt;AccordionTrigger&gt;</code>.</>;
                      case "expanded-default": return <>Automatically opens specified items on initial render by passing the <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">defaultValue</code> prop to the root <code className="text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">&lt;Accordion&gt;</code> component.</>;
                      case "customization": return "Playground to test all available interactive properties dynamically.";
                      default: return "An accordion example.";
                    }
                  })()}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 border shadow-2xl rounded-[1.5rem] relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
              <div className="flex items-center justify-center p-10 relative overflow-hidden group">
                <div className="w-full relative z-10">
                  {renderExample(ex.id, customProps)}
                </div>
              </div>

              {ex.id === "customization" && (
                <div className="border rounded-2xl p-4 bg-card text-card-foreground shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[var(--theme-primary)] rounded-full"></span>
                    Interactive Props
                  </h3>

                  <div className="space-y-8">
                    {/* Border Group */}
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Border Styling</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className="flex justify-between items-center text-xs font-medium mb-1 h-9">
                            <span>Hide Border</span>
                            <Switch checked={!!customProps.hideBorder} onChange={(checked) => setCustomProps(prev => ({ ...prev, hideBorder: checked }))} size="md" />
                          </label>
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className={cn("flex justify-between text-xs font-medium mb-2 transition-opacity", customProps.hideBorder && "opacity-50")}>
                            <span>Border Width</span>
                            <span className="text-muted-foreground">{customProps.borderWidth}px</span>
                          </label>
                          <Slider min={0} max={4} value={customProps.borderWidth || 0} onChange={(v) => setCustomProps(prev => ({ ...prev, borderWidth: v }))} disabled={!!customProps.hideBorder} />
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className={cn("flex justify-between text-xs font-medium mb-2 transition-opacity", (customProps.hideBorder || isBorderZero) && "opacity-50")}>
                            <span>Border Radius</span>
                            <span className="text-muted-foreground">{customProps.borderRadius}px</span>
                          </label>
                          <Slider min={0} max={32} value={customProps.borderRadius || 0} onChange={(v) => setCustomProps(prev => ({ ...prev, borderRadius: v }))} disabled={!!customProps.hideBorder || isBorderZero} />
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className={cn("text-xs font-medium mb-1 transition-opacity", customProps.hideBorder && "opacity-50")}>Border Color</label>
                          <div className="flex justify-between items-center min-h-9">
                            <ColorPalette colors={PALETTE_COLORS} value={customProps.borderColor || ""} onChange={(c) => setCustomProps(prev => ({ ...prev, borderColor: c }))} onClear={customProps.borderColor !== "var(--theme-primary)" ? () => setCustomProps(prev => ({ ...prev, borderColor: "var(--theme-primary)" })) : undefined} draggable={false} className={cn((customProps.hideBorder || isBorderZero) && "opacity-50 pointer-events-none")} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/10 w-full" />

                    {/* Trigger Group */}
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Header Typography</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className="flex justify-between text-xs font-medium mb-2">
                            <span>Button Size</span>
                            <span className="text-muted-foreground">{customProps.size}</span>
                          </label>
                          <Slider min={0} max={4} value={["xs", "sm", "md", "lg", "xl"].indexOf(customProps.size || "md")} onChange={(v) => setCustomProps(prev => ({ ...prev, size: (["xs", "sm", "md", "lg", "xl"] as const)[v] }))} />
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className="flex justify-between text-xs font-medium mb-2">
                            <span>Button Weight</span>
                            <span className="text-muted-foreground">{customProps.weight}</span>
                          </label>
                          <Slider min={0} max={1} value={customProps.weight === "Bold" ? 1 : 0} onChange={(v) => setCustomProps(prev => ({ ...prev, weight: (["Default", "Bold"] as const)[v] }))} />
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className="flex justify-between items-center text-xs font-medium mb-1 h-9">
                            <span>Heading Underline</span>
                            <Switch checked={!!customProps.headingUnderline} onChange={(checked) => setCustomProps(prev => ({ ...prev, headingUnderline: checked }))} size="md" />
                          </label>
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className="text-xs font-medium mb-1">Heading Color</label>
                          <div className="flex justify-between items-center min-h-9">
                            <ColorPalette colors={PALETTE_COLORS} value={customProps.headingColor || ""} onChange={(c) => setCustomProps(prev => ({ ...prev, headingColor: c }))} onClear={customProps.headingColor ? () => setCustomProps(prev => ({ ...prev, headingColor: "" })) : undefined} draggable={false} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/10 w-full" />

                    {/* Icon Group */}
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Icon Styling</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className="flex justify-between items-center text-xs font-medium mb-1 h-9">
                            <span>Hide Icon</span>
                            <Switch checked={!!customProps.hideIcon} onChange={(checked) => setCustomProps(prev => ({ ...prev, hideIcon: checked }))} size="md" />
                          </label>
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className={cn("flex justify-between text-xs font-medium mb-2 transition-opacity", customProps.hideIcon && "opacity-50")}>
                            <span>Icon Type</span>
                            <span className="text-muted-foreground">{customProps.iconType}</span>
                          </label>
                          <Slider min={0} max={1} value={customProps.iconType === "Custom" ? 1 : 0} onChange={(v) => setCustomProps(prev => ({ ...prev, iconType: (["Default", "Custom"] as const)[v] }))} disabled={!!customProps.hideIcon} />
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className={cn("flex justify-between text-xs font-medium mb-2 transition-opacity", customProps.hideIcon && "opacity-50")}>
                            <span>Icon Position</span>
                            <span className="text-muted-foreground">{customProps.iconPosition}</span>
                          </label>
                          <Slider min={0} max={1} value={customProps.iconPosition === "Left" ? 1 : 0} onChange={(v) => setCustomProps(prev => ({ ...prev, iconPosition: (["Right", "Left"] as const)[v] }))} disabled={!!customProps.hideIcon} />
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/10 w-full" />

                    {/* Content Group */}
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Behavior & Content</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className="flex justify-between items-center text-xs font-medium mb-1 h-9">
                            <span>Expanded</span>
                            <Switch checked={!!customProps.isDefaultExpanded} onChange={(checked) => setCustomProps(prev => ({ ...prev, isDefaultExpanded: checked }))} size="md" />
                          </label>
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className="flex justify-between items-center text-xs font-medium mb-1 h-9">
                            <span>Enable onClick</span>
                            <Switch checked={!!customProps.hasOnClick} onChange={(checked) => setCustomProps(prev => ({ ...prev, hasOnClick: checked }))} size="md" />
                          </label>
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center">
                          <label className="text-xs font-medium mb-1">Content Text Color</label>
                          <div className="flex justify-between items-center min-h-9">
                            <ColorPalette colors={PALETTE_COLORS} value={customProps.contentColor || ""} onChange={(c) => setCustomProps(prev => ({ ...prev, contentColor: c }))} onClear={customProps.contentColor ? () => setCustomProps(prev => ({ ...prev, contentColor: "" })) : undefined} draggable={false} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </StackedCard>
      ))}
    </StackedCardsContainer>
  );
}
