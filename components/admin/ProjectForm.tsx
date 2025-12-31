// src/components/admin/ProjectForm.tsx

"use client";

import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  createProjectSchema,
  CreateProjectInput,
} from "@/lib/validations/project.validation";
import { Project, ProjectCategory } from "@/types/project.types";
import { Loader2, Wand2 } from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { MultiImageUpload } from "@/components/ui/MultiImageUpload";

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: CreateProjectInput) => Promise<void>;
  isSubmitting: boolean;
}

const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: "WEB_DEVELOPMENT", label: "Web Development" },
  { value: "GRAPHIC_DESIGN", label: "Graphic Design" },
  { value: "BRANDING", label: "Branding" },
  { value: "UI_UX", label: "UI/UX Design" },
  { value: "FULL_STACK", label: "Full Stack" },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Convert null values to undefined for form compatibility
function sanitizeForForm(data: Project): CreateProjectInput {
  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    content: data.content ?? undefined,
    category: data.category,
    tags: data.tags ?? [],
    thumbnail: data.thumbnail,
    images: data.images ?? [],
    liveUrl: data.liveUrl ?? "",
    githubUrl: data.githubUrl ?? "",
    client: data.client ?? undefined,
    role: data.role ?? undefined,
    duration: data.duration ?? undefined,
    year: data.year,
    techStack: data.techStack ?? [],
    tools: data.tools ?? [],
    status: data.status,
    featured: data.featured,
    order: data.order,
  };
}

