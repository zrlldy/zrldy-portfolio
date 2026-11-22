import { aiWorkflow, skillGroups, strongest } from "@/content/skills";
import { SectionHead } from "../section-head";
import { SkillsGraphIsland } from "../three/skills-graph-island";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="wrap scroll-mt-16 py-24 md:py-36">
      <SectionHead index="03" label="Skills" id="skills-title" title="The stack, as a system." />

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        {/* Accessible, always-rendered source of truth. The 3D graph is a desktop enhancement of this list. */}
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-5">
          {skillGroups.map((g) => (
            <div key={g.id} data-reveal>
              <dt className="label mb-3 border-b border-line pb-2">{g.label}</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className={`rounded-full border px-2.5 py-1 font-mono text-xs ${
                        s === strongest ? "border-accent bg-accent text-on-accent" : "border-line"
                      }`}
                    >
                      {s}
                      {s === strongest && <span className="sr-only"> (strongest)</span>}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <div className="lg:col-span-7">
          <SkillsGraphIsland />
        </div>
      </div>

      <div className="mt-24 grid gap-8 border-t border-line pt-10 md:grid-cols-12" data-reveal>
        <div className="md:col-span-4">
          <p className="label">How I work with AI</p>
          <h3 className="mt-3 text-title font-medium tracking-tight">An emerging, AI-native workflow.</h3>
          <p className="mt-4 text-muted leading-relaxed">
            I&rsquo;m exploring how AI coding agents fit into real engineering. The architecture and the rules stay
            mine. The agents work inside them.
          </p>
        </div>
        <ol className="md:col-span-7 md:col-start-6 divide-y divide-line border-y border-line">
          {aiWorkflow.map((step, i) => (
            <li key={step} className="flex items-baseline gap-6 py-4">
              <span className="font-mono text-xs text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-lg">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
