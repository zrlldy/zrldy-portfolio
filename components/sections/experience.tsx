import { experience } from "@/content/experience";
import { SectionHead } from "../section-head";

// Vertical rail: the current role gets a solid accent marker, past roles an outline.
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 pt-24">
      <SectionHead label="Experience" id="experience-title" />
      <ol className="relative ml-1 border-l border-line">
        {experience.map((r, i) => (
          <li key={r.title + r.org} className="relative pb-8 pl-6 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] top-1.5 size-[9px] border border-accent ${i === 0 ? "bg-accent" : "bg-paper"}`}
            />
            <p className="label">
              {r.period ?? "Internship"}, {r.location}
            </p>
            <h3 className="mt-1.5 font-medium">
              {r.title} <span className="font-normal text-muted">at {r.org}</span>
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.points[0]}.</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
