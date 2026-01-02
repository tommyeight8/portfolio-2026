// src/components/layout/Footer.tsx

"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative py-12 px-6 border-t transition-colors duration-300 ${
        isDark ? "border-gray-300/10 bg-[#00030A]" : "border-black/10 bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo - Left */}
          <div className="flex-1 flex justify-center md:justify-start">
            <span
              className={`text-lg font-semibold flex items-baseline gap-1 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Portfolio<span className="bg-violet-500 h-1 w-1 block"></span>
            </span>
          </div>

          {/* Nav - Center */}
          <nav className="flex-1 flex items-center justify-center gap-8">
            {["Projects", "About", "Contact"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className={`transition-colors ${
                  isDark
                    ? "text-white/50 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Social - Right */}
          <div className="flex-1 flex items-center justify-center md:justify-end gap-3">
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Mail, href: "mailto:hello@example.com" },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 transition-colors ${
                  isDark
                    ? "text-white/40 hover:text-white"
                    : "text-slate-400 hover:text-slate-900"
                }`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div
          className={`mt-8 pt-8 border-t text-center text-sm ${
            isDark
              ? "border-gray-300/10 text-white/30"
              : "border-black/10 text-slate-400"
          }`}
        >
          <p>© {currentYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
