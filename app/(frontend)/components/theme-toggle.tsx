"use client";

import { useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";
const storageKey = "mydesign3d-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useLayoutEffect(() => {
    const root = document.documentElement;
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem(storageKey); } catch { /* Storage may be unavailable. */ }
      const next = saved === "light" || saved === "dark" ? saved : system.matches ? "dark" : "light";
      root.dataset.theme = next;
      setTheme(next);
    };
    update();
    system.addEventListener("change", update);
    return () => system.removeEventListener("change", update);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem(storageKey, next); } catch { /* Keep the choice for this page. */ }
  }

  return (
    <button
      type="button"
      className="site-theme-toggle fixed bottom-5 left-5 z-110 grid size-12 cursor-pointer place-items-center rounded-full border shadow-lg transition-[background-color,color,transform] duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 motion-reduce:transition-none md:bottom-7 md:left-7"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      {theme === "dark" ? (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
      ) : (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.9 13.1A9 9 0 0 1 10.9 3.1 9 9 0 1 0 20.9 13.1Z" /></svg>
      )}
    </button>
  );
}
