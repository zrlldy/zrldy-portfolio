import { skillGroups, strongest } from "@/content/skills";
import { SectionHead } from "../section-head";

// Grouped like a spec sheet: group name on the left, tools on the right.
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 pt-24">
      <SectionHead label="Toolkit" id="skills-title" />
      <dl className="border-t border-line">
        {skillGroups.map((g) => (
          <div key={g.id} className="grid gap-2 border-b border-line py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="text-sm leading-6 text-muted">{g.label}</dt>
            <dd className="text-sm leading-6">
              {g.items.map((s, i) => (
                <span key={s}>
                  {s === strongest ? (
                    <>
                      <strong className="font-medium text-accent-ink">{s}</strong>
                      <span className="sr-only"> (strongest)</span>
                    </>
                  ) : (
                    s
                  )}
                  {i < g.items.length - 1 && <span aria-hidden="true" className="text-line"> / </span>}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
