import Link from "next/link";

export function SectionHead({ label, id }: { label: string; id: string }) {
  return (
    <h2 id={id} className="mb-6 text-xl font-medium tracking-[-0.02em]">
      {label}
    </h2>
  );
}

// Trailing "more" link at the bottom of a section.
export function SectionMore({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className="label mt-5 inline-block underline underline-offset-4 transition-colors hover:!text-accent-ink"
      {...(external && { target: "_blank", rel: "noopener" })}
    >
      {children}
    </Link>
  );
}
