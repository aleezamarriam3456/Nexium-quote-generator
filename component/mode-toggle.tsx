"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Determine actual current theme (handles system preference)
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  // Toggle between 'dark' and 'light'
  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      title="Toggle Dark Mode"
      type="button"
      className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 ease-in-out"
    >
      {currentTheme === "dark" ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-800" />
      )}
    </button>
  );
}
