"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerLinks } from "@/content/navigation";

// Header links that mark the page you're on. Hash links (/#contact) are sections, never a page, so never active.
export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-8 text-sm lg:flex-col lg:items-start lg:gap-4 lg:text-base">
      {headerLinks.map((l) => {
        const active = !l.href.includes("#") && (pathname === l.href || pathname.startsWith(`${l.href}/`));
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={active ? "page" : undefined}
              className="text-muted underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:decoration-ink"
            >
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
