// src/components/admin/AdminSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  // Get unread message count
  const { data: unreadData } = useUnreadCount();
  const unreadCount = unreadData?.data?.count ?? 0;

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-64"} 
        h-screen sticky top-0 
        flex flex-col
        border-r transition-all duration-300
        ${
          isDark
            ? "bg-slate-900/50 border-white/10"
            : "bg-white/70 border-black/10"
        }
        backdrop-blur-xl
      `}
    >
      {/* Header */}
      <div
        className={`p-6 border-b ${
          isDark ? "border-white/10" : "border-black/10"
        }`}
      >
        <div className="flex items-center justify-between">
          {!collapsed && (
            <Link
              href="/admin"
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Admin<span className="text-violet-500">.</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-lg transition-colors ${
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

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 bg-red">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          const badge = item.showBadge ? unreadCount : 0;

          return (
            <Link key={item.href} href={item.href} className="block">
              <motion.div
                className={`
            flex items-center gap-3 px-4 py-2 rounded-xl
            transition-all duration-200 relative
            ${
              isActive
                ? isDark
                  ? "bg-violet-500/20 text-violet-400"
                  : "bg-violet-100 text-violet-600"
                : isDark
                ? "text-white/60 hover:text-white hover:bg-white/10"
                : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
            }
          `}
              >
                <div className="relative">
                  <item.icon className="w-5 h-5 shrink-0" />
                  {/* Badge dot for collapsed state */}
                  {collapsed && badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </div>
                {!collapsed && (
                  <>
                    <span className="font-medium flex-1">{item.label}</span>
                    {/* Badge count for expanded state */}
                    {badge > 0 && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-rose-500 text-white">
                        {badge > 99 ? "99+" : badge}
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
          isDark ? "border-white/10" : "border-black/10"
        }`}
      >
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl
            transition-colors mb-2
            ${
              isDark
                ? "text-white/60 hover:text-white hover:bg-white/10"
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
              flex items-center gap-3 px-4 py-3 rounded-xl
              transition-colors
              ${
                isDark
                  ? "text-white/60 hover:text-white hover:bg-white/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
              }
            `}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Back to Site</span>}
          </div>
        </Link>
      </div>
    </aside>
  );
}
