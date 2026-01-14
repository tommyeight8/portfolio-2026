// src/components/landing/GlassmorphicLanding.tsx
"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import WhatIDo from "@/components/sections/WhatIDo";
import SkillGraph from "@/components/sections/SkillGraph";
import { HeroParallaxHero } from "@/components/ui/HeroParallax";

type ParallaxItem = {
  title: string;
  link: string;
  thumbnail: string;
};

export default function PortfolioLanding({
  projects,
}: {
  projects: ParallaxItem[];
}) {
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
        <HeroParallaxHero projects={projects} />
        <WhatIDo />
        <SkillGraph />
        <Footer />
      </main>
    </>
  );
}
