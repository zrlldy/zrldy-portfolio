import { education } from "@/content/profile";
import { SectionHead } from "../section-head";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="scroll-mt-20 pt-24">
      <SectionHead label="Education" id="education-title" />
      <div className="border-t border-line pt-6">
        <h3 className="font-medium">{education.degree}</h3>
        <p className="label mt-1">
          {education.institution}, class of {education.year}
        </p>
      </div>
    </section>
  );
}
