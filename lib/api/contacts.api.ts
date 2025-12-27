// src/lib/api/contacts.api.ts

import {
  ContactSubmission,
  CreateContactDTO,
  UpdateContactDTO,
  PaginatedResult,
  ApiResponse,
} from "@/types/contact.types";

const BASE_URL = "/api/contacts";

export const contactsApi = {
  async getAll(
    params?: Record<string, string>
  ): Promise<PaginatedResult<ContactSubmission>> {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`${BASE_URL}?${searchParams}`);
    if (!res.ok) throw new Error("Failed to fetch messages");
    return res.json();
  },

  async getById(id: string): Promise<ApiResponse<ContactSubmission>> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch message");
    return res.json();
  },

  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    const res = await fetch(`${BASE_URL}/unread`);
    if (!res.ok) throw new Error("Failed to get unread count");
    return res.json();
  },

  async create(
    data: CreateContactDTO
  ): Promise<ApiResponse<ContactSubmission>> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to send message");
    }
    return json;
  },

  async update(
    id: string,
    data: UpdateContactDTO
  ): Promise<ApiResponse<ContactSubmission>> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to update message");
    }
    return json;
  },

  async delete(id: string): Promise<ApiResponse<ContactSubmission>> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to delete message");
    }
    return json;
  },

  async deleteMany(ids: string[]): Promise<ApiResponse<{ count: number }>> {
    const res = await fetch(BASE_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to delete messages");
    }
    return json;
  },

  async markAsRead(id: string): Promise<ApiResponse<ContactSubmission>> {
    const res = await fetch(`${BASE_URL}/${id}/read`, { method: "PATCH" });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to mark as read");
    }
    return json;
  },

  async markAsUnread(id: string): Promise<ApiResponse<ContactSubmission>> {
    const res = await fetch(`${BASE_URL}/${id}/unread`, { method: "PATCH" });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to mark as unread");
    }
    return json;
  },
};
