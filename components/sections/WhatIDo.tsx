// src/components/sections/WhatIDo.tsx

"use client";

import React, { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import {
  IconBrandShopee,
  IconBrandReactNative,
  IconPalette,
  IconArrowUpRight,
  IconSparkles,
} from "@tabler/icons-react";
import { useTheme } from "@/lib/providers/ThemeProvider";

const useMagnetic = (strength: number = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
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

const categories = [
  {
    title: "Shopify Development",
    description:
      "Custom storefronts, theme development, and backend solutions. From Liquid templates to Shopify APIs, I build scalable e-commerce experiences that convert.",
    icon: IconBrandShopee,
    gradient: "from-teal-500 to-emerald-600",
    bgGradient: "from-teal-500/10 to-emerald-500/10",
    borderGlow: "group-hover:shadow-teal-500/20",
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

const CategoryCard = ({
  category,
  index,
  isDark,
}: {
  category: (typeof categories)[0];
  index: number;
  isDark: boolean;
}) => {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.05);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const Icon = category.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full"
      >
        <div
          className={`
            relative h-full p-6 sm:p-8 rounded-xl overflow-hidden
            backdrop-blur-xl
            transition-all duration-300
            shadow-[0_8px_32px_rgba(0,0,0,0.3)]
            group-hover:-translate-y-1
            ${
              isDark
                ? "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
                : "bg-black/[0.02] border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
            }
          `}
        >
          {/* Accent glow - matches MetricCard style */}
          <div
            className={`
              absolute -top-20 -right-20 w-40 h-40 rounded-full
              blur-3xl opacity-20 group-hover:opacity-30
              transition-opacity duration-300
              bg-gradient-to-br ${category.gradient}
            `}
          />

          <div className="relative z-10">
            {/* Icon with accent background */}
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className={`
                inline-flex p-3 rounded-full mb-6
                bg-gradient-to-br ${category.gradient}
                shadow-lg
              `}
            >
              <Icon className="w-6 h-6 text-white" stroke={1.5} />
            </motion.div>

            {/* Title - uppercase tracking like MetricCard */}
            <h3
              className={`
                text-xs sm:text-sm font-medium mb-4 
                tracking-wide uppercase
                flex items-center gap-2
                transition-colors duration-300
                ${isDark ? "text-zinc-400" : "text-slate-500"}
              `}
            >
              {category.title}
              <IconArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
            </h3>

            {/* Description as the "value" - larger text */}
            <p
              className={`
                text-lg sm:text-xl font-semibold leading-relaxed mb-6
                transition-colors duration-300
                ${isDark ? "text-white" : "text-slate-900"}
              `}
            >
              {category.description}
            </p>

            {/* Skills as subtle tags */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, idx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + idx * 0.05 + 0.3 }}
                  className={`
                    px-3 py-1.5 text-xs font-medium rounded-xl
                    transition-colors duration-300
                    ${
                      isDark
                        ? "bg-white/[0.05] text-zinc-500 group-hover:text-zinc-400"
                        : "bg-black/[0.03] text-slate-500 group-hover:text-slate-600"
                    }
                  `}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WhatIDo = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
              <IconSparkles className="w-3.5 h-3.5 text-violet-500" />
            </div>
            <span
              className={`
      text-xs font-medium uppercase tracking-wide
      transition-colors duration-300
      ${isDark ? "text-zinc-400" : "text-slate-500"}
    `}
            >
              Services
            </span>
          </motion.div>

          <h2
            className={`
              text-3xl sm:text-4xl lg:text-5xl font-bold mb-4
              transition-colors duration-300
              ${isDark ? "text-white" : "text-slate-900"}
            `}
          >
            What I{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Do
            </span>
          </h2>
          <p
            className={`
              text-base sm:text-lg max-w-2xl mx-auto leading-relaxed
              transition-colors duration-300
              ${isDark ? "text-white/60" : "text-slate-600"}
            `}
          >
            Bringing ideas to life through code and design. From e-commerce
            solutions to mobile apps and brand identities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
              isDark={isDark}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p
            className={`text-sm mb-4 transition-colors duration-300 ${
              isDark ? "text-white/40" : "text-slate-500"
            }`}
          >
            Have a project in mind?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={`
              inline-flex items-center gap-2 px-8 py-4 rounded-full
              font-medium 
              ${
                isDark
                  ? "bg-white text-slate-900 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/25"
                  : "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/25"
              }
            `}
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
