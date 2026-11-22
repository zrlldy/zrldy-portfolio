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
    period: "Jul 2026 to present",
    location: "Cebu City, Philippines",
    points: [
      "Build REST APIs and design relational databases",
      "Contribute to system architecture decisions",
      "Work with frontend developers to ship backend functionality",
      "Deliver features and fix issues on a job application and onboarding system",
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
