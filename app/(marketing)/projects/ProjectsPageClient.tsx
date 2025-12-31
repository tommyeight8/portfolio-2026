// src/app/(marketing)/projects/ProjectsPageClient.tsx

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project, ProjectCategory } from "@/types/project.types";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { ArrowUpRight, Search, Filter, X } from "lucide-react";

interface ProjectsPageClientProps {
  initialProjects: Project[];
}

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
    <main className={`min-h-screen pt-32 pb-24 transition-colors duration-500`}>
      {/* Background Orbs */}
      {/* <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse ${
            isDark ? "bg-violet-500/15" : "bg-violet-400/15"
          }`}
        />
        <div
          className={`absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] animate-pulse ${
            isDark ? "bg-cyan-500/10" : "bg-cyan-400/15"
          }`}
          style={{ animationDelay: "1s" }}
        />
      </div> */}

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 pb-6 border-b ${
            isDark ? "border-gray-800" : "border-gray-300"
          }`}
        >
          {/* <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              isDark
                ? "bg-violet-500/20 text-violet-300"
                : "bg-violet-100 text-violet-600"
            }`}
          >
            Portfolio
          </span> */}
          <h1
            className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-6 ${
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
              isDark ? "text-white/60" : "text-slate-600"
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
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-white/40" : "text-slate-400"
                }`}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className={`
                  w-full pl-12 pr-4 py-3 rounded-xl border outline-none
                  transition-all
                  ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50"
                      : "bg-white border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-violet-500"
                  }
                `}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`
                    cursor-pointer px-4 py-2 rounded-xl text-xs font-medium transition-all
                    ${
                      selectedCategory === cat.value
                        ? isDark
                          ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                          : "bg-violet-100 text-violet-600 border border-violet-200"
                        : isDark
                        ? "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                        : "bg-white text-slate-600 border border-black/10 hover:bg-slate-50"
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Filter
                  className={`w-4 h-4 ${
                    isDark ? "text-white/40" : "text-slate-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    isDark ? "text-white/50" : "text-slate-500"
                  }`}
                >
                  Filter by tags:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${
                        selectedTags.includes(tag)
                          ? isDark
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                            : "bg-cyan-100 text-cyan-600 border border-cyan-200"
                          : isDark
                          ? "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                          : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                      }
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters & Clear */}
          {hasActiveFilters && (
            <div className="mt-4 flex items-center justify-between">
              <p
                className={`text-sm ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                Showing {filteredProjects.length} of {initialProjects.length}{" "}
                projects
              </p>
              <button
                onClick={clearFilters}
                className={`
                  flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium
                  transition-colors cursor-pointer
                  ${
                    isDark
                      ? "text-white/60 hover:text-white hover:bg-white/10"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
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
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              No projects found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className={`
                mt-4 px-6 py-3 rounded-xl font-medium transition-all cursor-pointer
                ${
                  isDark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
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
        <motion.article
          whileHover={{ y: -8 }}
          className="group relative h-full"
        >
          <div
            className={`
              relative rounded-3xl overflow-hidden backdrop-blur-xl border
              transition-all duration-500
              ${
                isDark
                  ? "bg-white/5 border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-violet-500/10"
                  : "bg-white/70 border-black/10 hover:border-black/20 hover:shadow-xl"
              }
            `}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  ${isDark ? "bg-black/30" : "bg-white/20"}
                 
                `}
              >
                <div
                  className={`
                    p-4 rounded-full
                    ${
                      isDark
                        ? "bg-white/60 text-slate-900"
                        : "bg-slate-900/30 text-white"
                    }
                  `}
                >
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>

              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${
                        isDark
                          ? "bg-violet-500/80 text-white backdrop-blur-sm"
                          : "bg-violet-500 text-white"
                      }
                    `}
                  >
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <span
                className={`text-sm ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                {project.category.replace("_", " ")}
              </span>
              <h3
                className={`text-xl font-semibold mt-1 mb-3 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {project.title}
              </h3>
              <p
                className={`text-sm leading-relaxed line-clamp-2 mb-4 ${
                  isDark ? "text-white/60" : "text-slate-600"
                }`}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className={`
                      px-2 py-1 text-xs rounded-md
                      ${
                        isDark
                          ? "bg-white/10 text-white/60"
                          : "bg-slate-100 text-slate-600"
                      }
                    `}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span
                    className={`px-2 py-1 text-xs ${
                      isDark ? "text-white/40" : "text-slate-400"
                    }`}
                  >
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
