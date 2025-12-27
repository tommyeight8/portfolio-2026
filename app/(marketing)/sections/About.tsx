// src/app/(marketing)/sections/About.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
];

export function About() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-800">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Portrait"
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 md:right-auto md:-left-6 p-6 bg-neutral-900 border border-neutral-800 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-violet-400" />
                <div>
                  <p className="text-white font-medium">California, USA</p>
                  <p className="text-sm text-neutral-400">
                    Available worldwide
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-widest text-fuchsia-400 font-medium">
              About Me
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
              Crafting digital experiences with purpose
            </h2>
            <div className="mt-8 space-y-6 text-neutral-400 leading-relaxed">
              <p>
                I'm a developer and designer based in California with a passion
                for creating digital experiences that are both beautiful and
                functional. My journey started with a curiosity for how things
                work and evolved into a career building products that people
                love to use.
              </p>
              <p>
                Whether it's a complex web application or a brand identity
                system, I approach every project with the same commitment to
                quality and attention to detail. I believe great design is
                invisible — it just works.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-white font-medium hover:text-violet-300 transition-colors"
              >
                Learn more about me
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
