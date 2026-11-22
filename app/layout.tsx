import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ViewTransition } from "react";
import { CommandPalette } from "@/components/command-palette";
import { CustomCursor } from "@/components/custom-cursor";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Terminal } from "@/components/terminal";
import { education, profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { siteUrl } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Jerold Noynay is a backend developer in Cebu City, Philippines, working on REST APIs, relational database design, and software architecture, with a side passion for motion graphics.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} — ${profile.title}`, template: `%s · ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description,
    url: "/",
    locale: "en_US",
    firstName: "Jerold",
    lastName: "Noynay",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — ${profile.title}`, description },
  ...(process.env.GOOGLE_SITE_VERIFICATION && { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7eb" },
    { media: "(prefers-color-scheme: dark)", color: "#2b2f31" },
  ],
};

// Verified facts only. Deliberately no worksFor: the current employer is never published.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      url: siteUrl,
      jobTitle: profile.title,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Cebu City", addressCountry: "PH" },
      alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
      knowsAbout: skillGroups.flatMap((g) => g.items).slice(0, 20),
      sameAs: [profile.github],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: profile.name,
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-full flex flex-col lg:pl-56">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <ViewTransition name="page">
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
        </ViewTransition>
        <SiteFooter />
        <CommandPalette />
        <Terminal />
        <CustomCursor />
      </body>
    </html>
  );
}
