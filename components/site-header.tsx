import Link from "next/link";
import { NavLinks } from "./nav-links";
import { profile } from "@/content/profile";
import { PaletteButton, ThemeToggle } from "./header-controls";
import { TerminalButton } from "./terminal";

// Top bar on phones and tablets; a fixed left sidebar from lg up (the body is padded to match in layout.tsx).
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 [view-transition-name:site-header] border-b border-line bg-paper lg:inset-y-0 lg:right-auto lg:w-56 lg:border-b-0 lg:border-r">
      <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-full lg:max-w-none lg:flex-col lg:items-start lg:justify-start lg:px-8 lg:py-8">
        <Link href="/" className="font-medium tracking-tight">
          Jerold Noynay
        </Link>
        {/* Below lg: one top bar (nav, search, theme). From lg: sidebar holds nav, shortcut hints and an email line; search + theme move to a top bar over the content. */}
        <div className="flex items-center gap-2 lg:mt-8 lg:w-full lg:flex-1 lg:flex-col lg:items-start lg:gap-0">
          <nav aria-label="Primary" className="mr-6 hidden md:block lg:mr-0">
            <NavLinks />
          </nav>
          <div className="hidden space-y-6 lg:mt-auto lg:block">
            <ul className="label space-y-3">
              <li>
                <kbd className="kbd">⌘K</kbd> or{" "}
                <kbd className="kbd">Ctrl K</kbd> to search pages and projects
              </li>
              <li>
                <TerminalButton /> then ask it something: try{" "}
                <code className="text-ink">whoami</code> or{" "}
                <code className="text-ink">help</code>
              </li>
            </ul>
            <p className="label">
              To inquire, just email
              <a
                href={`mailto:${profile.email}`}
                className="mt-1 block break-all text-xs text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                {profile.email}
              </a>
            </p>
          </div>
          <div className="flex items-center gap-2 lg:fixed lg:inset-x-0 lg:top-0 lg:left-56 lg:h-16 lg:justify-end lg:border-b lg:border-line lg:bg-paper lg:px-8">
            <PaletteButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
