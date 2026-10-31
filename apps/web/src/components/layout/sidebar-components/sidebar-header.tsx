"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PanelLeftClose } from "lucide-react";

interface SidebarHeaderProps {
  onClick?: () => void;
  onToggleCollapse?: () => void;
}

export function SidebarHeader({ onClick, onToggleCollapse }: SidebarHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="shrink-0 px-3.5 pb-2"
    >
      <div className="flex items-center pt-1 w-full">
        <Link
          href="/"
          onClick={onClick}
          className="flex items-center group cursor-pointer"
          title="Intense UI"
        >
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <div className="w-8 h-8 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
              <Image
                src="/logo-icon.png"
                alt="Intense UI"
                width={22}
                height={22}
                className="w-5 h-5 object-contain"
                priority
                unoptimized
              />
            </div>
          </div>
        </Link>

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="ml-auto text-zinc-500 hover:text-zinc-900 dark:hover:text-white p-1.5 rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            title="Toggle sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
