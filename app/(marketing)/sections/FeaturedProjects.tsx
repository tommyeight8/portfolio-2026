// src/app/(marketing)/sections/FeaturedProjects.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/project.types";

const categoryColors: Record<string, string> = {
  WEB_DEVELOPMENT: "from-violet-500/20 to-fuchsia-500/20",
  GRAPHIC_DESIGN: "from-cyan-500/20 to-blue-500/20",
  BRANDING: "from-amber-500/20 to-orange-500/20",
  UI_UX: "from-emerald-500/20 to-teal-500/20",
  FULL_STACK: "from-rose-500/20 to-pink-500/20",
};

const categoryLabels: Record<string, string> = {
  WEB_DEVELOPMENT: "Web Development",
  GRAPHIC_DESIGN: "Graphic Design",
  BRANDING: "Branding",
  UI_UX: "UI/UX Design",
  FULL_STACK: "Full Stack",
};

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-sm uppercase tracking-widest text-violet-400 font-medium">
              Selected Work
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      categoryColors[project.category] ||
                      "from-violet-500/20 to-fuchsia-500/20"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Image */}
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="text-sm text-neutral-400 font-medium">
                      {categoryLabels[project.category] || project.category}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-white group-hover:text-violet-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-400">No featured projects yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
