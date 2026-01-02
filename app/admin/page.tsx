// src/app/admin/page.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FolderKanban,
  Eye,
  FileEdit,
  Star,
  Mail,
  MailWarning,
  Plus,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { useAdminStats } from "@/hooks/useAdminStats";

export default function AdminDashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data, isLoading, error } = useAdminStats();

  const stats = data?.data;

  const projectStats = [
    {
      label: "Total Projects",
      value: stats?.projects.total ?? 0,
      icon: FolderKanban,
      color: "violet",
      href: "/admin/projects",
    },
    {
      label: "Published",
      value: stats?.projects.published ?? 0,
      icon: Eye,
      color: "emerald",
      href: "/admin/projects?status=published",
    },
    {
      label: "Drafts",
      value: stats?.projects.draft ?? 0,
      icon: FileEdit,
      color: "amber",
      href: "/admin/projects?status=draft",
    },
    {
      label: "Featured",
      value: stats?.projects.featured ?? 0,
      icon: Star,
      color: "fuchsia",
      href: "/admin/projects?featured=true",
    },
  ];

  const messageStats = [
    {
      label: "Total Messages",
      value: stats?.messages.total ?? 0,
      icon: Mail,
      color: "cyan",
      href: "/admin/messages",
    },
    {
      label: "Unread",
      value: stats?.messages.unread ?? 0,
      icon: MailWarning,
      color: "rose",
      href: "/admin/messages?filter=unread",
    },
  ];

  const quickActions = [
    {
      label: "Add New Project",
      icon: Plus,
      href: "/admin/projects/new",
      color: "violet",
    },
    {
      label: "Manage Projects",
      icon: FolderKanban,
      href: "/admin/projects",
      color: "cyan",
    },
    {
      label: "View Messages",
      icon: Mail,
      href: "/admin/messages",
      color: "fuchsia",
      badge: stats?.messages.unread,
    },
    {
      label: "View Site",
      icon: ExternalLink,
      href: "/",
      color: "emerald",
      external: true,
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> =
    {
      violet: {
        bg: isDark ? "bg-violet-500/20" : "bg-violet-100",
        text: "text-violet-500",
        border: isDark ? "border-violet-500/30" : "border-violet-200",
      },
      emerald: {
        bg: isDark ? "bg-emerald-500/20" : "bg-emerald-100",
        text: "text-emerald-500",
        border: isDark ? "border-emerald-500/30" : "border-emerald-200",
      },
      amber: {
        bg: isDark ? "bg-amber-500/20" : "bg-amber-100",
        text: "text-amber-500",
        border: isDark ? "border-amber-500/30" : "border-amber-200",
      },
      fuchsia: {
        bg: isDark ? "bg-fuchsia-500/20" : "bg-fuchsia-100",
        text: "text-fuchsia-500",
        border: isDark ? "border-fuchsia-500/30" : "border-fuchsia-200",
      },
      cyan: {
        bg: isDark ? "bg-cyan-500/20" : "bg-cyan-100",
        text: "text-cyan-500",
        border: isDark ? "border-cyan-500/30" : "border-cyan-200",
      },
      rose: {
        bg: isDark ? "bg-rose-500/20" : "bg-rose-100",
        text: "text-rose-500",
        border: isDark ? "border-rose-500/30" : "border-rose-200",
      },
    };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2
          className={`w-8 h-8 animate-spin ${
            isDark ? "text-white/40" : "text-slate-400"
          }`}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl font-bold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Dashboard
        </h1>
        <p className={`mt-2 ${isDark ? "text-white/50" : "text-slate-500"}`}>
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </div>

      {/* Project Stats */}
      <div className="mb-8">
        <h2
          className={`text-lg font-semibold mb-4 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectStats.map((stat, index) => {
            const colors = colorMap[stat.color];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={stat.href}>
                  <div
                    className={`
                      p-6 rounded-md border backdrop-blur-xl
                      transition-all duration-300 hover:-translate-y-1
                      ${
                        isDark
                          ? "bg-white/5 border-gray-300/10 hover:border-white/20"
                          : "bg-white/70 border-black/10 hover:shadow-lg"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${colors.bg}`}>
                        <stat.icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                    </div>
                    <p
                      className={`text-3xl font-bold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      {stat.label}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Message Stats */}
      <div className="mb-8">
        <h2
          className={`text-lg font-semibold mb-4 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Messages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {messageStats.map((stat, index) => {
            const colors = colorMap[stat.color];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link href={stat.href}>
                  <div
                    className={`
                      p-6 rounded-md border backdrop-blur-xl
                      transition-all duration-300 hover:-translate-y-1
                      ${
                        isDark
                          ? "bg-white/5 border-gray-300/10 hover:border-white/20"
                          : "bg-white/70 border-black/10 hover:shadow-lg"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${colors.bg}`}>
                        <stat.icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      {stat.label === "Unread" && stat.value > 0 && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-rose-500 text-white">
                          New
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-3xl font-bold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      {stat.label}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2
          className={`text-lg font-semibold mb-4 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const colors = colorMap[action.color];
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                >
                  <div
                    className={`
                      p-4 rounded-md border backdrop-blur-xl
                      flex items-center gap-4
                      transition-all duration-300 hover:-translate-y-1
                      ${
                        isDark
                          ? "bg-white/5 border-gray-300/10 hover:border-white/20"
                          : "bg-white/70 border-black/10 hover:shadow-lg"
                      }
                    `}
                  >
                    <div className={`p-3 rounded-xl ${colors.bg}`}>
                      <action.icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <span
                      className={`font-medium ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {action.label}
                    </span>
                    {action.badge && action.badge > 0 && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-rose-500 text-white">
                        {action.badge}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
