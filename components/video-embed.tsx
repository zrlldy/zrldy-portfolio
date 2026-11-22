"use client";

import { useState } from "react";
import type { CreativePiece } from "@/content/creative";

// Click-to-load: no third-party player (or its tracking) loads until the visitor asks for it.
export function VideoEmbed({ piece }: { piece: CreativePiece }) {
  const [playing, setPlaying] = useState(false);
  const src =
    piece.platform === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${piece.videoId}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${piece.videoId}?autoplay=1&dnt=1`;

  return (
    <div className="ticks relative aspect-video overflow-hidden bg-ink">
      {playing ? (
        <iframe
          src={src}
          title={piece.title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 grid place-items-center text-paper"
          aria-label={`Play ${piece.title} (loads ${piece.platform === "youtube" ? "YouTube" : "Vimeo"})`}
        >
          <span className="grid size-16 place-items-center rounded-full bg-accent-ink text-on-accent transition-transform group-hover:scale-110">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="ml-0.5 size-5 fill-current">
              <path d="M4 2.5v11l9.5-5.5z" />
            </svg>
          </span>
          <span className="label absolute bottom-4 left-4 !text-paper/70">Loads {piece.platform} on click</span>
        </button>
      )}
    </div>
  );
}
