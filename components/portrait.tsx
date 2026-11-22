"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/content/profile";
import { currentTheme, subscribeTheme, type Theme } from "@/lib/theme";
import { ProfileCard } from "./profile-card";

// Hero portrait: React Bits ProfileCard, following the site theme.
export function Portrait() {
  const theme = useSyncExternalStore<Theme>(subscribeTheme, currentTheme, () => "dark");
  return (
    <ProfileCard
      className="mx-auto !w-full max-w-[400px]"
      avatarUrl={profile.portrait ?? ""}
      name={profile.name}
      title={profile.title}
      handle={profile.githubUser}
      status={profile.location}
      contactText="Contact"
      onContactClick={() => (window.location.href = `mailto:${profile.email}`)}
      theme={theme}
    />
  );
}
