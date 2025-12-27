// src/lib/repositories/settings.repository.ts

import prisma from "@/lib/db/prisma";
import { UpdateSettingsDTO } from "@/types/settings.types";

const DEFAULT_SETTINGS_ID = "default";

class SettingsRepository {
  async get() {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: DEFAULT_SETTINGS_ID },
    });

    // Create default settings if they don't exist
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: DEFAULT_SETTINGS_ID },
      });
    }

    return settings;
  }

  async update(data: UpdateSettingsDTO) {
    return prisma.siteSettings.upsert({
      where: { id: DEFAULT_SETTINGS_ID },
      update: data,
      create: { id: DEFAULT_SETTINGS_ID, ...data },
    });
  }
}

export const settingsRepository = new SettingsRepository();
export default settingsRepository;
