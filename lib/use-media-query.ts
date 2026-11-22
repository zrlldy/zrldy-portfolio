"use client";

import { useSyncExternalStore } from "react";

// false during SSR/hydration, then live. Every capability gate (cursor, 3D) starts "off" on the server.
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}
