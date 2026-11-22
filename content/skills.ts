export type SkillGroup = { id: string; label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { id: "lang", label: "Languages", items: ["PHP", "TypeScript", "JavaScript", "SQL"] },
  { id: "backend", label: "Backend", items: ["Laravel", "NestJS", "Filament", "Livewire", "REST APIs"] },
  { id: "data", label: "Data & caching", items: ["MySQL", "MariaDB", "PostgreSQL", "Redis"] },
  {
    id: "infra",
    label: "Infrastructure & tools",
    items: ["Git / GitHub", "Docker", "Linux", "Nginx", "Cloudflare", "VPS deployment", "n8n"],
  },
  { id: "ai", label: "AI-assisted development", items: ["Claude Code", "OpenAI Codex", "Gemini", "Agent orchestration"] },
  {
    id: "core",
    label: "Engineering",
    items: ["API design", "Relational modeling", "Auth & authorization", "Software architecture", "Query optimization"],
  },
];

export const strongest = "Laravel";

// Factual relationships between technologies, drawn as extra edges in the skills graph.
export const skillLinks: [string, string][] = [
  ["Laravel", "PHP"],
  ["Filament", "Laravel"],
  ["Livewire", "Laravel"],
  ["NestJS", "TypeScript"],
  ["TypeScript", "JavaScript"],
  ["MariaDB", "MySQL"],
  ["Laravel", "MySQL"],
  ["NestJS", "PostgreSQL"],
  ["SQL", "Query optimization"],
  ["REST APIs", "API design"],
  ["Docker", "VPS deployment"],
  ["Nginx", "Linux"],
];

export const aiWorkflow = [
  "Design the system architecture",
  "Define the project's coding standards",
  "Set boundaries and responsibilities for each AI coding agent",
  "Orchestrate specialized subagents",
  "Guide implementation through architectural requirements",
];
