"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { skillGroups, skillLinks } from "@/content/skills";

type Node = { id: string; label: string; group: string; hub: boolean; pos: THREE.Vector3 };

function buildGraph() {
  const nodes: Node[] = [];
  const edges: [string, string][] = [];
  skillGroups.forEach((g, gi) => {
    const a = (gi / skillGroups.length) * Math.PI * 2;
    const hub = new THREE.Vector3(Math.cos(a) * 2.3, (gi % 2 ? 0.6 : -0.6), Math.sin(a) * 2.3);
    nodes.push({ id: `hub:${g.id}`, label: g.label, group: g.label, hub: true, pos: hub });
    g.items.forEach((item, i) => {
      // Golden-angle points on a small sphere around the hub: deterministic, evenly spread.
      const t = (i + 0.5) / g.items.length;
      const phi = Math.acos(1 - 2 * t);
      const theta = i * 2.39996;
      const p = new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta))
        .multiplyScalar(0.95)
        .add(hub);
      nodes.push({ id: item, label: item, group: g.label, hub: false, pos: p });
      edges.push([`hub:${g.id}`, item]);
    });
  });
  const ids = new Set(nodes.map((n) => n.id));
  for (const [a, b] of skillLinks) if (ids.has(a) && ids.has(b)) edges.push([a, b]);
  return { nodes, edges, byId: new Map(nodes.map((n) => [n.id, n])) };
}

// Module scope: this file only ever loads client-side, once, for a single graph instance.
const { nodes, edges, byId } = buildGraph();
const tmp = new THREE.Vector3();
const drag = { dx: 0, dy: 0, down: false };

function readColors() {
  const s = getComputedStyle(document.documentElement);
  const get = (v: string) => new THREE.Color(s.getPropertyValue(v).trim());
  return { ink: get("--ink"), muted: get("--muted"), line: get("--line"), accent: get("--accent") };
}

function Scene({
  hovered,
  setHovered,
  labels,
}: {
  hovered: string | null;
  setHovered: (id: string | null) => void;
  labels: React.RefObject<Map<string, HTMLSpanElement>>;
}) {
  const group = useRef<THREE.Group>(null);
  const [colors, setColors] = useState(readColors);
  const { camera, size } = useThree();

  useEffect(() => {
    const update = () => requestAnimationFrame(() => setColors(readColors()));
    window.addEventListener("themechange", update);
    const mq = matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("themechange", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  const { base, hot } = useMemo(() => {
    const toGeo = (list: [string, string][]) =>
      new THREE.BufferGeometry().setFromPoints(list.flatMap(([a, b]) => [byId.get(a)!.pos, byId.get(b)!.pos]));
    const isHot = (e: [string, string]) => hovered !== null && (e[0] === hovered || e[1] === hovered);
    return { base: toGeo(edges.filter((e) => !isHot(e))), hot: toGeo(edges.filter(isHot)) };
  }, [hovered]);
  useEffect(() => () => (base.dispose(), hot.dispose()), [base, hot]);

  const neighbors = useMemo(() => {
    const s = new Set<string>();
    if (hovered) for (const [a, b] of edges) if (a === hovered) s.add(b); else if (b === hovered) s.add(a);
    return s;
  }, [hovered]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const d = drag;
    if (d.down) {
      g.rotation.y += d.dx * 0.006;
      g.rotation.x = THREE.MathUtils.clamp(g.rotation.x + d.dy * 0.004, -0.6, 0.6);
      d.dx = d.dy = 0;
    } else if (!hovered) {
      g.rotation.y += dt * 0.12;
    }
    // Project hub + hovered labels onto the DOM overlay.
    g.updateMatrixWorld();
    labels.current.forEach((el, id) => {
      const n = byId.get(id);
      if (!n) return;
      const v = tmp.copy(n.pos).applyMatrix4(g.matrixWorld);
      // Hubs on the far half of the ring project onto the near ones; label only the near half.
      const facing = v.z > 0;
      v.project(camera);
      const show = (n.hub && facing) || id === hovered || neighbors.has(id);
      el.style.opacity = show && v.z < 1 ? (id === hovered || n.hub ? "1" : "0.75") : "0";
      el.style.transform = `translate(${((v.x + 1) / 2) * size.width}px, ${((1 - v.y) / 2) * size.height}px) translate(-50%, -150%)`;
    });
  });

  return (
    <group ref={group} rotation={[0.25, 0, 0]}>
      <lineSegments geometry={base}>
        <lineBasicMaterial color={colors.muted} transparent opacity={0.35} />
      </lineSegments>
      <lineSegments geometry={hot}>
        <lineBasicMaterial color={colors.accent} />
      </lineSegments>
      {nodes.map((n) => {
        const lit = n.id === hovered || neighbors.has(n.id);
        return (
          <mesh
            key={n.id}
            position={n.pos}
            onPointerOver={(e) => (e.stopPropagation(), setHovered(n.id))}
            onPointerOut={() => setHovered(null)}
          >
            {n.hub ? <icosahedronGeometry args={[0.16, 0]} /> : <sphereGeometry args={[0.055, 12, 12]} />}
            <meshBasicMaterial color={lit ? colors.accent : n.hub ? colors.ink : colors.muted} wireframe={n.hub} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function SkillsGraph({ active }: { active: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const labels = useRef(new Map<string, HTMLSpanElement>());
  const last = useRef({ x: 0, y: 0 });

  const info = nodes.find((n) => n.id === hovered);

  return (
    <div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      onPointerDown={(e) => {
        drag.down = true;
        last.current = { x: e.clientX, y: e.clientY };
        (e.target as Element).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.down) return;
        drag.dx += e.clientX - last.current.x;
        drag.dy += e.clientY - last.current.y;
        last.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={() => (drag.down = false)}
      onPointerCancel={() => (drag.down = false)}
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <Scene hovered={hovered} setHovered={setHovered} labels={labels} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {nodes.map((n) => (
          <span
            key={n.id}
            ref={(el) => {
              if (el) labels.current.set(n.id, el);
              else labels.current.delete(n.id);
            }}
            className={`absolute left-0 top-0 whitespace-nowrap opacity-0 transition-opacity duration-300 ${n.hub ? "label !text-ink" : "font-mono text-[11px] text-ink"}`}
          >
            {n.label}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
        <p className="label">{info ? `${info.label} — ${info.hub ? "discipline" : info.group}` : "Hover a node · drag to rotate"}</p>
        <p className="label">{nodes.filter((n) => !n.hub).length} nodes</p>
      </div>
    </div>
  );
}
