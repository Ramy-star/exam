"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // On mount, set the theme to light by default
  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onClick={toggleTheme}
    >
      <div className="icon-wrapper">
          <Sun className="sun-icon" style={{ display: theme === 'dark' ? 'none' : 'block' }}/>
          <Moon className="moon-icon" style={{ display: theme === 'dark' ? 'block' : 'none' }} />
      </div>
    </button>
  );
}
