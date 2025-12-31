// src/lib/validations/project.validation.ts

import { z } from "zod";
import { ProjectCategory, ProjectStatus } from "@prisma/client";

export const projectCategorySchema = z.nativeEnum(ProjectCategory);
export const projectStatusSchema = z.nativeEnum(ProjectStatus);

// Helper to transform empty strings to null
const emptyStringToNull = z
  .string()
  .transform((val) => (val === "" ? null : val));

// Helper to transform empty strings to undefined (not null)
const optionalString = z
  .string()
  .transform((val) => (val === "" ? undefined : val))
  .optional();

// For URL fields - empty string becomes undefined
const optionalUrl = z
  .string()
  .transform((val) => (val === "" ? undefined : val))
  .pipe(z.string().url().optional())
  .optional();

const projectBaseSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500),
  content: optionalString,
  category: projectCategorySchema,
  tags: z
    .array(z.string().min(1).max(30))
    .min(1, "At least one tag is required")
    .max(10),
  thumbnail: z.string().url("Featured image must be a valid URL"),
  images: z.array(z.string().url()).max(20).optional().default([]),
  liveUrl: optionalUrl,
  githubUrl: optionalUrl,
  client: optionalString,
  role: optionalString,
  duration: optionalString,
  year: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  techStack: z.array(z.string().min(1).max(50)).max(20).optional().default([]),
  tools: z.array(z.string().min(1).max(50)).max(20).optional().default([]),
  status: projectStatusSchema.optional().default("DRAFT"),
  featured: z.boolean().optional().default(false),
  order: z.number().int().min(0).optional().default(0),
});

export const createProjectSchema = projectBaseSchema;
export const updateProjectSchema = projectBaseSchema.partial().extend({
  publishedAt: z.date().optional().nullable(),
});

export const projectQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(12),
  category: projectCategorySchema.optional(),
  status: projectStatusSchema.optional(),
  featured: z.coerce.boolean().optional(),
  year: z.coerce.number().int().optional(),
  search: z.string().max(100).optional(),
  sortBy: z
    .enum(["createdAt", "updatedAt", "year", "order", "title"])
    .optional()
    .default("order"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;
