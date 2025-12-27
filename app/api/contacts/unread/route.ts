// src/app/api/contacts/unread/route.ts

import { NextResponse } from "next/server";
import contactService from "@/lib/services/contact.service";

export async function GET() {
  try {
    const count = await contactService.getUnreadCount();
    return NextResponse.json({ success: true, data: { count } });
  } catch (error) {
    console.error("Failed to get unread count:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get unread count" },
      { status: 500 }
    );
  }
}
