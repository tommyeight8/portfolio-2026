// src/components/projects/ProjectFilters.tsx

"use client";

import { motion } from "framer-motion";
import { ProjectCategory } from "@/types/project.types";

interface ProjectFiltersProps {
  activeCategory: ProjectCategory | "ALL";
  onCategoryChange: (category: ProjectCategory | "ALL") => void;
  categories: { value: ProjectCategory | "ALL"; label: string }[];
}

export function ProjectFilters({
  activeCategory,
  onCategoryChange,
  categories,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <motion.button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative px-5 py-2.5 rounded-full text-sm font-medium
            transition-colors duration-200
            ${
              activeCategory === category.value
                ? "text-neutral-900"
                : "text-neutral-400 hover:text-neutral-200"
            }
          `}
        >
          {activeCategory === category.value && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-white rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
