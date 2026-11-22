"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// One scroll-motion controller for every page: elements opt in with data attributes.
//   data-reveal              fades/rises in once when scrolled into view
//   data-parallax="12"       drifts by N% of its height while its section scrolls past
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    // Next frame: let the page segment finish hydrating before GSAP writes inline styles.
    const ctx = gsap.context(() => {});
    const raf = requestAnimationFrame(() => ctx.add(() => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, overwrite: true },
          ),
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 10;
        gsap.fromTo(
          el,
          { yPercent: amount },
          {
            yPercent: -amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }));

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
