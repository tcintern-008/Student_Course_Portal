"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const themeCtx = useTheme();
  if (!themeCtx) return null;

  const { theme, toggleTheme } = themeCtx;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark and light theme"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-lg hover:border-blue-500 transition-colors"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
