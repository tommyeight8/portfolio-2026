// src/app/admin/projects/[id]/edit/page.tsx

"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useProject, useUpdateProject } from "@/hooks/useProjects";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { CreateProjectInput } from "@/lib/validations/project.validation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/lib/providers/ThemeProvider";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { data, isLoading, error } = useProject(id);
  const updateProject = useUpdateProject();

  const handleSubmit = async (formData: CreateProjectInput) => {
    // Sanitize null values to undefined for UpdateProjectDTO compatibility
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value === null ? undefined : value,
      ])
    );

    await updateProject.mutateAsync({ id, data: sanitizedData });
    router.push("/admin/projects");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2
          className={`w-8 h-8 animate-spin ${
            isDark ? "text-white/40" : "text-slate-400"
          }`}
        />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">Project not found</p>
        <Link
          href="/admin/projects"
          className="text-violet-400 hover:underline mt-4 inline-block"
        >
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link
        href="/admin/projects"
        className={`
          inline-flex items-center gap-2 mb-8 transition-colors
          ${
            isDark
              ? "text-white/50 hover:text-white"
              : "text-slate-500 hover:text-slate-900"
          }
        `}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to projects
      </Link>

      <h1
        className={`text-2xl font-bold mb-8 ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        Edit Project
      </h1>

      <ProjectForm
        initialData={data.data}
        onSubmit={handleSubmit}
        isSubmitting={updateProject.isPending}
      />

      {updateProject.isError && (
        <p className="mt-4 text-red-400">{updateProject.error.message}</p>
      )}
    </div>
  );
}
