// src/components/landing/GlassmorphicLanding.tsx
"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import SkillGraph from "@/components/sections/SkillGraph";
import { HeroParallaxHero } from "@/components/ui/HeroParallax";
import WhatIDo from "../sections/WhatIDo";

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
      {/* MOBILE GRADIENT BACKGROUND - slightly richer */}
      <div
        className="fixed inset-0 md:hidden"
        style={{
          background: `linear-gradient(
      160deg,
      hsl(185, 60%, 8%) 0%,
      hsl(220, 45%, 10%) 40%,
      hsl(260, 50%, 11%) 70%,
      hsl(277, 55%, 9%) 100%
    )`,
        }}
      />
      {/* FX WRAPPER - hidden on mobile */}
      <div className="fx-wrapper hidden md:block min-h-screen">
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
