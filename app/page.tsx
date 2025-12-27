"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import WhatIDo from "@/components/sections/WhatIDo";
import SkillGraph from "@/components/sections/SkillGraph";
import { HeroParallaxHero } from "@/components/ui/HeroParallax";

// ============ MAIN ============
export default function GlassmorphicLanding() {
  return (
    <>
      {/* BACKGROUND LAYERS */}
      <div className="aurora-background" />
      {/* Cosmic Background Effects */}
      <div className="cosmos-nebula" aria-hidden="true" />
      <div className="cosmos-dust" aria-hidden="true" />
      <div className="cosmos-dust-twinkle" aria-hidden="true" />

      {/* CONTENT */}
      <main className="relative z-10 overflow-hidden text-white">
        <Navbar />
        <HeroParallaxHero />
        <WhatIDo />
        <SkillGraph />
        <Footer />
      </main>
    </>
  );
}
