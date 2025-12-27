// src/app/api/admin/stats/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function GET() {
  try {
    const [
      totalProjects,
      publishedProjects,
      draftProjects,
      featuredProjects,
      totalMessages,
      unreadMessages,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: "PUBLISHED" } }),
      prisma.project.count({ where: { status: "DRAFT" } }),
      prisma.project.count({ where: { featured: true } }),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({ where: { read: false } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        projects: {
          total: totalProjects,
          published: publishedProjects,
          draft: draftProjects,
          featured: featuredProjects,
        },
        messages: {
          total: totalMessages,
          unread: unreadMessages,
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
