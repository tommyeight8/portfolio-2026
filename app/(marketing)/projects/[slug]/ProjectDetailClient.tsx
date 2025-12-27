// src/app/(marketing)/projects/[slug]/ProjectDetailClient.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project.types";
import { useTheme } from "@/lib/providers/ThemeProvider";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  User,
  Clock,
  ExternalLink,
  Github,
} from "lucide-react";

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

export function ProjectDetailClient({
  project,
  relatedProjects,
}: ProjectDetailClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main
      className={`min-h-screen pt-32 pb-24 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-violet-100/30 to-slate-50"
      }`}
    >
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse ${
            isDark ? "bg-violet-500/15" : "bg-violet-400/15"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] animate-pulse ${
            isDark ? "bg-cyan-500/10" : "bg-cyan-400/15"
          }`}
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/projects"
            className={`
              inline-flex items-center gap-2 mb-8 transition-colors
              ${
                isDark
                  ? "text-white/60 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }
            `}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDark
                  ? "bg-violet-500/20 text-violet-300"
                  : "bg-violet-100 text-violet-600"
              }`}
            >
              {project.category.replace("_", " ")}
            </span>
            {project.featured && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isDark
                    ? "bg-fuchsia-500/20 text-fuchsia-300"
                    : "bg-fuchsia-100 text-fuchsia-600"
                }`}
              >
                Featured
              </span>
            )}
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {project.title}
          </h1>

          <p
            className={`text-xl leading-relaxed max-w-3xl ${
              isDark ? "text-white/60" : "text-slate-600"
            }`}
          >
            {project.description}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`
            relative aspect-video rounded-3xl overflow-hidden mb-12
            backdrop-blur-xl border
            ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-white/70 border-black/10"
            }
          `}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Project Content */}
            {project.content && (
              <div
                className={`
                  p-8 rounded-3xl backdrop-blur-xl border mb-8
                  ${
                    isDark
                      ? "bg-white/5 border-white/10"
                      : "bg-white/70 border-black/10"
                  }
                `}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  About the Project
                </h2>
                <div
                  className={`prose max-w-none ${
                    isDark
                      ? "prose-invert prose-p:text-white/70"
                      : "prose-slate"
                  }`}
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </div>
            )}

            {/* Project Gallery */}
            {project.images && project.images.length > 0 && (
              <div
                className={`
                  p-8 rounded-3xl backdrop-blur-xl border
                  ${
                    isDark
                      ? "bg-white/5 border-white/10"
                      : "bg-white/70 border-black/10"
                  }
                `}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Gallery
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className={`
                        relative aspect-video rounded-2xl overflow-hidden
                        ${isDark ? "bg-white/5" : "bg-slate-100"}
                      `}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Project Info */}
            <div
              className={`
                p-6 rounded-3xl backdrop-blur-xl border
                ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white/70 border-black/10"
                }
              `}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Project Details
              </h3>

              <div className="space-y-4">
                {project.client && (
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isDark ? "bg-white/10" : "bg-slate-100"
                      }`}
                    >
                      <User
                        className={`w-4 h-4 ${
                          isDark ? "text-white/70" : "text-slate-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-xs ${
                          isDark ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        Client
                      </p>
                      <p
                        className={`font-medium ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {project.client}
                      </p>
                    </div>
                  </div>
                )}

                {project.role && (
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isDark ? "bg-white/10" : "bg-slate-100"
                      }`}
                    >
                      <User
                        className={`w-4 h-4 ${
                          isDark ? "text-white/70" : "text-slate-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-xs ${
                          isDark ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        Role
                      </p>
                      <p
                        className={`font-medium ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {project.role}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? "bg-white/10" : "bg-slate-100"
                    }`}
                  >
                    <Calendar
                      className={`w-4 h-4 ${
                        isDark ? "text-white/70" : "text-slate-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-xs ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      Year
                    </p>
                    <p
                      className={`font-medium ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {project.year}
                    </p>
                  </div>
                </div>

                {project.duration && (
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isDark ? "bg-white/10" : "bg-slate-100"
                      }`}
                    >
                      <Clock
                        className={`w-4 h-4 ${
                          isDark ? "text-white/70" : "text-slate-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-xs ${
                          isDark ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        Duration
                      </p>
                      <p
                        className={`font-medium ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {project.duration}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center justify-center gap-2 w-full py-3 rounded-xl
                      font-medium transition-all
                      ${
                        isDark
                          ? "bg-white text-slate-900 hover:shadow-lg hover:shadow-white/20"
                          : "bg-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/20"
                      }
                    `}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Site
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center justify-center gap-2 w-full py-3 rounded-xl
                      font-medium border transition-all
                      ${
                        isDark
                          ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                          : "bg-white text-slate-900 border-black/10 hover:shadow-lg"
                      }
                    `}
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div
                className={`
                  p-6 rounded-3xl backdrop-blur-xl border
                  ${
                    isDark
                      ? "bg-white/5 border-white/10"
                      : "bg-white/70 border-black/10"
                  }
                `}
              >
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`
                        px-3 py-1.5 rounded-lg text-sm font-medium
                        ${
                          isDark
                            ? "bg-violet-500/20 text-violet-300"
                            : "bg-violet-100 text-violet-600"
                        }
                      `}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {project.tools && project.tools.length > 0 && (
              <div
                className={`
                  p-6 rounded-3xl backdrop-blur-xl border
                  ${
                    isDark
                      ? "bg-white/5 border-white/10"
                      : "bg-white/70 border-black/10"
                  }
                `}
              >
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`
                        px-3 py-1.5 rounded-lg text-sm font-medium
                        ${
                          isDark
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "bg-cyan-100 text-cyan-600"
                        }
                      `}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div
              className={`
                p-6 rounded-3xl backdrop-blur-xl border
                ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white/70 border-black/10"
                }
              `}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`
                      px-3 py-1.5 rounded-lg text-sm
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
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20"
          >
            <h2
              className={`text-2xl font-bold mb-8 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Related Projects
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedProjects.map((related) => (
                <Link key={related.id} href={`/projects/${related.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`
                      group relative rounded-3xl overflow-hidden backdrop-blur-xl border
                      transition-all duration-500
                      ${
                        isDark
                          ? "bg-white/5 border-white/10 hover:border-white/20"
                          : "bg-white/70 border-black/10 hover:shadow-xl"
                      }
                    `}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={related.thumbnail}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 ${
                          isDark
                            ? "bg-gradient-to-t from-slate-900 via-transparent to-transparent"
                            : "bg-gradient-to-t from-white via-transparent to-transparent"
                        }`}
                      />
                    </div>

                    <div className="p-6">
                      <span
                        className={`text-sm ${
                          isDark ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        {related.category.replace("_", " ")}
                      </span>
                      <h3
                        className={`text-xl font-semibold mt-1 flex items-center gap-2 ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {related.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Projects CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/projects"
            className={`
              inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium
              transition-all hover:scale-105
              ${
                isDark
                  ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  : "bg-white text-slate-900 border border-black/10 hover:shadow-xl"
              }
            `}
          >
            <ArrowLeft className="w-4 h-4" />
            View All Projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
