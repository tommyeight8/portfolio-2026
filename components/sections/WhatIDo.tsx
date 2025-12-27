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
            relative h-full p-6 sm:p-8 rounded-3xl overflow-hidden
            backdrop-blur-xl
            transition-all duration-500
            ${category.borderGlow}
            group-hover:shadow-2xl
            group-hover:-translate-y-1
            ${
              isDark
                ? "bg-white/5 border border-white/10 shadow-black/20 group-hover:border-white/20"
                : "bg-white/70 border border-black/10 shadow-black/5 group-hover:border-black/20 group-hover:shadow-xl"
            }
          `}
        >
          <div
            className={`
              absolute inset-0 opacity-0 group-hover:opacity-100
              bg-gradient-to-br ${category.bgGradient}
              transition-opacity duration-500
            `}
          />

          <div
            className={`
              absolute -top-20 -right-20 w-40 h-40 rounded-full
              bg-gradient-to-br ${category.gradient} opacity-10
              blur-3xl group-hover:opacity-20 transition-opacity duration-500
            `}
          />

          <div className="relative z-10">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className={`
                inline-flex p-4 rounded-2xl mb-6
                bg-gradient-to-br ${category.gradient}
                shadow-lg
              `}
            >
              <Icon className="w-7 h-7 text-white" stroke={1.5} />
            </motion.div>

            <h3
              className={`
                text-xl sm:text-2xl font-semibold mb-3 
                flex items-center gap-2
                transition-colors duration-300
                ${isDark ? "text-white" : "text-slate-900"}
              `}
            >
              {category.title}
              <IconArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-50 transition-opacity" />
            </h3>

            <p
              className={`
                text-sm sm:text-base leading-relaxed mb-6
                transition-colors duration-300
                ${isDark ? "text-white/60" : "text-slate-600"}
              `}
            >
              {category.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, idx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + idx * 0.05 + 0.3 }}
                  className={`
                    px-3 py-1.5 text-xs font-medium rounded-full
                    backdrop-blur-sm
                    transition-colors duration-300
                    ${
                      isDark
                        ? "bg-white/10 text-white/70 border border-white/10 group-hover:bg-white/15"
                        : "bg-white/80 text-slate-700 border border-black/10 group-hover:bg-white"
                    }
                  `}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <div
            className={`
              absolute bottom-0 left-0 right-0 h-1
              bg-gradient-to-r ${category.gradient}
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
            `}
          />
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
              transition-colors duration-300
              ${
                isDark
                  ? "bg-white/10 border border-white/20 shadow-black/10"
                  : "bg-white/70 border border-black/10 shadow-black/5"
              }
              shadow-lg
            `}
          >
            <IconSparkles className="w-4 h-4 text-violet-500" />
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                isDark ? "text-white/80" : "text-slate-700"
              }`}
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`
              inline-flex items-center gap-2 px-8 py-4 rounded-2xl
              font-medium
              transition-all duration-300
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
