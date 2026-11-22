"use client";

import { useState } from "react";
import { categories, projects, type Category } from "@/content/projects";
import { ProjectBrief } from "./project-card";

export function ProjectFilter() {
  const [active, setActive] = useState<Category | null>(null);
  const shown = active ? projects.filter((p) => p.categories.includes(active)) : projects;

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2 pb-8">
        {[null, ...categories].map((c) => (
          <button
            key={c ?? "all"}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
          >
            {c ?? "All"}
            <span className="ml-2 font-mono text-xs opacity-60">
              {c ? projects.filter((p) => p.categories.includes(c)).length : projects.length}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {projects.length} projects
      </p>
      <div>
        {shown.map((p) => (
          <ProjectBrief key={p.slug} project={p} headingLevel={2} />
        ))}
      </div>
    </div>
  );
}
