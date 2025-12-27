// src/components/layout/Navbar.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const isDark = theme === "dark";
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    signOut({ callbackUrl: "/" });
  };

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
              className={`px-4 py-2 text-sm font-semibold transition-colors flex items-baseline gap-1 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Portfolio<span className="bg-violet-500 h-1 w-1 block"></span>
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
                p-2 rounded-full transition-colors cursor-pointer
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

            {/* User Button */}
            {status === "loading" ? (
              <div
                className={`p-2 rounded-full ${
                  isDark ? "bg-white/10" : "bg-black/5"
                }`}
              >
                <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin opacity-50" />
              </div>
            ) : session ? (
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-xl transition-colors cursor-pointer
                    ${
                      isDark
                        ? "bg-white/10 text-white/80 hover:bg-white/20"
                        : "bg-black/5 text-slate-700 hover:bg-black/10"
                    }
                    ${
                      isUserMenuOpen
                        ? isDark
                          ? "bg-white/20"
                          : "bg-black/10"
                        : ""
                    }
                  `}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDark ? "bg-violet-500/30" : "bg-violet-100"
                    }`}
                  >
                    <User
                      className={`w-3.5 h-3.5 ${
                        isDark ? "text-violet-300" : "text-violet-500"
                      }`}
                    />
                  </div>
                  <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">
                    {session.user?.name || session.user?.email?.split("@")[0]}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`
                        absolute right-0 top-full mt-2 w-56 py-2 rounded-xl border shadow-xl backdrop-blur-xl
                        ${
                          isDark
                            ? "bg-slate-900/90 border-white/10"
                            : "bg-white/90 border-black/10"
                        }
                      `}
                    >
                      {/* User Info */}
                      <div
                        className={`px-4 py-3 border-b ${
                          isDark ? "border-white/10" : "border-black/10"
                        }`}
                      >
                        <p
                          className={`text-sm font-medium truncate ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {session.user?.name || "Admin"}
                        </p>
                        <p
                          className={`text-xs truncate mt-0.5 ${
                            isDark ? "text-white/50" : "text-slate-500"
                          }`}
                        >
                          {session.user?.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className={`
                            flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                            ${
                              isDark
                                ? "text-white/70 hover:text-white hover:bg-white/10"
                                : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                            }
                          `}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      </div>

                      {/* Logout */}
                      <div
                        className={`pt-1 border-t ${
                          isDark ? "border-white/10" : "border-black/10"
                        }`}
                      >
                        <button
                          onClick={handleLogout}
                          className={`
                            w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                            ${
                              isDark
                                ? "text-red-400/80 hover:text-red-400 hover:bg-red-500/10"
                                : "text-red-500/80 hover:text-red-500 hover:bg-red-50"
                            }
                          `}
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors
                  ${
                    isDark
                      ? "bg-white/10 text-white/80 hover:bg-white/20"
                      : "bg-black/5 text-slate-700 hover:bg-black/10"
                  }
                `}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:block">Sign In</span>
              </Link>
            )}

            {/* CTA */}
            <Link
              href="/contact"
              className={`
                ml-1 px-4 py-2 text-sm font-medium rounded-xl transition-colors whitespace-nowrap
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

              {/* Mobile User Section */}
              <div
                className={`mt-4 pt-8 border-t w-48 text-center ${
                  isDark ? "border-white/10" : "border-black/10"
                }`}
              >
                {session ? (
                  <div className="space-y-4">
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-lg font-medium ${
                        isDark ? "text-white/70" : "text-slate-600"
                      }`}
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className={`text-lg font-medium ${
                        isDark ? "text-red-400" : "text-red-500"
                      }`}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-medium ${
                      isDark ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
