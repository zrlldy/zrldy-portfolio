import { education } from "@/content/profile";
import { SectionHead } from "../section-head";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="wrap scroll-mt-16 py-24 md:py-36">
      <SectionHead index="05" label="Education" id="education-title" title="Where the foundations came from." />
      <div className="mt-16 grid items-end gap-10 md:grid-cols-12" data-reveal>
        <p className="md:col-span-6 font-serif text-[clamp(4rem,11vw,10rem)] italic leading-[0.85] tracking-tight text-accent-ink">
          {education.distinction}
        </p>
        <div className="md:col-span-5 md:col-start-8 border-t border-line pt-6">
          <p className="label">Class of {education.year}</p>
          <h3 className="mt-3 text-title font-medium tracking-tight">{education.degree}</h3>
          <p className="mt-3 text-muted">
            {education.institution}
            <br />
            {education.campus}
          </p>
        </div>
      </div>
    </section>
  );
}
