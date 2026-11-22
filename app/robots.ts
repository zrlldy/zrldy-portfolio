import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments out of the index; only production is crawlable.
  const isProd = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
  return {
    rules: isProd ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
