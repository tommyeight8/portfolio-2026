// src/components/admin/AdminSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  Settings,
  Sun,
  Moon,
  LogOut,
  ChevronLeft,
  User,
} from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { useState } from "react";
import { useUnreadCount } from "@/hooks/useContacts";

const NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { href: "/admin/messages", icon: Mail, label: "Messages", showBadge: true },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();
  const { data: unreadData } = useUnreadCount();
  const unreadCount = unreadData?.data?.count ?? 0;

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-64"} 
        h-screen sticky top-0 
        flex flex-col
        border-r transition-all duration-300
        ${
          isDark
            ? "bg-slate/20 border-gray-300/10"
            : "bg-white/70 border-black/10"
        }
        backdrop-blur-xl
      `}
    >
      {/* Header */}
      <div
        className={`p-6 border-b ${
          isDark ? "border-gray-300/10" : "border-black/10"
        }`}
      >
        <div className="flex items-center justify-between">
          {!collapsed && (
            <Link
              href="/admin"
              className={`text-xl font-bold flex items-baseline gap-1 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Admin<span className="bg-violet-500 h-1 w-1 block"></span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              isDark
                ? "hover:bg-white/10 text-white/60"
                : "hover:bg-black/5 text-slate-500"
            }`}
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* User Info */}
      {session?.user && (
        <div
          className={`px-4 py-3 border-b ${
            isDark ? "border-gray-300/10" : "border-black/10"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-md ${
                isDark ? "bg-violet-500/20" : "bg-violet-100"
              }`}
            >
              <User className="w-4 h-4 text-violet-500" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {session.user.name || session.user.email?.split("@")[0]}
                </p>
                <p
                  className={`text-xs truncate ${
                    isDark ? "text-white/50" : "text-slate-500"
                  }`}
                >
                  {session.user.email}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-col flex-1 p-4 gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          const badgeCount = item.showBadge ? unreadCount : 0;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-md
                  transition-all duration-200 text-sm tracking-wide
                  ${
                    isActive
                      ? isDark
                        ? "bg-violet-500/20 text-violet-300"
                        : "bg-violet-100 text-violet-600"
                      : isDark
                      ? "text-white/60 hover:text-white hover:bg-slate-900/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                  }
                `}
              >
                <div className="relative">
                  <item.icon className="w-5 h-5 shrink-0" />
                  {collapsed && badgeCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-slate-900" />
                  )}
                </div>
                {!collapsed && (
                  <>
                    <span className="font-medium flex-1">{item.label}</span>
                    {badgeCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white min-w-[20px] text-center">
                        {badgeCount > 99 ? "99+" : badgeCount}
                      </span>
                    )}
                  </>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className={`p-4 border-t ${
          isDark ? "border-gray-300/10" : "border-black/10"
        }`}
      >
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-md
            transition-colors mb-2 cursor-pointer text-sm tracking-wide
            ${
              isDark
                ? "text-white/60 hover:text-white hover:bg-slate-900/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
            }
          `}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!collapsed && (
            <span className="font-medium">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        {/* Back to Site */}
        <Link href="/">
          <div
            className={`
              flex items-center gap-3 px-4 py-3 rounded-md mb-2
              transition-colors text-sm tracking-wide
              ${
                isDark
                  ? "text-white/60 hover:text-white hover:bg-slate-900/60"
                  : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
              }
            `}
          >
            <LogOut className="w-5 h-5 rotate-180" />
            {!collapsed && <span className="font-medium">View Site</span>}
          </div>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-md
            transition-colors cursor-pointer text-sm tracking-wide
            ${
              isDark
                ? "text-red-400/80 hover:text-red-400 hover:bg-red-500/10"
                : "text-red-500/80 hover:text-red-500 hover:bg-red-50"
            }
          `}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
