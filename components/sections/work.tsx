import Link from "next/link";
import { projects } from "@/content/projects";
import { SectionHead } from "../section-head";
import { ProjectBrief } from "../project-card";

export function Work() {
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" aria-labelledby="work-title" className="wrap scroll-mt-16 py-24 md:py-36">
      <SectionHead index="01" label="Selected work" id="work-title" title="Systems I've helped build." />

      {/* Featured brief: editorial treatment, general content only */}
      <article
        id="featured"
        className="relative mt-16 overflow-hidden rounded-3xl bg-ink px-6 py-12 text-paper md:mt-24 md:px-14 md:py-20"
      >
        {/* GSAP may set inline transform before this segment hydrates; decorative only. */}
        <div
          aria-hidden="true"
          data-parallax="12"
          suppressHydrationWarning
          className="pointer-events-none absolute -right-4 bottom-0 select-none font-semibold leading-none tracking-[-0.06em] text-paper/[0.07] text-[clamp(8rem,28vw,26rem)]"
        >
          {featured.code}
        </div>
        <div className="relative grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label !text-paper/60" data-reveal>
              Featured · {featured.context}
            </p>
            <h3 className="mt-6 text-headline font-medium tracking-[-0.03em]" data-reveal>
              {featured.title}
            </h3>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75" data-reveal>
              {featured.summary}
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 self-end" data-reveal>
            <p className="label !text-paper/60 mb-4">My focus</p>
            <ol className="divide-y divide-paper/15 border-y border-paper/15">
              {featured.contributions.map((c, i) => (
                <li key={c} className="flex gap-4 py-3">
                  <span className="font-mono text-xs text-accent-inverse pt-1">{String(i + 1).padStart(2, "0")}</span>
                  {c}
                </li>
              ))}
            </ol>
            <ul className="mt-6 flex flex-wrap gap-2">
              {featured.categories.map((c) => (
                <li key={c} className="rounded-full border border-paper/25 px-3 py-1 text-xs">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <div className="mt-16">
        {rest.map((p, i) => (
          <ProjectBrief key={p.slug} project={p} index={i + 1} />
        ))}
      </div>

      <div className="mt-6 border-t border-line pt-8" data-reveal>
        <Link href="/projects" className="btn btn-ghost">
          All projects &amp; open source <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
