import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { education, profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jerold Noynay: a backend developer from Cebu City, Philippines, an IT graduate of Cebu Technological University, and a motion graphics hobbyist.",
  alternates: { canonical: "/about" },
};

const facts = [
  ["Role", `${profile.title}, Logistics Company`],
  ["Based in", profile.location],
  ["Education", `BS Information Technology, ${education.year}`],
  ["Programming", "2+ years of learning and building"],
  ["Heading toward", "AI software engineering"],
];

export default function AboutPage() {
  const [lead, ...rest] = profile.about;
  return (
    <>
      <PageIntro title="Curious about what happens underneath." />
      <div className="wrap grid gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed">
          <p className="text-title font-medium tracking-tight">
            {lead}
          </p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)} className="text-muted">
              {p}
            </p>
          ))}
          <div className="flex flex-wrap gap-3 pt-6">
            <Link href="/projects" className="btn btn-primary">
              See the projects
            </Link>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              Say hello
            </a>
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9" aria-label="Quick facts">
          <dl className="sticky top-28 border-t border-line">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-4 text-sm">
                <dt className="label pt-0.5">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </>
  );
}
