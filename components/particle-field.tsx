"use client";

import { useEffect, useRef } from "react";

// A quiet grid of points that parts around the pointer, like a field of hidden nodes.
// Static (single draw) for touch devices and reduced motion; paused while off-screen or idle.
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const interactive =
      matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 28;
    const RADIUS = 140;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, color = "#999", accent = "#f00";
    let px = -9999, py = -9999, energy = 0;
    let pts: { x: number; y: number; ox: number; oy: number }[] = [];

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      color = s.getPropertyValue("--line").trim();
      accent = s.getPropertyValue("--accent").trim();
    };
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      for (let y = GAP / 2; y < h; y += GAP) for (let x = GAP / 2; x < w; x += GAP) pts.push({ x, y, ox: x, oy: y });
      draw();
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const d = Math.hypot(p.x - px, p.y - py);
        ctx.fillStyle = d < RADIUS * 0.55 ? accent : color;
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
      }
    };
    const step = () => {
      let moving = 0;
      for (const p of pts) {
        const dx = p.ox - px, dy = p.oy - py;
        const d = Math.hypot(dx, dy);
        const push = d < RADIUS ? (1 - d / RADIUS) * 18 : 0;
        const tx = p.ox + (d ? (dx / d) * push : 0);
        const ty = p.oy + (d ? (dy / d) * push : 0);
        p.x += (tx - p.x) * 0.15;
        p.y += (ty - p.y) * 0.15;
        moving += Math.abs(tx - p.x) + Math.abs(ty - p.y);
      }
      draw();
      energy = moving;
      raf = visible && energy > 0.5 ? requestAnimationFrame(step) : 0;
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(step);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      kick();
    };
    const onLeave = () => {
      px = py = -9999;
      kick();
    };
    const onTheme = () => requestAnimationFrame(() => (readColors(), draw()));

    readColors();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    window.addEventListener("themechange", onTheme);
    const mq = matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", onTheme);
    const host = canvas.parentElement!;
    if (interactive) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("themechange", onTheme);
      mq.removeEventListener("change", onTheme);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />;
}
