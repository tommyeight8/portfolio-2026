"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Wrench,
  Tag,
  Images,
  FileText,
} from "lucide-react";

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

// ============ GLASS CARD ============

function GlassCard({
  children,
  className = "",
  isDark,
}: {
  children: React.ReactNode;
  className?: string;
  isDark: boolean;
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-md 
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        transition-all duration-300
        ${
          isDark
            ? "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
            : "bg-black/[0.02] border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// ============ SECTION HEADER ============

function SectionHeader({
  icon,
  title,
  isDark,
  accentColor = "#8b5cf6",
}: {
  icon: React.ReactNode;
  title: string;
  isDark: boolean;
  accentColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="p-2.5 rounded-full"
        style={{ backgroundColor: `${accentColor}20` }}
      >
        <span style={{ color: accentColor }}>{icon}</span>
      </div>
      <h3
        className={`text-lg font-semibold ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h3>
    </div>
  );
}

export function ProjectDetailClient({
  project,
  relatedProjects,
}: ProjectDetailClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToPrev = useCallback(() => {
    if (!project.images) return;
    setActiveIndex((prev) =>
      prev === 0 ? project.images!.length - 1 : prev - 1
    );
  }, [project.images]);

  const goToNext = useCallback(() => {
    if (!project.images) return;
    setActiveIndex((prev) =>
      prev === project.images!.length - 1 ? 0 : prev + 1
    );
  }, [project.images]);

  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, goToPrev, goToNext]);

  return (
    <main className="min-h-screen pt-32 pb-24 transition-colors duration-500">
      <div className="relative max-w-6xl mx-auto px-3 md:px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/projects"
            className={`
              inline-flex items-center gap-2 mb-8 text-sm transition-colors
              ${
                isDark
                  ? "text-zinc-400 hover:text-white"
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
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium
                shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                ${
                  isDark
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/20"
                    : "bg-violet-500/10 text-violet-600 border border-violet-500/20"
                }
              `}
            >
              {project.category.replace("_", " ")}
            </span>
            {project.featured && (
              <span
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium
                  shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                  ${
                    isDark
                      ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/20"
                      : "bg-fuchsia-500/10 text-fuchsia-600 border border-fuchsia-500/20"
                  }
                `}
              >
                Featured
              </span>
            )}
          </div>

          <h1
            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 capitalize ${
              isDark ? "text-gray-200" : "text-slate-900"
            }`}
          >
            {project.title}
          </h1>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="-mx-6 md:mx-0"
        >
          <GlassCard
            isDark={isDark}
            className="mb-8 md:mb-12 rounded-none md:rounded-md"
          >
            <div className="relative aspect-video">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Project Content */}
            {project.content && (
              <GlassCard isDark={isDark} className="p-8 group">
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: "#8b5cf6" }}
                />
                <div className="relative">
                  <SectionHeader
                    icon={<FileText className="w-5 h-5" />}
                    title="About the Project"
                    isDark={isDark}
                    accentColor="#8b5cf6"
                  />
                  <div
                    className={`prose max-w-none ${
                      isDark
                        ? "prose-invert prose-p:text-zinc-400"
                        : "prose-slate"
                    }`}
                    dangerouslySetInnerHTML={{ __html: project.content }}
                  />
                </div>
              </GlassCard>
            )}

            {/* Project Gallery */}
            {project.images && project.images.length > 0 && (
              <GlassCard isDark={isDark} className="p-8 group">
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: "#ec4899" }}
                />
                <div className="relative">
                  <SectionHeader
                    icon={<Images className="w-5 h-5" />}
                    title="Gallery"
                    isDark={isDark}
                    accentColor="#ec4899"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => openModal(index)}
                        className={`
                          relative aspect-video rounded-md overflow-hidden cursor-pointer
                          transition-all duration-300 hover:scale-[1.02]
                          shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                          hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                          ${
                            isDark
                              ? "bg-white/[0.03] border border-white/[0.08]"
                              : "bg-black/[0.02] border border-black/[0.06]"
                          }
                        `}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`
                            absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300
                            flex items-center justify-center
                            ${isDark ? "bg-black/40" : "bg-white/40"}
                          `}
                        ></div>
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>
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
            <GlassCard isDark={isDark} className="p-6 group">
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: "#06b6d4" }}
              />
              <div className="relative">
                <h3
                  className={`text-xs font-medium uppercase tracking-wide mb-6 ${
                    isDark ? "text-zinc-400" : "text-slate-500"
                  }`}
                >
                  Project Details
                </h3>

                <div className="space-y-4">
                  {project.client && (
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          isDark ? "bg-cyan-500/10" : "bg-cyan-500/10"
                        }`}
                      >
                        <User className="w-4 h-4 text-cyan-500" />
                      </div>
                      <div>
                        <p
                          className={`text-xs ${
                            isDark ? "text-zinc-500" : "text-slate-500"
                          }`}
                        >
                          Client
                        </p>
                        <p
                          className={`font-semibold ${
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
                        className={`p-2 rounded-full ${
                          isDark ? "bg-violet-500/10" : "bg-violet-500/10"
                        }`}
                      >
                        <User className="w-4 h-4 text-violet-500" />
                      </div>
                      <div>
                        <p
                          className={`text-xs ${
                            isDark ? "text-zinc-500" : "text-slate-500"
                          }`}
                        >
                          Role
                        </p>
                        <p
                          className={`font-semibold ${
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
                      className={`p-2 rounded-full ${
                        isDark ? "bg-emerald-500/10" : "bg-emerald-500/10"
                      }`}
                    >
                      <Calendar className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p
                        className={`text-xs ${
                          isDark ? "text-zinc-500" : "text-slate-500"
                        }`}
                      >
                        Year
                      </p>
                      <p
                        className={`font-semibold ${
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
                        className={`p-2 rounded-full ${
                          isDark ? "bg-amber-500/10" : "bg-amber-500/10"
                        }`}
                      >
                        <Clock className="w-4 h-4 text-amber-500" />
                      </div>
                      <div>
                        <p
                          className={`text-xs ${
                            isDark ? "text-zinc-500" : "text-slate-500"
                          }`}
                        >
                          Duration
                        </p>
                        <p
                          className={`font-semibold ${
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
                <div
                  className={`mt-6 pt-6 space-y-3 border-t ${
                    isDark ? "border-white/[0.08]" : "border-black/[0.06]"
                  }`}
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex items-center justify-center gap-2 w-full py-3 rounded-full
                        font-medium transition-all duration-300
                        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                        ${
                          isDark
                            ? "bg-white text-slate-900 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)]"
                            : "bg-slate-900 text-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
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
                        flex items-center justify-center gap-2 w-full py-3 rounded-full
                        font-medium backdrop-blur-xl
                        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                        transition-all duration-300
                        ${
                          isDark
                            ? "bg-white/[0.03] text-white border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
                            : "bg-black/[0.02] text-slate-900 border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
                        }
                      `}
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <GlassCard isDark={isDark} className="p-6 group">
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: "#8b5cf6" }}
                />
                <div className="relative">
                  <SectionHeader
                    icon={<Layers className="w-5 h-5" />}
                    title="Tech Stack"
                    isDark={isDark}
                    accentColor="#8b5cf6"
                  />
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`
                          px-3 py-1.5 rounded-full text-xs font-medium
                          transition-colors duration-300
                          ${
                            isDark
                              ? "bg-violet-500/10 text-violet-300 hover:bg-violet-500/20"
                              : "bg-violet-500/10 text-violet-600 hover:bg-violet-500/20"
                          }
                        `}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Tools */}
            {project.tools && project.tools.length > 0 && (
              <GlassCard isDark={isDark} className="p-6 group">
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: "#06b6d4" }}
                />
                <div className="relative">
                  <SectionHeader
                    icon={<Wrench className="w-5 h-5" />}
                    title="Tools Used"
                    isDark={isDark}
                    accentColor="#06b6d4"
                  />
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`
                          px-3 py-1.5 rounded-full text-xs font-medium
                          transition-colors duration-300
                          ${
                            isDark
                              ? "bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
                              : "bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20"
                          }
                        `}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Tags */}
            <GlassCard isDark={isDark} className="p-6 group">
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: "#f97316" }}
              />
              <div className="relative">
                <SectionHeader
                  icon={<Tag className="w-5 h-5" />}
                  title="Tags"
                  isDark={isDark}
                  accentColor="#f97316"
                />
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`
                        px-3 py-1.5 rounded-full text-xs font-medium
                        transition-colors duration-300
                        ${
                          isDark
                            ? "bg-white/[0.05] text-zinc-400 hover:bg-white/[0.08]"
                            : "bg-black/[0.03] text-slate-500 hover:bg-black/[0.05]"
                        }
                      `}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
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
                  <GlassCard
                    isDark={isDark}
                    className="group overflow-hidden hover:-translate-y-1"
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
                        className={`text-xs uppercase tracking-wide ${
                          isDark ? "text-zinc-500" : "text-slate-500"
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
                  </GlassCard>
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
              inline-flex items-center gap-2 px-6 py-3 rounded-full
              backdrop-blur-xl font-medium text-sm
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]
              transition-all duration-300
              ${
                isDark
                  ? "bg-white/[0.03] text-white border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
                  : "bg-black/[0.02] text-slate-900 border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
              }
            `}
          >
            <ArrowLeft className="w-4 h-4" />
            View All Projects
          </Link>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {modalOpen && project.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-white hover:bg-white/[0.05] hover:border-white/[0.12] transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 z-10 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-white text-xs font-medium shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              {activeIndex + 1} / {project.images.length}
            </div>

            {/* Navigation Buttons */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-white hover:bg-white/[0.05] hover:border-white/[0.12] transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-white hover:bg-white/[0.05] hover:border-white/[0.12] transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90vw] h-[80vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.images[activeIndex]}
                alt={`${project.title} - Image ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {/* Thumbnail Strip */}
            {project.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-x-auto">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(index);
                    }}
                    className={`
                      cursor-pointer relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300
                      ${
                        activeIndex === index
                          ? "ring-2 ring-white opacity-100 scale-100"
                          : "opacity-50 hover:opacity-75 scale-95"
                      }
                    `}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
