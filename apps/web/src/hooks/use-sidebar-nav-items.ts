import * as React from "react";
import { BookOpen, Terminal } from "lucide-react";
import { siteConfig } from "@/config/site";
import { componentsConfig } from "@/config/components";
import { getComponentIcon } from "@/config/component-icons";

export interface SidebarNavItemData {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
  badge?: string;
  badgeColor?: string;
}

export function useSidebarNavItems() {
  const gettingStartedItems: SidebarNavItemData[] = React.useMemo(
    () => [
      { title: "Documentation", href: siteConfig.routes.DOCS, icon: BookOpen },
      { title: "Installation", href: siteConfig.routes.INSTALLATION, icon: Terminal },
    ],
    []
  );

  const componentItems: SidebarNavItemData[] = React.useMemo(() => {
    return componentsConfig
      .filter((c) => c.enabled)
      .map((c) => {
        const Icon = getComponentIcon(c.slug);
        const badgeInfo = siteConfig.sidebar.showBadges
          ? siteConfig.sidebar.componentBadges[c.slug]
          : undefined;

        return {
          title: c.name,
          href: c.href,
          icon: Icon,
          badge: badgeInfo?.badge,
          badgeColor: badgeInfo?.color,
        };
      });
  }, []);

  return { gettingStartedItems, componentItems };
}
