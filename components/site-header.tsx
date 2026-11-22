import Link from "next/link";
import { headerLinks } from "@/content/navigation";
import { LocalClock, PaletteButton, ThemeToggle } from "./header-controls";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3 font-medium tracking-tight">
          <span aria-hidden="true" className="size-3 bg-accent transition-transform duration-300 group-hover:rotate-45" />
          Jerold Noynay
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {headerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted hover:text-ink transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden lg:block mr-3">
            <LocalClock />
          </span>
          <PaletteButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
