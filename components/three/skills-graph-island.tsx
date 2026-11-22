"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

// three.js only downloads on desktop-class devices with motion allowed, once the section is near view.
const SkillsGraph = dynamic(() => import("./skills-graph"), { ssr: false });

export function SkillsGraphIsland() {
  const box = useRef<HTMLDivElement>(null);
  const capable = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  );
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!capable || !box.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(box.current);
    return () => io.disconnect();
  }, [capable]);

  return (
    <div ref={box} className="ticks relative hidden aspect-[7/6] w-full bg-surface lg:block" aria-hidden="true">
      {capable ? (
        near && <SkillsGraph active={visible} />
      ) : (
        <p className="label absolute inset-0 grid place-items-center p-8 text-center">
          The interactive graph is paused because reduced motion is on. The full list is beside this.
        </p>
      )}
    </div>
  );
}
