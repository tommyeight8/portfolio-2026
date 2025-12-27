// src/lib/api/settings.api.ts

import { SiteSettings, UpdateSettingsDTO } from "@/types/settings.types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const settingsApi = {
  async get(): Promise<ApiResponse<SiteSettings>> {
    const res = await fetch("/api/settings");
    if (!res.ok) throw new Error("Failed to fetch settings");
    return res.json();
  },

  async update(data: UpdateSettingsDTO): Promise<ApiResponse<SiteSettings>> {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to update settings");
    }
    return json;
  },
};
