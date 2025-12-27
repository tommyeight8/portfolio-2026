// src/app/api/contacts/[id]/unread/route.ts

import { NextRequest, NextResponse } from "next/server";
import contactService from "@/lib/services/contact.service";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await contactService.markAsUnread(id);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to mark as unread" },
      { status: 500 }
    );
  }
}
