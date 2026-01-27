"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Mail, MapPin, Globe, Check } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/lib/providers/ThemeProvider";

const skills = {
  "Languages & Frameworks": [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
  ],
  "E-Commerce & Shopify": [
    "Storefront API",
    "Liquid",
    "Custom Themes",
    "Headless Commerce",
    "Stripe",
  ],
  "Databases & APIs": [
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "REST APIs",
    "ShipEngine",
    "Socket.io",
  ],
  "Design Tools": [
    "Figma",
    "Photoshop",
    "Illustrator",
    "InDesign",
    "Framer Motion",
  ],
};

const experience = [
  {
    title: "Full-Stack Developer",
    company: "Cultivated Agency",
    location: "Walnut, CA",
    period: "2020 – Present",
    highlights: [
      "Build custom Shopify storefronts and headless e-commerce solutions using Storefront API, Liquid templating, and React/Next.js",
      "Develop full-stack web applications with Next.js, TypeScript, Prisma, and PostgreSQL",
      "Architect warehouse management systems with barcode scanning integration and real-time inventory tracking",
      "Integrate third-party services including Stripe, ShipEngine, Resend, and Cloudinary",
    ],
  },
  {
    title: "Graphic Designer & Web Developer",
    company: "XLanes LLC",
    location: "Los Angeles, CA",
    period: "2014 – 2020",
    highlights: [
      "Led design and development of brand websites, landing pages, and digital marketing assets",
      "Developed integrated marketing campaigns across web, print, and social media channels",
      "Created comprehensive branding systems including logos, style guides, and marketing collateral",
    ],
  },
  {
    title: "Jr Graphic Designer",
    company: "IMI Studio",
    location: "El Monte, CA",
    period: "2012 – 2014",
    highlights: [
      "Created visual assets for print and digital marketing materials",
      "Prepared production-ready files and coordinated with print vendors",
    ],
  },
];

