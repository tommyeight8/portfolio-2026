// src/app/(marketing)/projects/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import projectService from "@/lib/services/project.service";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await projectService.getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await projectService.getProjectBySlug(slug);

  if (!project || project.status !== "PUBLISHED") {
    notFound();
  }

  // Get related projects
  const relatedResult = await projectService.getPublishedProjects({
    category: project.category,
    limit: 3,
  });
  const relatedProjects = relatedResult.data
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  return (
    <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
  );
}
