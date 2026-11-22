import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 bg-ink py-24 text-paper md:py-36">
      <div className="wrap">
        <p className="label !text-paper/60" data-reveal>
          <span className="text-accent-inverse">06</span> / Contact
        </p>
        <h2 id="contact-title" className="mt-6 max-w-4xl text-headline font-medium tracking-[-0.03em]" data-reveal>
          Have a system that needs building? Let&rsquo;s talk.
        </h2>
        <a
          href={`mailto:${profile.email}`}
          data-reveal
          className="group mt-14 inline-block break-all text-[clamp(1.5rem,5vw,4.5rem)] font-medium tracking-tight"
        >
          {profile.email}
          <span className="block h-[3px] origin-left scale-x-[0.15] bg-accent transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100" />
        </a>
        <dl className="mt-16 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-3" data-reveal>
          <div>
            <dt className="label !text-paper/60">Preferred</dt>
            <dd className="mt-2">Email</dd>
          </div>
          <div>
            <dt className="label !text-paper/60">Elsewhere</dt>
            <dd className="mt-2">
              <a href={profile.github} target="_blank" rel="me noopener" className="underline underline-offset-4 hover:text-accent-inverse">
                github.com/{profile.githubUser}
              </a>
            </dd>
          </div>
          <div>
            <dt className="label !text-paper/60">Based in</dt>
            <dd className="mt-2">{profile.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
