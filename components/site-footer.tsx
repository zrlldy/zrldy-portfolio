import Link from "next/link";
import { profile } from "@/content/profile";
import { TerminalButton } from "./terminal";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="label">© 2026 {profile.name}, {profile.location}</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <li>
            <a className="text-muted hover:text-ink" href={`mailto:${profile.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="text-muted hover:text-ink" href={profile.github} rel="me noopener" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <Link className="text-muted hover:text-ink" href="/projects">
              Projects
            </Link>
          </li>
          <li>
            <TerminalButton />
          </li>
        </ul>
      </div>
    </footer>
  );
}
