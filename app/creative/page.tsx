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
      <PageIntro title="Timing is a craft.">
        Away from backend work, I edit anime music videos, cut video, and build motion graphics. I care most about
        the restrained, precise motion Apple made famous.
      </PageIntro>

      <section aria-label="Disciplines" className="wrap pb-20">
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {disciplines.map((d) => (
            <li key={d.name} className="bg-paper p-6">
              <h2 className="text-xl font-medium tracking-tight">{d.name}</h2>
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
              <li key={p.videoId}>
                <VideoEmbed piece={p} />
                <p className="mt-4 font-medium">{p.title}</p>
                <p className="label mt-1">
                  {p.discipline} · {p.year}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-6 md:grid-cols-3" aria-label="Creative pieces coming soon">
            {[0, 1, 2].map((i) => (
              <li key={i} className="ticks grid aspect-video place-items-center border border-dashed border-line">
                <span className="label">Coming soon</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
