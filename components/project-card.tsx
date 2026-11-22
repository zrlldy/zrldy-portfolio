import type { Project } from "@/content/projects";

// Project Brief (see GLOSSARY.md): verified facts only.
export function ProjectBrief({
  project,
  headingLevel = 3,
}: {
  project: Project;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <article
      id={project.slug}
      className="group grid scroll-mt-24 gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8"
    >
      <div className="md:col-span-3 flex md:flex-col justify-between gap-2">
        <span className="label">{project.context}</span>
      </div>
      <div className="md:col-span-5">
        <H className="text-title font-medium tracking-tight transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2">
          {project.title}
        </H>
        <p className="label mt-2">{project.kind}</p>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">{project.summary}</p>
      </div>
      <div className="md:col-span-4 grid gap-6 text-sm">
        <div>
          <p className="label mb-2">Contribution</p>
          <ul className="space-y-1.5">
            {project.contributions.map((c) => (
              <li key={c} className="flex gap-2">
                <span aria-hidden="true" className="text-accent-ink">→</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        {project.features && (
          <div>
            <p className="label mb-2">Scope</p>
            <p className="text-muted">{project.features.join(" · ")}</p>
          </div>
        )}
        {project.stack && (
          <ul aria-label="Stack" className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-xs">
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
