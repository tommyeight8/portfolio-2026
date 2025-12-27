// src/app/(marketing)/projects/[slug]/not-found.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FolderX } from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";

export default function ProjectNotFound() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main
      className={`min-h-screen pt-32 pb-24 flex items-center justify-center transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-violet-100/30 to-slate-50"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-6"
      >
        <div
          className={`
            w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center
            ${isDark ? "bg-white/10" : "bg-slate-100"}
          `}
        >
          <FolderX
            className={`w-12 h-12 ${
              isDark ? "text-white/40" : "text-slate-400"
            }`}
          />
        </div>

        <h1
          className={`text-4xl font-bold mb-4 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Project Not Found
        </h1>

        <p
          className={`text-lg mb-8 max-w-md mx-auto ${
            isDark ? "text-white/60" : "text-slate-600"
          }`}
        >
          The project you're looking for doesn't exist or may have been removed.
        </p>

        <Link
          href="/projects"
          className={`
            inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium
            transition-all hover:scale-105
            ${
              isDark
                ? "bg-white text-slate-900 hover:shadow-lg hover:shadow-white/20"
                : "bg-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/20"
            }
          `}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </motion.div>
    </main>
  );
}
