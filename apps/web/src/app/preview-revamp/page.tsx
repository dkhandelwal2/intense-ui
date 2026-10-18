"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Terminal,
  ExternalLink,
  ChevronRight,
  Star,
  Sparkles,
  ArrowUp,
  LayoutList,
  Layers,
  SlidersHorizontal,
  ToggleRight,
  Activity,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { GithubIcon, XTwitterIcon, LinkedinIcon, InstagramIcon } from "@/icons";

export default function PreviewRevampPage() {
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  // Lenis-style silky smooth scroll spring (eliminates discrete wheel/scroll jerkiness)
  const smoothProgress = useSpring(footerProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.2,
    restDelta: 0.001,
  });

  // Background expanding circle transforms (Dome emerges first covering top, left, right)
  const circleScale = useTransform(smoothProgress, [0, 0.25, 0.65, 1], [0.8, 1.8, 3.0, 4.4]);
  const circleY = useTransform(smoothProgress, [0, 0.25, 0.65, 1], [40, 0, 0, 0]);
  const circleOpacity = useTransform(smoothProgress, [0, 0.08, 0.2], [0.65, 0.9, 1]);

  // Footer content container width spreading from compact to edge-to-edge
  const footerWidth = useTransform(
    smoothProgress,
    [0, 0.35, 0.75, 1],
    ["70%", "82%", "92%", "98%"]
  );
  const footerScale = useTransform(smoothProgress, [0, 0.3, 0.75, 1], [0.94, 0.97, 0.99, 1]);
  const footerY = useTransform(smoothProgress, [0, 0.45, 1], [60, 15, 0]);

  // Giant fit-text SVG scaling and rising from bottom
  const giantTextScale = useTransform(smoothProgress, [0.35, 0.75, 1], [0.45, 0.82, 1]);
  const giantTextY = useTransform(smoothProgress, [0.35, 0.75, 1], [60, 15, 0]);
  const giantTextOpacity = useTransform(smoothProgress, [0.25, 0.5, 1], [0.2, 0.85, 1]);
  const [emailCopied, setEmailCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Accordion");
  const [selectedPm, setSelectedPm] = useState<"npx" | "pnpm" | "bun">("npx");


  const getCliCommand = useCallback(() => {
    const comp = activeComponent.toLowerCase();
    if (selectedPm === "pnpm") return `pnpm dlx intense-ui@latest add ${comp}`;
    if (selectedPm === "bun") return `bunx --bun intense-ui@latest add ${comp}`;
    return `npx intense-ui@latest add ${comp}`;
  }, [selectedPm, activeComponent]);

  const copyCliCommand = () => {
    navigator.clipboard.writeText(getCliCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@intense-ui.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSubscribed(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 pb-0">
      {/* ─── MAIN LAYOUT: AIRY TREE SIDEBAR + CONTENT ─── */}
      <div className="max-w-7xl mx-auto pt-6 sm:pt-8 px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Left: Airy Floating Tree Sidebar */}
        <aside className="hidden md:block sticky top-24 self-start pr-4">
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-muted-foreground/70 uppercase mb-3 px-2">
                Getting Started
              </div>
              <div className="relative pl-3 border-l border-black/10 dark:border-white/10 flex flex-col gap-1">
                <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  Introduction
                </div>
                <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors flex items-center justify-between">
                  <span>Installation</span>
                  <span className="text-[10px] font-mono text-zinc-400">CLI</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-muted-foreground/70 uppercase mb-3 px-2">
                <span>Components</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary/10 text-primary">12</span>
              </div>
              <div className="relative pl-3 border-l border-black/10 dark:border-white/10 flex flex-col gap-1">
                {[
                  { name: "Accordion", badge: "Hot", icon: LayoutList },
                  { name: "Animated Button", badge: "New", icon: Sparkles },
                  { name: "Switch", badge: null, icon: ToggleRight },
                  { name: "Slider", badge: null, icon: SlidersHorizontal },
                  { name: "Bento Grid", badge: "Pro", icon: Layers },
                ].map((item) => {
                  const isActive = activeComponent === item.name;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveComponent(item.name)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left relative",
                        isActive
                          ? "bg-gradient-to-r from-primary/15 via-primary/10 to-transparent text-primary font-bold border border-primary/25 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                          : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={cn("w-3.5 h-3.5", isActive ? "text-primary" : "text-muted-foreground")} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                            item.badge === "Hot"
                              ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                              : item.badge === "New"
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                              : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pinned Bottom Status Card */}
            <div className="mt-8 p-3.5 rounded-2xl bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 text-xs">
              <div className="flex items-center gap-2 mb-1.5 text-emerald-500 font-semibold text-[11px]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                Registry Online
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Turbopack &amp; React 19 native primitives.
              </p>
            </div>
          </div>
        </aside>

        {/* Center: Hero Demo Canvas to showcase scroll depth */}
        <main className="flex flex-col gap-10 min-w-0 pb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              Live Interactive Prototype
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              On-Scroll Motion &amp; Spatial Glass Revamp
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
              Scroll down this page to witness the **header seamlessly morph** into a floating frosted glass pill with reading progress tracking, and see the **footer bento grid cards emerge with staggered spring depth**.
            </p>
          </div>

          {/* Demonstration Interactive Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Interactive Component: {activeComponent}</h3>
                <p className="text-xs text-muted-foreground">Component preview canvas inside new open architecture.</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary font-bold">
                Preview Mode
              </span>
            </div>

            {/* Sample accordion preview representation */}
            <div className="space-y-3">
              {[
                { q: "How does the on-scroll header animation work?", a: "It uses Framer Motion's useScroll with hardware-accelerated transforms. As scrollY exceeds 25px, the container transitions smoothly into an elevated glass pill without reflowing the document." },
                { q: "Why is the floating tree sidebar better?", a: "Instead of an opaque, heavy box covering the left edge, it uses airy vertical guide-rails and translucent floating pills that breathe with the content." },
                { q: "What makes the Bento Grid footer unique?", a: "It breaks away from 1990s list columns into modular interactive cards (CLI quick install, GitHub stars, and live system health) that animate upon scroll entry." }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-black/5 dark:border-white/10 bg-background shadow-xs">
                  <div className="font-semibold text-sm mb-1">{item.q}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Helper callout inviting the user to scroll */}
          <div className="p-8 rounded-3xl border border-dashed border-primary/30 bg-primary/[0.03] flex flex-col items-center justify-center text-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center animate-bounce">
              <ArrowUp className="w-5 h-5 rotate-180" />
            </div>
            <div className="font-bold text-base">Keep Scrolling Down!</div>
            <p className="text-xs text-muted-foreground max-w-md">
              Scroll down past this card to experience the **Kora-style sticky footer reveal effect**.
            </p>
          </div>

          {/* Filler spacer blocks to simulate real document height */}
          <div className="space-y-6 opacity-75">
            {[1, 2, 3].map((num) => (
              <div key={num} className="p-6 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
                <div className="h-4 w-48 bg-black/10 dark:bg-white/10 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-black/5 dark:bg-white/5 rounded" />
                  <div className="h-3 w-5/6 bg-black/5 dark:bg-white/5 rounded" />
                  <div className="h-3 w-4/6 bg-black/5 dark:bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ─── 3. KORA-STYLE EXPANDING SCALE FOOTER ─── */}
      <section
        ref={footerRef}
        className="relative w-full px-2 sm:px-4 md:px-6 pt-24 sm:pt-36 pb-2 sm:pb-3 flex flex-col items-center overflow-visible"
      >
        {/* Background Expanding Circle (Dome emerges before content, clipped at bottom to eliminate bottom scroll space) */}
        <div className="absolute inset-x-0 bottom-0 top-[-80px] sm:top-[-140px] overflow-hidden pointer-events-none -z-10">
          <motion.div
            style={{
              scale: circleScale,
              y: circleY,
              x: "-50%",
              opacity: circleOpacity,
              backgroundColor: "var(--theme-primary)",
              willChange: "transform",
            }}
            className="absolute top-0 left-1/2 w-[750px] h-[750px] sm:w-[1050px] sm:h-[1050px] rounded-full origin-top shadow-2xl"
          />
        </div>

        {/* Main Content Box: width spreads with scroll from compact to 98% edge-to-edge */}
        <motion.div
          style={{
            width: footerWidth,
            scale: footerScale,
            y: footerY,
            willChange: "transform, width",
          }}
          className="min-w-[320px] max-w-[1720px] rounded-[32px] sm:rounded-[44px] bg-[#fafaf7] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6 sm:p-10 md:p-14 pb-0 sm:pb-0 md:pb-0 overflow-hidden relative shadow-2xl flex flex-col justify-between gap-10 sm:gap-14 z-10"
        >
          {/* ── TOP SECTION (Logo, Newsletter, Founder Quote, Contact) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 sm:gap-12 items-start relative z-10">
            {/* Left Column: Logo & Newsletter */}
            <div className="flex flex-col justify-between space-y-8">
              {/* Logo & Address */}
              <div className="space-y-3">
                <Link href="/" className="inline-flex items-center gap-2 group">
                  <span className="font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                    <span
                      style={{ backgroundColor: "var(--theme-primary)" }}
                      className="h-7 w-7 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-md"
                    >
                      I
                    </span>
                    <span>intense<span style={{ color: "var(--theme-primary)" }} className="font-bold">ui™</span></span>
                  </span>
                </Link>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xs">
                  2847 Mission Street<br />San Francisco, CA 94110
                </p>
              </div>

              {/* Newsletter Subscribe */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  Subscribe to our newsletter.
                </h3>
                <form onSubmit={handleSubscribe} className="relative max-w-md">
                  <div className="flex items-center p-1.5 pl-5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs focus-within:border-[var(--theme-primary)] transition-all">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none pr-3"
                    />
                    <button
                      type="submit"
                      style={{ backgroundColor: "var(--theme-primary)" }}
                      className="px-5 py-2.5 rounded-full hover:opacity-90 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-sm"
                    >
                      <span>{newsletterSubscribed ? "Subscribed!" : "Subscribe"}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </button>
                  </div>
                </form>
                <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span className="h-2.5 w-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                  <span>By subscribing, you agree to our <Link href="/privacy" className="underline hover:text-zinc-900 dark:hover:text-white">privacy policy</Link>.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Quote & Contact */}
            <div className="flex flex-col justify-between space-y-8">
              {/* Founder Quote */}
              <div className="space-y-4">
                <blockquote className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200 leading-snug">
                  Stalled revenue, leaky funnels, stretched leadership.{" "}
                  <span className="text-zinc-950 dark:text-white font-black">
                    Whatever&apos;s holding you back, let&apos;s solve it.
                  </span>
                </blockquote>

                {/* Founder Profile */}
                <div className="flex items-center gap-3 pt-2">
                  <div
                    style={{ backgroundColor: "var(--theme-primary)" }}
                    className="h-11 w-11 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white dark:ring-zinc-900"
                  >
                    DK
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-white">Deepak Khandelwal</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Founder &amp; CEO</div>
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-2 pt-2">
                <div className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 font-mono">
                  (510) 895-6500
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-[var(--theme-primary)] transition-colors cursor-pointer group"
                >
                  <div
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--theme-primary) 15%, transparent)",
                      color: "var(--theme-primary)",
                    }}
                    className="h-8 w-8 rounded-full flex items-center justify-center transition-all group-hover:scale-105"
                  >
                    {emailCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </div>
                  <span className="font-mono">hello@intense-ui.com</span>
                  {emailCopied && (
                    <span className="text-xs font-bold text-emerald-500 animate-in fade-in">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ── MIDDLE SECTION (Socials, Legal, Navigation) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 sm:pt-12 border-t border-black/5 dark:border-white/10 relative z-10 items-start">
            {/* Left: Socials & Legal */}
            <div className="space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                  Socials
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href={siteConfig.links.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-[var(--theme-primary)] hover:border-[var(--theme-primary)] hover:text-white transition-all shadow-xs"
                    aria-label="X Twitter"
                  >
                    <XTwitterIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-[var(--theme-primary)] hover:border-[var(--theme-primary)] hover:text-white transition-all shadow-xs"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-[var(--theme-primary)] hover:border-[var(--theme-primary)] hover:text-white transition-all shadow-xs"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-[var(--theme-primary)] hover:border-[var(--theme-primary)] hover:text-white transition-all shadow-xs"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                  Legal
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                  <Link href="/privacy" className="hover:text-[var(--theme-primary)] transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-[var(--theme-primary)] transition-colors">Terms of Service</Link>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  © 2026 Intense UI All rights reserved.
                </div>
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-zinc-500 hover:text-[var(--theme-primary)] transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Top</span>
                </button>
              </div>
            </div>

            {/* Right: Navigation */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                Navigation
              </div>
              <ul className="space-y-2.5 text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-200">
                <li>
                  <Link href="/docs/components" className="inline-flex items-center gap-2 hover:text-[var(--theme-primary)] transition-colors group">
                    <span className="text-zinc-400 group-hover:text-[var(--theme-primary)] transition-colors">•</span>
                    <span>Case Studies</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="inline-flex items-center gap-2 hover:text-[var(--theme-primary)] transition-colors group">
                    <span className="text-zinc-400 group-hover:text-[var(--theme-primary)] transition-colors">•</span>
                    <span>Insights</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="inline-flex items-center gap-2 hover:text-[var(--theme-primary)] transition-colors group">
                    <span className="text-zinc-400 group-hover:text-[var(--theme-primary)] transition-colors">•</span>
                    <span>About us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="inline-flex items-center gap-2 hover:text-[var(--theme-primary)] transition-colors group">
                    <span className="text-zinc-400 group-hover:text-[var(--theme-primary)] transition-colors">•</span>
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ── BOTTOM SECTION: GIANT FIT-TEXT WATERMARK (Edge-to-edge vector SVG) ── */}
          <div className="relative w-full overflow-hidden flex justify-center items-end pt-2 sm:pt-6 pb-0 -mb-1">
            <motion.div
              style={{
                scale: giantTextScale,
                y: giantTextY,
                opacity: giantTextOpacity,
                transformOrigin: "center bottom",
                willChange: "transform",
              }}
              className="w-full select-none pointer-events-none flex justify-center items-end"
            >
              <svg
                viewBox="0 0 780 182"
                className="w-full h-auto select-none pointer-events-none overflow-visible block"
                preserveAspectRatio="xMidYMid meet"
              >
                <text
                  x="50%"
                  y="88%"
                  textAnchor="middle"
                  fill="var(--theme-primary)"
                  fontSize="215"
                  fontWeight="900"
                  letterSpacing="-0.04em"
                  style={{
                    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  }}
                >
                  intense
                </text>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
