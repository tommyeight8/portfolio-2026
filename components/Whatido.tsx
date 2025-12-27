"use client";

import React, { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import {
  IconBrandGoogle,
  IconBrandReactNative,
  IconPalette,
  IconArrowUpRight,
  IconSparkles,
} from "@tabler/icons-react";

/* ------------------ MAGNETIC HOOK ------------------ */

const useMagnetic = (strength = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { damping: 15, stiffness: 150, mass: 0.1 };
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

/* ------------------ DATA ------------------ */

const categories = [
  {
    title: "Shopify Development",
    description:
      "Custom storefronts, theme development, and backend solutions. From Liquid templates to Shopify APIs, I build scalable e-commerce experiences that convert.",
    icon: IconBrandGoogle,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    borderGlow: "group-hover:shadow-green-500/20",
    skills: ["Liquid", "Storefront API", "Admin API", "Theme Dev", "Apps"],
  },
  {
    title: "Web & Mobile Apps",
    description:
      "Full-stack applications with Next.js and React Native. Server components, API routes, and native mobile experiences with shared business logic.",
    icon: IconBrandReactNative,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    borderGlow: "group-hover:shadow-blue-500/20",
    skills: ["Next.js", "React Native", "TypeScript", "Node.js", "Prisma"],
  },
  {
    title: "Graphic Design",
    description:
      "Brand identities, UI/UX design, and visual storytelling. Creating cohesive design systems that elevate your brand across all touchpoints.",
    icon: IconPalette,
    gradient: "from-violet-500 to-fuchsia-500",
    bgGradient: "from-violet-500/10 to-fuchsia-500/10",
    borderGlow: "group-hover:shadow-violet-500/20",
    skills: ["Figma", "Photoshop", "Illustrator", "Brand Design", "UI/UX"],
  },
];

/* ------------------ CARD ------------------ */

const CategoryCard = ({
  category,
  index,
}: {
  category: (typeof categories)[0];
  index: number;
}) => {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.05);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const Icon = category.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full"
      >
        <div
          className={`
            relative h-full p-6 sm:p-8 rounded-3xl overflow-hidden
            backdrop-blur-xl
            bg-white/70 dark:bg-white/5
            border border-black/10 dark:border-white/10
            shadow-black/5 dark:shadow-black/20
            transition-all duration-500
            ${category.borderGlow}
            group-hover:shadow-2xl group-hover:-translate-y-1
          `}
        >
          {/* Hover gradient */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${category.bgGradient} transition-opacity duration-500`}
          />

          {/* Decorative glow */}
          <div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}
          />

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br ${category.gradient} shadow-lg`}
            >
              <Icon className="w-7 h-7 text-white" stroke={1.5} />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
              {category.title}
              <IconArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-50 transition-opacity" />
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base mb-6 text-slate-600 dark:text-white/60">
              {category.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, idx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + idx * 0.05 + 0.3 }}
                  className="
                    px-3 py-1.5 text-xs font-medium rounded-full
                    backdrop-blur-sm
                    bg-white/80 dark:bg-white/10
                    border border-black/10 dark:border-white/10
                    text-slate-700 dark:text-white/70
                  "
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom gradient line */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ------------------ MAIN ------------------ */

const WhatIDo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 sm:py-32">
      <div className="max-w-[1100px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-lg mb-6">
            <IconSparkles className="w-4 h-4 text-violet-500" />
            <span className="text-sm text-slate-700 dark:text-white/80">
              Services
            </span>
          </div>

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            What I <span className="text-violet-500">Do</span>
          </h2>

          <p className="text-slate-600 dark:text-white/60 max-w-2xl mx-auto">
            Bringing ideas to life through code and design.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-sm mb-4 text-slate-500 dark:text-white/40">
            Have a project in mind?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg transition-all"
          >
            Let&apos;s Work Together
            <IconArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIDo;
