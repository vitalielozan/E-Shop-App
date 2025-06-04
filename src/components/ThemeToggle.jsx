import React from "react";
import { useDarkMode } from "../hooks/useDarkMode.js";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="rounded-md bg-white px-6 py-2 text-gray-900 transition-all dark:bg-gray-900 dark:text-white"
    >
      {darkMode ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
}

export default ThemeToggle;
