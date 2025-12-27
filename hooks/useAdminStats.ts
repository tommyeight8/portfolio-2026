// src/hooks/useAdminStats.ts

import { useQuery } from "@tanstack/react-query";

interface AdminStats {
  projects: {
    total: number;
    published: number;
    draft: number;
    featured: number;
  };
  messages: {
    total: number;
    unread: number;
  };
}

interface StatsResponse {
  success: boolean;
  data: AdminStats;
}

async function fetchAdminStats(): Promise<StatsResponse> {
  const res = await fetch("/api/admin/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: fetchAdminStats,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}
