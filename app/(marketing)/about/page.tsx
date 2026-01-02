// src/app/(marketing)/about/page.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Briefcase,
  Infinity as InfinityIcon,
  User,
  BookOpen,
} from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";

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
        relative overflow-hidden rounded-2xl 
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.1)]
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

const experience = [
  {
    title: "Full-Stack Developer",
    company: "Cultivated Agency",
    period: "2022 - Present",
    description:
      "Building warehouse management systems and e-commerce solutions.",
    color: "#8b5cf6",
  },
  {
    title: "Shopify Developer",
    company: "Freelance",
    period: "2020 - 2022",
    description: "Custom storefronts, theme development, and app integrations.",
    color: "#06b6d4",
  },
  {
    title: "Graphic Designer",
    company: "Creative Studio",
    period: "2018 - 2020",
    description: "Brand identities, marketing materials, and UI/UX design.",
    color: "#d946ef",
  },
];

const stats = [
  { value: "8+", label: "Years Experience", color: "#8b5cf6" },
  { value: "50+", label: "Projects Completed", color: "#06b6d4" },
  { value: "infinity", label: "Happy Clients", color: "#10b981" },
];

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen pt-32 pb-20 transition-colors duration-500`}>
      {/* Background Orbs */}
      {/* <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse ${
            isDark ? "bg-violet-500/30" : "bg-violet-400/30"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] animate-pulse ${
            isDark ? "bg-cyan-500/25" : "bg-cyan-400/30"
          }`}
          style={{ animationDelay: "1s" }}
        />
      </div> */}

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-16 pb-6 border-b ${
            isDark ? "border-white/[0.08]" : "border-black/[0.06]"
          }`}
        >
          <h1
            className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Crafting Digital{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>
          <p
            className={`text-lg max-w-2xl leading-relaxed ${
              isDark ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            A passionate developer and designer focused on creating beautiful,
            functional digital products.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              {/* Profile Image */}
              <GlassCard isDark={isDark} className="overflow-hidden">
                <div className="aspect-[4/5] relative">
                  <Image
                    src={"/images/my-profile.png"}
                    fill
                    className="object-cover"
                    alt="profile"
                  />
                </div>
              </GlassCard>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6"
              >
                <GlassCard isDark={isDark} className="p-5 group">
                  <div
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: "#8b5cf6" }}
                  />
                  <div className="relative flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-full"
                      style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                    >
                      <MapPin className="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Los Angeles CA
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? "text-zinc-500" : "text-gray-700"
                        }`}
                      >
                        Available worldwide
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-14"
            >
              <GlassCard isDark={isDark} className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center group">
                      <div
                        className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        {stat.value === "infinity" ? (
                          <InfinityIcon
                            className="w-6 h-6"
                            style={{ color: stat.color }}
                          />
                        ) : (
                          <span
                            className="text-lg font-bold"
                            style={{ color: stat.color }}
                          >
                            {stat.value}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-2xl md:text-3xl font-bold tracking-tight ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {stat.value === "infinity" ? (
                          <InfinityIcon className="w-8 h-8 mx-auto" />
                        ) : (
                          stat.value
                        )}
                      </p>
                      <p
                        className={`text-xs uppercase tracking-wide mt-1 ${
                          isDark ? "text-zinc-500" : "text-slate-500"
                        }`}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>

          {/* Right - Bio & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Bio */}
            <GlassCard isDark={isDark} className="p-8 group">
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: "#8b5cf6" }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="p-2.5 rounded-full"
                    style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                  >
                    <BookOpen className="w-5 h-5 text-violet-500" />
                  </div>
                  <h2
                    className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    My Story
                  </h2>
                </div>
                <div
                  className={`space-y-4 leading-relaxed ${
                    isDark ? "text-zinc-400" : "text-slate-600"
                  }`}
                >
                  <p>
                    I&apos;m a developer and designer with a passion for
                    creating digital experiences that are both beautiful and
                    functional. With years of experience spanning e-commerce,
                    mobile apps, and brand design, I bring a unique perspective
                    to every project.
                  </p>
                  <p>
                    My journey started in graphic design, which gave me a strong
                    foundation in visual communication. This evolved into web
                    development, where I discovered the power of bringing
                    designs to life through code.
                  </p>
                  <p>
                    Today, I specialize in Shopify development, Next.js
                    applications, and creating cohesive brand identities that
                    help businesses stand out in the digital landscape.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Experience */}
            <div>
              <h2
                className={`text-xs font-medium uppercase tracking-wide mb-6 ${
                  isDark ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <GlassCard
                      isDark={isDark}
                      className="p-6 group hover:-translate-y-1"
                    >
                      <div
                        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                        style={{ backgroundColor: exp.color }}
                      />
                      <div className="relative flex items-start gap-4">
                        <div
                          className="p-2.5 rounded-full"
                          style={{ backgroundColor: `${exp.color}20` }}
                        >
                          <Briefcase
                            className="w-5 h-5"
                            style={{ color: exp.color }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-semibold ${
                              isDark ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {exp.title}
                          </h3>
                          <p
                            className={`text-sm ${
                              isDark ? "text-zinc-500" : "text-slate-500"
                            }`}
                          >
                            {exp.company}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              isDark ? "text-zinc-600" : "text-slate-400"
                            }`}
                          >
                            {exp.period}
                          </p>
                          <p
                            className={`text-sm mt-3 ${
                              isDark ? "text-zinc-400" : "text-slate-600"
                            }`}
                          >
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
