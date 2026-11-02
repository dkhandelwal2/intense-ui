"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Share2, X as CloseIcon } from "lucide-react";

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"
  > {
  children?: React.ReactNode;
  variant?: "default" | "glow" | "outline" | "subtle" | "share";
  size?: "sm" | "md" | "lg";
  onShare?: (platform: string) => void;
}

export function Button({
  children,
  className,
  variant = "default",
  size = "md",
  onShare,
  ...props
}: ButtonProps) {
  if (variant === "share") {
    return <ShareButton size={size} onShare={onShare} className={className} />;
  }

  const MotionButton = motion.button;
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2 text-sm rounded-xl gap-2",
    lg: "px-6 py-3 text-base rounded-2xl gap-2.5",
  };

  const variantStyles = {
    default: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm",
    glow: "relative bg-[var(--theme-primary)] text-white shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.35)] hover:shadow-[0_0_30px_rgba(var(--theme-primary-rgb),0.6)] border border-white/20",
    outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/60 shadow-2xs",
    subtle: "bg-zinc-100 dark:bg-zinc-800/70 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800 shadow-none",
    share: "",
  };

  return (
    <MotionButton
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </MotionButton>
  );
}

export interface ShareButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  onShare?: (platform: string) => void;
}

export function ShareButton({
  className,
  size = "md",
  color = "#2563eb",
  onShare,
}: ShareButtonProps) {
  const [expanded, setExpanded] = useState(false);

  const platforms = [
    { id: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon /> },
    { id: "instagram", label: "Instagram", icon: <InstagramIcon /> },
    { id: "twitter", label: "X", icon: <XIcon /> },
    { id: "facebook", label: "Facebook", icon: <FacebookIcon /> },
  ];

  const sizeClasses = { sm: "h-9 text-xs", md: "h-11 text-sm", lg: "h-13 text-base" }[size];

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className={cn(
        "relative rounded-full text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] overflow-hidden select-none cursor-pointer",
        sizeClasses,
        expanded ? "w-64 px-2" : "w-28",
        className
      )}
      style={{ backgroundColor: color }}
    >
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.button
            key="collapsed"
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setExpanded(true)}
            className="w-full h-full flex items-center justify-center gap-1.5 font-bold tracking-widest uppercase outline-none"
          >
            <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>SHARE</span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-between px-1"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-transform hover:scale-110"
              aria-label="Close share menu"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-3 pr-2">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare?.(p.id);
                  }}
                  className="w-6 h-6 flex items-center justify-center hover:scale-125 transition-transform"
                  aria-label={`Share on ${p.label}`}
                >
                  {p.icon}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.82 0-1.611.17-1.954.512-.343.342-.406.84-.406 1.884v1.584h4.482l-.588 3.667h-3.894v7.98c-1.37.195-2.766.195-4.404 0z" />
    </svg>
  );
}

export const AnimatedButton = Button;
