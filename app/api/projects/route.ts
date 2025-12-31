// src/app/api/projects/route.ts

import { NextRequest, NextResponse } from "next/server";
import { projectService } from "@/lib/services/project.service";
import { projectQuerySchema } from "@/lib/validations/project.validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get("all") === "true";

    // Parse raw params through Zod schema - this converts strings to proper types
    const rawQuery = {
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      featured: searchParams.get("featured") ?? undefined,
      year: searchParams.get("year") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      sortBy: searchParams.get("sortBy") ?? undefined,
      sortOrder: searchParams.get("sortOrder") ?? undefined,
    };

    // Zod schema handles coercion (string -> number) and defaults
    const query = projectQuerySchema.parse(rawQuery);

    const result = includeAll
      ? await projectService.getAllProjects(query)
      : await projectService.getPublishedProjects(query);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await projectService.createProject(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}
