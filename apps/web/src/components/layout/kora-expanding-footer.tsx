"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Copy, Check, ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import { GithubIcon, XTwitterIcon, LinkedinIcon, InstagramIcon } from "@/icons";

export function KoraExpandingFooter() {
  const footerRef = useRef<HTMLDivElement>(null);
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
    <section
      ref={footerRef}
      className="relative w-full px-2 sm:px-4 md:px-6 pt-24 sm:pt-36 pb-2 sm:pb-3 flex flex-col items-center overflow-visible select-none"
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
                  <span>
                    intense
                    <span style={{ color: "var(--theme-primary)" }} className="font-bold">
                      ui™
                    </span>
                  </span>
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xs">
                2847 Mission Street<br />
                San Francisco, CA 94110
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
                <span>
                  By subscribing, you agree to our{" "}
                  <Link href="/privacy" className="underline hover:text-zinc-900 dark:hover:text-white">
                    privacy policy
                  </Link>
                  .
                </span>
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
                <Link href="/privacy" className="hover:text-[var(--theme-primary)] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-[var(--theme-primary)] transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                © 2026 Intense UI All rights reserved.
              </div>
              <button
                type="button"
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
  );
}
