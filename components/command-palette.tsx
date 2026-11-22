"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { destinations } from "@/content/navigation";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { openTerminal, toggleTheme } from "@/lib/theme";

type Command = { id: string; group: string; label: string; hint?: string; run: () => void };

export function CommandPalette() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      ...destinations.map((d) => ({ id: `nav-${d.key}`, group: "Go to", label: d.label, run: go(d.href) })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: "Projects",
        label: p.title,
        hint: p.kind,
        run: go(`/projects#${p.slug}`),
      })),
      { id: "theme", group: "Actions", label: "Toggle light / dark theme", run: toggleTheme },
      { id: "term", group: "Actions", label: "Open terminal", hint: "portfolio shell", run: openTerminal },
      { id: "gh", group: "Actions", label: "Open GitHub", hint: "@" + profile.githubUser, run: () => window.open(profile.github, "_blank", "noopener") },
      { id: "mail", group: "Actions", label: "Email Jerold", hint: profile.email, run: () => (window.location.href = `mailto:${profile.email}`) },
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.group} ${c.label} ${c.hint ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery("");
      setActive(0);
      d.showModal();
    } else if (!open && d.open) d.close();
  }, [open]);

  const run = (c: Command | undefined) => {
    if (!c) return;
    setOpen(false);
    c.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  };

  let lastGroup = "";
  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === dialogRef.current && setOpen(false)}
      className="m-auto mt-[12vh] w-[min(640px,calc(100vw-2rem))] rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/50"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <span className="label" aria-hidden="true">⌘</span>
        <input
          autoFocus
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
          aria-label="Search pages, projects, and actions"
          placeholder="Search pages, projects, actions…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
        />
        <span className="kbd">esc</span>
      </div>
      <ul id={listId} role="listbox" aria-label="Results" className="max-h-[50vh] overflow-y-auto p-2">
        {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No matches.</li>}
        {results.map((c, i) => {
          const header = c.group !== lastGroup ? (lastGroup = c.group) : null;
          return (
            <li key={c.id} role="presentation">
              {header && <div className="label px-3 pt-3 pb-1" aria-hidden="true">{header}</div>}
              <div
                id={`${listId}-${c.id}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => run(c)}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm ${
                  i === active ? "bg-ink text-paper" : ""
                }`}
              >
                <span>{c.label}</span>
                {c.hint && <span className={`truncate font-mono text-xs ${i === active ? "text-paper/70" : "text-muted"}`}>{c.hint}</span>}
              </div>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
