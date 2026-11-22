"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import "./profile-card.css";

// Adapted from React Bits <ProfileCard /> (JS + CSS variant). Trimmed to the props this site uses.

const THEMES = {
  dark: {
    "--pc-frame": "rgba(38, 35, 46, 0.66)",
    "--pc-frame-edge": "rgba(255, 255, 255, 0.08)",
    "--pc-frame-highlight": "rgba(255, 255, 255, 0.07)",
    "--pc-frame-shadow": "0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)",
    "--pc-tile": "linear-gradient(180deg, #3a3644 0%, #27242f 100%)",
    "--pc-tile-edge": "rgba(255, 255, 255, 0.07)",
    "--pc-tile-highlight": "rgba(255, 255, 255, 0.12)",
    "--pc-tile-shadow": "0 4px 10px -4px rgba(0, 0, 0, 0.7)",
    "--pc-ink": "#f4f4f5",
    "--pc-muted": "rgba(244, 244, 245, 0.6)",
    "--pc-hover": "brightness(1.12)",
    "--pc-press": "brightness(0.8)",
    "--pc-shade": "rgba(0, 0, 0, 0.4)",
    "--pc-blend": "color-dodge",
    "--pc-holo-filter": "hue-rotate(0deg)",
    "--pc-sheen": "rgba(255, 255, 255, 0.16)",
  },
  light: {
    "--pc-frame": "rgba(240, 240, 243, 0.8)",
    "--pc-frame-edge": "rgba(24, 24, 27, 0.07)",
    "--pc-frame-highlight": "rgba(255, 255, 255, 0.95)",
    "--pc-frame-shadow": "0 22px 44px -22px rgba(24, 24, 27, 0.3), 0 6px 16px -10px rgba(24, 24, 27, 0.16)",
    "--pc-tile": "linear-gradient(180deg, #ffffff 0%, #f6f6f8 100%)",
    "--pc-tile-edge": "rgba(24, 24, 27, 0.08)",
    "--pc-tile-highlight": "rgba(255, 255, 255, 1)",
    "--pc-tile-shadow": "0 4px 10px -5px rgba(24, 24, 27, 0.25)",
    "--pc-ink": "#27272a",
    "--pc-muted": "rgba(39, 39, 42, 0.6)",
    "--pc-hover": "brightness(0.97)",
    "--pc-press": "brightness(0.92)",
    "--pc-shade": "rgba(24, 24, 27, 0.14)",
    "--pc-blend": "multiply",
    "--pc-holo-filter": "invert(1) hue-rotate(180deg)",
    "--pc-sheen": "rgba(255, 255, 255, 0)",
  },
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

type Props = {
  avatarUrl: string;
  name: string;
  title: string;
  handle: string;
  status: string;
  statusColor?: string;
  contactText?: string;
  onContactClick?: () => void;
  theme?: "dark" | "light";
  radius?: number;
  holo?: number;
  glare?: number;
  tiltStrength?: number;
  parallax?: number;
  intro?: boolean;
  className?: string;
};

export function ProfileCard({
  avatarUrl,
  name,
  title,
  handle,
  status,
  statusColor = "#22c55e",
  contactText = "Contact",
  onContactClick,
  theme = "dark",
  radius = 16,
  holo = 0.8,
  glare = 0.5,
  tiltStrength = 12,
  parallax = 8,
  intro = true,
  className = "",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = { width: root.offsetWidth, height: root.offsetHeight };
    const x = { p: 0, v: 0, target: 0 };
    const y = { p: 0, v: 0, target: 0 };
    const light = { p: 0, target: 0 };
    let raf = 0;
    let last = 0;
    let slowUntil = 0;
    let touchId: number | null = null;

    const write = () => {
      const angle = reduced ? 0 : tiltStrength;
      const depth = reduced ? 0 : parallax;
      const tilt = Math.min(1, Math.hypot(x.p, y.p));
      const s = root.style;
      s.setProperty("--pc-light-x", `${((x.p + 1) * 0.5 * size.width).toFixed(1)}px`);
      s.setProperty("--pc-light-y", `${((y.p + 1) * 0.5 * size.height).toFixed(1)}px`);
      s.setProperty("--pc-pointer-x", `${((x.p + 1) * 50).toFixed(2)}%`);
      s.setProperty("--pc-pointer-y", `${((y.p + 1) * 50).toFixed(2)}%`);
      s.setProperty("--pc-band-x", `${(50 + x.p * 15).toFixed(2)}%`);
      s.setProperty("--pc-band-y", `${(50 + y.p * 15).toFixed(2)}%`);
      s.setProperty("--pc-rotate-x", `${(y.p * angle).toFixed(3)}deg`);
      s.setProperty("--pc-rotate-y", `${(-x.p * angle).toFixed(3)}deg`);
      s.setProperty("--pc-shift-x", `${(x.p * depth).toFixed(2)}px`);
      s.setProperty("--pc-shift-y", `${(y.p * depth).toFixed(2)}px`);
      s.setProperty("--pc-reach", tilt.toFixed(4));
      s.setProperty("--pc-tilt", (tilt * light.p).toFixed(4));
      s.setProperty("--pc-active", light.p.toFixed(4));
    };

    // Spring toward the pointer; stops the rAF loop once settled.
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const slow = now < slowUntil;
      const stiffness = slow ? 24 : 120;
      const damping = slow ? 9 : 16;
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        for (const a of [x, y]) {
          a.v += (stiffness * (a.target - a.p) - damping * a.v) * h;
          a.p += a.v * h;
        }
      }
      const tau = light.target > light.p ? 0.18 : slow ? 0.9 : 0.45;
      light.p += (light.target - light.p) * (1 - Math.exp(-dt / tau));
      write();
      const moving = [x.target - x.p, y.target - y.p, x.v, y.v].some((d) => Math.abs(d) > 0.0005) || Math.abs(light.target - light.p) > 0.002;
      if (moving) {
        raf = requestAnimationFrame(frame);
      } else {
        x.p = x.target;
        y.p = y.target;
        light.p = light.target;
        write();
        raf = 0;
      }
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const aim = (nx: number, ny: number, on = true) => {
      x.target = clamp(nx, -1, 1);
      y.target = clamp(ny, -1, 1);
      light.target = on ? 1 : 0;
      slowUntil = 0;
      wake();
    };

    const aimAt = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      if (!r.width || !r.height) return;
      aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const release = () => aim(0, 0, false);

    const onEnter = (e: PointerEvent) => e.pointerType === "mouse" && aimAt(e);
    const onMove = (e: PointerEvent) => (e.pointerType === "mouse" || e.pointerId === touchId) && aimAt(e);
    const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && release();
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      touchId = e.pointerId;
      aimAt(e);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== touchId) return;
      touchId = null;
      release();
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);

    const observer = new ResizeObserver(() => {
      size.width = root.offsetWidth;
      size.height = root.offsetHeight;
      write();
    });
    observer.observe(root);

    if (intro && !reduced) {
      x.p = 0.62;
      y.p = -0.55;
      light.p = 1;
      slowUntil = performance.now() + 1400;
      write();
      wake();
    } else {
      write();
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
    };
  }, [intro, tiltStrength, parallax]);

  const style = {
    ...THEMES[theme],
    "--pc-radius": `${Math.max(0, radius)}px`,
    "--pc-backdrop": "var(--pc-tile)",
    "--pc-holo": clamp(holo, 0, 1),
    "--pc-glare": clamp(glare, 0, 1),
    "--pc-parallax": `${Math.max(0, parallax)}px`,
    "--pc-status": statusColor,
    "--pc-pattern": "linear-gradient(#000, #000)",
    "--pc-pattern-size": "100% 100%",
    "--pc-holo-gain": 0.75,
  } as unknown as CSSProperties;

  return (
    <div ref={rootRef} className={`profile-card ${className}`.trim()} style={style}>
      <div className="profile-card__body">
        <div className="profile-card__tile">
          <span className="profile-card__sheen" />
          <span className="profile-card__holo" />
          {/* eslint-disable-next-line @next/next/no-img-element -- oversized for parallax; next/image fill can't do negative inset */}
          <img className="profile-card__photo" src={avatarUrl} alt={`Portrait of ${name}`} draggable={false} />
          <span className="profile-card__scrim" />
          <div className="profile-card__info">
            <p className="profile-card__name">{name}</p>
            <p className="profile-card__title">{title}</p>
          </div>
          <span className="profile-card__tile-rim" />
        </div>

        <div className="profile-card__footer">
          <div className="profile-card__meta">
            <span className="profile-card__handle">@{handle}</span>
            <span className="profile-card__status">{status}</span>
          </div>
          <button type="button" className="profile-card__contact" onClick={onContactClick} aria-label={`${contactText} ${name}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            {contactText}
          </button>
        </div>

        <span className="profile-card__glare" />
        <span className="profile-card__shade" />
        <span className="profile-card__rim" />
      </div>
    </div>
  );
}
