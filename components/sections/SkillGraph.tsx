// src/components/sections/SkillGraph.tsx

"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import React, { useRef, useCallback } from "react";
import { IconChartBar } from "@tabler/icons-react";
import { useTheme } from "@/lib/providers/ThemeProvider";

const skills = [
  { name: "JavaScript", level: 95, category: "dev" },
  { name: "TypeScript", level: 85, category: "dev" },
  { name: "Next.js", level: 90, category: "dev" },
  { name: "React Native", level: 85, category: "dev" },
  { name: "Expo", level: 80, category: "dev" },
  { name: "Tailwind", level: 90, category: "dev" },
  { name: "HTML", level: 98, category: "dev" },
  { name: "CSS", level: 92, category: "dev" },
  { name: "MongoDB", level: 85, category: "dev" },
  { name: "PostgreSQL", level: 85, category: "dev" },
  { name: "Neon", level: 85, category: "dev" },
  { name: "Adobe Suite", level: 90, category: "design" },
  { name: "Illustrator", level: 87, category: "design" },
  { name: "Photoshop", level: 89, category: "design" },
  { name: "InDesign", level: 80, category: "design" },
];

const useMagnetic = (strength: number = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      x.set(deltaX);
      y.set(deltaY);
    },
    [strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, springX, springY, handleMouseMove, handleMouseLeave };
};

const SkillCard = ({
  skill,
  index,
  isInView,
  isDark,
}: {
  skill: (typeof skills)[0];
  index: number;
  isInView: boolean;
  isDark: boolean;
}) => {
  const { ref, springX, springY, handleMouseMove, handleMouseLeave } =
    useMagnetic(0.08);

  const filledBars = Math.round(skill.level / 5);

  // Accent color based on category
  const accentColor = skill.category === "design" ? "#d946ef" : "#14b8a6";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group"
    >
      <div
        className={`
          relative p-5 rounded-lg overflow-hidden
          backdrop-blur-xl
          shadow-md
          transition-all duration-300
          hover:-translate-y-0.5
          ${
            isDark
              ? "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
              : "bg-black/[0.02] border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
          }
        `}
      >
        {/* Accent glow */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          style={{ backgroundColor: accentColor }}
        />

        <div className="relative z-10">
          {/* Header with icon accent */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <IconChartBar
                  className="w-4 h-4"
                  style={{ color: accentColor }}
                />
              </div>
              <h4
                className={`
                  text-xs font-medium uppercase tracking-wide
                  transition-colors duration-300
                  ${isDark ? "text-zinc-400" : "text-slate-500"}
                `}
              >
                {skill.name}
              </h4>
            </div>
          </div>

          {/* Level as main value */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.03 + 0.3 }}
            className={`
              text-lg sm:text-xl font-bold tracking-tight mb-1
              ${isDark ? "text-gray-300" : "text-slate-500"}
            `}
          >
            {skill.level}%
          </motion.p>

          {/* Bar visualization */}
          <div className="flex items-end gap-[6px] h-[20px] w-full mb-3">
            {Array.from({ length: 20 }).map((_, i) => {
              const isFilled = i < filledBars;
              return (
                <motion.div
                  key={i}
                  className="flex-1 rounded-full"
                  initial={{
                    height: "100%",
                    backgroundColor: isFilled
                      ? accentColor
                      : isDark
                      ? "rgba(148, 163, 184, 0.15)"
                      : "rgba(100, 116, 139, 0.2)",
                    opacity: isFilled ? 0 : 0.4,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: isFilled ? 1 : 0.4,
                        }
                      : {}
                  }
                  transition={{
                    opacity: {
                      delay: index * 0.03 + i * 0.02,
                      duration: 0.3,
                    },
                  }}
                  style={{
                    boxShadow: isFilled ? `0 0 8px ${accentColor}50` : "none",
                  }}
                />
              );
            })}
          </div>

          {/* Category as subtitle */}
          <p
            className={`text-sm ${isDark ? "text-zinc-500" : "text-slate-500"}`}
          >
            {skill.category === "design" ? "Design" : "Development"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const SkillGraph = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const sortedSkills = [...skills].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="relative max-w-[1100px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`
    inline-flex items-center gap-2 px-4 py-2 rounded-full
    backdrop-blur-xl mb-6
    shadow-[0_8px_32px_rgba(0,0,0,0.3)]
    transition-all duration-300
    ${
      isDark
        ? "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
        : "bg-black/[0.02] border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
    }
  `}
          >
            <div className="p-1.5 rounded-full bg-violet-500/10">
              <IconChartBar className="w-3.5 h-3.5 text-violet-500" />
            </div>
            <span
              className={`
      text-xs font-medium uppercase tracking-wide
      transition-colors duration-300
      ${isDark ? "text-zinc-400" : "text-slate-500"}
    `}
            >
              Skills
            </span>
          </motion.div>

          <h2
            className={`
              text-3xl sm:text-4xl lg:text-5xl font-bold mb-4
              transition-colors duration-300
              ${isDark ? "text-white" : "text-slate-900"}
            `}
          >
            Tech & Design{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Proficiency
            </span>
          </h2>
          <p
            className={`
              text-base sm:text-lg max-w-2xl mx-auto leading-relaxed
              transition-colors duration-300
              ${isDark ? "text-white/60" : "text-slate-600"}
            `}
          >
            A blend of development expertise and creative design skills,
            constantly evolving with new technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500/20 border border-teal-500/40" />
            <span
              className={`text-xs transition-colors duration-300 ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              Development
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40" />
            <span
              className={`text-xs transition-colors duration-300 ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              Design
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {sortedSkills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
              isDark={isDark}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
        />
      </div>
    </section>
  );
};

export default SkillGraph;
