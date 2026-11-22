# Jerold Noynay — Portfolio

Personal portfolio for Jerold Noynay, a backend developer in Cebu City, Philippines.
Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, and Tailwind CSS 4. Deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (must pass before deploying)
npm run lint
```

## Disclosure rules (read before editing content)

This repository is public. Follow these rules in every file and commit, not just on rendered pages:

- The current employer is **never named**. Write "Logistics Company" instead.
- The JAO project stays a **Project Brief** with general content only. Do not add architecture, schemas, endpoints, auth details, or employer URLs.
- HRIS: no payroll formulas, employer policies, or employee data.
- Never invent metrics, outcomes, dates, or technical details. See `GLOSSARY.md` for "Project Brief" and "Case Study".
- Keep private notes in `notes.local.md` (gitignored).

## Where content lives

| What | File |
| --- | --- |
| Name, headline, about copy, education, portrait/résumé paths | `content/profile.ts` |
| Project Briefs and filter categories | `content/projects.ts` |
| Roles | `content/experience.ts` |
| Skills, skill-graph links, AI workflow | `content/skills.ts` |
| Creative disciplines and pieces | `content/creative.ts` |
| Navigation (header, ⌘K palette, terminal) | `content/navigation.ts` |

### Adding pending assets

- **Portrait**: add a 4:5 image at `public/images/portrait.jpg` and set `profile.portrait = "/images/portrait.jpg"`.
- **Résumé**: add `public/resume/jerold-noynay-resume.pdf` and set `profile.resumeUrl`. The hero button only shows once this is set.
- **LinkedIn**: set `profile.linkedin`, then add it to the contact section and to `sameAs` in `app/layout.tsx`.
- **Creative pieces**: add entries to `creativePieces` (YouTube or Vimeo IDs). Only add pieces you made and have the right to show. They load click-to-play.
- **Case studies**: `/projects/[slug]` does not exist yet, on purpose. With Cache Components, a dynamic route needs at least one real param to build. Add the route together with the first approved case study.

## Architecture

- **Server Components by default.** Client islands: theme toggle, clock, command palette, terminal, cursor, particle field, portrait tilt, project filter, video embed, and the 3D skills graph.
- **Motion**:
  - The hero entrance is pure CSS, so it runs on first paint with no wait for hydration.
  - Scroll reveals and parallax run through a single GSAP + ScrollTrigger controller (`components/motion-root.tsx`). Elements opt in with `data-reveal` and `data-parallax`.
  - Page transitions use React `<ViewTransition>`.
  - Everything is disabled under `prefers-reduced-motion`.
  - Lenis smooth scrolling was not added. Native scrolling showed no problem worth its weight.
- **3D**: one React Three Fiber scene (`components/three/skills-graph.tsx`).
  - It only downloads on fine-pointer screens ≥1024px with motion allowed, once the section is near the viewport, and stops rendering when off-screen.
  - The accessible skill list next to it always renders.
- **Theme**: an inline head script applies a saved preference before first paint. Without one, the theme follows the system setting. All colors are solid tokens in `app/globals.css`, with no gradients.
- **GitHub**: `lib/github.ts` uses the public, unauthenticated API with `'use cache'` and a daily refresh. Failures render a fallback link and are never cached.

## Environment variables

See `.env.example`. Both are optional:

- `NEXT_PUBLIC_SITE_URL`: canonical URL. If unset, falls back to `VERCEL_PROJECT_PRODUCTION_URL`.
- `GOOGLE_SITE_VERIFICATION`: Search Console HTML-tag token.

## Deployment checklist (Vercel)

1. Import the repo in Vercel. Framework preset: Next.js. No build settings need changing.
2. Deploy, then confirm on the production URL: `/`, `/about`, `/projects`, `/creative`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`.
3. Once a domain is bought: add it in Vercel, set `NEXT_PUBLIC_SITE_URL=https://<domain>`, and redeploy.
4. In Google Search Console, add the property and set `GOOGLE_SITE_VERIFICATION`. Redeploy, verify, then submit `/sitemap.xml`.
5. Preview deployments send `Disallow: /` in robots.txt, so only production gets indexed.
6. Run Lighthouse on the production URL (mobile and desktop) and record the results.

## Outstanding content

Portrait · résumé PDF · LinkedIn URL · domain · creative media · project screenshots · internship dates · TIDIS/Schedwise case-study details and approval.
