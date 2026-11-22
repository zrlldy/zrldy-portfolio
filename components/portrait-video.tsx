"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Hero portrait that plays a short clip while hovered (tap toggles it on touch screens).
// The clip loads only on first hover, so it costs nothing for visitors who never point at it.
export function PortraitVideo({ src, video, alt }: { src: string; video: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  const stop = () => {
    ref.current?.pause();
    setPlaying(false);
  };

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden bg-surface sm:aspect-[4/5]"
      onPointerEnter={(e) => e.pointerType === "mouse" && play()}
      onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
      onClick={() => (playing ? stop() : play())}
    >
      <Image src={src} alt={alt} fill priority sizes="(min-width: 640px) 280px, 100vw" className="object-cover object-[60%_62%] sm:object-center" />
      <video
        ref={ref}
        src={video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className={`absolute inset-0 size-full object-cover object-[60%_45%] transition-opacity duration-300 ease-[var(--ease-out)] ${playing ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
