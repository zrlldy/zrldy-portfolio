import { PortraitVideo } from "@/components/portrait-video";
import { education, profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";

const links = [
  ["github", profile.github],
  profile.linkedin && ["linkedin", profile.linkedin],
  ["email", `mailto:${profile.email}`],
  profile.resumeUrl && ["résumé", profile.resumeUrl],
].filter(Boolean) as [string, string][];

// Spec-sheet readout: the site's "instrument panel" voice.
const spec = [
  ["Role", experience[0].title],
  ["Degree", `BS IT, ${education.year}`],
  ["Shipped", `${projects.length} systems`],
  ["Base", profile.location],
];

// A plain word in the bio that opens onto the real stack behind it: the parts you don't see.
// The tooltip anchors to the bio block (not the word) so it never runs off a phone screen.
function Term({ group, children }: { group: string; children: React.ReactNode }) {
  const items = skillGroups.find((g) => g.id === group)?.items ?? [];
  const id = `term-${group}`;
  return (
    <span className="group/term inline-block">
      <button
        type="button"
        aria-describedby={id}
        className="cursor-help font-medium text-ink underline decoration-muted decoration-dotted decoration-1 underline-offset-[5px] transition-colors hover:decoration-ink focus-visible:decoration-ink"
      >
        {children}
      </button>
      <span
        id={id}
        role="tooltip"
        className="invisible absolute left-0 top-full z-10 mt-2 w-full translate-y-1 rounded-md bg-ink px-3 py-2 text-sm leading-snug text-paper opacity-0 transition-[opacity,transform,visibility] duration-150 ease-[var(--ease-out)] group-focus-within/term:visible group-focus-within/term:translate-y-0 group-focus-within/term:opacity-100 group-hover/term:visible group-hover/term:translate-y-0 group-hover/term:opacity-100"
      >
        {items.join(", ")}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-28 md:pt-40">
      <div className="grid items-end gap-10 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:gap-12">
        <div className="fade-in @container" style={{ "--i": 0 } as React.CSSProperties}>
          <h1
            id="hero-title"
            className="whitespace-nowrap text-[min(14cqi,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em]"
          >
            {profile.name}
          </h1>
          <div className="relative mt-8 max-w-lg space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I&rsquo;m a <Term group="backend">backend developer</Term> who loves figuring out how things work. I build{" "}
              <Term group="lang">web applications</Term> and design <Term group="data">systems</Term>.
            </p>
            <p>
              Lately I&rsquo;m exploring <Term group="ai">AI</Term> and{" "}
              <Term group="core">system architecture</Term>, and always experimenting with something new.
            </p>
          </div>
          <p className="label mt-4">Hover or tap the dotted words for the stack behind them.</p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {links.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                  {...(href.startsWith("http") && { target: "_blank", rel: "noopener" })}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <figure className="fade-in max-w-[16rem] sm:max-w-none" style={{ "--i": 1 } as React.CSSProperties}>
          {profile.portrait && (
            <PortraitVideo src={profile.portrait} video="/videos/portrait.mp4" alt={`Portrait of ${profile.name}`} />
          )}
        </figure>
      </div>

      <dl className="mt-14 grid gap-x-8 border-t border-line pt-5 text-sm tabular-nums sm:grid-cols-2 fade-in" style={{ "--i": 2 } as React.CSSProperties}>
        {spec.map(([k, v]) => (
          <div key={k} className="flex gap-4 border-b border-dashed border-line py-2">
            <dt className="w-16 shrink-0 text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
