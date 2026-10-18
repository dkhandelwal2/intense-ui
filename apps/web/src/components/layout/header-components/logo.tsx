"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Standard brand Logo component for Intense UI
 */
export function Logo({ className, onClick }: LogoProps) {
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
