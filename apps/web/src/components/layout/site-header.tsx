import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Code, MessageSquare } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandMenu } from "@/components/command-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-14 items-center px-4 sm:px-6 md:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <Image src="/logo-light.webp" alt={siteConfig.name} width={240} height={68} className="h-6 w-auto dark:hidden" unoptimized />
          <Image src="/logo-dark.webp" alt={siteConfig.name} width={240} height={68} className="h-6 w-auto hidden dark:block" unoptimized />
        </Link>
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo-light.webp" alt={siteConfig.name} width={280} height={80} className="h-7 w-auto hidden sm:block dark:hidden" unoptimized />
            <Image src="/logo-dark.webp" alt={siteConfig.name} width={280} height={80} className="h-7 w-auto hidden dark:sm:block" unoptimized />
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Documentation
            </Link>
            <Link
              href="/components"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Components
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center gap-2">
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9">
                <Code className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9">
                <MessageSquare className="h-4 w-4 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
