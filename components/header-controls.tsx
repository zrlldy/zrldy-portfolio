"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { currentTheme, openPalette, toggleTheme, type Theme } from "@/lib/theme";

const subscribeTheme = (cb: () => void) => {
  window.addEventListener("themechange", cb);
  const mq = matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => {
    window.removeEventListener("themechange", cb);
    mq.removeEventListener("change", cb);
  };
};

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, currentTheme, () => null);

  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme ? `Switch to ${next} theme` : "Toggle theme"}
      className="grid size-11 place-items-center rounded-full border border-line hover:border-ink transition-colors"
    >
      {/* Half-filled disc: the fill side flips with the theme */}
      <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2a8 8 0 0 1 0 16z" fill="currentColor" />
      </svg>
    </button>
  );
}

export function PaletteButton() {
  return (
    <button
      type="button"
      onClick={openPalette}
      aria-haspopup="dialog"
      className="flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm hover:border-ink transition-colors"
    >
      <span className="md:hidden">Menu</span>
      <span className="hidden md:inline">Search</span>
      <span className="kbd hidden md:inline" aria-hidden="true">
        ⌘K
      </span>
    </button>
  );
}

export function LocalClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="label tabular-nums" aria-label={time ? `Local time in Cebu: ${time}` : undefined}>
      CEB {time ?? "--:--"} PHT
    </span>
  );
}
