import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

/**
 * ThemeToggle - toggles 'dark' class on documentElement and persists to localStorage.
 * Safe, dependency-free. Assumes Tailwind darkMode is configured with 'class'.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  function toggle() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <button
      aria-label="Toggle color theme"
      title="Toggle theme"
      onClick={toggle}
      className="inline-flex items-center justify-center h-10 w-10 rounded-lg border ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-shadow shadow-sm hover:shadow-md bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5 text-yellow-400" />
      ) : (
        <FiMoon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
}