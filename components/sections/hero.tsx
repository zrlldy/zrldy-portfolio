import Link from "next/link";
import { profile } from "@/content/profile";
import { ParticleField } from "../particle-field";
import { Portrait } from "../portrait";

const lines = [
  <>I build the</>,
  <>parts you</>,
  <>
    <em className="font-serif font-normal italic text-accent-ink">don&rsquo;t see.</em>
  </>,
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24">
      <ParticleField />
      <div className="wrap relative">
        <div className="label mb-10 flex justify-between fade-in md:mb-16">
          <span>Portfolio — 2026</span>
          <span>Cebu City, PH</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 flex flex-col">
            <h1 id="hero-title" className="text-title font-medium tracking-tight fade-in" style={{ "--i": 0 } as React.CSSProperties}>
              {profile.name} <span className="text-muted">— {profile.title}</span>
            </h1>

            <p className="mt-6 text-display font-semibold tracking-[-0.055em]" aria-label={profile.headline}>
              {lines.map((line, i) => (
                <span key={i} className="rise-line" aria-hidden="true">
                  <span style={{ "--i": i + 1 } as React.CSSProperties}>{line}</span>
                </span>
              ))}
            </p>

            <p className="mt-8 font-mono text-sm uppercase tracking-[0.12em] fade-in" style={{ "--i": 3 } as React.CSSProperties}>
              {profile.subline}
            </p>

            <div className="mt-auto grid gap-8 pt-10 md:grid-cols-2 md:items-end">
              <p className="max-w-md text-lg leading-relaxed text-muted fade-in" style={{ "--i": 4 } as React.CSSProperties}>
                {profile.intro}
              </p>
              <div className="flex flex-wrap gap-3 fade-in" style={{ "--i": 5 } as React.CSSProperties}>
                <Link href="/#work" className="btn btn-primary">
                  Explore projects <span aria-hidden="true">↓</span>
                </Link>
                <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                  Contact me
                </a>
                {profile.resumeUrl && (
                  <a href={profile.resumeUrl} className="btn btn-ghost" download>
                    Résumé
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 fade-in" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="mx-auto max-w-md lg:max-w-none">
              <Portrait />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
