// src/components/projects/ProjectCard.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project.types";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const categoryColors: Record<string, string> = {
  WEB_DEVELOPMENT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  GRAPHIC_DESIGN: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  BRANDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  UI_UX: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  FULL_STACK: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const categoryLabels: Record<string, string> = {
  WEB_DEVELOPMENT: "Web Development",
  GRAPHIC_DESIGN: "Graphic Design",
  BRANDING: "Branding",
  UI_UX: "UI/UX Design",
  FULL_STACK: "Full Stack",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 transition-colors duration-300 hover:border-neutral-700">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay */}
            <motion.div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60" />

            {/* Quick Links */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <Github className="w-4 h-4 text-white" />
                </motion.a>
              )}
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/90 text-neutral-900">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category Badge */}
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${
                categoryColors[project.category]
              }`}
            >
              {categoryLabels[project.category]}
            </span>

            {/* Title & Description */}
            <h3 className="mt-4 text-xl font-semibold text-white group-hover:text-neutral-200 transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
              {project.description}
            </p>

            {/* Tech Stack / Tools */}
            <div className="mt-4 flex flex-wrap gap-2">
              {(project.techStack.length > 0
                ? project.techStack
                : project.tools
              )
                .slice(0, 4)
                .map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 text-xs text-neutral-500 bg-neutral-800 rounded"
                  >
                    {item}
                  </span>
                ))}
              {(project.techStack.length > 4 || project.tools.length > 4) && (
                <span className="px-2 py-1 text-xs text-neutral-500">
                  +
                  {Math.max(project.techStack.length, project.tools.length) - 4}{" "}
                  more
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between text-sm text-neutral-500">
              <span>{project.year}</span>
              {project.client && <span>{project.client}</span>}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