export default function ResumePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "-15%", "-15%"],
  );
  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.1, 1.1],
  );

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-20%"]);

  return (
    <main
      ref={containerRef}
      //   className={`min-h-screen relative ${isDark ? "bg-slate-950" : "bg-slate-50"}`}
      className="min-h-screen"
    >
      {/* Parallax Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ y: backgroundY, scale: backgroundScale }}
        >
          <Image
            src="/images/la-art-mobile.png"
            alt="Los Angeles Skyline"
            fill
            className="object-cover object-center md:hidden"
            priority
          />
          <Image
            src="/images/la-art.png"
            alt="Los Angeles Skyline"
            fill
            className="object-cover object-center hidden md:block"
            priority
          />
          <div
            className={`absolute inset-0 ${
              isDark ? "bg-slate-950/40" : "bg-white/20"
            }`}
          />
        </motion.div>
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 min-h-auto md:min-h-[60vh] hidden md:flex items-end"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className="max-w-5xl mx-auto px-6 pb-12 md:pb-24 pt-12 md:pt-32 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`mb-2 text-3xl md:text-5xl font-bold tracking-tight drop-shadow-lg ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Tommy Vong
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`text-md md:text-xl ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Full-Stack Developer & Designer
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`flex flex-wrap gap-3 text-sm mt-4 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                <span
                  className={`flex items-center gap-1.5 backdrop-blur-sm rounded-full px-3 py-1.5 ${
                    isDark
                      ? "bg-slate-800/60 border border-slate-700/50"
                      : "bg-white/80 border border-slate-200"
                  }`}
                >
                  <MapPin
                    className={`w-4 h-4 ${isDark ? "text-violet-400" : "text-violet-500"}`}
                  />
                  Los Angeles, CA
                </span>
                <span
                  className={`flex items-center gap-1.5 backdrop-blur-sm rounded-full px-3 py-1.5 ${
                    isDark
                      ? "bg-slate-800/60 border border-slate-700/50"
                      : "bg-white/80 border border-slate-200"
                  }`}
                >
                  <Mail
                    className={`w-4 h-4 ${isDark ? "text-violet-400" : "text-violet-500"}`}
                  />
                  Tommyvong88@gmail.com
                </span>
                <span
                  className={`flex items-center gap-1.5 backdrop-blur-sm rounded-full px-3 py-1.5 ${
                    isDark
                      ? "bg-slate-800/60 border border-slate-700/50"
                      : "bg-white/80 border border-slate-200"
                  }`}
                >
                  <Globe
                    className={`w-4 h-4 ${isDark ? "text-violet-400" : "text-violet-500"}`}
                  />
                  tommyvong.com
                </span>
              </motion.div>
            </div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="Tommy_Vong_Senior_Full_Stack_Engineer.docx"
              download
              className="inline-flex items-center gap-2 bg-violet-500 text-white px-6 py-3 rounded-full font-medium hover:bg-violet-600 transition w-fit shadow-lg shadow-violet-500/25"
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Resume Content */}
      <section className="relative z-10 mt-54 md:mt-0">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`backdrop-blur-xl rounded-t-[3rem] border-t ${
            isDark
              ? "bg-slate-900/80 border-slate-700/50 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
              : "bg-white/80 border-slate-200 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]"
          }`}
        >
          {/* Summary */}
          <div className="max-w-5xl mx-auto px-6 py-6 md:py-12 md:py-16">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`text-lg leading-relaxed max-w-3xl ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Full-stack developer with 10+ years of design experience,
              specializing in modern web applications and e-commerce solutions.
              Expert in React, Next.js, and TypeScript with deep experience
              building Shopify storefronts, custom themes, and headless commerce
              integrations.
            </motion.p>
          </div>

          {/* Skills */}
          <div
            className={`border-y ${
              isDark
                ? "bg-slate-800/30 border-slate-700/50"
                : "bg-slate-50/50 border-slate-200"
            }`}
          >
            <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`text-2xl font-bold mb-8 ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Technical Skills
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(skills).map(([category, items], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={`backdrop-blur-sm rounded-2xl p-5 border transition-all ${
                      isDark
                        ? "bg-slate-800/50 border-slate-700/50 hover:border-violet-500/50"
                        : "bg-white/80 border-slate-200 hover:border-violet-300 shadow-sm"
                    }`}
                  >
                    <h3
                      className={`font-semibold mb-3 ${
                        isDark ? "text-violet-400" : "text-violet-600"
                      }`}
                    >
                      {category}
                    </h3>
                    <ul className="space-y-2">
                      {items.map((skill, skillIndex) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + skillIndex * 0.05,
                          }}
                          className={`text-sm flex items-center gap-2 ${
                            isDark ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          <motion.span
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                              delay: index * 0.1 + skillIndex * 0.05 + 0.1,
                            }}
                          >
                            <Check
                              className={`w-4 h-4 ${
                                isDark ? "text-cyan-300" : "text-cyan-500"
                              }`}
                            />
                          </motion.span>
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <section className="max-w-5xl mx-auto px-6 py-12 md:py-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-2xl font-bold mb-10 ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Experience
            </motion.h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative pl-8 border-l-2 ${
                    isDark ? "border-violet-300/10" : "border-violet-200"
                  }`}
                >
                  <div
                    className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-violet-500 shadow-lg ${
                      isDark ? "shadow-violet-500/50" : "shadow-violet-500/30"
                    }`}
                  />
                  <div className="space-y-3">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <h3
                          className={`text-xl font-semibold ${
                            isDark ? "text-slate-100" : "text-slate-900"
                          }`}
                        >
                          {job.title}
                        </h3>
                        <p
                          className={
                            isDark ? "text-slate-400" : "text-slate-600"
                          }
                        >
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <span
                        className={`text-sm px-3 py-1 rounded-full w-fit ${
                          isDark
                            ? "text-violet-400 bg-violet-500/10 border border-violet-500/20"
                            : "text-violet-600 bg-violet-100 border border-violet-200"
                        }`}
                      >
                        {job.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {job.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className={`text-sm leading-relaxed flex items-start gap-2 ${
                            isDark ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                              isDark ? "bg-slate-600" : "bg-slate-400"
                            }`}
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education */}
          <div
            className={`border-t ${
              isDark
                ? "bg-slate-800/30 border-slate-700/50"
                : "bg-slate-50/50 border-slate-200"
            }`}
          >
            <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`text-2xl font-bold mb-8 ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Education
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`backdrop-blur-sm rounded-2xl p-6 border ${
                  isDark
                    ? "bg-slate-800/50 border-slate-700/50"
                    : "bg-white/80 border-slate-200 shadow-sm"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h3
                      className={`text-xl font-semibold ${
                        isDark ? "text-slate-100" : "text-slate-900"
                      }`}
                    >
                      Bachelor of Fine Arts in Graphic Design
                    </h3>
                    <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                      California State Polytechnic University, Pomona
                    </p>
                  </div>
                  <span
                    className={`text-sm px-3 py-1 rounded-full w-fit ${
                      isDark
                        ? "text-violet-400 bg-violet-500/10 border border-violet-500/20"
                        : "text-violet-600 bg-violet-100 border border-violet-200"
                    }`}
                  >
                    2007 – 2013
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA */}
          <div
            className={`border-t ${
              isDark
                ? "bg-slate-950 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 text-center space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`text-2xl font-bold ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Let's work together
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`max-w-xl mx-auto ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                I'm currently available for freelance projects and full-time
                opportunities. Let's build something great.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-violet-500 text-white px-6 py-3 rounded-full font-medium hover:bg-violet-600 transition shadow-lg shadow-violet-500/25"
                >
                  <Mail className="w-5 h-5" />
                  Get in touch
                </a>
                <a
                  href="Tommy_Vong_Senior_Full_Stack_Engineer.docx"
                  download
                  className={`inline-flex items-center gap-2 border px-6 py-3 rounded-full font-medium transition ${
                    isDark
                      ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
