import type { Metadata } from "next";
import { Suspense } from "react";
import { GithubRepos, GithubReposSkeleton } from "@/components/github-repos";
import { PageIntro } from "@/components/page-intro";
import { ProjectFilter } from "@/components/project-filter";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Jerold Noynay: backend architecture, REST APIs, a disaster information system, a Laravel timetabling system, and HRIS payroll work.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro label="Projects" title="Work, briefly.">
        Short briefs of what I built and what I owned on each project. Full case studies will appear here as they
        are written and cleared for publishing.
      </PageIntro>
      <section aria-label="Project briefs" className="wrap pb-24">
        <ProjectFilter />
      </section>
      <section aria-labelledby="oss-title" className="wrap border-t border-line pt-10 pb-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 id="oss-title" className="text-title font-medium tracking-tight">
            Public repositories
          </h2>
          <p className="label">Live from GitHub · refreshed daily</p>
        </div>
        <Suspense fallback={<GithubReposSkeleton />}>
          <GithubRepos />
        </Suspense>
      </section>
    </>
  );
}
