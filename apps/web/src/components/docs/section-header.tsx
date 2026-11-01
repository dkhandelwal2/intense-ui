import React from "react";
import { cn } from "@/lib/utils";

export type SectionHeaderColorScheme =
  | "primary"
  | "emerald"
  | "blue"
  | "purple"
  | "amber"
  | "rose"
  | "indigo"
  | "zinc";

export interface SectionHeaderProps {
  icon: React.ElementType | React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  colorScheme?: SectionHeaderColorScheme;
}

const COLOR_VARIANTS: Record<SectionHeaderColorScheme, string> = {
  primary: "bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border-[var(--theme-primary)]/20",
  emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  rose: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  zinc: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

export function SectionHeader({
  icon,
  title,
  subtitle,
  badge,
  action,
  className,
  iconClassName,
  colorScheme = "primary",
}: SectionHeaderProps) {
  const badgeStyle = COLOR_VARIANTS[colorScheme] || COLOR_VARIANTS.primary;

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComp = icon as React.ElementType;
    return <IconComp className={cn("w-4 h-4", iconClassName)} />;
  };

  return (
    <div className={cn("flex items-center justify-between gap-3 w-full", className)}>
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={cn("p-1.5 rounded-lg border shadow-sm shrink-0 flex items-center justify-center", badgeStyle)}>
          {renderIcon()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider truncate">
              {title}
            </h4>
            {badge && (
              typeof badge === "string" ? (
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 uppercase tracking-wider shrink-0">
                  {badge}
                </span>
              ) : (
                badge
              )
            )}
          </div>
          {subtitle && (
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
