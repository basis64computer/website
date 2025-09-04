import React, { useEffect, useState } from "react";

export const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  // Load preferensi user saat mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDark(true);
  }, []);

  // Update html class + localStorage tiap toggle berubah
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {isDark ? "Dark Mode" : "Light Mode"}
      </span>
    </label>
  );
};
