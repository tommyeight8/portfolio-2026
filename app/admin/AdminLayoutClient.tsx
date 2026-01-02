// src/app/admin/AdminLayoutClient.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useTheme } from "@/lib/providers/ThemeProvider";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  session: Session;
}

export function AdminLayoutClient({
  children,
  session,
}: AdminLayoutClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SessionProvider session={session}>
      <div
        className={`flex h-screen overflow-hidden transition-colors duration-300`}
      >
        <AdminSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SessionProvider>
  );
}
