export function SectionHead({ index, label, title, id }: { index: string; label: string; title: React.ReactNode; id: string }) {
  return (
    <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-12">
      <p className="label md:col-span-3" data-reveal>
        <span className="text-accent-ink">{index}</span> / {label}
      </p>
      <h2 id={id} className="text-headline font-medium tracking-[-0.03em] md:col-span-9" data-reveal>
        {title}
      </h2>
    </div>
  );
}
