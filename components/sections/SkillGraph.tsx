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
          relative p-5 rounded-2xl overflow-hidden
          backdrop-blur-xl
          hover:shadow-xl hover:shadow-violet-500/10
          hover:-translate-y-0.5
          transition-all duration-300
          ${
            isDark
              ? "bg-white/5 border border-white/10 shadow-black/20 hover:border-white/20"
              : "bg-white/70 border border-black/10 shadow-black/5 hover:border-black/20 hover:shadow-xl"
          }
        `}
      >
        <div
          className="
            absolute inset-0 opacity-0 group-hover:opacity-100
            bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5
            transition-opacity duration-500
          "
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h4
              className={`
                text-sm font-medium transition-colors duration-300
                ${
                  isDark
                    ? "text-white/80 group-hover:text-white"
                    : "text-slate-700 group-hover:text-slate-900"
                }
              `}
            >
              {skill.name}
            </h4>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.03 + 0.3 }}
              className="text-xs font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
            >
              {skill.level}%
            </motion.span>
          </div>

          <div className="flex items-end gap-[3px] h-[24px] w-full">
            {Array.from({ length: 20 }).map((_, i) => {
              const isFilled = i < filledBars;
              return (
                <motion.div
                  key={i}
                  className="flex-1 rounded-full"
                  initial={{
                    height: "100%",
                    backgroundColor: isFilled
                      ? "rgb(139, 92, 246)"
                      : isDark
                      ? "rgba(148, 163, 184, 0.15)"
                      : "rgba(100, 116, 139, 0.2)",
                    opacity: isFilled ? 0 : 0.4,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: isFilled ? 1 : 0.4,
                          backgroundColor: isFilled
                            ? [
                                "rgb(139, 92, 246)",
                                "rgb(192, 132, 252)",
                                "rgb(139, 92, 246)",
                              ]
                            : isDark
                            ? "rgba(148, 163, 184, 0.15)"
                            : "rgba(100, 116, 139, 0.2)",
                        }
                      : {}
                  }
                  transition={{
                    opacity: {
                      delay: index * 0.03 + i * 0.02,
                      duration: 0.3,
                    },
                    backgroundColor: {
                      delay: index * 0.03 + i * 0.02,
                      duration: 1.5,
                      repeat: 0,
                    },
                  }}
                  style={{
                    boxShadow: isFilled
                      ? "0 0 8px rgba(139, 92, 246, 0.3)"
                      : "none",
                  }}
                />
              );
            })}
          </div>

          <div className="mt-3 flex justify-end">
            <span
              className={`
                text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full
                ${
                  skill.category === "design"
                    ? "bg-fuchsia-500/10 text-fuchsia-500"
                    : "bg-violet-500/10 text-violet-500"
                }
              `}
            >
              {skill.category}
            </span>
          </div>
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
              transition-colors duration-300
              ${
                isDark
                  ? "bg-white/10 border border-white/20 shadow-black/10"
                  : "bg-white/70 border border-black/10 shadow-black/5"
              }
              shadow-lg
            `}
          >
            <IconChartBar className="w-4 h-4 text-violet-500" />
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                isDark ? "text-white/80" : "text-slate-700"
              }`}
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
            <div className="w-3 h-3 rounded-full bg-violet-500/20 border border-violet-500/40" />
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
