import { getPublicRepos, type Repo } from "@/lib/github";
import { profile } from "@/content/profile";

function Fallback({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line p-8">
      <p className="text-muted">{message}</p>
      <a href={profile.github} target="_blank" rel="noopener" className="link mt-3 inline-block">
        View github.com/{profile.githubUser}
      </a>
    </div>
  );
}

export async function GithubRepos() {
  let repos: Repo[];
  try {
    repos = await getPublicRepos();
  } catch {
    return <Fallback message="GitHub is not responding right now, so live repositories can't be shown." />;
  }
  if (repos.length === 0) return <Fallback message="No public repositories to show yet." />;

  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      {repos.map((r) => (
        <li key={r.name} className="bg-paper">
          <a href={r.url} target="_blank" rel="noopener" className="group flex h-full flex-col gap-4 p-6 hover:bg-surface">
            <span className="flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-medium">{r.name}</span>
            </span>
            <span className="flex-1 text-sm text-muted">{r.description ?? "No description."}</span>
            <span className="label flex gap-4">
              {r.language && <span>{r.language}</span>}
              <span>{r.stars} {r.stars === 1 ? "star" : "stars"}</span>
              <span>Pushed {r.updated}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function GithubReposSkeleton() {
  return <div className="h-48 animate-pulse rounded-2xl border border-line bg-surface" aria-label="Loading repositories" />;
}
