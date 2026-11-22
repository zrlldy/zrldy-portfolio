import Link from "next/link";
import { projects } from "@/content/projects";
import { SectionHead, SectionMore } from "../section-head";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 pt-24">
      <SectionHead label="Selected work" id="work-title" />
      <ul className="border-t border-line">
        {projects.map((p) => (
          <li key={p.slug} className="border-b border-line">
            <Link href={`/projects#${p.slug}`} className="group grid grid-cols-[3.25rem_1fr] gap-x-4 py-5 sm:grid-cols-[4rem_1fr_auto]">
              <span className="text-sm leading-6 tabular-nums text-accent-ink">{p.code}</span>
              <span className="min-w-0">
                <span className="block font-medium transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1">
                  {p.title}
                </span>
                <span className="mt-1 block text-sm text-muted">{p.kind}</span>
              </span>
              <span className="col-start-2 mt-2 text-sm text-muted sm:col-start-auto sm:mt-0 sm:pt-1 sm:text-right">
                {p.context}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <SectionMore href="/projects">All projects &amp; open source</SectionMore>
    </section>
  );
}
