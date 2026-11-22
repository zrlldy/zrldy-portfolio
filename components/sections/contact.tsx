import { profile } from "@/content/profile";
import { SectionHead } from "../section-head";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 pt-24 pb-28">
      <SectionHead label="Contact" id="contact-title" />
      <p className="text-[clamp(1.5rem,3.4vw,2.25rem)] font-medium leading-tight tracking-[-0.03em]">
        Have a system that needs building? <span className="text-muted">Let&rsquo;s talk.</span>
      </p>
      <a href={`mailto:${profile.email}`} className="group mt-5 inline-block break-all">
        {profile.email}
        <span className="mt-1 block h-0.5 origin-left scale-x-[0.2] bg-accent transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100" />
      </a>
    </section>
  );
}