export function ProjectForm({
  initialData,
  onSubmit,
  isSubmitting,
}: ProjectFormProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [autoSlug, setAutoSlug] = useState(!initialData);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: initialData
      ? sanitizeForForm(initialData)
      : {
          status: "DRAFT",
          featured: false,
          order: 0,
          tags: [],
          techStack: [],
          tools: [],
          images: [],
          year: new Date().getFullYear(),
        },
  });

  // Watch title for auto-slug
  const title = useWatch({ control, name: "title" });

  useEffect(() => {
    if (autoSlug && title) {
      setValue("slug", generateSlug(title));
    }
  }, [title, autoSlug, setValue]);

  const inputClass = `
    w-full px-4 py-3 rounded-xl border outline-none transition-all
    ${
      isDark
        ? "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:bg-white/10"
        : "bg-white border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:shadow-lg"
    }
  `;

  const labelClass = `block text-sm font-medium mb-2 ${
    isDark ? "text-white/80" : "text-slate-700"
  }`;

  const sectionClass = `
    rounded-2xl p-6 space-y-6 backdrop-blur-xl border
    ${isDark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"}
  `;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Info */}
      <div className={sectionClass}>
        <h2
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Basic Information
        </h2>

        <div>
          <label className={labelClass}>Title *</label>
          <input
            {...register("title")}
            className={inputClass}
            placeholder="Project title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              className={`text-sm font-medium ${
                isDark ? "text-white/80" : "text-slate-700"
              }`}
            >
              Slug *
            </label>
            <button
              type="button"
              onClick={() => {
                setAutoSlug(!autoSlug);
                if (!autoSlug && title) {
                  setValue("slug", generateSlug(title));
                }
              }}
              className={`
                flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors
                ${
                  autoSlug
                    ? isDark
                      ? "bg-violet-500/20 text-violet-400"
                      : "bg-violet-100 text-violet-600"
                    : isDark
                    ? "bg-white/10 text-white/60 hover:bg-white/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }
              `}
            >
              <Wand2 className="w-3 h-3" />
              {autoSlug ? "Auto" : "Manual"}
            </button>
          </div>
          <input
            {...register("slug")}
            className={inputClass}
            placeholder="project-slug"
            disabled={autoSlug}
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-400">{errors.slug.message}</p>
          )}
          <p
            className={`mt-1 text-xs ${
              isDark ? "text-white/40" : "text-slate-400"
            }`}
          >
            URL: /projects/{title ? generateSlug(title) : "your-slug"}
          </p>
        </div>

        <div>
          <label className={labelClass}>Description *</label>
          <textarea
            {...register("description")}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Brief project description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Content</label>
          <textarea
            {...register("content")}
            rows={6}
            className={`${inputClass} resize-none`}
            placeholder="Detailed project content (supports markdown)"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Category *</label>
            <select {...register("category")} className={inputClass}>
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Year *</label>
            <input
              {...register("year", { valueAsNumber: true })}
              type="number"
              min={2000}
              max={new Date().getFullYear() + 1}
              className={inputClass}
              placeholder={new Date().getFullYear().toString()}
            />
            {errors.year && (
              <p className="mt-1 text-sm text-red-400">{errors.year.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className={sectionClass}>
        <h2
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Client Information
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Client Name</label>
            <input
              {...register("client")}
              className={inputClass}
              placeholder="Client or company name"
            />
          </div>

          <div>
            <label className={labelClass}>Your Role</label>
            <input
              {...register("role")}
              className={inputClass}
              placeholder="Lead Developer, Designer, etc."
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Duration</label>
          <input
            {...register("duration")}
            className={inputClass}
            placeholder="2 weeks, 3 months, etc."
          />
        </div>
      </div>

      {/* Images */}
      <div className={sectionClass}>
        <h2
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Images
        </h2>

        {/* Featured Image */}
        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              folder="portfolio/projects"
              label="Featured Image *"
              hint="Main image displayed on project cards and hero section"
              disabled={isSubmitting}
            />
          )}
        />
        {errors.thumbnail && (
          <p className="text-sm text-red-400">{errors.thumbnail.message}</p>
        )}

        {/* Additional Images */}
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <MultiImageUpload
              value={field.value || []}
              onChange={field.onChange}
              folder="portfolio/projects"
              label="Gallery Images"
              hint="Drag to reorder. These images will appear in the project gallery."
              disabled={isSubmitting}
              maxImages={10}
            />
          )}
        />
      </div>

      {/* Links */}
      <div className={sectionClass}>
        <h2
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Links
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Live URL</label>
            <input
              {...register("liveUrl")}
              className={inputClass}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className={labelClass}>GitHub URL</label>
            <input
              {...register("githubUrl")}
              className={inputClass}
              placeholder="https://github.com/..."
            />
          </div>
        </div>
      </div>

      {/* Tags & Tech */}
      <div className={sectionClass}>
        <h2
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Tags & Technologies
        </h2>

        <div>
          <label className={labelClass}>Tags * (comma separated)</label>
          <input
            {...register("tags", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  : v,
            })}
            className={inputClass}
            placeholder="e-commerce, landing page, dashboard"
          />
          {errors.tags && (
            <p className="mt-1 text-sm text-red-400">{errors.tags.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Tech Stack (comma separated)</label>
          <input
            {...register("techStack", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  : v,
            })}
            className={inputClass}
            placeholder="Next.js, Prisma, PostgreSQL, Tailwind"
          />
        </div>

        <div>
          <label className={labelClass}>Design Tools (comma separated)</label>
          <input
            {...register("tools", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  : v,
            })}
            className={inputClass}
            placeholder="Figma, Photoshop, Illustrator"
          />
        </div>
      </div>

      {/* Settings */}
      <div className={sectionClass}>
        <h2
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Settings
        </h2>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              {...register("featured")}
              type="checkbox"
              className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-violet-500 focus:ring-violet-500 focus:ring-offset-0"
            />
            <span className={isDark ? "text-white/80" : "text-slate-700"}>
              Featured project
            </span>
          </label>

          <div className="flex items-center gap-3">
            <label
              className={`text-sm ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}
            >
              Display order:
            </label>
            <input
              {...register("order", { valueAsNumber: true })}
              type="number"
              min={0}
              className={`w-20 px-3 py-2 rounded-lg text-center ${inputClass}`}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            px-8 py-4 rounded-2xl font-medium flex items-center gap-2 cursor-pointer
            transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
            ${
              isDark
                ? "bg-white text-slate-900 hover:shadow-lg hover:shadow-white/20"
                : "bg-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/20"
            }
          `}
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Update Project" : "Create Project"}
        </motion.button>
      </div>
    </form>
  );
}
