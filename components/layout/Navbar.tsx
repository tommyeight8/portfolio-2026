// src/components/layout/Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <nav
          className={`
            px-2 py-2 rounded-2xl backdrop-blur-xl border shadow-lg transition-all duration-300
            ${
              isDark
                ? "bg-white/10 border-white/20 shadow-black/10"
                : "bg-white/70 border-black/10 shadow-black/5"
            }
          `}
        >
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Portfolio<span className="text-violet-500">.</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm transition-colors ${
                    isDark
                      ? "text-white/70 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-2 rounded-xl transition-colors
                ${
                  isDark
                    ? "bg-white/10 text-white/80 hover:bg-white/20"
                    : "bg-black/5 text-slate-700 hover:bg-black/10"
                }
              `}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </motion.div>
            </motion.button>

            {/* CTA */}
            <Link
              href="/contact"
              className={`
                ml-1 px-4 py-2 text-sm font-medium rounded-xl transition-colors
                ${
                  isDark
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }
              `}
            >
              Let's Talk
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 backdrop-blur-xl ${
                isDark ? "bg-slate-950/95" : "bg-white/95"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative flex flex-col items-center justify-center min-h-screen gap-8"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-3xl font-medium transition-colors ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
