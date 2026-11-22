// Project Briefs only (see GLOSSARY.md). Every line here is owner-verified and approved for disclosure.
// Never add the current employer's name, URLs, or internal technical details.

export const categories = ["Backend", "Full-Stack", "Enterprise Systems", "Public Service"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  code: string;
  title: string;
  kind: string;
  context: string;
  categories: Category[];
  summary: string;
  contributions: string[];
  features?: string[];
  stack?: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "jao",
    code: "JAO",
    title: "Job Application & Onboarding System",
    kind: "Backend architecture and API development",
    context: "Logistics company, current role",
    categories: ["Backend", "Enterprise Systems"],
    featured: true,
    summary:
      "An internal system for handling job applications and onboarding new hires. My work centers on the backend: architecture, relational database design, and the REST API.",
    contributions: [
      "Backend system architecture",
      "Database structure",
      "REST API endpoints",
      "Feature delivery and bug fixing",
    ],
  },
  {
    slug: "schedwise",
    code: "SCW",
    title: "Schedwise",
    kind: "Timetabling system",
    context: "Capstone project",
    categories: ["Full-Stack"],
    summary:
      "A timetabling system for building class schedules by hand. It covers faculty loading, faculty assignments, room allocation, and schedule search and filtering.",
    contributions: [
      "Built the system from scratch",
      "Implemented the frontend and backend",
      "Handled deployment",
    ],
    features: [
      "Manual timetable management",
      "Faculty loading and assignments",
      "Room allocation",
      "Schedule search and filtering",
    ],
    stack: ["Laravel", "Livewire", "Tailwind CSS", "MySQL"],
  },
  {
    slug: "tidis",
    code: "TDS",
    title: "TIDIS",
    kind: "Disaster information system",
    context: "Internship, MDRRMO Tabogon",
    categories: ["Backend", "Public Service"],
    summary:
      "A disaster information system built during my internship at MDRRMO Tabogon, covering barangay profiling, hazard mapping, household records, and inventory.",
    contributions: [
      "Backend development",
      "API engineering",
    ],
    features: [
      "Disaster information management",
      "Barangay profiling",
      "Hazard mapping and geolocation",
      "Household information",
      "Inventory management",
    ],
    stack: ["NestJS", "Prisma", "PostgreSQL", "Neon"],
  },
  {
    slug: "hris",
    code: "HRS",
    title: "HRIS Payroll & Leave",
    kind: "Statutory deductions",
    context: "Contribution to an existing system",
    categories: ["Backend", "Enterprise Systems"],
    summary:
      "Helped implement statutory deductions in an existing HRIS payroll module: SSS, PhilHealth, and Pag-IBIG contributions, plus withholding tax.",
    contributions: [
      "Implemented and supported statutory deduction logic",
      "SSS, PhilHealth, and Pag-IBIG contributions",
      "Withholding tax calculation",
    ],
  },
];
