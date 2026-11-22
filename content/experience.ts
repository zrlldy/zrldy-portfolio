export type Role = {
  title: string;
  org: string; // current employer is never named publicly
  period: string | null; // null = dates pending confirmation
  location: string;
  points: string[];
};

export const experience: Role[] = [
  {
    title: "Backend Developer",
    org: "Logistics Company",
    period: "Jul 2026 — Present",
    location: "Cebu City, Philippines",
    points: [
      "Develop REST APIs",
      "Design relational databases",
      "Contribute to system architecture",
      "Collaborate with frontend developers",
      "Support the implementation of backend functionality",
      "Contributed to delivering features and resolving development problems in a job application and onboarding system",
    ],
  },
  {
    title: "Intern",
    org: "MDRRMO Tabogon",
    period: null,
    location: "Tabogon, Cebu",
    points: [
      "Developed TIDIS, a disaster information system",
      "Backend development and API engineering with NestJS, Prisma, and PostgreSQL",
    ],
  },
];
