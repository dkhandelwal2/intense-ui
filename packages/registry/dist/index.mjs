var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/components/accordion.tsx
import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/accordion.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var AccordionContext = createContext(void 0);
function Accordion({ children, type = "single", defaultValue, className }) {
  const [activeValues, setActiveValues] = useState(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );
  const toggleItem = (value) => {
    setActiveValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      if (type === "single") {
        return [value];
      }
      return [...prev, value];
    });
  };
  return /* @__PURE__ */ jsx(AccordionContext.Provider, { value: { activeValues, toggleItem }, children: /* @__PURE__ */ jsx("div", { className: cn("w-full space-y-2", className), children }) });
}
function AccordionItem({ value, children, className, disabled, borderWidth, borderRadius, borderColor }) {
  const customStyles = __spreadValues(__spreadValues(__spreadValues({}, borderWidth !== void 0 && { borderWidth }), borderRadius !== void 0 && { borderRadius }), borderColor !== void 0 && { borderColor });
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("border-b transition-all duration-300 ease-in-out", disabled && "opacity-50", className),
      style: Object.keys(customStyles).length > 0 ? customStyles : void 0,
      children: React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, disabled });
        }
        return child;
      })
    }
  );
}
var sizeClasses = {
  xs: "py-2 text-xs gap-1.5",
  sm: "py-3 text-sm gap-2",
  md: "py-4 text-sm gap-2",
  lg: "py-4 text-base gap-3",
  xl: "py-4 text-lg gap-3"
};
var weightClasses = {
  Default: "font-medium",
  Bold: "font-bold"
};
function AccordionTrigger({
  value,
  children,
  className,
  disabled,
  icon,
  iconPosition = "Right",
  size = "md",
  weight = "Default",
  headingUnderline,
  headingColor
}) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within an Accordion");
  const { activeValues, toggleItem } = context;
  const isOpen = value ? activeValues.includes(value) : false;
  const iconSizeClass = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-4 w-4",
    lg: "h-5 w-5",
    xl: "h-6 w-6"
  }[size];
  const renderedIcon = /* @__PURE__ */ jsx(
    motion.div,
    {
      animate: { rotate: isOpen ? 180 : 0 },
      transition: { duration: 0.2, ease: "easeInOut" },
      className: cn("transition-all duration-300 ease-in-out"),
      children: icon ? icon : /* @__PURE__ */ jsx(ChevronDown, { className: cn(iconSizeClass, "transition-all duration-300 ease-in-out text-zinc-500 shrink-0") })
    }
  );
  return /* @__PURE__ */ jsxs(
    "button",
    {
      disabled,
      onClick: () => value && toggleItem(value),
      style: headingColor ? { color: headingColor } : void 0,
      className: cn(
        "flex flex-1 w-full items-center transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950",
        sizeClasses[size],
        weightClasses[weight],
        iconPosition === "Right" ? "justify-between" : "justify-start",
        disabled ? "cursor-not-allowed" : "",
        headingUnderline ? "underline" : "",
        className
      ),
      children: [
        iconPosition === "Left" && renderedIcon,
        children,
        iconPosition === "Right" && renderedIcon
      ]
    }
  );
}
function AccordionContent({ value, children, className, disabled, contentColor }) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within an Accordion");
  const { activeValues } = context;
  const isOpen = value ? activeValues.includes(value) : false;
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { height: 0, opacity: 0 },
      animate: { height: "auto", opacity: 1 },
      exit: { height: 0, opacity: 0 },
      transition: { duration: 0.3, ease: "easeInOut" },
      className: "overflow-hidden",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn("pb-4 pt-0 text-sm transition-all duration-300 ease-in-out", !contentColor && "text-zinc-600 dark:text-zinc-400", className),
          style: contentColor ? { color: contentColor } : void 0,
          children
        }
      )
    }
  ) });
}

