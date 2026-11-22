"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { destinations } from "@/content/navigation";
import { education, profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { experience } from "@/content/experience";
import { openTerminal, setTheme } from "@/lib/theme";

// A fake shell over portfolio content only. Nothing here executes real commands.
type Line = { kind: "in" | "out"; text: string };

const HELP = [
  "help                 list commands",
  "about                who I am",
  "skills               technical stack",
  "projects             project briefs",
  "experience           roles",
  "education            degree",
  "contact              how to reach me",
  "open <section>       go to: " + destinations.map((d) => d.key).join(", "),
  "theme <light|dark>   switch theme",
  "clear                clear the screen",
  "exit                 close the terminal",
];

export function respond(input: string): string[] | "clear" | { open: string } | { theme: "light" | "dark" } | "exit" {
  const [cmd = "", ...args] = input.trim().split(/\s+/);
  switch (cmd.toLowerCase()) {
    case "":
      return [];
    case "help":
      return HELP;
    case "about":
    case "whoami":
      return [`${profile.name} — ${profile.title}, ${profile.location}.`, profile.intro];
    case "skills":
      return skillGroups.map((g) => `${g.label.padEnd(24)} ${g.items.join(", ")}`);
    case "projects":
    case "ls":
      return projects.map((p) => `${p.code.padEnd(5)} ${p.title} — ${p.kind}`);
    case "experience":
      return experience.map((r) => `${r.title} · ${r.org}${r.period ? ` · ${r.period}` : ""}`);
    case "education":
      return [`${education.degree}`, `${education.institution} — ${education.campus}`, `Class of ${education.year}`];
    case "contact":
      return [`email   ${profile.email}`, `github  ${profile.github}`, `based   ${profile.location}`];
    case "open":
    case "cd": {
      const d = destinations.find((x) => x.key === args[0]?.toLowerCase());
      return d ? { open: d.href } : [`open: unknown section "${args[0] ?? ""}". Try: ${destinations.map((x) => x.key).join(", ")}`];
    }
    case "theme":
      return args[0] === "light" || args[0] === "dark" ? { theme: args[0] } : ["usage: theme <light|dark>"];
    case "clear":
      return "clear";
    case "exit":
      return "exit";
    case "sudo":
      return ["Permission denied. This shell only knows about the portfolio."];
    default:
      return [`command not found: ${cmd}. Type "help".`];
  }
}

const greeting: Line[] = [{ kind: "out", text: `jn-shell — type "help" to list commands.` }];

export function Terminal() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>(greeting);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    const open = () => dialogRef.current?.showModal();
    window.addEventListener("terminal:open", open);
    return () => window.removeEventListener("terminal:open", open);
  }, []);

  // Block body: scrollIntoView returns a Promise in newer browsers, and effects must return only a cleanup fn.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const submit = () => {
    const input = value;
    setValue("");
    setCursor(-1);
    if (input.trim()) setHistory((h) => [input, ...h].slice(0, 50));
    const r = respond(input);
    const echo: Line = { kind: "in", text: input };
    if (r === "clear") return setLines([]);
    if (r === "exit") return dialogRef.current?.close();
    if ("open" in r) {
      setLines((l) => [...l, echo, { kind: "out", text: `→ ${r.open}` }]);
      dialogRef.current?.close();
      return router.push(r.open);
    }
    if ("theme" in r) {
      setTheme(r.theme);
      return setLines((l) => [...l, echo, { kind: "out", text: `theme set to ${r.theme}` }]);
    }
    setLines((l) => [...l, echo, ...r.map((text) => ({ kind: "out" as const, text }))]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") return submit();
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(-1, Math.min(history.length - 1, cursor + (e.key === "ArrowUp" ? 1 : -1)));
      setCursor(next);
      setValue(next === -1 ? "" : history[next]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Portfolio terminal"
      onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      className="m-auto w-[min(760px,calc(100vw-2rem))] rounded-xl border border-line bg-term p-0 text-term-ink shadow-2xl backdrop:bg-black/50"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-xs text-white/60">jn-shell: portfolio content only</span>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="text-xs text-white/60 hover:text-white"
          aria-label="Close terminal"
        >
          [esc]
        </button>
      </div>
      <div
        className="h-[min(60vh,440px)] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        <div role="log" aria-live="polite" aria-label="Terminal output">
          {lines.map((l, i) => (
            <p key={i} className="whitespace-pre-wrap break-words">
              {l.kind === "in" ? (
                <>
                  <span className="text-term-prompt">jerold@cebu</span>
                  <span className="text-white/40">:~$ </span>
                  {l.text}
                </>
              ) : (
                <span className="text-white/75">{l.text}</span>
              )}
            </p>
          ))}
        </div>
        <div ref={endRef} className="flex items-center">
          <label htmlFor="term-input" className="shrink-0">
            <span className="text-term-prompt">jerold@cebu</span>
            <span className="text-white/40">:~$&nbsp;</span>
          </label>
          <input
            id="term-input"
            ref={inputRef}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent caret-term-prompt outline-none"
            aria-label="Terminal command"
          />
        </div>
      </div>
    </dialog>
  );
}

export function TerminalButton() {
  return (
    <button type="button" onClick={openTerminal} className="font-mono text-sm text-muted hover:text-ink">
      &gt;_ terminal
    </button>
  );
}
