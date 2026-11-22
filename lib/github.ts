import { cacheLife } from "next/cache";
import { profile } from "@/content/profile";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  updated: string;
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
};

// Public, unauthenticated API: only public repos are ever returned. Cached ~24h.
// Throws on failure so an error is never cached; callers render a fallback.
export async function getPublicRepos(): Promise<Repo[]> {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 86_400, expire: 604_800 });

  const res = await fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=100`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" },
  });
  if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
  const data = (await res.json()) as ApiRepo[];

  return data
    .filter((r) => !r.private && !r.fork && !r.archived)
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      updated: r.pushed_at.slice(0, 10),
    }));
}
