// src/app/(marketing)/about/page.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Infinity as InfinityIcon,
} from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";

const experience = [
  {
    title: "Full-Stack Developer",
    company: "Cultivated Agency",
    period: "2022 - Present",
    description:
      "Building warehouse management systems and e-commerce solutions.",
  },
  {
    title: "Shopify Developer",
    company: "Freelance",
    period: "2020 - 2022",
    description: "Custom storefronts, theme development, and app integrations.",
  },
  {
    title: "Graphic Designer",
    company: "Creative Studio",
    period: "2018 - 2020",
    description: "Brand identities, marketing materials, and UI/UX design.",
  },
];

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "infinity", label: "Happy Clients" },
];

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main
      className={`min-h-screen pt-32 pb-20 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-violet-100/30 to-slate-50"
      }`}
    >
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
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
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-16 pb-6 border-b ${
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
            About Me
          </span> */}
          <h1
            className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-6 ${
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
              isDark ? "text-white/60" : "text-slate-600"
            }`}
          >
            A passionate developer and designer focused on creating beautiful,
            functional digital products.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              {/* Profile Image Placeholder */}
              <div
                className={`aspect-[4/5] relative rounded-3xl flex items-center justify-center overflow-hidden ${
                  isDark
                    ? "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20"
                    : "bg-gradient-to-br from-violet-200 to-fuchsia-200"
                }`}
              >
                <Image
                  src={"/images/profile-1.jpg"}
                  fill
                  className="h-full w-full"
                  alt="profile"
                />
              </div>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`absolute -bottom-6 -right-6 p-5 rounded-2xl backdrop-blur-xl border ${
                  isDark
                    ? "bg-white/10 border-white/20"
                    : "bg-white/80 border-black/10 shadow-xl"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? "bg-violet-500/20" : "bg-violet-100"
                    }`}
                  >
                    <MapPin
                      className={`w-5 h-5 ${
                        isDark ? "text-violet-400" : "text-violet-500"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Los Angeles CA
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      Available worldwide
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`mt-12 grid grid-cols-3 gap-4 p-6 rounded-2xl backdrop-blur-xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/70 border-black/10"
              }`}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className={`text-2xl md:text-3xl font-bold ${
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
                    className={`text-xs ${
                      isDark ? "text-white/40" : "text-slate-500"
                    }`}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Bio & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Bio */}
            <div
              className={`p-8 rounded-3xl backdrop-blur-xl border mb-8 ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/70 border-black/10"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                My Story
              </h2>
              <div
                className={`space-y-4 leading-relaxed ${
                  isDark ? "text-white/60" : "text-slate-600"
                }`}
              >
                <p>
                  I&apos;m a developer and designer with a passion for creating
                  digital experiences that are both beautiful and functional.
                  With years of experience spanning e-commerce, mobile apps, and
                  brand design, I bring a unique perspective to every project.
                </p>
                <p>
                  My journey started in graphic design, which gave me a strong
                  foundation in visual communication. This evolved into web
                  development, where I discovered the power of bringing designs
                  to life through code.
                </p>
                <p>
                  Today, I specialize in Shopify development, Next.js
                  applications, and creating cohesive brand identities that help
                  businesses stand out in the digital landscape.
                </p>
              </div>
            </div>

            {/* Experience */}
            <h2
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
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
                  className={`p-6 rounded-2xl backdrop-blur-xl border transition-all hover:-translate-y-1 ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:border-white/20"
                      : "bg-white/70 border-black/10 hover:shadow-xl"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        isDark ? "bg-violet-600/20" : "bg-violet-100"
                      }`}
                    >
                      <Briefcase className="w-5 h-5 text-violet-500" />
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
                          isDark ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        {exp.company}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          isDark ? "text-white/40" : "text-slate-400"
                        }`}
                      >
                        {exp.period}
                      </p>
                      <p
                        className={`text-sm mt-2 ${
                          isDark ? "text-white/60" : "text-slate-600"
                        }`}
                      >
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
