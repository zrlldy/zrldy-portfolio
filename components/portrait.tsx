"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/content/profile";

// 4:5 portrait frame with a subtle pointer tilt. Shows a labeled placeholder until profile.portrait is set.
export function Portrait() {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 8);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
    };
    const reset = () => (rx(0), ry(0));
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <figure className="[perspective:1200px]">
      <div
        ref={frame}
        data-cursor
        className="ticks group relative aspect-[4/5] w-full overflow-hidden bg-surface [transform-style:preserve-3d]"
      >
        {profile.portrait ? (
          <Image
            src={profile.portrait}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 38vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center border border-line">
            <span aria-hidden="true" className="font-serif text-[clamp(6rem,14vw,12rem)] italic leading-none text-line">
              JN
            </span>
            <span className="label absolute bottom-4 left-4">Portrait · placeholder · 4:5</span>
          </div>
        )}
        {/* "The parts you don't see": a schematic layer that surfaces on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          <div className="absolute inset-x-0 top-1/3 border-t border-dashed border-accent" />
          <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-accent" />
          <span className="label absolute right-3 top-3 bg-paper px-1.5 text-accent-ink">fig. 01</span>
          <span className="label absolute left-[calc(50%+8px)] top-[calc(33%+8px)] bg-paper px-1.5">10.31°N 123.89°E</span>
        </div>
      </div>
      <figcaption className="label mt-3 flex justify-between">
        <span>{profile.name}</span>
        <span>Cebu City, PH</span>
      </figcaption>
    </figure>
  );
}
