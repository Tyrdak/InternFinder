"use client";

import React from "react";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("internfinder-theme");
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">(getInitialTheme);

  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem("internfinder-theme", theme);
  }, [theme]);

  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      aria-label="Basculer le thème"
      onClick={() => setTheme(next)}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-(--tint) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand) dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
      title={theme === "light" ? "Passer en mode sombre" : "Passer en mode clair"}
    >
      {theme === "light" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10-9h-2v3h2V4zm7.04 1.46l-1.41-1.41-1.8 1.79 1.42 1.42 1.79-1.8zM17 11v2h3v-2h-3zm-5 7h2v-3h-2v3zm4.24 1.76l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zM4.96 18.54l1.41 1.41 1.8-1.79-1.42-1.42-1.79 1.8zM12 6a6 6 0 100 12A6 6 0 0012 6z"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M9.37 5.51A7 7 0 0018.49 14.63 7.002 7.002 0 019.37 5.51m12.1 7.04A9 9 0 1111.45 2.53 7 7 0 0021.48 12.55z"/>
        </svg>
      )}
    </button>
  );
}


