// src/app/admin/projects/new/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useCreateProject } from "@/hooks/useProjects";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { CreateProjectInput } from "@/lib/validations/project.validation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/lib/providers/ThemeProvider";

export default function NewProjectPage() {
  const router = useRouter();
  const createProject = useCreateProject();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = async (data: CreateProjectInput) => {
    await createProject.mutateAsync(data);
    router.push("/admin/projects");
  };

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
        New Project
      </h1>

      <ProjectForm
        onSubmit={handleSubmit}
        isSubmitting={createProject.isPending}
      />

      {createProject.isError && (
        <p className="mt-4 text-red-400">{createProject.error.message}</p>
      )}
    </div>
  );
}
