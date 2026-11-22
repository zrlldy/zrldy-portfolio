import { disciplines } from "@/content/creative";
import { SectionHead, SectionMore } from "../section-head";

export function CreativeTeaser() {
  return (
    <section id="creative" aria-labelledby="creative-title" className="scroll-mt-20 pt-24">
      <SectionHead label="Off the clock" id="creative-title" />
      <p className="max-w-lg text-lg leading-snug tracking-tight">
        Outside of code, I edit video: same obsession with timing, different
        medium.
      </p>
      <ul className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {disciplines.map((d) => (
          <li key={d.name} className="group relative bg-paper p-5">
            <h3 className="font-medium">{d.name}</h3>
            <p className="mt-1 text-sm text-muted">{d.note}</p>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100"
            />
          </li>
        ))}
      </ul>
      <SectionMore href="/creative">Creative work</SectionMore>
    </section>
  );
}
