export function PageIntro({ label, title, children }: { label: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="wrap pt-32 pb-16 md:pt-44 md:pb-24">
      <p className="label fade-in">{label}</p>
      <h1 className="mt-6 max-w-5xl text-headline font-medium tracking-[-0.035em]">
        <span className="rise-line">
          <span>{title}</span>
        </span>
      </h1>
      {children && (
        <div className="mt-8 max-w-2xl text-lg leading-relaxed text-muted fade-in" style={{ "--i": 2 } as React.CSSProperties}>
          {children}
        </div>
      )}
    </header>
  );
}
