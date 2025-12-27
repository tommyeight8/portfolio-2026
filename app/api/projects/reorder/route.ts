// src/app/api/projects/reorder/route.ts

import { NextRequest, NextResponse } from "next/server";
import projectService from "@/lib/services/project.service";

export async function PATCH(request: NextRequest) {
  try {
    const { projects } = await request.json();
    const result = await projectService.updateProjectOrder(projects);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to reorder projects" },
      { status: 500 }
    );
  }
}
