// src/lib/services/settings.service.ts

import settingsRepository from "@/lib/repositories/settings.repository";
import {
  updateSettingsSchema,
  UpdateSettingsInput,
} from "@/lib/validations/settings.validation";
import { SiteSettings } from "@/types/settings.types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class SettingsService {
  async getSettings(): Promise<ApiResponse<SiteSettings>> {
    try {
      const settings = await settingsRepository.get();
      return { success: true, data: settings as SiteSettings };
    } catch (error) {
      console.error("Get settings error:", error);
      return { success: false, error: "Failed to get settings" };
    }
  }

  async updateSettings(
    data: UpdateSettingsInput
  ): Promise<ApiResponse<SiteSettings>> {
    try {
      const validated = updateSettingsSchema.parse(data);
      const settings = await settingsRepository.update(validated);
      return {
        success: true,
        data: settings as SiteSettings,
        message: "Settings updated successfully",
      };
    } catch (error) {
      console.error("Update settings error:", error);
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Failed to update settings" };
    }
  }
}

export const settingsService = new SettingsService();
export default settingsService;
