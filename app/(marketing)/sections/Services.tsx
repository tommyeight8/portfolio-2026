// src/app/(marketing)/sections/Services.tsx

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Building fast, scalable web applications with modern frameworks like Next.js, React, and TypeScript. From landing pages to complex platforms.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
  },
  {
    number: "02",
    title: "Graphic Design",
    description:
      "Creating visual identities that communicate your brand story. Logos, marketing materials, social media assets, and print design.",
    tags: ["Branding", "Print", "Digital", "Illustration"],
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Designing intuitive interfaces and seamless user experiences. Wireframes, prototypes, and high-fidelity designs in Figma.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
  },
];

export function Services() {
  return (
    <section className="relative py-32 bg-neutral-900/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.05)_0%,transparent_65%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-cyan-400 font-medium">
            What I Do
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Services & Expertise
          </h2>
        </motion.div>

        {/* Services List */}
        <div className="space-y-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 md:p-10 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/50 hover:border-neutral-700 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                {/* Number */}
                <span className="text-5xl md:text-6xl font-bold text-neutral-800 group-hover:text-neutral-700 transition-colors">
                  {service.number}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white group-hover:text-violet-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-neutral-400 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <ArrowUpRight className="w-6 h-6 text-neutral-600 group-hover:text-violet-400 transition-colors shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
