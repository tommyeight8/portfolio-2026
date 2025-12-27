// src/lib/services/project.service.ts

import projectRepository from "@/lib/repositories/project.repository";
import {
  createProjectSchema,
  updateProjectSchema,
  projectQuerySchema,
  CreateProjectInput,
  UpdateProjectInput,
  ProjectQueryInput,
} from "@/lib/validations/project.validation";
import {
  Project,
  ProjectFilters,
  PaginatedResult,
  ApiResponse,
} from "@/types/project.types";

class ProjectService {
  async getAllProjects(
    query: ProjectQueryInput
  ): Promise<PaginatedResult<Project>> {
    const validated = projectQuerySchema.parse(query);

    const filters: ProjectFilters = {
      category: validated.category,
      status: validated.status,
      featured: validated.featured,
      year: validated.year,
      search: validated.search,
    };

    return projectRepository.findAllPaginated(filters, {
      page: validated.page,
      limit: validated.limit,
      sortBy: validated.sortBy,
      sortOrder: validated.sortOrder,
    });
  }

  async getPublishedProjects(
    query: Partial<ProjectQueryInput> = {}
  ): Promise<PaginatedResult<Project>> {
    return this.getAllProjects({
      ...query,
      status: "PUBLISHED",
    } as ProjectQueryInput);
  }

  async getFeaturedProjects(limit: number = 6): Promise<Project[]> {
    return projectRepository.findFeatured(limit);
  }

  async getProjectById(id: string): Promise<Project | null> {
    return projectRepository.findById(id);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return projectRepository.findBySlug(slug);
  }

  async createProject(data: CreateProjectInput): Promise<ApiResponse<Project>> {
    try {
      const validated = createProjectSchema.parse(data);

      const existing = await projectRepository.findBySlug(validated.slug);
      if (existing) {
        return {
          success: false,
          error: "A project with this slug already exists",
        };
      }

      const project = await projectRepository.create(validated);
      return {
        success: true,
        data: project,
        message: "Project created successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Failed to create project" };
    }
  }

  async updateProject(
    id: string,
    data: UpdateProjectInput
  ): Promise<ApiResponse<Project>> {
    try {
      const validated = updateProjectSchema.parse(data);

      const existing = await projectRepository.findById(id);
      if (!existing) {
        return { success: false, error: "Project not found" };
      }

      if (validated.slug && validated.slug !== existing.slug) {
        const slugExists = await projectRepository.findBySlug(validated.slug);
        if (slugExists) {
          return {
            success: false,
            error: "A project with this slug already exists",
          };
        }
      }

      const project = await projectRepository.update(id, validated);
      return {
        success: true,
        data: project,
        message: "Project updated successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Failed to update project" };
    }
  }

  async deleteProject(id: string): Promise<ApiResponse<Project>> {
    try {
      const existing = await projectRepository.findById(id);
      if (!existing) {
        return { success: false, error: "Project not found" };
      }

      const project = await projectRepository.delete(id);
      return {
        success: true,
        data: project,
        message: "Project deleted successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Failed to delete project" };
    }
  }

  async publishProject(id: string): Promise<ApiResponse<Project>> {
    try {
      const existing = await projectRepository.findById(id);
      if (!existing) {
        return { success: false, error: "Project not found" };
      }

      const project = await projectRepository.publish(id);
      return {
        success: true,
        data: project,
        message: "Project published successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Failed to publish project" };
    }
  }

  async unpublishProject(id: string): Promise<ApiResponse<Project>> {
    try {
      const existing = await projectRepository.findById(id);
      if (!existing) {
        return { success: false, error: "Project not found" };
      }

      const project = await projectRepository.unpublish(id);
      return {
        success: true,
        data: project,
        message: "Project unpublished successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Failed to unpublish project" };
    }
  }

  async updateProjectOrder(
    projects: { id: string; order: number }[]
  ): Promise<ApiResponse<void>> {
    try {
      await projectRepository.updateOrder(projects);
      return { success: true, message: "Order updated successfully" };
    } catch (error) {
      return { success: false, error: "Failed to update order" };
    }
  }

  async getFilterOptions(): Promise<{
    years: number[];
    tags: string[];
    categories: string[];
  }> {
    const [years, tags] = await Promise.all([
      projectRepository.getDistinctYears(),
      projectRepository.getDistinctTags(),
    ]);

    return {
      years,
      tags,
      categories: [
        "WEB_DEVELOPMENT",
        "GRAPHIC_DESIGN",
        "BRANDING",
        "UI_UX",
        "FULL_STACK",
      ],
    };
  }
}

export const projectService = new ProjectService();
export default projectService;
