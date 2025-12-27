// src/lib/api/projects.api.ts

import {
  Project,
  CreateProjectDTO,
  UpdateProjectDTO,
  PaginatedResult,
  ApiResponse,
} from "@/types/project.types";

const BASE_URL = "/api/projects";

export const projectsApi = {
  // Get published projects only (for public pages)
  async getAll(
    params?: Record<string, string>
  ): Promise<PaginatedResult<Project>> {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`${BASE_URL}?${searchParams}`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  },

  // Get all projects including drafts (for admin)
  async getAllAdmin(
    params?: Record<string, string>
  ): Promise<PaginatedResult<Project>> {
    const searchParams = new URLSearchParams({ ...params, all: "true" });
    const res = await fetch(`${BASE_URL}?${searchParams}`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  },

  async getById(id: string): Promise<ApiResponse<Project>> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch project");
    return res.json();
  },

  async create(data: CreateProjectDTO): Promise<ApiResponse<Project>> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to create project");
    }
    return json;
  },

  async update(
    id: string,
    data: UpdateProjectDTO
  ): Promise<ApiResponse<Project>> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to update project");
    }
    return json;
  },

  async delete(id: string): Promise<ApiResponse<Project>> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to delete project");
    }
    return json;
  },

  async publish(id: string): Promise<ApiResponse<Project>> {
    const res = await fetch(`${BASE_URL}/${id}/publish`, { method: "PATCH" });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to publish project");
    }
    return json;
  },

  async unpublish(id: string): Promise<ApiResponse<Project>> {
    const res = await fetch(`${BASE_URL}/${id}/unpublish`, { method: "PATCH" });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to unpublish project");
    }
    return json;
  },

  async reorder(
    projects: { id: string; order: number }[]
  ): Promise<ApiResponse<void>> {
    const res = await fetch(`${BASE_URL}/reorder`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to reorder projects");
    }
    return json;
  },
};
