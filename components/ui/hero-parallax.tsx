// src/components/ui/hero-parallax.tsx

"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";

// Magnetic effect hook
const useMagnetic = (strength: number = 0.1) => {
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

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [minHeight, setMinHeight] = useState<string>("150vh");

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0.5, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 200]),
    springConfig
  );

  useEffect(() => {
    const updateHeight = () => {
      const vw = window.innerWidth;
      const height = vw < 768 ? 2000 : 2247;
      setMinHeight(`${height}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      ref={ref}
      className="-mt-20 md:-mt-24 pb-60 relative overflow-hidden antialiased flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      style={{ minHeight }}
    >
      <Header />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative z-10"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              isDark={isDark}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
              isDark={isDark}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              isDark={isDark}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="max-w-7xl mx-auto px-4 w-full relative z-20 min-h-screen flex flex-col justify-center pt-32 md:pt-40">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-full
          backdrop-blur-xl max-w-fit mb-8
          transition-colors duration-300
          ${
            isDark
              ? "bg-white/10 border-white/20 shadow-black/10"
              : "bg-white/70 border-black/10 shadow-black/5"
          }
          border shadow-lg
        `}
      >
        {/* <Sparkles className="w-4 h-4 text-fuchsia-500" /> */}
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            isDark ? "text-white/80" : "text-slate-700"
          }`}
        >
          Creative Developer & Designer
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`
          text-3xl sm:text-5xl md:text-7xl font-bold 
          flex flex-col gap-2 md:gap-4
          transition-colors duration-300
          ${isDark ? "text-white" : "text-slate-900"}
        `}
      >
        <span>Designing Bold Brands</span>
        <span className="flex items-center gap-4">
          <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            &
          </span>{" "}
          Building Modern Websites
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`
          max-w-2xl text-base md:text-xl mt-8 leading-relaxed
          transition-colors duration-300
          ${isDark ? "text-white/60" : "text-slate-600"}
        `}
      >
        Pixel-perfect design meets production-ready code.{" "}
        <span
          className={`font-medium transition-colors duration-300 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Shopify expert, full-stack developer, and visual creator.
        </span>
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap gap-4 mt-10"
      >
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={`
            inline-flex items-center gap-2 px-8 py-4 rounded-2xl
            font-medium text-sm
            transition-all duration-300
            ${
              isDark
                ? "bg-white text-slate-900 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/25"
                : "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/25"
            }
          `}
        >
          Let&apos;s Talk
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>

        <motion.a
          href="/projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={`
            inline-flex items-center gap-2 px-8 py-4 rounded-2xl
            backdrop-blur-xl border
            font-medium text-sm
            transition-all duration-300
            ${
              isDark
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                : "bg-white/70 border-black/10 text-slate-900 hover:bg-white hover:shadow-xl"
            }
          `}
        >
          View Projects
        </motion.a>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  isDark,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  isDark: boolean;
}) => {
  const { ref, springX, springY, handleMouseMove, handleMouseLeave } =
    useMagnetic(0.03);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      key={product.title}
      className="group/product h-80 sm:h-96 w-[20rem] sm:w-[30rem] relative shrink-0"
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative h-full w-full"
      >
        <a
          href={product.link}
          className={`
            block h-full w-full rounded-2xl overflow-hidden
            backdrop-blur-xl
            transition-all duration-500
            group-hover/product:shadow-2xl group-hover/product:shadow-violet-500/10
            ${
              isDark
                ? "bg-white/5 border border-white/10 shadow-black/30 group-hover/product:border-white/20"
                : "bg-white/70 border border-black/10 shadow-black/10 group-hover/product:border-black/20"
            }
          `}
        >
          {/* Image */}
          <img
            src={product.thumbnail}
            height="600"
            width="600"
            className="object-cover object-left-top absolute h-full w-full inset-0 rounded-2xl"
            alt={product.title}
          />

          {/* Hover overlay with glassmorphism */}
          <div
            className="
              absolute inset-0 h-full w-full rounded-2xl
              opacity-0 group-hover/product:opacity-100
              bg-gradient-to-t from-black/80 via-black/40 to-transparent
              backdrop-blur-[2px]
              transition-all duration-500
            "
          />

          {/* Gradient border glow on hover */}
          <div
            className="
              absolute inset-0 rounded-2xl opacity-0 group-hover/product:opacity-100
              transition-opacity duration-500
            "
            style={{
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(217, 70, 239, 0.2))",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              WebkitMaskComposite: "xor",
              padding: "2px",
            }}
          />

          {/* Title card */}
          <div
            className="
              absolute bottom-4 left-4 right-4
              opacity-0 group-hover/product:opacity-100
              transform translate-y-4 group-hover/product:translate-y-0
              transition-all duration-500
            "
          >
            <div
              className={`
                px-4 py-3 rounded-xl
                backdrop-blur-xl
                shadow-lg
                transition-colors duration-300
                ${
                  isDark
                    ? "bg-slate-900/80 border border-white/10"
                    : "bg-white/80 border border-black/10"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <h2
                  className={`text-sm font-medium truncate transition-colors duration-300 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {product.title}
                </h2>
                <ArrowUpRight className="w-4 h-4 text-violet-500 shrink-0 ml-2" />
              </div>
            </div>
          </div>

          {/* Corner accent */}
          <div
            className="
              absolute top-4 right-4
              w-8 h-8 rounded-full
              bg-gradient-to-br from-violet-500 to-fuchsia-500
              opacity-0 group-hover/product:opacity-100
              transform scale-0 group-hover/product:scale-100
              transition-all duration-500 delay-100
              flex items-center justify-center
              shadow-lg shadow-violet-500/30
            "
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default HeroParallax;
