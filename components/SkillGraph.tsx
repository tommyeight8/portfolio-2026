"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import React, { useRef, useCallback } from "react";
import { IconChartBar } from "@tabler/icons-react";

/* ------------------ DATA ------------------ */

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

/* ------------------ MAGNETIC HOOK ------------------ */

const useMagnetic = (strength = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { damping: 20, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, springX, springY, handleMouseMove, handleMouseLeave };
};

/* ------------------ SKILL CARD ------------------ */

const SkillCard = ({
  skill,
  index,
  isInView,
}: {
  skill: (typeof skills)[0];
  index: number;
  isInView: boolean;
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
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className="group"
    >
      <div
        className="
          relative p-5 rounded-2xl overflow-hidden
          backdrop-blur-xl
          bg-white/70 dark:bg-white/5
          border border-black/10 dark:border-white/10
          shadow-black/5 dark:shadow-black/20
          hover:shadow-xl hover:shadow-violet-500/10
          hover:-translate-y-0.5
          transition-all duration-300
        "
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Title */}
          <div className="flex justify-between mb-4">
            <h4 className="text-sm font-medium text-slate-700 dark:text-white/80 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {skill.name}
            </h4>
            <span className="text-xs font-semibold to-fuchsia-500">
              {skill.level}%
            </span>
          </div>

          {/* Bars */}
          <div className="flex items-end gap-[3px] h-[24px]">
            {Array.from({ length: 20 }).map((_, i) => {
              const filled = i < filledBars;
              return (
                <motion.div
                  key={i}
                  className="flex-1 rounded-full"
                  initial={{
                    opacity: filled ? 0 : 0.4,
                    backgroundColor: filled
                      ? "rgb(139,92,246)"
                      : "rgba(148,163,184,0.15)",
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: filled ? 1 : 0.4,
                          backgroundColor: filled
                            ? [
                                "rgb(139,92,246)",
                                "rgb(192,132,252)",
                                "rgb(139,92,246)",
                              ]
                            : "rgba(148,163,184,0.15)",
                        }
                      : {}
                  }
                  transition={{
                    delay: index * 0.03 + i * 0.02,
                    duration: 1,
                  }}
                  style={{
                    boxShadow: filled ? "0 0 8px rgba(139,92,246,.3)" : "none",
                  }}
                />
              );
            })}
          </div>

          {/* Category */}
          <div className="mt-3 flex justify-end">
            <span
              className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-medium ${
                skill.category === "design"
                  ? "bg-fuchsia-500/10 text-fuchsia-500"
                  : "bg-violet-500/10 text-violet-500"
              }`}
            >
              {skill.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ------------------ MAIN ------------------ */

const SkillGraph = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="max-w-[1100px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-lg mb-6">
            <IconChartBar className="w-4 h-4 text-violet-500" />
            <span className="text-sm text-slate-700 dark:text-white/80">
              Skills
            </span>
          </div>

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Tech & Design{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Proficiency
            </span>
          </h2>

          <p className="text-slate-600 dark:text-white/60 max-w-2xl mx-auto">
            A blend of engineering and design expertise.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillGraph;
