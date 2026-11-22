import { Contact } from "@/components/sections/contact";
import { CreativeTeaser } from "@/components/sections/creative-teaser";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Github } from "@/components/sections/github";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <CreativeTeaser />
      <Education />
      <Github />
      <Contact />
    </div>
  );
}
