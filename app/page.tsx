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
      {/* FX WRAPPER */}
      <div className="fx-wrapper">
        <div className="aurora-background" />
        <div className="cosmos-nebula" />
        <div className="cosmos-dust" />
        <div className="cosmos-dust-twinkle" />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 text-white">
        <Navbar />
        <HeroParallaxHero />
        <WhatIDo />
        <SkillGraph />
        <Footer />
      </main>
    </>
  );
}
