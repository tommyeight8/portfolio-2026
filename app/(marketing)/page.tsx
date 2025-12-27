// src/app/(marketing)/page.tsx

"use client";

import { Header } from "@/components/sections/Header";
import WhatIDo from "@/components/sections/WhatIDo";
import SkillGraph from "@/components/sections/SkillGraph";
import { useTheme } from "@/lib/providers/ThemeProvider";

export default function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main
      className={`overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-violet-100/30 to-slate-50"
      }`}
    >
      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] animate-pulse transition-colors duration-500 ${
            isDark ? "bg-violet-500/20" : "bg-violet-400/20"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse transition-colors duration-500 ${
            isDark ? "bg-cyan-500/15" : "bg-cyan-400/20"
          }`}
          style={{ animationDelay: "1s" }}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[150px] animate-pulse transition-colors duration-500 ${
            isDark ? "bg-fuchsia-500/15" : "bg-fuchsia-400/15"
          }`}
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Header />
      <WhatIDo />
      <SkillGraph />
    </main>
  );
}
