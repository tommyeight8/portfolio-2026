// src/app/(marketing)/projects/page.tsx
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Metadata } from "next";
import projectService from "@/lib/services/project.service";
import { ProjectsPageClient } from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "A showcase of web development and graphic design projects.",
};

async function getProjects() {
  const result = await projectService.getPublishedProjects({
    limit: 50,
    sortBy: "order",
    sortOrder: "asc",
  });
  return result.data;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  console.log("projects", projects);

  return (
    <Suspense fallback={<ProjectsGridSkeleton />}>
      <ProjectsPageClient initialProjects={projects} />
    </Suspense>
  );
}

function ProjectsGridSkeleton() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
