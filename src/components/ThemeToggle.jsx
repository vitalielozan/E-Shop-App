import React from "react";
import { useDarkMode } from "../hooks/useDarkMode.js";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="rounded-md bg-white px-6 py-2 text-gray-900 transition-all dark:bg-gray-900 dark:text-white"
    >
      {darkMode ? "🔆 Light " : "🌙 Dark "}
    </button>
  );
}

export default ThemeToggle;
