// src/lib/repositories/project.repository.ts

import prisma from "@/lib/db/prisma";
import {
  Project,
  ProjectCategory,
  ProjectStatus,
  Prisma,
} from "@prisma/client";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
  ProjectFilters,
  PaginationOptions,
  PaginatedResult,
} from "@/types/project.types";
import { IRepository } from "./base.repository";

class ProjectRepository
  implements IRepository<Project, CreateProjectDTO, UpdateProjectDTO>
{
  private buildWhereClause(filters: ProjectFilters): Prisma.ProjectWhereInput {
    const where: Prisma.ProjectWhereInput = {};

    if (filters.category) where.category = filters.category;
    if (filters.status) where.status = filters.status;
    if (filters.featured !== undefined) where.featured = filters.featured;
    if (filters.year) where.year = filters.year;
    if (filters.tags && filters.tags.length > 0)
      where.tags = { hasSome: filters.tags };

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { tags: { has: filters.search } },
      ];
    }

    return where;
  }

  async findAll(filters?: ProjectFilters): Promise<Project[]> {
    const where = filters ? this.buildWhereClause(filters) : {};
    return prisma.project.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  }

  async findAllPaginated(
    filters: ProjectFilters = {},
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<Project>> {
    const {
      page = 1,
      limit = 12,
      sortBy = "order",
      sortOrder = "asc",
    } = pagination;
    const where = this.buildWhereClause(filters);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.project.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: { total, page, limit, totalPages, hasMore: page < totalPages },
    };
  }

  async findById(id: string): Promise<Project | null> {
    return prisma.project.findUnique({ where: { id } });
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return prisma.project.findUnique({ where: { slug } });
  }

  async findFeatured(limit: number = 6): Promise<Project[]> {
    return prisma.project.findMany({
      where: { featured: true, status: "PUBLISHED" },
      take: limit,
      orderBy: { order: "asc" },
    });
  }

  async findByCategory(
    category: ProjectCategory,
    status: ProjectStatus = "PUBLISHED"
  ): Promise<Project[]> {
    return prisma.project.findMany({
      where: { category, status },
      orderBy: { order: "asc" },
    });
  }

  async create(data: CreateProjectDTO): Promise<Project> {
    return prisma.project.create({ data });
  }

  async update(id: string, data: UpdateProjectDTO): Promise<Project> {
    return prisma.project.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Project> {
    return prisma.project.delete({ where: { id } });
  }

  async count(filters?: ProjectFilters): Promise<number> {
    const where = filters ? this.buildWhereClause(filters) : {};
    return prisma.project.count({ where });
  }

  async updateOrder(projects: { id: string; order: number }[]): Promise<void> {
    await prisma.$transaction(
      projects.map(({ id, order }) =>
        prisma.project.update({ where: { id }, data: { order } })
      )
    );
  }

  async publish(id: string): Promise<Project> {
    return prisma.project.update({
      where: { id },
      data: { status: "PUBLISHED", publishedAt: new Date() },
    });
  }

  async unpublish(id: string): Promise<Project> {
    return prisma.project.update({
      where: { id },
      data: { status: "DRAFT", publishedAt: null },
    });
  }

  async getDistinctYears(): Promise<number[]> {
    const results = await prisma.project.findMany({
      where: { status: "PUBLISHED" },
      select: { year: true },
      distinct: ["year"],
      orderBy: { year: "desc" },
    });
    return results.map((r) => r.year);
  }

  async getDistinctTags(): Promise<string[]> {
    const results = await prisma.project.findMany({
      where: { status: "PUBLISHED" },
      select: { tags: true },
    });
    const allTags = results.flatMap((r) => r.tags);
    return [...new Set(allTags)].sort();
  }
}

export const projectRepository = new ProjectRepository();
export default projectRepository;
