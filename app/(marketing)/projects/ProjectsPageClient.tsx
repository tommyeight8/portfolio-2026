// src/app/(marketing)/projects/ProjectsPageClient.tsx

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project, ProjectCategory } from "@/types/project.types";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { Search, Filter, X } from "lucide-react";

interface ProjectsPageClientProps {
  initialProjects: Project[];
}

const FADE_DARK = "rgb(2, 6, 23)"; // slate-950
const FADE_LIGHT = "rgb(248, 250, 252)"; // slate-50

const CATEGORIES: { value: ProjectCategory | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "WEB_DEVELOPMENT", label: "Web Development" },
  { value: "GRAPHIC_DESIGN", label: "Graphic Design" },
  { value: "BRANDING", label: "Branding" },
  { value: "UI_UX", label: "UI/UX" },
  { value: "FULL_STACK", label: "Full Stack" },
];

export function ProjectsPageClient({
  initialProjects,
}: ProjectsPageClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | "ALL"
  >("ALL");

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialProjects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [initialProjects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.tags.some((tag) => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "ALL" && project.category !== selectedCategory) {
        return false;
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every((tag) =>
          project.tags.includes(tag)
        );
        if (!hasAllTags) return false;
      }

      return true;
    });
  }, [initialProjects, search, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("ALL");
    setSelectedTags([]);
  };

  const hasActiveFilters =
    search || selectedCategory !== "ALL" || selectedTags.length > 0;

  return (
    <main
      className={`min-h-screen pt-32 pb-24 transition-colors duration-500 ${
        isDark
          ? "bg-slate-950"
          : "bg-gradient-to-br from-slate-50 via-violet-100/30 to-slate-50"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-3 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 pb-6 border-b ${
            isDark ? "border-white/[0.08]" : "border-black/[0.06]"
          }`}
        >
          <h1
            className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            My{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p
            className={`text-lg max-w-2xl leading-relaxed ${
              isDark ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            A collection of work spanning web development, graphic design, and
            everything in between.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 lg:max-w-sm">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Search
                  className={`w-4 h-4 ${
                    isDark ? "text-zinc-400" : "text-slate-400"
                  }`}
                />
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className={`
      relative z-0
      w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none
      backdrop-blur-xl
      transition-all duration-300
      ${
        isDark
          ? "bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:bg-white/[0.05]"
          : "bg-black/[0.02] border border-black/[0.06] text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:bg-black/[0.04]"
      }
    `}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              {/* LEFT FADE - hidden on lg */}
              <div
                className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none lg:hidden"
                style={{
                  background: `linear-gradient(to right, ${
                    isDark ? FADE_DARK : FADE_LIGHT
                  }, transparent)`,
                }}
              />

              {/* SCROLL CONTAINER */}
              <div className="flex gap-2 flex-nowrap overflow-x-auto lg:overflow-visible scrollbar-hide px-1 lg:px-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`
              cursor-pointer flex-shrink-0 whitespace-nowrap
              px-4 py-2.5 rounded-xl text-sm font-medium
              backdrop-blur-xl
              transition-all duration-300
              ${
                selectedCategory === cat.value
                  ? isDark
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    : "bg-violet-500/10 text-violet-600 border border-violet-500/20"
                  : isDark
                  ? "bg-white/[0.03] text-zinc-400 border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
                  : "bg-black/[0.02] text-slate-600 border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
              }
            `}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* RIGHT FADE - hidden on lg */}
              <div
                className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none lg:hidden"
                style={{
                  background: `linear-gradient(to left, ${
                    isDark ? FADE_DARK : FADE_LIGHT
                  }, transparent)`,
                }}
              />
            </div>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter
                  className={`w-4 h-4 ${
                    isDark ? "text-zinc-400" : "text-slate-400"
                  }`}
                />
                <span
                  className={`text-sm uppercase tracking-wide ${
                    isDark ? "text-zinc-500" : "text-slate-500"
                  }`}
                >
                  Filter by tags
                </span>
              </div>
              <div className="relative">
                {/* LEFT FADE - hidden on lg */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none lg:hidden"
                  style={{
                    background: `linear-gradient(to right, ${
                      isDark ? FADE_DARK : FADE_LIGHT
                    }, transparent)`,
                  }}
                />

                <div className="flex gap-2 flex-nowrap overflow-x-auto lg:overflow-visible lg:flex-wrap scrollbar-hide px-1 lg:px-0">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`
                cursor-pointer flex-shrink-0 whitespace-nowrap
                px-4 py-2.5 rounded-xl text-sm font-medium
                backdrop-blur-xl
                transition-all duration-300
                ${
                  selectedTags.includes(tag)
                    ? isDark
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-cyan-500/10 text-cyan-600 border border-cyan-500/20"
                    : isDark
                    ? "bg-white/[0.03] text-zinc-500 border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
                    : "bg-black/[0.02] text-slate-500 border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
                }
              `}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* RIGHT FADE - hidden on lg */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none lg:hidden"
                  style={{
                    background: `linear-gradient(to left, ${
                      isDark ? FADE_DARK : FADE_LIGHT
                    }, transparent)`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Active Filters & Clear */}
          {hasActiveFilters && (
            <div className="mt-6 flex items-center justify-between">
              <p
                className={`text-sm ${
                  isDark ? "text-zinc-500" : "text-slate-500"
                }`}
              >
                Showing {filteredProjects.length} of {initialProjects.length}{" "}
                projects
              </p>
              <button
                onClick={clearFilters}
                className={`
          cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
          transition-all duration-300
          ${
            isDark
              ? "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              : "text-slate-500 hover:text-slate-900 hover:bg-black/[0.03]"
          }
        `}
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isDark={isDark}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p
              className={`text-sm ${
                isDark ? "text-zinc-500" : "text-slate-500"
              }`}
            >
              No projects found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className={`
                cursor-pointer mt-4 px-6 py-3 rounded-xl text-sm font-medium
                backdrop-blur-xl
                shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                transition-all duration-300
                ${
                  isDark
                    ? "bg-white/[0.03] text-white border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
                    : "bg-black/[0.02] text-slate-900 border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
                }
              `}
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}

// ============ PROJECT CARD ============

function ProjectCard({
  project,
  index,
  isDark,
}: {
  project: Project;
  index: number;
  isDark: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <motion.article className="group relative h-full">
          <div
            className={`
              relative rounded-md overflow-hidden 
              backdrop-blur-xl
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]
              transition-all duration-300
              ${
                isDark
                  ? "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
                  : "bg-black/[0.02] border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
              }
            `}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark
                    ? "bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"
                    : "bg-gradient-to-t from-white/40 via-transparent to-transparent"
                }`}
              />

              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <span
                    className={`
                      px-3 py-1.5 rounded-xl text-xs font-medium
                      backdrop-blur-xl
                      shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                      ${
                        isDark
                          ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                          : "bg-violet-500/10 text-violet-600 border border-violet-500/20"
                      }
                    `}
                  >
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <p
                className={`text-xs uppercase tracking-wide mb-2 ${
                  isDark ? "text-zinc-500" : "text-slate-500"
                }`}
              >
                {project.category.replace("_", " ")}
              </p>
              <h3
                className={`font-semibold text-lg ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {project.title}
              </h3>
              <p
                className={`text-sm mt-2 line-clamp-2 ${
                  isDark ? "text-zinc-400" : "text-slate-600"
                }`}
              >
                {project.description}
              </p>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`
                        px-2 py-1 rounded-lg text-xs
                        ${
                          isDark
                            ? "bg-white/[0.05] text-zinc-500"
                            : "bg-black/[0.03] text-slate-500"
                        }
                      `}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span
                      className={`
                        px-2 py-1 rounded-lg text-xs
                        ${
                          isDark
                            ? "bg-white/[0.05] text-zinc-500"
                            : "bg-black/[0.03] text-slate-500"
                        }
                      `}
                    >
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
