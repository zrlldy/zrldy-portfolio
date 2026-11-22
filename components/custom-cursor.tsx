"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/use-media-query";
import gsap from "gsap";

const INTERACTIVE = "a, button, input, [role='option'], [data-cursor]";

// Desktop-only companion cursor. The native cursor stays visible, so nothing is lost if this lags or fails.
export function CustomCursor() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = dot.current;
    const r = ring.current;
    const rx = gsap.quickTo(r, "x", { duration: reduced ? 0 : 0.35, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: reduced ? 0 : 0.35, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      d.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      rx(e.clientX - 18);
      ry(e.clientY - 18);
      d.style.opacity = r.style.opacity = "1";
      const hot = (e.target as Element | null)?.closest?.(INTERACTIVE);
      r.dataset.hot = hot ? "1" : "";
    };
    const hide = () => (d.style.opacity = r.style.opacity = "0");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} aria-hidden="true" className="cursor-ring size-9 border border-ink opacity-0 transition-[scale,background-color,border-color] duration-200 data-[hot=1]:scale-150 data-[hot=1]:border-accent" />
      <div ref={dot} aria-hidden="true" className="cursor-dot size-1.5 bg-accent opacity-0" />
    </>
  );
}
