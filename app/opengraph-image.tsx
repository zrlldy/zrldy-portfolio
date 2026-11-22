import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Solid paper/ink/vermilion, matching the site. No gradients.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f7eb",
          color: "#393e41",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 2, color: "#5d6366" }}>
          <span>JEROLD NOYNAY — BACKEND DEVELOPER</span>
          <span>CEBU CITY, PH</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95 }}>
          <span>I build the parts</span>
          <span>you don&rsquo;t see.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          <div style={{ width: 22, height: 22, background: "#393e41" }} />
          <span>REST APIs · relational databases · software architecture</span>
        </div>
      </div>
    ),
    size,
  );
}
