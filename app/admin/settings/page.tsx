// src/app/admin/settings/page.tsx

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Loader2,
  User,
  Globe,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Dribbble,
  Link,
  FileText,
  Image,
  CheckCircle,
  AlertCircle,
  Settings,
  Briefcase,
} from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { UpdateSettingsDTO } from "@/types/settings.types";

type TabId = "profile" | "site" | "social" | "contact";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "site", label: "Site", icon: Globe },
  { id: "social", label: "Social", icon: Link },
  { id: "contact", label: "Contact", icon: Mail },
];

const AVAILABILITY_OPTIONS = [
  { value: "available", label: "Available for projects", color: "green" },
  { value: "busy", label: "Currently busy", color: "amber" },
  { value: "unavailable", label: "Not available", color: "red" },
];

export default function AdminSettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [formData, setFormData] = useState<UpdateSettingsDTO>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { data, isLoading, error } = useSettings();
  const updateSettings = useUpdateSettings();

  // Initialize form data when settings load
  useEffect(() => {
    if (data?.data) {
      setFormData({
        siteName: data.data.siteName,
        siteDescription: data.data.siteDescription,
        ownerName: data.data.ownerName,
        ownerEmail: data.data.ownerEmail,
        ownerTitle: data.data.ownerTitle,
        ownerBio: data.data.ownerBio,
        location: data.data.location,
        availability: data.data.availability,
        availabilityStatus: data.data.availabilityStatus as
          | "available"
          | "busy"
          | "unavailable",
        socialGithub: data.data.socialGithub,
        socialLinkedin: data.data.socialLinkedin,
        socialTwitter: data.data.socialTwitter,
        socialInstagram: data.data.socialInstagram,
        socialDribbble: data.data.socialDribbble,
        contactEmail: data.data.contactEmail,
        resumeUrl: data.data.resumeUrl,
        profileImageUrl: data.data.profileImageUrl,
      });
    }
  }, [data]);

  // Show toast and auto-hide
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateSettings.mutateAsync(formData);
      setHasChanges(false);
      setToast({ type: "success", message: "Settings saved successfully!" });
    } catch (err) {
      setToast({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to save settings",
      });
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none transition-all ${
    isDark
      ? "bg-white/5 border-gray-300/10 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:bg-white/10"
      : "bg-white border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-violet-500"
  }`;

  const labelClass = `block text-sm font-medium mb-2 ${
    isDark ? "text-white/80" : "text-slate-700"
  }`;

  const cardClass = `p-6 rounded-2xl backdrop-blur-xl border ${
    isDark ? "bg-white/5 border-gray-300/10" : "bg-white/70 border-black/10"
  }`;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2
          className={`w-8 h-8 animate-spin ${
            isDark ? "text-white/40" : "text-slate-400"
          }`}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">Failed to load settings</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div
          className={`sticky top-0 z-10 p-6 border-b backdrop-blur-xl ${
            isDark
              ? "bg-slate-950/80 border-gray-300/10"
              : "bg-slate-100/80 border-black/10"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Settings
              </h1>
              <p
                className={`mt-1 ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                Manage your portfolio settings and preferences
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={!hasChanges || updateSettings.isPending}
              whileTap={{ scale: 0.98 }}
              className={`
                px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                ${
                  isDark
                    ? "bg-white text-slate-900 hover:opacity-90"
                    : "bg-slate-900 text-white hover:opacity-90"
                }
              `}
            >
              {updateSettings.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? isDark
                        ? "bg-violet-500/20 text-violet-400"
                        : "bg-violet-100 text-violet-600"
                      : isDark
                      ? "text-white/60 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-4xl mx-auto">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? "bg-violet-500/20" : "bg-violet-100"
                    }`}
                  >
                    <User className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h2
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Personal Information
                    </h2>
                    <p
                      className={`text-sm ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      Your public profile information
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ownerName" className={labelClass}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="ownerName"
                      name="ownerName"
                      value={formData.ownerName || ""}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="ownerEmail" className={labelClass}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="ownerEmail"
                      name="ownerEmail"
                      value={formData.ownerEmail || ""}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="ownerTitle" className={labelClass}>
                      Professional Title
                    </label>
                    <input
                      type="text"
                      id="ownerTitle"
                      name="ownerTitle"
                      value={formData.ownerTitle || ""}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Full-Stack Developer & Designer"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="ownerBio" className={labelClass}>
                      Bio
                    </label>
                    <textarea
                      id="ownerBio"
                      name="ownerBio"
                      value={formData.ownerBio || ""}
                      onChange={handleChange}
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell visitors about yourself..."
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className={labelClass}>
                      Location
                    </label>
                    <div className="relative">
                      <MapPin
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-white/40" : "text-slate-400"
                        }`}
                      />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location || ""}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="profileImageUrl" className={labelClass}>
                      Profile Image URL
                    </label>
                    <div className="relative">
                      <Image
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-white/40" : "text-slate-400"
                        }`}
                      />
                      <input
                        type="url"
                        id="profileImageUrl"
                        name="profileImageUrl"
                        value={formData.profileImageUrl || ""}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? "bg-green-500/20" : "bg-green-100"
                    }`}
                  >
                    <Briefcase className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h2
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Availability
                    </h2>
                    <p
                      className={`text-sm ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      Let visitors know if you're open to new projects
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="availabilityStatus" className={labelClass}>
                      Status
                    </label>
                    <select
                      id="availabilityStatus"
                      name="availabilityStatus"
                      value={formData.availabilityStatus || "available"}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {AVAILABILITY_OPTIONS.map((option) => (
                        <option
                          className={`${
                            isDark ? "text-gray-700" : "text-gray-700"
                          }`}
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="availability" className={labelClass}>
                      Custom Message
                    </label>
                    <input
                      type="text"
                      id="availability"
                      name="availability"
                      value={formData.availability || ""}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Currently accepting new clients"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Site Tab */}
          {activeTab === "site" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? "bg-cyan-500/20" : "bg-cyan-100"
                    }`}
                  >
                    <Globe className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <h2
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Site Information
                    </h2>
                    <p
                      className={`text-sm ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      General site settings and metadata
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="siteName" className={labelClass}>
                      Site Name
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      name="siteName"
                      value={formData.siteName || ""}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="My Portfolio"
                    />
                  </div>

                  <div>
                    <label htmlFor="siteDescription" className={labelClass}>
                      Site Description
                    </label>
                    <textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={formData.siteDescription || ""}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="A brief description of your portfolio..."
                    />
                    <p
                      className={`mt-2 text-xs ${
                        isDark ? "text-white/40" : "text-slate-400"
                      }`}
                    >
                      Used for SEO and social sharing
                    </p>
                  </div>

                  <div>
                    <label htmlFor="resumeUrl" className={labelClass}>
                      Resume URL
                    </label>
                    <div className="relative">
                      <FileText
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-white/40" : "text-slate-400"
                        }`}
                      />
                      <input
                        type="url"
                        id="resumeUrl"
                        name="resumeUrl"
                        value={formData.resumeUrl || ""}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social Tab */}
          {activeTab === "social" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? "bg-fuchsia-500/20" : "bg-fuchsia-100"
                    }`}
                  >
                    <Link className="w-5 h-5 text-fuchsia-500" />
                  </div>
                  <div>
                    <h2
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Social Links
                    </h2>
                    <p
                      className={`text-sm ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      Connect your social media profiles
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="socialGithub" className={labelClass}>
                      GitHub
                    </label>
                    <div className="relative">
                      <Github
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-white/40" : "text-slate-400"
                        }`}
                      />
                      <input
                        type="url"
                        id="socialGithub"
                        name="socialGithub"
                        value={formData.socialGithub || ""}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="socialLinkedin" className={labelClass}>
                      LinkedIn
                    </label>
                    <div className="relative">
                      <Linkedin
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-white/40" : "text-slate-400"
                        }`}
                      />
                      <input
                        type="url"
                        id="socialLinkedin"
                        name="socialLinkedin"
                        value={formData.socialLinkedin || ""}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="socialTwitter" className={labelClass}>
                      Twitter / X
                    </label>
                    <div className="relative">
                      <Twitter
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-white/40" : "text-slate-400"
                        }`}
                      />
                      <input
                        type="url"
                        id="socialTwitter"
                        name="socialTwitter"
                        value={formData.socialTwitter || ""}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="socialInstagram" className={labelClass}>
                      Instagram
                    </label>
                    <div className="relative">
                      <Instagram
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-white/40" : "text-slate-400"
                        }`}
                      />
                      <input
                        type="url"
                        id="socialInstagram"
                        name="socialInstagram"
                        value={formData.socialInstagram || ""}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="socialDribbble" className={labelClass}>
                      Dribbble
                    </label>
                    <div className="relative">
                      <Dribbble
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-white/40" : "text-slate-400"
                        }`}
                      />
                      <input
                        type="url"
                        id="socialDribbble"
                        name="socialDribbble"
                        value={formData.socialDribbble || ""}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="https://dribbble.com/username"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className={cardClass}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? "bg-amber-500/20" : "bg-amber-100"
                    }`}
                  >
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h2
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Contact Settings
                    </h2>
                    <p
                      className={`text-sm ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      How visitors can reach you
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="contactEmail" className={labelClass}>
                      Public Contact Email
                    </label>
                    <div className="relative">
                      <Mail
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                          isDark ? "text-white/40" : "text-slate-400"
                        }`}
                      />
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail || ""}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="hello@example.com"
                      />
                    </div>
                    <p
                      className={`mt-2 text-xs ${
                        isDark ? "text-white/40" : "text-slate-400"
                      }`}
                    >
                      This email will be displayed on your contact page
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification Settings Info */}
              <div className={`${cardClass} border-dashed`}>
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? "bg-blue-500/20" : "bg-blue-100"
                    }`}
                  >
                    <Settings className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3
                      className={`font-medium ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Email Notifications
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      When someone submits the contact form, you'll receive a
                      notification at your admin email address, and they'll
                      receive a confirmation email.
                    </p>
                    <p
                      className={`text-sm mt-2 ${
                        isDark ? "text-white/40" : "text-slate-400"
                      }`}
                    >
                      Admin email is configured in your environment variables.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </form>

      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`
            fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-xl flex items-center gap-3
            ${
              toast.type === "success"
                ? isDark
                  ? "bg-green-500/20 border border-green-500/30 text-green-400"
                  : "bg-green-50 border border-green-200 text-green-600"
                : isDark
                ? "bg-red-500/20 border border-red-500/30 text-red-400"
                : "bg-red-50 border border-red-200 text-red-600"
            }
          `}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {toast.message}
        </motion.div>
      )}
    </div>
  );
}
