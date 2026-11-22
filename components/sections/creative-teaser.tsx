import Link from "next/link";
import { disciplines } from "@/content/creative";
import { SectionHead } from "../section-head";

export function CreativeTeaser() {
  return (
    <section id="creative" aria-labelledby="creative-title" className="wrap scroll-mt-16 py-24 md:py-36">
      <SectionHead
        index="04"
        label="Creative"
        id="creative-title"
        title={
          <>
            Off the clock, I cut <em className="font-serif font-normal italic">frames</em>, not queries.
          </>
        }
      />
      <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {disciplines.map((d, i) => (
          <li key={d.name} data-reveal className="group relative flex aspect-[4/5] flex-col justify-between bg-paper p-6 sm:aspect-[3/4]">
            <span className="label">{String(i + 1).padStart(2, "0")}</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-6 top-1/2 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100"
            />
            <div>
              <h3 className="text-2xl font-medium tracking-tight">{d.name}</h3>
              <p className="mt-2 text-sm text-muted">{d.note}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4" data-reveal>
        <p className="label">Work samples are on the way</p>
        <Link href="/creative" className="btn btn-ghost">
          Creative work <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
