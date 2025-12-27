// src/types/project.types.ts

import { Project, ProjectCategory, ProjectStatus } from "@prisma/client";

export { ProjectCategory, ProjectStatus };
export type { Project };

export interface CreateProjectDTO {
  title: string;
  slug: string;
  description: string;
  content?: string;
  category: ProjectCategory;
  tags: string[];
  thumbnail: string;
  images?: string[];
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  client?: string;
  role?: string;
  duration?: string;
  year: number;
  techStack?: string[];
  tools?: string[];
  status?: ProjectStatus;
  featured?: boolean;
  order?: number;
}

export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {
  publishedAt?: Date | null;
}

export interface ProjectFilters {
  category?: ProjectCategory;
  status?: ProjectStatus;
  featured?: boolean;
  tags?: string[];
  year?: number;
  search?: string;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: keyof Project;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
