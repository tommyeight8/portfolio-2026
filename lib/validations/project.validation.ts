// src/lib/validations/project.validation.ts

import { z } from "zod";
import { ProjectCategory, ProjectStatus } from "@prisma/client";

export const projectCategorySchema = z.nativeEnum(ProjectCategory);
export const projectStatusSchema = z.nativeEnum(ProjectStatus);

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
  content: z.string().optional(),
  category: projectCategorySchema,
  tags: z
    .array(z.string().min(1).max(30))
    .min(1, "At least one tag is required")
    .max(10),
  thumbnail: z.string().url("Featured image must be a valid URL"),
  images: z.array(z.string().url()).max(20),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  client: z.string().optional(),
  role: z.string().optional(),
  duration: z.string().optional(),
  year: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  techStack: z.array(z.string().min(1).max(50)).max(20),
  tools: z.array(z.string().min(1).max(50)).max(20),
  status: projectStatusSchema,
  featured: z.boolean(),
  order: z.number().int().min(0),
});

export const createProjectSchema = projectBaseSchema;
export const updateProjectSchema = projectBaseSchema.partial().extend({
  publishedAt: z.date().nullable().optional(),
});

export const projectQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  category: projectCategorySchema.optional(),
  status: projectStatusSchema.optional(),
  featured: z.coerce.boolean().optional(),
  year: z.coerce.number().int().optional(),
  search: z.string().max(100).optional(),
  sortBy: z
    .enum(["createdAt", "updatedAt", "year", "order", "title"])
    .default("order"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;
