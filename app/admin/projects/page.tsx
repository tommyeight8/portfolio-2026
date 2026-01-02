"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useProjects,
  useAdminProjects,
  useDeleteProject,
  usePublishProject,
  useUnpublishProject,
} from "@/hooks/useProjects";
import { Project } from "@/types/project.types";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  ExternalLink,
  Search,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/providers/ThemeProvider";

export default function AdminProjectsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useAdminProjects({});
  const deleteProject = useDeleteProject();
  const publishProject = usePublishProject();
  const unpublishProject = useUnpublishProject();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setDeleteId(id);
      await deleteProject.mutateAsync(id);
      setDeleteId(null);
    }
  };

  const handleTogglePublish = async (project: Project) => {
    if (project.status === "PUBLISHED") {
      await unpublishProject.mutateAsync(project.id);
    } else {
      await publishProject.mutateAsync(project.id);
    }
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

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">Failed to load projects</p>
      </div>
    );
  }

  const projects = data?.data ?? [];
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className={`text-xl sm:text-2xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Projects
            </h1>
            <p
              className={`text-sm mt-0.5 ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className={`
              flex items-center justify-center h-10 w-10 rounded-full font-medium
              transition-all duration-150 shrink-0
              ${
                isDark
                  ? "bg-white text-slate-900 hover:bg-white/90"
                  : "bg-violet-500 text-white hover:bg-violet-600"
              }
            `}
          >
            <Plus className="w-5 h-5" />
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDark ? "text-white/40" : "text-slate-400"
            }`}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className={`
              w-full max-w-md pl-10 pr-4 py-2.5 rounded-full border outline-none
              text-sm transition-all
              ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50"
                  : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-violet-500"
              }
            `}
          />
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-3 lg:hidden">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`
                rounded-xl border overflow-hidden
                ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-slate-200"
                }
              `}
            >
              {/* Card Header with Image */}
              <div className="flex gap-3 p-3">
                <div
                  className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 ${
                    isDark ? "bg-white/10" : "bg-slate-100"
                  }`}
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium truncate ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {project.title}
                  </p>
                  <p
                    className={`text-sm truncate ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        project.status === "PUBLISHED"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : project.status === "DRAFT"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-slate-500/10 text-slate-500"
                      }`}
                    >
                      {project.status}
                    </span>
                    <span
                      className={`text-xs ${
                        isDark ? "text-white/40" : "text-slate-400"
                      }`}
                    >
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div
                className={`
                  flex items-center justify-between px-3 py-2 border-t
                  ${isDark ? "border-white/10" : "border-slate-100"}
                `}
              >
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    isDark
                      ? "bg-white/10 text-white/60"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {project.category.replace("_", " ")}
                </span>

                <div className="flex items-center gap-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-colors ${
                        isDark
                          ? "text-white/50 hover:text-white hover:bg-white/10"
                          : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleTogglePublish(project)}
                    disabled={
                      publishProject.isPending || unpublishProject.isPending
                    }
                    className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                      isDark
                        ? "text-white/50 hover:text-white hover:bg-white/10"
                        : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {project.status === "PUBLISHED" ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? "text-white/50 hover:text-white hover:bg-white/10"
                        : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={deleteId === project.id}
                    className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                      isDark
                        ? "text-white/50 hover:text-red-400 hover:bg-red-500/10"
                        : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                    }`}
                  >
                    {deleteId === project.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop Table */}
      <div
        className={`
          hidden lg:block rounded-xl overflow-hidden border
          ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"}
        `}
      >
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                isDark ? "border-white/10" : "border-slate-100"
              }`}
            >
              <th
                className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                Project
              </th>
              <th
                className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                Category
              </th>
              <th
                className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                Status
              </th>
              <th
                className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                Year
              </th>
              <th
                className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDark ? "divide-white/10" : "divide-slate-100"
            }`}
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`group transition-colors ${
                    isDark ? "hover:bg-white/5" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`relative w-16 h-12 rounded-lg overflow-hidden ${
                          isDark ? "bg-white/10" : "bg-slate-100"
                        }`}
                      >
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {project.title}
                        </p>
                        <p
                          className={`text-sm truncate max-w-xs ${
                            isDark ? "text-white/50" : "text-slate-500"
                          }`}
                        >
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        isDark
                          ? "bg-white/10 text-white/70"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {project.category.replace("_", " ")}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        project.status === "PUBLISHED"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : project.status === "DRAFT"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-slate-500/10 text-slate-500"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td
                    className={`px-6 py-4 ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}
                  >
                    {project.year}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg transition-colors ${
                            isDark
                              ? "text-white/50 hover:text-white hover:bg-white/10"
                              : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                          }`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleTogglePublish(project)}
                        disabled={
                          publishProject.isPending || unpublishProject.isPending
                        }
                        className={`p-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer ${
                          isDark
                            ? "text-white/50 hover:text-white hover:bg-white/10"
                            : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                        title={
                          project.status === "PUBLISHED"
                            ? "Unpublish"
                            : "Publish"
                        }
                      >
                        {project.status === "PUBLISHED" ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark
                            ? "text-white/50 hover:text-white hover:bg-white/10"
                            : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleteId === project.id}
                        className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                          isDark
                            ? "text-white/50 hover:text-red-400 hover:bg-red-500/10"
                            : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                      >
                        {deleteId === project.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div
          className={`
            py-16 text-center rounded-xl border
            ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-white border-slate-200"
            }
          `}
        >
          <p className={`mb-4 ${isDark ? "text-white/50" : "text-slate-500"}`}>
            {search ? "No projects found" : "No projects yet"}
          </p>
          {!search && (
            <Link
              href="/admin/projects/new"
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                transition-colors
                ${
                  isDark
                    ? "bg-white text-slate-900 hover:bg-white/90"
                    : "bg-green-400 text-white hover:bg-green-500"
                }
              `}
            >
              <Plus className="w-4 h-4" />
              Create your first project
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
