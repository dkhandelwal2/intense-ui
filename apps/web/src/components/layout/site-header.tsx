"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Logo,
  HeaderNav,
  HeaderActions,
  HeaderSearchDialog,
  HeaderMobileMenu,
  useHeaderScroll,
} from "./header-components";

export { Logo, type LogoProps } from "./header-components";

/**
 * SiteHeader: Floating dynamic-island navigation header orchestrator
 */
export function SiteHeader() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const {
    isScrolled,
    headerMaxWidth,
    navOpacity,
    navScale,
    navX,
    navPointerEvents,
    desktopHamburgerWidth,
    desktopHamburgerOpacity,
    desktopHamburgerScale,
    desktopHamburgerMarginLeft,
    desktopHamburgerPointerEvents,
  } = useHeaderScroll();

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

  const handleNavigate = (href: string) => {
    handleCloseMenu();
    setIsSearchOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* ─── 0. EDGE-TO-EDGE TRANSPARENT BLUR AREA BEHIND HEADER ─── */}
      <div
        className="fixed top-0 left-0 right-0 h-20 z-[60] pointer-events-none backdrop-blur-[2px] bg-transparent"
        style={{
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
        aria-hidden="true"
      />

      {/* ─── 1. FIXED FLOATING HEADER BAR ─── */}
      <header className="fixed top-0 left-0 right-0 z-[70] pointer-events-none pt-3 px-4 sm:px-6 md:px-8 flex justify-center">
        <div className="w-full max-w-7xl relative flex justify-center">
          <motion.div
            initial={false}
            style={{
              maxWidth: isMenuOpen ? 820 : headerMaxWidth,
            }}
            className={cn(
              "w-full h-14 rounded-full flex items-center justify-between px-5 sm:px-6 pointer-events-auto backdrop-blur-2xl relative border transition-all duration-300 will-change-[max-width] max-lg:!max-w-full",
              isScrolled || isMenuOpen
                ? "bg-white/95 dark:bg-[#121215]/98 border-black/[0.08] dark:border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.05),0_12px_36px_-6px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95),0_1px_0_0_rgba(255,255,255,0.25)_inset,0_0_30px_0_rgba(255,255,255,0.05)]"
                : "bg-background/80 dark:bg-[#0c0c0e]/80 border-transparent shadow-none"
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

            {/* Center: Navigation Menu Tabs (Desktop lg:) */}
            <HeaderNav
              isMenuOpen={isMenuOpen}
              navOpacity={navOpacity}
              navScale={navScale}
              navX={navX}
              navPointerEvents={navPointerEvents}
            />

            {/* Right side: Search, GitHub, Theme, and Hamburger buttons */}
            <HeaderActions
              isMenuOpen={isMenuOpen}
              isMenuClosing={isMenuClosing}
              onOpenSearch={() => {
                if (isMenuOpen) handleCloseMenu();
                setIsSearchOpen(true);
              }}
              onToggleMenu={handleToggleMenu}
              desktopHamburgerWidth={desktopHamburgerWidth}
              desktopHamburgerOpacity={desktopHamburgerOpacity}
              desktopHamburgerScale={desktopHamburgerScale}
              desktopHamburgerMarginLeft={desktopHamburgerMarginLeft}
              desktopHamburgerPointerEvents={desktopHamburgerPointerEvents}
            />
          </motion.div>
        </div>
      </header>

      {/* ─── 2. FULL SCREEN CENTERED MENU OVERLAY ─── */}
      <HeaderMobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />

      {/* ─── 3. INTERACTIVE SEARCH COMMAND DIALOG MODAL ─── */}
      <HeaderSearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </>
  );
}