// src/components/color-palette.tsx
import { motion as motion3, AnimatePresence as AnimatePresence3 } from "framer-motion";
import { GripVertical, GripHorizontal, Plus, RotateCcw } from "lucide-react";

// src/components/tooltip.tsx
import { useState as useState2 } from "react";
import { motion as motion2, AnimatePresence as AnimatePresence2 } from "framer-motion";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Tooltip({ content, children, position = "top", bgColor, className }) {
  const [isVisible, setIsVisible] = useState2(false);
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2"
  };
  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-x-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-y-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-y-transparent border-l-transparent"
  };
  const getArrowStyle = () => {
    if (!bgColor) return {};
    switch (position) {
      case "top":
        return { borderTopColor: bgColor };
      case "bottom":
        return { borderBottomColor: bgColor };
      case "left":
        return { borderLeftColor: bgColor };
      case "right":
        return { borderRightColor: bgColor };
    }
  };
  const initialAnimation = {
    top: { opacity: 0, y: 5, scale: 0.95 },
    bottom: { opacity: 0, y: -5, scale: 0.95 },
    left: { opacity: 0, x: 5, scale: 0.95 },
    right: { opacity: 0, x: -5, scale: 0.95 }
  };
  const animate = {
    top: { opacity: 1, y: 0, scale: 1 },
    bottom: { opacity: 1, y: 0, scale: 1 },
    left: { opacity: 1, x: 0, scale: 1 },
    right: { opacity: 1, x: 0, scale: 1 }
  };
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: "relative flex items-center justify-center group",
      onMouseEnter: () => setIsVisible(true),
      onMouseLeave: () => setIsVisible(false),
      onFocus: () => setIsVisible(true),
      onBlur: () => setIsVisible(false),
      children: [
        children,
        /* @__PURE__ */ jsx2(AnimatePresence2, { children: isVisible && /* @__PURE__ */ jsxs2(
          motion2.div,
          {
            initial: initialAnimation[position],
            animate: animate[position],
            exit: initialAnimation[position],
            transition: { duration: 0.15 },
            className: cn(
              "absolute px-2 py-1 text-white text-xs rounded shadow-lg whitespace-nowrap pointer-events-none z-[100]",
              !bgColor && "bg-zinc-800",
              positionClasses[position],
              className
            ),
            style: bgColor ? { backgroundColor: bgColor } : {},
            children: [
              content,
              /* @__PURE__ */ jsx2(
                "div",
                {
                  className: cn(
                    "absolute border-4",
                    arrowClasses[position],
                    !bgColor && {
                      "border-t-zinc-800": position === "top",
                      "border-b-zinc-800": position === "bottom",
                      "border-l-zinc-800": position === "left",
                      "border-r-zinc-800": position === "right"
                    }
                  ),
                  style: getArrowStyle()
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}

// src/components/color-palette.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var getDisplayColor = (val) => {
  if (val === "var(--theme-primary)") return "Primary";
  if (!val) return "Default";
  const paletteMap = {
    "var(--palette-1)": "Blue",
    "var(--palette-2)": "Purple",
    "var(--palette-3)": "Red",
    "var(--palette-4)": "Orange",
    "var(--palette-5)": "Green"
  };
  if (paletteMap[val]) return paletteMap[val];
  return val;
};
var resolveToHex = (val) => {
  if (!val) return "#000000";
  if (val === "var(--theme-primary)") return "#FF0084";
  const hexMap = {
    "var(--palette-1)": "#3b82f6",
    "var(--palette-2)": "#a855f7",
    "var(--palette-3)": "#ef4444",
    "var(--palette-4)": "#f97316",
    "var(--palette-5)": "#22c55e"
  };
  if (hexMap[val]) return hexMap[val];
  if (/^#[0-9A-Fa-f]{6}$/.test(val)) return val;
  return "#000000";
};
function ColorPalette({ colors, value, onChange, onClear, draggable, orientation = "horizontal", className }) {
  const displayColors = colors.slice(0, 6);
  const isVertical = orientation === "vertical";
  const tooltipPos = isVertical ? "right" : "top";
  const Content = /* @__PURE__ */ jsxs3(
    motion3.div,
    {
      layout: true,
      className: cn(
        "flex items-center gap-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-full shadow-lg",
        isVertical ? "flex-col" : "flex-row",
        className
      ),
      children: [
        draggable && /* @__PURE__ */ jsx3(motion3.div, { layout: true, className: cn(
          "text-zinc-400 dark:text-zinc-600 cursor-grab active:cursor-grabbing flex items-center justify-center shrink-0",
          isVertical ? "pt-1 pb-0.5" : "pl-1 pr-0.5"
        ), children: isVertical ? /* @__PURE__ */ jsx3(GripHorizontal, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx3(GripVertical, { className: "w-4 h-4" }) }),
        displayColors.map((color, index) => /* @__PURE__ */ jsx3(Tooltip, { content: getDisplayColor(color), position: tooltipPos, bgColor: color, children: /* @__PURE__ */ jsx3(
          motion3.button,
          {
            layout: true,
            whileHover: { scale: 1.15 },
            whileTap: { scale: 0.9 },
            onClick: () => onChange(color),
            className: cn(
              "w-6 h-6 rounded-full transition-shadow shrink-0",
              value === color ? "ring-2 ring-zinc-950 dark:ring-white ring-offset-1 ring-offset-white dark:ring-offset-zinc-950" : ""
            ),
            style: { backgroundColor: color }
          }
        ) }, `${color}-${index}`)),
        /* @__PURE__ */ jsx3(
          Tooltip,
          {
            content: "Custom",
            position: tooltipPos,
            bgColor: value && !displayColors.includes(value) ? value : void 0,
            children: /* @__PURE__ */ jsx3(motion3.div, { layout: true, className: "relative shrink-0", children: /* @__PURE__ */ jsxs3(
              motion3.label,
              {
                whileHover: { scale: 1.15 },
                whileTap: { scale: 0.9 },
                className: cn(
                  "flex items-center justify-center w-6 h-6 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 cursor-pointer overflow-hidden transition-colors hover:border-zinc-400 dark:hover:border-zinc-500",
                  value && !displayColors.includes(value) ? "ring-2 ring-zinc-950 dark:ring-white ring-offset-1 ring-offset-white dark:ring-offset-zinc-950 border-transparent" : ""
                ),
                style: { backgroundColor: value && !displayColors.includes(value) ? value : "transparent" },
                children: [
                  (!value || displayColors.includes(value)) && /* @__PURE__ */ jsx3(Plus, { className: "w-4 h-4 text-zinc-400 dark:text-zinc-500" }),
                  /* @__PURE__ */ jsx3(
                    "input",
                    {
                      type: "color",
                      value: resolveToHex(value),
                      onChange: (e) => onChange(e.target.value),
                      className: "absolute opacity-0 w-full h-full cursor-pointer"
                    }
                  )
                ]
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsx3(AnimatePresence3, { children: onClear && /* @__PURE__ */ jsxs3(
          motion3.div,
          {
            layout: true,
            initial: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
            animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
            exit: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
            transition: { type: "spring", bounce: 0, duration: 0.3 },
            className: cn("flex items-center gap-2 shrink-0", isVertical ? "flex-col" : "flex-row"),
            children: [
              /* @__PURE__ */ jsx3("div", { className: cn("bg-zinc-200 dark:bg-zinc-800", isVertical ? "h-px w-6 my-0.5" : "w-px h-6 mx-0.5") }),
              /* @__PURE__ */ jsx3(Tooltip, { content: "Reset to default", position: tooltipPos, children: /* @__PURE__ */ jsx3(
                motion3.button,
                {
                  whileHover: { scale: 1.15 },
                  whileTap: { scale: 0.9 },
                  onClick: onClear,
                  className: "flex items-center justify-center w-6 h-6 rounded-full text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors",
                  children: /* @__PURE__ */ jsx3(RotateCcw, { className: "w-3.5 h-3.5" })
                }
              ) })
            ]
          }
        ) })
      ]
    }
  );
  if (draggable) {
    return /* @__PURE__ */ jsx3(motion3.div, { drag: true, dragMomentum: false, className: "inline-block relative z-40 touch-none", children: Content });
  }
  return /* @__PURE__ */ jsx3("div", { className: "inline-block relative", children: Content });
}

// src/components/switch.tsx
import { motion as motion4 } from "framer-motion";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function Switch({
  checked,
  onChange,
  disabled,
  className,
  orientation = "horizontal",
  size = "md",
  sliderText = "on/off",
  showDotIcon = true,
  shadowColor = "var(--theme-primary)"
}) {
  const isHor = orientation === "horizontal";
  const sizeClasses2 = {
    sm: isHor ? "w-16 h-6" : "w-6 h-16",
    md: isHor ? "w-20 h-8" : "w-8 h-20",
    lg: isHor ? "w-28 h-10" : "w-10 h-28"
  };
  const textClasses = {
    sm: "text-[7px]",
    md: "text-[9px]",
    lg: "text-[11px]"
  };
  const dotClasses = {
    sm: "w-1 h-1 shadow-[0_0_4px_rgba(var(--dot-color),0.8)]",
    md: "w-1.5 h-1.5 shadow-[0_0_6px_rgba(var(--dot-color),0.8)]",
    lg: "w-2 h-2 shadow-[0_0_8px_rgba(var(--dot-color),0.8)]"
  };
  const shadowShift = { sm: 2, md: 3, lg: 4 }[size];
  const rockY = isHor ? checked ? 15 : -15 : 0;
  const rockX = isHor ? 0 : checked ? -15 : 15;
  const labelOff = sliderText === "true/false" ? "FALSE" : "OFF";
  const labelOn = sliderText === "true/false" ? "TRUE" : "ON";
  return /* @__PURE__ */ jsx4(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      disabled,
      onClick: () => onChange(!checked),
      className: cn(
        "relative outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mx-2 my-2",
        sizeClasses2[size],
        className
      ),
      style: { perspective: "9999px" },
      children: /* @__PURE__ */ jsx4(
        "div",
        {
          className: "w-full h-full",
          style: { transformStyle: "preserve-3d" },
          children: /* @__PURE__ */ jsxs4(
            motion4.div,
            {
              className: "w-full h-full rounded-full absolute inset-0",
              style: { transformStyle: "preserve-3d" },
              initial: false,
              animate: {
                rotateY: rockY,
                rotateX: rockX
              },
              transition: { type: "spring", stiffness: 400, damping: 30 },
              children: [
                /* @__PURE__ */ jsx4(
                  motion4.div,
                  {
                    className: cn(
                      "absolute rounded-full bg-black/20 dark:bg-black/60 blur-[6px]",
                      isHor ? "w-[60%] h-full top-0" : "h-[60%] w-full left-0"
                    ),
                    style: { transform: "translateZ(-10px)" },
                    animate: {
                      [isHor ? "left" : "top"]: checked ? "0%" : "40%",
                      x: isHor ? checked ? -shadowShift : shadowShift : 0,
                      y: isHor ? 0 : checked ? -shadowShift : shadowShift
                    }
                  }
                ),
                Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsx4(
                  "div",
                  {
                    className: "absolute inset-0 rounded-full",
                    style: {
                      backgroundColor: shadowColor,
                      transform: `translateZ(${-i * 0.5}px) scale(${1 - i * 2e-3})`,
                      filter: `brightness(${1 - i * 0.015})`
                    }
                  },
                  i
                )),
                /* @__PURE__ */ jsxs4(
                  "div",
                  {
                    className: cn("absolute inset-0 rounded-full overflow-hidden flex", isHor ? "flex-row" : "flex-col"),
                    style: { transform: "translateZ(0.5px)", backfaceVisibility: "hidden" },
                    children: [
                      /* @__PURE__ */ jsxs4("div", { className: "relative flex-1 w-full h-full", children: [
                        /* @__PURE__ */ jsx4(
                          motion4.div,
                          {
                            className: "absolute inset-0 bg-zinc-200 dark:bg-zinc-700",
                            animate: { opacity: !checked ? 1 : 0 },
                            transition: { duration: 0.2 }
                          }
                        ),
                        /* @__PURE__ */ jsx4(
                          motion4.div,
                          {
                            className: "absolute inset-0 bg-zinc-400 dark:bg-zinc-900",
                            animate: { opacity: !checked ? 0 : 1 },
                            transition: { duration: 0.2 }
                          }
                        ),
                        /* @__PURE__ */ jsxs4("div", { className: "absolute inset-0 flex items-center justify-center gap-1", style: { "--dot-color": "239, 68, 68" }, children: [
                          showDotIcon && /* @__PURE__ */ jsx4("span", { className: cn(
                            "rounded-full transition-all duration-300",
                            !checked ? "bg-red-500" : "bg-red-500/20 dark:bg-red-950/40",
                            !checked ? dotClasses[size] : dotClasses[size].split(" ")[0] + " " + dotClasses[size].split(" ")[1]
                          ) }),
                          /* @__PURE__ */ jsx4("span", { className: cn(
                            "relative z-10 font-bold tracking-widest transition-all duration-300",
                            textClasses[size],
                            !checked ? "text-zinc-900 dark:text-white dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]" : "text-zinc-100 dark:text-zinc-500"
                          ), children: labelOff })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs4("div", { className: "relative flex-1 w-full h-full", children: [
                        /* @__PURE__ */ jsx4(
                          motion4.div,
                          {
                            className: "absolute inset-0 bg-zinc-200 dark:bg-zinc-700",
                            animate: { opacity: checked ? 1 : 0 },
                            transition: { duration: 0.2 }
                          }
                        ),
                        /* @__PURE__ */ jsx4(
                          motion4.div,
                          {
                            className: "absolute inset-0 bg-zinc-400 dark:bg-zinc-900",
                            animate: { opacity: checked ? 0 : 1 },
                            transition: { duration: 0.2 }
                          }
                        ),
                        /* @__PURE__ */ jsxs4("div", { className: "absolute inset-0 flex items-center justify-center gap-1", style: { "--dot-color": "34, 197, 94" }, children: [
                          showDotIcon && /* @__PURE__ */ jsx4("span", { className: cn(
                            "rounded-full transition-all duration-300",
                            checked ? "bg-green-500" : "bg-green-500/20 dark:bg-green-950/40",
                            checked ? dotClasses[size] : dotClasses[size].split(" ")[0] + " " + dotClasses[size].split(" ")[1]
                          ) }),
                          /* @__PURE__ */ jsx4("span", { className: cn(
                            "relative z-10 font-bold tracking-widest transition-all duration-300",
                            textClasses[size],
                            checked ? "text-zinc-900 dark:text-white dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]" : "text-zinc-100 dark:text-zinc-500"
                          ), children: labelOn })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx4("div", { className: cn(
                        "absolute bg-black/20 dark:bg-black/80",
                        isHor ? "left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2" : "top-1/2 left-0 right-0 h-[1px] -translate-y-1/2"
                      ) }),
                      /* @__PURE__ */ jsx4("div", { className: cn(
                        "absolute bg-white/50 dark:bg-white/10",
                        isHor ? "left-1/2 top-0 bottom-0 w-[1px] translate-x-[1px]" : "top-1/2 left-0 right-0 h-[1px] translate-y-[1px]"
                      ) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx4(
                  "div",
                  {
                    className: "absolute inset-0 rounded-full border border-black/5 dark:border-white/10 shadow-[inset_0_1px_3px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] pointer-events-none",
                    style: { transform: "translateZ(1px)" }
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
}
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ColorPalette,
  Switch,
  Tooltip
};
