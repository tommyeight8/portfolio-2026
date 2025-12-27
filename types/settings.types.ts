// src/types/settings.types.ts

export interface SiteSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  ownerName: string;
  ownerEmail: string;
  ownerTitle: string;
  ownerBio: string;
  location: string;
  availability: string;
  availabilityStatus: "available" | "busy" | "unavailable";
  socialGithub: string | null;
  socialLinkedin: string | null;
  socialTwitter: string | null;
  socialInstagram: string | null;
  socialDribbble: string | null;
  contactEmail: string;
  resumeUrl: string | null;
  profileImageUrl: string | null;
  updatedAt: Date;
}

export interface UpdateSettingsDTO {
  siteName?: string;
  siteDescription?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerTitle?: string;
  ownerBio?: string;
  location?: string;
  availability?: string;
  availabilityStatus?: "available" | "busy" | "unavailable";
  socialGithub?: string | null;
  socialLinkedin?: string | null;
  socialTwitter?: string | null;
  socialInstagram?: string | null;
  socialDribbble?: string | null;
  contactEmail?: string;
  resumeUrl?: string | null;
  profileImageUrl?: string | null;
}
