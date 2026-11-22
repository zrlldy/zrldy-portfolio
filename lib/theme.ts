export type Theme = "light" | "dark";

// Runs in <head> before first paint: marks JS as available and applies a saved theme (system otherwise).
export const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}})()`;

export function currentTheme(): Theme {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

export const toggleTheme = () => setTheme(currentTheme() === "dark" ? "light" : "dark");

// Cross-component UI events (header button → palette, palette → terminal).
export const openPalette = () => window.dispatchEvent(new Event("palette:open"));
export const openTerminal = () => window.dispatchEvent(new Event("terminal:open"));
