// src/types/contact.types.ts

import { ContactSubmission } from "@prisma/client";

export type { ContactSubmission };

export interface CreateContactDTO {
  name: string;
  email: string;
  company?: string | null;
  subject: string;
  message: string;
}

export interface UpdateContactDTO {
  read?: boolean;
}

export interface ContactFilters {
  read?: boolean;
  search?: string;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: keyof ContactSubmission;
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
