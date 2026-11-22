import { experience } from "@/content/experience";
import { SectionHead } from "../section-head";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="wrap scroll-mt-16 py-24 md:py-36">
      <SectionHead index="02" label="Experience" id="experience-title" title="Where I've worked." />
      <ol className="mt-16">
        {experience.map((r) => (
          <li key={r.title + r.org} data-reveal className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="label">{r.period ?? "Internship"}</p>
              <p className="label mt-1">{r.location}</p>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-title font-medium tracking-tight">{r.title}</h3>
              <p className="mt-1 text-muted">{r.org}</p>
            </div>
            <ul className="md:col-span-5 space-y-2 text-[0.9375rem] leading-relaxed">
              {r.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
