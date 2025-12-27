// src/lib/validations/settings.validation.ts

import { z } from "zod";

const optionalUrl = z
  .string()
  .transform((val) => (val === "" ? null : val))
  .pipe(z.string().url().nullable())
  .or(z.literal("").transform(() => null))
  .nullable()
  .optional();

export const updateSettingsSchema = z.object({
  siteName: z.string().min(1).max(100).optional(),
  siteDescription: z.string().max(500).optional(),
  ownerName: z.string().min(1).max(100).optional(),
  ownerEmail: z.string().email().optional(),
  ownerTitle: z.string().max(200).optional(),
  ownerBio: z.string().max(2000).optional(),
  location: z.string().max(100).optional(),
  availability: z.string().max(200).optional(),
  availabilityStatus: z.enum(["available", "busy", "unavailable"]).optional(),
  socialGithub: optionalUrl,
  socialLinkedin: optionalUrl,
  socialTwitter: optionalUrl,
  socialInstagram: optionalUrl,
  socialDribbble: optionalUrl,
  contactEmail: z.string().email().optional(),
  resumeUrl: optionalUrl,
  profileImageUrl: optionalUrl,
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
