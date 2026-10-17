"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search,
  BookOpen,
  Terminal,
  X,
  CornerDownLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon, SparkleStarIcon } from "@/icons";
import { componentsConfig } from "@/config/components";
import { siteConfig } from "@/config/site";
import { useGitHubStars } from "@/hooks/use-github-stars";

/**
 * Standard brand Logo component for Intense UI
 */
export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("flex items-center group shrink-0", className)}
      title="Intense UI"
    >
      {/* Light mode: dark logo image */}
      <Image
        src="/logo-light.webp"
        alt="Intense UI"
        width={140}
        height={36}
        className="h-6 sm:h-7 w-auto dark:hidden transition-transform duration-200 group-hover:scale-[1.02]"
        priority
        unoptimized
      />
      {/* Dark mode: light/white logo image */}
      <Image
        src="/logo-dark.webp"
        alt="Intense UI"
        width={140}
        height={36}
        className="h-6 sm:h-7 w-auto hidden dark:block transition-transform duration-200 group-hover:scale-[1.02]"
        priority
        unoptimized
      />
    </Link>
  );
}

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { starCountText } = useGitHubStars();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);

  // Close full-screen menu smoothly
  const handleCloseMenu = useCallback(() => {
    if (!isMenuOpen || isMenuClosing) return;
    setIsMenuClosing(true);
    setIsMenuOpen(false);
    setTimeout(() => {
      setIsMenuClosing(false);
    }, 350);
  }, [isMenuOpen, isMenuClosing]);

  const handleToggleMenu = useCallback(() => {
    if (isMenuOpen) {
      handleCloseMenu();
    } else {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen, handleCloseMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMenuOpen]);

  // Search items database
  const searchItems = useMemo(
    () => [
      {
        title: "Documentation",
        href: "/docs",
        category: "Guide",
        icon: BookOpen,
        description: "Overview, architecture, principles, and guidelines.",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        category: "Guide",
        icon: Terminal,
        description: "Set up Intense UI CLI, React 19, and Tailwind CSS v4.",
      },
      ...componentsConfig
        .filter((c) => c.enabled)
        .map((c) => ({
          title: c.name,
          href: c.href,
          category: "Component",
          icon: BookOpen,
          description: c.description,
        })),
    ],
    []
  );

  const filteredSearchItems = useMemo(() => {
    if (!searchQuery.trim()) return searchItems;
    const q = searchQuery.toLowerCase();
    return searchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [searchQuery, searchItems]);

  useEffect(() => {
    setSelectedSearchIndex(0);
  }, [searchQuery]);

  // Global keyboard shortcuts (Cmd+K, Escape, Arrow navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        } else if (isMenuOpen) {
          handleCloseMenu();
        }
      } else if (isSearchOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedSearchIndex((prev) =>
            filteredSearchItems.length > 0 ? (prev + 1) % filteredSearchItems.length : 0
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedSearchIndex((prev) =>
            filteredSearchItems.length > 0
              ? (prev - 1 + filteredSearchItems.length) % filteredSearchItems.length
              : 0
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredSearchItems[selectedSearchIndex]) {
            handleNavigate(filteredSearchItems[selectedSearchIndex].href);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isMenuOpen, handleCloseMenu, filteredSearchItems, selectedSearchIndex]);

  // Track window resize for mobile check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 1:1 Scroll progress for header dynamic island
  const scrollDistance = siteConfig.header.scrollDistance ?? 80;
  const scrollProgress = useTransform(scrollY, [0, scrollDistance], [0, 1], { clamp: true });

  // Update background styling / shadow state smoothly
  useEffect(() => {
    let lastScrolled = false;
    let timeoutId: NodeJS.Timeout | null = null;
    const unsub = scrollProgress.on("change", (latest) => {
      const shouldBeScrolled = latest > 0.25;
      if (shouldBeScrolled !== lastScrolled) {
        lastScrolled = shouldBeScrolled;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsScrolled(shouldBeScrolled);
        }, 0);
      }
    });
    return () => {
      unsub();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [scrollProgress]);

  // Scrubbed motion transforms for header dynamic island
  const headerMaxWidth = useTransform(scrollProgress, [0, 1], [1240, 820]);

  // Center navigation tabs scrub out as header contracts
  const navOpacity = useTransform(scrollProgress, [0, 0.5], [1, 0], { clamp: true });
  const navScale = useTransform(scrollProgress, [0, 0.5], [1, 0.88], { clamp: true });
  const navX = useTransform(scrollProgress, [0, 0.5], [0, 16], { clamp: true });
  const navPointerEvents = useTransform(scrollProgress, (p) => (p > 0.4 ? "none" : "auto"));

  // Desktop hamburger button scrubs in smoothly as header reaches compact dynamic island
  const forceShowHamburger = isMobile || isMenuOpen || isMenuClosing;
  const desktopHamburgerWidth = useTransform(scrollProgress, [0.2, 0.8], [0, 36], { clamp: true });
  const desktopHamburgerOpacity = useTransform(scrollProgress, [0.2, 0.8], [0, 1], { clamp: true });
  const desktopHamburgerScale = useTransform(scrollProgress, [0.2, 0.8], [0.6, 1], { clamp: true });
  const desktopHamburgerMarginLeft = useTransform(scrollProgress, [0.2, 0.8], [0, 4], { clamp: true });
  const desktopHamburgerPointerEvents = useTransform(scrollProgress, (p) => (p > 0.5 ? "auto" : "none"));

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  const handleNavigate = (href: string) => {
    handleCloseMenu();
    setIsSearchOpen(false);
    router.push(href);
  };

  const isItemActive = (href: string, matchExact?: boolean) => {
    if (href === "/") return pathname === "/";
    if (matchExact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* ─── 1. FIXED FLOATING HEADER BAR ─── */}
      <header className="fixed top-0 left-0 right-0 z-[70] pointer-events-none pt-3 px-4 sm:px-6 md:px-8 flex justify-center">
        <div className="w-full max-w-7xl relative flex justify-center">
          <motion.div
            initial={false}
            style={{
              maxWidth: isMenuOpen ? 820 : headerMaxWidth,
            }}
            className={cn(
              "w-full h-14 rounded-2xl flex items-center justify-between px-4 sm:px-6 pointer-events-auto backdrop-blur-2xl relative border transition-colors duration-300 will-change-[max-width] max-lg:!max-w-full",
              "bg-background/80 dark:bg-[#0c0c0e]/95",
              isScrolled || isMenuOpen
                ? "border-black/10 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/60"
                : "border-transparent shadow-none"
            )}
          >
            {/* Left side: Logo & Version Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <Logo onClick={handleCloseMenu} />

              <span className="hidden xl:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                v0.1.0 Beta
              </span>
            </div>

            {/* Center: Navigation Menu Tabs (Shown on large screens lg:) */}
            <div className="flex-1 flex justify-center items-center px-2 overflow-hidden">
              <motion.nav
                style={{
                  opacity: isMenuOpen ? 0 : navOpacity,
                  scale: isMenuOpen ? 0.9 : navScale,
                  x: isMenuOpen ? 0 : navX,
                  pointerEvents: (isMenuOpen ? "none" : navPointerEvents) as any,
                }}
                className="hidden lg:flex items-center gap-1 bg-black/[0.04] dark:bg-zinc-900/90 p-1 rounded-full border border-black/5 dark:border-white/10 text-xs font-medium shrink-0 will-change-[opacity,transform] backdrop-blur-md"
              >
                {siteConfig.header.navItems.map((item) => {
                  const isActive = isItemActive(item.href, item.matchExact);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative px-4 py-1.5 rounded-full text-xs transition-colors duration-200 select-none z-10",
                        isActive
                          ? "text-zinc-950 dark:text-white font-semibold"
                          : "text-muted-foreground dark:text-zinc-400 hover:text-foreground dark:hover:text-white font-medium"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="header-active-pill"
                          transition={{
                            type: "spring",
                            stiffness: 440,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-full -z-10 bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/15 shadow-xs"
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  );
                })}
              </motion.nav>
            </div>

            {/* Right side: Search, GitHub, Theme, and Hamburger (100% rounded-full symmetry) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* 1. Search trigger button */}
              <button
                type="button"
                onClick={() => {
                  if (isMenuOpen) handleCloseMenu();
                  setSearchQuery("");
                  setIsSearchOpen(true);
                }}
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[var(--theme-primary)]/40 hover:text-foreground text-muted-foreground transition-all cursor-pointer shrink-0 group active:scale-95",
                  // Mobile: 40x40 circle symmetrical to hamburger; sm+: expanded bar with shortcut badge
                  "h-10 w-10 sm:h-9 sm:w-auto sm:px-3 sm:gap-2"
                )}
                title="Search documentation (⌘K)"
              >
                <Search className="h-4 w-4 text-zinc-400 group-hover:text-[var(--theme-primary)] transition-colors" />
                <span className="hidden sm:inline text-xs text-muted-foreground/80 group-hover:text-foreground transition-colors">
                  Search...
                </span>
                <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground/70 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10">
                  ⌘K
                </kbd>
              </button>

              {/* 2 & 3. Desktop-only secondary actions: GitHub & Theme Toggle */}
              <div className="hidden md:flex items-center gap-2">
                {/* GitHub repository with dynamic Star Count and animated hover morph */}
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Repository & Stars"
                  className="group inline-flex items-center gap-2 h-8 sm:h-9 px-3 rounded-full bg-black/5 dark:bg-zinc-900/90 border border-black/10 dark:border-white/10 hover:border-amber-500/40 hover:bg-black/10 dark:hover:bg-zinc-800/90 transition-all shrink-0 cursor-pointer select-none active:scale-95 shadow-xs"
                >
                  {/* Animated Icon: GitHub transforms into sparkling golden star on hover */}
                  <div className="relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
                    <GithubIcon className="w-4 h-4 absolute transition-all duration-300 ease-out transform group-hover:scale-0 group-hover:rotate-45 group-hover:opacity-0 pointer-events-none text-zinc-600 dark:text-zinc-400 group-hover:text-foreground" />
                    <SparkleStarIcon className="w-4.5 h-4.5 absolute transition-all duration-300 ease-out transform scale-0 -rotate-45 opacity-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                  </div>

                  {/* Dynamic Star Count */}
                  <span className="text-xs sm:text-[13px] font-sans font-medium tracking-tight text-zinc-700 dark:text-zinc-200 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors">
                    {starCountText || "★"}
                  </span>
                </a>

                {/* Theme toggle */}
                <ThemeToggle className="inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[var(--theme-primary)]/40 hover:text-foreground text-muted-foreground transition-all shrink-0 cursor-pointer p-0" />
              </div>

              {/* Tablet & Mobile Hamburger (< lg): Static, immediate CSS rendering without layout shift */}
              <div className="flex lg:hidden items-center justify-center shrink-0">
                <button
                  type="button"
                  onClick={handleToggleMenu}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  title={isMenuOpen ? "Close menu" : "Open menu"}
                  className={cn(
                    "inline-flex items-center justify-center h-10 w-10 rounded-full border transition-all cursor-pointer shrink-0 relative overflow-hidden active:scale-95",
                    isMenuOpen
                      ? "bg-black/10 text-zinc-950 border-black/15 shadow-xs dark:bg-white/10 dark:text-white dark:border-white/15 dark:shadow-xs"
                      : "bg-black/5 text-zinc-700 hover:text-zinc-950 border-black/10 hover:border-[var(--theme-primary)]/40 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-white dark:border-white/10 dark:hover:border-[var(--theme-primary)]/40"
                  )}
                >
                  <div className="w-5 h-5 relative flex items-center justify-center pointer-events-none">
                    <motion.span
                      initial={false}
                      animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="w-4.5 h-[2px] bg-current rounded-full absolute"
                    />
                    <motion.span
                      initial={false}
                      animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="w-4.5 h-[2px] bg-current rounded-full absolute"
                    />
                    <motion.span
                      initial={false}
                      animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="w-4.5 h-[2px] bg-current rounded-full absolute"
                    />
                  </div>
                </button>
              </div>

              {/* Desktop Hamburger (≥ lg): Scroll-scrubbed dynamic island morph */}
              <motion.div
                initial={false}
                style={{
                  width: isMenuOpen || isMenuClosing ? 36 : desktopHamburgerWidth,
                  opacity: isMenuOpen || isMenuClosing ? 1 : desktopHamburgerOpacity,
                  scale: isMenuOpen || isMenuClosing ? 1 : desktopHamburgerScale,
                  marginLeft: isMenuOpen || isMenuClosing ? 4 : desktopHamburgerMarginLeft,
                  pointerEvents: (isMenuOpen || isMenuClosing ? "auto" : desktopHamburgerPointerEvents) as any,
                }}
                className="hidden lg:flex overflow-hidden items-center justify-center shrink-0 will-change-[width,opacity,transform]"
              >
                <button
                  type="button"
                  onClick={handleToggleMenu}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  title={isMenuOpen ? "Close menu" : "Open menu"}
                  className={cn(
                    "inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full border transition-all cursor-pointer shrink-0 relative overflow-hidden active:scale-95",
                    isMenuOpen
                      ? "bg-black/10 text-zinc-950 border-black/15 shadow-xs dark:bg-white/10 dark:text-white dark:border-white/15 dark:shadow-xs"
                      : "bg-black/5 text-zinc-700 hover:text-zinc-950 border-black/10 hover:border-[var(--theme-primary)]/40 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-white dark:border-white/10 dark:hover:border-[var(--theme-primary)]/40"
                  )}
                >
                  <div className="w-4 h-4 relative flex items-center justify-center pointer-events-none">
                    <motion.span
                      initial={false}
                      animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4.5 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="w-3.5 h-[1.75px] bg-current rounded-full absolute"
                    />
                    <motion.span
                      initial={false}
                      animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="w-3.5 h-[1.75px] bg-current rounded-full absolute"
                    />
                    <motion.span
                      initial={false}
                      animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4.5 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="w-3.5 h-[1.75px] bg-current rounded-full absolute"
                    />
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ─── 2. FULL SCREEN CENTERED MENU OVERLAY ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="full-screen-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCloseMenu();
              }
            }}
            className="fixed inset-0 z-[65] bg-background/70 dark:bg-black/60 backdrop-blur-2xl flex flex-col items-center justify-center p-6 select-none pointer-events-auto"
          >
            {/* Centered navigation stack */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.08,
                  },
                },
                exit: {
                  opacity: 0,
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
              className="flex flex-col items-center gap-7 sm:gap-9 text-center max-w-md w-full"
            >
              {siteConfig.header.navItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 340,
                        damping: 26,
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -16,
                      scale: 0.95,
                      transition: {
                        duration: 0.24,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={handleCloseMenu}
                    className={cn(
                      "inline-block transition-all duration-200 tracking-tight hover:scale-105 cursor-pointer",
                      item.isFeatured
                        ? "text-3xl sm:text-4xl font-bold text-foreground hover:text-primary"
                        : "text-2xl sm:text-3xl font-medium text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile-only Quick Action Buttons (GitHub, Theme Mode) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 340,
                      damping: 26,
                    },
                  },
                  exit: {
                    opacity: 0,
                    y: -12,
                    scale: 0.95,
                    transition: {
                      duration: 0.2,
                    },
                  },
                }}
                className="flex md:hidden items-center justify-center gap-3 pt-6 w-full max-w-[180px]"
              >
                {/* GitHub repository icon with animated hover morph and stars */}
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Repository & Stars"
                  className="group inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-black/5 dark:bg-zinc-900/90 border border-black/10 dark:border-white/10 hover:border-amber-500/40 hover:bg-black/10 dark:hover:bg-zinc-800/90 transition-all shrink-0 cursor-pointer active:scale-95 select-none shadow-xs"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                    <GithubIcon className="w-5 h-5 absolute transition-all duration-300 ease-out transform group-hover:scale-0 group-hover:rotate-45 group-hover:opacity-0 pointer-events-none text-zinc-600 dark:text-zinc-400" />
                    <SparkleStarIcon className="w-5 h-5 absolute transition-all duration-300 ease-out transform scale-0 -rotate-45 opacity-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                  </div>
                  <span className="text-sm font-sans font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors">
                    {starCountText || "★"}
                  </span>
                </a>

                {/* Theme toggle */}
                <ThemeToggle className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[var(--theme-primary)]/40 hover:text-foreground text-muted-foreground transition-all shrink-0 cursor-pointer p-0 active:scale-95" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 3. INTERACTIVE SEARCH COMMAND DIALOG MODAL ─── */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[150] flex items-start justify-center pt-16 sm:pt-24 px-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl rounded-2xl bg-background/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(249,115,22,0.15)] overflow-hidden z-10"
            >
              {/* Top Search Input */}
              <div className="flex items-center px-4 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search docs, components, CLI... (e.g. Accordion, Installation)"
                  className="w-full h-14 bg-transparent text-sm sm:text-base outline-none text-foreground placeholder:text-muted-foreground"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 font-mono text-[10px] text-muted-foreground">
                    ESC
                  </kbd>
                )}
              </div>

              {/* Search Results List */}
              <div className="max-h-[380px] overflow-y-auto p-2">
                {filteredSearchItems.length === 0 ? (
                  <div className="py-12 px-4 text-center">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mb-3">
                      <Search className="w-5 h-5" />
                    </div>
                    <div className="font-semibold text-sm">No matching results found</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      No results for &quot;{searchQuery}&quot;. Try searching for &quot;Accordion&quot; or &quot;Installation&quot;.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {filteredSearchItems.map((item, index) => {
                      const isSelected = index === selectedSearchIndex;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.href + item.title}
                          onClick={() => handleNavigate(item.href)}
                          onMouseEnter={() => setSelectedSearchIndex(index)}
                          className={cn(
                            "w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer group",
                            isSelected
                              ? "bg-primary/15 text-foreground border border-primary/30 shadow-xs"
                              : "hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground border border-transparent"
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={cn(
                                "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                isSelected
                                  ? "bg-primary text-white"
                                  : "bg-black/5 dark:bg-white/10 text-muted-foreground group-hover:text-foreground"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "text-sm font-semibold truncate",
                                    isSelected ? "text-primary" : "text-foreground"
                                  )}
                                >
                                  {item.title}
                                </span>
                                <span
                                  className={cn(
                                    "text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase",
                                    item.category === "Guide"
                                      ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                      : "bg-primary/10 text-primary border border-primary/20"
                                  )}
                                >
                                  {item.category}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground truncate max-w-md mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-3">
                            {isSelected && (
                              <span className="flex items-center gap-1 text-[11px] text-primary font-mono font-medium">
                                <span>Select</span>
                                <CornerDownLeft className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Footer with Keyboard Shortcuts */}
              <div className="px-4 py-3 bg-black/[0.03] dark:bg-white/[0.03] border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[10px]">↑</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[10px]">↓</kbd>
                    <span>to navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[10px]">↵</kbd>
                    <span>to select</span>
                  </span>
                </div>
                <span>{filteredSearchItems.length} results</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
