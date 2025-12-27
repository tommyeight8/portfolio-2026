// src/app/admin/layout.tsx

"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useTheme } from "@/lib/providers/ThemeProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        isDark ? "bg-slate-950" : "bg-slate-100"
      }`}
    >
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
