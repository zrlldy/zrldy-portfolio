import { Suspense } from "react";
import { profile } from "@/content/profile";
import { getPublicRepos } from "@/lib/github";
import { SectionHead, SectionMore } from "../section-head";

async function Repos() {
  const repos = await getPublicRepos().catch(() => null);
  if (!repos?.length) return <p className="text-sm text-muted">Repositories can&rsquo;t be shown right now.</p>;
  return (
    <ul className="border-t border-line">
      {repos.slice(0, 4).map((r) => (
        <li key={r.name} className="border-b border-line">
          <a href={r.url} target="_blank" rel="noopener" className="group grid gap-1 py-3.5 sm:grid-cols-[1fr_auto] sm:gap-6">
            <span className="min-w-0">
              <span className="font-mono text-sm transition-colors group-hover:text-accent-ink">{r.name}</span>
              <span className="mt-0.5 block truncate text-sm text-muted">{r.description ?? "No description."}</span>
            </span>
            <span className="flex gap-3 text-sm text-muted tabular-nums sm:pt-0.5">
              {r.language && <span>{r.language}</span>}
              <span>{r.stars} {r.stars === 1 ? "star" : "stars"}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Github() {
  return (
    <section id="github" aria-labelledby="github-title" className="scroll-mt-20 pt-24">
      <SectionHead label="Open source" id="github-title" />
      <Suspense fallback={<div className="h-40 animate-pulse rounded-md bg-surface" aria-label="Loading repositories" />}>
        <Repos />
      </Suspense>
      <SectionMore href={profile.github}>github.com/{profile.githubUser}</SectionMore>
    </section>
  );
}
