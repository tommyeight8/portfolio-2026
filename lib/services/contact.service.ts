// src/lib/services/contact.service.ts

import contactRepository from "@/lib/repositories/contact.repository";
import {
  createContactSchema,
  updateContactSchema,
  contactQuerySchema,
  CreateContactInput,
  UpdateContactInput,
  ContactQueryInput,
} from "@/lib/validations/contact.validation";
import {
  ContactSubmission,
  ContactFilters,
  PaginatedResult,
  ApiResponse,
} from "@/types/contact.types";

class ContactService {
  async getAllContacts(
    query: ContactQueryInput
  ): Promise<PaginatedResult<ContactSubmission>> {
    const validated = contactQuerySchema.parse(query);

    const filters: ContactFilters = {
      read: validated.read,
      search: validated.search,
    };

    return contactRepository.findAllPaginated(filters, {
      page: validated.page,
      limit: validated.limit,
      sortBy: validated.sortBy,
      sortOrder: validated.sortOrder,
    });
  }

  async getContactById(id: string): Promise<ContactSubmission | null> {
    return contactRepository.findById(id);
  }

  async getUnreadCount(): Promise<number> {
    return contactRepository.countUnread();
  }

  async createContact(
    data: CreateContactInput
  ): Promise<ApiResponse<ContactSubmission>> {
    try {
      const validated = createContactSchema.parse(data);
      const contact = await contactRepository.create(validated);
      return {
        success: true,
        data: contact,
        message: "Message sent successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Failed to send message" };
    }
  }

  async updateContact(
    id: string,
    data: UpdateContactInput
  ): Promise<ApiResponse<ContactSubmission>> {
    try {
      const validated = updateContactSchema.parse(data);

      const existing = await contactRepository.findById(id);
      if (!existing) {
        return { success: false, error: "Message not found" };
      }

      const contact = await contactRepository.update(id, validated);
      return {
        success: true,
        data: contact,
        message: "Message updated successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Failed to update message" };
    }
  }

  async deleteContact(id: string): Promise<ApiResponse<ContactSubmission>> {
    try {
      const existing = await contactRepository.findById(id);
      if (!existing) {
        return { success: false, error: "Message not found" };
      }

      const contact = await contactRepository.delete(id);
      return {
        success: true,
        data: contact,
        message: "Message deleted successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Failed to delete message" };
    }
  }

  async deleteManyContacts(
    ids: string[]
  ): Promise<ApiResponse<{ count: number }>> {
    try {
      const count = await contactRepository.deleteMany(ids);
      return {
        success: true,
        data: { count },
        message: `${count} message(s) deleted`,
      };
    } catch (error) {
      return { success: false, error: "Failed to delete messages" };
    }
  }

  async markAsRead(id: string): Promise<ApiResponse<ContactSubmission>> {
    try {
      const contact = await contactRepository.markAsRead(id);
      return { success: true, data: contact };
    } catch (error) {
      return { success: false, error: "Failed to mark as read" };
    }
  }

  async markAsUnread(id: string): Promise<ApiResponse<ContactSubmission>> {
    try {
      const contact = await contactRepository.markAsUnread(id);
      return { success: true, data: contact };
    } catch (error) {
      return { success: false, error: "Failed to mark as unread" };
    }
  }

  async markManyAsRead(ids: string[]): Promise<ApiResponse<{ count: number }>> {
    try {
      const count = await contactRepository.markManyAsRead(ids);
      return {
        success: true,
        data: { count },
        message: `${count} message(s) marked as read`,
      };
    } catch (error) {
      return { success: false, error: "Failed to mark messages as read" };
    }
  }
}

export const contactService = new ContactService();
export default contactService;
