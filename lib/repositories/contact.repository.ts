// src/lib/repositories/contact.repository.ts

import prisma from "@/lib/db/prisma";
import { ContactSubmission, Prisma } from "@prisma/client";
import {
  CreateContactDTO,
  UpdateContactDTO,
  ContactFilters,
  PaginationOptions,
  PaginatedResult,
} from "@/types/contact.types";

class ContactRepository {
  private buildWhereClause(
    filters: ContactFilters
  ): Prisma.ContactSubmissionWhereInput {
    const where: Prisma.ContactSubmissionWhereInput = {};

    if (filters.read !== undefined) {
      where.read = filters.read;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
        { subject: { contains: filters.search, mode: "insensitive" } },
        { message: { contains: filters.search, mode: "insensitive" } },
        { company: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    return where;
  }

  async findAll(filters?: ContactFilters): Promise<ContactSubmission[]> {
    const where = filters ? this.buildWhereClause(filters) : {};
    return prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async findAllPaginated(
    filters: ContactFilters = {},
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<ContactSubmission>> {
    const {
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = pagination;
    const where = this.buildWhereClause(filters);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: { total, page, limit, totalPages, hasMore: page < totalPages },
    };
  }

  async findById(id: string): Promise<ContactSubmission | null> {
    return prisma.contactSubmission.findUnique({ where: { id } });
  }

  async create(data: CreateContactDTO): Promise<ContactSubmission> {
    return prisma.contactSubmission.create({ data });
  }

  async update(id: string, data: UpdateContactDTO): Promise<ContactSubmission> {
    return prisma.contactSubmission.update({ where: { id }, data });
  }

  async delete(id: string): Promise<ContactSubmission> {
    return prisma.contactSubmission.delete({ where: { id } });
  }

  async deleteMany(ids: string[]): Promise<number> {
    const result = await prisma.contactSubmission.deleteMany({
      where: { id: { in: ids } },
    });
    return result.count;
  }

  async count(filters?: ContactFilters): Promise<number> {
    const where = filters ? this.buildWhereClause(filters) : {};
    return prisma.contactSubmission.count({ where });
  }

  async countUnread(): Promise<number> {
    return prisma.contactSubmission.count({ where: { read: false } });
  }

  async markAsRead(id: string): Promise<ContactSubmission> {
    return prisma.contactSubmission.update({
      where: { id },
      data: { read: true },
    });
  }

  async markAsUnread(id: string): Promise<ContactSubmission> {
    return prisma.contactSubmission.update({
      where: { id },
      data: { read: false },
    });
  }

  async markManyAsRead(ids: string[]): Promise<number> {
    const result = await prisma.contactSubmission.updateMany({
      where: { id: { in: ids } },
      data: { read: true },
    });
    return result.count;
  }
}

export const contactRepository = new ContactRepository();
export default contactRepository;
