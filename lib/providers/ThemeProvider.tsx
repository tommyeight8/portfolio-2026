// src/lib/providers/ThemeProvider.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;

    setTheme(stored ?? "dark");
  }, []);

  // useEffect(() => {
  //   if (!mounted) return;

  //   const root = document.documentElement;
  //   root.classList.remove("light", "dark");
  //   root.classList.add(theme);
  //   localStorage.setItem("theme", theme);

  //   // Update theme-color meta for safe areas
  //   const themeColor = theme === "dark" ? "#050208" : "#f8fafc";
  //   let meta = document.querySelector('meta[name="theme-color"]');

  //   if (!meta) {
  //     meta = document.createElement("meta");
  //     meta.setAttribute("name", "theme-color");
  //     document.head.appendChild(meta);
  //   }

  //   meta.setAttribute("content", themeColor);
  // }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    // Update safe area colors
    const themeColor = theme === "dark" ? "#020617" : "#f8fafc";
    root.style.backgroundColor = themeColor;

    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", themeColor);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Always wrap with Provider
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {mounted ? (
        children
      ) : (
        <div style={{ visibility: "hidden" }}>{children}</div>
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
