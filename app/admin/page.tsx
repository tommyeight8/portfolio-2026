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

// ============ GLASS CARD ============

function GlassCard({
  children,
  className = "",
  isDark,
}: {
  children: React.ReactNode;
  className?: string;
  isDark: boolean;
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl 
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        transition-all duration-300
        ${
          isDark
            ? "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
            : "bg-black/[0.02] border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// ============ STAT CARD ============

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  href: string;
  isDark: boolean;
  badge?: React.ReactNode;
}

function StatCard({
  label,
  value,
  icon: Icon,
  accentColor,
  href,
  isDark,
  badge,
}: StatCardProps) {
  return (
    <Link href={href}>
      <GlassCard isDark={isDark} className="p-6 group hover:-translate-y-1">
        {/* Accent glow */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ backgroundColor: accentColor }}
        />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div
              className="p-2.5 rounded-xl"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
              }}
            >
              <Icon className="w-5 h-5" />
            </div>
            {badge}
          </div>

          <p
            className={`text-3xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {value}
          </p>
          <p
            className={`text-xs font-medium uppercase tracking-wide mt-2 ${
              isDark ? "text-zinc-400" : "text-slate-500"
            }`}
          >
            {label}
          </p>
        </div>
      </GlassCard>
    </Link>
  );
}

// ============ ACTION CARD ============

interface ActionCardProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  href: string;
  isDark: boolean;
  external?: boolean;
  badge?: number;
}

function ActionCard({
  label,
  icon: Icon,
  accentColor,
  href,
  isDark,
  external,
  badge,
}: ActionCardProps) {
  return (
    <Link href={href} target={external ? "_blank" : undefined}>
      <GlassCard
        isDark={isDark}
        className="p-4 group hover:-translate-y-1 flex items-center gap-4"
      >
        {/* Accent glow */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ backgroundColor: accentColor }}
        />

        <div className="relative flex items-center gap-4 w-full">
          <div
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span
            className={`font-medium ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {label}
          </span>
          {badge && badge > 0 && (
            <span className="ml-auto px-2.5 py-1 text-xs font-medium rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/20">
              {badge}
            </span>
          )}
        </div>
      </GlassCard>
    </Link>
  );
}

// ============ SECTION HEADER ============

function SectionHeader({ title, isDark }: { title: string; isDark: boolean }) {
  return (
    <h2
      className={`text-xs font-medium uppercase tracking-wide mb-4 ${
        isDark ? "text-zinc-400" : "text-slate-500"
      }`}
    >
      {title}
    </h2>
  );
}

// ============ COLOR MAP ============

const accentColors: Record<string, string> = {
  violet: "#8b5cf6",
  emerald: "#10b981",
  amber: "#f59e0b",
  fuchsia: "#d946ef",
  cyan: "#06b6d4",
  rose: "#f43f5e",
};

export default function AdminDashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data, isLoading } = useAdminStats();

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div
          className={`
            p-4 rounded-2xl backdrop-blur-xl
            shadow-[0_8px_32px_rgba(0,0,0,0.3)]
            ${
              isDark
                ? "bg-white/[0.03] border border-white/[0.08]"
                : "bg-black/[0.02] border border-black/[0.06]"
            }
          `}
        >
          <Loader2
            className={`w-8 h-8 animate-spin ${
              isDark ? "text-zinc-400" : "text-slate-400"
            }`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <h1
          className={`text-3xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Dashboard
        </h1>
        <p
          className={`mt-2 text-sm ${
            isDark ? "text-zinc-500" : "text-slate-500"
          }`}
        >
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </div>

      {/* Project Stats */}
      <div className="mb-10">
        <SectionHeader title="Projects" isDark={isDark} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projectStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                accentColor={accentColors[stat.color]}
                href={stat.href}
                isDark={isDark}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Message Stats */}
      <div className="mb-10">
        <SectionHeader title="Messages" isDark={isDark} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {messageStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <StatCard
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                accentColor={accentColors[stat.color]}
                href={stat.href}
                isDark={isDark}
                badge={
                  stat.label === "Unread" && stat.value > 0 ? (
                    <span className="px-2.5 py-1 text-xs font-medium rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/20">
                      New
                    </span>
                  ) : undefined
                }
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <SectionHeader title="Quick Actions" isDark={isDark} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <ActionCard
                label={action.label}
                icon={action.icon}
                accentColor={accentColors[action.color]}
                href={action.href}
                isDark={isDark}
                external={action.external}
                badge={action.badge}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
