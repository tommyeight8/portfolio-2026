// src/app/api/projects/[id]/publish/route.ts

import { NextRequest, NextResponse } from "next/server";
import projectService from "@/lib/services/project.service";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await projectService.publishProject(id);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to publish project" },
      { status: 500 }
    );
  }
}
