// src/components/sections/Header.tsx

"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";

export const Header = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="
        max-w-7xl mx-auto px-4 w-full relative z-20
        min-h-screen flex flex-col justify-center
        pt-32 md:pt-40
      "
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-full
          backdrop-blur-xl max-w-fit mb-8
          transition-colors duration-300
          ${
            isDark
              ? "bg-white/10 border-white/20 shadow-black/10"
              : "bg-white/70 border-black/10 shadow-black/5"
          }
          border shadow-lg
        `}
      >
        <Sparkles className="w-4 h-4 text-violet-500" />
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            isDark ? "text-white/80" : "text-slate-700"
          }`}
        >
          Creative Developer & Designer
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`
          text-3xl sm:text-5xl md:text-7xl font-bold 
          flex flex-col gap-2 md:gap-4
          transition-colors duration-300
          ${isDark ? "text-white" : "text-slate-900"}
        `}
      >
        <span>Designing Bold Brands</span>
        <span className="flex items-center gap-4">
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
            &
          </span>{" "}
          Building Modern Websites
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`
          max-w-2xl text-base md:text-xl mt-8 leading-relaxed
          transition-colors duration-300
          ${isDark ? "text-white/60" : "text-slate-600"}
        `}
      >
        Pixel-perfect design meets production-ready code.{" "}
        <span
          className={`font-medium transition-colors duration-300 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Shopify expert, full-stack developer, and visual creator.
        </span>
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap gap-4 mt-10"
      >
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={`
            inline-flex items-center gap-2 px-8 py-4 rounded-2xl
            font-medium text-sm
            transition-all duration-300
            ${
              isDark
                ? "bg-white text-slate-900 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/25"
                : "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/25"
            }
          `}
        >
          Let&apos;s Talk
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>

        <motion.a
          href="/projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={`
            inline-flex items-center gap-2 px-8 py-4 rounded-2xl
            backdrop-blur-xl border
            font-medium text-sm
            transition-all duration-300
            ${
              isDark
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                : "bg-white/70 border-black/10 text-slate-900 hover:bg-white hover:shadow-xl"
            }
          `}
        >
          View Projects
        </motion.a>
      </motion.div>
    </div>
  );
};
