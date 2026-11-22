import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { VideoEmbed } from "@/components/video-embed";
import { creativePieces, disciplines } from "@/content/creative";

export const metadata: Metadata = {
  title: "Creative work",
  description:
    "Jerold Noynay's creative side: anime music videos, video editing, and Apple-inspired motion graphics.",
  alternates: { canonical: "/creative" },
};

export default function CreativePage() {
  return (
    <>
      <PageIntro label="Creative" title={<>Timing is a <em className="font-serif font-normal italic">craft</em>.</>}>
        Away from backend work, I edit anime music videos, cut video, and build motion graphics. I care most about
        the restrained, precise motion Apple made famous. The same eye for structure, applied to frames.
      </PageIntro>

      <section aria-label="Disciplines" className="wrap pb-20">
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {disciplines.map((d, i) => (
            <li key={d.name} className="bg-paper p-6" data-reveal>
              <span className="label text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-8 text-xl font-medium tracking-tight">{d.name}</h2>
              <p className="mt-2 text-sm text-muted">{d.note}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="gallery-title" className="wrap border-t border-line pt-10 pb-32">
        <h2 id="gallery-title" className="mb-10 text-title font-medium tracking-tight">
          Selected pieces
        </h2>
        {creativePieces.length > 0 ? (
          <ul className="grid gap-10 md:grid-cols-2">
            {creativePieces.map((p) => (
              <li key={p.videoId} data-reveal>
                <VideoEmbed piece={p} />
                <p className="mt-4 font-medium">{p.title}</p>
                <p className="label mt-1">
                  {p.discipline} · {p.year}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-6 md:grid-cols-3" aria-label="Placeholders: creative pieces coming soon">
            {[0, 1, 2].map((i) => (
              <li key={i} className="ticks grid aspect-video place-items-center border border-dashed border-line" data-reveal>
                <span className="label">Placeholder · piece {String(i + 1).padStart(2, "0")} coming soon</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
