import { Contact } from "@/components/sections/contact";
import { CreativeTeaser } from "@/components/sections/creative-teaser";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <CreativeTeaser />
      <Education />
      <Contact />
    </>
  );
}
